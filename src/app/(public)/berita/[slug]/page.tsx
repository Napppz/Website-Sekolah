import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calendar,
  Eye,
  User,
  ArrowLeft,
  Share2,
  Tag,
  Newspaper,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getNewsBySlug, getNews } from "@/lib/data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getNewsBySlug(slug)
  if (!item) return { title: "Berita Tidak Ditemukan" }

  return {
    title: item.title,
    description: item.excerpt || item.content.slice(0, 150),
    openGraph: {
      title: item.title,
      description: item.excerpt || item.content.slice(0, 150),
      images: item.thumbnail ? [{ url: item.thumbnail }] : [],
    },
  }
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getNewsBySlug(slug)
  const { news: relatedNews } = await getNews(undefined, undefined, 1, 3)

  if (!item) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Article Content (8 cols) */}
        <article className="lg:col-span-8 space-y-8">
          <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
            <Link href="/berita" className="flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Daftar Berita
            </Link>
          </Button>

          {/* Header Metadata */}
          <div className="space-y-4">
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              {item.category?.name || "Warta Sekolah"}
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2]">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-y py-3">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <User className="h-4 w-4 text-primary" />
                {item.author?.name || "Administrator"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-primary" />
                {item.views} kali dilihat
              </span>
            </div>
          </div>

          {/* Featured Thumbnail */}
          {item.thumbnail && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted shadow-md">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Body */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4">
            {item.content}
          </div>

          {/* Share & Tags */}
          <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Tag className="h-4 w-4 text-primary" />
              <span>Kategori: <strong>{item.category?.name}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Bagikan:</span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-1.5 text-xs"
                onClick={() => {}}
              >
                <Share2 className="h-3.5 w-3.5" />
                Share Artikel
              </Button>
            </div>
          </div>
        </article>

        {/* Sidebar / Related (4 cols) */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-primary" />
              Berita Lainnya
            </h3>
            <Separator />
            <div className="space-y-4">
              {relatedNews
                .filter((r) => r.slug !== slug)
                .slice(0, 4)
                .map((rel) => (
                  <div key={rel.id} className="space-y-1 group">
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(rel.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/berita/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                ))}
            </div>
          </div>

          {/* PPDB Banner Widget */}
          <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-700 text-primary-foreground p-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
              Pendaftaran Siswa Baru
            </p>
            <h4 className="font-bold text-lg leading-tight">
              Tertarik Bergabung dengan Kami?
            </h4>
            <p className="text-xs text-primary-foreground/90">
              Daftar online sekarang untuk tahun ajaran 2026/2027 melalui portal resmi PPDB.
            </p>
            <Button asChild size="sm" variant="secondary" className="w-full font-semibold">
              <Link href="/ppdb/daftar">Daftar Sekarang</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
