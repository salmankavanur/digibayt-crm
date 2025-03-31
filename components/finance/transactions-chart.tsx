"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Branch-specific data
const transactionsChartData = {
  all: {
    monthly: [
      { name: "Jan", income: 35000, expenses: 28000, balance: 7000 },
      { name: "Feb", income: 38000, expenses: 29200, balance: 8800 },
      { name: "Mar", income: 42000, expenses: 31500, balance: 10500 },
      { name: "Apr", income: 45000, expenses: 33000, balance: 12000 },
      { name: "May", income: 48000, expenses: 34500, balance: 13500 },
      { name: "Jun", income: 52000, expenses: 36000, balance: 16000 },
    ],
    quarterly: [
      { name: "Q1", income: 115000, expenses: 88700, balance: 26300 },
      { name: "Q2", income: 145000, expenses: 103500, balance: 41500 },
      { name: "Q3", income: 130000, expenses: 95000, balance: 35000 },
      { name: "Q4", income: 160000, expenses: 110000, balance: 50000 },
    ],
  },
  india: {
    monthly: [
      { name: "Jan", income: 1800000, expenses: 1200000, balance: 600000 },
      { name: "Feb", income: 2000000, expenses: 1300000, balance: 700000 },
      { name: "Mar", income: 2200000, expenses: 1400000, balance: 800000 },
      { name: "Apr", income: 2400000, expenses: 1500000, balance: 900000 },
      { name: "May", income: 2600000, expenses: 1600000, balance: 1000000 },
      { name: "Jun", income: 2800000, expenses: 1700000, balance: 1100000 },
    ],
    quarterly: [
      { name: "Q1", income: 6000000, expenses: 3900000, balance: 2100000 },
      { name: "Q2", income: 7800000, expenses: 4800000, balance: 3000000 },
      { name: "Q3", income: 7000000, expenses: 4500000, balance: 2500000 },
      { name: "Q4", income: 8500000, expenses: 5200000, balance: 3300000 },
    ],
  },
  uae: {
    monthly: [
      { name: "Jan", income: 60000, expenses: 40000, balance: 20000 },
      { name: "Feb", income: 65000, expenses: 42000, balance: 23000 },
      { name: "Mar", income: 70000, expenses: 45000, balance: 25000 },
      { name: "Apr", income: 75000, expenses: 48000, balance: 27000 },
      { name: "May", income: 80000, expenses: 52000, balance: 28000 },
      { name: "Jun", income: 85000, expenses: 55000, balance: 30000 },
    ],
    quarterly: [
      { name: "Q1", income: 195000, expenses: 127000, balance: 68000 },
      { name: "Q2", income: 240000, expenses: 155000, balance: 85000 },
      { name: "Q3", income: 220000, expenses: 145000, balance: 75000 },
      { name: "Q4", income: 260000, expenses: 170000, balance: 90000 },
    ],
  },
  usa: {
    monthly: [
      { name: "Jan", income: 30000, expenses: 18000, balance: 12000 },
      { name: "Feb", income: 32000, expenses: 19000, balance: 13000 },
      { name: "Mar", income: 35000, expenses: 20000, balance: 15000 },
      { name: "Apr", income: 38000, expenses: 22000, balance: 16000 },
      { name: "May", income: 40000, expenses: 23000, balance: 17000 },
      { name: "Jun", income: 42000, expenses: 24000, balance: 18000 },
    ],
    quarterly: [
      { name: "Q1", income: 97000, expenses: 57000, balance: 40000 },
      { name: "Q2", income: 120000, expenses: 69000, balance: 51000 },
      { name: "Q3", income: 110000, expenses: 64000, balance: 46000 },
      { name: "Q4", income: 130000, expenses: 75000, balance: 55000 },
    ],
  },
}

export function TransactionsChart({ branch = "all" }) {
  const { formatCurrency } = useAppContext()
  const [timeframe, setTimeframe] = useState("monthly")
  const [chartData, setChartData] = useState(transactionsChartData.all.monthly)

  // Update chart data when branch or timeframe changes
  useEffect(() => {
    const branchData = transactionsChartData[branch] || transactionsChartData.all
    setChartData(branchData[timeframe])
  }, [branch, timeframe])

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
    toast({
      title: "Timeframe changed",
      description: `Viewing ${value} data`,
    })
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
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorIncome)"
              name="Income"
              activeDot={{ r: 6 }}
              onClick={(data) => {
                toast({
                  title: `${data.name} Income`,
                  description: `${formatCurrency(data.income)} in income`,
                })
              }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorExpenses)"
              name="Expenses"
              activeDot={{ r: 6 }}
              onClick={(data) => {
                toast({
                  title: `${data.name} Expenses`,
                  description: `${formatCurrency(data.expenses)} in expenses`,
                })
              }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorBalance)"
              name="Balance"
              activeDot={{ r: 6 }}
              onClick={(data) => {
                toast({
                  title: `${data.name} Balance`,
                  description: `${formatCurrency(data.balance)} net balance`,
                })
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

