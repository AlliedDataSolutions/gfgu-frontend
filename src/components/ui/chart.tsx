"use client"

import type * as React from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts"

export {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
}

interface SparkLineChartProps {
  data: any[]
  index?: string
  categories?: string[]
  colors?: string[]
  className?: string
  color?: string
}

export function SparkLineChart({
  data,
  index = "name",
  categories = ["value"],
  colors = ["hsl(var(--chart-1))"],
  className,
  color,
}: SparkLineChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={color || colors[i % colors.length]}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ChartContainer({
  children,
  config,
  className,
}: {
  children: React.ReactNode
  config: Record<string, any>
  className?: string
}) {
  return (
    <div
      className={className}
      style={
        {
          "--color-primary": "hsl(var(--chart-1))",
          "--color-secondary": "hsl(var(--chart-2))",
          "--color-tertiary": "hsl(var(--chart-3))",
          "--color-quaternary": "hsl(var(--chart-4))",
          "--color-quinary": "hsl(var(--chart-5))",
          ...Object.entries(config).reduce(
            (acc, [key, value]) => {
              if (value.color) {
                acc[`--color-${key}`] = value.color
              }
              return acc
            },
            {} as Record<string, string>,
          ),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

export function ChartTooltip({
  active,
  payload,
  label,
  content,
  className,
  ...props
}: {
  active?: boolean
  payload?: any[]
  label?: string
  content?: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  if (!active || !payload?.length) {
    return null
  }

  if (content) {
    return <div className={className}>{content}</div>
  }

  return (
    <div
      className={className}
      style={{
        backgroundColor: "var(--tooltip-bg, white)",
        color: "var(--tooltip-color, black)",
        padding: "var(--tooltip-padding, 8px)",
        border: "var(--tooltip-border, 1px solid #ccc)",
        borderRadius: "var(--tooltip-border-radius, 4px)",
      }}
      {...props}
    >
      <div>{label}</div>
      <div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`}>
            {entry.name}: {entry.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartTooltipContent({
  payload,
  active,
  config,
  className,
  indicator = "dot",
  hideLabel,
  ...props
}: {
  payload?: any[]
  active?: boolean
  config?: Record<string, any>
  className?: string
  indicator?: "dot" | "line"
  hideLabel?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={className}
      style={{
        backgroundColor: "white",
        padding: "12px",
        border: "1px solid #e2e8f0",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
      {...props}
    >
      {!hideLabel && <div className="text-sm font-medium mb-2">{payload[0].payload.name}</div>}
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const color = entry.color || `var(--color-${entry.dataKey})`
          const name = config?.[entry.dataKey]?.label || entry.name || entry.dataKey
          const icon = config?.[entry.dataKey]?.icon

          return (
            <div key={`item-${index}`} className="flex items-center">
              {indicator === "dot" ? (
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }} />
              ) : (
                <div className="w-3 h-0.5 mr-2" style={{ backgroundColor: color }} />
              )}
              <span className="text-sm text-gray-500 mr-2">{name}:</span>
              <span className="text-sm font-medium ml-auto">
                {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

