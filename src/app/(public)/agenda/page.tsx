import { Metadata } from "next"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getEvents } from "@/lib/data"

export const metadata: Metadata = {
  title: "Agenda & Kalender Kegiatan",
  description: "Jadwal kegiatan akademik, ujian kompetensi, workshop, seminar, dan acara resmi SMK Negeri 1 Digital Nusantara.",
}

export default async function AgendaPage() {
  const events = await getEvents(20)

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Kalender Kegiatan
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Agenda & Kegiatan Sekolah
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Jadwal resmi pelaksanaan agenda akademik, pameran karya, ujian sertifikasi, dan ekstrakurikuler.
        </p>
      </div>

      {/* Events Timeline / List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {events.map((event) => {
          const start = new Date(event.startDate)
          const end = event.endDate ? new Date(event.endDate) : null

          return (
            <Card
              key={event.id}
              className="overflow-hidden rounded-2xl border bg-card/80 hover:border-primary/50 transition-all hover:shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
                {/* Date Block */}
                <div className="md:col-span-3 flex md:flex-col items-center justify-center p-4 rounded-xl bg-primary/10 text-primary text-center border border-primary/20 gap-3 md:gap-0">
                  <span className="text-3xl sm:text-4xl font-extrabold leading-none">
                    {start.getDate()}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wider mt-1">
                    {start.toLocaleString("id-ID", { month: "long" })}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {start.getFullYear()}
                  </span>
                </div>

                {/* Content Block */}
                <div className="md:col-span-9 space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {event.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      Pukul 08.00 WIB - Selesai
                    </span>
                    {end && (
                      <span className="text-xs text-primary font-medium">
                        (Berakhir s.d {end.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })})
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
