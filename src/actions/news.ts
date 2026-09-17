"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

const NewsSchema = z.object({
  title: z.string().min(5, "Judul berita minimal 5 karakter"),
  categoryId: z.string().min(1, "Kategori berita wajib dipilih"),
  excerpt: z.string().optional(),
  content: z.string().min(20, "Konten berita minimal 20 karakter"),
  thumbnail: z.string().optional(),
  isPublished: z.boolean().default(true),
})

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function createNews(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    const authorId = session.user.id || (await prisma.user.findFirst())?.id || "admin-dev-id"

    const raw = {
      title: formData.get("title") as string,
      categoryId: formData.get("categoryId") as string,
      excerpt: (formData.get("excerpt") as string) || undefined,
      content: formData.get("content") as string,
      thumbnail: (formData.get("thumbnail") as string) || undefined,
      isPublished: formData.get("isPublished") === "true",
    }

    const validated = NewsSchema.parse(raw)
    const baseSlug = slugify(validated.title)
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`

    await prisma.news.create({
      data: {
        ...validated,
        slug,
        authorId,
      },
    })

    revalidatePath("/admin/berita")
    revalidatePath("/berita")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal mempublikasikan berita" }
  }
}

export async function updateNews(id: string, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    const raw = {
      title: formData.get("title") as string,
      categoryId: formData.get("categoryId") as string,
      excerpt: (formData.get("excerpt") as string) || undefined,
      content: formData.get("content") as string,
      thumbnail: (formData.get("thumbnail") as string) || undefined,
      isPublished: formData.get("isPublished") === "true",
    }

    const validated = NewsSchema.parse(raw)

    await prisma.news.update({
      where: { id },
      data: validated,
    })

    revalidatePath("/admin/berita")
    revalidatePath("/berita")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal memperbarui berita" }
  }
}

export async function togglePublishNews(id: string, currentStatus: boolean) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    await prisma.news.update({
      where: { id },
      data: { isPublished: !currentStatus },
    })
    revalidatePath("/admin/berita")
    revalidatePath("/berita")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal mengubah status publikasi" }
  }
}

export async function deleteNews(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    await prisma.news.delete({
      where: { id },
    })
    revalidatePath("/admin/berita")
    revalidatePath("/berita")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus berita" }
  }
}
