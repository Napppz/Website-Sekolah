import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { publishedAt: "desc" },
    })
    return NextResponse.json({ announcements })
  } catch {
    return NextResponse.json({
      announcements: [
        {
          id: "a-1",
          title: "Jadwal Resmi Asesmen Sumatif Akhir Semester Genap 2026",
          slug: "jadwal-asast-2026",
          content: "Asesmen Sumatif Akhir Semester diselenggarakan 2-12 Juni 2026...",
          isActive: true,
          publishedAt: new Date().toISOString(),
        },
      ],
    })
  }
}
