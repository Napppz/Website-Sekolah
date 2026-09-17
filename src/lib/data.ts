import { prisma } from "@/lib/prisma"

// Fallback profile data
const DEFAULT_PROFILE = {
  id: "main-school-profile",
  name: "SMK Negeri 1 Digital Nusantara",
  npsn: "20109988",
  accreditation: "A (Unggul)",
  slogan: "Membentuk Generasi Cerdas, Berkarakter, dan Berdaya Saing Global",
  description:
    "SMK Negeri 1 Digital Nusantara adalah institusi pendidikan kejuruan unggulan yang berfokus pada penguasaan teknologi informasi terdepan, integritas kepemimpinan, dan kemandirian wirausaha kreatif.",
  history:
    "Didirikan pada tahun 1998, SMK Negeri 1 Digital Nusantara telah bertransformasi dari sekolah kejuruan teknik konvensional menjadi pusat rujukan keunggulan digital nasional (Center of Excellence). Sekolah ini telah meluluskan ribuan talenta yang kini berkiprah di perusahaan teknologi multinasional, BUMN, dan menjadi technopreneur sukses.",
  vision:
    "Menjadi pusat keunggulan pendidikan vokasi yang berkarakter Pancasila, adaptif terhadap kemajuan sains dan teknologi global, serta berwawasan lingkungan.",
  mission:
    "1. Menyelenggarakan proses pembelajaran berkualitas berbasis kurikulum industri dan teknologi modern.\n2. Menanamkan nilai-nilai religius, etika profesional, dan budaya kerja industri.\n3. Mengembangkan kemitraan strategis dengan dunia usaha dan dunia industri (DUDI) skala nasional dan internasional.\n4. Mendorong inovasi dan jiwa technopreneurship peserta didik yang relevan dengan tantangan masa depan.",
  goals:
    "1. Mencetak lulusan yang terserap di industri sebesar minimal 90% dalam waktu 6 bulan pasca kelulusan.\n2. Mempersiapkan siswa melanjutkan ke perguruan tinggi terkemuka dan mandiri berwirausaha.\n3. Mempertahankan predikat sekolah berbudaya mutu dan ramah lingkungan tingkat nasional.",
  principalName: "Dr. H. Ahmad Fauzi, M.Pd.",
  principalTitle: "Kepala Sekolah",
  principalSpeech:
    "Assalamu'alaikum Warahmatullahi Wabarakatuh,\nSalam sejahtera untuk kita semua.\n\nSelamat datang di portal resmi SMK Negeri 1 Digital Nusantara. Era transformasi kecerdasan buatan dan industri 5.0 menuntut institusi pendidikan untuk terus bergerak maju, cepat, dan terarah. Kami berkomitmen menyediakan lingkungan belajar yang menginspirasi, fasilitas laboratorium berstandar industri, serta bimbingan tenaga pendidik yang berdedikasi tinggi.\n\nWebsite ini hadir sebagai jendela transparansi informasi, wahana silaturahmi civitas akademika, dan sarana pendaftaran bagi calon peserta didik generasi penerus bangsa. Mari melangkah bersama menyongsong masa depan cerah.",
  principalPhoto:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
  address: "Jl. Pendidikan Generasi No. 45, Kebayoran Baru, Jakarta Selatan 12150",
  phone: "(021) 7890-1234 / 0812-3456-7890",
  email: "info@smkn1digital.sch.id",
  website: "https://smkn1digital.sch.id",
  mapsUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.297495914101!2d106.8000!3d-6.2244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMjcuOCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
  facebookUrl: "https://facebook.com/smkn1digital",
  instagramUrl: "https://instagram.com/smkn1digital",
  youtubeUrl: "https://youtube.com/@smkn1digital",
  twitterUrl: "https://twitter.com/smkn1digital",
}

