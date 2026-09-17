"use client"

import * as React from "react"
import { toast } from "sonner"
import { Layers, Plus, Pencil, Trash2, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createMajor, updateMajor, deleteMajor } from "@/actions/majors"

interface MajorItem {
  id: string
  code: string
  name: string
  slug: string
  description: string
  competencies: string
  careerProspects: string
  image?: string | null
}

export default function AdminJurusanPage() {
  const [majors, setMajors] = React.useState<MajorItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingMajor, setEditingMajor] = React.useState<MajorItem | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadMajors = async () => {
    try {
      const res = await fetch("/api/majors")
      if (res.ok) {
        const data = await res.json()
        setMajors(data.majors || [])
      }
    } catch {
      setMajors([
        {
          id: "m-1",
          code: "RPL",
          name: "Rekayasa Perangkat Lunak",
          slug: "rekayasa-perangkat-lunak",
          description: "Pengembangan web dan aplikasi mobile modern.",
          competencies: "Full-Stack Development, React, Node.js, Database",
          careerProspects: "Frontend/Backend Engineer, Mobile Dev",
        },
      ])
    }
  }

  React.useEffect(() => {
    loadMajors()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus program keahlian ini? Semua data siswa terkait akan terdampak.")) {
      const res = await deleteMajor(id)
      if (res.success) {
        toast.success("Jurusan berhasil dihapus")
        setMajors((prev) => prev.filter((m) => m.id !== id))
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
      if (editingMajor) {
        const res = await updateMajor(editingMajor.id, formData)
        if (res.success) {
          toast.success("Jurusan berhasil diperbarui!")
          setIsDialogOpen(false)
          setEditingMajor(null)
          loadMajors()
        } else {
          toast.error(res.error || "Gagal memperbarui")
        }
      } else {
        const res = await createMajor(formData)
        if (res.success) {
          toast.success("Jurusan baru berhasil dibuat!")
          setIsDialogOpen(false)
          loadMajors()
        } else {
          toast.error(res.error || "Gagal menambahkan")
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
            Manajemen Program Keahlian (Jurusan)
          </h1>
          <p className="text-xs text-muted-foreground">
            Kelola kode jurusan, kurikulum kompetensi, dan peluang prospek kerja.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingMajor(null)
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-xl gap-1.5">
              <Plus className="h-4 w-4" />
              Tambah Jurusan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingMajor ? "Edit Program Keahlian" : "Tambah Program Keahlian"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Kode *</label>
                  <Input
                    name="code"
                    defaultValue={editingMajor?.code || ""}
                    required
                    placeholder="RPL"
                    className="rounded-xl font-bold uppercase"
                  />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-semibold">Nama Program Keahlian *</label>
                  <Input
                    name="name"
                    defaultValue={editingMajor?.name || ""}
                    required
                    placeholder="Rekayasa Perangkat Lunak"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Deskripsi Singkat *</label>
                <Textarea
                  name="description"
                  defaultValue={editingMajor?.description || ""}
                  required
                  rows={3}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Kompetensi Keahlian *</label>
                <Textarea
                  name="competencies"
                  defaultValue={editingMajor?.competencies || ""}
                  required
                  rows={2}
                  className="rounded-xl text-xs"
                  placeholder="Daftar keahlian teknis..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Prospek Karir & Pekerjaan *</label>
                <Textarea
                  name="careerProspects"
                  defaultValue={editingMajor?.careerProspects || ""}
                  required
                  rows={2}
                  className="rounded-xl text-xs"
                  placeholder="Profesi lulusan..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">URL Foto Banner</label>
                <Input
                  name="image"
                  defaultValue={editingMajor?.image || ""}
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
                  ) : editingMajor ? (
                    "Simpan"
                  ) : (
                    "Tambah Jurusan"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {majors.map((m) => (
          <Card key={m.id} className="rounded-2xl border bg-card flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="default" className="font-bold text-xs">
                  {m.code}
                </Badge>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => {
                      setEditingMajor(m)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-destructive"
                    onClick={() => handleDelete(m.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg font-bold text-foreground mt-2">
                {m.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-muted-foreground">
              <p className="line-clamp-2">{m.description}</p>
              <div className="p-2.5 bg-muted/40 rounded-xl space-y-1">
                <p className="font-semibold text-foreground text-[11px]">Prospek Karir:</p>
                <p className="line-clamp-2">{m.careerProspects}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
