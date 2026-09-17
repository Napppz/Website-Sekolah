import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Eye,
  Megaphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  getSchoolProfile,
  getMajors,
  getAnnouncements,
  getEvents,
  getAchievements,
  getGallery,
  getStudentsStats,
  getNews,
} from "@/lib/data"

export default async function HomePage() {
  const profile = await getSchoolProfile()
  const majors = await getMajors()
  const { news } = await getNews(undefined, undefined, 1, 3)
  const announcements = await getAnnouncements(3)
  const events = await getEvents(3)
  const achievements = await getAchievements()
  const gallery = await getGallery()
  const stats = await getStudentsStats()

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Decorative background blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs backdrop-blur-xs">
                <Sparkles className="h-4 w-4" />
                <span>Akreditasi A Unggul • SMK Pusat Keunggulan</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {profile.name}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-primary">
                "{profile.slogan}"
              </p>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {profile.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild size="lg" className="rounded-full shadow-md shadow-primary/20">
                  <Link href="/ppdb" className="flex items-center gap-2">
                    Informasi PPDB 2026
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/profil">Tentang Sekolah</Link>
                </Button>
              </div>

              {/* Highlight metrics */}
              <div className="pt-6 border-t grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stats.total}+
                  </p>
                  <p className="text-xs text-muted-foreground">Siswa Aktif</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">
                    100%
                  </p>
                  <p className="text-xs text-muted-foreground">Sertifikasi Profesi</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">
                    35+
                  </p>
                  <p className="text-xs text-muted-foreground">Mitra DUDI</p>
                </div>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                    alt="Siswa Sekolah Digital"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
                      Teknologi Masa Depan
                    </p>
                    <p className="text-sm font-semibold">
                      Mempersiapkan Talenta Digital Unggulan Indonesia
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-card border shadow-lg rounded-xl p-4 flex items-center gap-3 backdrop-blur-md">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Juara 1 Nasional</p>
                    <p className="text-sm font-bold text-foreground">
                      LKS Cloud Computing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAMBUTAN KEPALA SEKOLAH */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl border bg-card/60 backdrop-blur-xs p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-lg mb-4">
                <img
                  src={profile.principalPhoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"}
                  alt={profile.principalName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg text-foreground">{profile.principalName}</h3>
              <p className="text-xs text-muted-foreground font-medium">{profile.principalTitle}</p>
            </div>

            <div className="md:col-span-8 space-y-4">
              <Badge variant="secondary" className="px-3 py-1 text-xs">
                Sambutan Kepala Sekolah
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Membangun Peradaban Lewat Vokasi Berkualitas
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base italic">
                "{profile.principalSpeech.slice(0, 320)}..."
              </p>
              <div className="pt-2">
                <Button asChild variant="link" className="px-0 text-primary font-semibold">
                  <Link href="/profil" className="flex items-center gap-1">
                    Baca Sambutan Lengkap & Struktur Organisasi
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEUNGGULAN SEKOLAH */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="outline" className="px-3 py-1 text-xs">
            Kenapa Memilih Kami?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Keunggulan SMK Digital Nusantara
          </h2>
          <p className="text-sm text-muted-foreground">
            Ekosistem pendidikan komprehensif yang dirancang untuk mengantarkan siswa langsung terserap di industri teknologi maupun perguruan tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl border bg-card/50 hover:border-primary/50 transition-all hover:shadow-md">
            <CardContent className="p-6 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Kurikulum Sinkron Industri</h3>
              <p className="text-sm text-muted-foreground">
                Kurikulum diselaraskan langsung dengan standar kebutuhan teknologi terkini bersama Google Cloud, Cisco, dan AWS.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card/50 hover:border-primary/50 transition-all hover:shadow-md">
            <CardContent className="p-6 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Sertifikasi BNSP & Global</h3>
              <p className="text-sm text-muted-foreground">
                Lulusan dibekali sertifikasi kompetensi nasional BNSP (LSP-P1) serta sertifikasi internasional berlisensi.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card/50 hover:border-primary/50 transition-all hover:shadow-md">
            <CardContent className="p-6 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Smart Lab & AI Facilities</h3>
              <p className="text-sm text-muted-foreground">
                Laboratorium komputer high-end dengan GPU modern, studio multimedia 4K, dan perpustakaan digital terpadu.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card/50 hover:border-primary/50 transition-all hover:shadow-md">
            <CardContent className="p-6 space-y-3">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Penyaluran Kerja BKK</h3>
              <p className="text-sm text-muted-foreground">
                Bursa Kerja Khusus (BKK) aktif mendampingi karir alumni dengan serapan kerja industri di atas 90%.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. PROGRAM / JURUSAN UNGGULAN */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <Badge variant="secondary" className="px-3 py-1 text-xs mb-2">
              Program Keahlian
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Jurusan Terakreditasi Unggul
            </h2>
            <p className="text-sm text-muted-foreground">
              Pilihan konsentrasi keahlian masa depan yang relevan dengan perkembangan industri digital.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/jurusan" className="flex items-center gap-1.5">
              Lihat Semua Jurusan
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {majors.slice(0, 3).map((major) => (
            <Card
              key={major.id}
              className="overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  <img
                    src={major.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"}
                    alt={major.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 text-primary-foreground font-bold shadow-sm">
                      {major.code}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-2.5">
                  <h3 className="font-bold text-xl leading-tight text-foreground">
                    {major.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {major.description}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/jurusan">Pelajari Kompetensi & Karir</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. BERITA & PENGUMUMAN */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Berita Terbaru (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Berita Terkini
                </h2>
                <p className="text-xs text-muted-foreground">
                  Informasi seputar aktivitas, prestasi, dan inovasi sekolah
                </p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/berita" className="flex items-center gap-1">
                  Semua Berita
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden rounded-xl border bg-card flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                      <img
                        src={item.thumbnail || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <Badge variant="outline" className="text-[10px] px-2 py-0">
                          {item.category?.name || "Umum"}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </span>
                      </div>
                      <Link
                        href={`/berita/${item.slug}`}
                        className="block font-bold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <Link
                      href={`/berita/${item.slug}`}
                      className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                    >
                      Baca Selengkapnya
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Pengumuman Terbaru (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-primary" />
                  Pengumuman
                </h2>
                <p className="text-xs text-muted-foreground">
                  Informasi edaran dan pemberitahuan resmi
                </p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/pengumuman">Semua</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border bg-card p-4 hover:border-primary/40 transition-colors space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>
                      {new Date(a.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm leading-tight text-foreground line-clamp-2">
                    {a.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {a.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. AGENDA & KEGIATAN MENDATANG */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl border bg-muted/30 p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <Badge variant="outline" className="px-3 py-1 text-xs mb-2">
                Kalender Akademik
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Agenda & Kegiatan Mendatang
              </h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/agenda">Lihat Jadwal Lengkap</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border bg-card p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20 font-bold">
                      <span className="text-lg leading-none">
                        {new Date(e.startDate).getDate()}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider">
                        {new Date(e.startDate).toLocaleString("id-ID", {
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight line-clamp-2">
                        {e.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {e.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {e.description}
                  </p>
                </div>
                <div className="pt-2 border-t text-[11px] text-muted-foreground flex items-center justify-between">
                  <span>Waktu: 08.00 - Selesai</span>
                  <Link href="/agenda" className="text-primary font-medium hover:underline">
                    Rincian &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRESTASI TERBARU */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="secondary" className="px-3 py-1 text-xs mb-2">
              Hall of Fame
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Prestasi Membanggakan Siswa
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Bukti nyata dedikasi dan keunggulan talenta muda sekolah di kancah daerah hingga nasional.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/prestasi">Semua Prestasi</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.slice(0, 4).map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-2xl border bg-card flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={item.photo || "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <Badge className="bg-amber-500 text-white font-bold text-[10px]">
                      Tingkat {item.level}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[11px] font-semibold text-primary">
                    Tahun {item.year} • {item.category}
                  </span>
                  <h4 className="font-bold text-sm leading-tight line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Oleh: <strong className="text-foreground">{item.participant}</strong>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. SEKILAS GALERI */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="outline" className="px-3 py-1 text-xs mb-2">
              Dokumentasi Kampus
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Galeri Sekolah
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/galeri">Jelajahi Galeri</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {gallery.slice(0, 6).map((g) => (
            <div
              key={g.id}
              className="group relative aspect-square rounded-xl overflow-hidden border bg-muted shadow-xs"
            >
              <img
                src={g.imageUrl}
                alt={g.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                <p className="text-white text-[11px] font-medium leading-tight line-clamp-2">
                  {g.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CTA PPDB */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-blue-700 text-primary-foreground p-8 sm:p-12 md:p-16 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4 text-left">
            <Badge className="bg-background/20 text-white backdrop-blur-xs border-white/20">
              Penerimaan Siswa Baru T.A 2026/2027
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Siap Menjadi Talenta Digital Masa Depan?
            </h2>
            <p className="text-primary-foreground/90 text-sm sm:text-base leading-relaxed">
              Daftarkan diri Anda secara online sekarang juga. Kuota terbatas untuk 5 program keahlian unggulan. Dapatkan fasilitas beasiswa bagi pendaftar jalur prestasi.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Button asChild size="lg" variant="secondary" className="rounded-full shadow-lg font-bold">
                <Link href="/ppdb/daftar" className="flex items-center gap-2">
                  Daftar Sekarang Online
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <Link href="/ppdb">Panduan & Syarat PPDB</Link>
              </Button>
            </div>
          </div>

          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>
      </section>
    </div>
  )
}
