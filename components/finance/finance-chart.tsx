"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const monthlyData = [
  {
    name: "Jan",
    income: 12500,
    expenses: 8200,
    profit: 4300,
  },
  {
    name: "Feb",
    income: 14200,
    expenses: 9100,
    profit: 5100,
  },
  {
    name: "Mar",
    income: 15800,
    expenses: 10200,
    profit: 5600,
  },
  {
    name: "Apr",
    income: 16900,
    expenses: 11500,
    profit: 5400,
  },
  {
    name: "May",
    income: 18500,
    expenses: 12300,
    profit: 6200,
  },
  {
    name: "Jun",
    income: 20100,
    expenses: 13400,
    profit: 6700,
  },
  {
    name: "Jul",
    income: 22400,
    expenses: 14800,
    profit: 7600,
  },
  {
    name: "Aug",
    income: 24800,
    expenses: 16500,
    profit: 8300,
  },
]

const quarterlyData = [
  {
    name: "Q1",
    income: 42500,
    expenses: 27500,
    profit: 15000,
  },
  {
    name: "Q2",
    income: 55500,
    expenses: 37200,
    profit: 18300,
  },
  {
    name: "Q3",
    income: 68000,
    expenses: 45000,
    profit: 23000,
  },
  {
    name: "Q4",
    income: 75000,
    expenses: 49000,
    profit: 26000,
  },
]

export function FinanceChart() {
  const [timeframe, setTimeframe] = useState("monthly")
  const [chartType, setChartType] = useState("area")

  const data = timeframe === "monthly" ? monthlyData : quarterlyData

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant={chartType === "area" ? "default" : "outline"} size="sm" onClick={() => setChartType("area")}>
            Area
          </Button>
          <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
            Bar
          </Button>
          <Button variant={chartType === "line" ? "default" : "outline"} size="sm" onClick={() => setChartType("line")}>
            Line
          </Button>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
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
          {chartType === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc3545" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#dc3545" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, ""]}
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
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#dc3545"
                fillOpacity={1}
                fill="url(#colorExpenses)"
                name="Expenses"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorProfit)"
                name="Profit"
              />
            </AreaChart>
          ) : chartType === "bar" ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={60}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#dc3545" name="Expenses" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#3b82f6" name="Profit" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={60}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Line type="monotone" dataKey="income" stroke="#10b981" name="Income" strokeWidth={2} dot={{ r: 4 }} />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#dc3545"
                name="Expenses"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line type="monotone" dataKey="profit" stroke="#3b82f6" name="Profit" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

