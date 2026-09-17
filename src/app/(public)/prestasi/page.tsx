import { Metadata } from "next"
import Link from "next/link"
import { Trophy, Award, Medal, Calendar, User, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAchievements } from "@/lib/data"

export const metadata: Metadata = {
  title: "Prestasi Siswa, Guru & Institusi",
  description: "Daftar torehan penghargaan dan medali kejuaraan yang diraih civitas akademika SMK Negeri 1 Digital Nusantara.",
}

const LEVELS = ["ALL", "Internasional", "Nasional", "Provinsi", "Kabupaten/Kota"]

export default async function PrestasiPage({
  searchParams,
}: {
  searchParams: Promise<{ tingkat?: string }>
}) {
  const params = await searchParams
  const activeLevel = params.tingkat || "ALL"
  const achievements = await getAchievements(activeLevel)

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Galeri Prestasi
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Jejak Prestasi Civitas Akademika
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Apresiasi atas dedikasi dan pencapaian luar biasa peserta didik, guru, serta institusi di berbagai ajang kompetisi bergengsi.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {LEVELS.map((lvl) => (
          <Button
            key={lvl}
            asChild
            size="sm"
            variant={activeLevel === lvl ? "default" : "outline"}
            className="rounded-full text-xs"
          >
            <Link href={lvl === "ALL" ? "/prestasi" : `/prestasi?tingkat=${lvl}`}>
              {lvl === "ALL" ? "Semua Tingkat" : `Tingkat ${lvl}`}
            </Link>
          </Button>
        ))}
      </div>

      {/* Grid Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={item.photo || "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md">
                    <Trophy className="h-3.5 w-3.5 mr-1" />
                    Tingkat {item.level}
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">{item.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Tahun {item.year}
                  </span>
                </div>

                <h3 className="font-bold text-lg leading-snug text-foreground">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">
                Peraih: <strong className="text-foreground">{item.participant}</strong>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
