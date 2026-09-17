"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { GraduationCap, Lock, Mail, Loader2, ArrowLeft, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin"

  const [email, setEmail] = React.useState("admin@sekolah.test")
  const [password, setPassword] = React.useState("Admin123!")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (res?.error) {
        toast.error("Email atau password yang Anda masukkan salah!")
      } else {
        toast.success("Login berhasil! Mengalihkan ke dashboard...")
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      toast.error("Terjadi kesalahan saat otentikasi")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-muted/30 relative">
      <div className="absolute top-4 left-4">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Ke Website Publik
          </Link>
        </Button>
      </div>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground mx-auto flex items-center justify-center shadow-lg shadow-primary/25">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Portal Administrator
          </h1>
          <p className="text-xs text-muted-foreground">
            Sistem Informasi Manajemen SMKN 1 Digital Nusantara
          </p>
        </div>

        <Card className="rounded-3xl border shadow-xl bg-card/90 backdrop-blur-md">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Masuk Akun Admin</CardTitle>
            <CardDescription className="text-xs">
              Masukkan kredensial akun administrator Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@sekolah.test"
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">
                  Kata Sandi (Password)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-10 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Dev Credentials Helper */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs space-y-1">
                <p className="font-semibold text-primary flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Akun Default Development:
                </p>
                <p className="text-muted-foreground">
                  Email: <code className="font-mono text-foreground">admin@sekolah.test</code>
                </p>
                <p className="text-muted-foreground">
                  Password: <code className="font-mono text-foreground">Admin123!</code>
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl font-bold shadow-md"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  "Masuk ke Dashboard"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Akses dibatasi hanya untuk staf dan pengelola resmi sekolah.
        </p>
      </div>
    </div>
  )
}
