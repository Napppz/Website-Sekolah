/**
 * Utility untuk mengekspor data array of objects ke format CSV yang kompatibel
 * dengan Microsoft Excel, Google Sheets, dan LibreOffice Calc.
 * Menggunakan UTF-8 BOM (\uFEFF) untuk memastikan karakter khusus dan angka
 * panjang (seperti NIK dan NISN) terbaca sempurna.
 */

export interface CsvColumn<T> {
  key: keyof T | string
  label: string
  format?: (value: any, item: T) => string | number | null | undefined
}

export function exportToCsv<T extends Record<string, any>>(
  filename: string,
  columns: CsvColumn<T>[],
  data: T[]
) {
  if (!data || data.length === 0) {
    throw new Error("Tidak ada data untuk diekspor")
  }

  // Header baris
  const headerRow = columns.map((col) => `"${col.label.replace(/"/g, '""')}"`).join(";")

  // Baris-baris data
  const dataRows = data.map((item, index) => {
    return columns
      .map((col) => {
        let value: any
        if (col.key === "_index") {
          value = index + 1
        } else if (col.format) {
          value = col.format(item[col.key as keyof T], item)
        } else {
          value = item[col.key as keyof T]
        }

        if (value === null || value === undefined) {
          return '""'
        }

        const stringValue = String(value)
        // Escape quotes
        return `"${stringValue.replace(/"/g, '""')}"`
      })
      .join(";")
  })

  // Gabungkan dengan pemisah baris CRLF untuk kompatibilitas Windows & Excel
  const csvContent = "\uFEFF" + [headerRow, ...dataRows].join("\r\n")

  // Buat Blob dan download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
