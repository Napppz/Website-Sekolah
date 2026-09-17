import Link from "next/link"
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 pt-16 pb-12 transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">
                  SMKN 1 DIGITAL NUSANTARA
                </h3>
                <p className="text-xs text-muted-foreground">
                  NPSN: 20109988 | Akreditasi A
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mewujudkan generasi unggul, berkarakter mulia, dan siap kerja
              menghadapi revolusi industri 5.0 melalui kurikulum berbasis industri
              dan teknologi terdepan.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              SMK Pusat Keunggulan (Center of Excellence)
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase mb-4 text-foreground">
              Tautan Cepat
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/profil" className="hover:text-primary transition-colors">
                  Profil & Visi Misi
                </Link>
              </li>
              <li>
                <Link href="/jurusan" className="hover:text-primary transition-colors">
                  Program & Jurusan
                </Link>
              </li>
              <li>
                <Link href="/guru" className="hover:text-primary transition-colors">
                  Tenaga Pendidik (Guru)
                </Link>
              </li>
              <li>
                <Link href="/fasilitas" className="hover:text-primary transition-colors">
                  Sarana & Prasarana
                </Link>
              </li>
              <li>
                <Link href="/prestasi" className="hover:text-primary transition-colors">
                  Prestasi Sekolah
                </Link>
              </li>
              <li>
                <Link href="/ppdb" className="hover:text-primary transition-colors font-medium text-primary">
                  Informasi PPDB Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase mb-4 text-foreground">
              Kontak Kami
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Jl. Pendidikan Generasi No. 45, Kebayoran Baru, Jakarta Selatan
                  12150
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

          {/* Social Media & Maps */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground">
              Media Sosial
            </h4>
            <p className="text-sm text-muted-foreground">
              Ikuti kabar dan dokumentasi kegiatan terbaru kami melalui kanal resmi
              media sosial sekolah:
            </p>
            <div className="flex items-center gap-2.5">
              {/* Facebook Icon */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-105"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              {/* Instagram Icon */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-105"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              {/* YouTube Icon */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-105"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="sr-only">YouTube</span>
              </a>
              {/* Twitter/X Icon */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-105"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
            </div>

            <div className="pt-2">
              <Link
                href="/kontak"
                className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
              >
                Lihat lokasi di Google Maps &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SMK Negeri 1 Digital Nusantara. Hak
            Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/profil" className="hover:underline">
              Tentang Sekolah
            </Link>
            <Link href="/ppdb" className="hover:underline">
              Pendaftaran PPDB
            </Link>
            <Link href="/admin/login" className="hover:underline">
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