const DEFAULT_MAJORS = [
  {
    id: "major-1",
    code: "RPL",
    name: "Rekayasa Perangkat Lunak",
    slug: "rekayasa-perangkat-lunak",
    description: "Pengembangan software modern, web apps, mobile apps, dan AI.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    competencies: "Full-Stack Web, Mobile Apps Flutter/React Native, Database Engineering, CI/CD.",
    careerProspects: "Frontend/Backend Engineer, Mobile Dev, QA Tester, UI/UX Designer.",
  },
  {
    id: "major-2",
    code: "TJKT",
    name: "Teknik Jaringan Komputer & Telekomunikasi",
    slug: "teknik-jaringan-komputer-dan-telekomunikasi",
    description: "Infrastruktur jaringan, server Linux/Windows, dan keamanan siber.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    competencies: "Cisco & MikroTik Routing, Server Virtualization, Cybersecurity, Fiber Optic.",
    careerProspects: "Network Administrator, DevOps Junior, Cyber Security Analyst.",
  },
  {
    id: "major-3",
    code: "DKV",
    name: "Desain Komunikasi Visual & Multimedia",
    slug: "desain-komunikasi-visual",
    description: "Desain grafis, motion graphic, videografi, dan animasi 3D.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    competencies: "Adobe Creative Cloud, 3D Blender, UI/UX Figma, Video Editing.",
    careerProspects: "Graphic Designer, Video Editor, Brand Strategist, 3D Artist.",
  },
  {
    id: "major-4",
    code: "MPLB",
    name: "Manajemen Perkantoran & Layanan Bisnis",
    slug: "manajemen-perkantoran-dan-layanan-bisnis",
    description: "Otomasi perkantoran modern, public relations, dan bisnis digital.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    competencies: "Digital Office Automation, Public Relations, Kearsipan Digital, Payroll.",
    careerProspects: "Executive Assistant, Office Administrator, PR Officer.",
  },
  {
    id: "major-5",
    code: "AKL",
    name: "Akuntansi & Keuangan Lembaga",
    slug: "akuntansi-dan-keuangan-lembaga",
    description: "Siklus akuntansi, perpajakan modern, dan software keuangan terstandar.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    competencies: "Siklus Akuntansi, Accurate/MYOB, Pajak PPh & PPN, Analisis Keuangan.",
    careerProspects: "Junior Accountant, Tax Compliance Officer, Financial Staff.",
  },
]

export async function getSchoolProfile() {
  try {
    const profile = await prisma.schoolProfile.findFirst()
    return profile || DEFAULT_PROFILE
  } catch {
    return DEFAULT_PROFILE
  }
}

export async function getMajors() {
  try {
    const majors = await prisma.major.findMany({
      orderBy: { code: "asc" },
      include: {
        _count: {
          select: { students: true, ppdbRegistrations: true },
        },
      },
    })
    return majors.length > 0 ? majors : DEFAULT_MAJORS
  } catch {
    return DEFAULT_MAJORS
  }
}

export async function getMajorBySlug(slug: string) {
  try {
    const major = await prisma.major.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { students: true },
        },
      },
    })
    return major || DEFAULT_MAJORS.find((m) => m.slug === slug) || null
  } catch {
    return DEFAULT_MAJORS.find((m) => m.slug === slug) || null
  }
}

export async function getTeachers(query?: string, subject?: string, page = 1, limit = 12) {
  try {
    const where: any = {}
    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { subject: { contains: query, mode: "insensitive" } },
      ]
    }
    if (subject && subject !== "ALL") {
      where.subject = { contains: subject, mode: "insensitive" }
    }

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        orderBy: [{ order: "asc" }, { name: "asc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.teacher.count({ where }),
    ])

    return { teachers, total, totalPages: Math.ceil(total / limit) }
  } catch {
    return {
      teachers: [
        {
          id: "t-1",
          nip: "197508152000031001",
          name: "Drs. Bambang Sulistyo, M.Kom.",
          gender: "L",
          position: "Wakil Kepala Sekolah Bid. Kurikulum",
          subject: "Pemrograman Web & Perangkat Bergerak",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
          email: "bambang.s@smkn1digital.sch.id",
        },
        {
          id: "t-2",
          nip: "198203122005012003",
          name: "Siti Rahmawati, S.Pd., M.Pd.",
          gender: "P",
          position: "Wakil Kepala Sekolah Bid. Kesiswaan",
          subject: "Bahasa Indonesia & Literasi Digital",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
          email: "siti.rahmawati@smkn1digital.sch.id",
        },
        {
          id: "t-3",
          nip: "198411202008011005",
          name: "Ir. Hendra Gunawan, M.T.",
          gender: "L",
          position: "Ketua Program Keahlian RPL",
          subject: "Basis Data & Rekayasa Perangkat Lunak",
          photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
          email: "hendra.gunawan@smkn1digital.sch.id",
        },
        {
          id: "t-4",
          nip: "198904052012021008",
          name: "Dimas Arya Pratama, S.Kom.",
          gender: "L",
          position: "Ketua Program Keahlian TJKT",
          subject: "Administrasi Infrastruktur Jaringan",
          photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
          email: "dimas.arya@smkn1digital.sch.id",
        },
      ],
      total: 4,
      totalPages: 1,
    }
  }
}

