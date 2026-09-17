# 🏫 Sistem Informasi Website Sekolah (Full-Stack)

Aplikasi web **Sistem Informasi Sekolah** modern, responsif, berkinerja tinggi, dan berstandar profesional industri yang dibangun khusus sebagai portfolio mahasiswa Informatika. Proyek ini menggabungkan portal publik yang informatif dan elegan dengan panel dashboard administrator yang terlindungi untuk pengelolaan data terintegrasi.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/) (Strict Type-Safety)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma ORM](https://www.prisma.io/) (Skema relasional lengkap, Indexing, Auto-generated types)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Autentikasi:** [Auth.js (NextAuth v5)](https://authjs.dev/) dengan Credentials Provider & JWT Session
- **Enkripsi Password:** [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Validasi Data:** [Zod](https://zod.dev/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Icons & Notifikasi:** [Lucide React](https://lucide.dev/) & [Sonner Toast](https://sonner.emilkowal.ski/)
- **Dark Mode:** [next-themes](https://github.com/pacocoursey/next-themes) (Light, Dark, System)

---

## 🌟 Fitur Utama

### 🌐 1. Website Publik (Tanpa Login)
- **Beranda (`/`):** Hero section dinamis, Sambutan Kepala Sekolah, Metrik Statistik Sekolah, Keunggulan, Showcase 5 Jurusan, Berita Terbaru, Pengumuman Resmi, Agenda Mendatang, Galeri Foto Sekilas, dan Banner CTA PPDB.
- **Profil Sekolah (`/profil`):** Sejarah institusi, Visi, Misi, Tujuan, Sambutan Kepala Sekolah lengkap, dan Bagan Struktur Organisasi interaktif.
- **Direktori Guru (`/guru`):** Kartu data guru dengan foto, NIP, nama & gelar, mata pelajaran, pencarian real-time, dan filter.
- **Statistik Siswa (`/siswa`):** Agregat demografi total siswa, rasio gender (laki-laki vs perempuan), rombongan belajar (kelas), dan sebaran per program keahlian.
- **Program Keahlian / Jurusan (`/jurusan`):** Detail 5 program keahlian unggulan (RPL, TJKT, DKV, MPLB, AKL) lengkap dengan kompetensi silabus dan prospek karir alumni.
- **Fasilitas Kampus (`/fasilitas`):** Galeri sarana prasarana sekolah (Lab Komputer AI, Studio Multimedia, DigiLib, Aula, dll.) dengan filter kategori, kapasitas, dan kondisi.
- **Portal Berita (`/berita` & `/berita/[slug]`):** Warta sekolah dengan pencarian judul, filter kategori, pagination, hit counter views, dan halaman detail artikel SEO-friendly.
- **Pengumuman Resmi (`/pengumuman`):** Pemberitahuan kedinasan dan arsip edaran dilengkapi tautan download lampiran dokumen.
- **Kalender Agenda (`/agenda`):** Jadwal kegiatan akademik dan ekstrakurikuler dengan badge tanggal dan lokasi.
- **Prestasi Siswa & Guru (`/prestasi`):** Galeri penghargaan kejuaraan tingkat Kota, Provinsi, Nasional, dan Internasional.
- **Galeri Foto (`/galeri`):** Masonry grid dokumentasi sekolah dengan filter album dan lightbox modal viewer.
- **Informasi PPDB (`/ppdb`):** Panduan alur 4 langkah, jadwal gelombang seleksi, syarat berkas, dan FAQ accordion.
- **Formulir PPDB Online (`/ppdb/daftar`):** Pendaftaran calon peserta didik baru ber-validasi Zod yang menghasilkan Nomor Registrasi unik (`PPDB-2026-XXXX`) secara otomatis.
- **Kontak & Lokasi (`/kontak`):** Alamat lengkap, nomor telepon, jam operasional, Google Maps interaktif, dan form kirim pesan langsung ke admin.

### 🛡️ 2. Admin Dashboard (Terlindungi Auth.js)
- **Login Autentikasi (`/admin/login`):** Validasi kredensial email dan password ter-hash bcrypt. Dilindungi middleware Next.js agar rute `/admin/*` tidak dapat diakses publik.
- **Dashboard Overview (`/admin`):**
  - 7 Kartu KPI Statistik: Total Guru, Siswa, Jurusan, Berita, Pengumuman, Prestasi, dan Pendaftar PPDB.
  - Tabel Pendaftar PPDB Terbaru dengan status badge verifikasi.
  - Feed Berita Terbaru & Pesan Masuk yang belum dibaca.
- **Modul CRUD Admin Lengkap:**
  - **Manajemen Guru (`/admin/guru`):** Tambah, edit, hapus guru, NIP, mapel, jabatan, foto, pencarian.
  - **Manajemen Siswa (`/admin/siswa`):** Tambah, edit, hapus siswa, NISN, NIS, kelas, jurusan.
  - **Manajemen Jurusan (`/admin/jurusan`):** Tambah, edit, hapus program keahlian, kompetensi, prospek kerja.
  - **Manajemen Fasilitas (`/admin/fasilitas`):** Kelola fasilitas, kondisi, kapasitas, kategori.
  - **Manajemen Berita (`/admin/berita`):** Tulis artikel, slug otomatis, toggle publish/draft, kategori, edit, hapus.
  - **Manajemen Pengumuman (`/admin/pengumuman`):** Terbitkan pengumuman resmi, toggle status aktif, file lampiran.
  - **Manajemen Agenda (`/admin/agenda`):** Buat agenda, lokasi, tanggal mulai & selesai.
  - **Manajemen Prestasi (`/admin/prestasi`):** Catat prestasi juara, peserta, tingkat, tahun, kategori.
  - **Manajemen Galeri (`/admin/galeri`):** Unggah dokumentasi foto dan album kegiatan.
  - **Verifikasi PPDB (`/admin/ppdb`):** Ubah status pendaftar (`PENDING`, `VERIFIED`, `ACCEPTED`, `REJECTED`), catatan panitia, unduh berkas.
  - **Kotak Pesan (`/admin/kontak`):** Kelola pesan masuk dari pengunjung, tandai telah dibaca, hapus pesan.
  - **Pengaturan Profil (`/admin/profil`):** Edit profil institusi, visi, misi, sejarah, sambutan kepala sekolah, dan kontak resmi.

---

## 🔑 Akun Default Administrator

Gunakan akun berikut untuk login ke dashboard admin:

- **URL Login:** `http://localhost:3000/admin/login`
- **Email:** `admin@sekolah.test`
- **Password:** `Admin123!`

> [!WARNING]
> Kredensial di atas dibuat khusus untuk keperluan demonstrasi dan pengujian lokal (development). Di lingkungan produksi, ubah kata sandi melalui database atau panel profil administrator.

---

## ⚙️ Persyaratan Sistem

- **Node.js:** v18.18+ atau v20+ / v22+
- **NPM:** v9+ atau v10+
- **Database:** PostgreSQL (Lokal v14+ / Docker / Cloud PostgreSQL seperti Neon atau Aiven)

---

## 📦 Panduan Instalasi & Menjalankan Proyek

### 1. Clone atau Buka Direktori Proyek
```bash
cd "c:\Users\PC\Documents\Projekl\Web Sekolah"
```

### 2. Konfigurasi Variabel Lingkungan (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan string koneksi database PostgreSQL pada file `.env`:
```env
# Format: postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sekolah_db?schema=public"

# Auth Secret (dapat di-generate via `openssl rand -base64 32`)
AUTH_SECRET="f6c80520268a2bf189bb53e7a02798e47f71120f269dc03c810b411d7fbebf91"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Persiapan Database PostgreSQL

Jika Anda menggunakan PostgreSQL lokal, pastikan service PostgreSQL aktif dan database `sekolah_db` telah dibuat:
```sql
CREATE DATABASE sekolah_db;
```

*(Atau jika menggunakan Docker):*
```bash
docker run --name postgres-sekolah -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=sekolah_db -p 5432:5432 -d postgres:16
```

### 4. Sinkronisasi Skema Prisma & Seeding Data
Jalankan perintah Prisma untuk sinkronisasi tabel dan mengisi data dummy realistis:
```bash
# Generate Prisma Client Types
npx prisma generate

# Dorong skema database ke PostgreSQL
npx prisma db push

# Isi database dengan 100+ data awal realistis
npx prisma db seed
```

> **Data yang di-seed otomatis:**
> - 1 Akun Admin (`admin@sekolah.test`)
> - 1 Profil Lengkap Sekolah & Visi Misi
> - 5 Program Keahlian (RPL, TJKT, DKV, MPLB, AKL)
> - 20 Tenaga Pendidik / Guru lengkap dengan foto & NIP
> - 50 Data Siswa aktif
> - 10 Sarana & Fasilitas Sekolah
> - 15 Artikel Berita & Kategori
> - 10 Pengumuman Resmi
> - 10 Agenda & Kegiatan Mendatang
> - 10 Penghargaan Prestasi
> - 20 Foto Galeri Kampus
> - 5 Data Pendaftaran PPDB awal
> - 3 Pesan Kontak masuk

### 5. Jalankan Server Development
```bash
npm run dev
```
Buka peramban (browser) di:
- **Website Publik:** [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

### 6. Build Produksi
Untuk menguji performa bundle produksi:
```bash
npm run build
npm run start
```

---

## 📁 Struktur Folder Proyek

```text
├── prisma/
│   ├── schema.prisma         # Skema relasional PostgreSQL (User, Guru, Siswa, Berita, PPDB, dll.)
│   └── seed.ts               # Script seeding data realistis Indonesia
│
├── public/
│   └── uploads/              # Direktori penyimpanan berkas gambar & dokumen lokal
│
├── src/
│   ├── actions/              # Server Actions Next.js (Mutasi data aman dengan Zod)
│   │   ├── achievements.ts
│   │   ├── announcements.ts
│   │   ├── contact.ts
│   │   ├── events.ts
│   │   ├── facilities.ts
│   │   ├── gallery.ts
│   │   ├── majors.ts
│   │   ├── news.ts
│   │   ├── ppdb.ts
│   │   ├── profile.ts
│   │   ├── students.ts
│   │   └── teachers.ts
│   │
│   ├── app/
│   │   ├── (public)/         # Rute Website Publik (14 halaman)
│   │   │   ├── layout.tsx    # Wrapper Navbar & Footer publik
│   │   │   ├── page.tsx      # Beranda (Hero, Sambutan, Jurusan, Berita, PPDB CTA)
│   │   │   ├── profil/
│   │   │   ├── guru/
│   │   │   ├── siswa/
│   │   │   ├── jurusan/
│   │   │   ├── fasilitas/
│   │   │   ├── berita/
│   │   │   │   └── [slug]/   # Detail Berita dinamis (SEO slug)
│   │   │   ├── pengumuman/
│   │   │   ├── agenda/
│   │   │   ├── prestasi/
│   │   │   ├── galeri/
│   │   │   ├── ppdb/
│   │   │   │   └── daftar/   # Formulir PPDB interaktif
│   │   │   └── kontak/
│   │   │
│   │   ├── admin/            # Rute Panel Admin (Terlindungi)
│   │   │   ├── layout.tsx    # Sidebar dinamis & header admin
│   │   │   ├── page.tsx      # Overview Dashboard & KPI
│   │   │   ├── login/        # Halaman Login Admin
│   │   │   ├── guru/         # CRUD Guru
│   │   │   ├── siswa/        # CRUD Siswa
│   │   │   ├── jurusan/      # CRUD Jurusan
│   │   │   ├── fasilitas/    # CRUD Fasilitas
│   │   │   ├── berita/       # CRUD Berita & Publish Toggle
│   │   │   ├── pengumuman/   # CRUD Pengumuman
│   │   │   ├── agenda/       # CRUD Agenda
│   │   │   ├── prestasi/     # CRUD Prestasi
│   │   │   ├── galeri/       # CRUD Galeri
│   │   │   ├── ppdb/         # Verifikasi Status PPDB
│   │   │   ├── kontak/       # Kotak Masuk Pesan
│   │   │   └── profil/       # Pengaturan Profil Sekolah
│   │   │
│   │   ├── api/              # API Route Handlers (Auth, Upload, Rest data)
│   │   │   ├── auth/
│   │   │   ├── upload/
│   │   │   └── ...
│   │   ├── robots.ts         # SEO Robots.txt
│   │   ├── sitemap.ts        # SEO Sitemap dinamis
│   │   └── not-found.tsx     # Custom 404 Page
│   │
│   ├── components/
│   │   ├── ui/               # Komponen shadcn/ui
│   │   ├── public/           # Navbar, Footer, GalleryViewer
│   │   ├── admin/            # AdminLayoutShell
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts         # Singleton Prisma Client
│   │   ├── data.ts           # Data access query layer
│   │   ├── storage.ts        # File upload abstraction layer
│   │   └── utils.ts
│   │
│   ├── auth.ts               # Konfigurasi Auth.js v5
│   └── middleware.ts         # Proteksi rute /admin/*
│
├── .env.example
├── .gitignore
├── components.json
├── package.json
└── tsconfig.json
```

---

## 🔒 Keamanan (Security Best Practices)
1. **Password Hashing:** Menggunakan algoritma `bcryptjs` dengan salt round 10. Password tidak pernah disimpan dalam plain text.
2. **Otorisasi Rute:** Middleware memeriksa cookie sesi `authjs.session-token` sebelum mengizinkan akses ke panel admin.
3. **Validasi Input:** Seluruh data yang dikirim melalui form divalidasi dua lapis (Client & Server Actions) menggunakan pustaka `Zod`.
4. **SQL Injection Protection:** Prisma ORM menggunakan parameterized queries untuk mencegah serangan SQL Injection secara menyeluruh.
5. **File Upload Security:** Pembatasan ukuran berkas (maksimal 10MB) dan sanitasi nama file serta whitelist MIME type (JPG, PNG, WEBP, PDF).

---

## 📄 Lisensi & Hak Cipta
Dibuat untuk keperluan akademik dan portofolio keahlian mahasiswa Informatika. Hak Cipta &copy; 2026.
