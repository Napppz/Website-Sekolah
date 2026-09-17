import { Metadata } from "next"
import Link from "next/link"
import { Users, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { TeacherCard } from "@/components/public/teacher-card"
import { getTeachers } from "@/lib/data"

export const metadata: Metadata = {
  title: "Direktori Guru & Tenaga Pendidik",
  description:
    "Daftar pengajar profesional dan tenaga pendidik berdedikasi tinggi di SMK Negeri 1 Digital Nusantara.",
}

export default async function GuruPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; mapel?: string; page?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const subject = params.mapel || "ALL"
  const page = Number(params.page) || 1

  const { teachers, total, totalPages } = await getTeachers(query, subject, page, 12)

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Civitas Akademika"
        title="Direktori Guru & Tenaga Ahli"
        subtitle="Dibimbing oleh praktisi industri tersertifikasi dan akademisi berdedikasi tinggi."
        breadcrumb={[
          { label: "Akademik", href: "/jurusan" },
          { label: "Direktori Guru" },
        ]}
      >
        <div className="text-right">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Pendidik
          </p>
          <p className="text-2xl sm:text-3xl font-black text-foreground">
            {total} <span className="text-sm font-medium text-muted-foreground">Guru</span>
          </p>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 md:px-8 space-y-8">
        {/* Search & Filter Bar */}
        <div className="max-w-xl mx-auto">
          <form method="GET" className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari guru atau mata pelajaran..."
              className="pl-10 pr-24 rounded-xl h-11 bg-card border text-sm"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1.5 rounded-lg px-4 h-8 font-semibold"
            >
              Cari
            </Button>
          </form>
        </div>

        {/* Teachers Grid */}
        {teachers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Guru Tidak Ditemukan"
            description={`Tidak ada data guru yang cocok dengan kata kunci "${query}". Silakan coba kata kunci lain.`}
            action={
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <Link href="/guru">Reset Pencarian</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <Button
              asChild
              variant="outline"
              size="sm"
              disabled={page <= 1}
              className="rounded-xl"
            >
              <Link href={`/guru?q=${query}&page=${Math.max(1, page - 1)}`}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Sebelumnya
              </Link>
            </Button>
            <span className="text-xs font-semibold text-muted-foreground px-3">
              Halaman {page} dari {totalPages}
            </span>
            <Button
              asChild
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              className="rounded-xl"
            >
              <Link href={`/guru?q=${query}&page=${Math.min(totalPages, page + 1)}`}>
                Berikutnya <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
