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
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Bell,
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
  const [collapsed, setCollapsed] = React.useState(false)

  // Do not show admin chrome on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  const SidebarContent = ({ isCompact = false }: { isCompact?: boolean }) => (
    <div className="flex h-full flex-col justify-between py-4 select-none">
      <div className="space-y-6">
        {/* Brand */}
        <div className={`flex items-center gap-3 ${isCompact ? "justify-center px-2" : "px-5"}`}>
          <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs shrink-0">
            <GraduationCap className="h-5 w-5" />
          </div>
          {!isCompact && (
            <div className="overflow-hidden">
              <p className="font-extrabold text-sm leading-tight text-foreground tracking-tight">
                ADMIN PANEL
              </p>
              <p className="text-[10px] text-muted-foreground truncate font-medium">
                SMKN 1 Digital Nusantara
              </p>
            </div>
          )}
        </div>

        {/* Navigation Menus */}
        <nav className="space-y-5 px-3">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!isCompact && (
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      title={isCompact ? item.label : undefined}
                      className={`group relative flex items-center rounded-xl text-xs font-semibold transition-all ${
                        isCompact
                          ? "justify-center p-2.5"
                          : "gap-3 px-3 py-2"
                      } ${
                        active
                          ? "bg-primary text-primary-foreground shadow-xs font-bold"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                      {!isCompact && <span className="truncate">{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Area: Collapse toggle & User profile */}
      <div className="space-y-3 px-3 pt-3 border-t">
        <Link
          href="/"
          target="_blank"
          title={isCompact ? "Lihat Website Publik" : undefined}
          className={`flex items-center rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ${
            isCompact ? "justify-center p-2.5" : "gap-2 px-3 py-2"
          }`}
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          {!isCompact && <span>Website Publik</span>}
        </Link>

        <div
          className={`flex items-center rounded-2xl bg-card border p-2 ${
            isCompact ? "justify-center" : "gap-2.5"
          }`}
        >
          <Avatar className="h-8 w-8 shrink-0 rounded-lg">
            <AvatarImage src={user?.image || undefined} alt={user?.name || "Admin"} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-bold">
              {user?.name?.slice(0, 2).toUpperCase() || "AD"}
            </AvatarFallback>
          </Avatar>
          {!isCompact && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">
                {user?.name || "Administrator"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user?.email || "admin@sekolah.test"}
              </p>
            </div>
          )}
          {!isCompact && (
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Keluar / Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Collapsible Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r bg-sidebar transition-all duration-300 relative shrink-0 ${
          collapsed ? "w-18" : "w-64"
        }`}
      >
        <SidebarContent isCompact={collapsed} />

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-6 flex h-7 w-7 items-center justify-center rounded-full border bg-background shadow-xs hover:bg-muted text-muted-foreground hover:text-foreground transition-all z-20 cursor-pointer"
          title={collapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/85 px-4 md:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Mobile Drawer Trigger */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SidebarContent isCompact={false} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Breadcrumb Title */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider hidden sm:inline">
                Sistem Informasi Sekolah
              </span>
              <span className="text-muted-foreground/50 hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm font-extrabold text-foreground">
                Panel Manajemen
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-xl text-xs font-semibold h-8 hidden sm:flex gap-1.5"
            >
              <Link href="/" target="_blank">
                <ExternalLink className="h-3.5 w-3.5" />
                Website Publik
              </Link>
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-xs font-semibold text-muted-foreground hover:text-destructive h-8 px-2.5 rounded-xl gap-1"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </header>

        {/* Page Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
