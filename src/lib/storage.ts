import fs from "fs/promises"
import path from "path"

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

  private static ALLOWED_FOLDERS = [
    "general",
    "ppdb",
    "news",
    "teachers",
    "students",
    "facilities",
    "gallery",
    "documents",
  ]
  private static ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"]

  async upload(file: File, folder = "general"): Promise<UploadResult> {
    await this.ensureDir()

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize folder (must match allowlist, fallback to 'general')
    const sanitizedFolder = LocalStorageProvider.ALLOWED_FOLDERS.includes(folder.toLowerCase())
      ? folder.toLowerCase()
      : "general"

    // Sanitize and validate file extension against strict allowlist
    const rawExt = path.extname(file.name).toLowerCase() || ".jpg"
    if (!LocalStorageProvider.ALLOWED_EXTENSIONS.includes(rawExt)) {
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

export const storage: StorageProvider = new LocalStorageProvider()
