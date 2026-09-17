"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const AnnouncementSchema = z.object({
  title: z.string().min(5, "Judul pengumuman minimal 5 karakter"),
  content: z.string().min(10, "Isi pengumuman minimal 10 karakter"),
  fileAttachment: z.string().optional(),
  isActive: z.boolean().default(true),
})

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function createAnnouncement(formData: FormData) {
  try {
    const raw = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      fileAttachment: (formData.get("fileAttachment") as string) || undefined,
      isActive: formData.get("isActive") === "true",
    }

    const validated = AnnouncementSchema.parse(raw)
    const slug = `${slugify(validated.title)}-${Date.now().toString().slice(-4)}`

    await prisma.announcement.create({
      data: {
        ...validated,
        slug,
      },
    })

    revalidatePath("/admin/pengumuman")
    revalidatePath("/pengumuman")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal membuat pengumuman" }
  }
}

export async function updateAnnouncement(id: string, formData: FormData) {
  try {
    const raw = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      fileAttachment: (formData.get("fileAttachment") as string) || undefined,
      isActive: formData.get("isActive") === "true",
    }

    const validated = AnnouncementSchema.parse(raw)

    await prisma.announcement.update({
      where: { id },
      data: validated,
    })

    revalidatePath("/admin/pengumuman")
    revalidatePath("/pengumuman")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal memperbarui pengumuman" }
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await prisma.announcement.delete({
      where: { id },
    })
    revalidatePath("/admin/pengumuman")
    revalidatePath("/pengumuman")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus pengumuman" }
  }
}
