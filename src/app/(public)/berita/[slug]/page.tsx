import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Tag,
  Newspaper,
  BookOpen,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { NewsCard } from "@/components/public/news-card"
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
  const { news: relatedNews } = await getNews(undefined, undefined, 1, 4)

  if (!item) {
    notFound()
  }

  const categoryName =
    typeof item.category === "object" && item.category !== null
      ? item.category.name
      : typeof item.category === "string"
      ? item.category
      : "Warta Sekolah"

  const otherArticles = relatedNews.filter((n) => n.id !== item.id).slice(0, 3)

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-14 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Breadcrumb
          items={[
            { label: "Informasi", href: "/berita" },
            { label: "Berita", href: "/berita" },
            { label: item.title },
          ]}
        />
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-xs font-semibold text-muted-foreground w-fit -ml-2 sm:ml-0"
        >
          <Link href="/berita" className="flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Berita
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Article Content (8 cols) */}
        <article className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full">
              {categoryName}
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              {item.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1 border-b pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {new Date(item.createdAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                {(typeof item.author === "object" && item.author !== null) ? item.author.name : (item.author || "Tim Redaksi Humas")}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {item.thumbnail && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xs border bg-muted">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/90 text-base leading-relaxed space-y-4">
            {item.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg leading-relaxed text-muted-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>

          <Separator className="my-8" />

          {/* Article Footer & Tags */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Tag className="h-3.5 w-3.5 text-primary" />
              <span>Kategori:</span>
              <span className="font-semibold text-foreground">{categoryName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs gap-1.5"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard?.writeText(window.location.href)
                  }
                }}
              >
                <Share2 className="h-3.5 w-3.5" />
                Salin Tautan
              </Button>
            </div>
          </div>
        </article>

        {/* Sidebar Related Articles (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border bg-card p-5 space-y-4 shadow-2xs">
            <h2 className="font-extrabold text-base text-foreground flex items-center gap-2 border-b pb-3">
              <Newspaper className="h-4 w-4 text-primary" />
              Warta Terkait Lainnya
            </h2>
            <div className="space-y-3">
              {otherArticles.map((rel) => (
                <NewsCard key={rel.id} item={rel} compact />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-primary/5 p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <BookOpen className="h-4 w-4" />
              Informasi Pendaftaran Siswa
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ingin menjadi bagian dari keluarga besar SMKN 1 Digital Nusantara?
              Pendaftaran PPDB 2026/2027 telah dibuka secara daring.
            </p>
            <Button asChild size="sm" className="w-full rounded-xl text-xs font-semibold">
              <Link href="/ppdb/daftar">Daftar PPDB Sekarang</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
