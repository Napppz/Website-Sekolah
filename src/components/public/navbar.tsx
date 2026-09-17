"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GraduationCap,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Users,
  Building2,
  Newspaper,
  Calendar,
  Trophy,
  Image as ImageIcon,
  PhoneCall,
  UserCheck,
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

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/jurusan", label: "Jurusan" },
  {
    label: "Akademik",
    children: [
      { href: "/guru", label: "Direktori Guru", icon: Users },
      { href: "/siswa", label: "Statistik Siswa", icon: GraduationCap },
      { href: "/fasilitas", label: "Fasilitas Kampus", icon: Building2 },
    ],
  },
  {
    label: "Informasi",
    children: [
      { href: "/berita", label: "Berita Terkini", icon: Newspaper },
      { href: "/pengumuman", label: "Pengumuman Resmi", icon: BookOpen },
      { href: "/agenda", label: "Agenda & Kegiatan", icon: Calendar },
      { href: "/prestasi", label: "Prestasi Siswa", icon: Trophy },
      { href: "/galeri", label: "Galeri Dokumentasi", icon: ImageIcon },
    ],
  },
  { href: "/ppdb", label: "PPDB" },
  { href: "/kontak", label: "Kontak" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight text-foreground text-sm sm:text-base tracking-tight">
              SMKN 1 DIGITAL NUSANTARA
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              Center of Excellence Vokasi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item, idx) => {
            if (item.children) {
              return (
                <DropdownMenu key={idx}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50 outline-none">
                      {item.label}
                      <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 p-2">
                    {item.children.map((child) => {
                      const Icon = child.icon
                      return (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link
                            href={child.href}
                            className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm cursor-pointer ${
                              isActive(child.href)
                                ? "bg-primary/10 text-primary font-semibold"
                                : ""
                            }`}
                          >
                            <Icon className="h-4 w-4 opacity-70 text-primary" />
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                  isActive(item.href)
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Button asChild size="sm" className="hidden sm:inline-flex shadow-sm">
            <Link href="/ppdb/daftar" className="flex items-center gap-1.5 font-medium">
              <UserCheck className="h-4 w-4" />
              Daftar PPDB
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href="/admin/login">Admin</Link>
          </Button>

          {/* Mobile Hamburger Sheet */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6">
              <SheetHeader className="text-left mb-6">
                <SheetTitle className="flex items-center gap-2 text-base font-bold">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  SMKN 1 Digital Nusantara
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-140px)]">
                {navLinks.map((item, idx) => {
                  if (item.children) {
                    return (
                      <div key={idx} className="py-2">
                        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">
                          {item.label}
                        </p>
                        <div className="space-y-0.5">
                          {item.children.map((child) => {
                            const Icon = child.icon
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                  isActive(child.href)
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                                {child.label}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}

                <div className="pt-4 mt-2 border-t flex flex-col gap-2">
                  <Button asChild className="w-full">
                    <Link href="/ppdb/daftar" onClick={() => setIsOpen(false)}>
                      Pendaftaran PPDB
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                      Login Admin
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
