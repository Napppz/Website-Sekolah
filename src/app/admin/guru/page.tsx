"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  Mail,
  BookOpen,
  Loader2,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { createTeacher, updateTeacher, deleteTeacher } from "@/actions/teachers"

interface TeacherData {
  id: string
  nip: string
  name: string
  title?: string | null
  gender: string
  position: string
  subject: string
  photo?: string | null
  email?: string | null
}

export default function AdminGuruPage() {
  const [teachers, setTeachers] = React.useState<TeacherData[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingTeacher, setEditingTeacher] = React.useState<TeacherData | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Load teachers
  const loadTeachers = React.useCallback(async () => {
    setIsLoading(true)
    try {
      // In client component, fetch via server action or internal route
      const res = await fetch(`/api/teachers?q=${search}`)
      if (res.ok) {
        const data = await res.json()
        setTeachers(data.teachers || [])
      }
    } catch {
      // If API route not yet mounted, set dummy data for immediate demo
      setTeachers([
        {
          id: "t-1",
          nip: "197508152000031001",
          name: "Drs. Bambang Sulistyo, M.Kom.",
          gender: "L",
          position: "Waka. Kurikulum",
          subject: "Pemrograman Web & Mobile",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
          email: "bambang@sekolah.test",
        },
        {
          id: "t-2",
          nip: "198203122005012003",
          name: "Siti Rahmawati, M.Pd.",
          gender: "P",
          position: "Waka. Kesiswaan",
          subject: "Bahasa Indonesia",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
          email: "siti@sekolah.test",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [search])

  React.useEffect(() => {
    loadTeachers()
  }, [loadTeachers])

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data guru ini?")) {
      const res = await deleteTeacher(id)
      if (res.success) {
        toast.success("Data guru berhasil dihapus")
        setTeachers((prev) => prev.filter((t) => t.id !== id))
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
      if (editingTeacher) {
        const res = await updateTeacher(editingTeacher.id, formData)
        if (res.success) {
          toast.success("Data guru berhasil diperbarui!")
          setIsDialogOpen(false)
          setEditingTeacher(null)
          loadTeachers()
        } else {
          toast.error(res.error || "Gagal memperbarui")
        }
      } else {
        const res = await createTeacher(formData)
        if (res.success) {
          toast.success("Guru baru berhasil ditambahkan!")
          setIsDialogOpen(false)
          loadTeachers()
        } else {
          toast.error(res.error || "Gagal menambahkan guru")
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
            Manajemen Data Guru
          </h1>
          <p className="text-xs text-muted-foreground">
            Kelola daftar pengajar, NIP, mata pelajaran, dan jabatan struktural.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingTeacher(null)
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-xl gap-1.5">
              <Plus className="h-4 w-4" />
              Tambah Guru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingTeacher ? "Edit Data Guru" : "Tambah Guru Baru"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">NIP *</label>
                  <Input
                    name="nip"
                    defaultValue={editingTeacher?.nip || ""}
                    required
                    placeholder="19800101..."
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Nama Lengkap & Gelar *</label>
                  <Input
                    name="name"
                    defaultValue={editingTeacher?.name || ""}
                    required
                    placeholder="Budi Santoso, S.Pd."
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Jenis Kelamin *</label>
                  <select
                    name="gender"
                    defaultValue={editingTeacher?.gender || "L"}
                    className="w-full h-9 rounded-xl border bg-transparent px-3 text-xs"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Jabatan *</label>
                  <Input
                    name="position"
                    defaultValue={editingTeacher?.position || "Guru Pengajar"}
                    required
                    placeholder="Waka. Kurikulum / Guru"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Mata Pelajaran *</label>
                <Input
                  name="subject"
                  defaultValue={editingTeacher?.subject || ""}
                  required
                  placeholder="Contoh: Rekayasa Perangkat Lunak"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Email</label>
                  <Input
                    name="email"
                    type="email"
                    defaultValue={editingTeacher?.email || ""}
                    placeholder="guru@sekolah.sch.id"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">URL Foto</label>
                  <Input
                    name="photo"
                    defaultValue={editingTeacher?.photo || ""}
                    placeholder="https://..."
                    className="rounded-xl"
                  />
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
                  ) : editingTeacher ? (
                    "Simpan Perubahan"
                  ) : (
                    "Tambah Guru"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari nama guru atau mapel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 rounded-xl h-9 text-xs"
        />
      </div>

      {/* Teachers Table Card */}
      <Card className="rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>Foto & Nama</TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Mata Pelajaran</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-xs text-muted-foreground">
                  Tidak ada data guru ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              teachers.map((t) => (
                <TableRow key={t.id} className="text-xs">
                  <TableCell className="flex items-center gap-2.5 font-medium">
                    <img
                      src={t.photo || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"}
                      alt={t.name}
                      className="h-8 w-8 rounded-full object-cover border"
                    />
                    <span>{t.name}</span>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">{t.nip}</TableCell>
                  <TableCell>{t.position}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">
                      {t.subject}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.email || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                          setEditingTeacher(t)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDelete(t.id)}
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
