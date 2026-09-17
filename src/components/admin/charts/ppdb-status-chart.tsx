"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface PPDBStatusChartProps {
  data: { name: string; value: number; color: string }[]
}

export function PPDBStatusChart({ data }: PPDBStatusChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="space-y-3">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={75}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            strokeWidth={2}
            stroke="hsl(var(--background))"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value: any, name: any) => [`${value} pendaftar`, name]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend items */}
      <div className="grid grid-cols-2 gap-2 px-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <div
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground truncate">{item.name}</span>
            <span className="font-bold text-foreground ml-auto">
              {total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
