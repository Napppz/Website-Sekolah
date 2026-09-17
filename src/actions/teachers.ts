"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const TeacherSchema = z.object({
  nip: z.string().min(5, "NIP minimal 5 karakter"),
  name: z.string().min(3, "Nama guru minimal 3 karakter"),
  title: z.string().optional(),
  gender: z.enum(["L", "P"]),
  position: z.string().min(2, "Jabatan wajib diisi"),
  subject: z.string().min(2, "Mata pelajaran wajib diisi"),
  photo: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  bio: z.string().optional(),
})

export async function createTeacher(formData: FormData) {
  try {
    const raw = {
      nip: formData.get("nip") as string,
      name: formData.get("name") as string,
      title: (formData.get("title") as string) || undefined,
      gender: formData.get("gender") as "L" | "P",
      position: formData.get("position") as string,
      subject: formData.get("subject") as string,
      photo: (formData.get("photo") as string) || undefined,
      email: (formData.get("email") as string) || undefined,
      phone: (formData.get("phone") as string) || undefined,
      bio: (formData.get("bio") as string) || undefined,
    }

    const validated = TeacherSchema.parse(raw)

    await prisma.teacher.create({
      data: validated,
    })

    revalidatePath("/admin/guru")
    revalidatePath("/guru")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal menambahkan data guru" }
  }
}

export async function updateTeacher(id: string, formData: FormData) {
  try {
    const raw = {
      nip: formData.get("nip") as string,
      name: formData.get("name") as string,
      title: (formData.get("title") as string) || undefined,
      gender: formData.get("gender") as "L" | "P",
      position: formData.get("position") as string,
      subject: formData.get("subject") as string,
      photo: (formData.get("photo") as string) || undefined,
      email: (formData.get("email") as string) || undefined,
      phone: (formData.get("phone") as string) || undefined,
      bio: (formData.get("bio") as string) || undefined,
    }

    const validated = TeacherSchema.parse(raw)

    await prisma.teacher.update({
      where: { id },
      data: validated,
    })

    revalidatePath("/admin/guru")
    revalidatePath("/guru")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal memperbarui data guru" }
  }
}

export async function deleteTeacher(id: string) {
  try {
    await prisma.teacher.delete({
      where: { id },
    })
    revalidatePath("/admin/guru")
    revalidatePath("/guru")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus guru" }
  }
}
