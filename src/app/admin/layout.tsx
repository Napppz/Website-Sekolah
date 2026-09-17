import { auth } from "@/auth"
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const headerList = await headers()
  const pathname = headerList.get("x-pathname") || ""

  // If accessing protected admin route without valid authenticated session, redirect immediately
  if (pathname && pathname !== "/admin/login" && !session?.user) {
    redirect("/admin/login")
  }

  return (
    <AdminLayoutShell user={session?.user}>
      {children}
    </AdminLayoutShell>
  )
}
