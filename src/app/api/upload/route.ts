import { NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"
import { auth } from "@/auth"

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]
const MAX_GENERAL_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_PPDB_SIZE = 5 * 1024 * 1024 // 5MB for PPDB documents

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const requestedFolder = ((formData.get("folder") as string) || "general").toLowerCase()

    // Public users are only allowed to upload to 'ppdb' folder (registration documents)
    // All other uploads (news, teachers, facilities, etc.) require an active admin session
    if (requestedFolder !== "ppdb" && !session?.user) {
      return NextResponse.json(
        { error: "Akses ditolak: Unggah berkas administratif memerlukan login admin" },
        { status: 401 }
      )
    }

    if (!file) {
      return NextResponse.json({ error: "Berkas tidak ditemukan" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Format berkas tidak didukung (hanya JPG, PNG, WEBP, GIF, PDF)" },
        { status: 400 }
      )
    }

    const maxSize = requestedFolder === "ppdb" ? MAX_PPDB_SIZE : MAX_GENERAL_SIZE
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Ukuran berkas melebihi batas maksimal 5MB" },
        { status: 400 }
      )
    }

    const folder = requestedFolder === "ppdb" ? "ppdb" : requestedFolder
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
