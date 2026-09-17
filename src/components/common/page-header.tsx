import * as React from "react"
import { Breadcrumb, BreadcrumbItem } from "@/components/common/breadcrumb"
import { Badge } from "@/components/ui/badge"

interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  breadcrumb: BreadcrumbItem[]
  children?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumb,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <section
      className={`border-b bg-card/60 backdrop-blur-xs py-10 md:py-14 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-4">
          <Breadcrumb items={breadcrumb} />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              {badge && (
                <Badge
                  variant="outline"
                  className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold px-3 py-0.5 rounded-full"
                >
                  {badge}
                </Badge>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {children && <div className="shrink-0">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
