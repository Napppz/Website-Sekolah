import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ gallery })
  } catch {
    return NextResponse.json({
      gallery: [
        {
          id: "g-1",
          title: "Praktikum Pemrograman Cloud di Lab AI",
          category: "Fasilitas",
          albumName: "Laboratorium",
          imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        },
      ],
    })
  }
}
