import { NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "general"

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Format file tidak didukung (hanya JPG, PNG, WEBP, GIF, PDF)" },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file melebihi batas maksimal 10MB" },
        { status: 400 }
      )
    }

    const result = await storage.upload(file, folder)

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.filename,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengunggah berkas" },
      { status: 500 }
    )
  }
}
