import * as React from "react"
import { Badge } from "@/components/ui/badge"

interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  action?: React.ReactNode
  className?: string
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  action,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center"

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 ${
        isCenter ? "text-center md:flex-col md:items-center" : ""
      } ${className}`}
    >
      <div className={`space-y-2.5 ${isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
        {badge && (
          <Badge
            variant="outline"
            className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full mb-1"
          >
            {badge}
          </Badge>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className={`shrink-0 ${isCenter ? "mt-2" : ""}`}>{action}</div>}
    </div>
  )
}
