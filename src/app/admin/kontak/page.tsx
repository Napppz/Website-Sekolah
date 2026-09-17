"use client"

import * as React from "react"
import { toast } from "sonner"
import { MessageSquare, Mail, Trash2, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { markMessageRead, deleteContactMessage } from "@/actions/contact"

interface MessageItem {
  id: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function AdminKontakPage() {
  const [messages, setMessages] = React.useState<MessageItem[]>([])

  const loadData = async () => {
    try {
      const res = await fetch("/api/contact")
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
      }
    } catch {
      setMessages([
        {
          id: "m-1",
          name: "Irwan Santoso",
          email: "irwan@gmail.com",
          subject: "Pertanyaan Kuota Jalur Prestasi PPDB 2026",
          message: "Selamat siang Bapak/Ibu, apakah sertifikat kejuaraan karate provinsi dapat digunakan?",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ])
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleToggleRead = async (id: string, current: boolean) => {
    const res = await markMessageRead(id, !current)
    if (res.success) {
      toast.success(!current ? "Pesan ditandai sudah dibaca" : "Pesan ditandai belum dibaca")
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: !current } : m))
      )
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Hapus pesan ini?")) {
      const res = await deleteContactMessage(id)
      if (res.success) {
        toast.success("Pesan berhasil dihapus")
        setMessages((prev) => prev.filter((m) => m.id !== id))
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Pesan Masuk (Form Kontak)
        </h1>
        <p className="text-xs text-muted-foreground">
          Daftar pertanyaan dan aspirasi dari masyarakat serta calon wali murid.
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-16 border rounded-2xl bg-muted/20 text-muted-foreground text-xs">
            Kotak pesan masuk kosong.
          </div>
        ) : (
          messages.map((item) => (
            <Card
              key={item.id}
              className={`rounded-2xl border transition-all ${
                !item.isRead ? "border-primary/50 bg-primary/5" : "bg-card"
              }`}
            >
              <CardContent className="p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{item.name}</span>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" />
                      {item.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={item.isRead ? "outline" : "default"} className="text-[10px]">
                      {item.isRead ? "Sudah Dibaca" : "Pesan Baru"}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-base text-foreground">{item.subject}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.message}
                </p>

                <div className="pt-2 flex items-center justify-between border-t text-xs">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-8"
                    onClick={() => handleToggleRead(item.id, item.isRead)}
                  >
                    {item.isRead ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
