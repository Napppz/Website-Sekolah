import { Metadata } from "next"
import {
  Megaphone,
  Calendar,
  Download,
  FileText,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { getAnnouncements } from "@/lib/data"

export const metadata: Metadata = {
  title: "Pemberitahuan & Pengumuman Resmi",
  description:
    "Daftar surat edaran dan pengumuman resmi bagi siswa, orang tua murid, dan civitas akademika SMK Negeri 1 Digital Nusantara.",
}

export default async function PengumumanPage() {
  const announcements = await getAnnouncements(20)

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Pemberitahuan Kedinasan"
        title="Pengumuman Resmi Sekolah"
        subtitle="Arsip pengumuman penting, surat edaran kedinasan, dan jadwal kegiatan resmi sekolah."
        breadcrumb={[
          { label: "Informasi", href: "/berita" },
          { label: "Pengumuman" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8 space-y-6 max-w-4xl">
        {announcements.length === 0 ? (
          <EmptyState
            icon={Megaphone}
            title="Belum Ada Pengumuman"
            description="Saat ini belum ada pengumuman resmi baru yang diterbitkan."
          />
        ) : (
          announcements.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-2xl border bg-card hover:border-primary/40 transition-colors shadow-2xs"
            >
              <CardContent className="p-6 sm:p-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>
                      Diterbitkan pada:{" "}
                      <strong className="text-foreground">
                        {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </strong>
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Edaran Aktif
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </div>

                {(item.fileAttachment || (item as any).fileUrl) && (
                  <div className="pt-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl text-xs gap-2 font-semibold"
                    >
                      <a href={(item.fileAttachment || (item as any).fileUrl) as string} target="_blank" rel="noreferrer">
                        <Download className="h-3.5 w-3.5" />
                        Unduh Berkas Lampiran PDF
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
