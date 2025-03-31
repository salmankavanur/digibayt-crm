"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Wallet,
  Building,
  Landmark,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/app-context"
import { AccountsChart } from "@/components/finance/accounts-chart"

// Branch-specific accounts data
const accountsData = {
  all: [
    {
      id: "ACC-001",
      name: "Business Checking",
      type: "checking",
      balance: 85000,
      currency: "USD",
      branch: "USA",
      status: "active",
      lastUpdated: "Today, 10:30 AM",
    },
    {
      id: "ACC-002",
      name: "Business Savings",
      type: "savings",
      balance: 45000,
      currency: "USD",
      branch: "USA",
      status: "active",
      lastUpdated: "Today, 10:30 AM",
    },
    {
      id: "ACC-003",
      name: "Business Credit Card",
      type: "credit",
      balance: -12500,
      currency: "USD",
      branch: "USA",
      status: "active",
      lastUpdated: "Today, 10:30 AM",
    },
    {
      id: "ACC-004",
      name: "India Business Account",
      type: "checking",
      balance: 2500000,
      currency: "INR",
      branch: "India",
      status: "active",
      lastUpdated: "Today, 9:45 AM",
    },
    {
      id: "ACC-005",
      name: "India Savings Account",
      type: "savings",
      balance: 1500000,
      currency: "INR",
      branch: "India",
      status: "active",
      lastUpdated: "Today, 9:45 AM",
    },
    {
      id: "ACC-006",
      name: "India Credit Card",
      type: "credit",
      balance: -350000,
      currency: "INR",
      branch: "India",
      status: "active",
      lastUpdated: "Today, 9:45 AM",
    },
    {
      id: "ACC-007",
      name: "UAE Business Account",
      type: "checking",
      balance: 120000,
      currency: "AED",
      branch: "UAE",
      status: "active",
      lastUpdated: "Today, 8:15 AM",
    },
    {
      id: "ACC-008",
      name: "UAE Savings Account",
      type: "savings",
      balance: 75000,
      currency: "AED",
      branch: "UAE",
      status: "active",
      lastUpdated: "Today, 8:15 AM",
    },
    {
      id: "ACC-009",
      name: "UAE Credit Card",
      type: "credit",
      balance: -25000,
      currency: "AED",
      branch: "UAE",
      status: "active",
      lastUpdated: "Today, 8:15 AM",
    },
  ],
  india: [
    {
      id: "ACC-004",
      name: "India Business Account",
      type: "checking",
      balance: 2500000,
      currency: "INR",
      branch: "India",
      status: "active",
      lastUpdated: "Today, 9:45 AM",
    },
    {
      id: "ACC-005",
      name: "India Savings Account",
      type: "savings",
      balance: 1500000,
      currency: "INR",
      branch: "India",
      status: "active",
      lastUpdated: "Today, 9:45 AM",
    },
    {
      id: "ACC-006",
      name: "India Credit Card",
      type: "credit",
      balance: -350000,
      currency: "INR",
      branch: "India",
      status: "active",
      lastUpdated: "Today, 9:45 AM",
    },
  ],
  uae: [
    {
      id: "ACC-007",
      name: "UAE Business Account",
      type: "checking",
      balance: 120000,
      currency: "AED",
      branch: "UAE",
      status: "active",
      lastUpdated: "Today, 8:15 AM",
    },
    {
      id: "ACC-008",
      name: "UAE Savings Account",
      type: "savings",
      balance: 75000,
      currency: "AED",
      branch: "UAE",
      status: "active",
      lastUpdated: "Today, 8:15 AM",
    },
    {
      id: "ACC-009",
      name: "UAE Credit Card",
      type: "credit",
      balance: -25000,
      currency: "AED",
      branch: "UAE",
      status: "active",
      lastUpdated: "Today, 8:15 AM",
    },
  ],
  usa: [
    {
      id: "ACC-001",
      name: "Business Checking",
      type: "checking",
      balance: 85000,
      currency: "USD",
      branch: "USA",
      status: "active",
      lastUpdated: "Today, 10:30 AM",
    },
    {
      id: "ACC-002",
      name: "Business Savings",
      type: "savings",
      balance: 45000,
      currency: "USD",
      branch: "USA",
      status: "active",
      lastUpdated: "Today, 10:30 AM",
    },
    {
      id: "ACC-003",
      name: "Business Credit Card",
      type: "credit",
      balance: -12500,
      currency: "USD",
      branch: "USA",
      status: "active",
      lastUpdated: "Today, 10:30 AM",
    },
  ],
}

