import { auth } from "@/auth"
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <AdminLayoutShell user={session?.user}>
      {children}
    </AdminLayoutShell>
  )
}
