import { Metadata } from "next"
import Link from "next/link"
import {
  Calendar,
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowRight,
  ClipboardList,
  UserPlus,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/common/page-header"

export const metadata: Metadata = {
  title: "Informasi PPDB Online 2026/2027",
  description:
    "Panduan lengkap alur pendaftaran, persyaratan berkas, jadwal seleksi, dan FAQ PPDB Online SMK Negeri 1 Digital Nusantara.",
}

const SCHEDULES = [
  {
    wave: "Gelombang 1 (Jalur Prestasi)",
    period: "1 April - 30 April 2026",
    desc: "Bebas tes tulis untuk peraih juara OSN/LKS dan nilai rapor >= 85.",
  },
  {
    wave: "Gelombang 2 (Jalur Reguler)",
    period: "1 Mei - 15 Juni 2026",
    desc: "Seleksi berbasis tes bakat skolastik dan wawancara minat kejuruan.",
  },
  {
    wave: "Pengumuman Hasil Seleksi",
    period: "20 Juni 2026 (Pukul 10.00 WIB)",
    desc: "Diumumkan online melalui portal resmi PPDB.",
  },
  {
    wave: "Daftar Ulang & Pengambilan Atribut",
    period: "22 Juni - 30 Juni 2026",
    desc: "Verifikasi berkas fisik dan pengukuran seragam di kampus.",
  },
]

const REQUIREMENTS = [
  "Surat Keterangan Lulus (SKL) atau Ijazah SMP/MTs sederajat (Asli & Fotokopi).",
  "Fotokopi Rapor SMP/MTs semester 1 sampai dengan semester 5 yang dilegalisir.",
  "Fotokopi Akta Kelahiran dan Kartu Keluarga (KK) terbaru.",
  "Fotokopi Kartu Tanda Penduduk (KTP) Orang Tua / Wali.",
  "Pas foto formal terbaru ukuran 3x4 (latar belakang merah) sebanyak 3 lembar.",
  "Sertifikat/Piagam Kejuaraan asli (Khusus pendaftar Jalur Prestasi).",
]

const FAQS = [
  {
    q: "Apakah pendaftaran dapat dilakukan secara langsung di sekolah?",
    a: "Pendaftaran utama dilakukan secara online melalui website ini. Namun bagi orang tua/calon siswa yang mengalami kendala teknis, kami membuka posko layanan bantuan PPDB di aula sekolah setiap hari kerja.",
  },
  {
    q: "Bolehkah memilih lebih dari satu program keahlian?",
    a: "Saat pengisian formulir, calon peserta didik memilih 1 jurusan prioritas utama. Jika kuota tidak terpenuhi, panitia akan menawarkan wawancara untuk jurusan prioritas kedua yang masih tersedia.",
  },
  {
    q: "Apakah ada beasiswa yang tersedia?",
    a: "Ya, sekolah menyediakan beasiswa penuh SPP bagi peraih juara tingkat nasional serta beasiswa keringanan biaya bagi siswa penerima Kartu Indonesia Pintar (KIP).",
  },
  {
    q: "Berapa batas usia maksimal calon siswa baru?",
    a: "Batas usia maksimal calon peserta didik baru per tanggal 1 Juli 2026 adalah 21 tahun.",
  },
]

export default function PPDBPage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20">
      <PageHeader
        badge="PPDB 2026/2027"
        title="Penerimaan Peserta Didik Baru"
        subtitle="Selamat datang calon talenta masa depan. Daftarkan diri Anda dan raih karir digital impian bersama SMKN 1 Digital Nusantara."
        breadcrumb={[{ label: "PPDB", href: "/ppdb" }, { label: "Informasi" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-xl font-bold gap-2">
            <Link href="/ppdb/daftar">
              <UserPlus className="h-4 w-4" />
              Daftar Sekarang Online
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl font-semibold gap-2">
            <Link href="/ppdb/status">
              <FileText className="h-4 w-4 text-primary" />
              Cek Status & Cetak Bukti
            </Link>
          </Button>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 md:px-8 space-y-16">
        {/* Alur Pendaftaran 4 Langkah */}
        <section className="space-y-6">
          <div className="space-y-1">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full"
            >
              Tahapan Seleksi
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Alur Pendaftaran Online
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border bg-card p-6 space-y-3 shadow-2xs relative">
              <span className="text-3xl font-black text-primary/30">01</span>
              <h3 className="font-extrabold text-base text-foreground">
                Isi Formulir Online
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Lengkapi biodata calon siswa, data orang tua, dan pilih program
                keahlian prioritas.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 space-y-3 shadow-2xs relative">
              <span className="text-3xl font-black text-primary/30">02</span>
              <h3 className="font-extrabold text-base text-foreground">
                Unggah Dokumen
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upload scan SKL/Ijazah, KK, pas foto, dan sertifikat prestasi
                dalam format PDF/JPG.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 space-y-3 shadow-2xs relative">
              <span className="text-3xl font-black text-primary/30">03</span>
              <h3 className="font-extrabold text-base text-foreground">
                Verifikasi Panitia
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Panitia PPDB memverifikasi keabsahan dokumen dan nilai rapor
                secara transparan.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 space-y-3 shadow-2xs relative">
              <span className="text-3xl font-black text-primary/30">04</span>
              <h3 className="font-extrabold text-base text-foreground">
                Pengumuman & Daftar Ulang
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cek hasil seleksi melalui portal dan lakukan daftar ulang berkas
                fisik di kampus.
              </p>
            </div>
          </div>
        </section>

        {/* Jadwal Pelaksanaan */}
        <section className="space-y-6">
          <div className="space-y-1">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full"
            >
              Timeline
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Jadwal Gelombang Pendaftaran
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHEDULES.map((s, idx) => (
              <Card key={idx} className="rounded-2xl border bg-card shadow-2xs">
                <CardContent className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-foreground">
                      {s.wave}
                    </h3>
                    <Badge variant="outline" className="text-xs text-primary font-semibold">
                      {s.period}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Persyaratan Berkas */}
        <section className="rounded-3xl border bg-card p-8 md:p-12 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full"
            >
              Checklist
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Persyaratan Berkas Dokumen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REQUIREMENTS.map((req, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl border bg-background">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-foreground">{req}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-sm text-muted-foreground">
              Jawaban seputar kendala dan pertanyaan umum tentang PPDB Online.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <Card key={idx} className="rounded-2xl border bg-card shadow-2xs">
                <CardContent className="p-5 space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 text-center space-y-4 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Siap Mengisi Formulir Pendaftaran?
          </h2>
          <p className="text-xs sm:text-sm text-primary-foreground/90 max-w-xl mx-auto">
            Proses hanya memakan waktu 5-10 menit. Pastikan Anda telah menyiapkan
            NISN, data diri, dan berkas foto.
          </p>
          <div className="pt-2">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-xl font-extrabold px-6"
            >
              <Link href="/ppdb/daftar" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Buka Formulir Pendaftaran PPDB
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
