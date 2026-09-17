import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  CheckCircle2,
  Briefcase,
  Layers,
  ArrowRight,
  UserPlus,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import { getMajors } from "@/lib/data"

export const metadata: Metadata = {
  title: "Program Keahlian & Jurusan Unggulan",
  description:
    "Daftar 5 program keahlian vokasi unggulan: RPL, TJKT, DKV, MPLB, dan AKL beserta silabus kompetensi dan prospek karir alumni.",
}

export default async function JurusanPage() {
  const majors = await getMajors()

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20">
      <PageHeader
        badge="Konsentrasi Keahlian"
        title="Program Keahlian & Jurusan"
        subtitle="Kurikulum berbasis industri yang dirancang terintegrasi untuk mencetak talenta profesional siap kerja, melanjutkan studi, maupun berwirausaha digital."
        breadcrumb={[
          { label: "Akademik", href: "/jurusan" },
          { label: "Program Keahlian" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8 space-y-12">
        {majors.map((major, index) => {
          const isReversed = index % 2 === 1
          return (
            <Card
              key={major.id}
              id={major.code.toLowerCase()}
              className="overflow-hidden rounded-3xl border bg-card shadow-2xs"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Image (5 cols) */}
                <div
                  className={`lg:col-span-5 relative aspect-[16/10] w-full overflow-hidden bg-muted ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={
                      major.image ||
                      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={major.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground font-black text-xs px-3 py-1 rounded-md shadow-xs">
                      {major.code}
                    </Badge>
                  </div>
                </div>

                {/* Content Details (7 cols) */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Program Unggulan 3 Tahun
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {major.name}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {major.description}
                    </p>
                  </div>

                  {/* Silabus Kompetensi */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      Kompetensi Keahlian yang Dipelajari:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                      {major.competencies.split(",").map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{c.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prospek Karir Kerja */}
                  <div className="space-y-2 pt-2 border-t">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Peluang Karir Lulusan:
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      {major.careerProspects}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button asChild className="rounded-xl font-semibold gap-2">
                      <Link href="/ppdb/daftar">
                        <UserPlus className="h-4 w-4" />
                        Pilih Jurusan Ini di PPDB
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
