"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GraduationCap,
  Menu,
  ChevronDown,
  BookOpen,
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
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface NavChild {
  href: string
  label: string
  description?: string
  icon: React.ElementType
}

interface NavItem {
  href?: string
  label: string
  children?: NavChild[]
}

const navLinks: NavItem[] = [
  { href: "/", label: "Beranda" },
  {
    label: "Profil",
    children: [
      {
        href: "/profil",
        label: "Profil & Visi Misi",
        description: "Sejarah, Visi, Misi & Struktur Organisasi",
        icon: Compass,
      },
      {
        href: "/fasilitas",
        label: "Fasilitas Kampus",
        description: "Sarana prasarana penunjang pembelajaran",
        icon: Building2,
      },
    ],
  },
  {
    label: "Akademik",
    children: [
      {
        href: "/jurusan",
        label: "Program Keahlian",
        description: "5 Jurusan kompetensi unggulan industri",
        icon: Award,
      },
      {
        href: "/guru",
        label: "Direktori Guru",
        description: "Profil tenaga pendidik dan kependidikan",
        icon: Users,
      },
      {
        href: "/siswa",
        label: "Statistik Siswa",
        description: "Demografi & sebaran siswa per jurusan",
        icon: GraduationCap,
      },
    ],
  },
  {
    label: "Informasi",
    children: [
      {
        href: "/berita",
        label: "Berita Terkini",
        description: "Kabar dan liputan kegiatan sekolah",
        icon: Newspaper,
      },
      {
        href: "/pengumuman",
        label: "Pengumuman Resmi",
        description: "Surat edaran kedinasan & informasi penting",
        icon: BookOpen,
      },
      {
        href: "/agenda",
        label: "Agenda & Kegiatan",
        description: "Jadwal kalender kegiatan sekolah",
        icon: Calendar,
      },
    ],
  },
  { href: "/prestasi", label: "Prestasi" },
  { href: "/galeri", label: "Galeri" },
  { href: "/ppdb", label: "PPDB" },
  { href: "/kontak", label: "Kontak" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const isActive = (path?: string) => {
    if (!path) return false
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const isGroupActive = (children?: NavChild[]) => {
    if (!children) return false
    return children.some((c) => pathname.startsWith(c.href))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold leading-tight text-foreground text-sm sm:text-base tracking-tight">
              SMKN 1 DIGITAL NUSANTARA
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              Unggul, Berkarakter & Siap Kerja
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item, idx) => {
            if (item.children) {
              const activeGroup = isGroupActive(item.children)
              return (
                <DropdownMenu key={idx}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none cursor-pointer ${
                        activeGroup
                          ? "text-primary font-bold bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-64 p-2 rounded-2xl shadow-lg border bg-card/95 backdrop-blur-md"
                  >
                    {item.children.map((child) => {
                      const Icon = child.icon
                      const active = isActive(child.href)
                      return (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link
                            href={child.href}
                            className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                              active
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold text-foreground leading-tight">
                                {child.label}
                              </p>
                              {child.description && (
                                <p className="text-[11px] text-muted-foreground leading-tight line-clamp-1">
                                  {child.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            const active = isActive(item.href)
            return (
              <Link
                key={idx}
                href={item.href || "#"}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-primary font-bold bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Actions: Theme Toggle & PPDB CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="rounded-xl shadow-xs font-semibold px-4 h-9 gap-1.5"
          >
            <Link href="/ppdb/daftar">
              <UserPlus className="h-4 w-4" />
              Daftar PPDB
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl"
                aria-label="Buka Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-6 overflow-y-auto">
              <SheetHeader className="text-left pb-4 border-b">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <SheetTitle className="text-sm font-extrabold text-foreground">
                    SMKN 1 DIGITAL NUSANTARA
                  </SheetTitle>
                </div>
              </SheetHeader>

              <div className="py-4 space-y-4">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((item, idx) => {
                    if (item.children) {
                      return (
                        <div key={idx} className="space-y-1 pt-2">
                          <p className="px-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                            {item.label}
                          </p>
                          <div className="pl-2 space-y-0.5 border-l-2 border-muted ml-2">
                            {item.children.map((child) => {
                              const Icon = child.icon
                              const active = isActive(child.href)
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                                    active
                                      ? "bg-primary/10 text-primary font-bold"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                  }`}
                                >
                                  <Icon className="h-4 w-4 shrink-0 text-primary" />
                                  <span>{child.label}</span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }

                    const active = isActive(item.href)
                    return (
                      <Link
                        key={idx}
                        href={item.href || "#"}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          active
                            ? "bg-primary/10 text-primary font-bold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>

                <div className="pt-4 border-t space-y-2">
                  <Button asChild className="w-full rounded-xl gap-2 h-10 font-semibold">
                    <Link href="/ppdb/daftar" onClick={() => setIsOpen(false)}>
                      <UserPlus className="h-4 w-4" />
                      Daftar PPDB Online
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl h-10 text-xs font-medium"
                  >
                    <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                      Portal Staf & Guru
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
