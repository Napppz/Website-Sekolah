"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface StudentDistributionChartProps {
  data: { name: string; fullName: string; value: number; color: string }[]
}

const RADIAN = Math.PI / 180

function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (percent < 0.05) return null

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function StudentDistributionChart({ data }: StudentDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          innerRadius={50}
          fill="#8884d8"
          dataKey="value"
          strokeWidth={2}
          stroke="var(--card)"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 600,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
          }}
          labelStyle={{ color: "var(--foreground)" }}
          itemStyle={{ color: "var(--foreground)" }}
          formatter={(value: any, _name: any, props: any) => [
            `${value} siswa`,
            props.payload.fullName,
          ]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", fontWeight: 600 }}
          formatter={(value: string, entry: any) => (
            <span style={{ color: "var(--foreground)" }}>
              {entry.payload?.fullName || value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
