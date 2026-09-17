"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  MessageSquare,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  MailOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DataTable, Column } from "@/components/common/data-table"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { markMessageRead, deleteContactMessage } from "@/actions/contact"

interface MessageItem {
  id: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function AdminKontakPage() {
  const [messages, setMessages] = React.useState<MessageItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedMessage, setSelectedMessage] = React.useState<MessageItem | null>(null)

  // Confirm delete state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const loadData = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/contact")
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
      }
    } catch {
      toast.error("Gagal memuat pesan")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const handleToggleRead = async (id: string, current: boolean) => {
    try {
      const res = await markMessageRead(id, !current)
      if (res.success) {
        toast.success(
          !current ? "Pesan ditandai sudah dibaca" : "Pesan ditandai belum dibaca"
        )
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead: !current } : m))
        )
      }
    } catch {
      toast.error("Gagal memperbarui status pesan")
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const res = await deleteContactMessage(deleteId)
      if (res.success) {
        toast.success("Pesan berhasil dihapus!")
        setDeleteId(null)
        loadData()
      } else {
        toast.error(res.error || "Gagal menghapus pesan")
      }
    } catch {
      toast.error("Gagal menghapus pesan")
    } finally {
      setIsDeleting(false)
    }
  }

  // Define Table Columns
  const columns: Column<MessageItem>[] = [
    {
      key: "sender",
      header: "Pengirim & Email",
      render: (m) => (
        <div>
          <p className="font-bold text-xs text-foreground leading-snug">
            {m.name}
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            {m.email}
          </p>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subjek & Pesan",
      render: (m) => (
        <div className="max-w-md">
          <p className="font-bold text-xs text-foreground line-clamp-1">
            {m.subject}
          </p>
          <p className="text-[11px] text-muted-foreground line-clamp-1">
            {m.message}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (m) => (
        <button
          onClick={() => handleToggleRead(m.id, m.isRead)}
          className="cursor-pointer"
          title="Klik untuk ubah status baca"
        >
          {m.isRead ? (
            <Badge
              variant="outline"
              className="text-[10px] text-muted-foreground bg-muted border-border gap-1 font-semibold"
            >
              <CheckCircle2 className="h-3 w-3" />
              Sudah Dibaca
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-[10px] font-semibold text-primary bg-primary/10 border-primary/30 gap-1"
            >
              <Clock className="h-3 w-3" />
              Belum Dibaca
            </Badge>
          )}
        </button>
      ),
    },
    {
      key: "date",
      header: "Waktu Masuk",
      render: (m) => (
        <span className="text-xs text-muted-foreground">
          {new Date(m.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Kotak Masuk Pesan Kontak
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Pertanyaan dan aspirasi yang dikirimkan oleh pengunjung melalui form kontak publik.
          </p>
        </div>
      </div>

      {/* Reusable Data Table */}
      <DataTable<MessageItem>
        data={messages}
        columns={columns}
        keyExtractor={(m) => m.id}
        searchPlaceholder="Cari pengirim, subjek, atau isi pesan..."
        searchKey={(m) => `${m.name} ${m.email} ${m.subject} ${m.message}`}
        pageSize={10}
        emptyTitle="Kotak Masuk Kosong"
        emptyDescription="Belum ada pesan baru dari pengunjung website sekolah."
        actions={(m) => (
          <div className="flex items-center justify-end gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-2.5 text-xs font-semibold rounded-lg gap-1"
              onClick={() => {
                setSelectedMessage(m)
                if (!m.isRead) {
                  handleToggleRead(m.id, false)
                }
              }}
            >
              <Eye className="h-3.5 w-3.5" />
              Baca
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
              title="Hapus Pesan"
              onClick={() => setDeleteId(m.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        mobileCardRender={(m, actionButtons) => (
          <div className="rounded-2xl border bg-card p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm text-foreground">{m.name}</p>
              <span className="text-[10px] text-muted-foreground">
                {new Date(m.createdAt).toLocaleDateString("id-ID")}
              </span>
            </div>
            <p className="text-xs font-semibold text-foreground">{m.subject}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {m.message}
            </p>
            <div className="flex justify-end pt-1 border-t">{actionButtons}</div>
          </div>
        )}
      />

      {/* View Message Dialog */}
      <Dialog
        open={Boolean(selectedMessage)}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
      >
        <DialogContent className="sm:max-w-lg rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              Detail Pesan Masuk
            </DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4 pt-2">
              <div className="rounded-xl border bg-muted/30 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pengirim:</span>
                  <span className="font-bold text-foreground">
                    {selectedMessage.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-mono text-foreground">
                    {selectedMessage.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Waktu Kirim:</span>
                  <span className="text-foreground">
                    {new Date(selectedMessage.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Subjek
                </p>
                <p className="text-sm font-bold text-foreground">
                  {selectedMessage.subject}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Isi Pesan
                </p>
                <div className="p-3.5 rounded-xl border bg-background text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t">
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl gap-1.5 text-xs font-semibold"
                >
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                    <Mail className="h-3.5 w-3.5" />
                    Balas via Email
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                  className="rounded-xl"
                >
                  Tutup
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Pesan Masuk?"
        description="Pesan ini akan dihapus secara permanen dari kotak masuk administrasi sekolah."
        confirmText="Hapus Pesan"
        cancelText="Batal"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
