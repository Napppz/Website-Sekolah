import * as React from "react"
import Image from "next/image"
import { Users, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface FacilityItemProps {
  id: string
  name: string
  category: string
  capacity?: number | null
  condition: string
  description?: string | null
  image?: string | null
}

interface FacilityCardProps {
  facility: FacilityItemProps
  className?: string
}

export function FacilityCard({ facility, className = "" }: FacilityCardProps) {
  const imageSrc =
    facility.image ||
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"

  return (
    <div
      className={`group relative rounded-2xl border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xs transition-all flex flex-col ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={facility.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground font-semibold backdrop-blur-xs text-[11px] px-2.5 py-0.5 rounded-full"
          >
            {facility.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs ${
              facility.condition.toLowerCase().includes("baik") ||
              facility.condition.toLowerCase().includes("unggul")
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
            }`}
          >
            {facility.condition}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
            {facility.name}
          </h3>
          {facility.description && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {facility.description}
            </p>
          )}
        </div>

        {facility.capacity && (
          <div className="pt-2 border-t flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span>Kapasitas ~{facility.capacity} Orang</span>
          </div>
        )}
      </div>
    </div>
  )
}
