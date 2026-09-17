import Link from "next/link"
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card/60 pt-16 pb-12 transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Kolom 1: Logo + Deskripsi (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight text-foreground">
                  SMKN 1 DIGITAL NUSANTARA
                </h3>
                <p className="text-xs text-muted-foreground">
                  NPSN: 20109988 • Akreditasi A Unggul
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Mewujudkan generasi unggul, berkarakter mulia, dan siap kerja
              menghadapi era transformasi digital global melalui kurikulum berbasis
              industri dan sarana teknologi terkini.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>SMK Pusat Keunggulan (Center of Excellence)</span>
            </div>
          </div>

          {/* Kolom 2: Navigasi (Profil, Akademik, Informasi) (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs sm:text-sm tracking-wider uppercase text-foreground">
              Navigasi Sekolah
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
              <Link href="/profil" className="hover:text-primary transition-colors">
                Profil Sekolah
              </Link>
              <Link href="/jurusan" className="hover:text-primary transition-colors">
                Program Keahlian
              </Link>
              <Link href="/guru" className="hover:text-primary transition-colors">
                Direktori Guru
              </Link>
              <Link href="/siswa" className="hover:text-primary transition-colors">
                Statistik Siswa
              </Link>
              <Link href="/fasilitas" className="hover:text-primary transition-colors">
                Fasilitas Kampus
              </Link>
              <Link href="/berita" className="hover:text-primary transition-colors">
                Warta Berita
              </Link>
              <Link href="/pengumuman" className="hover:text-primary transition-colors">
                Pengumuman
              </Link>
              <Link href="/agenda" className="hover:text-primary transition-colors">
                Agenda Sekolah
              </Link>
              <Link href="/prestasi" className="hover:text-primary transition-colors">
                Prestasi Juara
              </Link>
              <Link href="/galeri" className="hover:text-primary transition-colors">
                Galeri Foto
              </Link>
              <Link href="/ppdb" className="hover:text-primary transition-colors font-semibold text-primary">
                Informasi PPDB
              </Link>
              <Link href="/kontak" className="hover:text-primary transition-colors">
                Hubungi Kami
              </Link>
            </div>
          </div>

          {/* Kolom 3: Kontak (Alamat, Telepon, Email) (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs sm:text-sm tracking-wider uppercase text-foreground">
              Kontak & Lokasi
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Jl. Pendidikan Generasi No. 45, Kebayoran Baru, Jakarta Selatan 12150
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>(021) 7890-1234 / 0812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>info@smkn1digital.sch.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>Senin - Jumat: 07.00 - 16.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Social Media (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-xs sm:text-sm tracking-wider uppercase text-foreground">
              Media Sosial
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ikuti kabar dan kegiatan terkini di saluran resmi kami:
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-xl border bg-background hover:border-primary/50 text-xs font-medium text-muted-foreground hover:text-primary transition-all group"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-pink-600 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-xl border bg-background hover:border-primary/50 text-xs font-medium text-muted-foreground hover:text-primary transition-all group"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-red-600 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-xl border bg-background hover:border-primary/50 text-xs font-medium text-muted-foreground hover:text-primary transition-all group"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.5 0 9 1.582 9 4.615V8z" />
                  </svg>
                  <span>Facebook</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-xl border bg-background hover:border-primary/50 text-xs font-medium text-muted-foreground hover:text-primary transition-all group"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-foreground fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.92c0 2.22-.7 4.45-2.14 6.16-1.55 1.83-3.87 2.87-6.26 2.87-2.18 0-4.32-.86-5.87-2.39-1.64-1.62-2.52-3.89-2.43-6.19.1-2.41 1.25-4.69 3.12-6.16 1.78-1.4 4.09-1.95 6.29-1.51v4.13c-1.12-.29-2.35-.11-3.32.53-.94.62-1.54 1.66-1.6 2.77-.07 1.22.49 2.44 1.48 3.16.94.69 2.19.86 3.29.47.93-.33 1.67-1.13 1.94-2.07.13-.46.19-.94.19-1.42V.02z" />
                  </svg>
                  <span>TikTok</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright 2026 */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; 2026 <span className="font-semibold text-foreground">SMK Negeri 1 Digital Nusantara</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="hover:text-primary transition-colors">
              Portal Staf Admin
            </Link>
            <span>•</span>
            <Link href="/kontak" className="hover:text-primary transition-colors">
              Bantuan & Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
