"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Branch-specific data
const incomeChartData = {
  all: {
    monthly: [
      { name: "Jan", sales: 4000, services: 2400, consulting: 2000, maintenance: 1800 },
      { name: "Feb", sales: 3500, services: 2800, consulting: 1800, maintenance: 1600 },
      { name: "Mar", sales: 5000, services: 3200, consulting: 2200, maintenance: 2000 },
      { name: "Apr", sales: 5500, services: 3800, consulting: 2500, maintenance: 2200 },
      { name: "May", sales: 6000, services: 4200, consulting: 2800, maintenance: 2400 },
      { name: "Jun", sales: 6500, services: 4600, consulting: 3000, maintenance: 2600 },
    ],
    quarterly: [
      { name: "Q1", sales: 12500, services: 8400, consulting: 6000, maintenance: 5400 },
      { name: "Q2", sales: 18000, services: 12600, consulting: 8300, maintenance: 7200 },
      { name: "Q3", sales: 15000, services: 10500, consulting: 7000, maintenance: 6000 },
      { name: "Q4", sales: 20000, services: 14000, consulting: 9000, maintenance: 8000 },
    ],
  },
  india: {
    monthly: [
      { name: "Jan", sales: 350000, services: 450000, consulting: 650000, maintenance: 550000 },
      { name: "Feb", sales: 380000, services: 480000, consulting: 700000, maintenance: 600000 },
      { name: "Mar", sales: 420000, services: 520000, consulting: 780000, maintenance: 650000 },
      { name: "Apr", sales: 450000, services: 550000, consulting: 850000, maintenance: 700000 },
      { name: "May", sales: 480000, services: 580000, consulting: 900000, maintenance: 750000 },
      { name: "Jun", sales: 520000, services: 620000, consulting: 950000, maintenance: 800000 },
    ],
    quarterly: [
      { name: "Q1", sales: 1150000, services: 1450000, consulting: 2130000, maintenance: 1800000 },
      { name: "Q2", sales: 1450000, services: 1750000, consulting: 2700000, maintenance: 2250000 },
      { name: "Q3", sales: 1300000, services: 1600000, consulting: 2400000, maintenance: 2000000 },
      { name: "Q4", sales: 1600000, services: 1900000, consulting: 2900000, maintenance: 2400000 },
    ],
  },
  uae: {
    monthly: [
      { name: "Jan", sales: 18000, services: 28000, consulting: 12000, maintenance: 8000 },
      { name: "Feb", sales: 20000, services: 30000, consulting: 13000, maintenance: 8500 },
      { name: "Mar", sales: 22000, services: 35000, consulting: 14000, maintenance: 9000 },
      { name: "Apr", sales: 25000, services: 38000, consulting: 15000, maintenance: 9500 },
      { name: "May", sales: 28000, services: 42000, consulting: 16000, maintenance: 10000 },
      { name: "Jun", sales: 30000, services: 45000, consulting: 17000, maintenance: 10500 },
    ],
    quarterly: [
      { name: "Q1", sales: 60000, services: 93000, consulting: 39000, maintenance: 25500 },
      { name: "Q2", sales: 83000, services: 125000, consulting: 48000, maintenance: 30000 },
      { name: "Q3", sales: 75000, services: 110000, consulting: 42000, maintenance: 27000 },
      { name: "Q4", sales: 90000, services: 130000, consulting: 50000, maintenance: 32000 },
    ],
  },
  usa: {
    monthly: [
      { name: "Jan", sales: 12000, services: 8000, consulting: 4000, maintenance: 2000 },
      { name: "Feb", sales: 13000, services: 8500, consulting: 4200, maintenance: 2100 },
      { name: "Mar", sales: 15000, services: 9000, consulting: 4500, maintenance: 2300 },
      { name: "Apr", sales: 18000, services: 10000, consulting: 5000, maintenance: 2500 },
      { name: "May", sales: 20000, services: 11000, consulting: 5500, maintenance: 2800 },
      { name: "Jun", sales: 22000, services: 12000, consulting: 6000, maintenance: 3000 },
    ],
    quarterly: [
      { name: "Q1", sales: 40000, services: 25500, consulting: 12700, maintenance: 6400 },
      { name: "Q2", sales: 60000, services: 33000, consulting: 16500, maintenance: 8300 },
      { name: "Q3", sales: 55000, services: 30000, consulting: 15000, maintenance: 7500 },
      { name: "Q4", sales: 65000, services: 35000, consulting: 17500, maintenance: 9000 },
    ],
  },
}

export function IncomeChart({ branch = "all" }) {
  const { formatCurrency } = useAppContext()
  const [timeframe, setTimeframe] = useState("monthly")
  const [chartData, setChartData] = useState(incomeChartData.all.monthly)

  // Update chart data when branch or timeframe changes
  useEffect(() => {
    const branchData = incomeChartData[branch] || incomeChartData.all
    setChartData(branchData[timeframe])
  }, [branch, timeframe])

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
    toast({
      title: "Timeframe changed",
      description: `Viewing ${value} data`,
    })
  }

  const colors = {
    sales: "#8b5cf6",
    services: "#3b82f6",
    consulting: "#f59e0b",
    maintenance: "#10b981",
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
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

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={60}
              tickFormatter={(value) => formatCurrency(value).replace(/[^0-9.]/g, "")}
            />
            <Tooltip
              formatter={(value, name) => {
                return [formatCurrency(value as number), name.charAt(0).toUpperCase() + name.slice(1)]
              }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            <Bar
              dataKey="sales"
              name="Sales"
              fill={colors.sales}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Sales`,
                  description: `${formatCurrency(data.sales)} in sales revenue`,
                })
              }}
            />
            <Bar
              dataKey="services"
              name="Services"
              fill={colors.services}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Services`,
                  description: `${formatCurrency(data.services)} in services revenue`,
                })
              }}
            />
            <Bar
              dataKey="consulting"
              name="Consulting"
              fill={colors.consulting}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Consulting`,
                  description: `${formatCurrency(data.consulting)} in consulting revenue`,
                })
              }}
            />
            <Bar
              dataKey="maintenance"
              name="Maintenance"
              fill={colors.maintenance}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Maintenance`,
                  description: `${formatCurrency(data.maintenance)} in maintenance revenue`,
                })
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

