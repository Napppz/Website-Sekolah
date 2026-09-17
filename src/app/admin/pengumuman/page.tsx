"use client"

import * as React from "react"
import { toast } from "sonner"
import { Megaphone, Plus, Pencil, Trash2, Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createAnnouncement, updateAnnouncement, deleteAnnouncement } from "@/actions/announcements"

interface AnnouncementItem {
  id: string
  title: string
  slug: string
  content: string
  fileAttachment?: string | null
  isActive: boolean
  publishedAt: string
}

export default function AdminPengumumanPage() {
  const [items, setItems] = React.useState<AnnouncementItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<AnnouncementItem | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadData = async () => {
    try {
      const res = await fetch("/api/announcements")
      if (res.ok) {
        const data = await res.json()
        setItems(data.announcements || [])
      }
    } catch {
      setItems([
        {
          id: "a-1",
          title: "Jadwal Resmi Asesmen Sumatif Akhir Semester Genap 2026",
          slug: "jadwal-asast-2026",
          content: "Asesmen Sumatif Akhir Semester diselenggarakan 2-12 Juni 2026...",
          isActive: true,
          publishedAt: new Date().toISOString(),
        },
      ])
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus pengumuman ini?")) {
      const res = await deleteAnnouncement(id)
      if (res.success) {
        toast.success("Pengumuman berhasil dihapus")
        setItems((prev) => prev.filter((i) => i.id !== id))
      } else {
        toast.error(res.error || "Gagal menghapus")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)

    try {
      if (editingItem) {
        const res = await updateAnnouncement(editingItem.id, formData)
        if (res.success) {
          toast.success("Pengumuman diperbarui!")
          setIsDialogOpen(false)
          setEditingItem(null)
          loadData()
        } else {
          toast.error(res.error || "Gagal memperbarui")
        }
      } else {
        const res = await createAnnouncement(formData)
        if (res.success) {
          toast.success("Pengumuman baru diterbitkan!")
          setIsDialogOpen(false)
          loadData()
        } else {
          toast.error(res.error || "Gagal membuat pengumuman")
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Pengumuman Resmi
          </h1>
          <p className="text-xs text-muted-foreground">
            Pemberitahuan penting untuk siswa, orang tua, dan tenaga kependidikan.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingItem(null)
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-xl gap-1.5">
              <Plus className="h-4 w-4" />
              Buat Pengumuman
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Judul Pengumuman *</label>
                <Input
                  name="title"
                  defaultValue={editingItem?.title || ""}
                  required
                  placeholder="Contoh: Jadwal Libur Awal Ramadhan 1447 H"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Isi Pengumuman Lengkap *</label>
                <Textarea
                  name="content"
                  defaultValue={editingItem?.content || ""}
                  required
                  rows={5}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">URL File Lampiran</label>
                  <Input
                    name="fileAttachment"
                    defaultValue={editingItem?.fileAttachment || ""}
                    placeholder="/uploads/edaran.pdf"
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Status Aktif</label>
                  <select
                    name="isActive"
                    defaultValue={editingItem ? String(editingItem.isActive) : "true"}
                    className="w-full h-9 rounded-xl border bg-transparent px-3 text-xs"
                  >
                    <option value="true">Aktif (Ditampilkan)</option>
                    <option value="false">Nonaktif (Arsip)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingItem ? (
                    "Simpan"
                  ) : (
                    "Terbitkan"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>Judul Pengumuman</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead>Lampiran</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-xs text-muted-foreground">
                  Belum ada pengumuman resmi.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className="text-xs">
                  <TableCell className="font-semibold text-foreground max-w-md truncate">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {item.fileAttachment ? (
                      <span className="text-primary font-medium text-[11px]">Ada File</span>
                    ) : (
                      <span className="text-muted-foreground text-[11px]">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.isActive ? "default" : "secondary"} className="text-[10px]">
                      {item.isActive ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                          setEditingItem(item)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
