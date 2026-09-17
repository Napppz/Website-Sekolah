import { Metadata } from "next"
import { Megaphone, Calendar, Download, FileText, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAnnouncements } from "@/lib/data"

export const metadata: Metadata = {
  title: "Pemberitahuan & Pengumuman Resmi",
  description: "Daftar surat edaran dan pengumuman resmi bagi siswa, orang tua murid, dan civitas akademika SMK Negeri 1 Digital Nusantara.",
}

export default async function PengumumanPage() {
  const announcements = await getAnnouncements(20)

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Pemberitahuan
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Pengumuman Resmi Sekolah
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Arsip pengumuman penting, surat edaran kedinasan, dan jadwal kegiatan resmi sekolah.
        </p>
      </div>

      {/* Announcements List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {announcements.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden rounded-2xl border bg-card/70 hover:border-primary/50 transition-all hover:shadow-md"
          >
            <CardContent className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    Dipublikasikan pada:{" "}
                    <strong>
                      {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </strong>
                  </span>
                </div>
                <Badge variant="secondary" className="text-[10px] text-emerald-600 bg-emerald-500/10">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Aktif
                </Badge>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {item.title}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {item.content}
              </p>

              {item.fileAttachment && (
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm" className="gap-2 text-xs">
                    <a href={item.fileAttachment} download target="_blank" rel="noreferrer">
                      <Download className="h-4 w-4 text-primary" />
                      Unduh Lampiran Dokumen
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
