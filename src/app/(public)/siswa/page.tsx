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
import { PageHeader } from "@/components/common/page-header"
import { StatCounter } from "@/components/common/stat-counter"
import { getStudentsStats } from "@/lib/data"

export const metadata: Metadata = {
  title: "Statistik & Informasi Siswa",
  description:
    "Demografi, sebaran siswa per jurusan, dan rekam jejak aktivitas kesiswaan SMK Negeri 1 Digital Nusantara.",
}

export default async function SiswaPage() {
  const stats = await getStudentsStats()

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20">
      <PageHeader
        badge="Kesiswaan"
        title="Statistik & Profil Siswa"
        subtitle="Informasi transparan mengenai komposisi demografi peserta didik yang menempuh pendidikan di kampus kami."
        breadcrumb={[
          { label: "Akademik", href: "/jurusan" },
          { label: "Statistik Siswa" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8 space-y-16">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl border bg-card shadow-2xs">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Total Siswa Aktif
                </p>
                <p className="text-3xl font-extrabold text-foreground">
                  <StatCounter end={stats.total} />
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Tingkat X, XI, dan XII
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-2xs">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Siswa Laki-laki
                </p>
                <p className="text-3xl font-extrabold text-foreground">
                  <StatCounter end={stats.maleCount} />
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {stats.total > 0
                    ? Math.round((stats.maleCount / stats.total) * 100)
                    : 0}
                  % dari total siswa
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-2xs">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Siswa Perempuan
                </p>
                <p className="text-3xl font-extrabold text-foreground">
                  <StatCounter end={stats.femaleCount} />
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {stats.total > 0
                    ? Math.round((stats.femaleCount / stats.total) * 100)
                    : 0}
                  % dari total siswa
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-2xs">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Rombongan Belajar
                </p>
                <p className="text-3xl font-extrabold text-foreground">
                  <StatCounter end={stats.classCount || 24} />
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Rata-rata 32 siswa/kelas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribusi Per Jurusan & Tingkat Kelas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bar Distribusi Jurusan (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border bg-card p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Sebaran Siswa Berdasarkan Jurusan
                </h3>
                <p className="text-xs text-muted-foreground">
                  Proporsi peserta didik di 5 program keahlian
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {stats.majors.map((item, idx) => {
                const percentage =
                  stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm font-semibold">
                      <span className="text-foreground">{item.name} ({item.code})</span>
                      <span className="text-primary">
                        {item.count} Siswa ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Rombel Per Tingkat Kelas (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border bg-card p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <PieChart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Sebaran Tingkat Kelas
                </h3>
                <p className="text-xs text-muted-foreground">
                  Jenjang kelas X, XI, dan XII
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { className: "X", count: Math.round(stats.total * 0.36), rombel: Math.round((stats.classCount || 24) / 3) },
                { className: "XI", count: Math.round(stats.total * 0.33), rombel: Math.round((stats.classCount || 24) / 3) },
                { className: "XII", count: Math.max(0, stats.total - Math.round(stats.total * 0.36) - Math.round(stats.total * 0.33)), rombel: Math.max(1, (stats.classCount || 24) - (Math.round((stats.classCount || 24) / 3) * 2)) },
              ].map((item, idx) => {
                const percentage =
                  stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-2xl border bg-background"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {item.className}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          Tingkat Kelas {item.className}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.rombel} Rombongan Belajar
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-extrabold text-foreground">
                        {item.count} Siswa
                      </p>
                      <p className="text-[11px] text-primary font-semibold">
                        {percentage}%
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
