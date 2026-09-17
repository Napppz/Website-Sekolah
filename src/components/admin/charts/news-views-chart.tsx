"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface NewsViewsChartProps {
  data: { title: string; fullTitle: string; views: number }[]
}

export function NewsViewsChart({ data }: NewsViewsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <YAxis
          dataKey="title"
          type="category"
          width={160}
          tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
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
          formatter={(value: any, _name: any, props: any) => [
            `${Number(value).toLocaleString("id-ID")} views`,
            props.payload.fullTitle,
          ]}
          labelFormatter={() => ""}
        />
        <Bar
          dataKey="views"
          fill="hsl(var(--primary))"
          radius={[0, 8, 8, 0]}
          maxBarSize={28}
          opacity={0.85}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
