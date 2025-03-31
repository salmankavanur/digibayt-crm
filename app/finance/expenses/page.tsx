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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Trash,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/app-context"
import { ExpensesChart } from "@/components/finance/expenses-chart"

// Branch-specific expenses data
const expensesData = {
  all: [
    {
      id: "EXP-001",
      date: "Apr 15, 2023",
      category: "Rent",
      description: "Office Rent - USA HQ",
      amount: 5000,
      currency: "USD",
      vendor: "Acme Properties",
      branch: "USA",
      status: "paid",
    },
    {
      id: "EXP-002",
      date: "Apr 12, 2023",
      category: "Utilities",
      description: "Electricity Bill",
      amount: 35000,
      currency: "INR",
      vendor: "Power Corp",
      branch: "India",
      status: "paid",
    },
    {
      id: "EXP-003",
      date: "Apr 10, 2023",
      category: "Salaries",
      description: "Staff Salaries",
      amount: 25000,
      currency: "AED",
      vendor: "Internal",
      branch: "UAE",
      status: "paid",
    },
    {
      id: "EXP-004",
      date: "Apr 05, 2023",
      category: "Software",
      description: "Software Subscriptions",
      amount: 2500,
      currency: "USD",
      vendor: "Various Vendors",
      branch: "USA",
      status: "paid",
    },
    {
      id: "EXP-005",
      date: "Apr 03, 2023",
      category: "Marketing",
      description: "Digital Marketing Campaign",
      amount: 75000,
      currency: "INR",
      vendor: "MediaMax",
      branch: "India",
      status: "paid",
    },
    {
      id: "EXP-006",
      date: "Apr 01, 2023",
      category: "Travel",
      description: "Business Travel",
      amount: 8500,
      currency: "AED",
      vendor: "Travel Agency",
      branch: "UAE",
      status: "pending",
    },
    {
      id: "EXP-007",
      date: "Mar 28, 2023",
      category: "Equipment",
      description: "Office Equipment",
      amount: 3500,
      currency: "USD",
      vendor: "Office Supplies Inc",
      branch: "USA",
      status: "paid",
    },
    {
      id: "EXP-008",
      date: "Mar 25, 2023",
      category: "Training",
      description: "Staff Training",
      amount: 45000,
      currency: "INR",
      vendor: "Training Solutions",
      branch: "India",
      status: "paid",
    },
    {
      id: "EXP-009",
      date: "Mar 22, 2023",
      category: "Maintenance",
      description: "Office Maintenance",
      amount: 1800,
      currency: "USD",
      vendor: "Maintenance Services",
      branch: "USA",
      status: "paid",
    },
    {
      id: "EXP-010",
      date: "Mar 20, 2023",
      category: "Insurance",
      description: "Business Insurance",
      amount: 55000,
      currency: "INR",
      vendor: "Insurance Corp",
      branch: "India",
      status: "pending",
    },
  ],
  india: [
    {
      id: "EXP-002",
      date: "Apr 12, 2023",
      category: "Utilities",
      description: "Electricity Bill",
      amount: 35000,
      currency: "INR",
      vendor: "Power Corp",
      branch: "India",
      status: "paid",
    },
    {
      id: "EXP-005",
      date: "Apr 03, 2023",
      category: "Marketing",
      description: "Digital Marketing Campaign",
      amount: 75000,
      currency: "INR",
      vendor: "MediaMax",
      branch: "India",
      status: "paid",
    },
    {
      id: "EXP-008",
      date: "Mar 25, 2023",
      category: "Training",
      description: "Staff Training",
      amount: 45000,
      currency: "INR",
      vendor: "Training Solutions",
      branch: "India",
      status: "paid",
    },
    {
      id: "EXP-010",
      date: "Mar 20, 2023",
      category: "Insurance",
      description: "Business Insurance",
      amount: 55000,
      currency: "INR",
      vendor: "Insurance Corp",
      branch: "India",
      status: "pending",
    },
  ],
  uae: [
    {
      id: "EXP-003",
      date: "Apr 10, 2023",
      category: "Salaries",
      description: "Staff Salaries",
      amount: 25000,
      currency: "AED",
      vendor: "Internal",
      branch: "UAE",
      status: "paid",
    },
    {
      id: "EXP-006",
      date: "Apr 01, 2023",
      category: "Travel",
      description: "Business Travel",
      amount: 8500,
      currency: "AED",
      vendor: "Travel Agency",
      branch: "UAE",
      status: "pending",
    },
  ],
  usa: [
    {
      id: "EXP-001",
      date: "Apr 15, 2023",
      category: "Rent",
      description: "Office Rent - USA HQ",
      amount: 5000,
      currency: "USD",
      vendor: "Acme Properties",
      branch: "USA",
      status: "paid",
    },
    {
      id: "EXP-004",
      date: "Apr 05, 2023",
      category: "Software",
      description: "Software Subscriptions",
      amount: 2500,
      currency: "USD",
      vendor: "Various Vendors",
      branch: "USA",
      status: "paid",
    },
    {
      id: "EXP-007",
      date: "Mar 28, 2023",
      category: "Equipment",
      description: "Office Equipment",
      amount: 3500,
      currency: "USD",
      vendor: "Office Supplies Inc",
      branch: "USA",
      status: "paid",
    },
    {
      id: "EXP-009",
      date: "Mar 22, 2023",
      category: "Maintenance",
      description: "Office Maintenance",
      amount: 1800,
      currency: "USD",
      vendor: "Maintenance Services",
      branch: "USA",
      status: "paid",
    },
  ],
}

