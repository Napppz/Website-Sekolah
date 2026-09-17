import { Metadata } from "next"
import Link from "next/link"
import { Users, Search, Mail, Phone, BookOpen, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getTeachers } from "@/lib/data"

export const metadata: Metadata = {
  title: "Direktori Guru & Tenaga Pendidik",
  description: "Daftar pengajar profesional dan tenaga pendidik berdedikasi tinggi di SMK Negeri 1 Digital Nusantara.",
}

export default async function GuruPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; mapel?: string; page?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const subject = params.mapel || "ALL"
  const page = Number(params.page) || 1

  const { teachers, total, totalPages } = await getTeachers(query, subject, page, 12)

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Civitas Akademika
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Direktori Guru & Tenaga Pendidik
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Dibimbing oleh praktisi ahli dan akademisi berpengalaman yang berdedikasi membina potensi setiap siswa.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto">
        <form method="GET" className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Cari nama guru atau mata pelajaran..."
            className="pl-10 pr-24 rounded-full h-11"
          />
          <Button type="submit" size="sm" className="absolute right-1.5 rounded-full px-4">
            Cari
          </Button>
        </form>
      </div>

      {/* Teachers Grid */}
      {teachers.length === 0 ? (
        <div className="text-center py-16 space-y-3 border rounded-2xl bg-muted/20">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">Guru Tidak Ditemukan</h3>
          <p className="text-sm text-muted-foreground">
            Tidak ada data guru yang cocok dengan kata kunci pencarian Anda.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/guru">Reset Pencarian</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={teacher.photo || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <Badge variant="secondary" className="text-[10px] font-semibold bg-background/90 backdrop-blur-xs">
                      {teacher.gender === "L" ? "Laki-laki" : "Perempuan"}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base leading-snug text-foreground">
                    {teacher.name}
                  </h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p className="font-medium text-primary line-clamp-1">
                      {teacher.position}
                    </p>
                    <p className="flex items-center gap-1.5 line-clamp-1">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span>{teacher.subject}</span>
                    </p>
                    <p className="font-mono text-[11px] opacity-75">
                      NIP: {teacher.nip}
                    </p>
                  </div>
                </div>
              </div>

              {teacher.email && (
                <div className="px-5 pb-5 pt-0">
                  <a
                    href={`mailto:${teacher.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate max-w-[200px]">{teacher.email}</span>
                  </a>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              asChild
              size="sm"
              variant={p === page ? "default" : "outline"}
              className="h-9 w-9 p-0"
            >
              <Link href={`/guru?page=${p}${query ? `&q=${query}` : ""}`}>{p}</Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
