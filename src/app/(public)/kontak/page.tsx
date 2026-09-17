"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendContactMessage } from "@/actions/contact"

const ContactFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  subject: z.string().min(3, "Subjek pesan minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
})

type ContactFormData = z.infer<typeof ContactFormSchema>

export default function KontakPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("subject", data.subject)
    formData.append("message", data.message)

    try {
      const res = await sendContactMessage(formData)
      if (res.success) {
        setIsSuccess(true)
        toast.success("Pesan Anda telah berhasil dikirim!")
        reset()
      } else {
        toast.error(res.error || "Gagal mengirim pesan")
      }
    } catch {
      toast.error("Terjadi kesalahan sistem")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="px-3.5 py-1 text-xs">
          Hubungi Kami
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Kontak & Informasi Layanan
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Punya pertanyaan seputar program pendidikan, kemitraan industri, atau PPDB? Tim kami siap membantu Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="rounded-3xl border bg-card/60 backdrop-blur-xs shadow-xs p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Sekretariat & Pelayanan
            </h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-xs uppercase tracking-wider">
                    Alamat Kampus
                  </p>
                  <p className="mt-1 leading-relaxed">
                    Jl. Pendidikan Generasi No. 45, Kebayoran Baru, Jakarta Selatan 12150
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-xs uppercase tracking-wider">
                    Telepon & WhatsApp
                  </p>
                  <p className="mt-1">(021) 7890-1234 / 0812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-xs uppercase tracking-wider">
                    Surat Elektronik (Email)
                  </p>
                  <p className="mt-1">info@smkn1digital.sch.id</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-xs uppercase tracking-wider">
                    Jam Operasional Loket
                  </p>
                  <p className="mt-1">Senin - Jumat: 07.30 - 16.00 WIB</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    (Sabtu, Minggu & Hari Libur Nasional Tutup)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Google Maps Embed */}
          <div className="rounded-3xl border overflow-hidden aspect-[16/10] w-full bg-muted shadow-xs">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.297495914101!2d106.8000!3d-6.2244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMjcuOCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Kampus"
            />
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="rounded-3xl border bg-card/80 backdrop-blur-xs p-6 sm:p-10 shadow-md">
            <CardContent className="p-0 space-y-6">
              <div className="space-y-1 text-left">
                <Badge variant="secondary" className="text-xs">
                  Kirim Pesan
                </Badge>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Tinggalkan Pesan Anda
                </h3>
                <p className="text-xs text-muted-foreground">
                  Pertanyaan Anda akan diteruskan ke tim humas atau panitia PPDB terkait.
                </p>
              </div>

              {isSuccess ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-lg text-foreground">
                    Terima Kasih Atas Pesan Anda!
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Pesan Anda telah kami terima dan akan segera ditindaklanjuti oleh staf sekolah kami melalui email.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">
                        Nama Lengkap Anda *
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="Nama Anda"
                        className="rounded-xl"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">
                        Alamat Email Aktif *
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        placeholder="email@domain.com"
                        className="rounded-xl"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">
                      Subjek / Topik *
                    </label>
                    <Input
                      {...register("subject")}
                      placeholder="Contoh: Pertanyaan Syarat PPDB Jalur Prestasi"
                      className="rounded-xl"
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">
                      Isi Pesan Lengkap *
                    </label>
                    <Textarea
                      {...register("message")}
                      placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda sampaikan secara jelas..."
                      rows={5}
                      className="rounded-xl"
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl font-bold shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Mengirim Pesan...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Kirim Pesan Sekarang
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
