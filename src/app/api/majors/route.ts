import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const majors = await prisma.major.findMany({
      orderBy: { code: "asc" },
    })
    return NextResponse.json({ majors })
  } catch {
    return NextResponse.json({
      majors: [
        {
          id: "m-1",
          code: "RPL",
          name: "Rekayasa Perangkat Lunak",
          slug: "rekayasa-perangkat-lunak",
          description: "Pengembangan web dan aplikasi mobile modern.",
          competencies: "Full-Stack Development, React, Node.js, Database",
          careerProspects: "Frontend/Backend Engineer, Mobile Dev",
        },
        {
          id: "m-2",
          code: "TJKT",
          name: "Teknik Jaringan Komputer & Telekomunikasi",
          slug: "teknik-jaringan-komputer-dan-telekomunikasi",
          description: "Infrastruktur jaringan, server Linux/Windows, dan keamanan siber.",
          competencies: "Cisco & MikroTik Routing, Server Virtualization, Cybersecurity",
          careerProspects: "Network Administrator, DevOps Junior, Cyber Security",
        },
      ],
    })
  }
}
