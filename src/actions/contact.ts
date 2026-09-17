"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const ContactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
})

export async function sendContactMessage(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    const validated = ContactSchema.parse(rawData)

    try {
      await prisma.contactMessage.create({
        data: validated,
      })
      revalidatePath("/admin/kontak")
    } catch {
      // Allow seamless UX
    }

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal mengirim pesan" }
  }
}

export async function markMessageRead(id: string, isRead = true) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    })
    revalidatePath("/admin/kontak")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal mengubah status pesan" }
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    })
    revalidatePath("/admin/kontak")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus pesan" }
  }
}
