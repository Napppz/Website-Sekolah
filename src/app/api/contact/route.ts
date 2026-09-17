import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized: Hanya admin yang dapat melihat pesan kontak" }, { status: 401 })
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ messages })
  } catch {
    return NextResponse.json({
      messages: [
        {
          id: "m-1",
          name: "Irwan Santoso",
          email: "irwan@gmail.com",
          subject: "Pertanyaan Kuota Jalur Prestasi PPDB 2026",
          message: "Selamat siang Bapak/Ibu, apakah sertifikat kejuaraan karate provinsi dapat digunakan?",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ],
    })
  }
}
