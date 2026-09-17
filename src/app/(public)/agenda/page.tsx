import { Metadata } from "next"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { getEvents } from "@/lib/data"

export const metadata: Metadata = {
  title: "Agenda & Kalender Kegiatan",
  description:
    "Jadwal kegiatan akademik, ujian kompetensi, workshop, seminar, dan acara resmi SMK Negeri 1 Digital Nusantara.",
}

export default async function AgendaPage() {
  const events = await getEvents(20)

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Kalender Kegiatan"
        title="Agenda & Kegiatan Sekolah"
        subtitle="Jadwal resmi pelaksanaan agenda akademik, pameran karya, ujian sertifikasi, dan ekstrakurikuler."
        breadcrumb={[
          { label: "Informasi", href: "/berita" },
          { label: "Agenda Kegiatan" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8 space-y-4 max-w-4xl">
        {events.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Belum Ada Agenda"
            description="Saat ini belum ada jadwal agenda mendatang yang tercatat."
          />
        ) : (
          events.map((event) => {
            const start = new Date(event.startDate)
            const end = event.endDate ? new Date(event.endDate) : null

            return (
              <Card
                key={event.id}
                className="overflow-hidden rounded-2xl border bg-card hover:border-primary/40 transition-colors shadow-2xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 items-center">
                  {/* Date Block (3 cols) */}
                  <div className="md:col-span-3 flex md:flex-col items-center justify-center p-4 rounded-xl bg-primary text-primary-foreground text-center shadow-xs gap-3 md:gap-0">
                    <span className="text-3xl sm:text-4xl font-black leading-none">
                      {start.getDate()}
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-wider mt-1 opacity-90">
                      {start.toLocaleString("id-ID", { month: "short" })}
                    </span>
                    <span className="text-[11px] font-medium opacity-80">
                      {start.getFullYear()}
                    </span>
                  </div>

                  {/* Content Block (9 cols) */}
                  <div className="md:col-span-9 space-y-2">
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {event.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="font-medium text-foreground">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>08.00 - 15.00 WIB</span>
                      </div>
                      {end && (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span>s/d {end.toLocaleDateString("id-ID")}</span>
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
