import * as React from "react"
import { LucideIcon, Inbox } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed bg-card/40 p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground/80 shadow-xs">
        <Icon className="h-7 w-7" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base sm:text-lg font-bold text-foreground">{title}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
