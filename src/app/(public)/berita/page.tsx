import { Metadata } from "next"
import Link from "next/link"
import { Search, Newspaper, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { NewsCard } from "@/components/public/news-card"
import { getNews } from "@/lib/data"

export const metadata: Metadata = {
  title: "Warta & Berita Terkini",
  description:
    "Kumpulan artikel, liputan kegiatan, dan kabar prestasi terbaru civitas akademika SMK Negeri 1 Digital Nusantara.",
}

const CATEGORIES = [
  { label: "Semua Kategori", slug: "ALL" },
  { label: "Prestasi Siswa", slug: "prestasi-siswa" },
  { label: "Akademik", slug: "akademik-kurikulum" },
  { label: "Kegiatan Sekolah", slug: "kegiatan-sekolah" },
  { label: "Kerjasama Industri", slug: "kerjasama-industri" },
  { label: "Info PPDB", slug: "info-ppdb" },
]

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string; page?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const categorySlug = params.kategori || "ALL"
  const page = Number(params.page) || 1

  const { news, total, totalPages } = await getNews(query, categorySlug, page, 9)

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Warta & Publikasi"
        title="Kabar & Berita Terkini"
        subtitle="Ikuti perkembangan informasi terbaru seputar prestasi, inovasi teknologi, dan ragam kegiatan sekolah."
        breadcrumb={[
          { label: "Informasi", href: "/berita" },
          { label: "Berita Terkini" },
        ]}
      >
        <div className="text-right">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Artikel
          </p>
          <p className="text-2xl sm:text-3xl font-black text-foreground">
            {total} <span className="text-sm font-medium text-muted-foreground">Berita</span>
          </p>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 md:px-8 space-y-8">
        {/* Search & Category Filter Pills */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <form method="GET" className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari judul berita atau topik kegiatan..."
              className="pl-10 pr-24 rounded-xl h-11 bg-card border text-sm"
            />
            {categorySlug !== "ALL" && (
              <input type="hidden" name="kategori" value={categorySlug} />
            )}
            <Button
              type="submit"
              size="sm"
              className="absolute right-1.5 rounded-lg px-4 h-8 font-semibold"
            >
              Cari
            </Button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.slug}
                asChild
                size="sm"
                variant={categorySlug === cat.slug ? "default" : "outline"}
                className="rounded-xl text-xs font-semibold"
              >
                <Link
                  href={
                    cat.slug === "ALL"
                      ? `/berita${query ? `?q=${query}` : ""}`
                      : `/berita?kategori=${cat.slug}${query ? `&q=${query}` : ""}`
                  }
                >
                  {cat.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            title="Berita Tidak Ditemukan"
            description={`Tidak ada artikel berita yang cocok dengan kriteria pencarian Anda.`}
            action={
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <Link href="/berita">Reset Pencarian</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
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
              <Link
                href={`/berita?q=${query}&kategori=${categorySlug}&page=${Math.max(
                  1,
                  page - 1
                )}`}
              >
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
              <Link
                href={`/berita?q=${query}&kategori=${categorySlug}&page=${Math.min(
                  totalPages,
                  page + 1
                )}`}
              >
                Berikutnya <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
