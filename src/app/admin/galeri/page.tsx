"use client"

import * as React from "react"
import { toast } from "sonner"
import { Image as ImageIcon, Plus, Trash2, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createGalleryItem, deleteGalleryItem } from "@/actions/gallery"

interface GalleryData {
  id: string
  title: string
  description?: string | null
  imageUrl: string
  category: string
  albumName?: string | null
}

export default function AdminGaleriPage() {
  const [items, setItems] = React.useState<GalleryData[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadData = async () => {
    try {
      const res = await fetch("/api/gallery")
      if (res.ok) {
        const data = await res.json()
        setItems(data.gallery || [])
      }
    } catch {
      setItems([
        {
          id: "g-1",
          title: "Praktikum Pemrograman Cloud di Lab AI",
          category: "Fasilitas",
          albumName: "Laboratorium",
          imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        },
      ])
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus foto galeri ini?")) {
      const res = await deleteGalleryItem(id)
      if (res.success) {
        toast.success("Foto dihapus")
        setItems((prev) => prev.filter((i) => i.id !== id))
      } else {
        toast.error(res.error || "Gagal")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)

    try {
      const res = await createGalleryItem(formData)
      if (res.success) {
        toast.success("Foto berhasil ditambahkan ke galeri!")
        setIsDialogOpen(false)
        loadData()
      } else {
        toast.error(res.error || "Gagal menambahkan foto")
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
            Kelola Galeri Foto Sekolah
          </h1>
          <p className="text-xs text-muted-foreground">
            Upload dokumentasi kegiatan, fasilitas sarpras, dan aktivitas ekstrakurikuler.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-xl gap-1.5">
              <Plus className="h-4 w-4" />
              Unggah Foto Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Unggah Foto Galeri</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Judul Foto *</label>
                <Input
                  name="title"
                  required
                  placeholder="Contoh: Upacara Hari Pahlawan 2026"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Kategori</label>
                  <select
                    name="category"
                    defaultValue="Kegiatan"
                    className="w-full h-9 rounded-xl border bg-transparent px-3 text-xs"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Fasilitas">Fasilitas</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Nama Album</label>
                  <Input
                    name="albumName"
                    placeholder="Contoh: HUT RI ke-81"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">URL Foto Gambar *</label>
                <Input
                  name="imageUrl"
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Deskripsi (Opsional)</label>
                <Textarea
                  name="description"
                  rows={2}
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
                  ) : (
                    "Tambahkan Foto"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid of gallery items with delete button */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square rounded-2xl overflow-hidden border bg-muted shadow-xs flex flex-col justify-between"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-3">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-[9px] bg-black/50 text-white border-0">
                  {item.category}
                </Badge>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-white text-xs font-semibold line-clamp-2">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
