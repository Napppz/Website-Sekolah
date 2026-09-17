"use client"

import * as React from "react"
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/common/empty-state"

export interface Column<T> {
  key: string
  header: string
  render?: (item: T, index: number) => React.ReactNode
  className?: string
  hideOnMobile?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string
  searchPlaceholder?: string
  searchKey?: keyof T | ((item: T) => string)
  pageSize?: number
  actions?: (item: T) => React.ReactNode
  mobileCardRender?: (item: T, actions?: React.ReactNode) => React.ReactNode
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  filterSlot?: React.ReactNode
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = "Cari data...",
  searchKey,
  pageSize = 10,
  actions,
  mobileCardRender,
  emptyTitle = "Belum Ada Data",
  emptyDescription = "Tidak ada data yang cocok dengan kriteria pencarian.",
  emptyAction,
  filterSlot,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)

  // Filtering
  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return data
    const query = searchTerm.toLowerCase()

    return data.filter((item) => {
      if (typeof searchKey === "function") {
        return searchKey(item).toLowerCase().includes(query)
      }
      if (searchKey && item[searchKey]) {
        return String(item[searchKey]).toLowerCase().includes(query)
      }
      // Default: check all string values in item
      return Object.values(item as Record<string, unknown>).some(
        (val) => typeof val === "string" && val.toLowerCase().includes(query)
      )
    })
  }, [data, searchTerm, searchKey])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage, pageSize])

  // Reset page if search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className="space-y-4">
      {/* Top Bar: Search & Optional Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-card border text-sm"
          />
        </div>
        {filterSlot && <div className="flex items-center gap-2">{filterSlot}</div>}
      </div>

      {/* Main Content */}
      {paginatedData.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      ) : (
        <>
          {/* Desktop & Tablet Table View */}
          <div className="hidden md:block rounded-2xl border bg-card overflow-hidden shadow-2xs">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent">
                  {columns.map((col) => (
                    <TableHead
                      key={col.key}
                      className={`text-xs font-bold uppercase tracking-wider text-muted-foreground ${col.className || ""}`}
                    >
                      {col.header}
                    </TableHead>
                  ))}
                  {actions && (
                    <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground w-28">
                      Aksi
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow
                    key={keyExtractor(item)}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        {col.render
                          ? col.render(item, (currentPage - 1) * pageSize + index)
                          : String((item as Record<string, unknown>)[col.key] ?? "-")}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell className="text-right">
                        {actions(item)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Responsive Cards View */}
          <div className="block md:hidden space-y-3">
            {paginatedData.map((item, index) => {
              if (mobileCardRender) {
                return (
                  <React.Fragment key={keyExtractor(item)}>
                    {mobileCardRender(item, actions ? actions(item) : undefined)}
                  </React.Fragment>
                )
              }
              return (
                <div
                  key={keyExtractor(item)}
                  className="rounded-2xl border bg-card p-4 space-y-3 shadow-2xs"
                >
                  <div className="space-y-2">
                    {columns
                      .filter((col) => !col.hideOnMobile)
                      .map((col) => (
                        <div key={col.key} className="flex justify-between items-center text-xs">
                          <span className="font-medium text-muted-foreground">
                            {col.header}
                          </span>
                          <span className="font-semibold text-foreground text-right">
                            {col.render
                              ? col.render(item, index)
                              : String((item as Record<string, unknown>)[col.key] ?? "-")}
                          </span>
                        </div>
                      ))}
                  </div>
                  {actions && (
                    <div className="pt-2 border-t flex justify-end gap-2">
                      {actions(item)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-muted-foreground">
              <p>
                Menampilkan{" "}
                <span className="font-bold text-foreground">
                  {(currentPage - 1) * pageSize + 1}
                </span>{" "}
                -{" "}
                <span className="font-bold text-foreground">
                  {Math.min(currentPage * pageSize, filteredData.length)}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-foreground">
                  {filteredData.length}
                </span>{" "}
                data
              </p>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  aria-label="Halaman Pertama"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Halaman Sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-3 font-semibold text-foreground">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Halaman Berikutnya"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  aria-label="Halaman Terakhir"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
