"use client"

import * as React from "react"
import { toast } from "sonner"
import Image from "next/image"
import {
  Newspaper,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  Calendar,
  Eye,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DataTable, Column } from "@/components/common/data-table"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { createNews, updateNews, deleteNews, togglePublishNews } from "@/actions/news"

interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  thumbnail?: string | null
  isPublished: boolean
  publishedAt: string
  views: number
  categoryId: string
  category?: { name: string }
}

export default function AdminBeritaPage() {
  const [newsList, setNewsList] = React.useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingNews, setEditingNews] = React.useState<NewsItem | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Confirm delete dialog state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Photo upload
  const [uploadingThumbnail, setUploadingThumbnail] = React.useState(false)
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string>("")

  const loadNews = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/news")
      if (res.ok) {
        const data = await res.json()
        setNewsList(data.news || [])
      }
    } catch {
      toast.error("Gagal memuat berita")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadNews()
  }, [loadNews])

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingThumbnail(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", "news")

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setThumbnailUrl(data.url)
        toast.success("Thumbnail berhasil diunggah!")
      } else {
        toast.error(data.error || "Gagal upload thumbnail")
      }
    } catch {
      toast.error("Terjadi kendala upload thumbnail")
    } finally {
      setUploadingThumbnail(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    if (thumbnailUrl) {
      formData.set("thumbnail", thumbnailUrl)
    }

    try {
      if (editingNews) {
        formData.append("id", editingNews.id)
        const res = await updateNews(editingNews.id, formData)
        if (res.success) {
          toast.success("Berita berhasil diperbarui!")
          setIsDialogOpen(false)
          setEditingNews(null)
          loadNews()
        } else {
          toast.error(res.error || "Gagal memperbarui berita")
        }
      } else {
        const res = await createNews(formData)
        if (res.success) {
          toast.success("Berita baru berhasil ditambahkan!")
          setIsDialogOpen(false)
          loadNews()
        } else {
          toast.error(res.error || "Gagal menerbitkan berita")
        }
      }
    } catch {
      toast.error("Terjadi kesalahan sistem")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await togglePublishNews(id, !currentStatus)
      if (res.success) {
        toast.success(
          !currentStatus ? "Berita berhasil dipublikasi!" : "Berita disimpan ke draf."
        )
        loadNews()
      }
    } catch {
      toast.error("Gagal mengubah status publikasi")
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const res = await deleteNews(deleteId)
      if (res.success) {
        toast.success("Artikel berita berhasil dihapus!")
        setDeleteId(null)
        loadNews()
      } else {
        toast.error(res.error || "Gagal menghapus berita")
      }
    } catch {
      toast.error("Gagal menghapus berita")
    } finally {
      setIsDeleting(false)
    }
  }

  // Table Columns
  const columns: Column<NewsItem>[] = [
    {
      key: "title",
      header: "Artikel & Kategori",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-14 rounded-lg overflow-hidden bg-muted border shrink-0">
            <Image
              src={
                item.thumbnail ||
                "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=200"
              }
              alt={item.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-foreground text-xs leading-snug line-clamp-1">
              {item.title}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {typeof item.category === "object" && item.category !== null
                ? item.category.name
                : "Warta Sekolah"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <button
          onClick={() => handleTogglePublish(item.id, item.isPublished)}
          className="cursor-pointer"
          title="Klik untuk ubah status"
        >
          {item.isPublished ? (
            <Badge
              variant="outline"
              className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30 gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              Published
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-[10px] font-semibold text-muted-foreground bg-muted border-border gap-1"
            >
              <XCircle className="h-3 w-3" />
              Draft
            </Badge>
          )}
        </button>
      ),
    },
    {
      key: "date",
      header: "Tanggal",
      render: (item) => (
        <span className="text-xs text-muted-foreground">
          {new Date(item.publishedAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "views",
      header: "Views",
      render: (item) => (
        <span className="text-xs font-mono text-muted-foreground">
          {item.views || 0}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Kelola Artikel Berita
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Publikasikan warta sekolah, prestasi siswa, dan liputan kegiatan resmi.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingNews(null)
            setThumbnailUrl("")
            setIsDialogOpen(true)
          }}
          size="sm"
          className="rounded-xl font-semibold gap-1.5 h-9"
        >
          <Plus className="h-4 w-4" />
          Tulis Berita Baru
        </Button>
      </div>

      {/* Reusable Data Table */}
      <DataTable<NewsItem>
        data={newsList}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari judul berita atau konten..."
        searchKey={(item) => `${item.title} ${item.excerpt || ""}`}
        pageSize={10}
        emptyTitle="Belum Ada Berita"
        emptyDescription="Mulai tulis artikel berita sekolah untuk diinformasikan kepada publik."
        emptyAction={
          <Button
            onClick={() => {
              setEditingNews(null)
              setThumbnailUrl("")
              setIsDialogOpen(true)
            }}
            size="sm"
            className="rounded-xl"
          >
            Tulis Berita Pertama
          </Button>
        }
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg hover:bg-muted"
              title="Edit Berita"
              onClick={() => {
                setEditingNews(item)
                setThumbnailUrl(item.thumbnail || "")
                setIsDialogOpen(true)
              }}
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
              title="Hapus Berita"
              onClick={() => setDeleteId(item.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        mobileCardRender={(item, actionButtons) => (
          <div className="rounded-2xl border bg-card p-4 space-y-3 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-muted border shrink-0">
                <Image
                  src={
                    item.thumbnail ||
                    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=200"
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-bold text-foreground text-xs leading-snug line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span>•</span>
                  <span>{item.views || 0} views</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t text-xs">
              <span className="text-[10px] text-muted-foreground">
                {item.isPublished ? "Live di website" : "Tersimpan draf"}
              </span>
              <div>{actionButtons}</div>
            </div>
          </div>
        )}
      />

      {/* Form Modal (Create / Edit) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              {editingNews ? "Edit Artikel Berita" : "Tulis Berita Baru"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Judul Berita <span className="text-destructive">*</span>
              </label>
              <Input
                name="title"
                defaultValue={editingNews?.title || ""}
                required
                placeholder="Contoh: Siswa SMKN 1 Raih Medali Emas LKS Nasional 2026"
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Kategori Berita <span className="text-destructive">*</span>
                </label>
                <select
                  name="categoryId"
                  defaultValue={editingNews?.categoryId || "cat-prestasi"}
                  className="w-full h-10 rounded-xl border bg-card px-3 text-xs"
                >
                  <option value="cat-prestasi">Prestasi Siswa</option>
                  <option value="cat-akademik">Akademik & Kurikulum</option>
                  <option value="cat-kegiatan">Kegiatan Sekolah</option>
                  <option value="cat-kerjasama">Kerjasama Industri</option>
                  <option value="cat-ppdb">Info PPDB</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Status Publikasi
                </label>
                <select
                  name="isPublished"
                  defaultValue={editingNews?.isPublished ? "true" : "false"}
                  className="w-full h-10 rounded-xl border bg-card px-3 text-xs"
                >
                  <option value="true">Langsung Publish (Publik)</option>
                  <option value="false">Simpan sebagai Draft</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Ringkasan / Excerpt Singkat
              </label>
              <Input
                name="excerpt"
                defaultValue={editingNews?.excerpt || ""}
                placeholder="Ringkasan 1-2 kalimat untuk preview..."
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Foto / Thumbnail Berita
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  disabled={uploadingThumbnail}
                  className="rounded-xl h-10 text-xs file:mr-2 file:text-xs"
                />
                {uploadingThumbnail && (
                  <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Konten Lengkap Berita <span className="text-destructive">*</span>
              </label>
              <Textarea
                name="content"
                defaultValue={editingNews?.content || ""}
                required
                rows={8}
                placeholder="Tuliskan isi berita selengkapnya di sini..."
                className="rounded-xl text-xs"
              />
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl"
              >
                Batal
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting || uploadingThumbnail}
                className="rounded-xl min-w-24 font-semibold"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : editingNews ? (
                  "Simpan Perubahan"
                ) : (
                  "Terbitkan Berita"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Artikel Berita?"
        description="Artikel berita ini akan dihapus secara permanen dari basis data dan portal berita sekolah."
        confirmText="Hapus Berita"
        cancelText="Batal"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
