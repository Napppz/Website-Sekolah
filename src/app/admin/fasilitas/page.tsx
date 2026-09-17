"use client"

import * as React from "react"
import { toast } from "sonner"
import { Building2, Plus, Pencil, Trash2, Loader2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createFacility, updateFacility, deleteFacility } from "@/actions/facilities"

interface FacilityItem {
  id: string
  name: string
  slug: string
  category: string
  capacity?: number | null
  condition: string
  description: string
  image?: string | null
}

export default function AdminFasilitasPage() {
  const [facilities, setFacilities] = React.useState<FacilityItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<FacilityItem | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadData = async () => {
    try {
      const res = await fetch("/api/facilities")
      if (res.ok) {
        const data = await res.json()
        setFacilities(data.facilities || [])
      }
    } catch {
      setFacilities([
        {
          id: "f-1",
          name: "Laboratorium Komputer & AI",
          slug: "lab-komputer",
          category: "Laboratorium",
          capacity: 40,
          condition: "Sangat Baik",
          description: "Laboratorium PC high-spec untuk AI dan coding.",
        },
      ])
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus fasilitas ini?")) {
      const res = await deleteFacility(id)
      if (res.success) {
        toast.success("Fasilitas dihapus")
        setFacilities((prev) => prev.filter((f) => f.id !== id))
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
        const res = await updateFacility(editingItem.id, formData)
        if (res.success) {
          toast.success("Fasilitas diperbarui!")
          setIsDialogOpen(false)
          setEditingItem(null)
          loadData()
        } else {
          toast.error(res.error || "Gagal")
        }
      } else {
        const res = await createFacility(formData)
        if (res.success) {
          toast.success("Fasilitas baru ditambahkan!")
          setIsDialogOpen(false)
          loadData()
        } else {
          toast.error(res.error || "Gagal")
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
            Kelola Fasilitas Kampus
          </h1>
          <p className="text-xs text-muted-foreground">
            Sarana dan prasarana laboratorium, ruang kelas, dan aula sekolah.
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
              Tambah Fasilitas
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Fasilitas" : "Tambah Fasilitas Baru"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Nama Fasilitas *</label>
                <Input
                  name="name"
                  defaultValue={editingItem?.name || ""}
                  required
                  placeholder="Contoh: Lab Jaringan & IoT"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Kategori</label>
                  <select
                    name="category"
                    defaultValue={editingItem?.category || "Laboratorium"}
                    className="w-full h-9 rounded-xl border bg-transparent px-2 text-xs"
                  >
                    <option value="Laboratorium">Laboratorium</option>
                    <option value="Studio">Studio</option>
                    <option value="Umum">Umum</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Kelas">Kelas</option>
                    <option value="Ibadah">Ibadah</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Kapasitas</label>
                  <Input
                    name="capacity"
                    type="number"
                    defaultValue={editingItem?.capacity || 40}
                    placeholder="40"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Kondisi</label>
                  <select
                    name="condition"
                    defaultValue={editingItem?.condition || "Sangat Baik"}
                    className="w-full h-9 rounded-xl border bg-transparent px-2 text-xs"
                  >
                    <option value="Sangat Baik">Sangat Baik</option>
                    <option value="Baik">Baik</option>
                    <option value="Perbaikan">Perbaikan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Deskripsi Lengkap *</label>
                <Textarea
                  name="description"
                  defaultValue={editingItem?.description || ""}
                  required
                  rows={3}
                  className="rounded-xl text-xs"
                  placeholder="Spesifikasi dan kegunaan fasilitas..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">URL Foto</label>
                <Input
                  name="image"
                  defaultValue={editingItem?.image || ""}
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
                    "Tambah"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f) => (
          <Card key={f.id} className="rounded-2xl border bg-card flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">
                  {f.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => {
                      setEditingItem(f)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-destructive"
                    onClick={() => handleDelete(f.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-base font-bold text-foreground mt-2">
                {f.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p className="line-clamp-2">{f.description}</p>
              <div className="flex items-center justify-between pt-2 border-t text-[11px]">
                <span>Kapasitas: {f.capacity || "-"} Orang</span>
                <span className="font-semibold text-emerald-600">{f.condition}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
