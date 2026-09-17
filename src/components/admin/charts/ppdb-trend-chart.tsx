"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface PPDBTrendChartProps {
  data: { month: string; pendaftar: number }[]
}

export function PPDBTrendChart({ data }: PPDBTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="ppdbGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.6} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 600,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
          }}
          labelStyle={{ color: "var(--foreground)", fontWeight: 700 }}
          itemStyle={{ color: "var(--primary)" }}
          formatter={(value: any) => [`${value} pendaftar`, "Jumlah"]}
        />
        <Area
          type="monotone"
          dataKey="pendaftar"
          stroke="var(--primary)"
          strokeWidth={2.5}
          fill="url(#ppdbGradient)"
          dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "var(--card)" }}
          activeDot={{ r: 6, strokeWidth: 2, stroke: "var(--card)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
