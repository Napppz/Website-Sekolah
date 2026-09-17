import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Memulai seeding database sekolah...")

  // 1. Seed User (Admin)
  const hashedPassword = await bcrypt.hash("Admin123!", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@sekolah.test" },
    update: {
      password: hashedPassword,
      name: "Administrator Utama",
    },
    create: {
      name: "Administrator Utama",
      email: "admin@sekolah.test",
      password: hashedPassword,
      role: "ADMIN",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    },
  })
  console.log("✅ Admin berhasil dibuat:", admin.email)

  // 2. Seed School Profile
  const profile = await prisma.schoolProfile.upsert({
    where: { id: "main-school-profile" },
    update: {},
    create: {
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
    },
  })
  console.log("✅ Profil sekolah berhasil dibuat")

  // 3. Seed Majors (5 Jurusan)
  const majorsData = [
    {
      code: "RPL",
      name: "Rekayasa Perangkat Lunak",
      slug: "rekayasa-perangkat-lunak",
      description:
        "Program keahlian yang mempelajari pengembangan software modern, mulai dari Web Application, Mobile App (iOS/Android), Cloud Computing, hingga implementasi Artificial Intelligence.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      competencies:
        "Full-Stack Web Development, Pemrograman Mobile Flutter/React Native, Database Engineering (PostgreSQL/MongoDB), API Integration, Version Control Git & CI/CD.",
      careerProspects:
        "Frontend/Backend Developer, Mobile App Engineer, UI/UX Designer, QA Software Tester, Data Analyst Junior, Tech Startup Founder.",
    },
    {
      code: "TJKT",
      name: "Teknik Jaringan Komputer & Telekomunikasi",
      slug: "teknik-jaringan-komputer-dan-telekomunikasi",
      description:
        "Fokus pada perancangan infrastruktur jaringan komputer, instalasi fiber optic, administrasi server Linux/Windows, keamanan siber (Cybersecurity), dan integrasi Internet of Things (IoT).",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
      competencies:
        "Routing & Switching Cisco/MikroTik, Server Administration & Virtualization, Cloud Infrastructure (AWS/GCP), Network Security & Ethical Hacking Basics, Fiber Optic Splicing.",
      careerProspects:
        "Network Administrator, System/DevOps Engineer, Cloud Architect Junior, Cybersecurity Analyst, ISP Technical Specialist.",
    },
    {
      code: "DKV",
      name: "Desain Komunikasi Visual & Multimedia",
      slug: "desain-komunikasi-visual",
      description:
        "Mengembangkan kreativitas visual digital meliputi desain grafis komersial, motion graphic, videografi & sinematografi, 3D modelling, serta branding corporate.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      competencies:
        "Creative Design (Photoshop & Illustrator), Motion Graphic & Video Editing (After Effects & Premiere), 3D Blender Modelling, Digital Photography, UI/UX Prototyping Figma.",
      careerProspects:
        "Graphic Designer, Video Editor & Motion Artist, 3D Modeler, Content Creator & Creative Director, Brand Identity Strategist.",
    },
    {
      code: "MPLB",
      name: "Manajemen Perkantoran & Layanan Bisnis",
      slug: "manajemen-perkantoran-dan-layanan-bisnis",
      description:
        "Mempersiapkan tenaga ahli administrasi perkantoran modern berbasis otomasi digital, public relations, keprotokolan, dan manajemen operasional bisnis berbasis cloud ERP.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
      competencies:
        "Digital Office Automation, Public Relations & Effective Communication, Kearsipan Digital & Database Dokumen, Pengelolaan Kas Kecil & Payroll, Bahasa Inggris Bisnis.",
      careerProspects:
        "Executive Administrative Assistant, Office Manager, Customer Relationship Officer, Public Relations Staff, Event Organizer Coordinator.",
    },
    {
      code: "AKL",
      name: "Akuntansi & Keuangan Lembaga",
      slug: "akuntansi-dan-keuangan-lembaga",
      description:
        "Mempelajari siklus akuntansi perusahaan jasa, dagang, dan manufaktur, perpajakan modern, audit keuangan, serta penguasaan software akuntansi terstandar (MYOB, Accurate, SAP).",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      competencies:
        "Siklus Akuntansi Perusahaan, Pengoperasian Accurate & Spreadsheet Lanjutan, Perhitungan Pajak (PPh & PPN), Pengelolaan Kas Bank, Analisis Laporan Keuangan.",
      careerProspects:
        "Junior Accountant, Tax Compliance Officer, Bank Operational Staff, Internal Audit Assistant, Financial Planning Junior.",
    },
  ]

  const createdMajors = []
  for (const m of majorsData) {
    const created = await prisma.major.upsert({
      where: { code: m.code },
      update: m,
      create: m,
    })
    createdMajors.push(created)
  }
  console.log(`✅ ${createdMajors.length} Jurusan berhasil dibuat`)

  // 4. Seed Teachers (20 Guru)
  const teachersData = [
    {
      nip: "197508152000031001",
      name: "Drs. Bambang Sulistyo",
      title: "M.Kom.",
      gender: "L",
      position: "Wakil Kepala Sekolah Bid. Kurikulum",
      subject: "Pemrograman Web & Perangkat Bergerak",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      email: "bambang.s@smkn1digital.sch.id",
      order: 1,
    },
    {
      nip: "198203122005012003",
      name: "Siti Rahmawati",
      title: "S.Pd., M.Pd.",
      gender: "P",
      position: "Wakil Kepala Sekolah Bid. Kesiswaan",
      subject: "Bahasa Indonesia & Literasi Digital",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      email: "siti.rahmawati@smkn1digital.sch.id",
      order: 2,
    },
    {
      nip: "198411202008011005",
      name: "Ir. Hendra Gunawan",
      title: "M.T.",
      gender: "L",
      position: "Ketua Program Keahlian RPL",
      subject: "Basis Data & Rekayasa Perangkat Lunak",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      email: "hendra.gunawan@smkn1digital.sch.id",
      order: 3,
    },
    {
      nip: "198904052012021008",
      name: "Dimas Arya Pratama",
      title: "S.Kom.",
      gender: "L",
      position: "Ketua Program Keahlian TJKT",
      subject: "Administrasi Infrastruktur Jaringan & Cyber Security",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      email: "dimas.arya@smkn1digital.sch.id",
      order: 4,
    },
    {
      nip: "199107142015032004",
      name: "Anisa Putri Wulandari",
      title: "M.Sn.",
      gender: "P",
      position: "Ketua Program Keahlian DKV",
      subject: "Desain Grafis & Motion Animation",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      email: "anisa.wulandari@smkn1digital.sch.id",
      order: 5,
    },
    {
      nip: "198612102009022006",
      name: "Rina Kusuma Astuti",
      title: "S.E., M.M.",
      gender: "P",
      position: "Ketua Program Keahlian AKL",
      subject: "Praktikum Akuntansi Perusahaan Jasa & Dagang",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
      email: "rina.kusuma@smkn1digital.sch.id",
      order: 6,
    },
    {
      nip: "198509182010012007",
      name: "Dewi Lestari",
      title: "S.Pd.",
      gender: "P",
      position: "Ketua Program Keahlian MPLB",
      subject: "Otomatisasi Tata Kelola Kehumasan & Keprotokolan",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      email: "dewi.lestari@smkn1digital.sch.id",
      order: 7,
    },
    {
      nip: "199201052016011009",
      name: "Faisal Tanjung",
      title: "S.Pd., M.Ed.",
      gender: "L",
      position: "Koordinator Hubungan Industri (Humas)",
      subject: "Bahasa Inggris Komunikasi Bisnis",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      email: "faisal.tanjung@smkn1digital.sch.id",
      order: 8,
    },
    {
      nip: "198705222011011003",
      name: "Agus Setiawan",
      title: "S.Si.",
      gender: "L",
      position: "Kepala Laboratorium Komputer",
      subject: "Matematika Terapan & Logika Algoritma",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
      email: "agus.setiawan@smkn1digital.sch.id",
      order: 9,
    },
    {
      nip: "199008122014022005",
      name: "Nurul Hidayah",
      title: "S.Pd.I.",
      gender: "P",
      position: "Guru Bimbingan Konseling (BK)",
      subject: "Pendidikan Agama Islam & Budi Pekerti",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      email: "nurul.hidayah@smkn1digital.sch.id",
      order: 10,
    },
    {
      nip: "199304152018011002",
      name: "Budi Santoso",
      title: "S.Pd.",
      gender: "L",
      position: "Guru Olahraga & Pembina Ekskul",
      subject: "Pendidikan Jasmani, Olahraga & Kesehatan",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400",
      email: "budi.santoso@smkn1digital.sch.id",
      order: 11,
    },
    {
      nip: "199402282019032007",
      name: "Citra Amelia",
      title: "S.Kom.",
      gender: "P",
      position: "Guru Produktif RPL",
      subject: "Pemrograman Berorientasi Objek & Cloud Computing",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      email: "citra.amelia@smkn1digital.sch.id",
      order: 12,
    },
    {
      nip: "199111032017011004",
      name: "Reza Maulana",
      title: "S.Kom.",
      gender: "L",
      position: "Guru Produktif TJKT",
      subject: "Teknologi Layanan Jaringan & VoIP",
      photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400",
      email: "reza.maulana@smkn1digital.sch.id",
      order: 13,
    },
    {
      nip: "199506192020022008",
      name: "Diah Permata",
      title: "S.Ds.",
      gender: "P",
      position: "Guru Produktif DKV",
      subject: "Fotografi Digital & Audio Visual",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
      email: "diah.permata@smkn1digital.sch.id",
      order: 14,
    },
    {
      nip: "198807252013011006",
      name: "Eko Prasetyo",
      title: "S.E.",
      gender: "L",
      position: "Guru Produktif AKL",
      subject: "Administrasi Pajak & Komputer Akuntansi MYOB",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400",
      email: "eko.prasetyo@smkn1digital.sch.id",
      order: 15,
    },
    {
      nip: "198909122015022009",
      name: "Tri Wahyuni",
      title: "S.Pd.",
      gender: "P",
      position: "Guru Produktif MPLB",
      subject: "Manajemen Logistik & Kearsipan Elektronik",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400",
      email: "tri.wahyuni@smkn1digital.sch.id",
      order: 16,
    },
    {
      nip: "199208302018021005",
      name: "Arief Hidayatullah",
      title: "M.Si.",
      gender: "L",
      position: "Guru Sains & Pembina KIR",
      subject: "Fisika Terapan & Kimia Industri",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
      email: "arief.h@smkn1digital.sch.id",
      order: 17,
    },
    {
      nip: "199412152021032010",
      name: "Maya Kartika",
      title: "S.Pd.",
      gender: "P",
      position: "Guru Sejarah & Budaya",
      subject: "Sejarah Indonesia & Pendidikan Kewarganegaraan",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      email: "maya.kartika@smkn1digital.sch.id",
      order: 18,
    },
    {
      nip: "199603092022011003",
      name: "Wahyu Firmansyah",
      title: "S.Kom.",
      gender: "L",
      position: "Laboran & IT Support",
      subject: "Informatika Dasar & Pemeliharaan Komputer",
      photo: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=400",
      email: "wahyu.firmansyah@smkn1digital.sch.id",
      order: 19,
    },
    {
      nip: "199510102022022011",
      name: "Rizka Fadillah",
      title: "S.Pd.",
      gender: "P",
      position: "Guru Bimbingan Konseling Karir",
      subject: "Bimbingan Karir & Konseling Industri",
      photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400",
      email: "rizka.fadillah@smkn1digital.sch.id",
      order: 20,
    },
  ]

  for (const t of teachersData) {
    await prisma.teacher.upsert({
      where: { nip: t.nip },
      update: t,
      create: t,
    })
  }
  console.log("✅ 20 Data Guru berhasil dibuat")

  // 5. Seed Students (50 Siswa realistis)
  const indonesianFirstNamesM = ["Aditya", "Bagas", "Candra", "Daffa", "Erlangga", "Fajar", "Gilang", "Hafiz", "Iqbal", "Joko", "Kevin", "Lukman", "Muhammad", "Naufal", "Oki", "Pandu", "Raditya", "Satria", "Taufiq", "Vino"]
  const indonesianFirstNamesF = ["Aulia", "Bella", "Cantika", "Dinda", "Elsa", "Fitri", "Gita", "Hana", "Intan", "Jihan", "Karina", "Laras", "Meisya", "Nabila", "Olivia", "Putri", "Qonita", "Rania", "Salma", "Tiara"]
  const indonesianLastNames = ["Pratama", "Saputra", "Wibowo", "Kusuma", "Hidayat", "Nugroho", "Santoso", "Wijaya", "Firmansyah", "Ramadhan", "Setiawan", "Utomo", "Permana", "Mahendra", "Lestari", "Siregar", "Nasution", "Suryono", "Handayani", "Wulandari"]

  const grades = ["X", "XI", "XII"]
  for (let i = 1; i <= 50; i++) {
    const isMale = i % 2 === 1
    const firstName = isMale
      ? indonesianFirstNamesM[i % indonesianFirstNamesM.length]
      : indonesianFirstNamesF[i % indonesianFirstNamesF.length]
    const lastName = indonesianLastNames[(i * 3) % indonesianLastNames.length]
    const fullName = `${firstName} ${lastName}`
    const nisn = `00${78000000 + i}`
    const nis = `2024${1000 + i}`
    const classGrade = grades[i % grades.length]
    const major = createdMajors[i % createdMajors.length]

    await prisma.student.upsert({
      where: { nisn },
      update: {},
      create: {
        nisn,
        nis,
        name: fullName,
        gender: isMale ? "L" : "P",
        classGrade,
        majorId: major.id,
        status: "ACTIVE",
      },
    })
  }
  console.log("✅ 50 Data Siswa berhasil dibuat")

  // 6. Seed Facilities (10 Fasilitas)
  const facilitiesData = [
    {
      name: "Laboratorium Komputer & AI Center",
      slug: "laboratorium-komputer-ai-center",
      category: "Laboratorium",
      capacity: 40,
      condition: "Sangat Baik",
      description:
        "Dilengkapi 40 unit PC berspesifikasi tinggi (Intel Core i7, GPU RTX 4060, RAM 32GB) dengan koneksi fiber optic dedicated untuk praktikum machine learning, full-stack programming, dan cloud architecture.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Laboratorium Jaringan Komputer & Fiber Optic",
      slug: "laboratorium-jaringan-komputer",
      category: "Laboratorium",
      capacity: 36,
      condition: "Sangat Baik",
      description:
        "Laboratorium berstandar Cisco Networking Academy dengan rack server, switch manageable, router enterprise, workstation troubleshooting jaringan, dan peralatan splicing fiber optic.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Studio Multimedia & Broadcasting Graha Karya",
      slug: "studio-multimedia-broadcasting",
      category: "Studio",
      capacity: 30,
      condition: "Sangat Baik",
      description:
        "Studio kedap suara dengan green screen cyclo wall, lighting broadcast 3-point, kamera cinema 4K, teleprompter, dan ruang audio editing terintegrasi.",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Perpustakaan Digital Nusantara (DigiLib)",
      slug: "perpustakaan-digital-nusantara",
      category: "Umum",
      capacity: 100,
      condition: "Sangat Baik",
      description:
        "Pusat sumber belajar berkonsep modern cafe literasi, dilengkapi 20 unit OPAC touchscreen tablet, koleksi 15.000 e-book berlisensi, ruang diskusi kubikel, dan pojok baca santai ber-AC.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Lapangan Olahraga Multifungsi",
      slug: "lapangan-olahraga-multifungsi",
      category: "Olahraga",
      capacity: 300,
      condition: "Sangat Baik",
      description:
        "Area lapangan outdoor dengan permukaan interlock standar internasional untuk olahraga futsal, bola basket, bola voli, dan bulutangkis lengkap dengan tribun penonton dan pencahayaan malam.",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Aula Serbaguna Graha Nusantara",
      slug: "aula-serbaguna-graha-nusantara",
      category: "Umum",
      capacity: 800,
      condition: "Sangat Baik",
      description:
        "Gedung pertemuan megah dengan sound system line-array JBL, videotron LED screen ukuran 8x4 meter, full AC, dan panggung pertunjukan untuk wisuda, seminar nasional, dan pentas seni.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Smart Classroom Berbasis Interactive Flat Panel",
      slug: "smart-classroom-ifp",
      category: "Kelas",
      capacity: 36,
      condition: "Sangat Baik",
      description:
        "Ruang kelas berteknologi tinggi dengan Interactive Flat Panel 86 inch, audio directional, kursi ergonomis movable, dan sistem perekaman pembelajaran otomatis.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Laboratorium Bahasa Asing Terpadu",
      slug: "laboratorium-bahasa-asing",
      category: "Laboratorium",
      capacity: 36,
      condition: "Baik",
      description:
        "Lab bahasa komputerisasi dengan headset noise-cancelling untuk pelatihan TOEFL/TOEIC, bahasa Inggris bisnis, bahasa Jepang, dan persiapan magang ke luar negeri.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Masjid Baitul Ilmi",
      slug: "masjid-baitul-ilmi",
      category: "Ibadah",
      capacity: 500,
      condition: "Sangat Baik",
      description:
        "Masjid sekolah yang asri dan megah dengan tempat wudhu luas, karpet tebal, penyejuk ruangan, perpustakaan mini keislaman, dan sound system berkualitas untuk sholat berjamaah dan kajian rohis.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Klinik UKS & Ruang Konseling Sehat",
      slug: "klinik-uks-konseling",
      category: "Umum",
      capacity: 15,
      condition: "Sangat Baik",
      description:
        "Fasilitas kesehatan sekolah berstandar Puskesmas, dilengkapi 6 tempat tidur pasien, tabung oksigen, obat-obatan esensial P3K, dan dokter jaga dari puskesmas mitra.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    },
  ]

  for (const f of facilitiesData) {
    await prisma.facility.upsert({
      where: { slug: f.slug },
      update: f,
      create: f,
    })
  }
  console.log("✅ 10 Fasilitas berhasil dibuat")

  // 7. Seed News Categories & News (15 Berita)
  const newsCategories = [
    { name: "Prestasi Siswa", slug: "prestasi-siswa" },
    { name: "Akademik & Kurikulum", slug: "akademik-kurikulum" },
    { name: "Kegiatan Sekolah", slug: "kegiatan-sekolah" },
    { name: "Kerjasama Industri", slug: "kerjasama-industri" },
    { name: "Info PPDB", slug: "info-ppdb" },
  ]

  const createdCategories = []
  for (const c of newsCategories) {
    const cat = await prisma.newsCategory.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    })
    createdCategories.push(cat)
  }

  const newsData = [
    {
      title: "Siswa SMK Digital Raih Medali Emas LKS Nasional Bidang Cloud Computing",
      slug: "siswa-smk-digital-raih-medali-emas-lks-nasional-cloud-computing",
      excerpt: "Prestasi membanggakan kembali ditorehkan ananda Raditya Pratama pada ajang Lomba Kompetensi Siswa (LKS) Tingkat Nasional XXXII.",
      content: "Jakarta - Raditya Pratama, siswa kelas XII Rekayasa Perangkat Lunak SMK Negeri 1 Digital Nusantara berhasil mengharumkan nama sekolah dan provinsi DKI Jakarta dengan menyabet medali emas dalam kompetisi LKS SMK Tingkat Nasional 2026 pada bidang lomba Cloud Computing.\n\nDalam perlombaan yang berlangsung sengit selama tiga hari di Surabaya tersebut, Raditya berhasil merancang arsitektur microservices berkinerja tinggi, mengonfigurasi high-availability database cluster, dan mengimplementasikan automated CI/CD pipeline dengan presisi sempurna.\n\nKepala Sekolah, Dr. H. Ahmad Fauzi, M.Pd., menyampaikan apresiasi setinggi-tingginya kepada ananda Raditya serta tim guru pembimbing yang tanpa lelah memberikan mentoring intensif.",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[0].id,
      views: 342,
    },
    {
      title: "Kunjungan Industri & Penandatanganan MoU Kelas Industri Bersama Google Cloud Partner",
      slug: "kunjungan-industri-dan-penandatanganan-mou-google-cloud-partner",
      excerpt: "Kerjasama strategis ini mencakup sertifikasi internasional gratis bagi siswa dan prioritas rekrutmen kerja langsung pasca kelulusan.",
      content: "Sebagai komitmen nyata dalam menyelaraskan kurikulum sekolah dengan kebutuhan industri teknologi, SMK Negeri 1 Digital Nusantara meresmikan program Kelas Industri bersama PT Mega Cloud Technology (Partner Resmi Google Cloud Indonesia).\n\nProgram ini memfasilitasi kurikulum sinkron, magang kerja (PKL) bersertifikasi selama 6 bulan, dan beasiswa sertifikasi Associate Cloud Engineer bagi siswa berprestasi.",
      thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[3].id,
      views: 289,
    },
    {
      title: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka",
      slug: "penerimaan-peserta-didik-baru-ppdb-2026-2027-resmi-dibuka",
      excerpt: "Pendaftaran PPDB tahun ini dilakukan 100% online melalui sistem informasi terpadu sekolah untuk 5 pilihan kompetensi keahlian unggulan.",
      content: "Panitia Penerimaan Peserta Didik Baru (PPDB) SMK Negeri 1 Digital Nusantara mengumumkan pembukaan pendaftaran gelombang 1 untuk tahun ajaran 2026/2027.\n\nCalon siswa dapat memilih 5 konsentrasi keahlian: Rekayasa Perangkat Lunak, Teknik Jaringan Komputer, Desain Komunikasi Visual, Manajemen Perkantoran, dan Akuntansi Keuangan.\n\nPendaftaran berlangsung mulai 1 April hingga 30 Juni 2026.",
      thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[4].id,
      views: 512,
    },
    {
      title: "Semarak Bulan Bahasa & Gelar Karya Projek Penguatan Profil Pelajar Pancasila (P5)",
      slug: "semarak-bulan-bahasa-dan-gelar-karya-p5",
      excerpt: "Ratusan karya inovatif siswa bertema kearifan lokal dan teknologi ramah lingkungan dipamerkan di Aula Graha Nusantara.",
      content: "Suasana meriah menyelimuti kampus SMK Negeri 1 Digital Nusantara dalam perayaan Gebyar Bulan Bahasa sekaligus Gelar Karya P5. Siswa menampilkan drama musikal, pembacaan puisi dwibahasa, serta pameran prototype daur ulang limbah elektronik menjadi perangkat IoT bermanfaat.",
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[2].id,
      views: 198,
    },
    {
      title: "Workshop Kecerdasan Buatan (Generative AI) untuk Efisiensi Pembelajaran Siswa",
      slug: "workshop-kecerdasan-buatan-generative-ai-siswa",
      excerpt: "Membekali peserta didik dengan pemahaman etika dan pemanfaatan AI secara produktif dalam riset dan programming.",
      content: "Sekolah mengadakan workshop intensif sehari bertajuk 'Mastering Prompt Engineering and Ethics in Modern AI' yang diikuti oleh 150 perwakilan siswa dari seluruh jurusan. Narasumber dari industri membagikan praktik terbaik penggunaan LLM dalam pemrograman.",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[1].id,
      views: 245,
    },
    {
      title: "Tim Futsal Sekolah Rebut Trofi Juara 1 Turnamen Pelajar Piala Menpora Regional DKI",
      slug: "tim-futsal-sekolah-rebut-juara-1-turnamen-menpora",
      excerpt: "Kemenangan dramatis 3-2 di partai final mengantarkan tim futsal sekolah ke puncak podium turnamen bergengsi antar pelajar.",
      content: "Kemenangan gemilang diraih tim futsal kebanggaan sekolah setelah menundukkan rival tangguh dalam laga final yang dramatis. Gol penentu di menit terakhir babak kedua disambut gegap gempita oleh ratusan supporter suporter yang hadir di GOR Soemantri Brodjonegoro.",
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[0].id,
      views: 410,
    },
    {
      title: "Peningkatan Literasi Finansial: Siswa AKL Gelar Pelatihan Akuntansi UMKM",
      slug: "siswa-akl-gelar-pelatihan-akuntansi-umkm",
      excerpt: "Bentuk nyata pengabdian masyarakat siswa jurusan akuntansi dalam mendampingi 30 pelaku usaha mikro sekitar sekolah.",
      content: "Sebanyak 30 siswa tingkat akhir jurusan Akuntansi dan Keuangan Lembaga menyelenggarakan pendampingan pembukuan sederhana dan aplikasi kasir digital bagi pelaku UMKM di lingkungan kecamatan sekitar sekolah.",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[2].id,
      views: 167,
    },
    {
      title: "Pelaksanaan Uji Kompetensi Keahlian (UKK) Mandiri Bersertifikasi BNSP",
      slug: "pelaksanaan-ukk-mandiri-bersertifikasi-bnsp",
      excerpt: "100% siswa tingkat akhir mengikuti uji sertifikasi profesi untuk memastikan standar kompetensi kerja nasional (SKKNI).",
      content: "Pelaksanaan UKK tahun 2026 dilaksanakan bersama Lembaga Sertifikasi Profesi (LSP-P1). Asesor independen dari dunia usaha dan industri memverifikasi langsung portofolio dan uji praktik demonstrasi tiap siswa.",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[1].id,
      views: 320,
    },
    {
      title: "Pameran Desain & Fotografi Eksibisi Karya DKV 'Visual Genesis 2026'",
      slug: "pameran-desain-fotografi-visual-genesis-2026",
      excerpt: "Menampilkan lebih dari 80 karya fotografi cetak, motion poster, brand mockup, dan video pendek sinematik hasil karya siswa.",
      content: "Galeri seni sekolah menggelar eksibisi tahunan karya siswa DKV. Pameran terbuka untuk umum dan dihadiri oleh agensi periklanan serta studio animasi terkemuka yang mencari bibit desainer muda.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[2].id,
      views: 278,
    },
    {
      title: "Sosialisasi Beasiswa Kuliah ke Luar Negeri & Jalur Prestasi Perguruan Tinggi Negeri",
      slug: "sosialisasi-beasiswa-kuliah-luar-negeri-ptn",
      excerpt: "Memberikan panduan lengkap bagi siswa yang ingin melanjutkan studi ke universitas ternama di dalam maupun luar negeri.",
      content: "Sekolah mengundang konsultan pendidikan internasional dan alumni yang saat ini menempuh studi di Jerman, Jepang, dan Australia untuk memberikan sharing session mengenai tips meraih beasiswa penuh bagi lulusan SMK.",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[1].id,
      views: 450,
    },
    {
      title: "Edukasi Keselamatan Berkendara (Safety Riding) Bekerjasama dengan Korlantas",
      slug: "edukasi-keselamatan-berkendara-safety-riding",
      excerpt: "Menanamkan budaya tertib lalu lintas dan keterampilan mengemudi aman bagi seluruh siswa sekolah.",
      content: "Ratusan siswa mengikuti simulasi berkendara aman yang dipandu instruktur bersertifikat dari Korlantas POLRI di lapangan utama sekolah, meliputi teknik pengereman darurat dan kepatuhan rambu jalan.",
      thumbnail: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[2].id,
      views: 154,
    },
    {
      title: "Peluncuran Aplikasi Mobile 'Nusantara Smart School' Buatan Siswa RPL",
      slug: "peluncuran-aplikasi-mobile-nusantara-smart-school",
      excerpt: "Aplikasi mobile resmi untuk absensi geofencing, peminjaman buku perpustakaan, dan notifikasi jadwal akademik.",
      content: "Karya kolaboratif tim siswa RPL resmi dirilis di Play Store. Aplikasi ini mempermudah orang tua murid memantau kehadiran dan perkembangan belajar anak secara real-time dari ponsel.",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[0].id,
      views: 630,
    },
    {
      title: "Kunjungan Studi Banding Delegasi Kepala Sekolah Vokasi Se-Jawa Timur",
      slug: "studi-banding-delegasi-kepala-sekolah-vokasi-jawa-timur",
      excerpt: "Menjadi rujukan pengelolaan Teaching Factory dan digitalisasi manajemen mutu sekolah terakreditasi A.",
      content: "Sebanyak 40 Kepala Sekolah SMK se-Jawa Timur berkunjung untuk mengamati langsung implementasi tata kelola laboratorium cloud computing dan model teaching factory yang telah berjalan sukses.",
      thumbnail: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[3].id,
      views: 215,
    },
    {
      title: "Peringatan Hari Guru Nasional: Momen Penuh Haru dan Apresiasi Dedikasi Pendidik",
      slug: "peringatan-hari-guru-nasional-2026",
      excerpt: "Organisasi Siswa Intra Sekolah (OSIS) mempersembahkan pentas seni kejutan dan penganugerahan guru terfavorit.",
      content: "Upacara bendera dengan petugas guru berlangsung khidmat, dilanjutkan dengan pemberian bunga mawar dan plakat penghargaan dari para murid sebagai ungkapan terima kasih tak terhingga atas jasa para guru.",
      thumbnail: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[2].id,
      views: 310,
    },
    {
      title: "Kemitraan Baru dengan Cisco Networking Academy: Siap Cetak Ahli Keamanan Siber",
      slug: "kemitraan-cisco-networking-academy-cyber-security",
      excerpt: "Kerjasama kurikulum resmi untuk membekali lulusan TJKT sertifikasi internasional CCNA dan CyberOps Associate.",
      content: "Laboratorium TJKT resmi ditetapkan sebagai Cisco Academy Support Center. Kerjasama ini menjamin akses modul pelatihan global dan simulator Packet Tracer mutakhir bagi seluruh civitas akademika.",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      categoryId: createdCategories[3].id,
      views: 395,
    },
  ]

  for (const n of newsData) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {
        ...n,
        authorId: admin.id,
      },
      create: {
        ...n,
        authorId: admin.id,
        isPublished: true,
      },
    })
  }
  console.log("✅ 15 Berita berhasil dibuat")

  // 8. Seed Announcements (10 Pengumuman)
  const announcementsData = [
    {
      title: "Jadwal Resmi Asesmen Sumatif Akhir Semester Genap T.A 2025/2026",
      slug: "jadwal-asesmen-sumatif-akhir-semester-genap-2026",
      content: "Diberitahukan kepada seluruh peserta didik kelas X, XI, dan XII bahwa Asesmen Sumatif Akhir Semester akan diselenggarakan pada tanggal 2-12 Juni 2026. Seluruh siswa diharapkan mengecek nomor ujian dan jadwal mata pelajaran masing-masing melalui kartu peserta.",
      fileAttachment: "/uploads/jadwal-asast-2026.pdf",
    },
    {
      title: "Pengumuman Kelulusan Siswa Kelas XII Angkatan XXVI",
      slug: "pengumuman-kelulusan-siswa-kelas-xii-angkatan-xxvi",
      content: "Hasil kelulusan peserta didik kelas XII tahun pelajaran 2025/2026 dapat diakses serentak secara daring pada hari Senin, 5 Mei 2026 pukul 17.00 WIB melalui portal akun siswa. Dilarang melakukan konvoi di jalan raya dan corat-coret seragam.",
      fileAttachment: null,
    },
    {
      title: "Surat Edaran Libur Awal Ramadhan & Jadwal KBM Khusus 1447 H",
      slug: "surat-edaran-libur-ramadhan-kbm-1447h",
      content: "Berdasarkan kalender pendidikan Dinas Pendidikan Provinsi DKI Jakarta, libur awal Ramadhan ditetapkan selama 3 hari. Selama bulan suci Ramadhan, durasi jam pelajaran dipadatkan menjadi 35 menit per jam pelajaran.",
      fileAttachment: null,
    },
    {
      title: "Pemberkasan Beasiswa Program Indonesia Pintar (PIP) Fase 1 Tahun 2026",
      slug: "pemberkasan-beasiswa-pip-fase-1-2026",
      content: "Bagi siswa penerima nominasi Beasiswa PIP Tahun 2026, dimohon segera mengumpulkan fotokopi Kartu Keluarga, KIP/KKS, dan buku tabungan SimPel ke bagian Tata Usaha paling lambat Jumat, 24 April 2026.",
      fileAttachment: null,
    },
    {
      title: "Sosialisasi Program Praktik Kerja Lapangan (PKL) Siswa Kelas XI",
      slug: "sosialisasi-program-pkl-siswa-kelas-xi",
      content: "Pertemuan koordinasi orang tua siswa kelas XI terkait penempatan industri, asuransi keselamatan kerja, dan pembekalan budaya kerja PKL semester depan akan dilaksanakan hari Sabtu via Zoom Meeting.",
      fileAttachment: null,
    },
    {
      title: "Informasi Seleksi Calon Pengurus OSIS & MPK Periode 2026/2027",
      slug: "seleksi-calon-pengurus-osis-mpk-2026-2027",
      content: "Pendaftaran terbuka bagi siswa kelas X dan XI yang memiliki integritas dan jiwa kepemimpinan tinggi untuk mendaftar sebagai pengurus OSIS. Formulir pendaftaran dapat diambil di ruang kesiswaan.",
      fileAttachment: null,
    },
    {
      title: "Uji Coba Sistem Tryout Ujian Sekolah Berbasis Komputer (CBT)",
      slug: "uji-coba-tryout-ujian-sekolah-cbt",
      content: "Simulasi gladi bersih aplikasi CBT akan dilaksanakan serentak di 4 ruang laboratorium komputer sekolah pada hari Selasa pukul 08.00 WIB. Harap membawa login card masing-masing.",
      fileAttachment: null,
    },
    {
      title: "Pengambilan Seragam & Atribut Resmi Calon Siswa Baru Jalur Prestasi",
      slug: "pengambilan-seragam-atribut-calon-siswa-baru",
      content: "Calon peserta didik baru yang telah dinyatakan lolos verifikasi akhir Jalur Prestasi dapat mengambil paket seragam dan kelengkapan atribut sekolah di Koperasi Siswa mulai tanggal 15 Juli 2026.",
      fileAttachment: null,
    },
    {
      title: "Program Vaksinasi dan Skrining Kesehatan Berkala Remaja Sekolah",
      slug: "program-vaksinasi-skrining-kesehatan-remaja",
      content: "Puskesmas Kecamatan bekerjasama dengan UKS sekolah akan menyelenggarakan pemeriksaan berkala kesehatan gigi, mata, dan status gizi bagi seluruh siswa kelas X.",
      fileAttachment: null,
    },
    {
      title: "Surat Edaran Kebijakan Bebas Sampah Plastik Sekali Pakai di Lingkungan Sekolah",
      slug: "kebijakan-bebas-sampah-plastik-lingkungan-sekolah",
      content: "Mulai 1 Mei 2026, seluruh civitas akademika diwajibkan membawa tumbler minum dan wadah makan sendiri guna mewujudkan program Sekolah Adiwiyata Mandiri bebas sampah plastik.",
      fileAttachment: null,
    },
  ]

  for (const a of announcementsData) {
    await prisma.announcement.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    })
  }
  console.log("✅ 10 Pengumuman berhasil dibuat")

  // 9. Seed Events / Agenda (10 Agenda)
  const eventsData = [
    {
      title: "Pameran Karya & Job Fair Vokasi Nusantara 2026",
      slug: "pameran-karya-job-fair-vokasi-nusantara-2026",
      description: "Bursa kerja khusus (BKK) menghadirkan 35+ perusahaan mitra teknologi dan manufaktur, serta display karya inovasi siswa seluruh jurusan.",
      location: "Aula Serbaguna Graha Nusantara & Plaza Sekolah",
      startDate: new Date("2026-05-18T08:00:00Z"),
      endDate: new Date("2026-05-20T16:00:00Z"),
      poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Pelaksanaan Uji Kompetensi Keahlian (UKK) LSP-P1",
      slug: "pelaksanaan-ukk-lsp-p1-2026",
      description: "Ujian sertifikasi teknis kejuruan oleh asesor industri bagi seluruh peserta didik tingkat akhir.",
      location: "Seluruh Laboratorium Kejuruan",
      startDate: new Date("2026-04-20T07:30:00Z"),
      endDate: new Date("2026-04-25T16:00:00Z"),
      poster: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Masa Pengenalan Lingkungan Sekolah (MPLS) Peserta Didik Baru",
      slug: "mpls-peserta-didik-baru-2026",
      description: "Pengenalan visi misi, budaya disiplin, pengenalan jurusan, dan pembinaan karakter bagi siswa baru angkatan 2026/2027.",
      location: "Lapangan Upacara & Ruang Kelas",
      startDate: new Date("2026-07-13T07:00:00Z"),
      endDate: new Date("2026-07-15T15:00:00Z"),
      poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Seminar Parenting & Rapat Pleno Komite Sekolah",
      slug: "seminar-parenting-rapat-pleno-komite-2026",
      description: "Sinergi keluarga dan sekolah dalam mendampingi tumbuh kembang dan karir generasi Z di era digital.",
      location: "Aula Graha Nusantara",
      startDate: new Date("2026-06-06T08:30:00Z"),
      endDate: new Date("2026-06-06T12:30:00Z"),
      poster: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Pekan Olahraga & Seni Antar Kelas (Classmeeting)",
      slug: "classmeeting-pekan-olahraga-seni-2026",
      description: "Kompetisi persahabatan antar kelas cabang futsal, basket, mobile legends e-sports, dan solo vocal.",
      location: "Area Olahraga & Panggung Seni",
      startDate: new Date("2026-06-15T08:00:00Z"),
      endDate: new Date("2026-06-19T14:30:00Z"),
      poster: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Pelepasan & Wisuda Purnawiyata Siswa Kelas XII",
      slug: "wisuda-purnawiyata-kelas-xii-2026",
      description: "Upacara seremonial kelulusan dan penyerahan penghargaan lulusan terbaik berprestasi.",
      location: "Ballroom Hotel Bidakara Jakarta",
      startDate: new Date("2026-05-28T08:00:00Z"),
      endDate: new Date("2026-05-28T13:00:00Z"),
      poster: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Bootcamp Intensif Olimpiade Sains Terapan & LKS",
      slug: "bootcamp-olimpiade-sains-lks-2026",
      description: "Pelatihan karantina bagi kontingen sekolah menuju seleksi tingkat provinsi DKI Jakarta.",
      location: "Lab Komputer 1 & Ruang Riset",
      startDate: new Date("2026-08-10T08:00:00Z"),
      endDate: new Date("2026-08-14T17:00:00Z"),
      poster: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Bakti Sosial & Santunan Ramadhan Peduli Sesama",
      slug: "bakti-sosial-santunan-ramadhan-2026",
      description: "Penyaluran 500 paket sembako hasil infak civitas akademika untuk warga dhuafa sekitar lingkungan sekolah.",
      location: "Masjid Baitul Ilmi",
      startDate: new Date("2026-04-18T13:30:00Z"),
      endDate: new Date("2026-04-18T17:30:00Z"),
      poster: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Workshop Desain UI/UX & Portofolio Profesional",
      slug: "workshop-uiux-portofolio-profesional",
      description: "Pembuatan case study aplikasi mobile berstandar industri bersama Product Designer dari Unicorn Startup.",
      location: "Studio DKV",
      startDate: new Date("2026-09-05T09:00:00Z"),
      endDate: new Date("2026-09-05T15:00:00Z"),
      poster: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Peringatan Hari Pahlawan & Upacara Bendera Khidmat",
      slug: "peringatan-hari-pahlawan-2026",
      description: "Mengenang jasa para pahlawan kemerdekaan dengan pakaian adat nusantara dan teatrikal perjuangan.",
      location: "Halaman Utama Sekolah",
      startDate: new Date("2026-11-10T07:00:00Z"),
      endDate: new Date("2026-11-10T10:00:00Z"),
      poster: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    },
  ]

  for (const e of eventsData) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: e,
      create: e,
    })
  }
  console.log("✅ 10 Agenda berhasil dibuat")

  // 10. Seed Achievements (10 Prestasi)
  const achievementsData = [
    {
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
      title: "Juara 1 LKS Tingkat Provinsi DKI Jakarta Bidang IT Network Systems",
      slug: "juara-1-lks-provinsi-dki-it-network",
      description: "Keberhasilan mengonfigurasi routing enterprise BGP dan sistem keamanan siber berbasis Linux.",
      level: "Provinsi",
      year: 2026,
      participant: "Gilang Ramadhan (XII TJKT)",
      category: "Akademik & Teknologi",
      photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Juara 2 National Graphic Design Competition di Universitas Indonesia",
      slug: "juara-2-national-graphic-design-ui",
      description: "Mendesain identitas brand kampanye peduli krisis iklim berbasis Augmented Reality.",
      level: "Nasional",
      year: 2025,
      participant: "Cantika Wulandari (XI DKV)",
      category: "Seni & Desain",
      photo: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Juara 1 Olimpiade Akuntansi Pelajar Tingkat Jabodetabek",
      slug: "juara-1-olimpiade-akuntansi-jabodetabek",
      description: "Menyelesaikan siklus audit akuntansi manufaktur dan perpajakan dengan nilai akumulasi tertinggi 98,5.",
      level: "Provinsi",
      year: 2025,
      participant: "Tim Akuntansi (Nabila & Meisya - XII AKL)",
      category: "Akademik & Bisnis",
      photo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Medali Perak (Juara 2) ASEAN Youth Robotic Championship di Singapore",
      slug: "medali-perak-asean-youth-robotic-singapore",
      description: "Menciptakan robot pengantar logistik otomatis berbasis sensor LiDAR dan Artificial Intelligence.",
      level: "Internasional",
      year: 2025,
      participant: "Tim Robotika Vokasi (Kevin & Satria)",
      category: "Teknologi & Robotika",
      photo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Juara 1 Turnamen Futsal Pelajar Piala Walikota Jakarta Selatan",
      slug: "juara-1-futsal-piala-walikota-jaksel",
      description: "Tampil tak terkalahkan sepanjang turnamen dengan mencatatkan rekor pertahanan terbaik.",
      level: "Kabupaten/Kota",
      year: 2026,
      participant: "Tim Futsal Putra SMKN 1 Digital",
      category: "Olahraga",
      photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Juara 1 Lomba Cipta Film Pendek Edukasi FLS2N Tingkat Provinsi",
      slug: "juara-1-film-pendek-fls2n-provinsi",
      description: "Film pendek bertema toleransi dan inklusivitas sosial berhasil memukau dewan juri sutradara profesional.",
      level: "Provinsi",
      year: 2025,
      participant: "Eskul Sinematografi DKV",
      category: "Seni & Film",
      photo: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Sekolah Adiwiyata Mandiri Tingkat Nasional dari Kementerian LHK",
      slug: "penghargaan-adiwiyata-mandiri-nasional",
      description: "Penghargaan bergengsi atas komitmen sekolah mengintegrasikan edukasi kelestarian lingkungan hidup dan solar cell.",
      level: "Nasional",
      year: 2025,
      participant: "Civitas Akademika SMKN 1 Digital Nusantara",
      category: "Sekolah & Lingkungan",
      photo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Juara 1 Guru Inovatif Pengembang Media Pembelajaran Digital DKI Jakarta",
      slug: "juara-1-guru-inovatif-dki-jakarta",
      description: "Inovasi platform microlearning adaptif untuk siswa kejuruan yang meningkatkan partisipasi belajar hingga 85%.",
      level: "Provinsi",
      year: 2025,
      participant: "Ir. Hendra Gunawan, M.T.",
      category: "Prestasi Guru",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Juara 2 Lomba Business Plan & Start-up Pitching Nasional Vokasi",
      slug: "juara-2-business-plan-startup-pitching",
      description: "Proposal startup 'PilahSampah Digital' berbasis aplikasi mobile berhasil memikat para angel investor kompetisi.",
      level: "Nasional",
      year: 2025,
      participant: "Daffa Erlangga & Laras Putri (XI MPLB)",
      category: "Wirausaha & Bisnis",
      photo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
    },
  ]

  for (const ach of achievementsData) {
    await prisma.achievement.upsert({
      where: { slug: ach.slug },
      update: ach,
      create: ach,
    })
  }
  console.log("✅ 10 Prestasi berhasil dibuat")

  // 11. Seed Gallery (20 Foto Galeri)
  const galleryData = [
    { title: "Praktikum Pemrograman Cloud di Lab AI", category: "Fasilitas", albumName: "Laboratorium", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" },
    { title: "Siswa TJKT Melakukan Splicing Fiber Optic", category: "Kegiatan", albumName: "Praktik Kejuruan", imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800" },
    { title: "Sesi Syuting Kamera di Studio Multimedia", category: "Fasilitas", albumName: "Studio DKV", imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800" },
    { title: "Suasana Belajar Nyaman di DigiLib Nusantara", category: "Fasilitas", albumName: "Perpustakaan", imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800" },
    { title: "Upacara Peringatan Hari Kemerdekaan RI", category: "Kegiatan", albumName: "Upacara Bendera", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" },
    { title: "Selebrasi Kemenangan Tim Futsal Sekolah", category: "Prestasi", albumName: "Olahraga", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800" },
    { title: "Wisuda Purnawiyata Angkatan XXV", category: "Kegiatan", albumName: "Wisuda", imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800" },
    { title: "Diskusi Desain Interface Prototyping Figma", category: "Kegiatan", albumName: "Belajar Kelompok", imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" },
    { title: "Latihan Ekstrakurikuler Paskibra Sekolah", category: "Ekstrakurikuler", albumName: "Paskibra", imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" },
    { title: "Pertandingan Basket Antar Kelas Classmeeting", category: "Ekstrakurikuler", albumName: "Classmeeting", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800" },
    { title: "Eksibisi Pameran Seni Visual Genesis", category: "Prestasi", albumName: "Pameran Karya", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { title: "Penyembelihan Hewan Qurban Idul Adha", category: "Kegiatan", albumName: "Rohis Sekolah", imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" },
    { title: "Kunjungan Studi Industri ke Tech Park", category: "Kegiatan", albumName: "Kunjungan Industri", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" },
    { title: "Simulasi Uji Praktik Administrasi Perkantoran", category: "Kegiatan", albumName: "Uji Kompetensi", imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" },
    { title: "Gedung Sekolah Tampak Depan yang Megah", category: "Fasilitas", albumName: "Lingkungan Sekolah", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800" },
    { title: "Pelatihan Palang Merah Remaja (PMR) Siaga", category: "Ekstrakurikuler", albumName: "PMR & UKS", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" },
    { title: "Workshop Robotika Siswa SMP & SMA Mitra", category: "Kegiatan", albumName: "Workshop", imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
    { title: "Pentas Seni Teater dan Musik Akustik OSIS", category: "Ekstrakurikuler", albumName: "Pensi Musik", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800" },
    { title: "Penghargaan Guru Inspiratif di Hari Guru", category: "Prestasi", albumName: "Apresiasi Guru", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
    { title: "Penerimaan Medali Juara LKS Nasional", category: "Prestasi", albumName: "Penghargaan", imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800" },
  ]

  for (const g of galleryData) {
    await prisma.gallery.create({
      data: g,
    })
  }
  console.log("✅ 20 Foto Galeri berhasil dibuat")

  // 12. Seed PPDB Registrations (5 Data Awal)
  const ppdbData = [
    {
      registrationNo: "PPDB-2026-0001",
      fullName: "Muhammad Rizky Pratama",
      nik: "3174011505080001",
      nisn: "0089123456",
      birthPlace: "Jakarta",
      birthDate: new Date("2010-05-15"),
      gender: "L",
      address: "Jl. Tebet Barat Dalam No. 12, Tebet, Jakarta Selatan",
      previousSchool: "SMP Negeri 115 Jakarta",
      phone: "081298765432",
      email: "rizky.pratama@gmail.com",
      majorId: createdMajors[0].id, // RPL
      documentUrl: "/uploads/dokumen-rizky.pdf",
      status: "VERIFIED",
      notes: "Berkas lengkap dan nilai rapor semester 1-5 rata-rata 88,5.",
    },
    {
      registrationNo: "PPDB-2026-0002",
      fullName: "Annisa Syifa Rahmadani",
      nik: "3174025208090003",
      nisn: "0091234567",
      birthPlace: "Bandung",
      birthDate: new Date("2010-08-22"),
      gender: "P",
      address: "Jl. Fatmawati Raya No. 40, Cilandak, Jakarta Selatan",
      previousSchool: "SMP Negeri 19 Jakarta",
      phone: "081387654321",
      email: "annisa.syifa@gmail.com",
      majorId: createdMajors[2].id, // DKV
      documentUrl: "/uploads/dokumen-annisa.pdf",
      status: "ACCEPTED",
      notes: "Lolos jalur prestasi desain grafis tingkat kota.",
    },
    {
      registrationNo: "PPDB-2026-0003",
      fullName: "Bima Arya Kusuma",
      nik: "3174031003090002",
      nisn: "0092345678",
      birthPlace: "Jakarta",
      birthDate: new Date("2010-03-10"),
      gender: "L",
      address: "Jl. Radio Dalam Raya No. 8, Kebayoran Baru, Jakarta Selatan",
      previousSchool: "SMP Islam Al-Azhar 1",
      phone: "081912345678",
      email: "bima.arya@gmail.com",
      majorId: createdMajors[1].id, // TJKT
      documentUrl: null,
      status: "PENDING",
      notes: "Menunggu kelengkapan legalisir Kartu Keluarga.",
    },
    {
      registrationNo: "PPDB-2026-0004",
      fullName: "Dewi Anggraini",
      nik: "3174044509090004",
      nisn: "0093456789",
      birthPlace: "Semarang",
      birthDate: new Date("2010-09-05"),
      gender: "P",
      address: "Jl. Mampang Prapatan VIII No. 15, Jakarta Selatan",
      previousSchool: "SMP Negeri 41 Jakarta",
      phone: "082134567890",
      email: "dewi.anggra@gmail.com",
      majorId: createdMajors[4].id, // AKL
      documentUrl: "/uploads/dokumen-dewi.pdf",
      status: "VERIFIED",
      notes: "Data rapor terverifikasi, nilai matematika 92.",
    },
    {
      registrationNo: "PPDB-2026-0005",
      fullName: "Fakhri Alamsyah",
      nik: "3174052011090005",
      nisn: "0094567890",
      birthPlace: "Jakarta",
      birthDate: new Date("2010-11-20"),
      gender: "L",
      address: "Jl. Bangka Raya No. 27, Pela Mampang, Jakarta Selatan",
      previousSchool: "SMP Negeri 12 Jakarta",
      phone: "087812345678",
      email: "fakhri.alam@gmail.com",
      majorId: createdMajors[3].id, // MPLB
      documentUrl: null,
      status: "PENDING",
      notes: "Baru mendaftar daring.",
    },
  ]

  for (const p of ppdbData) {
    await prisma.pPDBRegistration.upsert({
      where: { registrationNo: p.registrationNo },
      update: p,
      create: p,
    })
  }
  console.log("✅ 5 Pendaftaran PPDB berhasil dibuat")

  // 13. Seed Contact Messages
  const messagesData = [
    {
      name: "Irwan Santoso",
      email: "irwan.s@gmail.com",
      subject: "Pertanyaan Kuota Pendaftaran Jalur Prestasi PPDB 2026",
      message: "Selamat siang Bapak/Ibu Panitia PPDB, saya ingin menanyakan apakah sertifikat juara kejuaraan karate tingkat provinsi dapat digunakan untuk jalur prestasi kejuruan RPL? Terima kasih.",
      isRead: false,
    },
    {
      name: "PT Mitra Solusi Informatika",
      email: "hrd@mitrasolusi.id",
      subject: "Penawaran Kerjasama Penyaluran Magang (PKL) Siswa Jurusan RPL & TJKT",
      message: "Kami dari PT Mitra Solusi Informatika bermaksud mengajukan kemitraan magang industri untuk 10 orang siswa pada semester ganjil tahun ini. Mohon info PIC hubungan industri yang dapat kami hubungi.",
      isRead: true,
    },
    {
      name: "Siti Nurhaliza (Wali Murid)",
      email: "siti.nurhaliza.wali@yahoo.com",
      subject: "Konfirmasi Jadwal Pengambilan Ijazah Alumni 2025",
      message: "Mohon informasi jam operasional loket Tata Usaha untuk legalisir ijazah dan pengambilan surat keterangan hasil ujian. Terima kasih banyak.",
      isRead: false,
    },
  ]

  for (const m of messagesData) {
    await prisma.contactMessage.create({
      data: m,
    })
  }
  console.log("✅ 3 Pesan Kontak berhasil dibuat")

  console.log("✨ SEEDING DATABASE SELESAI DENGAN SUKSES!")
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
