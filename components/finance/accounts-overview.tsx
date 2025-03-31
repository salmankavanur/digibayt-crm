"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"
import { useMemo } from "react"
import { CreditCard, Building, Landmark, Wallet } from "lucide-react"

const data = [
  {
    name: "Business Checking (USA)",
    value: 85000,
    color: "#3b82f6",
    currency: "USD",
    type: "checking",
  },
  {
    name: "Business Savings (USA)",
    value: 45000,
    color: "#10b981",
    currency: "USD",
    type: "savings",
  },
  {
    name: "India Business Account",
    value: 35000,
    color: "#f59e0b",
    currency: "INR",
    type: "checking",
  },
  {
    name: "UAE Business Account",
    value: 50000,
    color: "#8b5cf6",
    currency: "AED",
    type: "checking",
  },
]

export function AccountsOverview() {
  const total = useMemo(() => data.reduce((acc, item) => acc + item.value, 0), [])

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Building className="h-4 w-4 text-muted-foreground" />
      case "savings":
        return <Landmark className="h-4 w-4 text-muted-foreground" />
      case "credit":
        return <CreditCard className="h-4 w-4 text-muted-foreground" />
      default:
        return <Wallet className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="h-[200px] w-full sm:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Balance"]}
              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4 sm:w-1/2">
        {data.map((account, index) => (
          <div key={index} className="flex items-center justify-between rounded-md border p-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: `${account.color}20` }}
              >
                {getAccountIcon(account.type)}
              </div>
              <div>
                <p className="text-sm font-medium">{account.name}</p>
                <p className="text-xs text-muted-foreground">{account.type}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-mono font-medium">${account.value.toLocaleString()}</p>
              <Badge variant="outline" className="mt-1">
                {account.currency}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

