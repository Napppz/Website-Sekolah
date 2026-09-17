"use client"

import * as React from "react"
import Link from "next/link"
import {
  Bell,
  UserCheck,
  MessageSquare,
  CheckCheck,
  FileCheck2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: string
  title: string
  message: string
  href: string | null
  isRead: boolean
  createdAt: string
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const then = new Date(dateStr)
  const diffMs = now.getTime() - then.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return "Baru saja"
  if (diffMin < 60) return `${diffMin} menit lalu`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour} jam lalu`
  const diffDay = Math.floor(diffHour / 24)
  if (diffDay < 7) return `${diffDay} hari lalu`
  return then.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "PPDB_NEW":
      return <UserCheck className="h-4 w-4 text-emerald-500" />
    case "PPDB_STATUS_CHANGE":
      return <FileCheck2 className="h-4 w-4 text-blue-500" />
    case "CONTACT_NEW":
      return <MessageSquare className="h-4 w-4 text-amber-500" />
    default:
      return <Bell className="h-4 w-4 text-primary" />
  }
}

export function NotificationBell() {
  const [open, setOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const fetchNotifications = React.useCallback(async () => {
    try {
      const res = await fetch("/api/notifications?limit=15", { cache: "no-store" })
      const data = await res.json()
      setNotifications(data.notifications || [])
      setUnreadCount(data.unreadCount || 0)
    } catch {
      // silent fail
    }
  }, [])

  // Initial fetch + polling every 30s
  React.useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [fetchNotifications])

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleMarkAllRead = async () => {
    setLoading(true)
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      })
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
      setUnreadCount(0)
    } catch {
      // silent fail
    } finally {
      setLoading(false)
    }
  }

  const handleMarkRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markRead", id }),
      })
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch {
      // silent fail
    }
  }

  return (
    <div ref={ref} className="relative">
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        className="relative h-8 w-8 rounded-xl p-0 cursor-pointer"
        onClick={() => setOpen(!open)}
        title="Notifikasi"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-background animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-[360px] max-h-[480px] rounded-2xl border bg-card shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-foreground">Notifikasi</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded-md">
                  {unreadCount} baru
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  disabled={loading}
                  className="text-[10px] font-semibold text-primary hover:text-primary/80 px-2 py-1 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <CheckCheck className="h-3.5 w-3.5 inline mr-1" />
                  Tandai semua dibaca
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="overflow-y-auto max-h-[400px] divide-y">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-medium">
                  Belum ada notifikasi
                </p>
              </div>
            ) : (
              notifications.map((notif) => {
                const content = (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 p-3.5 hover:bg-muted/40 transition-colors cursor-pointer ${
                      !notif.isRead ? "bg-primary/3" : ""
                    }`}
                    onClick={() => {
                      if (!notif.isRead) handleMarkRead(notif.id)
                      if (notif.href) setOpen(false)
                    }}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center">
                        {getNotificationIcon(notif.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-xs leading-tight line-clamp-1 ${!notif.isRead ? "font-bold text-foreground" : "font-medium text-foreground/80"}`}>
                          {notif.title}
                        </p>
                        {!notif.isRead && (
                          <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 font-medium">
                        {timeAgo(notif.createdAt)}
                      </p>
                    </div>
                  </div>
                )

                if (notif.href) {
                  return (
                    <Link key={notif.id} href={notif.href} className="block">
                      {content}
                    </Link>
                  )
                }
                return <div key={notif.id}>{content}</div>
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
