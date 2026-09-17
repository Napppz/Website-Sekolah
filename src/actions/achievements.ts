"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const AchievementSchema = z.object({
  title: z.string().min(5, "Judul prestasi minimal 5 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  level: z.string().min(2, "Tingkat prestasi wajib dipilih"),
  year: z.number().min(2000, "Tahun tidak valid"),
  participant: z.string().min(2, "Nama peserta wajib diisi"),
  category: z.string().min(2, "Kategori wajib diisi"),
  photo: z.string().optional(),
})

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function createAchievement(formData: FormData) {
  try {
    const raw = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      level: formData.get("level") as string,
      year: Number(formData.get("year")),
      participant: formData.get("participant") as string,
      category: formData.get("category") as string,
      photo: (formData.get("photo") as string) || undefined,
    }

    const validated = AchievementSchema.parse(raw)
    const slug = `${slugify(validated.title)}-${Date.now().toString().slice(-4)}`

    await prisma.achievement.create({
      data: {
        ...validated,
        slug,
      },
    })

    revalidatePath("/admin/prestasi")
    revalidatePath("/prestasi")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal menambahkan prestasi" }
  }
}

export async function updateAchievement(id: string, formData: FormData) {
  try {
    const raw = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      level: formData.get("level") as string,
      year: Number(formData.get("year")),
      participant: formData.get("participant") as string,
      category: formData.get("category") as string,
      photo: (formData.get("photo") as string) || undefined,
    }

    const validated = AchievementSchema.parse(raw)

    await prisma.achievement.update({
      where: { id },
      data: validated,
    })

    revalidatePath("/admin/prestasi")
    revalidatePath("/prestasi")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal memperbarui prestasi" }
  }
}

export async function deleteAchievement(id: string) {
  try {
    await prisma.achievement.delete({
      where: { id },
    })
    revalidatePath("/admin/prestasi")
    revalidatePath("/prestasi")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus prestasi" }
  }
}
