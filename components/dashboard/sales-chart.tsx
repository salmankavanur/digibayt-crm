"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Branch-specific data updated to use INR as base currency
const salesData = {
  all: {
    monthly: [
      { name: "Jan", revenue: 333200, deals: 24 },
      { name: "Feb", revenue: 249900, deals: 18 },
      { name: "Mar", revenue: 416600, deals: 29 },
      { name: "Apr", revenue: 666400, deals: 41 },
      { name: "May", revenue: 499800, deals: 32 },
      { name: "Jun", revenue: 791350, deals: 52 },
    ],
    quarterly: [
      { name: "Q1", revenue: 999600, deals: 71 },
      { name: "Q2", revenue: 1957550, deals: 125 },
      { name: "Q3", revenue: 1499400, deals: 98 },
      { name: "Q4", revenue: 2249100, deals: 142 },
    ],
  },
  india: {
    monthly: [
      { name: "Jan", revenue: 180000, deals: 10 },
      { name: "Feb", revenue: 220000, deals: 12 },
      { name: "Mar", revenue: 280000, deals: 15 },
      { name: "Apr", revenue: 350000, deals: 18 },
      { name: "May", revenue: 420000, deals: 22 },
      { name: "Jun", revenue: 480000, deals: 25 },
    ],
    quarterly: [
      { name: "Q1", revenue: 680000, deals: 37 },
      { name: "Q2", revenue: 1250000, deals: 65 },
      { name: "Q3", revenue: 950000, deals: 48 },
      { name: "Q4", revenue: 1100000, deals: 55 },
    ],
  },
  uae: {
    monthly: [
      { name: "Jan", revenue: 341000, deals: 8 }, // Converted from AED to INR
      { name: "Feb", revenue: 409200, deals: 10 },
      { name: "Mar", revenue: 500100, deals: 12 },
      { name: "Apr", revenue: 568300, deals: 14 },
      { name: "May", revenue: 682000, deals: 16 },
      { name: "Jun", revenue: 795600, deals: 18 },
    ],
    quarterly: [
      { name: "Q1", revenue: 1250300, deals: 30 },
      { name: "Q2", revenue: 2045900, deals: 48 },
      { name: "Q3", revenue: 1704800, deals: 40 },
      { name: "Q4", revenue: 2500300, deals: 55 },
    ],
  },
  usa: {
    monthly: [
      { name: "Jan", revenue: 291700, deals: 6 }, // Converted from USD to INR
      { name: "Feb", revenue: 350000, deals: 8 },
      { name: "Mar", revenue: 416600, deals: 10 },
      { name: "Apr", revenue: 541700, deals: 12 },
      { name: "May", revenue: 650000, deals: 14 },
      { name: "Jun", revenue: 750000, deals: 16 },
    ],
    quarterly: [
      { name: "Q1", revenue: 1058300, deals: 24 },
      { name: "Q2", revenue: 1941700, deals: 42 },
      { name: "Q3", revenue: 1625000, deals: 35 },
      { name: "Q4", revenue: 2083300, deals: 45 },
    ],
  },
}

export function SalesChart({ branch = "all" }) {
  const { formatCurrency, currentCurrency } = useAppContext()
  const [timeframe, setTimeframe] = useState("monthly")
  const [chartType, setChartType] = useState("revenue")
  const [chartData, setChartData] = useState(salesData.all.monthly)

  // Update chart data when branch or timeframe changes
  useEffect(() => {
    const branchData = salesData[branch] || salesData.all
    setChartData(branchData[timeframe])
  }, [branch, timeframe])

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
    toast({
      title: "Timeframe changed",
      description: `Viewing ${value} data`,
    })
  }

  const handleChartTypeChange = (type: string) => {
    setChartType(type)
    toast({
      title: "Chart type changed",
      description: `Viewing ${type} data`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={chartType === "revenue" ? "default" : "outline"}
            size="sm"
            onClick={() => handleChartTypeChange("revenue")}
          >
            Revenue
          </Button>
          <Button
            variant={chartType === "deals" ? "default" : "outline"}
            size="sm"
            onClick={() => handleChartTypeChange("deals")}
          >
            Deals
          </Button>
        </div>
        <Select value={timeframe} onValueChange={handleTimeframeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8b5cf6"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={60}
              tickFormatter={(value) => (chartType === "revenue" ? formatCurrency(value) : value)}
              hide={chartType !== "revenue"}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#3b82f6"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={40}
              hide={chartType !== "deals"}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "revenue") return [formatCurrency(value as number), "Revenue"]
                return [value, "Deals Closed"]
              }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="url(#colorRevenue)"
              name="Revenue"
              radius={[4, 4, 0, 0]}
              hide={chartType !== "revenue"}
              onClick={(data) => {
                toast({
                  title: `${data.name} Revenue`,
                  description: `${formatCurrency(data.revenue)} from ${data.deals} deals`,
                })
              }}
            />
            <Bar
              yAxisId="right"
              dataKey="deals"
              fill="url(#colorDeals)"
              name="Deals Closed"
              radius={[4, 4, 0, 0]}
              hide={chartType !== "deals"}
              onClick={(data) => {
                toast({
                  title: `${data.name} Deals`,
                  description: `${data.deals} deals worth ${formatCurrency(data.revenue)}`,
                })
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

