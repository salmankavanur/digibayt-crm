"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/app-context"
import { TransactionsChart } from "@/components/finance/transactions-chart"

// Branch-specific transactions data
const transactionsData = {
  all: [
    {
      id: "TRX-001",
      date: "Apr 15, 2023",
      type: "income",
      category: "Sales",
      description: "Product Sales - Enterprise Plan",
      amount: 12500,
      currency: "USD",
      account: "Business Checking",
      branch: "USA",
      status: "completed",
    },
    {
      id: "TRX-002",
      date: "Apr 14, 2023",
      type: "expense",
      category: "Rent",
      description: "Office Rent - USA HQ",
      amount: 5000,
      currency: "USD",
      account: "Business Checking",
      branch: "USA",
      status: "completed",
    },
    {
      id: "TRX-003",
      date: "Apr 12, 2023",
      type: "income",
      category: "Consulting",
      description: "Consulting Services",
      amount: 85000,
      currency: "INR",
      account: "India Business Account",
      branch: "India",
      status: "completed",
    },
    {
      id: "TRX-004",
      date: "Apr 11, 2023",
      type: "expense",
      category: "Utilities",
      description: "Electricity Bill",
      amount: 35000,
      currency: "INR",
      account: "India Business Account",
      branch: "India",
      status: "completed",
    },
    {
      id: "TRX-005",
      date: "Apr 10, 2023",
      type: "income",
      category: "Services",
      description: "Implementation Services",
      amount: 9200,
      currency: "AED",
      account: "UAE Business Account",
      branch: "UAE",
      status: "completed",
    },
    {
      id: "TRX-006",
      date: "Apr 09, 2023",
      type: "expense",
      category: "Salaries",
      description: "Staff Salaries",
      amount: 25000,
      currency: "AED",
      account: "UAE Business Account",
      branch: "UAE",
      status: "completed",
    },
    {
      id: "TRX-007",
      date: "Apr 05, 2023",
      type: "income",
      category: "Sales",
      description: "Product Sales - Basic Plan",
      amount: 4500,
      currency: "USD",
      account: "Business Checking",
      branch: "USA",
      status: "completed",
    },
    {
      id: "TRX-008",
      date: "Apr 04, 2023",
      type: "expense",
      category: "Software",
      description: "Software Subscriptions",
      amount: 2500,
      currency: "USD",
      account: "Business Credit Card",
      branch: "USA",
      status: "completed",
    },
    {
      id: "TRX-009",
      date: "Apr 03, 2023",
      type: "income",
      category: "Maintenance",
      description: "Annual Maintenance Contract",
      amount: 120000,
      currency: "INR",
      account: "India Business Account",
      branch: "India",
      status: "completed",
    },
    {
      id: "TRX-010",
      date: "Apr 02, 2023",
      type: "expense",
      category: "Marketing",
      description: "Digital Marketing Campaign",
      amount: 75000,
      currency: "INR",
      account: "India Business Account",
      branch: "India",
      status: "completed",
    },
  ],
  india: [
    {
      id: "TRX-003",
      date: "Apr 12, 2023",
      type: "income",
      category: "Consulting",
      description: "Consulting Services",
      amount: 85000,
      currency: "INR",
      account: "India Business Account",
      branch: "India",
      status: "completed",
    },
    {
      id: "TRX-004",
      date: "Apr 11, 2023",
      type: "expense",
      category: "Utilities",
      description: "Electricity Bill",
      amount: 35000,
      currency: "INR",
      account: "India Business Account",
      branch: "India",
      status: "completed",
    },
    {
      id: "TRX-009",
      date: "Apr 03, 2023",
      type: "income",
      category: "Maintenance",
      description: "Annual Maintenance Contract",
      amount: 120000,
      currency: "INR",
      account: "India Business Account",
      branch: "India",
      status: "completed",
    },
    {
      id: "TRX-010",
      date: "Apr 02, 2023",
      type: "expense",
      category: "Marketing",
      description: "Digital Marketing Campaign",
      amount: 75000,
      currency: "INR",
      account: "India Business Account",
      branch: "India",
      status: "completed",
    },
  ],
  uae: [
    {
      id: "TRX-005",
      date: "Apr 10, 2023",
      type: "income",
      category: "Services",
      description: "Implementation Services",
      amount: 9200,
      currency: "AED",
      account: "UAE Business Account",
      branch: "UAE",
      status: "completed",
    },
    {
      id: "TRX-006",
      date: "Apr 09, 2023",
      type: "expense",
      category: "Salaries",
      description: "Staff Salaries",
      amount: 25000,
      currency: "AED",
      account: "UAE Business Account",
      branch: "UAE",
      status: "completed",
    },
  ],
  usa: [
    {
      id: "TRX-001",
      date: "Apr 15, 2023",
      type: "income",
      category: "Sales",
      description: "Product Sales - Enterprise Plan",
      amount: 12500,
      currency: "USD",
      account: "Business Checking",
      branch: "USA",
      status: "completed",
    },
    {
      id: "TRX-002",
      date: "Apr 14, 2023",
      type: "expense",
      category: "Rent",
      description: "Office Rent - USA HQ",
      amount: 5000,
      currency: "USD",
      account: "Business Checking",
      branch: "USA",
      status: "completed",
    },
    {
      id: "TRX-007",
      date: "Apr 05, 2023",
      type: "income",
      category: "Sales",
      description: "Product Sales - Basic Plan",
      amount: 4500,
      currency: "USD",
      account: "Business Checking",
      branch: "USA",
      status: "completed",
    },
    {
      id: "TRX-008",
      date: "Apr 04, 2023",
      type: "expense",
      category: "Software",
      description: "Software Subscriptions",
      amount: 2500,
      currency: "USD",
      account: "Business Credit Card",
      branch: "USA",
      status: "completed",
    },
  ],
}

