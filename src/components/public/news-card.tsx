import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface NewsItemProps {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content?: string
  thumbnail?: string | null
  author?: string | { name: string } | null
  category?: { name: string } | string | null
  publishedAt?: Date | string
  createdAt?: Date | string
}

interface NewsCardProps {
  item: NewsItemProps
  featured?: boolean
  compact?: boolean
  className?: string
}

export function NewsCard({
  item,
  featured = false,
  compact = false,
  className = "",
}: NewsCardProps) {
  const categoryName =
    typeof item.category === "object" && item.category !== null
      ? item.category.name
      : typeof item.category === "string"
      ? item.category
      : "Warta Sekolah"

  const authorName =
    typeof item.author === "object" && item.author !== null
      ? item.author.name
      : typeof item.author === "string"
      ? item.author
      : null

  const displayDate = item.publishedAt || item.createdAt
  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Terbaru"

  const imageSrc =
    item.thumbnail ||
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"

  // Compact layout (used on the right of featured news or in sidebars)
  if (compact) {
    return (
      <article
        className={`group flex items-start gap-4 p-3.5 rounded-2xl border bg-card hover:border-primary/40 hover:shadow-xs transition-all ${className}`}
      >
        <div className="relative h-20 w-24 sm:h-24 sm:w-28 rounded-xl overflow-hidden bg-muted shrink-0">
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="120px"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <Badge
            variant="outline"
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-primary/5 text-primary border-primary/20"
          >
            {categoryName}
          </Badge>
          <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/berita/${item.slug}`}>{item.title}</Link>
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>
        </div>
      </article>
    )
  }

  // Featured large article layout
  if (featured) {
    return (
      <article
        className={`group flex flex-col justify-between rounded-3xl border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all h-full ${className}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1 rounded-full shadow-xs">
              {categoryName}
            </Badge>
          </div>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
              {authorName && (
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {authorName}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors">
              <Link href={`/berita/${item.slug}`}>{item.title}</Link>
            </h3>
            {item.excerpt && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
            )}
          </div>

          <div className="pt-2 border-t">
            <Link
              href={`/berita/${item.slug}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              Baca Selengkapnya
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // Standard Grid Card layout
  return (
    <article
      className={`group flex flex-col rounded-2xl border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xs transition-all ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground font-semibold backdrop-blur-xs text-[11px] px-2.5 py-0.5 rounded-full"
          >
            {categoryName}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            {authorName && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {authorName}
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/berita/${item.slug}`}>{item.title}</Link>
          </h3>
          {item.excerpt && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {item.excerpt}
            </p>
          )}
        </div>

        <div className="pt-2 border-t flex justify-end">
          <Link
            href={`/berita/${item.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
          >
            Baca Selengkapnya
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
