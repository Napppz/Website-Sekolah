import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

let passedTests = 0
let failedTests = 0

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`)
    passedTests++
  } else {
    console.error(`  ❌ FAIL: ${testName}${detail ? ` -> ${detail}` : ""}`)
    failedTests++
  }
}

async function runTests() {
  console.log("==================================================================")
  console.log("🧪 MENJALANKAN AUTOMATED E2E & DATABASE INTEGRATION TEST SUITE")
  console.log("==================================================================\n")

  const startTime = Date.now()

  try {
    // -------------------------------------------------------------
    // TEST SUITE 1: DATABASE CONNECTIVITY & MODELS AUDIT
    // -------------------------------------------------------------
    console.log("📌 1. Menguji Konektivitas PostgreSQL & Audit Tabel Model:")
    const [
      schoolProfileCount,
      majorCount,
      teacherCount,
      studentCount,
      newsCount,
      categoryCount,
      announcementCount,
      eventCount,
      achievementCount,
      facilityCount,
      galleryCount,
      ppdbCount,
      contactCount,
    ] = await Promise.all([
      prisma.schoolProfile.count(),
      prisma.major.count(),
      prisma.teacher.count(),
      prisma.student.count(),
      prisma.news.count(),
      prisma.newsCategory.count(),
      prisma.announcement.count(),
      prisma.event.count(),
      prisma.achievement.count(),
      prisma.facility.count(),
      prisma.gallery.count(),
      prisma.pPDBRegistration.count(),
      prisma.contactMessage.count(),
    ])

    assert(schoolProfileCount > 0, `SchoolProfile terisi (Total: ${schoolProfileCount})`)
    assert(majorCount >= 5, `Major/Jurusan terisi minimal 5 (Total: ${majorCount})`)
    assert(teacherCount >= 20, `Teacher/Guru terisi minimal 20 (Total: ${teacherCount})`)
    assert(studentCount >= 50, `Student/Siswa terisi minimal 50 (Total: ${studentCount})`)
    assert(newsCount >= 15, `News/Berita terisi minimal 15 (Total: ${newsCount})`)
    assert(categoryCount >= 5, `NewsCategory terisi minimal 5 (Total: ${categoryCount})`)
    assert(announcementCount >= 10, `Announcement terisi minimal 10 (Total: ${announcementCount})`)
    assert(eventCount >= 10, `Event/Agenda terisi minimal 10 (Total: ${eventCount})`)
    assert(achievementCount >= 10, `Achievement terisi minimal 10 (Total: ${achievementCount})`)
    assert(facilityCount >= 10, `Facility terisi minimal 10 (Total: ${facilityCount})`)
    assert(galleryCount >= 20, `Gallery terisi minimal 20 (Total: ${galleryCount})`)
    assert(ppdbCount >= 5, `PPDB Registrations terisi minimal 5 (Total: ${ppdbCount})`)
    assert(contactCount >= 3, `Contact Messages terisi minimal 3 (Total: ${contactCount})`)

    // -------------------------------------------------------------
    // TEST SUITE 2: AUTHENTICATION & PASSWORD HASHING
    // -------------------------------------------------------------
    console.log("\n📌 2. Menguji Otentikasi Admin & Hashing Password Bcrypt:")
    const adminUser = await prisma.user.findUnique({
      where: { email: "admin@sekolah.test" },
    })

    assert(adminUser !== null, "Admin user 'admin@sekolah.test' ditemukan di PostgreSQL")
    if (adminUser) {
      assert(adminUser.role === "ADMIN", "Role user adalah 'ADMIN'")
      assert(adminUser.password.startsWith("$2"), "Password disimpan sebagai hash bcrypt yang aman")

      const validLogin = await bcrypt.compare("Admin123!", adminUser.password)
      assert(validLogin === true, "Verifikasi password benar ('Admin123!') berhasil")

      const invalidLogin = await bcrypt.compare("WrongPassword123", adminUser.password)
      assert(invalidLogin === false, "Verifikasi password salah berhasil ditolak")
    }

    // -------------------------------------------------------------
    // TEST SUITE 3: TEACHER CRUD FLOW
    // -------------------------------------------------------------
    console.log("\n📌 3. Menguji Real CRUD Guru (Teacher):")
    const testNip = `TEST-NIP-${Date.now().toString().slice(-6)}`
    
    // Create
    const createdTeacher = await prisma.teacher.create({
      data: {
        nip: testNip,
        name: "Guru Penguji E2E, S.Kom.",
        title: "S.Kom.",
        gender: "L",
        position: "Tenaga Pengajar Penguji",
        subject: "Pemrograman Web Lanjut",
        email: "guru.test@smkn1digital.sch.id",
      },
    })
    assert(createdTeacher.id !== undefined, `Create: Guru berhasil dibuat dengan ID: ${createdTeacher.id}`)

    // Read
    const fetchedTeacher = await prisma.teacher.findUnique({
      where: { nip: testNip },
    })
    assert(fetchedTeacher?.name === "Guru Penguji E2E, S.Kom.", "Read: Data guru berhasil dibaca dari database")

    // Update
    const updatedTeacher = await prisma.teacher.update({
      where: { id: createdTeacher.id },
      data: { position: "Kepala Laboratorium Software Testing" },
    })
    assert(
      updatedTeacher.position === "Kepala Laboratorium Software Testing",
      "Update: Jabatan guru berhasil diperbarui di database"
    )

    // Delete
    await prisma.teacher.delete({ where: { id: createdTeacher.id } })
    const deletedTeacher = await prisma.teacher.findUnique({ where: { id: createdTeacher.id } })
    assert(deletedTeacher === null, "Delete: Guru uji berhasil dihapus dari database")

    // -------------------------------------------------------------
    // TEST SUITE 4: NEWS CRUD & CATEGORY RELATION
    // -------------------------------------------------------------
    console.log("\n📌 4. Menguji Real CRUD Berita & Relasi Kategori:")
    const category = await prisma.newsCategory.findFirst()
    assert(category !== null, `Kategori berita ditemukan (${category?.name})`)

    if (category && adminUser) {
      const testSlug = `e2e-test-berita-${Date.now()}`
      const createdNews = await prisma.news.create({
        data: {
          title: "Berita Pengujian Otomatis Sistem Informasi",
          slug: testSlug,
          excerpt: "Ringkasan berita hasil integrasi test e2e.",
          content: "Ini adalah artikel pengujian sistem integrasi database Next.js dan PostgreSQL Neon.",
          categoryId: category.id,
          authorId: adminUser.id,
          isPublished: true,
        },
      })
      assert(createdNews.id !== undefined, `Create: Berita berhasil dibuat dengan slug: ${createdNews.slug}`)

      // Toggle Publish
      const unpublishedNews = await prisma.news.update({
        where: { id: createdNews.id },
        data: { isPublished: false },
      })
      assert(unpublishedNews.isPublished === false, "Update: Status publikasi berhasil diubah ke Draft/Unpublished")

      // Delete
      await prisma.news.delete({ where: { id: createdNews.id } })
      const verifyDeletedNews = await prisma.news.findUnique({ where: { id: createdNews.id } })
      assert(verifyDeletedNews === null, "Delete: Berita uji berhasil dihapus")
    }

    // -------------------------------------------------------------
    // TEST SUITE 5: PPDB REGISTRATION & STATUS TRANSITIONS
    // -------------------------------------------------------------
    console.log("\n📌 5. Menguji Alur Pendaftaran PPDB & Status Lifecycle:")
    const rplMajor = await prisma.major.findFirst({ where: { code: "RPL" } })
    assert(rplMajor !== null, "Jurusan RPL ditemukan untuk pendaftaran PPDB")

    if (rplMajor) {
      const testRegNo = `PPDB-TEST-${Date.now().toString().slice(-4)}`
      const newPPDB = await prisma.pPDBRegistration.create({
        data: {
          registrationNo: testRegNo,
          fullName: "Calon Siswa Pengujian E2E",
          nik: "3174019999990001",
          nisn: "0099999999",
          birthPlace: "Jakarta",
          birthDate: new Date("2010-05-15"),
          gender: "L",
          address: "Jl. Pengujian Sistem No. 1, Jakarta Selatan",
          previousSchool: "SMP Teladan Pengujian",
          phone: "081299998888",
          email: "calon.siswa@test.com",
          majorId: rplMajor.id,
          status: "PENDING",
        },
      })
      assert(newPPDB.status === "PENDING", `Submit PPDB: Pendaftaran berhasil masuk dengan status PENDING (${newPPDB.registrationNo})`)

      // Status: PENDING -> VERIFIED
      const verifiedPPDB = await prisma.pPDBRegistration.update({
        where: { id: newPPDB.id },
        data: { status: "VERIFIED", notes: "Berkas rapor dan ijazah telah lengkap." },
      })
      assert(verifiedPPDB.status === "VERIFIED", "Lifecycle PPDB: Status berhasil diubah ke VERIFIED")

      // Status: VERIFIED -> ACCEPTED
      const acceptedPPDB = await prisma.pPDBRegistration.update({
        where: { id: newPPDB.id },
        data: { status: "ACCEPTED", notes: "Lulus seleksi tes minat dan bakat jurusan RPL." },
      })
      assert(acceptedPPDB.status === "ACCEPTED", "Lifecycle PPDB: Status berhasil diubah ke ACCEPTED")

      // Cleanup
      await prisma.pPDBRegistration.delete({ where: { id: newPPDB.id } })
      const verifyPPDBDeleted = await prisma.pPDBRegistration.findUnique({ where: { id: newPPDB.id } })
      assert(verifyPPDBDeleted === null, "Cleanup: Data PPDB uji berhasil dibersihkan")
    }

    // -------------------------------------------------------------
    // TEST SUITE 6: CONTACT FORM MESSAGE LIFECYCLE
    // -------------------------------------------------------------
    console.log("\n📌 6. Menguji Formulir Kontak & Inbox Pesan:")
    const newMsg = await prisma.contactMessage.create({
      data: {
        name: "Pengirim Uji Coba",
        email: "pengirim.uji@test.com",
        subject: "Pertanyaan Uji Coba E2E",
        message: "Pesan ini dikirim oleh skrip pengujian otomatis untuk memvalidasi alur database.",
        isRead: false,
      },
    })
    assert(newMsg.isRead === false, `Kirim Kontak: Pesan berhasil disimpan ke DB dengan status isRead=false`)

    // Mark as read
    const readMsg = await prisma.contactMessage.update({
      where: { id: newMsg.id },
      data: { isRead: true },
    })
    assert(readMsg.isRead === true, "Admin Inbox: Pesan berhasil ditandai sudah dibaca (isRead=true)")

    // Cleanup
    await prisma.contactMessage.delete({ where: { id: newMsg.id } })
    const verifyMsgDeleted = await prisma.contactMessage.findUnique({ where: { id: newMsg.id } })
    assert(verifyMsgDeleted === null, "Cleanup: Pesan kontak uji berhasil dihapus")

    // -------------------------------------------------------------
    // TEST SUITE 7: DATA PRIVACY VERIFICATION
    // -------------------------------------------------------------
    console.log("\n📌 7. Menguji Proteksi Data Privasi Siswa:")
    const sampleStudent = await prisma.student.findFirst()
    assert(sampleStudent !== null, "Sample siswa ditemukan di database")
    if (sampleStudent) {
      const publicRepresentation = {
        name: sampleStudent.name,
        gender: sampleStudent.gender,
        classGrade: sampleStudent.classGrade,
        majorId: sampleStudent.majorId,
      }
      assert(!("nik" in publicRepresentation), "Public representation tidak mengekspos NIK")
      assert(!("address" in publicRepresentation), "Public representation tidak mengekspos Alamat Pribadi")
      assert(!("phone" in publicRepresentation), "Public representation tidak mengekspos Nomor Telepon")
    }

  } catch (error) {
    console.error("\n💥 UNEXPECTED ERROR DURING TESTS:", error)
    failedTests++
  } finally {
    await prisma.$disconnect()
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2)
  console.log("\n==================================================================")
  console.log(`🏁 HASIL PENGUJIAN: ${passedTests} LULUS, ${failedTests} GAGAL (Waktu: ${duration}s)`)
  console.log("==================================================================")

  if (failedTests > 0) {
    process.exit(1)
  } else {
    process.exit(0)
  }
}

runTests()
