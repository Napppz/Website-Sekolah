"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function getNotifications(limit = 20) {
  try {
    const session = await auth()
    if (!session?.user) return []

    const notifications = await prisma.notification.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
    })
    return notifications
  } catch {
    return []
  }
}

export async function getUnreadCount() {
  try {
    const session = await auth()
    if (!session?.user) return 0

    return await prisma.notification.count({ where: { isRead: false } })
  } catch {
    return 0
  }
}

export async function markAsRead(id: string) {
  try {
    const session = await auth()
    if (!session?.user) return { success: false, error: "Unauthorized" }

    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    })
    try { revalidatePath("/admin") } catch {}
    return { success: true }
  } catch {
    return { success: false }
  }
}

export async function markAllAsRead() {
  try {
    const session = await auth()
    if (!session?.user) return { success: false, error: "Unauthorized" }

    await prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    })
    try { revalidatePath("/admin") } catch {}
    return { success: true }
  } catch {
    return { success: false }
  }
}

export async function createNotification(data: {
  type: string
  title: string
  message: string
  href?: string
}) {
  try {
    await prisma.notification.create({
      data: {
        type: data.type,
        title: data.title,
        message: data.message,
        href: data.href || null,
      },
    })
    return { success: true }
  } catch {
    return { success: false }
  }
}
