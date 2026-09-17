import { Metadata } from "next"
import Link from "next/link"
import { Building2, CheckCircle2, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getFacilities } from "@/lib/data"

export const metadata: Metadata = {
  title: "Sarana & Fasilitas Sekolah",
  description: "Fasilitas modern berstandar industri mulai dari Laboratorium AI, Studio Multimedia, hingga Smart Classroom di SMK Negeri 1 Digital Nusantara.",
}

const CATEGORIES = ["ALL", "Laboratorium", "Studio", "Umum", "Olahraga", "Kelas", "Ibadah"]

export default async function FasilitasPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>
}) {
  const params = await searchParams
  const activeCategory = params.kategori || "ALL"
  const facilities = await getFacilities(activeCategory)

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Sarana & Prasarana
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Fasilitas Kampus Berstandar Industri
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Mendukung proses belajar mengajar yang kondusif, interaktif, dan berorientasi pada kemajuan teknologi terkini.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            asChild
            size="sm"
            variant={activeCategory === cat ? "default" : "outline"}
            className="rounded-full text-xs"
          >
            <Link href={cat === "ALL" ? "/fasilitas" : `/fasilitas?kategori=${cat}`}>
              {cat === "ALL" ? "Semua Fasilitas" : cat}
            </Link>
          </Button>
        ))}
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f) => (
          <Card
            key={f.id}
            className="overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={f.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"}
                  alt={f.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5">
                  <Badge variant="secondary" className="bg-background/90 text-foreground font-semibold backdrop-blur-xs text-[10px]">
                    {f.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-bold text-lg leading-tight text-foreground">
                  {f.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {f.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-primary" />
                Kapasitas: {f.capacity ? `${f.capacity} Orang` : "-"}
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {f.condition}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
