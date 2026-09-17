"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/common/page-header"
import { registerPPDB } from "@/actions/ppdb"

const PPDBFormSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nik: z.string().length(16, "NIK harus tepat 16 digit"),
  nisn: z.string().length(10, "NISN harus tepat 10 digit"),
  birthPlace: z.string().min(2, "Tempat lahir wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  gender: z.enum(["L", "P"], { message: "Pilih jenis kelamin" }),
  address: z.string().min(10, "Alamat lengkap minimal 10 karakter"),
  previousSchool: z.string().min(3, "Asal sekolah wajib diisi"),
  phone: z.string().min(10, "Nomor HP minimal 10 digit"),
  email: z.string().email("Format email tidak valid"),
  majorId: z.string().min(1, "Pilih program keahlian / jurusan"),
})

type PPDBFormData = z.infer<typeof PPDBFormSchema>

const MAJORS_OPTION = [
  { id: "major-1", name: "Rekayasa Perangkat Lunak (RPL)" },
  { id: "major-2", name: "Teknik Jaringan Komputer & Telekomunikasi (TJKT)" },
  { id: "major-3", name: "Desain Komunikasi Visual (DKV)" },
  { id: "major-4", name: "Manajemen Perkantoran & Layanan Bisnis (MPLB)" },
  { id: "major-5", name: "Akuntansi & Keuangan Lembaga (AKL)" },
]

