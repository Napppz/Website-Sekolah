"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

const GallerySchema = z.object({
  title: z.string().min(3, "Judul foto minimal 3 karakter"),
  category: z.string().min(2, "Kategori wajib dipilih"),
  albumName: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().min(1, "Foto wajib diunggah/diisi"),
})

export async function createGalleryItem(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    const raw = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      albumName: (formData.get("albumName") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
      imageUrl: formData.get("imageUrl") as string,
    }

    const validated = GallerySchema.parse(raw)

    await prisma.gallery.create({
      data: validated,
    })

    revalidatePath("/admin/galeri")
    revalidatePath("/galeri")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal menambahkan foto ke galeri" }
  }
}

export async function deleteGalleryItem(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    await prisma.gallery.delete({
      where: { id },
    })
    revalidatePath("/admin/galeri")
    revalidatePath("/galeri")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus foto galeri" }
  }
}
