"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Layers,
  Building2,
  Newspaper,
  Megaphone,
  Calendar,
  Trophy,
  Image as ImageIcon,
  UserCheck,
  MessageSquare,
  School,
  LogOut,
  Menu,
  ChevronRight,
  ExternalLink,
  Shield,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AdminLayoutShellProps {
  children: React.ReactNode
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const menuSections = [
  {
    title: "Utama",
    items: [{ href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard }],
  },
  {
    title: "Manajemen Data",
    items: [
      { href: "/admin/guru", label: "Data Guru", icon: Users },
      { href: "/admin/siswa", label: "Data Siswa", icon: GraduationCap },
      { href: "/admin/jurusan", label: "Data Jurusan", icon: Layers },
      { href: "/admin/fasilitas", label: "Fasilitas Kampus", icon: Building2 },
      { href: "/admin/berita", label: "Kelola Berita", icon: Newspaper },
      { href: "/admin/pengumuman", label: "Pengumuman Resmi", icon: Megaphone },
      { href: "/admin/agenda", label: "Agenda & Kegiatan", icon: Calendar },
      { href: "/admin/prestasi", label: "Prestasi Siswa", icon: Trophy },
      { href: "/admin/galeri", label: "Galeri Dokumentasi", icon: ImageIcon },
      { href: "/admin/ppdb", label: "Pendaftar PPDB", icon: UserCheck },
      { href: "/admin/kontak", label: "Pesan Masuk", icon: MessageSquare },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      { href: "/admin/profil", label: "Profil Sekolah", icon: School },
    ],
  },
]

export function AdminLayoutShell({ children, user }: AdminLayoutShellProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Do not show admin chrome on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between py-4">
      <div className="space-y-6">
        {/* Brand */}
        <div className="px-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight text-foreground">
              ADMIN PANEL
            </p>
            <p className="text-[10px] text-muted-foreground">SMKN 1 Digital</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          {menuSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                {sec.title}
              </p>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                        active
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {active && <ChevronRight className="h-3.5 w-3.5" />}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User & Logout */}
      <div className="px-4 pt-4 border-t space-y-2">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate text-foreground">
              {user?.name || "Administrator"}
            </p>
            <p className="text-[10px] text-muted-foreground truncate font-mono">
              {user?.email || "admin@sekolah.test"}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full justify-start text-xs text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          Keluar (Logout)
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card shrink-0 fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 md:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-block">
              Sistem Informasi Sekolah
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1.5">
              <Link href="/" target="_blank">
                <ExternalLink className="h-3.5 w-3.5" />
                Lihat Web Publik
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
