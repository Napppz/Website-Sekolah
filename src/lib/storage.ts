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

  async upload(file: File, folder = "general"): Promise<UploadResult> {
    await this.ensureDir()

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize filename
    const ext = path.extname(file.name) || ".jpg"
    const baseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .toLowerCase()
      .slice(0, 30)

    const uniqueName = `${folder}_${Date.now()}_${baseName}${ext}`
    const filePath = path.join(this.uploadDir, uniqueName)

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
      const filename = path.basename(url)
      const filePath = path.join(this.uploadDir, filename)
      await fs.unlink(filePath)
      return true
    } catch {
      return false
    }
  }
}

export const storage: StorageProvider = new LocalStorageProvider()
