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
  ArrowUpRight,
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
import { IncomeChart } from "@/components/finance/income-chart"

// Branch-specific income data
const incomeData = {
  all: [
    {
      id: "INC-001",
      date: "Apr 15, 2023",
      category: "Sales",
      description: "Product Sales - Enterprise Plan",
      amount: 12500,
      currency: "USD",
      customer: "Acme Corporation",
      branch: "USA",
      status: "completed",
    },
    {
      id: "INC-002",
      date: "Apr 12, 2023",
      category: "Consulting",
      description: "Consulting Services",
      amount: 85000,
      currency: "INR",
      customer: "TechGiant Inc",
      branch: "India",
      status: "completed",
    },
    {
      id: "INC-003",
      date: "Apr 10, 2023",
      category: "Services",
      description: "Implementation Services",
      amount: 9200,
      currency: "AED",
      customer: "Global Enterprises",
      branch: "UAE",
      status: "completed",
    },
    {
      id: "INC-004",
      date: "Apr 05, 2023",
      category: "Sales",
      description: "Product Sales - Basic Plan",
      amount: 4500,
      currency: "USD",
      customer: "Innovative Solutions",
      branch: "USA",
      status: "completed",
    },
    {
      id: "INC-005",
      date: "Apr 03, 2023",
      category: "Maintenance",
      description: "Annual Maintenance Contract",
      amount: 120000,
      currency: "INR",
      customer: "Pinnacle Systems",
      branch: "India",
      status: "completed",
    },
    {
      id: "INC-006",
      date: "Apr 01, 2023",
      category: "Services",
      description: "Training Services",
      amount: 15400,
      currency: "AED",
      customer: "Desert Technologies",
      branch: "UAE",
      status: "pending",
    },
    {
      id: "INC-007",
      date: "Mar 28, 2023",
      category: "Sales",
      description: "Product Sales - Premium Plan",
      amount: 18500,
      currency: "USD",
      customer: "Quantum Dynamics",
      branch: "USA",
      status: "completed",
    },
    {
      id: "INC-008",
      date: "Mar 25, 2023",
      category: "Consulting",
      description: "Strategic Consulting",
      amount: 65000,
      currency: "INR",
      customer: "Sunrise Enterprises",
      branch: "India",
      status: "completed",
    },
    {
      id: "INC-009",
      date: "Mar 22, 2023",
      category: "Services",
      description: "Custom Development",
      amount: 22000,
      currency: "USD",
      customer: "Horizon Group",
      branch: "USA",
      status: "completed",
    },
    {
      id: "INC-010",
      date: "Mar 20, 2023",
      category: "Maintenance",
      description: "Support Services",
      amount: 95000,
      currency: "INR",
      customer: "Stellar Solutions",
      branch: "India",
      status: "pending",
    },
  ],
  india: [
    {
      id: "INC-002",
      date: "Apr 12, 2023",
      category: "Consulting",
      description: "Consulting Services",
      amount: 85000,
      currency: "INR",
      customer: "TechGiant Inc",
      branch: "India",
      status: "completed",
    },
    {
      id: "INC-005",
      date: "Apr 03, 2023",
      category: "Maintenance",
      description: "Annual Maintenance Contract",
      amount: 120000,
      currency: "INR",
      customer: "Pinnacle Systems",
      branch: "India",
      status: "completed",
    },
    {
      id: "INC-008",
      date: "Mar 25, 2023",
      category: "Consulting",
      description: "Strategic Consulting",
      amount: 65000,
      currency: "INR",
      customer: "Sunrise Enterprises",
      branch: "India",
      status: "completed",
    },
    {
      id: "INC-010",
      date: "Mar 20, 2023",
      category: "Maintenance",
      description: "Support Services",
      amount: 95000,
      currency: "INR",
      customer: "Stellar Solutions",
      branch: "India",
      status: "pending",
    },
  ],
  uae: [
    {
      id: "INC-003",
      date: "Apr 10, 2023",
      category: "Services",
      description: "Implementation Services",
      amount: 9200,
      currency: "AED",
      customer: "Global Enterprises",
      branch: "UAE",
      status: "completed",
    },
    {
      id: "INC-006",
      date: "Apr 01, 2023",
      category: "Services",
      description: "Training Services",
      amount: 15400,
      currency: "AED",
      customer: "Desert Technologies",
      branch: "UAE",
      status: "pending",
    },
  ],
  usa: [
    {
      id: "INC-001",
      date: "Apr 15, 2023",
      category: "Sales",
      description: "Product Sales - Enterprise Plan",
      amount: 12500,
      currency: "USD",
      customer: "Acme Corporation",
      branch: "USA",
      status: "completed",
    },
    {
      id: "INC-004",
      date: "Apr 05, 2023",
      category: "Sales",
      description: "Product Sales - Basic Plan",
      amount: 4500,
      currency: "USD",
      customer: "Innovative Solutions",
      branch: "USA",
      status: "completed",
    },
    {
      id: "INC-007",
      date: "Mar 28, 2023",
      category: "Sales",
      description: "Product Sales - Premium Plan",
      amount: 18500,
      currency: "USD",
      customer: "Quantum Dynamics",
      branch: "USA",
      status: "completed",
    },
    {
      id: "INC-009",
      date: "Mar 22, 2023",
      category: "Services",
      description: "Custom Development",
      amount: 22000,
      currency: "USD",
      customer: "Horizon Group",
      branch: "USA",
      status: "completed",
    },
  ],
}

