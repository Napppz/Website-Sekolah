"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Printer,
  FileText,
  ArrowRight,
  ArrowLeft,
  Loader2,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/common/page-header"
import { checkPPDBStatus } from "@/actions/ppdb"
import { toast } from "sonner"

interface ApplicantResult {
  id: string
  registrationNo: string
  fullName: string
  nisn: string
  previousSchool: string
  major?: { name: string; code: string } | null
  status: string
  notes?: string | null
  createdAt: string
}

function StatusContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("no") || ""

  const [query, setQuery] = React.useState(initialQuery)
  const [isLoading, setIsLoading] = React.useState(false)
  const [result, setResult] = React.useState<ApplicantResult | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const handleSearch = React.useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setErrorMessage(null)
    setResult(null)

    try {
      const res = await checkPPDBStatus(searchQuery)
      if (res.success && res.applicant) {
        setResult(res.applicant)
      } else {
        setErrorMessage(res.error || "Data pendaftaran tidak ditemukan.")
      }
    } catch {
      setErrorMessage("Terjadi gangguan koneksi. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery, handleSearch])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const statusConfig: Record<string, { label: string; desc: string; icon: any; color: string }> = {
    PENDING: {
      label: "Menunggu Verifikasi Berkas",
      desc: "Data pendaftaran Anda telah tersimpan di sistem. Panitia PPDB sedang memverifikasi kelengkapan berkas rapor dan dokumen kependudukan Anda.",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    VERIFIED: {
      label: "Berkas Terverifikasi",
      desc: "Selamat! Seluruh dokumen administrasi Anda dinyatakan valid dan lengkap. Silakan cetak kartu bukti pendaftaran dan persiapkan diri untuk tes wawancara minat kejuruan.",
      icon: CheckCircle2,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    ACCEPTED: {
      label: "Selamat! Anda Diterima",
      desc: "Selamat! Anda dinyatakan LULUS seleksi penerimaan peserta didik baru di SMK Negeri 1 Digital Nusantara. Segera lakukan daftar ulang di kampus sesuai jadwal yang ditentukan.",
      icon: GraduationCap,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    REJECTED: {
      label: "Belum Memenuhi Syarat",
      desc: "Mohon maaf, saat ini pendaftaran Anda belum memenuhi kualifikasi kuota atau kelengkapan administrasi pada pilihan program keahlian tersebut.",
      icon: XCircle,
      color: "bg-destructive/10 text-destructive border-destructive/30",
    },
  }

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Cek Hasil & Status"
        title="Status Pendaftaran PPDB Online"
        subtitle="Periksa hasil verifikasi berkas dan cetak kartu bukti pendaftaran resmi Anda."
        breadcrumb={[
          { label: "PPDB", href: "/ppdb" },
          { label: "Cek Status & Cetak Kartu" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Form Pencarian */}
          <Card className="rounded-3xl border bg-card/80 backdrop-blur-xs shadow-md p-6 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="text-sm font-bold text-foreground block">
                Nomor Registrasi atau NISN:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Contoh: PPDB-2026-7613 atau 0089123456"
                    className="pl-10 h-12 rounded-xl text-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-6 rounded-xl font-bold gap-2 shrink-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Memeriksa...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Periksa Status
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Gunakan nomor registrasi yang didapatkan saat selesai mendaftar online.
              </p>
            </form>
          </Card>

          {/* Pesan Error / Tidak Ditemukan */}
          {errorMessage && (
            <Card className="rounded-2xl border-destructive/30 bg-destructive/5 p-6 text-center space-y-2">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
              <p className="font-bold text-foreground">{errorMessage}</p>
              <p className="text-xs text-muted-foreground">
                Jika Anda yakin telah mendaftar, hubungi panitia PPDB melalui saluran kontak resmi sekolah.
              </p>
            </Card>
          )}

          {/* Kartu Hasil Pencarian */}
          {result && (
            <Card className="rounded-3xl border-2 border-primary/20 bg-card shadow-xl overflow-hidden animate-in fade-in-50 duration-300">
              {/* Header Status */}
              <div className="bg-muted/40 p-6 sm:p-8 border-b space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase">
                      Nomor Registrasi
                    </span>
                    <h2 className="text-2xl font-black font-mono text-primary tracking-tight">
                      {result.registrationNo}
                    </h2>
                  </div>
                  {(() => {
                    const status = statusConfig[result.status] || {
                      label: result.status,
                      color: "bg-muted text-muted-foreground border-border",
                    }
                    return (
                      <Badge variant="outline" className={`text-xs font-bold px-3 py-1 rounded-full ${status.color}`}>
                        {status.label}
                      </Badge>
                    )
                  })()}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div>
                    <span className="text-muted-foreground">Nama Pendaftar:</span>
                    <p className="font-bold text-foreground text-sm uppercase">{result.fullName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Asal Sekolah:</span>
                    <p className="font-semibold text-foreground">{result.previousSchool}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Jurusan Dipilih:</span>
                    <p className="font-bold text-primary">
                      {result.major?.name || "Program Keahlian"} ({result.major?.code || "RPL"})
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tanggal Daftar:</span>
                    <p className="font-medium text-foreground">
                      {new Date(result.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Explanation & Actions */}
              <CardContent className="p-6 sm:p-8 space-y-6">
                {(() => {
                  const status = statusConfig[result.status] || {
                    label: result.status,
                    desc: "Status verifikasi dalam proses tinjauan panitia.",
                    icon: Clock,
                  }
                  const Icon = status.icon
                  return (
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-sm text-foreground">{status.label}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{status.desc}</p>
                      </div>
                    </div>
                  )
                })()}

                {/* Catatan Verifikator jika ada */}
                {result.notes && (
                  <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 text-xs space-y-1">
                    <p className="font-bold text-blue-700 dark:text-blue-300">Catatan Panitia PPDB:</p>
                    <p className="text-muted-foreground">{result.notes}</p>
                  </div>
                )}

                {/* Action Buttons: Cetak Kartu PDF */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto font-bold rounded-xl gap-2 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link href={`/ppdb/bukti/${result.registrationNo}`} target="_blank">
                      <Printer className="h-4 w-4" />
                      Cetak Kartu Bukti Pendaftaran (PDF)
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-semibold rounded-xl">
                    <Link href="/ppdb">Informasi Seleksi Lengkap</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PPDBStatusPage() {
  return (
    <React.Suspense
      fallback={
        <div className="py-24 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-xs text-muted-foreground mt-2">Memuat halaman status PPDB...</p>
        </div>
      }
    >
      <StatusContent />
    </React.Suspense>
  )
}
