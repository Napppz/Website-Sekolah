import Link from "next/link"
import Image from "next/image"
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  Trophy,
  Megaphone,
  UserPlus,
  Compass,
  MapPin,
  Clock,
  Download,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/common/section-heading"
import { StatCounter } from "@/components/common/stat-counter"
import { NewsCard } from "@/components/public/news-card"
import { AchievementCard } from "@/components/public/achievement-card"
import { FacilityCard } from "@/components/public/facility-card"
import { GalleryViewer } from "@/components/public/gallery-viewer"
import {
  getSchoolProfile,
  getMajors,
  getAnnouncements,
  getEvents,
  getAchievements,
  getGallery,
  getStudentsStats,
  getNews,
  getTeachers,
  getFacilities,
} from "@/lib/data"

export default async function HomePage() {
  const profile = await getSchoolProfile()
  const majors = await getMajors()
  const { news } = await getNews(undefined, undefined, 1, 4)
  const announcements = await getAnnouncements(4)
  const events = await getEvents(3)
  const achievements = await getAchievements()
  const facilities = await getFacilities()
  const gallery = await getGallery()
  const stats = await getStudentsStats()
  const { teachers } = await getTeachers(undefined, undefined, 1, 100)

  const featuredNews = news[0]
  const sideNews = news.slice(1, 4)

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b bg-gradient-to-b from-card/80 via-background to-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Akreditasi A Unggul • SMK Pusat Keunggulan</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  {profile.name}
                </h1>
                <p className="text-base sm:text-xl font-semibold text-primary">
                  &ldquo;{profile.slogan}&rdquo;
                </p>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {profile.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl font-semibold px-6 h-12 shadow-sm gap-2"
                >
                  <Link href="/ppdb/daftar">
                    <UserPlus className="h-4 w-4" />
                    Daftar PPDB 2026
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl font-semibold px-6 h-12"
                >
                  <Link href="/profil">Tentang Sekolah</Link>
                </Button>
              </div>

              {/* Highlights badge bar */}
              <div className="pt-6 border-t grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">
                    100%
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Sertifikasi BNSP</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">
                    35+
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Mitra Industri DUDI</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">
                    Top 5
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Vokasi Nasional</p>
                </div>
              </div>
            </div>

            {/* Right Visual Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                    alt="Siswa Digital Nusantara"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      Vokasi Unggulan Masa Depan
                    </span>
                    <p className="text-sm sm:text-base font-bold leading-snug">
                      Mempersiapkan Talenta Digital Siap Kerja & Berdaya Saing Global
                    </p>
                  </div>
                </div>

                {/* Floating achievement card */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-card border shadow-lg rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 backdrop-blur-md">
                  <div className="h-11 w-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground">Prestasi Terbaru</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground">
                      Juara 1 LKS Cloud Computing Nasional
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCHOOL STATISTICS (Count-up animation) */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl border bg-card p-5 sm:p-6 space-y-2 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Aktif
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                <StatCounter end={stats.total || 1250} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
                Siswa Aktif
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 sm:p-6 space-y-2 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Pengajar
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                <StatCounter end={teachers.length || 85} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
                Guru & Tenaga Ahli
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 sm:p-6 space-y-2 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Vokasi
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                <StatCounter end={majors.length || 5} suffix=" Program" />
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
                Program Keahlian
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 sm:p-6 space-y-2 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Trophy className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Kejuaraan
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                <StatCounter end={achievements.length || 50} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
                Prestasi & Penghargaan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SAMBUTAN KEPALA SEKOLAH */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Foto Kepala Sekolah (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-md mb-4 bg-muted">
                <Image
                  src={profile.principalPhoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"}
                  alt={profile.principalName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 240px, 300px"
                />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                {profile.principalName}
              </h3>
              <p className="text-xs text-primary font-semibold">
                Kepala Sekolah SMKN 1 Digital Nusantara
              </p>
            </div>

            {/* Sambutan Teks (8 cols) */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <Quote className="h-4 w-4" />
                <span>Prakata Pemimpin</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Membentuk Generasi Emas yang Adaptif, Terampil & Berintegritas
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-4">
                {(profile as any).principalSpeech || (profile as any).principalGreeting || "Pendidikan berkualitas adalah komitmen kami."}
              </p>
              <div className="pt-2">
                <Button asChild variant="outline" className="rounded-xl font-semibold">
                  <Link href="/profil" className="flex items-center gap-2">
                    Baca Sambutan Lengkap
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAM KEAHLIAN / JURUSAN */}
      <section className="container mx-auto px-4 md:px-8">
        <SectionHeading
          badge="Kompetensi Keahlian"
          title="Program Keahlian Terakreditasi Unggul"
          subtitle="Disusun bersama asosiasi industri untuk memastikan lulusan memiliki keterampilan relevan dan siap berkarya."
          action={
            <Button asChild variant="ghost" className="rounded-xl font-semibold gap-1 text-primary">
              <Link href="/jurusan">
                Semua Jurusan <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {majors.map((major) => (
            <div
              key={major.id}
              className="group flex flex-col rounded-2xl border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xs transition-all"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <Image
                  src={major.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"}
                  alt={major.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground font-extrabold text-xs px-2.5 py-0.5 rounded-md shadow-xs">
                    {major.code}
                  </Badge>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    <Link href={`/jurusan#${major.code.toLowerCase()}`}>
                      {major.name}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {major.description}
                  </p>
                </div>

                <div className="pt-3 border-t flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">
                    Prospek: {major.careerProspects.split(",")[0]}
                  </span>
                  <Link
                    href={`/jurusan#${major.code.toLowerCase()}`}
                    className="font-bold text-primary flex items-center gap-1 hover:gap-1.5 transition-all"
                  >
                    Detail <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BERITA SEKOLAH (Featured News + Smaller Cards Layout) */}
      <section className="container mx-auto px-4 md:px-8">
        <SectionHeading
          badge="Warta Terkini"
          title="Berita & Kegiatan Kampus"
          subtitle="Informasi teraktual seputar prestasi, inovasi pembelajaran, dan kemitraan industri."
          action={
            <Button asChild variant="ghost" className="rounded-xl font-semibold gap-1 text-primary">
              <Link href="/berita">
                Lihat Semua Berita <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured News on Left (7 cols) */}
          <div className="lg:col-span-7">
            {featuredNews && <NewsCard item={featuredNews} featured />}
          </div>

          {/* Smaller News Cards on Right (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            {sideNews.map((item) => (
              <NewsCard key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      </section>

      {/* 6. PENGUMUMAN (Timeline/List Design) & 7. AGENDA SEKOLAH */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Pengumuman Resmi (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Badge
                  variant="outline"
                  className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full"
                >
                  Informasi Resmi
                </Badge>
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Pengumuman Sekolah
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-xs text-primary font-semibold">
                <Link href="/pengumuman">Semua</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="flex items-start gap-4 p-4 rounded-2xl border bg-card hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-[11px] text-muted-foreground font-medium">
                      {new Date((ann as any).publishedAt || (ann as any).createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug line-clamp-1">
                      {ann.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {ann.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild variant="outline" className="w-full rounded-xl text-xs font-semibold">
              <Link href="/pengumuman">Lihat Semua Pengumuman</Link>
            </Button>
          </div>

          {/* Kolom Kanan: Agenda & Kegiatan (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Badge
                  variant="outline"
                  className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full"
                >
                  Kalender Akademik
                </Badge>
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Agenda Mendatang
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-xs text-primary font-semibold">
                <Link href="/agenda">Semua</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {events.map((event) => {
                const startDate = new Date(event.startDate)
                const day = startDate.getDate()
                const month = startDate.toLocaleDateString("id-ID", {
                  month: "short",
                })

                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 rounded-2xl border bg-card hover:border-primary/40 transition-colors"
                  >
                    {/* Date Badge */}
                    <div className="flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-primary text-primary-foreground shrink-0 shadow-xs">
                      <span className="text-lg font-black leading-none">{day}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                        {month}
                      </span>
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug line-clamp-1">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-primary shrink-0" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-primary shrink-0" />
                          08:00 WIB
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <Button asChild variant="outline" className="w-full rounded-xl text-xs font-semibold">
              <Link href="/agenda">Lihat Semua Agenda</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. PRESTASI SISWA & SEKOLAH */}
      <section className="container mx-auto px-4 md:px-8">
        <SectionHeading
          badge="Galeri Juara"
          title="Prestasi & Penghargaan"
          subtitle="Bukti dedikasi peserta didik dan pembina dalam mengharumkan nama sekolah di kancah nasional maupun internasional."
          action={
            <Button asChild variant="ghost" className="rounded-xl font-semibold gap-1 text-primary">
              <Link href="/prestasi">
                Lihat Semua Prestasi <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.slice(0, 3).map((item) => (
            <AchievementCard key={item.id} achievement={item} />
          ))}
        </div>
      </section>

      {/* 9. FASILITAS KAMPUS */}
      <section className="container mx-auto px-4 md:px-8">
        <SectionHeading
          badge="Sarana & Prasarana"
          title="Fasilitas Modern Penunjang Praktik"
          subtitle="Dukungan laboratorium canggih dan ruang kolaboratif standar dunia kerja."
          action={
            <Button asChild variant="ghost" className="rounded-xl font-semibold gap-1 text-primary">
              <Link href="/fasilitas">
                Semua Fasilitas <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.slice(0, 3).map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </section>

      {/* 10. GALERI DOKUMENTASI (Consistent Aspect Ratio & Lightbox) */}
      <section className="container mx-auto px-4 md:px-8">
        <SectionHeading
          badge="Dokumentasi"
          title="Potret Kegiatan Sekolah"
          subtitle="Momen kebersamaan, inovasi karya, dan ragam aktivitas kesiswaan."
          action={
            <Button asChild variant="ghost" className="rounded-xl font-semibold gap-1 text-primary">
              <Link href="/galeri">
                Buka Galeri Penuh <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <GalleryViewer items={gallery.slice(0, 6)} activeCategory="ALL" />
      </section>

      {/* 11. BANNER CTA PPDB */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-8 md:p-14 shadow-lg">
          {/* Subtle decorative background pattern */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-white/10 blur-xl pointer-events-none" />

          <div className="relative max-w-2xl space-y-4">
            <Badge className="bg-white/20 text-white font-bold border-white/30 text-xs px-3 py-1 rounded-full">
              Penerimaan Peserta Didik Baru (PPDB 2026/2027)
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Sudah Siap Menjadi Bagian dari Sekolah Kami?
            </h2>
            <p className="text-sm sm:text-base text-primary-foreground/90 leading-relaxed">
              Bergabunglah dengan institusi vokasi unggulan. Daftarkan diri Anda
              secara online dengan mudah dan persiapkan masa depan karir digital Anda.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-xl font-extrabold shadow-md px-6 h-12"
              >
                <Link href="/ppdb/daftar" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Daftar PPDB Sekarang
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 rounded-xl font-semibold px-6 h-12"
              >
                <Link href="/ppdb">Panduan & Syarat</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
