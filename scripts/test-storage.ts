import {
  LocalStorageProvider,
  CloudflareR2StorageProvider,
  HybridStorageProvider,
  storage,
} from "../src/lib/storage"

let passed = 0
let failed = 0

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`)
    passed++
  } else {
    console.error(`  ❌ FAIL: ${testName}${detail ? ` -> ${detail}` : ""}`)
    failed++
  }
}

async function runStorageTests() {
  console.log("==================================================================")
  console.log("🧪 MENJALANKAN AUTOMATED STORAGE & CLOUDFLARE R2 TEST SUITE")
  console.log("==================================================================\n")

  // Test 1: Storage Singleton
  console.log("📌 1. Menguji Singleton Storage & Hybrid Auto-Switch:")
  assert(storage !== undefined && storage !== null, "Singleton `storage` berhasil diinisialisasi")
  assert(typeof storage.upload === "function", "`storage.upload` berupa fungsi valid")
  assert(typeof storage.delete === "function", "`storage.delete` berupa fungsi valid")

  const hybrid = new HybridStorageProvider()
  assert(hybrid.isR2Active === false, "Default tanpa R2 env: isR2Active = false (Fallback ke Local)")

  // Test 2: Local Storage Upload & Delete Lifecycle
  console.log("\n📌 2. Menguji Siklus Hidup Upload & Hapus pada Local Storage:")
  const local = new LocalStorageProvider()
  const dummyContent = "Contoh isi gambar pengujian unit test"
  const dummyFile = new File([dummyContent], "test-avatar.png", { type: "image/png" })

  const uploadRes = await local.upload(dummyFile, "teachers")
  assert(uploadRes.url.startsWith("/uploads/teachers_"), `URL berformat /uploads/teachers_... (${uploadRes.url})`)
  assert(uploadRes.filename.includes("test-avatar"), `Filename disanitasi dengan benar (${uploadRes.filename})`)
  assert(uploadRes.mimeType === "image/png", "MIME type tersimpan image/png")

  const deleteRes = await local.delete(uploadRes.url)
  assert(deleteRes === true, "Berkas lokal berhasil dihapus setelah uji upload")

  // Test 3: Security & Validation Guard
  console.log("\n📌 3. Menguji Keamanan Ekstensi & Validasi Berkas:")
  let caughtDangerousExt = false
  try {
    const dangerousFile = new File(["malicious"], "payload.php", { type: "application/x-php" })
    await local.upload(dangerousFile, "general")
  } catch (err: any) {
    caughtDangerousExt = true
    assert(err.message.includes("Ekstensi berkas tidak diizinkan"), "Ekstensi berbahaya (.php) berhasil diblokir")
  }
  assert(caughtDangerousExt, "Eksepsi dilempar saat mengunggah ekstensi ilegal")

  // Test 4: Cloudflare R2 Provider Instantiation & Validation
  console.log("\n📌 4. Menguji Validasi Kredensial Cloudflare R2:")
  let caughtMissingR2 = false
  try {
    // Should fail when instantiated without required env
    new CloudflareR2StorageProvider({
      accountId: "",
      accessKeyId: "",
      secretAccessKey: "",
      bucketName: "",
    })
  } catch (err: any) {
    caughtMissingR2 = true
    assert(err.message.includes("Kredensial Cloudflare R2 belum lengkap"), "Pesan error kredensial R2 akurat")
  }
  assert(caughtMissingR2, "CloudflareR2StorageProvider memvalidasi kelengkapan konfigurasi")

  // Instantiation with mock config succeeds
  const mockR2 = new CloudflareR2StorageProvider({
    accountId: "dummy-cf-account-id-12345",
    accessKeyId: "dummy-access-key-id",
    secretAccessKey: "dummy-secret-access-key",
    bucketName: "sekolah-assets",
    publicUrl: "https://pub-abc123xyz.r2.dev",
  })
  assert(mockR2 !== null && typeof mockR2.upload === "function", "CloudflareR2StorageProvider berhasil diinstansiasi dengan konfigurasi valid")

  // Test 5: Hybrid Storage Delegation
  console.log("\n📌 5. Menguji Delegasi Hybrid Storage:")
  const hybridUpload = await storage.upload(dummyFile, "facilities")
  assert(hybridUpload.url.startsWith("/uploads/facilities_"), "Hybrid storage mendelegasikan upload ke provider lokal saat offline")
  await storage.delete(hybridUpload.url)
  assert(true, "Hybrid storage mendelegasikan penghapusan berkas lokal")

  console.log("\n==================================================================")
  console.log(`🏁 HASIL PENGUJIAN STORAGE: ${passed} LULUS, ${failed} GAGAL`)
  console.log("==================================================================")

  if (failed > 0) {
    process.exit(1)
  } else {
    process.exit(0)
  }
}

runStorageTests().catch((err) => {
  console.error("Fatal test error:", err)
  process.exit(1)
})