// Summary data for each branch
const summaryData = {
  all: {
    totalAssets: 215670,
    totalLiabilities: 28500,
    netWorth: 187170,
    totalAccounts: 9,
    currency: "USD",
  },
  india: {
    totalAssets: 4000000,
    totalLiabilities: 350000,
    netWorth: 3650000,
    totalAccounts: 3,
    currency: "INR",
  },
  uae: {
    totalAssets: 195000,
    totalLiabilities: 25000,
    netWorth: 170000,
    totalAccounts: 3,
    currency: "AED",
  },
  usa: {
    totalAssets: 130000,
    totalLiabilities: 12500,
    netWorth: 117500,
    totalAccounts: 3,
    currency: "USD",
  },
}

export default function AccountsPage() {
  const router = useRouter()
  const { currentBranch, formatCurrency } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [accounts, setAccounts] = useState(accountsData.all)
  const [summary, setSummary] = useState(summaryData.all)
  const itemsPerPage = 8

  // Update data when global branch changes
  useEffect(() => {
    setAccounts(accountsData[currentBranch] || accountsData.all)
    setSummary(summaryData[currentBranch] || summaryData.all)
    setCurrentPage(1) // Reset to first page when branch changes
  }, [currentBranch])

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Building className="h-4 w-4 text-blue-500" />
      case "savings":
        return <Landmark className="h-4 w-4 text-green-500" />
      case "credit":
        return <CreditCard className="h-4 w-4 text-digibayt-500" />
      default:
        return <Wallet className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge className="bg-yellow-500">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter accounts based on search query and type
  const filteredAccounts = accounts.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || item.type.toLowerCase() === selectedType.toLowerCase()

    return matchesSearch && matchesType
  })

  // Pagination
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage)
  const paginatedAccounts = filteredAccounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search results",
      description: `Found ${filteredAccounts.length} accounts matching "${searchQuery}"`,
    })
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    setCurrentPage(1) // Reset to first page when filter changes
    toast({
      title: "Filter applied",
      description: `Showing ${value === "all" ? "all accounts" : `${value} accounts`}`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Exporting accounts",
      description: "Your accounts data is being exported to CSV",
    })
  }

  const handleAddAccount = () => {
    toast({
      title: "Add account",
      description: "Navigating to account creation form",
    })
    router.push("/finance/accounts/new")
  }

  const handleAccountAction = (action: string, account: any) => {
    switch (action) {
      case "view":
        toast({
          title: "View account",
          description: `Viewing details for account ${account.name}`,
        })
        router.push(`/finance/accounts/${account.id}`)
        break
      case "edit":
        toast({
          title: "Edit account",
          description: `Editing account ${account.name}`,
        })
        router.push(`/finance/accounts/${account.id}/edit`)
        break
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <p className="text-muted-foreground">
          {currentBranch === "all"
            ? "Manage all your financial accounts"
            : `Manage accounts for ${currentBranch} branch`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {formatCurrency(summary.totalAssets, summary.currency as any)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-digibayt-500">
              {formatCurrency(summary.totalLiabilities, summary.currency as any)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.netWorth, summary.currency as any)}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Accounts Overview</CardTitle>
          <CardDescription>Distribution of funds across accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <AccountsChart branch={currentBranch} />
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
                placeholder="Search accounts..."
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={handleAddAccount}>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No accounts found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getAccountIcon(account.type)}
                        <span className="font-medium">{account.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{account.type}</TableCell>
                    <TableCell
                      className={`font-medium ${account.balance >= 0 ? "text-green-500" : "text-digibayt-500"}`}
                    >
                      {formatCurrency(account.balance, account.currency as any)}
                    </TableCell>
                    <TableCell>{account.branch}</TableCell>
                    <TableCell>{getStatusBadge(account.status)}</TableCell>
                    <TableCell>{account.lastUpdated}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleAccountAction("view", account)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAccountAction("edit", account)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => router.push(`/finance/transactions?account=${account.id}`)}>
                            View transactions
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
              {Math.min(filteredAccounts.length, (currentPage - 1) * itemsPerPage + 1)}
            </span>{" "}
            to <span className="font-medium">{Math.min(filteredAccounts.length, currentPage * itemsPerPage)}</span> of{" "}
            <span className="font-medium">{filteredAccounts.length}</span> accounts
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