export async function getStudentsStats() {
  try {
    const [total, maleCount, femaleCount, majors] = await Promise.all([
      prisma.student.count(),
      prisma.student.count({ where: { gender: "L" } }),
      prisma.student.count({ where: { gender: "P" } }),
      prisma.major.findMany({
        include: {
          _count: {
            select: { students: true },
          },
        },
      }),
    ])

    return {
      total: total || 785,
      maleCount: maleCount || 420,
      femaleCount: femaleCount || 365,
      classCount: 24,
      majors: majors.map((m) => ({
        name: m.name,
        code: m.code,
        count: m._count?.students || 150,
      })),
    }
  } catch {
    return {
      total: 785,
      maleCount: 420,
      femaleCount: 365,
      classCount: 24,
      majors: [
        { name: "Rekayasa Perangkat Lunak", code: "RPL", count: 180 },
        { name: "Teknik Jaringan Komputer", code: "TJKT", count: 165 },
        { name: "Desain Komunikasi Visual", code: "DKV", count: 160 },
        { name: "Manajemen Perkantoran", code: "MPLB", count: 140 },
        { name: "Akuntansi & Keuangan", code: "AKL", count: 140 },
      ],
    }
  }
}

export async function getFacilities(category?: string) {
  try {
    const where = category && category !== "ALL" ? { category } : {}
    const facilities = await prisma.facility.findMany({
      where,
      orderBy: { name: "asc" },
    })
    return facilities
  } catch {
    return [
      {
        id: "f-1",
        name: "Laboratorium Komputer & AI Center",
        slug: "lab-komputer-ai",
        category: "Laboratorium",
        capacity: 40,
        condition: "Sangat Baik",
        description: "40 unit PC Intel Core i7, GPU RTX 4060, fiber optic dedicated.",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "f-2",
        name: "Studio Multimedia & Broadcasting",
        slug: "studio-multimedia",
        category: "Studio",
        capacity: 30,
        condition: "Sangat Baik",
        description: "Green screen studio, lighting broadcast 3-point, kamera cinema 4K.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "f-3",
        name: "Perpustakaan Digital Nusantara (DigiLib)",
        slug: "perpustakaan-digital",
        category: "Umum",
        capacity: 100,
        condition: "Sangat Baik",
        description: "20 unit OPAC touchscreen tablet, 15.000 e-book berlisensi, cafe literasi.",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "f-4",
        name: "Aula Serbaguna Graha Nusantara",
        slug: "aula-graha-nusantara",
        category: "Umum",
        capacity: 800,
        condition: "Sangat Baik",
        description: "Sound system line-array JBL, videotron LED screen 8x4 meter, full AC.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
      },
    ]
  }
}

export async function getNews(query?: string, categorySlug?: string, page = 1, limit = 9) {
  try {
    const where: any = { isPublished: true }
    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ]
    }
    if (categorySlug && categorySlug !== "ALL") {
      where.category = { slug: categorySlug }
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: {
          category: true,
          author: { select: { name: true } },
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.news.count({ where }),
    ])

    return { news, total, totalPages: Math.ceil(total / limit) }
  } catch {
    return {
      news: [
        {
          id: "n-1",
          title: "Siswa SMK Digital Raih Medali Emas LKS Nasional Bidang Cloud Computing",
          slug: "siswa-smk-digital-raih-medali-emas-lks-nasional-cloud-computing",
          excerpt: "Prestasi membanggakan kembali ditorehkan ananda Raditya Pratama pada ajang LKS Nasional.",
          content: "Jakarta - Raditya Pratama, siswa kelas XII Rekayasa Perangkat Lunak SMK Negeri 1 Digital Nusantara berhasil meraih medali emas dalam kompetisi LKS SMK Tingkat Nasional 2026 pada bidang Cloud Computing.",
          thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
          publishedAt: new Date(),
          views: 342,
          category: { name: "Prestasi Siswa", slug: "prestasi-siswa" },
          author: { name: "Administrator" },
        },
        {
          id: "n-2",
          title: "Kunjungan Industri & Penandatanganan MoU Bersama Google Cloud Partner",
          slug: "kunjungan-industri-dan-penandatanganan-mou-google-cloud-partner",
          excerpt: "Kerjasama strategis sertifikasi internasional gratis bagi siswa dan prioritas rekrutmen kerja.",
          content: "Sebagai komitmen nyata dalam menyelaraskan kurikulum dengan kebutuhan industri, sekolah meresmikan program Kelas Industri.",
          thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
          publishedAt: new Date(),
          views: 289,
          category: { name: "Kerjasama Industri", slug: "kerjasama-industri" },
          author: { name: "Administrator" },
        },
        {
          id: "n-3",
          title: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka",
          slug: "penerimaan-peserta-didik-baru-ppdb-2026-2027-resmi-dibuka",
          excerpt: "Pendaftaran PPDB tahun ini dilakukan 100% online melalui sistem informasi terpadu sekolah.",
          content: "Panitia PPDB mengumumkan pembukaan pendaftaran gelombang 1 untuk tahun ajaran 2026/2027.",
          thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
          publishedAt: new Date(),
          views: 512,
          category: { name: "Info PPDB", slug: "info-ppdb" },
          author: { name: "Administrator" },
        },
      ],
      total: 3,
      totalPages: 1,
    }
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const item = await prisma.news.findUnique({
      where: { slug },
      include: {
        category: true,
        author: { select: { name: true } },
      },
    })
    if (item) {
      // update view count asynchronously
      prisma.news
        .update({
          where: { id: item.id },
          data: { views: { increment: 1 } },
        })
        .catch(() => {})
    }
    return item
  } catch {
    return null
  }
}

