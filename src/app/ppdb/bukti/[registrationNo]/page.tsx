import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { PrintButton } from "./print-button"
import { ArrowLeft, ShieldCheck, CheckCircle2, QrCode } from "lucide-react"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ registrationNo: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { registrationNo } = await params
  return {
    title: `Kartu Bukti Pendaftaran - ${registrationNo} | SMK Negeri 1 Digital Nusantara`,
    description: `Kartu bukti pendaftaran resmi PPDB Online SMK Negeri 1 Digital Nusantara dengan nomor ${registrationNo}.`,
  }
}

export default async function BuktiPendaftaranPage({ params }: Props) {
  const { registrationNo } = await params

  // Cari data pendaftar dari PostgreSQL
  const applicant = await prisma.pPDBRegistration.findFirst({
    where: {
      OR: [
        { registrationNo: { equals: registrationNo, mode: "insensitive" } },
        { id: registrationNo },
      ],
    },
    include: {
      major: true,
    },
  })

  if (!applicant) {
    notFound()
  }

  // Ambil profil sekolah untuk Kop Surat
  const schoolProfile = await prisma.schoolProfile.findFirst().catch(() => null)

  const statusMap: Record<string, { label: string; border: string; bg: string; text: string }> = {
    PENDING: {
      label: "TERDAFTAR (MENUNGGU VERIFIKASI)",
      border: "border-amber-500",
      bg: "bg-amber-50",
      text: "text-amber-800",
    },
    VERIFIED: {
      label: "BERKAS TERVERIFIKASI",
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-800",
    },
    ACCEPTED: {
      label: "LULUS / DITERIMA",
      border: "border-emerald-600",
      bg: "bg-emerald-50",
      text: "text-emerald-800",
    },
    REJECTED: {
      label: "TIDAK DITERIMA",
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-800",
    },
  }

  const currentStatus = statusMap[applicant.status] || {
    label: applicant.status,
    border: "border-slate-500",
    bg: "bg-slate-50",
    text: "text-slate-800",
  }

  const formattedBirthDate = new Date(applicant.birthDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const formattedRegDate = new Date(applicant.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 print:p-0 print:bg-white text-slate-900 font-sans">
      {/* Action Bar (Layar Saja - Disembunyikan saat cetak) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <Link
          href="/ppdb/status"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Portal PPDB
        </Link>
        <div className="flex items-center gap-3">
          <PrintButton />
        </div>
      </div>

      {/* Lembar Dokumen Kartu Pendaftaran Resmi A4 */}
      <div
        id="printable-card"
        className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl sm:shadow-lg border border-slate-200 print:border-0 print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-none text-[13px] leading-relaxed"
      >
        {/* KOP SURAT RESMI SEKOLAH */}
        <div className="flex items-center gap-5 border-b-2 border-slate-900 pb-4 mb-5">
          {/* Logo DKI / Lambang Pendidikan */}
          <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-xl bg-slate-900 text-white font-black text-2xl tracking-tighter">
            SMK
          </div>

          <div className="flex-1 text-center space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold tracking-widest text-slate-700 uppercase">
              Pemerintah Provinsi Daerah Khusus Ibukota Jakarta
            </h4>
            <h3 className="text-sm sm:text-base font-bold tracking-wider text-slate-800 uppercase">
              Dinas Pendidikan dan Kebudayaan
            </h3>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
              {schoolProfile?.name || "SMK Negeri 1 Digital Nusantara"}
            </h1>
            <p className="text-[11px] text-slate-600 font-medium">
              NPSN: {schoolProfile?.npsn || "20109988"} • Akreditasi: {schoolProfile?.accreditation || "A (Unggul)"} • SK Pendirian: No. 421.5/1998
            </p>
            <p className="text-[10px] text-slate-500">
              {schoolProfile?.address || "Jl. Pendidikan Generasi No. 45, Kebayoran Baru, Jakarta Selatan 12150"} • Telp: {schoolProfile?.phone || "(021) 7890-1234"} • Website: smkn1digital.sch.id
            </p>
          </div>

          {/* Logo Tut Wuri Handayani / Lambang Vokasi */}
          <div className="w-20 h-20 shrink-0 hidden sm:flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-700">
            <div className="text-center font-bold text-[10px] uppercase">
              VOKASI<br />UNGGUL
            </div>
          </div>
        </div>

        {/* GARIS GANDA KOP */}
        <div className="border-b border-slate-400 -mt-3.5 mb-6"></div>

        {/* JUDUL KARTU */}
        <div className="text-center mb-6 space-y-1">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wide text-slate-900">
            KARTU TANDA BUKTI PENDAFTARAN PPDB ONLINE
          </h2>
          <p className="text-xs font-semibold text-slate-600">
            TAHUN AJARAN 2026 / 2027 • JALUR PENERIMAAN RESMI
          </p>
        </div>

        {/* BOX NOMOR PENDAFTARAN & STATUS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="sm:col-span-2 border border-slate-300 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Nomor Registrasi Pendaftaran:
              </p>
              <p className="text-2xl font-black font-mono tracking-wider text-slate-900 mt-1">
                {applicant.registrationNo}
              </p>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Waktu Pendaftaran: <span className="font-semibold text-slate-700">{formattedRegDate} WIB</span>
            </p>
          </div>

          <div className={`border-2 ${currentStatus.border} ${currentStatus.bg} rounded-xl p-4 flex flex-col items-center justify-center text-center`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Status Berkas Saat Ini
            </p>
            <p className={`text-xs font-black tracking-wide ${currentStatus.text} leading-snug`}>
              {currentStatus.label}
            </p>
            <span className="text-[10px] text-slate-500 mt-1 font-mono">
              Verifikasi Sistem
            </span>
          </div>
        </div>

        {/* DATA UTAMA CALON PESERTA DIDIK & FOTO 3X4 */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          {/* Box Foto 3x4 & QR Code */}
          <div className="w-full sm:w-44 shrink-0 flex flex-col items-center gap-3">
            <div className="w-36 h-48 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <span className="text-xs font-bold text-slate-600">PAS FOTO</span>
              <span className="text-[10px] text-slate-400 mt-1">3 x 4 cm</span>
              <span className="text-[9px] text-slate-400 mt-0.5">(Latar Belakang Merah)</span>
            </div>

            {/* QR Code Verifikasi Berkas */}
            <div className="w-36 border border-slate-200 rounded-xl p-2.5 bg-white text-center shadow-2xs">
              <div className="w-24 h-24 mx-auto bg-slate-900 text-white rounded-lg flex items-center justify-center p-2 mb-1">
                {/* Visual SVG QR Representation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                  <rect x="10" y="10" width="15" height="15" fill="#0f172a" />
                  <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                  <rect x="75" y="10" width="15" height="15" fill="#0f172a" />
                  <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                  <rect x="10" y="75" width="15" height="15" fill="#0f172a" />
                  <rect x="40" y="10" width="10" height="20" fill="currentColor" />
                  <rect x="10" y="40" width="20" height="10" fill="currentColor" />
                  <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                  <rect x="70" y="40" width="15" height="15" fill="currentColor" />
                  <rect x="40" y="70" width="15" height="15" fill="currentColor" />
                  <rect x="70" y="70" width="25" height="25" fill="currentColor" />
                  <rect x="75" y="75" width="15" height="15" fill="#0f172a" />
                </svg>
              </div>
              <p className="text-[9px] font-bold text-slate-600 leading-tight">
                Scan Verifikasi Keabsahan
              </p>
              <p className="text-[8px] font-mono text-slate-400 mt-0.5">
                {applicant.registrationNo}
              </p>
            </div>
          </div>

          {/* Tabel Biodata Lengkap */}
          <div className="flex-1 border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-800">
              Biodata Calon Peserta Didik
            </div>
            <table className="w-full text-xs divide-y divide-slate-200">
              <tbody>
                <tr className="divide-x divide-slate-200">
                  <td className="w-1/3 px-3.5 py-2 font-semibold text-slate-600 bg-slate-50/50">
                    Nama Lengkap
                  </td>
                  <td className="px-3.5 py-2 font-bold text-slate-900 uppercase">
                    {applicant.fullName}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="px-3.5 py-2 font-semibold text-slate-600 bg-slate-50/50">
                    NISN / NIK
                  </td>
                  <td className="px-3.5 py-2 font-mono text-slate-800 font-medium">
                    {applicant.nisn} / {applicant.nik}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="px-3.5 py-2 font-semibold text-slate-600 bg-slate-50/50">
                    Tempat, Tanggal Lahir
                  </td>
                  <td className="px-3.5 py-2 text-slate-800 font-medium">
                    {applicant.birthPlace}, {formattedBirthDate}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="px-3.5 py-2 font-semibold text-slate-600 bg-slate-50/50">
                    Jenis Kelamin
                  </td>
                  <td className="px-3.5 py-2 text-slate-800 font-medium">
                    {applicant.gender === "L" ? "Laki-laki (L)" : "Perempuan (P)"}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="px-3.5 py-2 font-semibold text-slate-600 bg-slate-50/50">
                    Asal Sekolah (SMP/MTs)
                  </td>
                  <td className="px-3.5 py-2 text-slate-900 font-semibold">
                    {applicant.previousSchool}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200 bg-primary/5">
                  <td className="px-3.5 py-2 font-bold text-primary">
                    Pilihan Program Keahlian
                  </td>
                  <td className="px-3.5 py-2 font-extrabold text-primary text-sm">
                    {applicant.major?.name || "Rekayasa Perangkat Lunak"} ({applicant.major?.code || "RPL"})
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="px-3.5 py-2 font-semibold text-slate-600 bg-slate-50/50">
                    No. Handphone / WhatsApp
                  </td>
                  <td className="px-3.5 py-2 font-mono text-slate-800 font-medium">
                    {applicant.phone}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="px-3.5 py-2 font-semibold text-slate-600 bg-slate-50/50">
                    Alamat Email
                  </td>
                  <td className="px-3.5 py-2 text-slate-800 font-medium">
                    {applicant.email}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200">
                  <td className="px-3.5 py-2 font-semibold text-slate-600 bg-slate-50/50">
                    Alamat Domisili
                  </td>
                  <td className="px-3.5 py-2 text-slate-800">
                    {applicant.address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* KETENTUAN DAN PERSYARATAN BERKAS FISIK */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 mb-8 text-[11px] space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wide text-xs">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Ketentuan Verifikasi Berkas Fisik & Daftar Ulang:
          </div>
          <ol className="list-decimal pl-5 space-y-1 text-slate-600">
            <li>
              Kartu bukti pendaftaran ini <strong>wajib dicetak</strong> dan dibawa saat verifikasi berkas fisik atau tes seleksi minat dan bakat kejuruan.
            </li>
            <li>
              Membawa dokumen asli & fotokopi legalisir: <strong>Surat Keterangan Lulus (SKL) / Ijazah SMP</strong>, <strong>Rapor semester 1-5</strong>, <strong>Kartu Keluarga</strong>, dan <strong>Akta Kelahiran</strong>.
            </li>
            <li>
              Bagi pendaftar jalur prestasi, wajib membawa <strong>Piagam / Sertifikat Kejuaraan Asli</strong> yang telah dicantumkan.
            </li>
            <li>
              Informasi jadwal tes dan pengumuman akhir resmi hanya dipublikasikan melalui website sekolah: <strong>smkn1digital.sch.id</strong>.
            </li>
          </ol>
        </div>

        {/* TANDA TANGAN & STEMPEL VERIFIKASI */}
        <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200 text-xs">
          <div className="text-center space-y-16">
            <p className="font-semibold text-slate-600">
              Calon Peserta Didik / Orang Tua Wali,
            </p>
            <div>
              <p className="font-bold text-slate-900 border-b border-slate-400 pb-1 max-w-[200px] mx-auto uppercase">
                ( {applicant.fullName} )
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Tanda tangan & Nama Jelas</p>
            </div>
          </div>

          <div className="text-center space-y-16 relative">
            <div>
              <p className="text-slate-600">
                Jakarta, {formattedRegDate.split(" pukul")[0]}
              </p>
              <p className="font-semibold text-slate-800">
                Panitia PPDB Online SMKN 1 Digital,
              </p>
            </div>

            {/* Stempel Cap Digital Panitia */}
            <div className="absolute top-8 right-1/4 -rotate-12 border-2 border-primary/50 text-primary px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider opacity-80 pointer-events-none">
              TERDAFTAR & SAH<br />PANITIA PPDB 2026
            </div>

            <div>
              <p className="font-bold text-slate-900 border-b border-slate-400 pb-1 max-w-[200px] mx-auto">
                ( Drs. H. Bambang Sudirman, M.M. )
              </p>
              <p className="text-[10px] text-slate-500 mt-1">NIP. 19740512 199903 1 004</p>
            </div>
          </div>
        </div>

        {/* FOOTER KARTU */}
        <div className="mt-8 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Dicetak dari Sistem Informasi PPDB Resmi SMK Negeri 1 Digital Nusantara</span>
          <span>ID: {applicant.id}</span>
        </div>
      </div>
    </div>
  )
}
