import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      orderBy: { name: "asc" },
    })
    return NextResponse.json({ facilities })
  } catch {
    return NextResponse.json({
      facilities: [
        {
          id: "f-1",
          name: "Laboratorium Komputer & AI",
          slug: "lab-komputer",
          category: "Laboratorium",
          capacity: 40,
          condition: "Sangat Baik",
          description: "Laboratorium PC high-spec untuk AI dan coding.",
        },
      ],
    })
  }
}
