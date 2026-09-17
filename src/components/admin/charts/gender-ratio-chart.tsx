"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface GenderRatioChartProps {
  data: { gender: string; count: number; color: string }[]
}

export function GenderRatioChart({ data }: GenderRatioChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="space-y-4">
      {/* Summary Bars */}
      <div className="space-y-3">
        {data.map((item) => {
          const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0"
          return (
            <div key={item.gender} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold text-foreground">{item.gender}</span>
                </div>
                <span className="font-bold text-foreground">
                  {item.count.toLocaleString("id-ID")} <span className="text-muted-foreground font-medium">({pct}%)</span>
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barGap={12}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
          <XAxis
            dataKey="gender"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value: any) => [`${value.toLocaleString("id-ID")} siswa`, "Jumlah"]}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
