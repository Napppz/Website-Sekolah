"use client"

import * as React from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Terjadi Kesalahan",
  description = "Data tidak dapat dimuat saat ini. Silakan periksa koneksi Anda atau coba sesaat lagi.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-2 rounded-xl gap-2 text-xs font-semibold"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Coba Lagi
        </Button>
      )}
    </div>
  )
}
