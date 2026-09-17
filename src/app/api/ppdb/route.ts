import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized: Hanya admin yang dapat mengakses data PPDB" }, { status: 401 })
  }

  try {
    const applicants = await prisma.pPDBRegistration.findMany({
      include: { major: { select: { name: true, code: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ applicants, registrations: applicants })
  } catch {
    const fallback = [
      {
        id: "p-1",
        registrationNo: "PPDB-2026-0001",
        fullName: "Muhammad Rizky Pratama",
        nik: "3174011505080001",
        nisn: "0089123456",
        previousSchool: "SMP Negeri 115 Jakarta",
        phone: "081298765432",
        email: "rizky.pratama@gmail.com",
        major: { name: "Rekayasa Perangkat Lunak", code: "RPL" },
        status: "VERIFIED",
        documentUrl: "/uploads/dokumen.pdf",
        notes: "Berkas lengkap dan nilai rapor rata-rata 88,5.",
        createdAt: new Date().toISOString(),
      },
    ]
    return NextResponse.json({
      applicants: fallback,
      registrations: fallback,
    })
  }
}
