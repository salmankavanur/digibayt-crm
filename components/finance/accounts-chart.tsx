"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"
import { Building, CreditCard, Landmark } from "lucide-react"

// Branch-specific data
const accountsChartData = {
  all: [
    { name: "Business Checking (USA)", value: 85000, color: "#3b82f6", currency: "USD", type: "checking" },
    { name: "Business Savings (USA)", value: 45000, color: "#10b981", currency: "USD", type: "savings" },
    { name: "India Business Account", value: 35000, color: "#f59e0b", currency: "INR", type: "checking" },
    { name: "India Savings Account", value: 20000, color: "#84cc16", currency: "INR", type: "savings" },
    { name: "UAE Business Account", value: 30000, color: "#8b5cf6", currency: "AED", type: "checking" },
    { name: "UAE Savings Account", value: 20000, color: "#ec4899", currency: "AED", type: "savings" },
  ],
  india: [
    { name: "India Business Account", value: 2500000, color: "#f59e0b", currency: "INR", type: "checking" },
    { name: "India Savings Account", value: 1500000, color: "#84cc16", currency: "INR", type: "savings" },
  ],
  uae: [
    { name: "UAE Business Account", value: 120000, color: "#8b5cf6", currency: "AED", type: "checking" },
    { name: "UAE Savings Account", value: 75000, color: "#ec4899", currency: "AED", type: "savings" },
  ],
  usa: [
    { name: "Business Checking", value: 85000, color: "#3b82f6", currency: "USD", type: "checking" },
    { name: "Business Savings", value: 45000, color: "#10b981", currency: "USD", type: "savings" },
  ],
}

export function AccountsChart({ branch = "all" }) {
  const { formatCurrency } = useAppContext()
  const [data, setData] = useState(accountsChartData.all)

  // Update data when branch changes
  useEffect(() => {
    setData(accountsChartData[branch] || accountsChartData.all)
  }, [branch])

  const total = data.reduce((acc, item) => acc + item.value, 0)

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Building className="h-4 w-4" />
      case "savings":
        return <Landmark className="h-4 w-4" />
      case "credit":
        return <CreditCard className="h-4 w-4" />
      default:
        return null
    }
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
                  description: `${formatCurrency(entry.value, entry.currency)} (${((entry.value / total) * 100).toFixed(1)}%)`,
                })
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                formatCurrency(value as number, data.find((item) => item.name === name)?.currency as any),
                name,
              ]}
              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:w-1/2 md:grid-cols-2 lg:grid-cols-1">
        {data.map((account, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => {
              toast({
                title: account.name,
                description: `${formatCurrency(account.value, account.currency as any)} (${((account.value / total) * 100).toFixed(1)}%)`,
              })
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: account.color }} />
              <div className="flex items-center gap-1">
                {getAccountIcon(account.type)}
                <span className="text-sm font-medium">{account.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-sm font-medium">
                {formatCurrency(account.value, account.currency as any)}
              </div>
              <Badge variant="outline">{account.currency}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

