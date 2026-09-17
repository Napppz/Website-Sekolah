"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const EventSchema = z.object({
  title: z.string().min(5, "Judul agenda minimal 5 karakter"),
  description: z.string().min(10, "Deskripsi agenda minimal 10 karakter"),
  location: z.string().min(3, "Lokasi agenda wajib diisi"),
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  endDate: z.string().optional(),
  poster: z.string().optional(),
})

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function createEvent(formData: FormData) {
  try {
    const raw = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      startDate: formData.get("startDate") as string,
      endDate: (formData.get("endDate") as string) || undefined,
      poster: (formData.get("poster") as string) || undefined,
    }

    const validated = EventSchema.parse(raw)
    const slug = `${slugify(validated.title)}-${Date.now().toString().slice(-4)}`

    await prisma.event.create({
      data: {
        title: validated.title,
        slug,
        description: validated.description,
        location: validated.location,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        poster: validated.poster || null,
      },
    })

    revalidatePath("/admin/agenda")
    revalidatePath("/agenda")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal membuat agenda kegiatan" }
  }
}

export async function updateEvent(id: string, formData: FormData) {
  try {
    const raw = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      startDate: formData.get("startDate") as string,
      endDate: (formData.get("endDate") as string) || undefined,
      poster: (formData.get("poster") as string) || undefined,
    }

    const validated = EventSchema.parse(raw)

    await prisma.event.update({
      where: { id },
      data: {
        title: validated.title,
        description: validated.description,
        location: validated.location,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        poster: validated.poster || null,
      },
    })

    revalidatePath("/admin/agenda")
    revalidatePath("/agenda")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal memperbarui agenda kegiatan" }
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({
      where: { id },
    })
    revalidatePath("/admin/agenda")
    revalidatePath("/agenda")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus agenda kegiatan" }
  }
}
