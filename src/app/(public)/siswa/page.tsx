import { Metadata } from "next"
import {
  GraduationCap,
  Users,
  PieChart,
  Layers,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getStudentsStats } from "@/lib/data"

export const metadata: Metadata = {
  title: "Statistik & Informasi Siswa",
  description: "Demografi, sebaran siswa per jurusan, dan rekam jejak aktivitas kesiswaan SMK Negeri 1 Digital Nusantara.",
}

export default async function SiswaPage() {
  const stats = await getStudentsStats()

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Kesiswaan
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Statistik & Profil Siswa
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Informasi transparan mengenai komposisi demografi peserta didik yang menempuh pendidikan di kampus kami.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl border bg-card/60 backdrop-blur-xs shadow-xs">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Total Siswa Aktif
              </p>
              <p className="text-3xl font-extrabold text-foreground">{stats.total}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Tingkat X, XI, dan XII</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border bg-card/60 backdrop-blur-xs shadow-xs">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Siswa Laki-laki
              </p>
              <p className="text-3xl font-extrabold text-foreground">{stats.maleCount}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {Math.round((stats.maleCount / stats.total) * 100)}% dari total siswa
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border bg-card/60 backdrop-blur-xs shadow-xs">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Siswa Perempuan
              </p>
              <p className="text-3xl font-extrabold text-foreground">{stats.femaleCount}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {Math.round((stats.femaleCount / stats.total) * 100)}% dari total siswa
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border bg-card/60 backdrop-blur-xs shadow-xs">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Layers className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Rombongan Belajar
              </p>
              <p className="text-3xl font-extrabold text-foreground">{stats.classCount}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Kelas Terdistribusi</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sebaran Siswa Per Jurusan */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <PieChart className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Distribusi Siswa Per Program Keahlian
            </h2>
            <p className="text-xs text-muted-foreground">Sebaran data siswa pada setiap konsentrasi jurusan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.majors.map((major) => {
            const percentage = Math.round((major.count / stats.total) * 100) || 20
            return (
              <Card key={major.code} className="rounded-2xl border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-bold text-xs">
                    {major.code}
                  </Badge>
                  <span className="text-xs font-semibold text-primary">{percentage}%</span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground leading-tight">
                    {major.name}
                  </h3>
                  <p className="text-2xl font-extrabold text-foreground mt-2">
                    {major.count}{" "}
                    <span className="text-xs font-normal text-muted-foreground">Siswa</span>
                  </p>
                </div>
                {/* Progress bar visual */}
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Ekstrakurikuler Unggulan */}
      <section className="rounded-3xl border bg-muted/30 p-8 md:p-12 space-y-6">
        <div>
          <Badge variant="outline" className="px-3 py-1 text-xs mb-2">
            Pengembangan Bakat
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Aktivitas & Ekstrakurikuler
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Wadah pengembangan karakter, kepemimpinan, dan hobi minat bakat siswa di luar jam akademik.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {[
            { name: "Cyber Club & Coding", category: "Teknologi" },
            { name: "Robotika & IoT", category: "Teknologi" },
            { name: "Sinematografi DKV", category: "Seni" },
            { name: "Futsal & Basket", category: "Olahraga" },
            { name: "PMR & KSR", category: "Kemanusiaan" },
            { name: "Rohis & English Club", category: "Keagamaan & Bahasa" },
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border bg-card p-4 space-y-1 shadow-2xs">
              <p className="font-bold text-sm text-foreground">{item.name}</p>
              <p className="text-[11px] text-muted-foreground">{item.category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
