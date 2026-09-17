import { Metadata } from "next"
import Link from "next/link"
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowRight,
  ClipboardList,
  UserCheck,
  Award,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Informasi PPDB Online 2026/2027",
  description: "Panduan lengkap alur pendaftaran, persyaratan berkas, jadwal seleksi, dan FAQ PPDB Online SMK Negeri 1 Digital Nusantara.",
}

const SCHEDULES = [
  { wave: "Gelombang 1 (Jalur Prestasi)", period: "1 April - 30 April 2026", desc: "Bebas tes tulis untuk peraih juara OSN/LKS dan nilai rapor >= 85." },
  { wave: "Gelombang 2 (Jalur Reguler)", period: "1 Mei - 15 Juni 2026", desc: "Seleksi berbasis tes bakat skolastik dan wawancara minat kejuruan." },
  { wave: "Pengumuman Hasil Seleksi", period: "20 Juni 2026 (Pukul 10.00 WIB)", desc: "Diumumkan online melalui portal resmi PPDB." },
  { wave: "Daftar Ulang & Pengambilan Atribut", period: "22 Juni - 30 Juni 2026", desc: "Verifikasi berkas fisik dan pengukuran seragam di kampus." },
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
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-blue-700 text-primary-foreground p-8 sm:p-12 md:p-16 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4 text-left">
          <Badge className="bg-white/20 text-white backdrop-blur-xs border-white/20">
            Tahun Ajaran 2026/2027
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Penerimaan Peserta Didik Baru (PPDB) Online
          </h1>
          <p className="text-primary-foreground/90 text-base sm:text-lg leading-relaxed">
            Selamat datang calon generasi juara. Bergabunglah bersama institusi pendidikan vokasi digital unggulan untuk masa depan karir yang cemerlang.
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full shadow-lg font-bold">
              <Link href="/ppdb/daftar" className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Daftar Sekarang Online
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <a href="#alur">Lihat Alur Pendaftaran</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Alur Pendaftaran (Steps) */}
      <section id="alur" className="space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="px-3.5 py-1 text-xs">
            Panduan Langkah
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Alur Pendaftaran PPDB
          </h2>
          <p className="text-sm text-muted-foreground">
            4 langkah mudah untuk menjadi bagian dari keluarga besar sekolah kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Isi Formulir Online",
              desc: "Lengkapi identitas diri, NISN, NIK, asal sekolah, dan pilihan jurusan pada halaman pendaftaran daring.",
            },
            {
              step: "02",
              title: "Unggah Berkas",
              desc: "Unggah dokumen pendukung (scan rapor, KK, akta lahir, piagam prestasi) dalam format PDF/JPG.",
            },
            {
              step: "03",
              title: "Verifikasi Panitia",
              desc: "Panitia PPDB memverifikasi kelengkapan berkas dan memberikan status validasi secara daring.",
            },
            {
              step: "04",
              title: "Pengumuman & Daftar Ulang",
              desc: "Cek nomor pendaftaran pada pengumuman resmi kelulusan, dilanjutkan dengan daftar ulang.",
            },
          ].map((item) => (
            <Card key={item.step} className="rounded-2xl border bg-card p-6 space-y-3 shadow-xs">
              <span className="text-3xl font-black text-primary/40 font-mono">
                {item.step}
              </span>
              <h3 className="font-bold text-lg text-foreground leading-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Jadwal & Persyaratan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Jadwal Pelaksanaan (7 cols) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Jadwal Seleksi PPDB 2026
              </h2>
              <p className="text-xs text-muted-foreground">Tahapan penting yang wajib diperhatikan</p>
            </div>
          </div>

          <div className="space-y-4">
            {SCHEDULES.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-card p-5 space-y-1.5 hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-base text-foreground">{s.wave}</h4>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {s.period}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Persyaratan Pendaftaran (5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Persyaratan Berkas
              </h2>
              <p className="text-xs text-muted-foreground">Kelengkapan dokumen administrasi</p>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 space-y-3.5">
            {REQUIREMENTS.map((req, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="px-3.5 py-1 text-xs">
            Tanya Jawab
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FAQS.map((faq, idx) => (
            <Card key={idx} className="rounded-2xl border bg-card p-6 space-y-2">
              <h4 className="font-bold text-base text-foreground flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground pl-7 leading-relaxed">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center pt-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/ppdb/daftar" className="flex items-center gap-2">
              Mulai Pendaftaran Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
