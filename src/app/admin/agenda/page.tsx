"use client"

import * as React from "react"
import { toast } from "sonner"
import { Calendar, Plus, Pencil, Trash2, Loader2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
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
import { createEvent, updateEvent, deleteEvent } from "@/actions/events"

interface EventItem {
  id: string
  title: string
  slug: string
  description: string
  location: string
  startDate: string
  endDate?: string | null
  poster?: string | null
}

export default function AdminAgendaPage() {
  const [events, setEvents] = React.useState<EventItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<EventItem | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadData = async () => {
    try {
      const res = await fetch("/api/events")
      if (res.ok) {
        const data = await res.json()
        setEvents(data.events || [])
      }
    } catch {
      setEvents([
        {
          id: "e-1",
          title: "Pameran Karya & Job Fair Vokasi Nusantara 2026",
          slug: "job-fair-vokasi-2026",
          description: "Bursa kerja khusus menghadirkan 35+ mitra industri.",
          location: "Aula Graha Nusantara",
          startDate: new Date("2026-05-18").toISOString(),
        },
      ])
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus agenda ini?")) {
      const res = await deleteEvent(id)
      if (res.success) {
        toast.success("Agenda kegiatan dihapus")
        setEvents((prev) => prev.filter((e) => e.id !== id))
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
        const res = await updateEvent(editingItem.id, formData)
        if (res.success) {
          toast.success("Agenda kegiatan diperbarui!")
          setIsDialogOpen(false)
          setEditingItem(null)
          loadData()
        } else {
          toast.error(res.error || "Gagal memperbarui")
        }
      } else {
        const res = await createEvent(formData)
        if (res.success) {
          toast.success("Agenda baru berhasil dijadwalkan!")
          setIsDialogOpen(false)
          loadData()
        } else {
          toast.error(res.error || "Gagal membuat agenda")
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
            Kelola Agenda & Kegiatan Sekolah
          </h1>
          <p className="text-xs text-muted-foreground">
            Jadwal kegiatan akademik, ujian, perlombaan, dan rapat komite.
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
              Buat Agenda Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Agenda Kegiatan" : "Buat Agenda Baru"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Nama / Judul Kegiatan *</label>
                <Input
                  name="title"
                  defaultValue={editingItem?.title || ""}
                  required
                  placeholder="Contoh: Workshop Cloud Computing"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Lokasi / Tempat *</label>
                <Input
                  name="location"
                  defaultValue={editingItem?.location || ""}
                  required
                  placeholder="Contoh: Aula Serbaguna Graha Nusantara"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Tanggal Mulai *</label>
                  <Input
                    type="date"
                    name="startDate"
                    defaultValue={
                      editingItem
                        ? new Date(editingItem.startDate).toISOString().split("T")[0]
                        : ""
                    }
                    required
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Tanggal Selesai</label>
                  <Input
                    type="date"
                    name="endDate"
                    defaultValue={
                      editingItem?.endDate
                        ? new Date(editingItem.endDate).toISOString().split("T")[0]
                        : ""
                    }
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Deskripsi Kegiatan *</label>
                <Textarea
                  name="description"
                  defaultValue={editingItem?.description || ""}
                  required
                  rows={3}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">URL Poster / Gambar</label>
                <Input
                  name="poster"
                  defaultValue={editingItem?.poster || ""}
                  placeholder="https://..."
                  className="rounded-xl text-xs"
                />
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
                    "Jadwalkan"
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
              <TableHead>Nama Kegiatan</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Tanggal Pelaksanaan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-xs text-muted-foreground">
                  Belum ada agenda kegiatan.
                </TableCell>
              </TableRow>
            ) : (
              events.map((item) => (
                <TableRow key={item.id} className="text-xs">
                  <TableCell className="font-semibold text-foreground max-w-sm">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      {item.location}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono">
                    {new Date(item.startDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
