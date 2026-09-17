import * as React from "react"
import Image from "next/image"
import { Mail, BookOpen, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface TeacherItemProps {
  id: string
  nip: string
  name: string
  title?: string | null
  gender?: string
  position: string
  subject: string
  photo?: string | null
  email?: string | null
}

interface TeacherCardProps {
  teacher: TeacherItemProps
  className?: string
}

export function TeacherCard({ teacher, className = "" }: TeacherCardProps) {
  const photoSrc =
    teacher.photo ||
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400"

  return (
    <div
      className={`group flex flex-col rounded-2xl border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xs transition-all ${className}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <Image
          src={photoSrc}
          alt={teacher.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground font-semibold backdrop-blur-xs text-[11px] px-2.5 py-0.5 rounded-full"
          >
            {teacher.position}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {teacher.name}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
            <BookOpen className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{teacher.subject}</span>
          </p>
        </div>

        <div className="pt-2 border-t flex flex-col gap-1 text-[11px] text-muted-foreground">
          <span className="font-mono text-[10px]">NIP. {teacher.nip}</span>
          {teacher.email && (
            <span className="flex items-center gap-1 truncate">
              <Mail className="h-3 w-3 shrink-0" />
              {teacher.email}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
