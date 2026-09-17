import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized: Hanya admin yang dapat mengakses notifikasi" },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "20", 10)

    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.notification.count({ where: { isRead: false } }),
    ])

    return NextResponse.json({ notifications, unreadCount })
  } catch {
    return NextResponse.json({ notifications: [], unreadCount: 0 })
  }
}

export async function PATCH(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized: Hanya admin yang dapat mengubah status notifikasi" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { action, id } = body

    if (action === "markAllRead") {
      await prisma.notification.updateMany({
        where: { isRead: false },
        data: { isRead: true },
      })
      return NextResponse.json({ success: true })
    }

    if (action === "markRead" && id) {
      await prisma.notification.update({
        where: { id },
        data: { isRead: true },
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
