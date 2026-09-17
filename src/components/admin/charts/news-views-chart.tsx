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
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.6} horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <YAxis
          dataKey="title"
          type="category"
          width={160}
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
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
          formatter={(value: any, _name: any, props: any) => [
            `${Number(value).toLocaleString("id-ID")} views`,
            props.payload.fullTitle,
          ]}
          labelFormatter={() => ""}
        />
        <Bar
          dataKey="views"
          fill="var(--primary)"
          radius={[0, 8, 8, 0]}
          maxBarSize={28}
          opacity={0.9}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
