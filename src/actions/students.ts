"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const StudentSchema = z.object({
  nisn: z.string().length(10, "NISN harus 10 digit"),
  nis: z.string().min(4, "NIS minimal 4 digit"),
  name: z.string().min(3, "Nama siswa minimal 3 karakter"),
  gender: z.enum(["L", "P"]),
  classGrade: z.string().min(1, "Pilih tingkatan kelas"),
  majorId: z.string().min(1, "Pilih jurusan"),
  status: z.string().default("ACTIVE"),
})

export async function createStudent(formData: FormData) {
  try {
    const raw = {
      nisn: formData.get("nisn") as string,
      nis: formData.get("nisn") ? (formData.get("nis") as string) : "",
      name: formData.get("name") as string,
      gender: formData.get("gender") as "L" | "P",
      classGrade: formData.get("classGrade") as string,
      majorId: formData.get("majorId") as string,
      status: (formData.get("status") as string) || "ACTIVE",
    }

    const validated = StudentSchema.parse(raw)

    await prisma.student.create({
      data: validated,
    })

    revalidatePath("/admin/siswa")
    revalidatePath("/siswa")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal menambahkan data siswa" }
  }
}

export async function updateStudent(id: string, formData: FormData) {
  try {
    const raw = {
      nisn: formData.get("nisn") as string,
      nis: formData.get("nis") as string,
      name: formData.get("name") as string,
      gender: formData.get("gender") as "L" | "P",
      classGrade: formData.get("classGrade") as string,
      majorId: formData.get("majorId") as string,
      status: (formData.get("status") as string) || "ACTIVE",
    }

    const validated = StudentSchema.parse(raw)

    await prisma.student.update({
      where: { id },
      data: validated,
    })

    revalidatePath("/admin/siswa")
    revalidatePath("/siswa")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validasi gagal" }
    }
    return { success: false, error: "Gagal memperbarui data siswa" }
  }
}

export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({
      where: { id },
    })
    revalidatePath("/admin/siswa")
    revalidatePath("/siswa")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal menghapus siswa" }
  }
}
