"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DataTable, Column } from "@/components/common/data-table"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { createStudent, updateStudent, deleteStudent } from "@/actions/students"
import { exportToCsv } from "@/lib/export-csv"

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
  const [isLoading, setIsLoading] = React.useState(true)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingStudent, setEditingStudent] = React.useState<StudentData | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Confirm delete state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const loadStudents = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/students")
      if (res.ok) {
        const data = await res.json()
        setStudents(data.students || [])
      }
    } catch {
      toast.error("Gagal memuat data siswa")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadStudents()
  }, [loadStudents])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      if (editingStudent) {
        formData.append("id", editingStudent.id)
        const res = await updateStudent(editingStudent.id, formData)
        if (res.success) {
          toast.success("Data siswa berhasil diperbarui!")
          setIsDialogOpen(false)
          setEditingStudent(null)
          loadStudents()
        } else {
          toast.error(res.error || "Gagal memperbarui siswa")
        }
      } else {
        const res = await createStudent(formData)
        if (res.success) {
          toast.success("Siswa baru berhasil ditambahkan!")
          setIsDialogOpen(false)
          loadStudents()
        } else {
          toast.error(res.error || "Gagal menambah siswa")
        }
      }
    } catch {
      toast.error("Terjadi kesalahan sistem")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const res = await deleteStudent(deleteId)
      if (res.success) {
        toast.success("Data siswa berhasil dihapus!")
        setDeleteId(null)
        loadStudents()
      } else {
        toast.error(res.error || "Gagal menghapus siswa")
      }
    } catch {
      toast.error("Gagal menghapus siswa")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleExportCsv = () => {
    try {
      if (students.length === 0) {
        toast.error("Tidak ada data siswa untuk diekspor")
        return
      }

      const columnsToExport = [
        { key: "_index", label: "No" },
        { key: "nisn", label: "NISN", format: (val: string) => `'${val}` },
        { key: "nis", label: "NIS", format: (val: string) => `'${val}` },
        { key: "name", label: "Nama Siswa" },
        {
          key: "gender",
          label: "Jenis Kelamin",
          format: (val: string) => (val === "L" ? "Laki-laki" : "Perempuan"),
        },
        { key: "classGrade", label: "Tingkat / Kelas", format: (val: string) => `Kelas ${val}` },
        {
          key: "major",
          label: "Program Keahlian",
          format: (val: any) => (val ? `${val.name} (${val.code})` : "-"),
        },
        {
          key: "status",
          label: "Status Siswa",
          format: (val: string) => {
            const map: Record<string, string> = {
              ACTIVE: "Aktif",
              GRADUATED: "Lulus",
              TRANSFERRED: "Pindah",
              DROPOUT: "Non-Aktif",
            }
            return map[val] || val
          },
        },
      ]

      const dateStr = new Date().toISOString().split("T")[0]
      exportToCsv(`data-siswa-smk-${dateStr}`, columnsToExport, students)
      toast.success(`Berhasil mengekspor ${students.length} data siswa ke CSV/Excel!`)
    } catch {
      toast.error("Gagal mengekspor data siswa")
    }
  }

  // Table Columns
  const columns: Column<StudentData>[] = [
    {
      key: "name",
      header: "Nama Siswa",
      render: (s) => (
        <div>
          <p className="font-bold text-xs text-foreground leading-snug truncate">
            {s.name}
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            NISN: {s.nisn} • NIS: {s.nis}
          </p>
        </div>
      ),
    },
    {
      key: "classGrade",
      header: "Kelas",
      render: (s) => (
        <span className="font-bold text-xs text-foreground">
          Kelas {s.classGrade}
        </span>
      ),
    },
    {
      key: "major",
      header: "Jurusan",
      render: (s) => (
        <Badge
          variant="outline"
          className="text-[10px] font-semibold bg-primary/5 text-primary border-primary/20"
        >
          {s.major?.code || "RPL"}
        </Badge>
      ),
    },
    {
      key: "gender",
      header: "Gender",
      render: (s) => (
        <span className="text-xs text-muted-foreground">
          {s.gender === "L" ? "Laki-laki" : "Perempuan"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (s) => (
        <Badge
          variant="outline"
          className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
        >
          {s.status}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Manajemen Data Siswa
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Daftar peserta didik aktif, nomor induk siswa, dan kelas rombel.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportCsv}
            variant="outline"
            size="sm"
            className="rounded-xl font-semibold gap-1.5 border-emerald-600/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 shadow-2xs h-9"
          >
            <Download className="h-4 w-4" />
            Export Excel / CSV
          </Button>
          <Button
            onClick={() => {
              setEditingStudent(null)
              setIsDialogOpen(true)
            }}
            size="sm"
            className="rounded-xl font-semibold gap-1.5 h-9"
          >
            <Plus className="h-4 w-4" />
            Tambah Siswa Baru
          </Button>
        </div>
      </div>

      {/* Reusable Data Table */}
      <DataTable<StudentData>
        data={students}
        columns={columns}
        keyExtractor={(s) => s.id}
        searchPlaceholder="Cari nama siswa, NISN, atau NIS..."
        searchKey={(s) => `${s.name} ${s.nisn} ${s.nis}`}
        pageSize={10}
        emptyTitle="Belum Ada Data Siswa"
        emptyDescription="Mulai daftarkan data siswa aktif untuk keperluan administrasi kesiswaan."
        emptyAction={
          <Button
            onClick={() => {
              setEditingStudent(null)
              setIsDialogOpen(true)
            }}
            size="sm"
            className="rounded-xl"
          >
            Tambah Siswa
          </Button>
        }
        actions={(s) => (
          <div className="flex items-center justify-end gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg hover:bg-muted"
              title="Edit Data"
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
              className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
              title="Hapus Data"
              onClick={() => setDeleteId(s.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        mobileCardRender={(s, actionButtons) => (
          <div className="rounded-2xl border bg-card p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm text-foreground">{s.name}</p>
              <Badge
                variant="outline"
                className="text-[10px] bg-primary/5 text-primary border-primary/20"
              >
                {s.major?.code || "RPL"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              NISN: {s.nisn} • Kelas: {s.classGrade}
            </p>
            <div className="flex justify-end pt-1 border-t">{actionButtons}</div>
          </div>
        )}
      />

      {/* Form Dialog (Create / Edit) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              {editingStudent ? "Edit Data Siswa" : "Tambah Siswa Baru"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Nama Lengkap Siswa <span className="text-destructive">*</span>
              </label>
              <Input
                name="name"
                defaultValue={editingStudent?.name || ""}
                required
                placeholder="Nama sesuai ijazah / KK..."
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  NISN <span className="text-destructive">*</span>
                </label>
                <Input
                  name="nisn"
                  defaultValue={editingStudent?.nisn || ""}
                  required
                  maxLength={10}
                  placeholder="10 digit NISN..."
                  className="rounded-xl h-10 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  NIS Sekolah <span className="text-destructive">*</span>
                </label>
                <Input
                  name="nis"
                  defaultValue={editingStudent?.nis || ""}
                  required
                  placeholder="NIS lokal..."
                  className="rounded-xl h-10 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Gender <span className="text-destructive">*</span>
                </label>
                <select
                  name="gender"
                  defaultValue={editingStudent?.gender || "L"}
                  className="w-full h-10 rounded-xl border bg-card px-3 text-xs"
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Tingkat Kelas <span className="text-destructive">*</span>
                </label>
                <select
                  name="classGrade"
                  defaultValue={editingStudent?.classGrade || "X"}
                  className="w-full h-10 rounded-xl border bg-card px-3 text-xs"
                >
                  <option value="X">Kelas X</option>
                  <option value="XI">Kelas XI</option>
                  <option value="XII">Kelas XII</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Jurusan <span className="text-destructive">*</span>
                </label>
                <select
                  name="majorId"
                  defaultValue={editingStudent?.majorId || "major-1"}
                  className="w-full h-10 rounded-xl border bg-card px-2 text-xs"
                >
                  <option value="major-1">RPL</option>
                  <option value="major-2">TJKT</option>
                  <option value="major-3">DKV</option>
                  <option value="major-4">MPLB</option>
                  <option value="major-5">AKL</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl"
              >
                Batal
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="rounded-xl min-w-24 font-semibold"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : editingStudent ? (
                  "Simpan Perubahan"
                ) : (
                  "Tambah Siswa"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Data Siswa?"
        description="Data siswa ini akan dihapus secara permanen dari basis data kesiswaan sekolah."
        confirmText="Hapus Siswa"
        cancelText="Batal"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
