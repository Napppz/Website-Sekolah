"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function updateSchoolProfile(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." }
    }
    const data = {
      name: formData.get("name") as string,
      npsn: formData.get("npsn") as string,
      accreditation: formData.get("accreditation") as string,
      slogan: formData.get("slogan") as string,
      description: formData.get("description") as string,
      history: formData.get("history") as string,
      vision: formData.get("vision") as string,
      mission: formData.get("mission") as string,
      goals: formData.get("goals") as string,
      principalName: formData.get("principalName") as string,
      principalTitle: formData.get("principalTitle") as string,
      principalSpeech: formData.get("principalSpeech") as string,
      principalPhoto: (formData.get("principalPhoto") as string) || undefined,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      website: (formData.get("website") as string) || undefined,
      mapsUrl: (formData.get("mapsUrl") as string) || undefined,
      facebookUrl: (formData.get("facebookUrl") as string) || undefined,
      instagramUrl: (formData.get("instagramUrl") as string) || undefined,
      youtubeUrl: (formData.get("youtubeUrl") as string) || undefined,
      twitterUrl: (formData.get("twitterUrl") as string) || undefined,
    }

    const first = await prisma.schoolProfile.findFirst()
    if (first) {
      await prisma.schoolProfile.update({
        where: { id: first.id },
        data,
      })
    } else {
      await prisma.schoolProfile.create({
        data,
      })
    }

    revalidatePath("/admin/profil")
    revalidatePath("/profil")
    revalidatePath("/")
    revalidatePath("/kontak")
    return { success: true }
  } catch {
    return { success: false, error: "Gagal memperbarui profil sekolah" }
  }
}
