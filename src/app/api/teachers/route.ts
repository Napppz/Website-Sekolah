import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const q = searchParams.get("q") || ""

  try {
    const where = q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { subject: { contains: q, mode: "insensitive" as const } },
            { nip: { contains: q } },
          ],
        }
      : {}

    const teachers = await prisma.teacher.findMany({
      where,
      orderBy: { order: "asc" },
      take: 50,
    })

    return NextResponse.json({ teachers })
  } catch {
    return NextResponse.json({
      teachers: [
        {
          id: "t-1",
          nip: "197508152000031001",
          name: "Drs. Bambang Sulistyo, M.Kom.",
          gender: "L",
          position: "Waka. Kurikulum",
          subject: "Pemrograman Web & Mobile",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
          email: "bambang@sekolah.test",
        },
        {
          id: "t-2",
          nip: "198203122005012003",
          name: "Siti Rahmawati, M.Pd.",
          gender: "P",
          position: "Waka. Kesiswaan",
          subject: "Bahasa Indonesia",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
          email: "siti@sekolah.test",
        },
      ],
    })
  }
}