// Summary data for each branch
const summaryData = {
  all: {
    total: 28500,
    totalChange: 15.3,
    rent: 5000,
    rentChange: 0,
    salaries: 12000,
    salariesChange: 8.5,
    utilities: 4500,
    utilitiesChange: 12.3,
    marketing: 7000,
    marketingChange: 25.8,
    currency: "USD",
  },
  india: {
    total: 1850000,
    totalChange: 12.8,
    rent: 250000,
    rentChange: 0,
    salaries: 950000,
    salariesChange: 5.2,
    utilities: 350000,
    utilitiesChange: 8.7,
    marketing: 300000,
    marketingChange: 35.2,
    currency: "INR",
  },
  uae: {
    total: 65000,
    totalChange: 10.5,
    rent: 15000,
    rentChange: 0,
    salaries: 25000,
    salariesChange: 12.5,
    utilities: 12000,
    utilitiesChange: 5.8,
    marketing: 13000,
    marketingChange: 18.2,
    currency: "AED",
  },
  usa: {
    total: 22500,
    totalChange: 18.2,
    rent: 5000,
    rentChange: 0,
    salaries: 8500,
    salariesChange: 12.3,
    utilities: 3500,
    utilitiesChange: 15.8,
    marketing: 5500,
    marketingChange: 28.5,
    currency: "USD",
  },
}

export default function ExpensesPage() {
  const router = useRouter()
  const { currentBranch, formatCurrency } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [expenses, setExpenses] = useState(expensesData.all)
  const [summary, setSummary] = useState(summaryData.all)
  const itemsPerPage = 8

  // Update data when global branch changes
  useEffect(() => {
    setExpenses(expensesData[currentBranch] || expensesData.all)
    setSummary(summaryData[currentBranch] || summaryData.all)
    setCurrentPage(1) // Reset to first page when branch changes
  }, [currentBranch])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter expenses based on search query and category
  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage)
  const paginatedExpenses = filteredExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search results",
      description: `Found ${filteredExpenses.length} expense records matching "${searchQuery}"`,
    })
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1) // Reset to first page when filter changes
    toast({
      title: "Filter applied",
      description: `Showing ${value === "all" ? "all expenses" : `${value} expenses`}`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Exporting expenses data",
      description: "Your expenses data is being exported to CSV",
    })
  }

  const handleAddExpense = () => {
    toast({
      title: "Add expense",
      description: "Navigating to expense creation form",
    })
    router.push("/finance/expenses/new")
  }

  const handleExpenseAction = (action: string, expense: any) => {
    switch (action) {
      case "edit":
        toast({
          title: "Edit expense",
          description: `Editing expense record ${expense.id}`,
        })
        router.push(`/finance/expenses/${expense.id}`)
        break
      case "delete":
        toast({
          title: "Delete expense",
          description: `Expense record ${expense.id} has been deleted`,
        })
        break
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground">
          {currentBranch === "all"
            ? "Manage and track all your expenses"
            : `Manage expenses for ${currentBranch} branch`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-digibayt-500">
              {formatCurrency(summary.total, summary.currency as any)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="flex items-center text-digibayt-500">
                +{summary.totalChange}% <ArrowDownRight className="ml-1 h-4 w-4" />
              </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.rent, summary.currency as any)}</div>
            <p className="text-xs text-muted-foreground">
              {summary.rentChange > 0 ? "+" : ""}
              {summary.rentChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Salaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.salaries, summary.currency as any)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="flex items-center text-digibayt-500">
                +{summary.salariesChange}% <ArrowDownRight className="ml-1 h-4 w-4" />
              </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.marketing, summary.currency as any)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="flex items-center text-digibayt-500">
                +{summary.marketingChange}% <ArrowDownRight className="ml-1 h-4 w-4" />
              </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Expense Trends</CardTitle>
          <CardDescription>Monthly expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ExpensesChart branch={currentBranch} />
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
                placeholder="Search expenses..."
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
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="salaries">Salaries</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={handleAddExpense}>
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No expense records found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedExpenses.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={item.description}>
                      {item.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{item.vendor}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(item.amount, item.currency as any)}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleExpenseAction("edit", item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-digibayt-500"
                            onClick={() => handleExpenseAction("delete", item)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
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
              {Math.min(filteredExpenses.length, (currentPage - 1) * itemsPerPage + 1)}
            </span>{" "}
            to <span className="font-medium">{Math.min(filteredExpenses.length, currentPage * itemsPerPage)}</span> of{" "}
            <span className="font-medium">{filteredExpenses.length}</span> records
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

