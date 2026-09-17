"use client"

import * as React from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error("Global Root Error caught:", error)
  }, [error])

  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans antialiased">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto h-20 w-20 rounded-3xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
            <AlertTriangle className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Terjadi Kesalahan Kritis
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sistem sekolah mengalami kendala pemuatan layout utama. Silakan muat ulang halaman atau kembali beberapa saat lagi.
            </p>
          </div>

          <div>
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
