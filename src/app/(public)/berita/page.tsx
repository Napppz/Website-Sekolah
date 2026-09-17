import { Metadata } from "next"
import Link from "next/link"
import { Search, Calendar, Eye, User, Newspaper, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getNews } from "@/lib/data"

export const metadata: Metadata = {
  title: "Warta & Berita Terkini",
  description: "Kumpulan artikel, pengumuman liputan kegiatan, dan kabar prestasi terbaru civitas akademika SMK Negeri 1 Digital Nusantara.",
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
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Warta & Publikasi
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Kabar & Berita Terkini
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Ikuti perkembangan informasi terbaru seputar prestasi, inovasi teknologi, dan ragam kegiatan sekolah.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <form method="GET" className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Cari judul berita atau topik kegiatan..."
            className="pl-10 pr-24 rounded-full h-11"
          />
          <Button type="submit" size="sm" className="absolute right-1.5 rounded-full px-4">
            Cari
          </Button>
        </form>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c.slug}
              asChild
              size="sm"
              variant={categorySlug === c.slug ? "default" : "outline"}
              className="rounded-full text-xs"
            >
              <Link
                href={
                  c.slug === "ALL"
                    ? `/berita${query ? `?q=${query}` : ""}`
                    : `/berita?kategori=${c.slug}${query ? `&q=${query}` : ""}`
                }
              >
                {c.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {news.length === 0 ? (
        <div className="text-center py-16 space-y-3 border rounded-2xl bg-muted/20 max-w-md mx-auto">
          <Newspaper className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">Tidak Ada Berita</h3>
          <p className="text-sm text-muted-foreground">
            Tidak ditemukan artikel berita yang sesuai dengan filter atau kata kunci Anda.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/berita">Reset Filter</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <img
                    src={item.thumbnail || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 text-foreground text-[10px] font-semibold backdrop-blur-xs">
                      {item.category?.name || "Umum"}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {item.views} views
                    </span>
                  </div>

                  <h3 className="font-bold text-lg leading-snug text-foreground hover:text-primary transition-colors">
                    <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.excerpt || item.content.slice(0, 120)}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {item.author?.name || "Admin Sekolah"}
                </span>
                <Link
                  href={`/berita/${item.slug}`}
                  className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                >
                  Selengkapnya
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              asChild
              size="sm"
              variant={p === page ? "default" : "outline"}
              className="h-9 w-9 p-0"
            >
              <Link
                href={`/berita?page=${p}${query ? `&q=${query}` : ""}${
                  categorySlug !== "ALL" ? `&kategori=${categorySlug}` : ""
                }`}
              >
                {p}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
