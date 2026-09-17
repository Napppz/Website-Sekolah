import { Metadata } from "next"
import Link from "next/link"
import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import { AchievementCard } from "@/components/public/achievement-card"
import { EmptyState } from "@/components/common/empty-state"
import { getAchievements } from "@/lib/data"

export const metadata: Metadata = {
  title: "Prestasi Siswa, Guru & Institusi",
  description:
    "Daftar torehan penghargaan dan medali kejuaraan yang diraih civitas akademika SMK Negeri 1 Digital Nusantara.",
}

const LEVELS = [
  "ALL",
  "Internasional",
  "Nasional",
  "Provinsi",
  "Kabupaten/Kota",
]

export default async function PrestasiPage({
  searchParams,
}: {
  searchParams: Promise<{ tingkat?: string }>
}) {
  const params = await searchParams
  const activeLevel = params.tingkat || "ALL"
  const achievements = await getAchievements(activeLevel)

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Galeri Juara"
        title="Jejak Prestasi Civitas Akademika"
        subtitle="Apresiasi atas dedikasi dan pencapaian luar biasa peserta didik, guru, serta institusi di berbagai ajang kompetisi bergengsi."
        breadcrumb={[
          { label: "Informasi", href: "/berita" },
          { label: "Prestasi" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8 space-y-8">
        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {LEVELS.map((lvl) => (
            <Button
              key={lvl}
              asChild
              size="sm"
              variant={activeLevel === lvl ? "default" : "outline"}
              className="rounded-xl text-xs font-semibold"
            >
              <Link href={lvl === "ALL" ? "/prestasi" : `/prestasi?tingkat=${lvl}`}>
                {lvl === "ALL" ? "Semua Tingkat" : `Tingkat ${lvl}`}
              </Link>
            </Button>
          ))}
        </div>

        {/* Grid Achievements */}
        {achievements.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="Prestasi Belum Tersedia"
            description={`Belum ada data prestasi untuk filter tingkat "${activeLevel}".`}
            action={
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <Link href="/prestasi">Lihat Semua Prestasi</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <AchievementCard key={item.id} achievement={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
