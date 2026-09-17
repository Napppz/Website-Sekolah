import { Metadata } from "next"
import Link from "next/link"
import {
  Users,
  GraduationCap,
  Layers,
  Newspaper,
  Megaphone,
  Trophy,
  UserCheck,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getDashboardStats } from "@/lib/data"

export const metadata: Metadata = {
  title: "Dashboard Overview",
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const statCards = [
    { title: "Total Guru", value: stats.totalTeachers, icon: Users, href: "/admin/guru", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Siswa", value: stats.totalStudents, icon: GraduationCap, href: "/admin/siswa", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Total Jurusan", value: stats.totalMajors, icon: Layers, href: "/admin/jurusan", color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Total Berita", value: stats.totalNews, icon: Newspaper, href: "/admin/berita", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Pengumuman", value: stats.totalAnnouncements, icon: Megaphone, href: "/admin/pengumuman", color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Prestasi", value: stats.totalAchievements, icon: Trophy, href: "/admin/prestasi", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "Pendaftar PPDB", value: stats.totalPPDB, icon: UserCheck, href: "/admin/ppdb", color: "text-rose-500", bg: "bg-rose-500/10" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Overview Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Ringkasan statistik data dan aktivitas operasional sekolah.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-xl">
            <Link href="/admin/berita">Tulis Berita Baru</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-xl">
            <Link href="/admin/ppdb">Verifikasi PPDB</Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <Link key={idx} href={card.href}>
              <Card className="rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-xs p-4 space-y-3 cursor-pointer">
                <div className={`h-10 w-10 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground line-clamp-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-black text-foreground mt-0.5">
                    {card.value}
                  </p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent PPDB Applicants (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="rounded-2xl border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-primary" />
                Pendaftar PPDB Terbaru
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-xs -mr-2">
                <Link href="/admin/ppdb" className="flex items-center gap-1">
                  Kelola Semua <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y text-xs">
                {stats.recentPPDB.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">{p.fullName}</p>
                      <p className="text-muted-foreground font-mono text-[11px]">
                        {p.registrationNo} • {p.major?.name || "RPL"}
                      </p>
                    </div>
                    <Badge
                      variant={
                        p.status === "ACCEPTED"
                          ? "default"
                          : p.status === "VERIFIED"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-[10px]"
                    >
                      {p.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent News Card */}
          <Card className="rounded-2xl border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-primary" />
                Warta & Berita Terbaru
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-xs -mr-2">
                <Link href="/admin/berita" className="flex items-center gap-1">
                  Semua Berita <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y text-xs">
                {stats.recentNews.map((n) => (
                  <div key={n.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-foreground line-clamp-1">
                        {n.title}
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        {n.category?.name || "Umum"}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-muted-foreground text-[11px] shrink-0">
                      <Eye className="h-3 w-3" />
                      {n.views} views
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Messages & Quick Links (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Contact Messages */}
          <Card className="rounded-2xl border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Pesan Kontak Masuk
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-xs -mr-2">
                <Link href="/admin/kontak" className="flex items-center gap-1">
                  Kotak Masuk <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y text-xs">
                {stats.recentMessages.length === 0 ? (
                  <p className="text-muted-foreground py-4 text-center">
                    Belum ada pesan kontak masuk.
                  </p>
                ) : (
                  stats.recentMessages.map((m) => (
                    <div key={m.id} className="py-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground">{m.name}</span>
                        {!m.isRead && (
                          <Badge variant="secondary" className="text-[9px] bg-primary/10 text-primary">
                            Baru
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground font-medium line-clamp-1">
                        {m.subject}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="rounded-2xl border bg-gradient-to-br from-card to-muted/40 p-6 space-y-4">
            <h3 className="font-bold text-sm text-foreground">
              Aksi Cepat Pengelolaan
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Button asChild variant="outline" size="sm" className="justify-start rounded-xl">
                <Link href="/admin/guru">+ Tambah Guru</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start rounded-xl">
                <Link href="/admin/siswa">+ Tambah Siswa</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start rounded-xl">
                <Link href="/admin/berita">+ Buat Berita</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start rounded-xl">
                <Link href="/admin/galeri">+ Unggah Galeri</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
