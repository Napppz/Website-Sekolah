"use client"

import * as React from "react"
import { toast } from "sonner"
import { School, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { updateSchoolProfile } from "@/actions/profile"

export default function AdminProfilPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [profile, setProfile] = React.useState<any>(null)

  React.useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data.profile))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)

    try {
      const res = await updateSchoolProfile(formData)
      if (res.success) {
        toast.success("Profil sekolah berhasil diperbarui!")
      } else {
        toast.error(res.error || "Gagal memperbarui profil")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Pengaturan Profil Sekolah
        </h1>
        <p className="text-xs text-muted-foreground">
          Ubah informasi identitas sekolah, visi misi, sambutan kepala sekolah, dan kontak resmi.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Identitas Dasar */}
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-base">Identitas Institusi</CardTitle>
            <CardDescription className="text-xs">
              Nama resmi, NPSN, dan akreditasi sekolah
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold">Nama Sekolah *</label>
                <Input
                  name="name"
                  defaultValue={profile?.name || "SMK Negeri 1 Digital Nusantara"}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">NPSN *</label>
                <Input
                  name="npsn"
                  defaultValue={profile?.npsn || "20109988"}
                  required
                  className="rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Status Akreditasi *</label>
                <Input
                  name="accreditation"
                  defaultValue={profile?.accreditation || "A (Unggul)"}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Slogan / Motto *</label>
                <Input
                  name="slogan"
                  defaultValue={
                    profile?.slogan ||
                    "Membentuk Generasi Cerdas, Berkarakter, dan Berdaya Saing Global"
                  }
                  required
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Deskripsi Singkat *</label>
              <Textarea
                name="description"
                defaultValue={
                  profile?.description ||
                  "SMK Negeri 1 Digital Nusantara adalah institusi pendidikan kejuruan unggulan..."
                }
                required
                rows={3}
                className="rounded-xl text-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Visi, Misi, Sejarah & Tujuan */}
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-base">Visi, Misi & Sejarah</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Sejarah Sekolah</label>
              <Textarea
                name="history"
                defaultValue={profile?.history || ""}
                rows={3}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Visi Sekolah</label>
              <Textarea
                name="vision"
                defaultValue={profile?.vision || ""}
                rows={2}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Misi Sekolah</label>
              <Textarea
                name="mission"
                defaultValue={profile?.mission || ""}
                rows={4}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Tujuan Sekolah</label>
              <Textarea
                name="goals"
                defaultValue={profile?.goals || ""}
                rows={3}
                className="rounded-xl text-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. Kepala Sekolah */}
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-base">Data Kepala Sekolah</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Nama Lengkap & Gelar</label>
                <Input
                  name="principalName"
                  defaultValue={profile?.principalName || "Dr. H. Ahmad Fauzi, M.Pd."}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Jabatan</label>
                <Input
                  name="principalTitle"
                  defaultValue={profile?.principalTitle || "Kepala Sekolah"}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">URL Foto Kepala Sekolah</label>
              <Input
                name="principalPhoto"
                defaultValue={profile?.principalPhoto || ""}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Sambutan Kepala Sekolah</label>
              <Textarea
                name="principalSpeech"
                defaultValue={profile?.principalSpeech || ""}
                rows={5}
                className="rounded-xl text-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* 4. Kontak & Lokasi */}
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-base">Kontak & Media Sosial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Alamat Lengkap</label>
              <Input
                name="address"
                defaultValue={profile?.address || ""}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Nomor Telepon</label>
                <Input
                  name="phone"
                  defaultValue={profile?.phone || ""}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Alamat Email</label>
                <Input
                  name="email"
                  defaultValue={profile?.email || ""}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Website</label>
                <Input
                  name="website"
                  defaultValue={profile?.website || ""}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Instagram</label>
                <Input
                  name="instagramUrl"
                  defaultValue={profile?.instagramUrl || ""}
                  className="rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Facebook</label>
                <Input
                  name="facebookUrl"
                  defaultValue={profile?.facebookUrl || ""}
                  className="rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">YouTube</label>
                <Input
                  name="youtubeUrl"
                  defaultValue={profile?.youtubeUrl || ""}
                  className="rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Twitter</label>
                <Input
                  name="twitterUrl"
                  defaultValue={profile?.twitterUrl || ""}
                  className="rounded-xl text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pt-2">
          <Button type="submit" size="lg" disabled={isSubmitting} className="rounded-xl">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Menyimpan Perubahan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Simpan Profil Sekolah
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
