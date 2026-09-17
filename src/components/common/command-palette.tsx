"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  GraduationCap,
  Users,
  Building2,
  Newspaper,
  Calendar,
  Trophy,
  Image as ImageIcon,
  PhoneCall,
  UserPlus,
  Compass,
  Award,
  FileText,
  Printer,
  ShieldAlert,
  ArrowRight,
  Layers,
  X,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: any
  href: string
  category: "Halaman Utama" | "Program Keahlian" | "PPDB Online" | "Panel Admin"
  keywords?: string[]
}

const COMMAND_ITEMS: CommandItem[] = [
  // Halaman Utama
  {
    id: "nav-home",
    title: "Beranda Utama",
    description: "Halaman depan resmi SMK Negeri 1 Digital Nusantara",
    icon: Compass,
    href: "/",
    category: "Halaman Utama",
    keywords: ["home", "depan", "beranda"],
  },
  {
    id: "nav-profile",
    title: "Profil & Visi Misi",
    description: "Sejarah, visi, misi, dan struktur pimpinan sekolah",
    icon: Compass,
    href: "/profil",
    category: "Halaman Utama",
    keywords: ["profil", "visi", "misi", "sejarah", "kepala sekolah"],
  },
  {
    id: "nav-teachers",
    title: "Direktori Tenaga Pendidik",
    description: "Daftar guru, mata pelajaran, dan staf pengajar",
    icon: Users,
    href: "/guru",
    category: "Halaman Utama",
    keywords: ["guru", "pengajar", "wali kelas", "guru bk", "nip"],
  },
  {
    id: "nav-students",
    title: "Statistik & Data Siswa",
    description: "Demografi siswa dan sebaran per jurusan",
    icon: GraduationCap,
    href: "/siswa",
    category: "Halaman Utama",
    keywords: ["siswa", "murid", "rombel", "kelas", "angkatan"],
  },
  {
    id: "nav-facilities",
    title: "Fasilitas Kampus",
    description: "Laboratorium komputer, studio DKV, dan sarana modern",
    icon: Building2,
    href: "/fasilitas",
    category: "Halaman Utama",
    keywords: ["lab", "gedung", "bengkel", "ruang praktek", "sarana"],
  },
  {
    id: "nav-news",
    title: "Berita & Warta Sekolah",
    description: "Kabar kegiatan, liputan prestasi, dan info terkini",
    icon: Newspaper,
    href: "/berita",
    category: "Halaman Utama",
    keywords: ["berita", "artikel", "kabar", "informasi"],
  },
  {
    id: "nav-announcements",
    title: "Pengumuman Resmi",
    description: "Surat edaran kedinasan dan kalender penting",
    icon: FileText,
    href: "/pengumuman",
    category: "Halaman Utama",
    keywords: ["pengumuman", "edaran", "surat", "libur"],
  },
  {
    id: "nav-events",
    title: "Agenda & Kegiatan",
    description: "Jadwal ujian, workshop industri, dan pameran karya",
    icon: Calendar,
    href: "/agenda",
    category: "Halaman Utama",
    keywords: ["agenda", "jadwal", "kegiatan", "ujian", "event"],
  },
  {
    id: "nav-achievements",
    title: "Galeri Prestasi Juara",
    description: "Penghargaan LKS Nasional, OSN, dan kompetisi tech",
    icon: Trophy,
    href: "/prestasi",
    category: "Halaman Utama",
    keywords: ["prestasi", "juara", "lks", "lomba", "medali"],
  },
  {
    id: "nav-gallery",
    title: "Galeri Foto & Dokumentasi",
    description: "Dokumentasi visual kehidupan kampus dan praktikum",
    icon: ImageIcon,
    href: "/galeri",
    category: "Halaman Utama",
    keywords: ["foto", "album", "dokumentasi", "kegiatan"],
  },
  {
    id: "nav-contact",
    title: "Kontak & Lokasi Sekolah",
    description: "Peta lokasi, nomor WhatsApp layanan, dan form pesan",
    icon: PhoneCall,
    href: "/kontak",
    category: "Halaman Utama",
    keywords: ["kontak", "alamat", "telepon", "email", "maps"],
  },

  // Program Keahlian
  {
    id: "major-rpl",
    title: "Rekayasa Perangkat Lunak (RPL)",
    description: "Software engineering, Full-Stack web, mobile app & AI",
    icon: Layers,
    href: "/jurusan",
    category: "Program Keahlian",
    keywords: ["rpl", "coding", "software", "programming", "web"],
  },
  {
    id: "major-tjkt",
    title: "Teknik Jaringan Komputer & Telekomunikasi (TJKT)",
    description: "Infrastruktur cloud, Cisco/MikroTik & cybersecurity",
    icon: Layers,
    href: "/jurusan",
    category: "Program Keahlian",
    keywords: ["tjkt", "tkj", "jaringan", "cisco", "server", "cyber"],
  },
  {
    id: "major-dkv",
    title: "Desain Komunikasi Visual (DKV)",
    description: "UI/UX design, animasi 2D/3D, video production",
    icon: Layers,
    href: "/jurusan",
    category: "Program Keahlian",
    keywords: ["dkv", "desain", "multimedia", "animasi", "video"],
  },
  {
    id: "major-mplb",
    title: "Manajemen Perkantoran & Layanan Bisnis (MPLB)",
    description: "Digital business, otomasi administrasi & public relations",
    icon: Layers,
    href: "/jurusan",
    category: "Program Keahlian",
    keywords: ["mplb", "perkantoran", "bisnis", "administrasi", "sekretaris"],
  },
  {
    id: "major-akl",
    title: "Akuntansi & Keuangan Lembaga (AKL)",
    description: "Financial tech, computerized accounting & perbankan",
    icon: Layers,
    href: "/jurusan",
    category: "Program Keahlian",
    keywords: ["akl", "akuntansi", "keuangan", "pajak", "bank"],
  },

  // PPDB Online
  {
    id: "ppdb-info",
    title: "Informasi PPDB Online 2026",
    description: "Jadwal gelombang, syarat berkas, dan kuota pendaftaran",
    icon: UserPlus,
    href: "/ppdb",
    category: "PPDB Online",
    keywords: ["ppdb", "pendaftaran", "syarat", "jadwal"],
  },
  {
    id: "ppdb-daftar",
    title: "Formulir Pendaftaran PPDB",
    description: "Daftar sebagai calon siswa baru tahun ajaran 2026/2027",
    icon: UserPlus,
    href: "/ppdb/daftar",
    category: "PPDB Online",
    keywords: ["daftar ppdb", "formulir baru", "calon siswa"],
  },
  {
    id: "ppdb-status",
    title: "Cek Status & Cetak Bukti PPDB",
    description: "Periksa hasil seleksi dan cetak kartu bukti pendaftaran PDF",
    icon: Printer,
    href: "/ppdb/status",
    category: "PPDB Online",
    keywords: ["cek status", "cetak kartu", "bukti pdf", "hasil seleksi", "nomor registrasi"],
  },

  // Panel Admin
  {
    id: "admin-overview",
    title: "Admin Dashboard Overview",
    description: "Ringkasan statistik operasional dan manajemen sekolah",
    icon: ShieldAlert,
    href: "/admin",
    category: "Panel Admin",
    keywords: ["admin", "dashboard", "overview", "login"],
  },
  {
    id: "admin-ppdb",
    title: "Verifikasi & Seleksi PPDB (Admin)",
    description: "Validasi berkas calon siswa, ubah status & export Excel",
    icon: ShieldAlert,
    href: "/admin/ppdb",
    category: "Panel Admin",
    keywords: ["admin ppdb", "verifikasi calon siswa", "seleksi ppdb"],
  },
  {
    id: "admin-news",
    title: "Manajemen Berita (Admin)",
    description: "Tulis, edit, dan publikasikan artikel berita sekolah",
    icon: Newspaper,
    href: "/admin/berita",
    category: "Panel Admin",
    keywords: ["admin berita", "tulis artikel", "kelola warta"],
  },
  {
    id: "admin-teachers",
    title: "Manajemen Data Guru (Admin)",
    description: "Kelola direktori pengajar dan export CSV",
    icon: Users,
    href: "/admin/guru",
    category: "Panel Admin",
    keywords: ["admin guru", "tambah pengajar", "kelola tenaga pendidik"],
  },
  {
    id: "admin-students",
    title: "Manajemen Data Siswa (Admin)",
    description: "Kelola database rombel siswa aktif dan export CSV",
    icon: GraduationCap,
    href: "/admin/siswa",
    category: "Panel Admin",
    keywords: ["admin siswa", "kelola murid", "tambah siswa baru"],
  },
]

interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const router = useRouter()

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open)
    } else {
      setInternalOpen(open)
    }
  }

  // Global Keyboard shortcut listener (Ctrl+K or Cmd+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(!isOpen)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Filter items based on search query
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return COMMAND_ITEMS

    const q = query.toLowerCase().trim()
    return COMMAND_ITEMS.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q)
      const matchDesc = item.description?.toLowerCase().includes(q) || false
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q)) || false
      const matchCategory = item.category.toLowerCase().includes(q)
      return matchTitle || matchDesc || matchKeywords || matchCategory
    })
  }, [query])

  // Reset selected index when filtered items change
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [filteredItems])

  // Handle arrow keys and Enter inside the search modal
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev - 1 < 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      )
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].href)
      }
    }
  }

  const handleSelect = (href: string) => {
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-2xl overflow-hidden rounded-2xl shadow-2xl border bg-card/95 backdrop-blur-md">
        <DialogTitle className="sr-only">Pencarian Cepat Menu & Navigasi</DialogTitle>

        {/* Input Header */}
        <div className="flex items-center px-4 border-b border-border/60 h-14">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Ketik untuk mencari jurusan, guru, berita, PPDB, atau panel admin..."
            className="w-full bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-border/30">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-1">
              <p className="text-sm font-semibold text-foreground">
                Tidak ada hasil untuk &quot;{query}&quot;
              </p>
              <p className="text-xs text-muted-foreground">
                Coba kata kunci lain seperti: RPL, Guru, PPDB, Berita, atau Kontak.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "hover:bg-muted/60 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold truncate">
                          {item.title}
                        </span>
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          className={`text-[11px] truncate ${
                            isSelected ? "text-white/80" : "text-muted-foreground"
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 shrink-0 ml-2 transition-transform ${
                      isSelected ? "translate-x-0.5 text-white" : "opacity-0"
                    }`}
                  />
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-muted/40 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="h-4 px-1 rounded border bg-background font-mono text-[9px]">↑</kbd>
              <kbd className="h-4 px-1 rounded border bg-background font-mono text-[9px]">↓</kbd>
              Navigasi
            </span>
            <span className="flex items-center gap-1">
              <kbd className="h-4 px-1 rounded border bg-background font-mono text-[9px]">↵</kbd>
              Buka
            </span>
          </div>
          <span>Tekan <kbd className="font-mono text-[10px]">Ctrl+K</kbd> kapan saja</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
