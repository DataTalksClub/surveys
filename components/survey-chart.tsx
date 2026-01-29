"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Tooltip,
} from "recharts"
import ReactWordcloud from "react-wordcloud"
import type { ChartType } from "@/lib/survey-config"

type ChartData = {
  name: string
  value: number
  percentage: number
  count?: number
  text?: string
}

interface SurveyChartProps {
  title: string
  description: string
  data: ChartData[]
  chartType: ChartType
  totalResponses: number
  compact?: boolean
  showCounts?: boolean
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

// Helper to calculate dynamic width for Y-axis based on longest label
function calculateYAxisWidth(labels: string[], compact: boolean): number {
  const maxLength = Math.max(...labels.map(label => label.length))
  // Base width + character width estimation (approximately 6-7px per character)
  const baseWidth = compact ? 100 : 120
  const charWidth = 7
  return Math.min(Math.max(baseWidth, maxLength * charWidth), 400) // Cap at 400px
}

export function SurveyChart({
  title,
  description,
  data,
  chartType,
  totalResponses,
  compact = false,
  showCounts = false,
}: SurveyChartProps) {
  // Filter out invalid data items
  const validData = data.filter(item => item && item.name)
  
  // Calculate dynamic heights and margins based on data
  const maxLabelLength = validData.length > 0 
    ? Math.max(...validData.map(item => item.name.length))
    : 0
  const chartHeight = compact
    ? chartType === "horizontal-bar"
      ? Math.max(200, validData.length * 40)
      : chartType === "wordcloud"
      ? 400
      : 280
    : chartType === "horizontal-bar"
      ? Math.max(280, validData.length * 45)
      : chartType === "bar"
      ? Math.max(320, 200 + (maxLabelLength > 30 ? 80 : 60))
      : chartType === "wordcloud"
      ? 500
      : 320
  
  const yAxisWidth = chartType === "horizontal-bar" 
    ? calculateYAxisWidth(validData.map(item => item.name), compact)
    : undefined
  
  const bottomMargin = chartType === "bar"
    ? Math.max(compact ? 50 : 60, Math.min(maxLabelLength * 2.5, 150))
    : undefined

  return (
    <div className="bg-card rounded-xl border border-border p-5 md:p-6">
      <div className="mb-4">
        <h3 className="text-base font-title font-medium text-foreground mb-1 text-balance leading-snug">
          {title}
        </h3>
      </div>

      <div className="mb-4" style={chartType === "citations" || chartType === "tags" ? {} : { height: chartHeight }}>
        {chartType === "citations" ? (
          <div className="space-y-4">
            {validData
              .filter(item => item.text)
              .map((item, index) => (
                <blockquote
                  key={index}
                  className="border-l-4 border-primary pl-4 py-3 italic text-sm md:text-base text-foreground bg-muted/30 rounded-r leading-relaxed"
                >
                  "{item.text}"
                </blockquote>
              ))}
          </div>
        ) : chartType === "tags" ? (
          <div className="flex flex-wrap gap-3 items-center justify-center py-4">
            {validData
              .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
              .map((item, index) => {
                const percentage = item.percentage || 0
                // Find min and max percentages in the dataset for better scaling
                const percentages = validData.map(d => d.percentage || 0)
                const minPct = Math.min(...percentages)
                const maxPct = Math.max(...percentages)
                const range = maxPct - minPct || 1 // Avoid division by zero
                
                // Normalize percentage to 0-1 range based on actual data range
                const normalized = range > 0 ? (percentage - minPct) / range : 0.5
                
                // Scale font size based on normalized percentage (min 0.875rem, max 1.25rem)
                const fontSize = 0.875 + normalized * 0.375
                // Scale padding based on normalized percentage (min 0.5rem, max 0.875rem)
                const paddingX = 0.5 + normalized * 0.375
                const paddingY = 0.375 + normalized * 0.25
                const colorIndex = index % COLORS.length
                return (
                  <span
                    key={index}
                    className="inline-block rounded-full font-medium transition-all hover:scale-105"
                    style={{
                      fontSize: `${fontSize}rem`,
                      padding: `${paddingY}rem ${paddingX}rem`,
                      backgroundColor: `var(--chart-${(colorIndex + 1)})`,
                      color: 'white',
                      opacity: 0.9,
                    }}
                  >
                    {item.name}
                    <span className="ml-2 opacity-80" style={{ fontSize: `${fontSize * 0.7}rem` }}>({Math.round(percentage)}%)</span>
                  </span>
                )
              })}
          </div>
        ) : chartType === "wordcloud" ? (
          <div style={{ width: "100%", height: "100%" }}>
            <ReactWordcloud
              words={validData.map((item) => ({
                text: item.name,
                value: item.count || item.value || item.percentage,
              }))}
              options={{
                rotations: 2,
                fontSizes: [12, 60] as [number, number],
                fontFamily: "system-ui, -apple-system, sans-serif",
                colors: COLORS,
                deterministic: true,
                enableTooltip: true,
                padding: 5,
                scale: "sqrt",
                spiral: "archimedean",
                transitionDuration: 1000,
              }}
              callbacks={{
                onWordClick: (word) => {
                  console.log("Word clicked:", word)
                },
                getWordTooltip: (word) =>
                  `${word.text}: ${word.value}${chartType === "wordcloud" ? "" : "%"}`,
              }}
            />
          </div>
        ) : chartType === "pie" ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={validData}
                cx="50%"
                cy="50%"
                innerRadius={compact ? 45 : 55}
                outerRadius={compact ? 75 : 90}
                paddingAngle={2}
                dataKey="percentage"
                nameKey="name"
                label={({ name, percentage }) =>
                  `${name} ${percentage}%`
                }
                labelLine={{ stroke: "var(--muted-foreground)", strokeWidth: 1 }}
              >
                {validData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as ChartData
                    return (
                      <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-md">
                        <p className="text-sm font-medium text-popover-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.percentage}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : chartType === "horizontal-bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={validData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={yAxisWidth ?? (compact ? 120 : 140)}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => value}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as ChartData
                    return (
                      <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-md">
                        <p className="text-sm font-medium text-popover-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.percentage}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                {validData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={validData}
              margin={{ top: 5, right: 20, left: 10, bottom: bottomMargin ?? (compact ? 50 : 60) }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                angle={-45}
                textAnchor="end"
                height={Math.max(compact ? 60 : 70, Math.min(maxLabelLength * 2, 120))}
                tickFormatter={(value) => value}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => showCounts ? `${value}` : `${value}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as ChartData
                    return (
                      <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-md">
                        <p className="text-sm font-medium text-popover-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {showCounts ? item.count || item.value : `${item.percentage}%`}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey={showCounts ? "count" : "percentage"} radius={[4, 4, 0, 0]}>
                {validData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
