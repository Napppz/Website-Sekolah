import Link from "next/link"
import { GraduationCap, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
      <div className="space-y-6 max-w-md">
        <div className="h-16 w-16 rounded-3xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
          <GraduationCap className="h-9 w-9" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-primary font-mono">404</h1>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Maaf, halaman atau tautan informasi sekolah yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild size="sm" className="rounded-xl gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-xl">
            <Link href="/berita">Lihat Berita Terbaru</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
