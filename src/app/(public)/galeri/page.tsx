import { Metadata } from "next"
import { getGallery } from "@/lib/data"
import { GalleryViewer } from "@/components/public/gallery-viewer"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Galeri Foto & Dokumentasi Sekolah",
  description: "Dokumentasi kegiatan akademik, ekstrakurikuler, fasilitas kampus, dan momen berharga civitas akademika SMK Negeri 1 Digital Nusantara.",
}

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>
}) {
  const params = await searchParams
  const category = params.kategori || "ALL"
  const items = await getGallery(category)

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Dokumentasi Visual
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Galeri Foto Kampus
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Potret ragam dinamika pembelajaran, fasilitas penunjang, serta kehangatan kebersamaan di lingkungan sekolah.
        </p>
      </div>

      <GalleryViewer items={items} activeCategory={category} />
    </div>
  )
}
