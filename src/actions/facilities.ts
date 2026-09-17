"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const FacilitySchema = z.object({
  name: z.string().min(3, "Nama fasilitas minimal 3 karakter"),
  category: z.string().min(2, "Kategori wajib dipilih"),
  capacity: z.number().nullable().optional(),
  condition: z.string().default("Sangat Baik"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  image: z.string().optional(),
})

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function createFacility(formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      capacity: formData.get("capacity") ? Number(formData.get("capacity")) : null,
      condition: (formData.get("condition") as string) || "Sangat Baik",
      description: formData.get("description") as string,
      image: (formData.get("image") as string) || undefined,
    }

    const validated = FacilitySchema.parse(raw)
    const slug = slugify(`${validated.name}-${Date.now().toString().slice(-4)}`)

    await prisma.facility.create({
      data: {
        ...validated,
        slug,
      },
    })

    revalidatePath("/admin/fasilitas")
    revalidatePath("/fasilitas")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal menambahkan fasilitas" }
  }
}

export async function updateFacility(id: string, formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      capacity: formData.get("capacity") ? Number(formData.get("capacity")) : null,
      condition: (formData.get("condition") as string) || "Sangat Baik",
      description: formData.get("description") as string,
      image: (formData.get("image") as string) || undefined,
    }

    const validated = FacilitySchema.parse(raw)

    await prisma.facility.update({
      where: { id },
      data: validated,
    })

    revalidatePath("/admin/fasilitas")
    revalidatePath("/fasilitas")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal memperbarui fasilitas" }
  }
}

export async function deleteFacility(id: string) {
  try {
    await prisma.facility.delete({
      where: { id },
    })
    revalidatePath("/admin/fasilitas")
    revalidatePath("/fasilitas")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus fasilitas" }
  }
}
