import { Metadata } from "next"
import Image from "next/image"
import {
  GraduationCap,
  Sparkles,
  Target,
  Compass,
  Award,
  History,
  Users2,
  CheckCircle2,
  Quote,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/common/page-header"
import { getSchoolProfile } from "@/lib/data"

export const metadata: Metadata = {
  title: "Profil & Visi Misi Sekolah",
  description:
    "Sejarah, Visi, Misi, Tujuan Institusi, Sambutan Kepala Sekolah, dan Struktur Organisasi SMK Negeri 1 Digital Nusantara.",
}

export default async function ProfilPage() {
  const profile = await getSchoolProfile()

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20">
      {/* Reusable Standard Page Header */}
      <PageHeader
        badge="Tentang Institusi"
        title={`Profil ${profile.name}`}
        subtitle={`Pusat Keunggulan Pendidikan Vokasi Digital Indonesia Berakreditasi ${profile.accreditation}.`}
        breadcrumb={[
          { label: "Profil", href: "/profil" },
          { label: "Visi & Misi" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8 space-y-16">
        {/* Sambutan Kepala Sekolah Lengkap */}
        <section className="rounded-3xl border bg-card p-8 md:p-12 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-md mb-4 bg-muted">
                <Image
                  src={
                    profile.principalPhoto ||
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
                  }
                  alt={profile.principalName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 240px, 300px"
                />
              </div>
              <h3 className="font-extrabold text-lg text-foreground">
                {profile.principalName}
              </h3>
              <p className="text-xs text-primary font-semibold">
                {profile.principalTitle}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <Quote className="h-4 w-4" />
                <span>Prakata Pemimpin</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Menyiapkan Generasi Emas Menuju Era Industri 5.0
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {(profile as any).principalSpeech || (profile as any).principalGreeting || "Selamat datang di SMK Negeri 1 Digital Nusantara..."}
              </p>
            </div>
          </div>
        </section>

        {/* Visi, Misi & Tujuan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <Card className="rounded-3xl border bg-card p-6 sm:p-8 space-y-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-foreground">Visi Sekolah</h3>
                <p className="text-xs text-muted-foreground">Arah & Orientasi Masa Depan</p>
              </div>
            </div>
            <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed italic border-l-4 border-primary pl-4 py-1">
              &ldquo;{profile.vision}&rdquo;
            </p>
          </Card>

          {/* Misi */}
          <Card className="rounded-3xl border bg-card p-6 sm:p-8 space-y-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-foreground">Misi Sekolah</h3>
                <p className="text-xs text-muted-foreground">Langkah Nyata Mewujudkan Visi</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {profile.mission.split(";").map((m, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{m.trim()}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Sejarah Singkat */}
        <section className="rounded-3xl border bg-card p-8 md:p-12 space-y-6 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <History className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-foreground">
                Sejarah Singkat Institusi
              </h3>
              <p className="text-xs text-muted-foreground">Perjalanan dan Dedikasi</p>
            </div>
          </div>
          <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4">
            <p>{profile.history}</p>
          </div>
        </section>

        {/* Struktur Organisasi */}
        <section className="space-y-6">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full"
            >
              Manajemen Sekolah
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Bagan Struktur Organisasi
            </h2>
            <p className="text-sm text-muted-foreground">
              Pimpinan institusi dan dewan pembina SMKN 1 Digital Nusantara.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border bg-card p-5 text-center space-y-2 shadow-2xs">
              <div className="h-10 w-10 mx-auto rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <Users2 className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-primary">Kepala Sekolah</p>
              <h4 className="font-extrabold text-sm text-foreground">
                {profile.principalName}
              </h4>
              <p className="text-[11px] text-muted-foreground">Penanggung Jawab Utama</p>
            </div>

            <div className="rounded-2xl border bg-card p-5 text-center space-y-2 shadow-2xs">
              <div className="h-10 w-10 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-primary">Waka. Kurikulum</p>
              <h4 className="font-extrabold text-sm text-foreground">
                Drs. Bambang Sulistyo, M.Kom.
              </h4>
              <p className="text-[11px] text-muted-foreground">Akademik & Teaching Factory</p>
            </div>

            <div className="rounded-2xl border bg-card p-5 text-center space-y-2 shadow-2xs">
              <div className="h-10 w-10 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Users2 className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-primary">Waka. Kesiswaan</p>
              <h4 className="font-extrabold text-sm text-foreground">
                Siti Rahmawati, M.Pd.
              </h4>
              <p className="text-[11px] text-muted-foreground">Karakter & Kedisiplinan</p>
            </div>

            <div className="rounded-2xl border bg-card p-5 text-center space-y-2 shadow-2xs">
              <div className="h-10 w-10 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-primary">Waka. Hubungan Industri</p>
              <h4 className="font-extrabold text-sm text-foreground">
                Ir. Hendra Kurniawan, M.T.
              </h4>
              <p className="text-[11px] text-muted-foreground">Kemitraan DUDI & Penyaluran</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