export async function getAnnouncements(limit = 6) {
  try {
    return await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    })
  } catch {
    return [
      {
        id: "a-1",
        title: "Jadwal Resmi Asesmen Sumatif Akhir Semester Genap T.A 2025/2026",
        slug: "jadwal-asesmen-sumatif-akhir-semester-genap-2026",
        content: "Asesmen Sumatif Akhir Semester akan diselenggarakan pada tanggal 2-12 Juni 2026. Siswa diharapkan mengecek nomor ujian masing-masing.",
        fileAttachment: null,
        publishedAt: new Date(),
        isActive: true,
      },
      {
        id: "a-2",
        title: "Pengumuman Kelulusan Siswa Kelas XII Angkatan XXVI",
        slug: "pengumuman-kelulusan-siswa-kelas-xii-angkatan-xxvi",
        content: "Hasil kelulusan peserta didik kelas XII dapat diakses serentak secara daring pada hari Senin, 5 Mei 2026 pukul 17.00 WIB.",
        fileAttachment: null,
        publishedAt: new Date(),
        isActive: true,
      },
    ]
  }
}

export async function getEvents(limit = 6) {
  try {
    return await prisma.event.findMany({
      orderBy: { startDate: "asc" },
      take: limit,
    })
  } catch {
    return [
      {
        id: "e-1",
        title: "Pameran Karya & Job Fair Vokasi Nusantara 2026",
        slug: "pameran-karya-job-fair-vokasi-nusantara-2026",
        description: "Bursa kerja khusus (BKK) menghadirkan 35+ perusahaan mitra teknologi dan pameran inovasi.",
        location: "Aula Graha Nusantara",
        startDate: new Date("2026-05-18T08:00:00Z"),
        endDate: new Date("2026-05-20T16:00:00Z"),
        poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "e-2",
        title: "Pelaksanaan Uji Kompetensi Keahlian (UKK) LSP-P1",
        slug: "pelaksanaan-ukk-lsp-p1-2026",
        description: "Ujian sertifikasi teknis kejuruan oleh asesor industri bagi seluruh peserta didik tingkat akhir.",
        location: "Laboratorium Kejuruan",
        startDate: new Date("2026-04-20T07:30:00Z"),
        endDate: new Date("2026-04-25T16:00:00Z"),
        poster: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      },
    ]
  }
}

export async function getAchievements(level?: string, category?: string) {
  try {
    const where: any = {}
    if (level && level !== "ALL") where.level = level
    if (category && category !== "ALL") where.category = category

    return await prisma.achievement.findMany({
      where,
      orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    })
  } catch {
    return [
      {
        id: "ach-1",
        title: "Juara 1 (Medali Emas) LKS Nasional Bidang Cloud Computing",
        slug: "juara-1-emas-lks-nasional-cloud-computing",
        description: "Meraih skor tertinggi dalam perancangan arsitektur microservices cloud berskala enterprise.",
        level: "Nasional",
        year: 2026,
        participant: "Raditya Pratama (XII RPL)",
        category: "Akademik & Teknologi",
        photo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "ach-2",
        title: "Juara 1 LKS Tingkat Provinsi DKI Jakarta Bidang IT Network Systems",
        slug: "juara-1-lks-provinsi-dki-it-network",
        description: "Konfigurasi routing enterprise BGP dan sistem keamanan siber berbasis Linux.",
        level: "Provinsi",
        year: 2026,
        participant: "Gilang Ramadhan (XII TJKT)",
        category: "Akademik & Teknologi",
        photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
      },
    ]
  }
}

