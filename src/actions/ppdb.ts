"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { createNotification } from "@/actions/notifications"

const PPDBRegisterSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nik: z.string().length(16, "NIK harus tepat 16 digit"),
  nisn: z.string().length(10, "NISN harus tepat 10 digit"),
  birthPlace: z.string().min(2, "Tempat lahir wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  gender: z.enum(["L", "P"], { message: "Pilih jenis kelamin" }),
  address: z.string().min(10, "Alamat lengkap minimal 10 karakter"),
  previousSchool: z.string().min(3, "Asal sekolah wajib diisi"),
  phone: z.string().min(10, "Nomor HP aktif minimal 10 digit"),
  email: z.string().email("Format email tidak valid"),
  majorId: z.string().min(1, "Pilih program keahlian/jurusan"),
  documentUrl: z.string().optional(),
})

export async function registerPPDB(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get("fullName") as string,
      nik: formData.get("nik") as string,
      nisn: formData.get("nisn") as string,
      birthPlace: formData.get("birthPlace") as string,
      birthDate: formData.get("birthDate") as string,
      gender: formData.get("gender") as "L" | "P",
      address: formData.get("address") as string,
      previousSchool: formData.get("previousSchool") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      majorId: formData.get("majorId") as string,
      documentUrl: (formData.get("documentUrl") as string) || undefined,
    }

    const validated = PPDBRegisterSchema.parse(rawData)

    // Generate unique registration number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const registrationNo = `PPDB-2026-${randomSuffix}`

    // Resolve majorId safely to existing record in PostgreSQL
    let targetMajorId = validated.majorId
    const existingMajor = await prisma.major.findUnique({
      where: { id: targetMajorId },
    })

    if (!existingMajor) {
      const codeMap: Record<string, string> = {
        "major-1": "RPL",
        "major-2": "TJKT",
        "major-3": "DKV",
        "major-4": "MPLB",
        "major-5": "AKL",
      }
      const targetCode = codeMap[validated.majorId] || validated.majorId
      const matchedMajor = await prisma.major.findFirst({
        where: {
          OR: [
            { code: { equals: targetCode, mode: "insensitive" } },
            { slug: { contains: targetCode, mode: "insensitive" } },
            { name: { contains: targetCode, mode: "insensitive" } },
          ],
        },
      })
      if (matchedMajor) {
        targetMajorId = matchedMajor.id
      } else {
        const firstMajor = await prisma.major.findFirst()
        if (firstMajor) {
          targetMajorId = firstMajor.id
        }
      }
    }

    const record = await prisma.pPDBRegistration.create({
      data: {
        registrationNo,
        fullName: validated.fullName,
        nik: validated.nik,
        nisn: validated.nisn,
        birthPlace: validated.birthPlace,
        birthDate: new Date(validated.birthDate),
        gender: validated.gender,
        address: validated.address,
        previousSchool: validated.previousSchool,
        phone: validated.phone,
        email: validated.email,
        majorId: targetMajorId,
        documentUrl: validated.documentUrl || null,
        status: "PENDING",
      },
    })

    try {
      revalidatePath("/admin/ppdb")
      revalidatePath("/admin")
      revalidatePath("/ppdb")
      revalidatePath("/ppdb/status")
    } catch {
      // safe in non-HTTP contexts
    }

    // Auto-create notification for admin
    try {
      await createNotification({
        type: "PPDB_NEW",
        title: "Pendaftaran PPDB Baru",
        message: `${validated.fullName} mendaftar dari ${validated.previousSchool}`,
        href: "/admin/ppdb",
      })
    } catch {}

    return { success: true, registrationNo: record.registrationNo }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    console.error("PPDB Register Error:", error)
    return { success: false, error: "Terjadi kesalahan saat memproses pendaftaran ke database" }
  }
}

export async function updatePPDBStatus(id: string, status: string, notes?: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    const registration = await prisma.pPDBRegistration.update({
      where: { id },
      data: {
        status,
        notes: notes || undefined,
      },
    })
    try {
      revalidatePath("/admin/ppdb")
      revalidatePath("/admin")
      revalidatePath("/ppdb")
      revalidatePath("/ppdb/status")
    } catch {}

    // Auto-create notification for status change
    const statusLabels: Record<string, string> = {
      PENDING: "Menunggu",
      VERIFIED: "Terverifikasi",
      ACCEPTED: "Diterima",
      REJECTED: "Ditolak",
    }
    try {
      await createNotification({
        type: "PPDB_STATUS_CHANGE",
        title: `Status PPDB: ${statusLabels[status] || status}`,
        message: `Status pendaftar ${registration.fullName} (${registration.registrationNo}) diubah menjadi ${statusLabels[status] || status}`,
        href: "/admin/ppdb",
      })
    } catch {}

    return { success: true }
  } catch {
    return { success: false, error: "Gagal memperbarui status pendaftar" }
  }
}

export async function deletePPDB(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    await prisma.pPDBRegistration.delete({
      where: { id },
    })
    try {
      revalidatePath("/admin/ppdb")
      revalidatePath("/admin")
      revalidatePath("/ppdb")
      revalidatePath("/ppdb/status")
    } catch {}
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus data pendaftar" }
  }
}

export async function checkPPDBStatus(query: string) {
  try {
    const trimmed = query.trim()
    if (!trimmed) {
      return { success: false, error: "Masukkan nomor pendaftaran atau NISN" }
    }

    const applicant = await prisma.pPDBRegistration.findFirst({
      where: {
        OR: [
          { registrationNo: { equals: trimmed, mode: "insensitive" } },
          { nisn: { equals: trimmed } },
        ],
      },
      include: {
        major: { select: { name: true, code: true } },
      },
    })

    if (!applicant) {
      return {
        success: false,
        error: "Data pendaftaran tidak ditemukan. Pastikan nomor registrasi (contoh: PPDB-2026-xxxx) atau NISN sudah benar.",
      }
    }

    return {
      success: true,
      applicant: {
        id: applicant.id,
        registrationNo: applicant.registrationNo,
        fullName: applicant.fullName,
        nisn: applicant.nisn,
        previousSchool: applicant.previousSchool,
        major: applicant.major,
        status: applicant.status,
        notes: applicant.notes,
        createdAt: applicant.createdAt.toISOString(),
      },
    }
  } catch (error) {
    console.error("Check PPDB status error:", error)
    return { success: false, error: "Terjadi kesalahan saat memeriksa status pendaftaran" }
  }
}
