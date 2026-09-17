"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  Newspaper,
  Plus,
  Pencil,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingNews, setEditingNews] = React.useState<NewsItem | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadNews = async () => {
    try {
      const res = await fetch("/api/news")
      if (res.ok) {
        const data = await res.json()
        setNewsList(data.news || [])
      }
    } catch {
      setNewsList([
        {
          id: "n-1",
          title: "Siswa SMK Digital Raih Medali Emas LKS Nasional Bidang Cloud Computing",
          slug: "siswa-smk-digital-raih-emas-lks-nasional",
          content: "Jakarta - Raditya Pratama berhasil menyabet medali emas LKS...",
          isPublished: true,
          publishedAt: new Date().toISOString(),
          views: 342,
          categoryId: "cat-1",
          category: { name: "Prestasi Siswa" },
        },
      ])
    }
  }

  React.useEffect(() => {
    loadNews()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus berita ini secara permanen?")) {
      const res = await deleteNews(id)
      if (res.success) {
        toast.success("Berita berhasil dihapus")
        setNewsList((prev) => prev.filter((n) => n.id !== id))
      } else {
        toast.error(res.error || "Gagal menghapus")
      }
    }
  }

  const handleTogglePublish = async (id: string, current: boolean) => {
    const res = await togglePublishNews(id, current)
    if (res.success) {
      toast.success(`Status berita diubah menjadi ${!current ? "Published" : "Draft"}`)
      setNewsList((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isPublished: !current } : n))
      )
    } else {
      toast.error("Gagal mengubah status")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)

    try {
      if (editingNews) {
        const res = await updateNews(editingNews.id, formData)
        if (res.success) {
          toast.success("Berita berhasil diperbarui!")
          setIsDialogOpen(false)
          setEditingNews(null)
          loadNews()
        } else {
          toast.error(res.error || "Gagal memperbarui")
        }
      } else {
        const res = await createNews(formData)
        if (res.success) {
          toast.success("Berita berhasil diterbitkan!")
          setIsDialogOpen(false)
          loadNews()
        } else {
          toast.error(res.error || "Gagal membuat berita")
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Warta & Artikel Berita
          </h1>
          <p className="text-xs text-muted-foreground">
            Publikasikan artikel seputar prestasi, kurikulum, dan kegiatan sekolah.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingNews(null)
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-xl gap-1.5">
              <Plus className="h-4 w-4" />
              Tulis Berita Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? "Edit Artikel Berita" : "Tulis Berita Baru"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Judul Berita *</label>
                <Input
                  name="title"
                  defaultValue={editingNews?.title || ""}
                  required
                  placeholder="Judul artikel yang menarik..."
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Kategori *</label>
                  <select
                    name="categoryId"
                    defaultValue={editingNews?.categoryId || "cat-1"}
                    className="w-full h-9 rounded-xl border bg-transparent px-3 text-xs"
                  >
                    <option value="cat-1">Prestasi Siswa</option>
                    <option value="cat-2">Akademik & Kurikulum</option>
                    <option value="cat-3">Kegiatan Sekolah</option>
                    <option value="cat-4">Kerjasama Industri</option>
                    <option value="cat-5">Info PPDB</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Status Publikasi</label>
                  <select
                    name="isPublished"
                    defaultValue={editingNews ? String(editingNews.isPublished) : "true"}
                    className="w-full h-9 rounded-xl border bg-transparent px-3 text-xs"
                  >
                    <option value="true">Langsung Terbitkan (Publish)</option>
                    <option value="false">Simpan Sebagai Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Ringkasan Singkat (Excerpt)</label>
                <Textarea
                  name="excerpt"
                  defaultValue={editingNews?.excerpt || ""}
                  rows={2}
                  className="rounded-xl text-xs"
                  placeholder="Kutipan 1-2 kalimat untuk preview berita..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Konten Lengkap Berita *</label>
                <Textarea
                  name="content"
                  defaultValue={editingNews?.content || ""}
                  required
                  rows={7}
                  className="rounded-xl text-xs"
                  placeholder="Tuliskan isi artikel berita secara mendalam..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">URL Gambar Thumbnail</label>
                <Input
                  name="thumbnail"
                  defaultValue={editingNews?.thumbnail || ""}
                  placeholder="https://images.unsplash.com/..."
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingNews ? (
                    "Simpan Perubahan"
                  ) : (
                    "Publikasikan Berita"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>Judul Berita</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-xs text-muted-foreground">
                  Belum ada artikel berita.
                </TableCell>
              </TableRow>
            ) : (
              newsList.map((item) => (
                <TableRow key={item.id} className="text-xs">
                  <TableCell className="font-semibold text-foreground max-w-sm truncate">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {item.category?.name || "Umum"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {item.views}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleTogglePublish(item.id, item.isPublished)}
                      className="cursor-pointer"
                    >
                      <Badge
                        variant={item.isPublished ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                          setEditingNews(item)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
