import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (user && (await bcrypt.compare(password, user.password))) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              image: user.image,
            }
          }
        } catch (e) {
          console.warn("Database unreached during login, testing fallback admin credentials", e)
        }

        // Fallback exclusively for local development if database is starting or in setup
        if (
          process.env.NODE_ENV !== "production" &&
          email === "admin@sekolah.test" &&
          password === "Admin123!"
        ) {
          return {
            id: "admin-dev-id",
            name: "Administrator Utama",
            email: "admin@sekolah.test",
            role: "ADMIN",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "ADMIN"
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "f6c80520268a2bf189bb53e7a02798e47f71120f269dc03c810b411d7fbebf91",
})
