import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
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
