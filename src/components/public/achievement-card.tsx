import * as React from "react"
import Image from "next/image"
import { Trophy, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface AchievementItemProps {
  id: string
  title: string
  participant?: string
  student?: string
  level: string
  year: number | string
  category: string
  photo?: string | null
  image?: string | null
}

interface AchievementCardProps {
  achievement: AchievementItemProps
  className?: string
}

export function AchievementCard({
  achievement,
  className = "",
}: AchievementCardProps) {
  const imageSrc =
    achievement.photo ||
    achievement.image ||
    "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800"

  const studentName =
    achievement.participant || achievement.student || "Siswa Berprestasi"

  return (
    <div
      className={`group flex flex-col rounded-2xl border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xs transition-all ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={achievement.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge className="bg-amber-500/90 text-white font-semibold backdrop-blur-xs text-[11px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Tingkat {achievement.level}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground font-semibold backdrop-blur-xs text-[10px] px-2 py-0.5 rounded-md"
          >
            Tahun {achievement.year}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
            {achievement.category}
          </span>
          <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {achievement.title}
          </h3>
        </div>

        <div className="pt-2 border-t flex items-center gap-1.5 text-xs text-muted-foreground line-clamp-1">
          <User className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="font-medium text-foreground">{studentName}</span>
        </div>
      </div>
    </div>
  )
}
