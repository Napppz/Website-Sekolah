"use client"

import * as React from "react"
import Link from "next/link"
import { Image as ImageIcon, X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

interface GalleryItem {
  id: string
  title: string
  description?: string | null
  imageUrl: string
  category: string
  albumName?: string | null
}

const CATEGORIES = ["ALL", "Fasilitas", "Kegiatan", "Prestasi", "Ekstrakurikuler"]

export function GalleryViewer({
  items,
  activeCategory,
}: {
  items: GalleryItem[]
  activeCategory: string
}) {
  const [selectedItem, setSelectedItem] = React.useState<GalleryItem | null>(null)

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            asChild
            size="sm"
            variant={activeCategory === cat ? "default" : "outline"}
            className="rounded-full text-xs"
          >
            <Link href={cat === "ALL" ? "/galeri" : `/galeri?kategori=${cat}`}>
              {cat === "ALL" ? "Semua Foto" : cat}
            </Link>
          </Button>
        ))}
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="text-center py-16 space-y-3 border rounded-2xl bg-muted/20">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">Belum Ada Foto</h3>
          <p className="text-sm text-muted-foreground">
            Kategori ini belum memiliki dokumentasi foto.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden border bg-muted cursor-pointer shadow-xs"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 text-white">
                <Badge variant="secondary" className="w-fit text-[10px] mb-1.5 bg-white/20 text-white backdrop-blur-xs">
                  {item.category}
                </Badge>
                <p className="font-bold text-sm leading-tight line-clamp-2">
                  {item.title}
                </p>
                {item.albumName && (
                  <p className="text-[11px] text-white/75 mt-0.5">
                    Album: {item.albumName}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1 text-[11px] text-primary-foreground font-semibold">
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>Perbesar Foto</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border">
          {selectedItem && (
            <div>
              <div className="relative aspect-[16/10] w-full bg-black/90">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedItem.category}</Badge>
                  {selectedItem.albumName && (
                    <span className="text-xs text-muted-foreground">
                      Album: {selectedItem.albumName}
                    </span>
                  )}
                </div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {selectedItem.title}
                </DialogTitle>
                {selectedItem.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
