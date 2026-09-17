"use client"

import * as React from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error Boundary caught:", error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Warning Icon Badge */}
        <div className="mx-auto h-20 w-20 rounded-3xl bg-destructive/10 text-destructive flex items-center justify-center shadow-xs">
          <AlertTriangle className="h-10 w-10" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Terjadi Kendala Teknis
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mohon maaf atas ketidaknyamanan ini. Halaman mengalami kendala pemrosesan data sementara. Tim teknis sekolah telah menerima laporan ini.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-muted-foreground/60 pt-1">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            size="lg"
            className="rounded-xl font-bold gap-2 w-full sm:w-auto shadow-xs"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Muat Ulang
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl font-semibold gap-2 w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>

        {/* Help Link */}
        <div className="pt-4 border-t border-border/50">
          <Link
            href="/kontak"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Butuh bantuan darurat? Hubungi Layanan Sekolah
          </Link>
        </div>
      </div>
    </div>
  )
}