export default function PPDBDaftarPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [successRegNo, setSuccessRegNo] = React.useState<string | null>(null)
  const [uploadingFile, setUploadingFile] = React.useState(false)
  const [uploadedDocUrl, setUploadedDocUrl] = React.useState<string | null>(null)
  const [majorsList, setMajorsList] = React.useState(MAJORS_OPTION)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PPDBFormData>({
    resolver: zodResolver(PPDBFormSchema),
    defaultValues: {
      gender: "L",
      majorId: "major-1",
    },
  })

  React.useEffect(() => {
    async function loadMajors() {
      try {
        const res = await fetch("/api/majors")
        const json = await res.json()
        if (json.majors && json.majors.length > 0) {
          const list = json.majors.map((m: any) => ({
            id: m.id,
            name: `${m.name} (${m.code})`,
          }))
          setMajorsList(list)
          if (list[0]?.id) {
            setValue("majorId", list[0].id)
          }
        }
      } catch {
        // fallback
      }
    }
    loadMajors()
  }, [setValue])

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingFile(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", "ppdb_docs")

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setUploadedDocUrl(data.url)
        toast.success("Dokumen berhasil diunggah!")
      } else {
        toast.error(data.error || "Gagal mengunggah file")
      }
    } catch {
      toast.error("Terjadi kendala saat upload")
    } finally {
      setUploadingFile(false)
    }
  }

  const onSubmit = async (data: PPDBFormData) => {
    setIsSubmitting(true)
    const formData = new FormData()
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
    if (uploadedDocUrl) {
      formData.append("documentUrl", uploadedDocUrl)
    }

    try {
      const res = await registerPPDB(formData)
      if (res.success && res.registrationNo) {
        setSuccessRegNo(res.registrationNo)
        toast.success("Pendaftaran berhasil dikirim!")
        reset()
      } else {
        toast.error(res.error || "Gagal memproses pendaftaran")
      }
    } catch {
      toast.error("Terjadi kesalahan sistem")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageHeader
        badge="Formulir Pendaftaran"
        title="Pendaftaran Siswa Baru (PPDB Online)"
        subtitle="Lengkapi data diri calon peserta didik secara akurat sesuai kartu keluarga dan dokumen resmi rapor."
        breadcrumb={[
          { label: "PPDB", href: "/ppdb" },
          { label: "Formulir Pendaftaran" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-8">

        {/* Success Confirmation Card */}
        {successRegNo ? (
          <Card className="rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/5 p-8 md:p-12 text-center space-y-6 shadow-xl">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Pendaftaran Berhasil Terkirim!
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Terima kasih telah mendaftar di SMK Negeri 1 Digital Nusantara. Simpan nomor pendaftaran Anda untuk cek hasil seleksi berkala.
              </p>
            </div>

            <div className="bg-card border-2 border-dashed border-primary/40 rounded-2xl p-6 max-w-sm mx-auto shadow-xs">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Nomor Registrasi Anda
              </p>
              <p className="text-2xl sm:text-3xl font-black font-mono text-primary mt-1">
                {successRegNo}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button asChild onClick={() => setSuccessRegNo(null)}>
                <Link href="/">Kembali ke Beranda</Link>
              </Button>
              <Button variant="outline" onClick={() => setSuccessRegNo(null)}>
                Daftarkan Siswa Lain
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="rounded-3xl border bg-card/80 backdrop-blur-xs shadow-md">
            <CardContent className="p-6 sm:p-10 space-y-8">
              <div className="space-y-2 text-left">
                <Badge variant="outline" className="text-xs">
                  Formulir Daring
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  Pendaftaran Peserta Didik Baru 2026/2027
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Lengkapi seluruh data berikut dengan benar dan valid sesuai dokumen Kartu Keluarga dan Rapor.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 1. Data Pribadi Siswa */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-primary uppercase tracking-wider border-b pb-2">
                    1. Data Pribadi Calon Siswa
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">
                      Nama Lengkap (Sesuai Ijazah/Akta) *
                    </label>
                    <Input
                      {...register("fullName")}
                      placeholder="Contoh: Raditya Pratama"
                      className="rounded-xl"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-destructive">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">
                        NIK (Nomor Induk Kependudukan - 16 Digit) *
                      </label>
                      <Input
                        {...register("nik")}
                        maxLength={16}
                        placeholder="317401xxxxxxxxxx"
                        className="rounded-xl font-mono"
                      />
                      {errors.nik && (
                        <p className="text-xs text-destructive">{errors.nik.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">
                        NISN (Nomor Induk Siswa Nasional - 10 Digit) *
                      </label>
                      <Input
                        {...register("nisn")}
                        maxLength={10}
                        placeholder="00xxxxxxxx"
                        className="rounded-xl font-mono"
                      />
                      {errors.nisn && (
                        <p className="text-xs text-destructive">{errors.nisn.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-foreground">
                        Tempat Lahir *
                      </label>
                      <Input
                        {...register("birthPlace")}
                        placeholder="Kota kelahiran"
                        className="rounded-xl"
                      />
                      {errors.birthPlace && (
                        <p className="text-xs text-destructive">{errors.birthPlace.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-foreground">
                        Tanggal Lahir *
                      </label>
                      <Input
                        type="date"
                        {...register("birthDate")}
                        className="rounded-xl"
                      />
                      {errors.birthDate && (
                        <p className="text-xs text-destructive">{errors.birthDate.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-foreground">
                        Jenis Kelamin *
                      </label>
                      <select
                        {...register("gender")}
                        className="w-full h-9 rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">
                      Alamat Tempat Tinggal Lengkap *
                    </label>
                    <Textarea
                      {...register("address")}
                      placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                      rows={3}
                      className="rounded-xl"
                    />
                    {errors.address && (
                      <p className="text-xs text-destructive">{errors.address.message}</p>
                    )}
                  </div>
                </div>

                {/* 2. Asal Sekolah & Kontak */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-bold text-sm text-primary uppercase tracking-wider border-b pb-2">
                    2. Asal Sekolah & Kontak Aktif
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">
                      Asal Sekolah (SMP / MTs) *
                    </label>
                    <Input
                      {...register("previousSchool")}
                      placeholder="Contoh: SMP Negeri 115 Jakarta"
                      className="rounded-xl"
                    />
                    {errors.previousSchool && (
                      <p className="text-xs text-destructive">{errors.previousSchool.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">
                        Nomor HP / WhatsApp Aktif *
                      </label>
                      <Input
                        {...register("phone")}
                        placeholder="08xxxxxxxxxx"
                        className="rounded-xl font-mono"
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">
                        Alamat Email Aktif *
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        placeholder="nama@gmail.com"
                        className="rounded-xl"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Pilihan Program Keahlian */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-bold text-sm text-primary uppercase tracking-wider border-b pb-2">
                    3. Pilihan Program Keahlian (Jurusan)
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">
                      Pilihan Jurusan Utama *
                    </label>
                    <select
                      {...register("majorId")}
                      className="w-full h-10 rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {majorsList.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Dokumen Pendukung */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-bold text-sm text-primary uppercase tracking-wider border-b pb-2">
                    4. Berkas Persyaratan (Opsional Saat Mendaftar)
                  </h3>

                  <div className="rounded-2xl border-2 border-dashed p-6 text-center space-y-3 bg-muted/20">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Unggah Scan Dokumen Gabungan (PDF / JPG)
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Scan KK, Rapor, atau Piagam Prestasi (Maksimal 10MB)
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={uploadingFile}
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        {uploadingFile ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Mengunggah...
                          </>
                        ) : uploadedDocUrl ? (
                          "Ganti Dokumen"
                        ) : (
                          "Pilih Berkas"
                        )}
                      </Button>
                    </div>

                    {uploadedDocUrl && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ Berkas berhasil diunggah: {uploadedDocUrl}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-xl text-base font-bold shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Memproses Pendaftaran...
                      </>
                    ) : (
                      <>
                        Kirim Formulir Pendaftaran PPDB
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </div>
  )
}
