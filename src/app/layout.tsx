import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "SMK Negeri 1 Digital Nusantara | Unggul, Berkarakter & Siap Kerja",
    template: "%s | SMK Negeri 1 Digital Nusantara",
  },
  description:
    "Portal Resmi Sistem Informasi SMK Negeri 1 Digital Nusantara. Menampilkan profil, kompetensi keahlian unggulan, direktori guru, agenda, pengumuman resmi, dan pendaftaran PPDB Online.",
  keywords: [
    "SMK Negeri 1 Digital Nusantara",
    "Website Sekolah",
    "PPDB Online",
    "Rekayasa Perangkat Lunak",
    "Teknik Komputer Jaringan",
    "Desain Komunikasi Visual",
    "Sekolah Kejuruan Unggulan",
    "Sistem Informasi Sekolah",
  ],
  authors: [{ name: "SMK Negeri 1 Digital Nusantara" }],
  openGraph: {
    title: "SMK Negeri 1 Digital Nusantara",
    description: "Membentuk Generasi Cerdas, Berkarakter, dan Berdaya Saing Global",
    url: "https://smkn1digital.sch.id",
    siteName: "SMK Negeri 1 Digital Nusantara",
    locale: "id_ID",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
