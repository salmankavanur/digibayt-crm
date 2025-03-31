"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"
import { useMemo, useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Branch-specific pipeline data
const pipelineData = {
  all: [
    { name: "Discovery", value: 12, color: "#8b5cf6" },
    { name: "Proposal", value: 8, color: "#3b82f6" },
    { name: "Negotiation", value: 5, color: "#f59e0b" },
    { name: "Closed Won", value: 10, color: "#10b981" },
    { name: "Closed Lost", value: 4, color: "#ef4444" },
  ],
  india: [
    { name: "Discovery", value: 5, color: "#8b5cf6" },
    { name: "Proposal", value: 4, color: "#3b82f6" },
    { name: "Negotiation", value: 2, color: "#f59e0b" },
    { name: "Closed Won", value: 4, color: "#10b981" },
    { name: "Closed Lost", value: 1, color: "#ef4444" },
  ],
  uae: [
    { name: "Discovery", value: 3, color: "#8b5cf6" },
    { name: "Proposal", value: 2, color: "#3b82f6" },
    { name: "Negotiation", value: 1, color: "#f59e0b" },
    { name: "Closed Won", value: 2, color: "#10b981" },
    { name: "Closed Lost", value: 1, color: "#ef4444" },
  ],
  usa: [
    { name: "Discovery", value: 4, color: "#8b5cf6" },
    { name: "Proposal", value: 2, color: "#3b82f6" },
    { name: "Negotiation", value: 2, color: "#f59e0b" },
    { name: "Closed Won", value: 4, color: "#10b981" },
    { name: "Closed Lost", value: 2, color: "#ef4444" },
  ],
}

export function PipelineStats({ branch = "all" }) {
  const { formatCurrency } = useAppContext()
  const [data, setData] = useState(pipelineData.all)

  // Update data when branch changes
  useEffect(() => {
    setData(pipelineData[branch] || pipelineData.all)
  }, [branch])

  const total = useMemo(() => data.reduce((acc, item) => acc + item.value, 0), [data])

  // Calculate average deal values by stage (for tooltip)
  const avgDealValues = {
    Discovery: 5000,
    Proposal: 12000,
    Negotiation: 18000,
    "Closed Won": 15000,
    "Closed Lost": 8000,
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="h-[200px] w-full sm:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onClick={(entry) => {
                toast({
                  title: entry.name,
                  description: `${entry.value} deals (${((entry.value / total) * 100).toFixed(1)}%) - Avg. value: ${formatCurrency(avgDealValues[entry.name])}`,
                })
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} deals (${((Number(value) / total) * 100).toFixed(1)}%)`, "Count"]}
              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:w-1/2 md:grid-cols-2 lg:grid-cols-1">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border p-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => {
              toast({
                title: item.name,
                description: `${item.value} deals (${((item.value / total) * 100).toFixed(1)}%) - Avg. value: ${formatCurrency(avgDealValues[item.name])}`,
              })
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {item.value}
              </Badge>
              <span className="text-xs text-muted-foreground">{((item.value / total) * 100).toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

