"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Branch-specific data
const expensesChartData = {
  all: {
    monthly: [
      { name: "Jan", rent: 5000, salaries: 12000, utilities: 3500, marketing: 4500, other: 3000 },
      { name: "Feb", rent: 5000, salaries: 12200, utilities: 3800, marketing: 5000, other: 3200 },
      { name: "Mar", rent: 5000, salaries: 12500, utilities: 4000, marketing: 5500, other: 3500 },
      { name: "Apr", rent: 5000, salaries: 13000, utilities: 4200, marketing: 6000, other: 3800 },
      { name: "May", rent: 5000, salaries: 13500, utilities: 4500, marketing: 6500, other: 4000 },
      { name: "Jun", rent: 5000, salaries: 14000, utilities: 4800, marketing: 7000, other: 4200 },
    ],
    quarterly: [
      { name: "Q1", rent: 15000, salaries: 36700, utilities: 11300, marketing: 15000, other: 9700 },
      { name: "Q2", rent: 15000, salaries: 40500, utilities: 13500, marketing: 19500, other: 12000 },
      { name: "Q3", rent: 15000, salaries: 38000, utilities: 12500, marketing: 17000, other: 10500 },
      { name: "Q4", rent: 15000, salaries: 42000, utilities: 14500, marketing: 21000, other: 13000 },
    ],
  },
  india: {
    monthly: [
      { name: "Jan", rent: 250000, salaries: 850000, utilities: 300000, marketing: 250000, other: 150000 },
      { name: "Feb", rent: 250000, salaries: 870000, utilities: 320000, marketing: 270000, other: 160000 },
      { name: "Mar", rent: 250000, salaries: 900000, utilities: 340000, marketing: 290000, other: 170000 },
      { name: "Apr", rent: 250000, salaries: 950000, utilities: 350000, marketing: 300000, other: 180000 },
      { name: "May", rent: 250000, salaries: 980000, utilities: 370000, marketing: 320000, other: 190000 },
      { name: "Jun", rent: 250000, salaries: 1000000, utilities: 390000, marketing: 350000, other: 200000 },
    ],
    quarterly: [
      { name: "Q1", rent: 750000, salaries: 2620000, utilities: 960000, marketing: 810000, other: 480000 },
      { name: "Q2", rent: 750000, salaries: 2930000, utilities: 1110000, marketing: 970000, other: 570000 },
      { name: "Q3", rent: 750000, salaries: 2750000, utilities: 1050000, marketing: 900000, other: 520000 },
      { name: "Q4", rent: 750000, salaries: 3100000, utilities: 1200000, marketing: 1050000, other: 600000 },
    ],
  },
  uae: {
    monthly: [
      { name: "Jan", rent: 15000, salaries: 22000, utilities: 10000, marketing: 10000, other: 5000 },
      { name: "Feb", rent: 15000, salaries: 22500, utilities: 10500, marketing: 11000, other: 5500 },
      { name: "Mar", rent: 15000, salaries: 23000, utilities: 11000, marketing: 12000, other: 6000 },
      { name: "Apr", rent: 15000, salaries: 25000, utilities: 12000, marketing: 13000, other: 6500 },
      { name: "May", rent: 15000, salaries: 26000, utilities: 12500, marketing: 14000, other: 7000 },
      { name: "Jun", rent: 15000, salaries: 27000, utilities: 13000, marketing: 15000, other: 7500 },
    ],
    quarterly: [
      { name: "Q1", rent: 45000, salaries: 67500, utilities: 31500, marketing: 33000, other: 16500 },
      { name: "Q2", rent: 45000, salaries: 78000, utilities: 37500, marketing: 42000, other: 21000 },
      { name: "Q3", rent: 45000, salaries: 72000, utilities: 34500, marketing: 37500, other: 18000 },
      { name: "Q4", rent: 45000, salaries: 84000, utilities: 40500, marketing: 45000, other: 22500 },
    ],
  },
  usa: {
    monthly: [
      { name: "Jan", rent: 5000, salaries: 8000, utilities: 3000, marketing: 4000, other: 2000 },
      { name: "Feb", rent: 5000, salaries: 8200, utilities: 3100, marketing: 4500, other: 2200 },
      { name: "Mar", rent: 5000, salaries: 8400, utilities: 3200, marketing: 5000, other: 2400 },
      { name: "Apr", rent: 5000, salaries: 8500, utilities: 3500, marketing: 5500, other: 2600 },
      { name: "May", rent: 5000, salaries: 8700, utilities: 3700, marketing: 6000, other: 2800 },
      { name: "Jun", rent: 5000, salaries: 9000, utilities: 4000, marketing: 6500, other: 3000 },
    ],
    quarterly: [
      { name: "Q1", rent: 15000, salaries: 24600, utilities: 9300, marketing: 13500, other: 6600 },
      { name: "Q2", rent: 15000, salaries: 26200, utilities: 11200, marketing: 18000, other: 8400 },
      { name: "Q3", rent: 15000, salaries: 25200, utilities: 10500, marketing: 16500, other: 7500 },
      { name: "Q4", rent: 15000, salaries: 27600, utilities: 12000, marketing: 19500, other: 9000 },
    ],
  },
}

export function ExpensesChart({ branch = "all" }) {
  const { formatCurrency } = useAppContext()
  const [timeframe, setTimeframe] = useState("monthly")
  const [chartData, setChartData] = useState(expensesChartData.all.monthly)

  // Update chart data when branch or timeframe changes
  useEffect(() => {
    const branchData = expensesChartData[branch] || expensesChartData.all
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
    rent: "#8b5cf6",
    salaries: "#ef4444",
    utilities: "#3b82f6",
    marketing: "#f59e0b",
    other: "#10b981",
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
              dataKey="rent"
              name="Rent"
              fill={colors.rent}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Rent`,
                  description: `${formatCurrency(data.rent)} in rent expenses`,
                })
              }}
            />
            <Bar
              dataKey="salaries"
              name="Salaries"
              fill={colors.salaries}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Salaries`,
                  description: `${formatCurrency(data.salaries)} in salary expenses`,
                })
              }}
            />
            <Bar
              dataKey="utilities"
              name="Utilities"
              fill={colors.utilities}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Utilities`,
                  description: `${formatCurrency(data.utilities)} in utility expenses`,
                })
              }}
            />
            <Bar
              dataKey="marketing"
              name="Marketing"
              fill={colors.marketing}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Marketing`,
                  description: `${formatCurrency(data.marketing)} in marketing expenses`,
                })
              }}
            />
            <Bar
              dataKey="other"
              name="Other"
              fill={colors.other}
              radius={[4, 4, 0, 0]}
              onClick={(data) => {
                toast({
                  title: `${data.name} Other`,
                  description: `${formatCurrency(data.other)} in other expenses`,
                })
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

