"use client"

import * as React from "react"
import { toast } from "sonner"
import { Trophy, Plus, Pencil, Trash2, Loader2, Calendar, User } from "lucide-react"
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
import { createAchievement, updateAchievement, deleteAchievement } from "@/actions/achievements"

interface AchievementItem {
  id: string
  title: string
  slug: string
  description: string
  level: string
  year: number
  participant: string
  category: string
  photo?: string | null
}

export default function AdminPrestasiPage() {
  const [achievements, setAchievements] = React.useState<AchievementItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<AchievementItem | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadData = async () => {
    try {
      const res = await fetch("/api/achievements")
      if (res.ok) {
        const data = await res.json()
        setAchievements(data.achievements || [])
      }
    } catch {
      setAchievements([
        {
          id: "ach-1",
          title: "Juara 1 LKS Nasional Bidang Cloud Computing",
          slug: "juara-1-lks-cloud",
          description: "Meraih medali emas tingkat nasional.",
          level: "Nasional",
          year: 2026,
          participant: "Raditya Pratama",
          category: "Akademik & IT",
        },
      ])
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus data prestasi ini?")) {
      const res = await deleteAchievement(id)
      if (res.success) {
        toast.success("Prestasi dihapus")
        setAchievements((prev) => prev.filter((a) => a.id !== id))
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
        const res = await updateAchievement(editingItem.id, formData)
        if (res.success) {
          toast.success("Prestasi berhasil diperbarui!")
          setIsDialogOpen(false)
          setEditingItem(null)
          loadData()
        } else {
          toast.error(res.error || "Gagal memperbarui")
        }
      } else {
        const res = await createAchievement(formData)
        if (res.success) {
          toast.success("Prestasi baru berhasil ditambahkan!")
          setIsDialogOpen(false)
          loadData()
        } else {
          toast.error(res.error || "Gagal menambahkan prestasi")
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
            Kelola Prestasi Siswa & Guru
          </h1>
          <p className="text-xs text-muted-foreground">
            Rekam jejak penghargaan kejuaraan tingkat kota, provinsi, nasional, dan internasional.
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
              Tambah Prestasi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Data Prestasi" : "Tambah Prestasi Baru"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Judul Prestasi / Kejuaraan *</label>
                <Input
                  name="title"
                  defaultValue={editingItem?.title || ""}
                  required
                  placeholder="Contoh: Juara 1 Medali Emas LKS Nasional"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Nama Peserta / Peraih *</label>
                  <Input
                    name="participant"
                    defaultValue={editingItem?.participant || ""}
                    required
                    placeholder="Nama siswa atau tim"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Kategori Bidang *</label>
                  <Input
                    name="category"
                    defaultValue={editingItem?.category || "Akademik & Teknologi"}
                    required
                    placeholder="Teknologi / Olahraga / Seni"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Tingkat Prestasi</label>
                  <select
                    name="level"
                    defaultValue={editingItem?.level || "Nasional"}
                    className="w-full h-9 rounded-xl border bg-transparent px-3 text-xs"
                  >
                    <option value="Sekolah">Tingkat Sekolah</option>
                    <option value="Kabupaten/Kota">Kabupaten / Kota</option>
                    <option value="Provinsi">Tingkat Provinsi</option>
                    <option value="Nasional">Tingkat Nasional</option>
                    <option value="Internasional">Tingkat Internasional</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Tahun *</label>
                  <Input
                    name="year"
                    type="number"
                    defaultValue={editingItem?.year || new Date().getFullYear()}
                    required
                    className="rounded-xl font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Deskripsi Pencapaian *</label>
                <Textarea
                  name="description"
                  defaultValue={editingItem?.description || ""}
                  required
                  rows={3}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">URL Foto</label>
                <Input
                  name="photo"
                  defaultValue={editingItem?.photo || ""}
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

      <Card className="rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>Nama Kejuaraan</TableHead>
              <TableHead>Peraih</TableHead>
              <TableHead>Tingkat</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {achievements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-xs text-muted-foreground">
                  Belum ada data prestasi.
                </TableCell>
              </TableRow>
            ) : (
              achievements.map((item) => (
                <TableRow key={item.id} className="text-xs">
                  <TableCell className="font-semibold text-foreground max-w-sm">
                    {item.title}
                  </TableCell>
                  <TableCell className="font-medium">{item.participant}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {item.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">{item.year}</TableCell>
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
