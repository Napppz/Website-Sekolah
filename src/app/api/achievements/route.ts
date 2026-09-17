import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    })
    return NextResponse.json({ achievements })
  } catch {
    return NextResponse.json({
      achievements: [
        {
          id: "ach-1",
          title: "Juara 1 LKS Nasional Bidang Cloud Computing",
          slug: "juara-1-lks-cloud",
          description: "Meraih medali emas tingkat nasional.",
          level: "Nasional",
          year: 2026,
          participant: "Raditya Pratama",
          category: "Akademik & IT",
        },
      ],
    })
  }
}
