import { Metadata } from "next"
import { getGallery } from "@/lib/data"
import { GalleryViewer } from "@/components/public/gallery-viewer"
import { PageHeader } from "@/components/common/page-header"

export const metadata: Metadata = {
  title: "Galeri Foto & Dokumentasi Sekolah",
  description:
    "Dokumentasi kegiatan akademik, ekstrakurikuler, fasilitas kampus, dan momen berharga civitas akademika SMK Negeri 1 Digital Nusantara.",
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
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Dokumentasi Visual"
        title="Galeri Foto Kampus"
        subtitle="Potret ragam dinamika pembelajaran, fasilitas penunjang, serta kehangatan kebersamaan di lingkungan sekolah."
        breadcrumb={[
          { label: "Informasi", href: "/berita" },
          { label: "Galeri Foto" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8">
        <GalleryViewer items={items} activeCategory={category} />
      </div>
    </div>
  )
}
