"use client"

import * as React from "react"
import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <Button
      onClick={handlePrint}
      className="gap-2 font-bold rounded-xl shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      <Printer className="h-4 w-4" />
      Cetak / Simpan PDF
    </Button>
  )
}
