import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      ...(process.env.R2_PUBLIC_URL
        ? [
            {
              protocol: (process.env.R2_PUBLIC_URL.startsWith("https") ? "https" : "http") as "https" | "http",
              hostname: new URL(process.env.R2_PUBLIC_URL).hostname,
            },
          ]
        : []),
    ],
  },
  async rewrites() {
    return [
      { source: "/admin/teachers", destination: "/admin/guru" },
      { source: "/admin/students", destination: "/admin/siswa" },
      { source: "/admin/majors", destination: "/admin/jurusan" },
      { source: "/admin/facilities", destination: "/admin/fasilitas" },
      { source: "/admin/news", destination: "/admin/berita" },
      { source: "/admin/announcements", destination: "/admin/pengumuman" },
      { source: "/admin/events", destination: "/admin/agenda" },
      { source: "/admin/achievements", destination: "/admin/prestasi" },
      { source: "/admin/gallery", destination: "/admin/galeri" },
      { source: "/admin/messages", destination: "/admin/kontak" },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