export async function getGallery(category?: string) {
  try {
    const where = category && category !== "ALL" ? { category } : {}
    return await prisma.gallery.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
  } catch {
    return [
      {
        id: "g-1",
        title: "Praktikum Pemrograman Cloud di Lab AI",
        category: "Fasilitas",
        albumName: "Laboratorium",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "g-2",
        title: "Siswa TJKT Melakukan Splicing Fiber Optic",
        category: "Kegiatan",
        albumName: "Praktik Kejuruan",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "g-3",
        title: "Sesi Syuting Kamera di Studio Multimedia",
        category: "Fasilitas",
        albumName: "Studio DKV",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
      },
    ]
  }
}

export async function getDashboardStats() {
  try {
    const [
      totalTeachers,
      totalStudents,
      totalMajors,
      totalNews,
      totalAnnouncements,
      totalAchievements,
      totalPPDB,
      recentPPDB,
      recentNews,
      recentMessages,
      unreadNotifications,
    ] = await Promise.all([
      prisma.teacher.count(),
      prisma.student.count(),
      prisma.major.count(),
      prisma.news.count(),
      prisma.announcement.count(),
      prisma.achievement.count(),
      prisma.pPDBRegistration.count(),
      prisma.pPDBRegistration.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { major: true },
      }),
      prisma.news.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { category: true },
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.notification.count({ where: { isRead: false } }),
    ])

    return {
      totalTeachers,
      totalStudents,
      totalMajors,
      totalNews,
      totalAnnouncements,
      totalAchievements,
      totalPPDB,
      recentPPDB,
      recentNews,
      recentMessages,
      unreadNotifications,
    }
  } catch {
    return {
      totalTeachers: 20,
      totalStudents: 785,
      totalMajors: 5,
      totalNews: 15,
      totalAnnouncements: 10,
      totalAchievements: 10,
      totalPPDB: 48,
      unreadNotifications: 0,
      recentPPDB: [
        {
          id: "p-1",
          registrationNo: "PPDB-2026-0001",
          fullName: "Muhammad Rizky Pratama",
          major: { name: "Rekayasa Perangkat Lunak" },
          previousSchool: "SMP Negeri 1 Nusantara",
          status: "VERIFIED",
          createdAt: new Date(),
        },
        {
          id: "p-2",
          registrationNo: "PPDB-2026-0002",
          fullName: "Annisa Syifa Rahmadani",
          major: { name: "Desain Komunikasi Visual" },
          previousSchool: "SMP Harapan Bangsa",
          status: "ACCEPTED",
          createdAt: new Date(),
        },
      ],
      recentNews: [
        {
          id: "n-1",
          title: "Siswa SMK Digital Raih Medali Emas LKS Nasional Bidang Cloud Computing",
          category: { name: "Prestasi Siswa" },
          createdAt: new Date(),
          publishedAt: new Date(),
          views: 342,
        },
      ],
      recentMessages: [
        {
          id: "m-1",
          name: "Irwan Santoso",
          email: "irwan.s@gmail.com",
          subject: "Pertanyaan Kuota Pendaftaran Jalur Prestasi PPDB 2026",
          message: "Mohon info kuota pendaftaran untuk jalur prestasi SMK Negeri 1 Digital.",
          createdAt: new Date(),
          isRead: false,
        },
      ],
    }
  }
}

