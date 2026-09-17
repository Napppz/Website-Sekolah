import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const startTime = Date.now()

  try {
    // Quick probe to verify PostgreSQL connectivity
    await prisma.schoolProfile.findFirst({
      select: { id: true },
    })

    const latencyMs = Date.now() - startTime

    return NextResponse.json(
      {
        status: "healthy",
        service: "SMK Negeri 1 Digital Nusantara Portal",
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        database: {
          status: "connected",
          engine: "PostgreSQL",
          latencyMs,
        },
        version: "2.1.0",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    )
  } catch (error: any) {
    const latencyMs = Date.now() - startTime

    return NextResponse.json(
      {
        status: "degraded",
        service: "SMK Negeri 1 Digital Nusantara Portal",
        timestamp: new Date().toISOString(),
        database: {
          status: "disconnected",
          error: error?.message || "Koneksi database bermasalah",
          latencyMs,
        },
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    )
  }
}
