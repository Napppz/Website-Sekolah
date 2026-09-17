"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  UserCheck,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Trash2,
  Phone,
  Mail,
  Loader2,
  ExternalLink,
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
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("ALL")
  const [selectedApplicant, setSelectedApplicant] = React.useState<PPDBApplicant | null>(null)
  const [newStatus, setNewStatus] = React.useState("VERIFIED")
  const [notes, setNotes] = React.useState("")
  const [isUpdating, setIsUpdating] = React.useState(false)

  const loadApplicants = async () => {
    try {
      const res = await fetch("/api/ppdb")
      if (res.ok) {
        const data = await res.json()
        setApplicants(data.applicants || [])
      }
    } catch {
      setApplicants([
        {
          id: "p-1",
          registrationNo: "PPDB-2026-0001",
          fullName: "Muhammad Rizky Pratama",
          nik: "3174011505080001",
          nisn: "0089123456",
          previousSchool: "SMP Negeri 115 Jakarta",
          phone: "081298765432",
          email: "rizky.pratama@gmail.com",
          major: { name: "Rekayasa Perangkat Lunak", code: "RPL" },
          status: "VERIFIED",
          documentUrl: "/uploads/dokumen.pdf",
          notes: "Berkas lengkap dan nilai rapor rata-rata 88,5.",
          createdAt: new Date().toISOString(),
        },
        {
          id: "p-2",
          registrationNo: "PPDB-2026-0002",
          fullName: "Annisa Syifa Rahmadani",
          nik: "3174025208090003",
          nisn: "0091234567",
          previousSchool: "SMP Negeri 19 Jakarta",
          phone: "081387654321",
          email: "annisa.syifa@gmail.com",
          major: { name: "Desain Komunikasi Visual", code: "DKV" },
          status: "ACCEPTED",
          documentUrl: null,
          notes: "Lolos jalur prestasi desain grafis.",
          createdAt: new Date().toISOString(),
        },
      ])
    }
  }

  React.useEffect(() => {
    loadApplicants()
  }, [])

  const handleUpdateStatus = async () => {
    if (!selectedApplicant) return
    setIsUpdating(true)

    try {
      const res = await updatePPDBStatus(selectedApplicant.id, newStatus, notes)
      if (res.success) {
        toast.success("Status pendaftar berhasil diperbarui!")
        setApplicants((prev) =>
          prev.map((a) =>
            a.id === selectedApplicant.id ? { ...a, status: newStatus, notes } : a
          )
        )
        setSelectedApplicant(null)
      } else {
        toast.error(res.error || "Gagal memperbarui status")
      }
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Hapus data pendaftaran ini?")) {
      const res = await deletePPDB(id)
      if (res.success) {
        toast.success("Data berhasil dihapus")
        setApplicants((prev) => prev.filter((a) => a.id !== id))
      } else {
        toast.error(res.error || "Gagal menghapus")
      }
    }
  }

  const filtered = applicants.filter((a) => {
    const matchSearch =
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
      a.nisn.includes(search)
    const matchStatus = statusFilter === "ALL" || a.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Verifikasi Pendaftaran PPDB
          </h1>
          <p className="text-xs text-muted-foreground">
            Periksa berkas pendaftar, validasi kelulusan, dan kelola status seleksi.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama, No. Reg, atau NISN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl h-9 text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {["ALL", "PENDING", "VERIFIED", "ACCEPTED", "REJECTED"].map((st) => (
            <Button
              key={st}
              size="sm"
              variant={statusFilter === st ? "default" : "outline"}
              onClick={() => setStatusFilter(st)}
              className="text-xs rounded-xl h-8"
            >
              {st === "ALL" ? "Semua" : st}
            </Button>
          ))}
        </div>
      </div>

      {/* Applicants Table */}
      <Card className="rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>No. Registrasi</TableHead>
              <TableHead>Nama Calon Siswa</TableHead>
              <TableHead>Asal Sekolah</TableHead>
              <TableHead>Jurusan Pilihan</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-xs text-muted-foreground">
                  Tidak ada pendaftar ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((a) => (
                <TableRow key={a.id} className="text-xs">
                  <TableCell className="font-mono font-bold text-primary">
                    {a.registrationNo}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">{a.fullName}</p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        NISN: {a.nisn}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{a.previousSchool}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {a.major?.code || "RPL"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5 text-muted-foreground text-[11px]">
                      <p>{a.phone}</p>
                      <p className="truncate max-w-[150px]">{a.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        a.status === "ACCEPTED"
                          ? "default"
                          : a.status === "VERIFIED"
                          ? "secondary"
                          : a.status === "REJECTED"
                          ? "destructive"
                          : "outline"
                      }
                      className="text-[10px]"
                    >
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs rounded-lg"
                        onClick={() => {
                          setSelectedApplicant(a)
                          setNewStatus(a.status)
                          setNotes(a.notes || "")
                        }}
                      >
                        Verifikasi
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDelete(a.id)}
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

      {/* Verification Dialog */}
      <Dialog
        open={!!selectedApplicant}
        onOpenChange={(open) => !open && setSelectedApplicant(null)}
      >
        <DialogContent className="max-w-md">
          {selectedApplicant && (
            <div className="space-y-4 pt-2">
              <DialogHeader>
                <DialogTitle>Verifikasi Berkas Pendaftar</DialogTitle>
              </DialogHeader>

              <div className="space-y-2 text-xs bg-muted/40 p-3.5 rounded-xl border">
                <p>
                  <strong>No. Registrasi:</strong> {selectedApplicant.registrationNo}
                </p>
                <p>
                  <strong>Nama Lengkap:</strong> {selectedApplicant.fullName}
                </p>
                <p>
                  <strong>Pilihan Jurusan:</strong> {selectedApplicant.major?.name || "RPL"}
                </p>
                {selectedApplicant.documentUrl ? (
                  <p className="pt-1">
                    <a
                      href={selectedApplicant.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Buka Dokumen Berkas Terlampir
                    </a>
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    Pendaftar belum melampirkan berkas dokumen digital.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold">Ubah Status Seleksi</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full h-9 rounded-xl border bg-transparent px-3 text-xs"
                >
                  <option value="PENDING">PENDING (Menunggu Berkas)</option>
                  <option value="VERIFIED">VERIFIED (Berkas Terverifikasi)</option>
                  <option value="ACCEPTED">ACCEPTED (Diterima / Lolos Seleksi)</option>
                  <option value="REJECTED">REJECTED (Ditolak / Tidak Memenuhi Syarat)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold">Catatan Panitia PPDB</label>
                <Input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Rapor terverifikasi, nilai matematika 90"
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedApplicant(null)}
                >
                  Batal
                </Button>
                <Button
                  size="sm"
                  onClick={handleUpdateStatus}
                  disabled={isUpdating}
                >
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan Status"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
