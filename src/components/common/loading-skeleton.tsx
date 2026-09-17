import * as React from "react"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted/60 dark:bg-muted/40 ${className}`}
    />
  )
}

interface LoadingSkeletonProps {
  variant?: "card" | "table" | "list"
  count?: number
  className?: string
}

export function LoadingSkeleton({
  variant = "card",
  count = 3,
  className = "",
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count })

  if (variant === "table") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="h-10 w-full rounded-xl bg-muted/70 animate-pulse" />
        {items.map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border rounded-xl bg-card animate-pulse"
          >
            <div className="h-10 w-10 rounded-lg bg-muted shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/3 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted/70" />
            </div>
            <div className="h-8 w-20 rounded bg-muted shrink-0" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === "list") {
    return (
      <div className={`space-y-3 ${className}`}>
        {items.map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border rounded-xl bg-card animate-pulse"
          >
            <div className="h-12 w-12 rounded-xl bg-muted shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-2/5 rounded bg-muted" />
              <div className="h-3 w-3/4 rounded bg-muted/70" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Card variant
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {items.map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border bg-card p-5 space-y-4 animate-pulse"
        >
          <div className="aspect-[16/10] w-full rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-1/4 rounded bg-muted/80" />
            <div className="h-5 w-3/4 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted/70" />
            <div className="h-3 w-4/5 rounded bg-muted/70" />
          </div>
        </div>
      ))}
    </div>
  )
}
