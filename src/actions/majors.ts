"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

const MajorSchema = z.object({
  code: z.string().min(2, "Kode jurusan minimal 2 karakter"),
  name: z.string().min(3, "Nama jurusan minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi jurusan minimal 10 karakter"),
  image: z.string().optional(),
  competencies: z.string().min(5, "Kompetensi wajib diisi"),
  careerProspects: z.string().min(5, "Prospek kerja wajib diisi"),
})

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function createMajor(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    const name = formData.get("name") as string
    const raw = {
      code: (formData.get("code") as string).toUpperCase(),
      name,
      description: formData.get("description") as string,
      image: (formData.get("image") as string) || undefined,
      competencies: formData.get("competencies") as string,
      careerProspects: formData.get("careerProspects") as string,
    }

    const validated = MajorSchema.parse(raw)
    const slug = slugify(validated.name)

    await prisma.major.create({
      data: {
        ...validated,
        slug,
      },
    })

    revalidatePath("/admin/jurusan")
    revalidatePath("/jurusan")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal menambahkan jurusan" }
  }
}

export async function updateMajor(id: string, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    const name = formData.get("name") as string
    const raw = {
      code: (formData.get("code") as string).toUpperCase(),
      name,
      description: formData.get("description") as string,
      image: (formData.get("image") as string) || undefined,
      competencies: formData.get("competencies") as string,
      careerProspects: formData.get("careerProspects") as string,
    }

    const validated = MajorSchema.parse(raw)
    const slug = slugify(validated.name)

    await prisma.major.update({
      where: { id },
      data: {
        ...validated,
        slug,
      },
    })

    revalidatePath("/admin/jurusan")
    revalidatePath("/jurusan")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal memperbarui jurusan" }
  }
}

export async function deleteMajor(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    await prisma.major.delete({
      where: { id },
    })
    revalidatePath("/admin/jurusan")
    revalidatePath("/jurusan")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus jurusan" }
  }
}
