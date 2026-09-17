import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const staticRoutes = [
    "",
    "/profil",
    "/guru",
    "/siswa",
    "/jurusan",
    "/fasilitas",
    "/berita",
    "/pengumuman",
    "/agenda",
    "/prestasi",
    "/galeri",
    "/ppdb",
    "/ppdb/daftar",
    "/kontak",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  try {
    const news = await prisma.news.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    })

    const newsRoutes = news.map((item) => ({
      url: `${baseUrl}/berita/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))

    return [...staticRoutes, ...newsRoutes]
  } catch {
    return staticRoutes
  }
}
