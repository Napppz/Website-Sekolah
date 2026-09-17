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
            { nisn: { contains: q } },
            { nis: { contains: q } },
          ],
        }
      : {}

    const students = await prisma.student.findMany({
      where,
      include: { major: { select: { name: true, code: true } } },
      orderBy: { name: "asc" },
      take: 50,
    })

    return NextResponse.json({ students })
  } catch {
    return NextResponse.json({
      students: [
        {
          id: "s-1",
          nisn: "0089123456",
          nis: "20241001",
          name: "Muhammad Rizky Pratama",
          gender: "L",
          classGrade: "XII",
          majorId: "major-1",
          major: { name: "Rekayasa Perangkat Lunak", code: "RPL" },
          status: "ACTIVE",
        },
        {
          id: "s-2",
          nisn: "0091234567",
          nis: "20241002",
          name: "Annisa Syifa Rahmadani",
          gender: "P",
          classGrade: "XI",
          majorId: "major-3",
          major: { name: "Desain Komunikasi Visual", code: "DKV" },
          status: "ACTIVE",
        },
      ],
    })
  }
}
