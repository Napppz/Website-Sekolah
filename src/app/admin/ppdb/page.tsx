"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  UserCheck,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  FileText,
  ExternalLink,
  Eye,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DataTable, Column } from "@/components/common/data-table"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { updatePPDBStatus, deletePPDB } from "@/actions/ppdb"

interface PPDBApplicant {
  id: string
  registrationNo: string
  fullName: string
  nik: string
  nisn: string
  previousSchool: string
  phone: string
  email: string
  major?: { name: string; code: string }
  status: string
  documentUrl?: string | null
  notes?: string | null
  createdAt: string
}

export default function AdminPPDBPage() {
  const [applicants, setApplicants] = React.useState<PPDBApplicant[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [statusFilter, setStatusFilter] = React.useState("ALL")
  const [selectedApplicant, setSelectedApplicant] = React.useState<PPDBApplicant | null>(null)
  const [newStatus, setNewStatus] = React.useState("VERIFIED")
  const [notes, setNotes] = React.useState("")
  const [isUpdating, setIsUpdating] = React.useState(false)

  // Confirm delete state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const loadApplicants = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/ppdb", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setApplicants(data.applicants || data.registrations || [])
      } else {
        toast.error("Gagal memuat data PPDB")
      }
    } catch {
      toast.error("Gagal memuat data PPDB")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadApplicants()
  }, [loadApplicants])

  // Filtered by status
  const filteredApplicants = React.useMemo(() => {
    if (statusFilter === "ALL") return applicants
    return applicants.filter((a) => a.status === statusFilter)
  }, [applicants, statusFilter])

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedApplicant) return

    setIsUpdating(true)
    const formData = new FormData()
    formData.append("id", selectedApplicant.id)
    formData.append("status", newStatus)
    formData.append("notes", notes)

    try {
      const res = await updatePPDBStatus(selectedApplicant.id, newStatus, notes)
      if (res.success) {
        toast.success("Status verifikasi berhasil diperbarui!")
        setSelectedApplicant(null)
        loadApplicants()
      } else {
        toast.error(res.error || "Gagal update status")
      }
    } catch {
      toast.error("Terjadi kesalahan sistem")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const res = await deletePPDB(deleteId)
      if (res.success) {
        toast.success("Data pendaftar berhasil dihapus!")
        setDeleteId(null)
        loadApplicants()
      } else {
        toast.error(res.error || "Gagal menghapus data")
      }
    } catch {
      toast.error("Gagal menghapus data")
    } finally {
      setIsDeleting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      PENDING: {
        label: "Menunggu",
        className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      },
      VERIFIED: {
        label: "Terverifikasi",
        className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
      },
      ACCEPTED: {
        label: "Diterima",
        className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      },
      REJECTED: {
        label: "Ditolak",
        className: "bg-destructive/10 text-destructive border-destructive/30",
      },
    }

    const item = config[status] || {
      label: status,
      className: "bg-muted text-muted-foreground border-border",
    }

    return (
      <Badge variant="outline" className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${item.className}`}>
        {item.label}
      </Badge>
    )
  }

  // Define Table Columns
  const columns: Column<PPDBApplicant>[] = [
    {
      key: "registrationNo",
      header: "No. Registrasi",
      render: (a) => (
        <span className="font-mono text-xs font-bold text-primary">
          {a.registrationNo}
        </span>
      ),
    },
    {
      key: "fullName",
      header: "Nama Calon Siswa",
      render: (a) => (
        <div>
          <p className="font-bold text-xs text-foreground leading-snug">
            {a.fullName}
          </p>
          <p className="text-[10px] text-muted-foreground">
            Asal: {a.previousSchool}
          </p>
        </div>
      ),
    },
    {
      key: "major",
      header: "Pilihan Jurusan",
      render: (a) => (
        <Badge
          variant="outline"
          className="text-[10px] font-semibold bg-primary/5 text-primary border-primary/20"
        >
          {a.major?.code || "RPL"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status Seleksi",
      render: (a) => getStatusBadge(a.status),
    },
    {
      key: "date",
      header: "Tanggal Daftar",
      render: (a) => (
        <span className="text-xs text-muted-foreground">
          {new Date(a.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
          })}
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
            Verifikasi & Seleksi PPDB
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Kelola berkas calon siswa baru, validasi dokumen, dan tentukan hasil seleksi.
          </p>
        </div>
      </div>

      {/* Reusable Data Table with Status Filter */}
      <DataTable<PPDBApplicant>
        data={filteredApplicants}
        columns={columns}
        keyExtractor={(a) => a.id}
        searchPlaceholder="Cari nomor pendaftaran, nama, atau asal sekolah..."
        searchKey={(a) => `${a.registrationNo} ${a.fullName} ${a.previousSchool}`}
        pageSize={10}
        emptyTitle="Belum Ada Pendaftar"
        emptyDescription="Tidak ada data calon siswa yang cocok dengan filter yang dipilih."
        filterSlot={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border bg-card px-3 text-xs font-semibold text-foreground cursor-pointer"
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">Menunggu Verifikasi</option>
            <option value="VERIFIED">Terverifikasi</option>
            <option value="ACCEPTED">Diterima</option>
            <option value="REJECTED">Ditolak</option>
          </select>
        }
        actions={(a) => (
          <div className="flex items-center justify-end gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-2.5 text-xs font-semibold rounded-lg gap-1"
              onClick={() => {
                setSelectedApplicant(a)
                setNewStatus(a.status)
                setNotes(a.notes || "")
              }}
            >
              <Eye className="h-3.5 w-3.5" />
              Verifikasi
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
              title="Hapus Pendaftar"
              onClick={() => setDeleteId(a.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        mobileCardRender={(a, actionButtons) => (
          <div className="rounded-2xl border bg-card p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-primary">
                {a.registrationNo}
              </span>
              {getStatusBadge(a.status)}
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">{a.fullName}</p>
              <p className="text-xs text-muted-foreground">
                Asal: {a.previousSchool} • Pilihan: {a.major?.name || "Program Keahlian"}
              </p>
            </div>
            <div className="flex justify-end pt-2 border-t">{actionButtons}</div>
          </div>
        )}
      />

      {/* Detail & Verification Dialog */}
      <Dialog
        open={Boolean(selectedApplicant)}
        onOpenChange={(open) => !open && setSelectedApplicant(null)}
      >
        <DialogContent className="sm:max-w-lg rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              Verifikasi Berkas Calon Siswa
            </DialogTitle>
          </DialogHeader>

          {selectedApplicant && (
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-2">
              <div className="rounded-xl border bg-muted/30 p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">No. Registrasi:</span>
                  <span className="font-mono font-bold text-primary">
                    {selectedApplicant.registrationNo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nama Lengkap:</span>
                  <span className="font-semibold text-foreground">
                    {selectedApplicant.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NISN / NIK:</span>
                  <span className="font-mono text-foreground">
                    {selectedApplicant.nisn} / {selectedApplicant.nik}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pilihan Jurusan:</span>
                  <span className="font-semibold text-foreground">
                    {selectedApplicant.major?.name || "RPL"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kontak (HP/Email):</span>
                  <span className="text-foreground">
                    {selectedApplicant.phone} • {selectedApplicant.email}
                  </span>
                </div>
                {selectedApplicant.documentUrl && (
                  <div className="pt-2 border-t flex justify-end">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 gap-1"
                    >
                      <a
                        href={selectedApplicant.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Buka Dokumen Unggahan
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Ubah Status Verifikasi Seleksi
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full h-10 rounded-xl border bg-card px-3 text-xs font-semibold"
                >
                  <option value="PENDING">Menunggu Verifikasi</option>
                  <option value="VERIFIED">Terverifikasi (Lolos Berkas)</option>
                  <option value="ACCEPTED">Diterima Sebagai Siswa Baru</option>
                  <option value="REJECTED">Ditolak / Berkas Tidak Sesuai</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Catatan Tim Panitia Seleksi
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan hasil verifikasi berkas atau jadwal tes wawancara..."
                  rows={3}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedApplicant(null)}
                  className="rounded-xl"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isUpdating}
                  className="rounded-xl min-w-24 font-semibold"
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Simpan Status"
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Data Pendaftaran PPDB?"
        description="Data pendaftaran calon siswa ini akan dihapus secara permanen dari sistem seleksi."
        confirmText="Hapus Data"
        cancelText="Batal"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
