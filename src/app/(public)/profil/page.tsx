import { Metadata } from "next"
import {
  GraduationCap,
  Sparkles,
  Target,
  Compass,
  Award,
  History,
  Users2,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getSchoolProfile } from "@/lib/data"

export const metadata: Metadata = {
  title: "Profil & Visi Misi Sekolah",
  description: "Sejarah, Visi, Misi, Tujuan Institusi, Sambutan Kepala Sekolah, dan Struktur Organisasi SMK Negeri 1 Digital Nusantara.",
}

export default async function ProfilPage() {
  const profile = await getSchoolProfile()

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Tentang Kami
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
          Profil {profile.name}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Pusat Keunggulan Pendidikan Vokasi Digital Indonesia Berakreditasi {profile.accreditation}.
        </p>
      </div>

      {/* Sambutan Kepala Sekolah */}
      <section className="rounded-3xl border bg-card/60 backdrop-blur-xs p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl mb-4">
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
              Menyiapkan Generasi Emas Menuju Era Industri 5.0
            </h2>
            <div className="text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3">
              {profile.principalSpeech}
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah Sekolah */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Sejarah Singkat Sekolah
            </h2>
            <p className="text-xs text-muted-foreground">Perjalanan dan rekam jejak dedikasi</p>
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-6 md:p-8 leading-relaxed text-muted-foreground text-sm sm:text-base">
          {profile.history}
        </div>
      </section>

      {/* Visi, Misi & Tujuan */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visi */}
        <Card className="rounded-2xl border bg-card shadow-xs">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Visi Sekolah</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
              "{profile.vision}"
            </p>
          </CardContent>
        </Card>

        {/* Tujuan */}
        <Card className="rounded-2xl border bg-card shadow-xs">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Tujuan Sekolah</h3>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {profile.goals}
            </div>
          </CardContent>
        </Card>

        {/* Misi (Full Width) */}
        <Card className="md:col-span-2 rounded-2xl border bg-card shadow-xs">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Misi Sekolah</h3>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {profile.mission}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Struktur Organisasi */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Users2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Bagan Struktur Organisasi
            </h2>
            <p className="text-xs text-muted-foreground">Tata kelola kepemimpinan dan manajemen sekolah</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Level 1: Kepala Sekolah */}
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 text-center w-64 shadow-xs">
              <p className="text-xs font-semibold text-primary uppercase">Kepala Sekolah</p>
              <p className="font-bold text-sm text-foreground">{profile.principalName}</p>
            </div>

            <div className="h-6 w-0.5 bg-border" />

            {/* Level 2: Komite & TU */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              <div className="rounded-lg border bg-muted/40 p-3 text-center">
                <p className="text-[11px] font-semibold text-muted-foreground">Komite Sekolah</p>
                <p className="font-bold text-xs">Ir. H. Suryono, M.M.</p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3 text-center">
                <p className="text-[11px] font-semibold text-muted-foreground">Kepala Tata Usaha</p>
                <p className="font-bold text-xs">Dra. Hj. Nuraini</p>
              </div>
            </div>

            <div className="h-6 w-0.5 bg-border" />

            {/* Level 3: Wakil Kepala Sekolah */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              <div className="rounded-lg border bg-card p-3 text-center shadow-2xs">
                <p className="text-[10px] font-semibold text-primary">Waka. Kurikulum</p>
                <p className="font-bold text-xs">Drs. Bambang Sulistyo</p>
              </div>
              <div className="rounded-lg border bg-card p-3 text-center shadow-2xs">
                <p className="text-[10px] font-semibold text-primary">Waka. Kesiswaan</p>
                <p className="font-bold text-xs">Siti Rahmawati, S.Pd.</p>
              </div>
              <div className="rounded-lg border bg-card p-3 text-center shadow-2xs">
                <p className="text-[10px] font-semibold text-primary">Waka. Sarpras</p>
                <p className="font-bold text-xs">Agus Setiawan, S.Si.</p>
              </div>
              <div className="rounded-lg border bg-card p-3 text-center shadow-2xs">
                <p className="text-[10px] font-semibold text-primary">Waka. Hubin / Humas</p>
                <p className="font-bold text-xs">Faisal Tanjung, M.Ed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
