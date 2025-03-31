"use client"

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Updated data with INR as base currency
const data = [
  {
    name: "India",
    revenue: 2500000,
    color: "#8b5cf6",
    currency: "INR",
    growth: "+12%",
    originalRevenue: 2500000,
  },
  {
    name: "UAE",
    revenue: 2727600, // 120,000 AED converted to INR
    color: "#3b82f6",
    currency: "INR",
    growth: "+8%",
    originalRevenue: 120000,
  },
  {
    name: "USA",
    revenue: 3166540, // 38,000 USD converted to INR
    color: "#10b981",
    currency: "INR",
    growth: "+15%",
    originalRevenue: 38000,
  },
]

export function BranchPerformance() {
  const { formatCurrency, currentCurrency } = useAppContext()

  return (
    <div className="space-y-6">
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value).replace(/[^0-9.]/g, "")}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={60}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(value as number), "Revenue"]}
              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
            />
            <Bar
              dataKey="revenue"
              radius={[0, 4, 4, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Branch`,
                  description: `Revenue: ${formatCurrency(data.revenue)} (${data.growth})`,
                })
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {data.map((branch, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => {
              toast({
                title: `${branch.name} Branch`,
                description: `Revenue: ${formatCurrency(branch.revenue)} (${branch.growth})`,
              })
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: branch.color }} />
              <span className="text-sm font-medium">{branch.name} Branch</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-sm font-medium">{formatCurrency(branch.revenue)}</div>
              <Badge className="bg-green-500">{branch.growth}</Badge>
              <Badge variant="outline">INR</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

