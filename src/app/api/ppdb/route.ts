import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const applicants = await prisma.pPDBRegistration.findMany({
      include: { major: { select: { name: true, code: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ applicants })
  } catch {
    return NextResponse.json({
      applicants: [
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
      ],
    })
  }
}
