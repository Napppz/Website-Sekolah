import { Metadata } from "next"
import Link from "next/link"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import { FacilityCard } from "@/components/public/facility-card"
import { EmptyState } from "@/components/common/empty-state"
import { getFacilities } from "@/lib/data"

export const metadata: Metadata = {
  title: "Sarana & Fasilitas Sekolah",
  description:
    "Fasilitas modern berstandar industri mulai dari Laboratorium AI, Studio Multimedia, hingga Smart Classroom di SMK Negeri 1 Digital Nusantara.",
}

const CATEGORIES = [
  "ALL",
  "Laboratorium",
  "Studio",
  "Umum",
  "Olahraga",
  "Kelas",
  "Ibadah",
]

export default async function FasilitasPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>
}) {
  const params = await searchParams
  const activeCategory = params.kategori || "ALL"
  const facilities = await getFacilities(activeCategory)

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Sarana & Prasarana"
        title="Fasilitas Kampus Berstandar Industri"
        subtitle="Mendukung proses belajar mengajar yang kondusif, interaktif, dan berorientasi pada kemajuan teknologi terkini."
        breadcrumb={[
          { label: "Profil", href: "/profil" },
          { label: "Fasilitas Kampus" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8 space-y-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              asChild
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              className="rounded-xl text-xs font-semibold"
            >
              <Link href={cat === "ALL" ? "/fasilitas" : `/fasilitas?kategori=${cat}`}>
                {cat === "ALL" ? "Semua Fasilitas" : cat}
              </Link>
            </Button>
          ))}
        </div>

        {/* Facilities Grid */}
        {facilities.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="Fasilitas Belum Tersedia"
            description={`Belum ada data fasilitas untuk kategori "${activeCategory}".`}
            action={
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <Link href="/fasilitas">Lihat Semua Fasilitas</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <FacilityCard key={f.id} facility={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
