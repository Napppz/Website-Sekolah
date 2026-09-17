import { Metadata } from "next"
import Link from "next/link"
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Layers,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getMajors } from "@/lib/data"

export const metadata: Metadata = {
  title: "Program Keahlian & Jurusan Unggulan",
  description: "Daftar 5 program keahlian vokasi unggulan: RPL, TJKT, DKV, MPLB, dan AKL beserta kompetensi dan prospek karir kerja.",
}

export default async function JurusanPage() {
  const majors = await getMajors()

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Konsentrasi Keahlian
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
          Program Keahlian & Jurusan
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Kurikulum berbasis industri yang dirancang secara terintegrasi untuk mencetak tenaga profesional siap kerja, melanjutkan kuliah, maupun berwirausaha digital.
        </p>
      </div>

      {/* Majors Detailed List */}
      <div className="space-y-12">
        {majors.map((major, index) => {
          const isReversed = index % 2 === 1
          return (
            <Card
              key={major.id}
              className="overflow-hidden rounded-3xl border bg-card/60 backdrop-blur-xs shadow-sm"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Image */}
                <div
                  className={`lg:col-span-5 relative aspect-[16/10] w-full overflow-hidden bg-muted ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <img
                    src={major.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"}
                    alt={major.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 shadow-md">
                      {major.code}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-7 p-6 md:p-8 lg:p-10 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      {major.name}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {major.description}
                    </p>
                  </div>

                  {/* Competencies */}
                  <div className="space-y-2.5">
                    <h4 className="flex items-center gap-2 font-bold text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Kompetensi Keahlian yang Dipelajari:
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3.5 rounded-xl border leading-relaxed">
                      {major.competencies}
                    </p>
                  </div>

                  {/* Career Prospects */}
                  <div className="space-y-2.5">
                    <h4 className="flex items-center gap-2 font-bold text-sm text-foreground">
                      <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Prospek Karir & Lapangan Pekerjaan:
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3.5 rounded-xl border leading-relaxed">
                      {major.careerProspects}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Button asChild size="sm">
                      <Link href={`/ppdb/daftar`} className="flex items-center gap-1.5">
                        Daftar Jurusan {major.code}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/fasilitas">Lihat Fasilitas Lab</Link>
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
