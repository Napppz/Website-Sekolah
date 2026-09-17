"use client"

import * as React from "react"

interface StatCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function StatCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 1200,
  className = "",
}: StatCounterProps) {
  const [count, setCount] = React.useState(0)
  const elementRef = React.useRef<HTMLSpanElement>(null)
  const hasAnimated = React.useRef(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let startTimestamp: number | null = null
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            // Ease out quad
            const easeOutProgress = 1 - (1 - progress) * (1 - progress)
            setCount(Math.floor(easeOutProgress * end))
            if (progress < 1) {
              window.requestAnimationFrame(step)
            } else {
              setCount(end)
            }
          }
          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.2 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  )
}
