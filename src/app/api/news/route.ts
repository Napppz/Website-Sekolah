import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { publishedAt: "desc" },
      take: 50,
    })
    return NextResponse.json({ news })
  } catch {
    return NextResponse.json({
      news: [
        {
          id: "n-1",
          title: "Siswa SMK Digital Raih Medali Emas LKS Nasional Bidang Cloud Computing",
          slug: "siswa-smk-digital-raih-emas-lks-nasional",
          content: "Jakarta - Raditya Pratama berhasil menyabet medali emas LKS...",
          isPublished: true,
          publishedAt: new Date().toISOString(),
          views: 342,
          categoryId: "cat-1",
          category: { name: "Prestasi Siswa" },
        },
      ],
    })
  }
}
