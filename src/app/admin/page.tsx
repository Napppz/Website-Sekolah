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
  CheckCircle2,
  AlertCircle,
  Plus,
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
    {
      title: "Total Siswa",
      value: stats.totalStudents,
      icon: GraduationCap,
      href: "/admin/siswa",
      trend: "Terdaftar aktif",
      highlight: true,
    },
    {
      title: "Total Guru",
      value: stats.totalTeachers,
      icon: Users,
      href: "/admin/guru",
      trend: "Tenaga ahli",
    },
    {
      title: "Program Keahlian",
      value: stats.totalMajors,
      icon: Layers,
      href: "/admin/jurusan",
      trend: "5 Konsentrasi",
    },
    {
      title: "Pendaftar PPDB",
      value: stats.totalPPDB,
      icon: UserCheck,
      href: "/admin/ppdb",
      trend: "Periode 2026",
      badge: "Baru",
    },
    {
      title: "Artikel Berita",
      value: stats.totalNews,
      icon: Newspaper,
      href: "/admin/berita",
      trend: "Terpublikasi",
    },
    {
      title: "Pengumuman",
      value: stats.totalAnnouncements,
      icon: Megaphone,
      href: "/admin/pengumuman",
      trend: "Edaran resmi",
    },
    {
      title: "Prestasi Juara",
      value: stats.totalAchievements,
      icon: Trophy,
      href: "/admin/prestasi",
      trend: "Tingkat nasional",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Overview Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Ringkasan metrik statistik operasional dan manajemen data sekolah.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-xl gap-1.5 font-semibold">
            <Link href="/admin/berita">
              <Plus className="h-4 w-4" />
              Tulis Berita
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-xl font-semibold">
            <Link href="/admin/ppdb">Verifikasi PPDB</Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards (7 Cards Clean SaaS Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <Link key={idx} href={card.href}>
              <Card
                className={`rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-xs p-4 space-y-3 cursor-pointer ${
                  card.highlight ? "ring-1 ring-primary/20 bg-primary/2" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  {card.badge && (
                    <Badge className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                      {card.badge}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground tracking-tight">
                    {card.value}
                  </p>
                  <p className="text-[11px] font-bold text-foreground line-clamp-1 mt-0.5">
                    {card.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">
                    {card.trend}
                  </p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* 2-Column Operational Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pendaftar PPDB Terbaru (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="rounded-2xl border bg-card shadow-2xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                <UserCheck className="h-4 w-4 text-primary" />
                Pendaftar PPDB Terbaru
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-xs text-primary font-semibold -mr-2">
                <Link href="/admin/ppdb" className="flex items-center gap-1">
                  Kelola Semua <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y text-xs">
                {stats.recentPPDB.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    Belum ada data pendaftar baru
                  </div>
                ) : (
                  stats.recentPPDB.map((p) => {
                    const statusConfig = {
                      PENDING: { label: "Menunggu", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" },
                      VERIFIED: { label: "Terverifikasi", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
                      ACCEPTED: { label: "Diterima", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
                      REJECTED: { label: "Ditolak", color: "bg-destructive/10 text-destructive border-destructive/30" },
                    }[p.status] || { label: p.status, color: "bg-muted text-muted-foreground border-border" }

                    return (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">
                              {p.fullName}
                            </span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {p.registrationNo}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Pilihan:{" "}
                            <span className="font-medium text-foreground">
                              {p.major?.name || "Program Keahlian"}
                            </span>{" "}
                            • Asal: {(p as any).previousSchool || "-"}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </Badge>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Berita & Pesan Masuk (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Berita Terbaru */}
          <Card className="rounded-2xl border bg-card shadow-2xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                <Newspaper className="h-4 w-4 text-primary" />
                Artikel Berita Terbaru
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-xs text-primary font-semibold -mr-2">
                <Link href="/admin/berita">Semua</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y text-xs">
                {stats.recentNews.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-4 space-y-1 hover:bg-muted/30 transition-colors">
                    <p className="font-bold text-foreground line-clamp-1">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>
                        {new Date((item as any).publishedAt || (item as any).createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span>•</span>
                      <span className="text-primary font-medium">
                        {typeof item.category === "object" && item.category !== null
                          ? item.category.name
                          : "Warta"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pesan Masuk Terbaru */}
          <Card className="rounded-2xl border bg-card shadow-2xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                <MessageSquare className="h-4 w-4 text-primary" />
                Pesan Kontak Masuk
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-xs text-primary font-semibold -mr-2">
                <Link href="/admin/kontak">Semua</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y text-xs">
                {stats.recentMessages.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    Tidak ada pesan baru
                  </div>
                ) : (
                  stats.recentMessages.map((msg) => (
                    <div key={msg.id} className="p-4 space-y-1 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-foreground truncate max-w-[200px]">
                          {msg.name}
                        </p>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <p className="font-medium text-foreground line-clamp-1">
                        {msg.subject}
                      </p>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">
                        {(msg as any).message || ""}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
