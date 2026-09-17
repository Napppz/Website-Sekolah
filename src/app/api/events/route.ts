import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
    })
    return NextResponse.json({ events })
  } catch {
    return NextResponse.json({
      events: [
        {
          id: "e-1",
          title: "Pameran Karya & Job Fair Vokasi Nusantara 2026",
          slug: "job-fair-vokasi-2026",
          description: "Bursa kerja khusus menghadirkan 35+ mitra industri.",
          location: "Aula Graha Nusantara",
          startDate: new Date("2026-05-18").toISOString(),
        },
      ],
    })
  }
}
