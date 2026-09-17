"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  GraduationCap,
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { createStudent, updateStudent, deleteStudent } from "@/actions/students"

interface StudentData {
  id: string
  nisn: string
  nis: string
  name: string
  gender: string
  classGrade: string
  majorId: string
  major?: { name: string; code: string }
  status: string
}

export default function AdminSiswaPage() {
  const [students, setStudents] = React.useState<StudentData[]>([])
  const [search, setSearch] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingStudent, setEditingStudent] = React.useState<StudentData | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadStudents = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/students?q=${search}`)
      if (res.ok) {
        const data = await res.json()
        setStudents(data.students || [])
      }
    } catch {
      setStudents([
        {
          id: "s-1",
          nisn: "0089123456",
          nis: "20241001",
          name: "Muhammad Rizky Pratama",
          gender: "L",
          classGrade: "XII",
          majorId: "major-1",
          major: { name: "Rekayasa Perangkat Lunak", code: "RPL" },
          status: "ACTIVE",
        },
        {
          id: "s-2",
          nisn: "0091234567",
          nis: "20241002",
          name: "Annisa Syifa Rahmadani",
          gender: "P",
          classGrade: "XI",
          majorId: "major-3",
          major: { name: "Desain Komunikasi Visual", code: "DKV" },
          status: "ACTIVE",
        },
      ])
    }
  }, [search])

  React.useEffect(() => {
    loadStudents()
  }, [loadStudents])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus data siswa ini?")) {
      const res = await deleteStudent(id)
      if (res.success) {
        toast.success("Siswa berhasil dihapus")
        setStudents((prev) => prev.filter((s) => s.id !== id))
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
      if (editingStudent) {
        const res = await updateStudent(editingStudent.id, formData)
        if (res.success) {
          toast.success("Data siswa berhasil diperbarui!")
          setIsDialogOpen(false)
          setEditingStudent(null)
          loadStudents()
        } else {
          toast.error(res.error || "Gagal memperbarui")
        }
      } else {
        const res = await createStudent(formData)
        if (res.success) {
          toast.success("Siswa baru berhasil ditambahkan!")
          setIsDialogOpen(false)
          loadStudents()
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
            Manajemen Data Siswa
          </h1>
          <p className="text-xs text-muted-foreground">
            Data nomor induk (NISN & NIS), kelas, gender, dan jurusan siswa.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingStudent(null)
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-xl gap-1.5">
              <Plus className="h-4 w-4" />
              Tambah Siswa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingStudent ? "Edit Data Siswa" : "Tambah Siswa Baru"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Nama Lengkap Siswa *</label>
                <Input
                  name="name"
                  defaultValue={editingStudent?.name || ""}
                  required
                  placeholder="Contoh: Raditya Pratama"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">NISN (10 Digit) *</label>
                  <Input
                    name="nisn"
                    maxLength={10}
                    defaultValue={editingStudent?.nisn || ""}
                    required
                    placeholder="00xxxxxxxx"
                    className="rounded-xl font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">NIS *</label>
                  <Input
                    name="nis"
                    defaultValue={editingStudent?.nis || ""}
                    required
                    placeholder="2024xxxx"
                    className="rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Jenis Kelamin</label>
                  <select
                    name="gender"
                    defaultValue={editingStudent?.gender || "L"}
                    className="w-full h-9 rounded-xl border bg-transparent px-2 text-xs"
                  >
                    <option value="L">L</option>
                    <option value="P">P</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Kelas</label>
                  <select
                    name="classGrade"
                    defaultValue={editingStudent?.classGrade || "X"}
                    className="w-full h-9 rounded-xl border bg-transparent px-2 text-xs"
                  >
                    <option value="X">Kelas X</option>
                    <option value="XI">Kelas XI</option>
                    <option value="XII">Kelas XII</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Status</label>
                  <select
                    name="status"
                    defaultValue={editingStudent?.status || "ACTIVE"}
                    className="w-full h-9 rounded-xl border bg-transparent px-2 text-xs"
                  >
                    <option value="ACTIVE">Aktif</option>
                    <option value="GRADUATED">Lulus</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Program Keahlian (Jurusan) *</label>
                <select
                  name="majorId"
                  defaultValue={editingStudent?.majorId || "major-1"}
                  className="w-full h-9 rounded-xl border bg-transparent px-3 text-xs"
                >
                  <option value="major-1">Rekayasa Perangkat Lunak (RPL)</option>
                  <option value="major-2">Teknik Jaringan Komputer (TJKT)</option>
                  <option value="major-3">Desain Komunikasi Visual (DKV)</option>
                  <option value="major-4">Manajemen Perkantoran (MPLB)</option>
                  <option value="major-5">Akuntansi Keuangan (AKL)</option>
                </select>
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
                  ) : editingStudent ? (
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

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari nama atau NISN siswa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 rounded-xl h-9 text-xs"
        />
      </div>

      <Card className="rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>NISN / NIS</TableHead>
              <TableHead>Nama Siswa</TableHead>
              <TableHead>L/P</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Jurusan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-xs text-muted-foreground">
                  Tidak ada data siswa.
                </TableCell>
              </TableRow>
            ) : (
              students.map((s) => (
                <TableRow key={s.id} className="text-xs">
                  <TableCell className="font-mono text-muted-foreground">
                    {s.nisn} / {s.nis}
                  </TableCell>
                  <TableCell className="font-bold text-foreground">{s.name}</TableCell>
                  <TableCell>{s.gender}</TableCell>
                  <TableCell>Kelas {s.classGrade}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {s.major?.code || "RPL"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={s.status === "ACTIVE" ? "secondary" : "outline"}
                      className="text-[10px] text-emerald-600"
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                          setEditingStudent(s)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDelete(s.id)}
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
