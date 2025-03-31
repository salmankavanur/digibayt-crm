import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowUpRight, Building, CreditCard, ShoppingCart } from "lucide-react"

const transactions = [
  {
    id: "TX-001",
    description: "Invoice Payment - Acme Corp",
    amount: "+$12,500.00",
    date: "Today, 10:45 AM",
    type: "income",
    category: "Invoice Payment",
    account: "Business Checking",
    currency: "USD",
    branch: "USA",
  },
  {
    id: "TX-002",
    description: "Office Supplies",
    amount: "-$350.25",
    date: "Today, 9:30 AM",
    type: "expense",
    category: "Office Expenses",
    account: "Business Credit Card",
    currency: "USD",
    branch: "USA",
  },
  {
    id: "TX-003",
    description: "Client Retainer - TechGiant Inc",
    amount: "+₹85,000.00",
    date: "Yesterday, 2:15 PM",
    type: "income",
    category: "Retainer",
    account: "India Business Account",
    currency: "INR",
    branch: "India",
  },
  {
    id: "TX-004",
    description: "Software Subscription",
    amount: "-$199.99",
    date: "Yesterday, 11:20 AM",
    type: "expense",
    category: "Software",
    account: "Business Credit Card",
    currency: "USD",
    branch: "USA",
  },
  {
    id: "TX-005",
    description: "Consulting Services - Desert Tech",
    amount: "+د.إ 9,200.00",
    date: "Apr 15, 2023",
    type: "income",
    category: "Consulting",
    account: "UAE Business Account",
    currency: "AED",
    branch: "UAE",
  },
  {
    id: "TX-006",
    description: "Office Rent",
    amount: "-₹45,000.00",
    date: "Apr 10, 2023",
    type: "expense",
    category: "Rent",
    account: "India Business Account",
    currency: "INR",
    branch: "India",
  },
]

export function RecentTransactions() {
  const getTransactionIcon = (type: string, category: string) => {
    if (type === "income") {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />
    } else {
      switch (category) {
        case "Office Expenses":
          return <ShoppingCart className="h-4 w-4 text-digibayt-500" />
        case "Software":
          return <CreditCard className="h-4 w-4 text-digibayt-500" />
        case "Rent":
          return <Building className="h-4 w-4 text-digibayt-500" />
        default:
          return <ArrowDownLeft className="h-4 w-4 text-digibayt-500" />
      }
    }
  }

  return (
    <div className="space-y-6">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-muted/50"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
            >
              {getTransactionIcon(transaction.type, transaction.category)}
            </div>
            <div>
              <p className="font-medium">{transaction.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{transaction.date}</span>
                <span>•</span>
                <span>{transaction.category}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p
              className={`font-mono font-medium ${transaction.type === "income" ? "text-green-600" : "text-digibayt-500"}`}
            >
              {transaction.amount}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {transaction.account}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {transaction.branch}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