// Summary data for each branch
const summaryData = {
  all: {
    totalIncome: 45231.89,
    totalExpenses: 28500,
    netCashflow: 16731.89,
    totalTransactions: 152,
    currency: "USD",
  },
  india: {
    totalIncome: 2850000,
    totalExpenses: 1850000,
    netCashflow: 1000000,
    totalTransactions: 68,
    currency: "INR",
  },
  uae: {
    totalIncome: 95000,
    totalExpenses: 65000,
    netCashflow: 30000,
    totalTransactions: 42,
    currency: "AED",
  },
  usa: {
    totalIncome: 38500,
    totalExpenses: 22500,
    netCashflow: 16000,
    totalTransactions: 42,
    currency: "USD",
  },
}

export default function TransactionsPage() {
  const router = useRouter()
  const { currentBranch, formatCurrency } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState(transactionsData.all)
  const [summary, setSummary] = useState(summaryData.all)
  const itemsPerPage = 8

  // Update data when global branch changes
  useEffect(() => {
    setTransactions(transactionsData[currentBranch] || transactionsData.all)
    setSummary(summaryData[currentBranch] || summaryData.all)
    setCurrentPage(1) // Reset to first page when branch changes
  }, [currentBranch])

  const getTypeIcon = (type: string) => {
    return type === "income" ? (
      <ArrowUpRight className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowDownLeft className="h-4 w-4 text-digibayt-500" />
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter transactions based on search query, type, and account
  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || item.type.toLowerCase() === selectedType.toLowerCase()

    const matchesAccount =
      selectedAccount === "all" || item.account.toLowerCase().includes(selectedAccount.toLowerCase())

    return matchesSearch && matchesType && matchesAccount
  })

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search results",
      description: `Found ${filteredTransactions.length} transactions matching "${searchQuery}"`,
    })
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    setCurrentPage(1) // Reset to first page when filter changes
    toast({
      title: "Filter applied",
      description: `Showing ${value === "all" ? "all transactions" : `${value} transactions`}`,
    })
  }

  const handleAccountChange = (value: string) => {
    setSelectedAccount(value)
    setCurrentPage(1) // Reset to first page when filter changes
    toast({
      title: "Filter applied",
      description: `Showing transactions for ${value === "all" ? "all accounts" : value}`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Exporting transactions",
      description: "Your transactions are being exported to CSV",
    })
  }

  const handleAddTransaction = () => {
    toast({
      title: "Add transaction",
      description: "Navigating to transaction creation form",
    })
    router.push("/finance/transactions/new")
  }

  const handleTransactionAction = (action: string, transaction: any) => {
    switch (action) {
      case "view":
        toast({
          title: "View transaction",
          description: `Viewing details for transaction ${transaction.id}`,
        })
        router.push(`/finance/transactions/${transaction.id}`)
        break
      case "edit":
        toast({
          title: "Edit transaction",
          description: `Editing transaction ${transaction.id}`,
        })
        router.push(`/finance/transactions/${transaction.id}/edit`)
        break
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          {currentBranch === "all"
            ? "View and manage all financial transactions"
            : `View transactions for ${currentBranch} branch`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {formatCurrency(summary.totalIncome, summary.currency as any)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-digibayt-500">
              {formatCurrency(summary.totalExpenses, summary.currency as any)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Cashflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.netCashflow >= 0 ? "text-green-500" : "text-digibayt-500"}`}>
              {formatCurrency(summary.netCashflow, summary.currency as any)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Income vs Expenses over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <TransactionsChart branch={currentBranch} />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" type="submit">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedAccount} onValueChange={handleAccountChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="Business Checking">Business Checking</SelectItem>
                <SelectItem value="Business Credit Card">Business Credit Card</SelectItem>
                <SelectItem value="India Business Account">India Business Account</SelectItem>
                <SelectItem value="UAE Business Account">UAE Business Account</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={handleAddTransaction}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(item.type)}
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={item.description}>
                      {item.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{item.account}</TableCell>
                    <TableCell
                      className={`font-medium ${item.type === "income" ? "text-green-500" : "text-digibayt-500"}`}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {formatCurrency(item.amount, item.currency as any)}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleTransactionAction("view", item)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTransactionAction("edit", item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium">
              {Math.min(filteredTransactions.length, (currentPage - 1) * itemsPerPage + 1)}
            </span>{" "}
            to <span className="font-medium">{Math.min(filteredTransactions.length, currentPage * itemsPerPage)}</span>{" "}
            of <span className="font-medium">{filteredTransactions.length}</span> transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