// Summary data for each branch
const summaryData = {
  all: {
    total: 45231.89,
    totalChange: 20.1,
    sales: 18500,
    salesChange: 15.3,
    services: 12400,
    servicesChange: 8.7,
    consulting: 8200,
    consultingChange: 12.5,
    maintenance: 6131.89,
    maintenanceChange: 5.2,
    currency: "USD",
  },
  india: {
    total: 2850000,
    totalChange: 18.5,
    sales: 450000,
    salesChange: 12.8,
    services: 650000,
    servicesChange: 15.2,
    consulting: 950000,
    consultingChange: 22.5,
    maintenance: 800000,
    maintenanceChange: 10.3,
    currency: "INR",
  },
  uae: {
    total: 95000,
    totalChange: 15.8,
    sales: 25000,
    salesChange: 8.5,
    services: 45000,
    servicesChange: 22.3,
    consulting: 15000,
    consultingChange: 5.8,
    maintenance: 10000,
    maintenanceChange: 12.5,
    currency: "AED",
  },
  usa: {
    total: 38500,
    totalChange: 22.4,
    sales: 18500,
    salesChange: 25.3,
    services: 12000,
    servicesChange: 18.7,
    consulting: 5000,
    consultingChange: 15.2,
    maintenance: 3000,
    maintenanceChange: 8.5,
    currency: "USD",
  },
}

export default function IncomePage() {
  const router = useRouter()
  const { currentBranch, formatCurrency } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [income, setIncome] = useState(incomeData.all)
  const [summary, setSummary] = useState(summaryData.all)
  const itemsPerPage = 8

  // Update data when global branch changes
  useEffect(() => {
    setIncome(incomeData[currentBranch] || incomeData.all)
    setSummary(summaryData[currentBranch] || summaryData.all)
    setCurrentPage(1) // Reset to first page when branch changes
  }, [currentBranch])

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

  // Filter income based on search query and category
  const filteredIncome = income.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredIncome.length / itemsPerPage)
  const paginatedIncome = filteredIncome.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search results",
      description: `Found ${filteredIncome.length} income records matching "${searchQuery}"`,
    })
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1) // Reset to first page when filter changes
    toast({
      title: "Filter applied",
      description: `Showing ${value === "all" ? "all income" : `${value} income`}`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Exporting income data",
      description: "Your income data is being exported to CSV",
    })
  }

  const handleAddIncome = () => {
    toast({
      title: "Add income",
      description: "Navigating to income creation form",
    })
    router.push("/finance/income/new")
  }

  const handleIncomeAction = (action: string, income: any) => {
    switch (action) {
      case "edit":
        toast({
          title: "Edit income",
          description: `Editing income record ${income.id}`,
        })
        router.push(`/finance/income/${income.id}`)
        break
      case "delete":
        toast({
          title: "Delete income",
          description: `Income record ${income.id} has been deleted`,
        })
        break
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Income</h1>
        <p className="text-muted-foreground">
          {currentBranch === "all" ? "Manage and track all your income" : `Manage income for ${currentBranch} branch`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {formatCurrency(summary.total, summary.currency as any)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="flex items-center text-green-500">
                +{summary.totalChange}% <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.sales, summary.currency as any)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="flex items-center text-green-500">
                +{summary.salesChange}% <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.services, summary.currency as any)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="flex items-center text-green-500">
                +{summary.servicesChange}% <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consulting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.consulting, summary.currency as any)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="flex items-center text-green-500">
                +{summary.consultingChange}% <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Income Trends</CardTitle>
          <CardDescription>Monthly income by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <IncomeChart branch={currentBranch} />
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
                placeholder="Search income..."
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
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={handleAddIncome}>
              <Plus className="mr-2 h-4 w-4" />
              Add Income
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
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedIncome.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No income records found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedIncome.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={item.description}>
                      {item.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{item.customer}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleIncomeAction("edit", item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-digibayt-500"
                            onClick={() => handleIncomeAction("delete", item)}
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
            <span className="font-medium">{Math.min(filteredIncome.length, (currentPage - 1) * itemsPerPage + 1)}</span>{" "}
            to <span className="font-medium">{Math.min(filteredIncome.length, currentPage * itemsPerPage)}</span> of{" "}
            <span className="font-medium">{filteredIncome.length}</span> records
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

