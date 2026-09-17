import fs from "fs/promises"
import path from "path"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

export interface UploadResult {
  url: string
  filename: string
  size: number
  mimeType: string
}

export interface StorageProvider {
  upload(file: File, folder?: string): Promise<UploadResult>
  delete(url: string): Promise<boolean>
}

const ALLOWED_FOLDERS = [
  "general",
  "ppdb",
  "news",
  "teachers",
  "students",
  "facilities",
  "gallery",
  "documents",
]
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"]

export class LocalStorageProvider implements StorageProvider {
  private uploadDir: string

  constructor() {
    this.uploadDir = path.join(process.cwd(), "public", "uploads")
  }

  private async ensureDir(): Promise<void> {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true })
    } catch {
      // directory exists or error handled
    }
  }

  async upload(file: File, folder = "general"): Promise<UploadResult> {
    await this.ensureDir()

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize folder (must match allowlist, fallback to 'general')
    const sanitizedFolder = ALLOWED_FOLDERS.includes(folder.toLowerCase())
      ? folder.toLowerCase()
      : "general"

    // Sanitize and validate file extension against strict allowlist
    const rawExt = path.extname(file.name).toLowerCase() || ".jpg"
    if (!ALLOWED_EXTENSIONS.includes(rawExt)) {
      throw new Error("Ekstensi berkas tidak diizinkan")
    }

    const baseName = path
      .basename(file.name, rawExt)
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .toLowerCase()
      .slice(0, 30) || "file"

    // Generate random hex to avoid predictability
    const randomHex = Math.random().toString(36).substring(2, 8)
    const uniqueName = `${sanitizedFolder}_${Date.now()}_${randomHex}_${baseName}${rawExt}`
    const filePath = path.resolve(this.uploadDir, uniqueName)

    // Anti-path traversal guard
    if (!filePath.startsWith(path.resolve(this.uploadDir))) {
      throw new Error("Akses direktori tidak sah (Path Traversal)")
    }

    await fs.writeFile(filePath, buffer)

    return {
      url: `/uploads/${uniqueName}`,
      filename: uniqueName,
      size: file.size,
      mimeType: file.type,
    }
  }

  async delete(url: string): Promise<boolean> {
    try {
      const filename = path.basename(url).replace(/[^a-zA-Z0-9_.-]/g, "")
      const filePath = path.resolve(this.uploadDir, filename)

      // Anti-path traversal guard
      if (!filePath.startsWith(path.resolve(this.uploadDir))) {
        return false
      }

      await fs.unlink(filePath)
      return true
    } catch {
      return false
    }
  }
}

export class CloudflareR2StorageProvider implements StorageProvider {
  private s3Client: S3Client
  private bucketName: string
  private publicUrl: string

  constructor(config?: {
    accountId?: string
    accessKeyId?: string
    secretAccessKey?: string
    bucketName?: string
    publicUrl?: string
  }) {
    const accountId = config?.accountId || process.env.R2_ACCOUNT_ID
    const accessKeyId = config?.accessKeyId || process.env.R2_ACCESS_KEY_ID
    const secretAccessKey = config?.secretAccessKey || process.env.R2_SECRET_ACCESS_KEY
    const bucketName = config?.bucketName || process.env.R2_BUCKET_NAME
    const publicUrl = config?.publicUrl || process.env.R2_PUBLIC_URL || ""

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error("Kredensial Cloudflare R2 belum lengkap di environment variables")
    }

    this.bucketName = bucketName
    this.publicUrl = publicUrl.replace(/\/$/, "")

    this.s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }

  async upload(file: File, folder = "general"): Promise<UploadResult> {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const sanitizedFolder = ALLOWED_FOLDERS.includes(folder.toLowerCase())
      ? folder.toLowerCase()
      : "general"

    const rawExt = path.extname(file.name).toLowerCase() || ".jpg"
    if (!ALLOWED_EXTENSIONS.includes(rawExt)) {
      throw new Error("Ekstensi berkas tidak diizinkan")
    }

    const baseName = path
      .basename(file.name, rawExt)
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .toLowerCase()
      .slice(0, 30) || "file"

    const randomHex = Math.random().toString(36).substring(2, 8)
    const uniqueKey = `${sanitizedFolder}/${Date.now()}_${randomHex}_${baseName}${rawExt}`

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueKey,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    )

    const url = this.publicUrl
      ? `${this.publicUrl}/${uniqueKey}`
      : `https://${this.bucketName}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${uniqueKey}`

    return {
      url,
      filename: uniqueKey,
      size: file.size,
      mimeType: file.type,
    }
  }

  async delete(url: string): Promise<boolean> {
    try {
      let key = ""
      if (this.publicUrl && url.startsWith(this.publicUrl)) {
        key = url.slice(this.publicUrl.length).replace(/^\/+/, "")
      } else {
        const parsed = new URL(url, "http://dummy")
        key = parsed.pathname.replace(/^\/+/, "")
      }

      if (!key) return false

      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        })
      )
      return true
    } catch (err) {
      console.error("Cloudflare R2 delete error:", err)
      return false
    }
  }
}

export class HybridStorageProvider implements StorageProvider {
  private localProvider: LocalStorageProvider
  private r2Provider: CloudflareR2StorageProvider | null = null

  constructor() {
    this.localProvider = new LocalStorageProvider()
    const isR2Configured = Boolean(
      process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME
    )

    if (isR2Configured) {
      try {
        this.r2Provider = new CloudflareR2StorageProvider()
      } catch (e) {
        console.warn("Inisialisasi Cloudflare R2 gagal, beralih ke local storage:", e)
      }
    }
  }

  get isR2Active(): boolean {
    return this.r2Provider !== null
  }

  async upload(file: File, folder = "general"): Promise<UploadResult> {
    if (this.r2Provider) {
      return this.r2Provider.upload(file, folder)
    }
    return this.localProvider.upload(file, folder)
  }

  async delete(url: string): Promise<boolean> {
    if (url.startsWith("/uploads/") || (!url.startsWith("http://") && !url.startsWith("https://"))) {
      return this.localProvider.delete(url)
    }
    if (this.r2Provider) {
      const success = await this.r2Provider.delete(url)
      if (success) return true
    }
    return this.localProvider.delete(url)
  }
}

export const storage: StorageProvider = new HybridStorageProvider()