export async function getDashboardAnalytics() {
  try {
    // Get PPDB trend by month (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const [ppdbRegistrations, studentsByMajor, maleCount, femaleCount, topNews, ppdbByStatus] =
      await Promise.all([
        prisma.pPDBRegistration.findMany({
          where: { createdAt: { gte: sixMonthsAgo } },
          select: { createdAt: true },
          orderBy: { createdAt: "asc" },
        }),
        prisma.major.findMany({
          include: { _count: { select: { students: true } } },
          orderBy: { code: "asc" },
        }),
        prisma.student.count({ where: { gender: "L" } }),
        prisma.student.count({ where: { gender: "P" } }),
        prisma.news.findMany({
          take: 5,
          orderBy: { views: "desc" },
          select: { id: true, title: true, views: true, slug: true },
        }),
        prisma.pPDBRegistration.groupBy({
          by: ["status"],
          _count: { status: true },
        }),
      ])

    // Aggregate PPDB by month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
    const ppdbTrendMap = new Map<string, number>()

    // Seed last 6 months with 0
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`
      ppdbTrendMap.set(key, 0)
    }

    ppdbRegistrations.forEach((reg) => {
      const d = new Date(reg.createdAt)
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`
      ppdbTrendMap.set(key, (ppdbTrendMap.get(key) || 0) + 1)
    })

    const ppdbTrend = Array.from(ppdbTrendMap.entries()).map(([month, count]) => ({
      month,
      pendaftar: count,
    }))

    // Map students by major
    const majorColors = ["#3b82f6", "#8b5cf6", "#f97316", "#10b981", "#ef4444"]
    const studentDistribution = studentsByMajor.map((m, i) => ({
      name: m.code,
      fullName: m.name,
      value: m._count?.students || 0,
      color: majorColors[i % majorColors.length],
    }))

    // Gender data
    const genderRatio = [
      { gender: "Laki-laki", count: maleCount, color: "#3b82f6" },
      { gender: "Perempuan", count: femaleCount, color: "#ec4899" },
    ]

    // Top news
    const topNewsData = topNews.map((n) => ({
      title: n.title.length > 35 ? n.title.slice(0, 35) + "..." : n.title,
      fullTitle: n.title,
      views: n.views,
    }))

    // PPDB status distribution
    const statusLabels: Record<string, string> = {
      PENDING: "Menunggu",
      VERIFIED: "Terverifikasi",
      ACCEPTED: "Diterima",
      REJECTED: "Ditolak",
    }
    const statusColors: Record<string, string> = {
      PENDING: "#f59e0b",
      VERIFIED: "#3b82f6",
      ACCEPTED: "#10b981",
      REJECTED: "#ef4444",
    }
    const ppdbStatusData = ppdbByStatus.map((s) => ({
      name: statusLabels[s.status] || s.status,
      value: s._count.status,
      color: statusColors[s.status] || "#94a3b8",
    }))

    return {
      ppdbTrend,
      studentDistribution,
      genderRatio,
      topNewsData,
      ppdbStatusData,
    }
  } catch {
    return {
      ppdbTrend: [
        { month: "Apr 2026", pendaftar: 5 },
        { month: "Mei 2026", pendaftar: 12 },
        { month: "Jun 2026", pendaftar: 18 },
        { month: "Jul 2026", pendaftar: 28 },
        { month: "Agu 2026", pendaftar: 35 },
        { month: "Sep 2026", pendaftar: 48 },
      ],
      studentDistribution: [
        { name: "RPL", fullName: "Rekayasa Perangkat Lunak", value: 180, color: "#3b82f6" },
        { name: "TJKT", fullName: "Teknik Jaringan Komputer", value: 165, color: "#8b5cf6" },
        { name: "DKV", fullName: "Desain Komunikasi Visual", value: 160, color: "#f97316" },
        { name: "MPLB", fullName: "Manajemen Perkantoran", value: 140, color: "#10b981" },
        { name: "AKL", fullName: "Akuntansi & Keuangan", value: 140, color: "#ef4444" },
      ],
      genderRatio: [
        { gender: "Laki-laki", count: 420, color: "#3b82f6" },
        { gender: "Perempuan", count: 365, color: "#ec4899" },
      ],
      topNewsData: [
        { title: "Siswa SMK Digital Raih Medali...", fullTitle: "Siswa SMK Digital Raih Medali Emas LKS", views: 342 },
        { title: "Kunjungan Industri & MoU...", fullTitle: "Kunjungan Industri & Penandatanganan MoU", views: 289 },
        { title: "PPDB 2026/2027 Resmi Dibuka...", fullTitle: "PPDB Tahun Ajaran 2026/2027 Resmi Dibuka", views: 512 },
      ],
      ppdbStatusData: [
        { name: "Menunggu", value: 20, color: "#f59e0b" },
        { name: "Terverifikasi", value: 15, color: "#3b82f6" },
        { name: "Diterima", value: 10, color: "#10b981" },
        { name: "Ditolak", value: 3, color: "#ef4444" },
      ],
    }
  }
}

