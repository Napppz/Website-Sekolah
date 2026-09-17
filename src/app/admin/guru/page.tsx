"use client"

import * as React from "react"
import { toast } from "sonner"
import Image from "next/image"
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Mail,
  BookOpen,
  Loader2,
  Upload,
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
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingTeacher, setEditingTeacher] = React.useState<TeacherData | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Confirm delete dialog state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Upload state
  const [uploadingPhoto, setUploadingPhoto] = React.useState(false)
  const [photoUrl, setPhotoUrl] = React.useState<string>("")

  const loadTeachers = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/teachers")
      if (res.ok) {
        const data = await res.json()
        setTeachers(data.teachers || [])
      }
    } catch {
      toast.error("Gagal memuat data guru")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadTeachers()
  }, [loadTeachers])

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingPhoto(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", "teachers")

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setPhotoUrl(data.url)
        toast.success("Foto berhasil diunggah!")
      } else {
        toast.error(data.error || "Gagal mengunggah foto")
      }
    } catch {
      toast.error("Terjadi kendala saat upload foto")
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    if (photoUrl) {
      formData.set("photo", photoUrl)
    }

    try {
      if (editingTeacher) {
        formData.append("id", editingTeacher.id)
        const res = await updateTeacher(editingTeacher.id, formData)
        if (res.success) {
          toast.success("Data guru berhasil diperbarui!")
          setIsDialogOpen(false)
          setEditingTeacher(null)
          loadTeachers()
        } else {
          toast.error(res.error || "Gagal memperbarui guru")
        }
      } else {
        const res = await createTeacher(formData)
        if (res.success) {
          toast.success("Guru baru berhasil ditambahkan!")
          setIsDialogOpen(false)
          loadTeachers()
        } else {
          toast.error(res.error || "Gagal menambah guru")
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
      const res = await deleteTeacher(deleteId)
      if (res.success) {
        toast.success("Data guru berhasil dihapus!")
        setDeleteId(null)
        loadTeachers()
      } else {
        toast.error(res.error || "Gagal menghapus data")
      }
    } catch {
      toast.error("Gagal menghapus data")
    } finally {
      setIsDeleting(false)
    }
  }

  // Define Table Columns
  const columns: Column<TeacherData>[] = [
    {
      key: "name",
      header: "Nama & Foto",
      render: (t) => (
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted border shrink-0">
            <Image
              src={
                t.photo ||
                "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"
              }
              alt={t.name}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-foreground text-xs leading-snug truncate">
              {t.name}
            </p>
            <p className="text-[10px] text-muted-foreground font-mono truncate">
              NIP. {t.nip}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "position",
      header: "Jabatan",
      render: (t) => (
        <span className="text-xs font-semibold text-foreground">
          {t.position}
        </span>
      ),
    },
    {
      key: "subject",
      header: "Mata Pelajaran",
      render: (t) => (
        <Badge
          variant="outline"
          className="text-[11px] font-semibold bg-primary/5 text-primary border-primary/20"
        >
          {t.subject}
        </Badge>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (t) => (
        <span className="text-xs text-muted-foreground font-mono">
          {t.email || "-"}
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
            Manajemen Data Guru
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Kelola direktori pengajar, mata pelajaran, dan jabatan struktural sekolah.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTeacher(null)
            setPhotoUrl("")
            setIsDialogOpen(true)
          }}
          size="sm"
          className="rounded-xl font-semibold gap-1.5 h-9"
        >
          <Plus className="h-4 w-4" />
          Tambah Guru Baru
        </Button>
      </div>

      {/* Reusable Data Table */}
      <DataTable<TeacherData>
        data={teachers}
        columns={columns}
        keyExtractor={(t) => t.id}
        searchPlaceholder="Cari nama guru, NIP, atau mata pelajaran..."
        searchKey={(t) => `${t.name} ${t.nip} ${t.subject} ${t.position}`}
        pageSize={10}
        emptyTitle="Belum Ada Data Guru"
        emptyDescription="Mulai tambahkan profil tenaga pendidik untuk ditampilkan pada portal sekolah."
        emptyAction={
          <Button
            onClick={() => {
              setEditingTeacher(null)
              setPhotoUrl("")
              setIsDialogOpen(true)
            }}
            size="sm"
            className="rounded-xl"
          >
            Tambah Guru
          </Button>
        }
        actions={(t) => (
          <div className="flex items-center justify-end gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg hover:bg-muted"
              title="Edit Data"
              onClick={() => {
                setEditingTeacher(t)
                setPhotoUrl(t.photo || "")
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
              onClick={() => setDeleteId(t.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        mobileCardRender={(t, actionButtons) => (
          <div className="rounded-2xl border bg-card p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden bg-muted border shrink-0">
                <Image
                  src={
                    t.photo ||
                    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"
                  }
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-foreground text-sm truncate">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.position}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t">
              <Badge
                variant="outline"
                className="text-[10px] bg-primary/5 text-primary border-primary/20"
              >
                {t.subject}
              </Badge>
              <span className="font-mono text-[10px] text-muted-foreground">
                NIP. {t.nip}
              </span>
            </div>
            <div className="flex justify-end pt-1">{actionButtons}</div>
          </div>
        )}
      />

      {/* Form Modal (Create / Edit) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              {editingTeacher ? "Edit Data Guru" : "Tambah Guru Baru"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  NIP / Identitas Pegawai <span className="text-destructive">*</span>
                </label>
                <Input
                  name="nip"
                  defaultValue={editingTeacher?.nip || ""}
                  required
                  placeholder="19800101..."
                  className="rounded-xl h-10 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Nama & Gelar Lengkap <span className="text-destructive">*</span>
                </label>
                <Input
                  name="name"
                  defaultValue={editingTeacher?.name || ""}
                  required
                  placeholder="Drs. Ahmad, M.Pd."
                  className="rounded-xl h-10 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Jenis Kelamin <span className="text-destructive">*</span>
                </label>
                <select
                  name="gender"
                  defaultValue={editingTeacher?.gender || "L"}
                  className="w-full h-10 rounded-xl border bg-card px-3 text-xs"
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Jabatan / Tugas Tambahan <span className="text-destructive">*</span>
                </label>
                <Input
                  name="position"
                  defaultValue={editingTeacher?.position || "Guru Pengajar"}
                  required
                  placeholder="Waka. Kurikulum / Guru"
                  className="rounded-xl h-10 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Mata Pelajaran yang Diampu <span className="text-destructive">*</span>
              </label>
              <Input
                name="subject"
                defaultValue={editingTeacher?.subject || ""}
                required
                placeholder="Contoh: Rekayasa Perangkat Lunak"
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Email Institusi
                </label>
                <Input
                  name="email"
                  type="email"
                  defaultValue={editingTeacher?.email || ""}
                  placeholder="guru@smkn1digital.sch.id"
                  className="rounded-xl h-10 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Unggah Foto
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploadingPhoto}
                    className="rounded-xl h-10 text-xs file:mr-2 file:text-xs"
                  />
                  {uploadingPhoto && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
                  )}
                </div>
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
                disabled={isSubmitting || uploadingPhoto}
                className="rounded-xl min-w-24 font-semibold"
              >
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

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Data Guru?"
        description="Data profil guru ini akan dihapus dari sistem dan tidak akan tampil lagi di portal direktori publik."
        confirmText="Hapus Guru"
        cancelText="Batal"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
