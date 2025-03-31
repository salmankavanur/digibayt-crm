"use client"

import type React from "react"

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
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  MoreHorizontal,
  Plus,
  Printer,
  Search,
  SlidersHorizontal,
  Send,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/app-context"

// Full invoice data with currency information
const allInvoices = [
  {
    id: "INV-001",
    customer: "Acme Corporation",
    amount: 12500,
    currency: "USD",
    status: "paid",
    date: "Mar 15, 2023",
    dueDate: "Apr 15, 2023",
    branch: "USA",
    taxAmount: 1062.5, // 8.5% tax
    taxType: "Sales Tax",
  },
  {
    id: "INV-002",
    customer: "TechGiant Inc",
    amount: 85000,
    currency: "INR",
    status: "pending",
    date: "Mar 20, 2023",
    dueDate: "Apr 20, 2023",
    branch: "India",
    taxAmount: 15300, // 18% GST
    taxType: "GST",
  },
  {
    id: "INV-003",
    customer: "Global Enterprises",
    amount: 9200,
    currency: "AED",
    status: "overdue",
    date: "Feb 28, 2023",
    dueDate: "Mar 28, 2023",
    branch: "UAE",
    taxAmount: 736,
    taxType: "VAT",
  },
  {
    id: "INV-004",
    customer: "Innovative Solutions",
    amount: 8750,
    currency: "USD",
    status: "draft",
    date: "Apr 02, 2023",
    dueDate: "May 02, 2023",
    branch: "USA",
    taxAmount: 0,
    taxType: "Sales Tax",
  },
  {
    id: "INV-005",
    customer: "Pinnacle Systems",
    amount: 120000,
    currency: "INR",
    status: "paid",
    date: "Mar 10, 2023",
    dueDate: "Apr 10, 2023",
    branch: "India",
    taxAmount: 21600,
    taxType: "GST",
  },
  {
    id: "INV-006",
    customer: "Desert Technologies",
    amount: 15400,
    currency: "AED",
    status: "pending",
    date: "Apr 05, 2023",
    dueDate: "May 05, 2023",
    branch: "UAE",
    taxAmount: 1232,
    taxType: "VAT",
  },
  {
    id: "INV-007",
    customer: "Quantum Dynamics",
    amount: 22300,
    currency: "USD",
    status: "paid",
    date: "Mar 25, 2023",
    dueDate: "Apr 25, 2023",
    branch: "USA",
    taxAmount: 1895.5,
    taxType: "Sales Tax",
  },
  {
    id: "INV-008",
    customer: "Sunrise Enterprises",
    amount: 65000,
    currency: "INR",
    status: "overdue",
    date: "Feb 15, 2023",
    dueDate: "Mar 15, 2023",
    branch: "India",
    taxAmount: 11700,
    taxType: "GST",
  },
  {
    id: "INV-009",
    customer: "Horizon Group",
    amount: 18900,
    currency: "USD",
    status: "pending",
    date: "Apr 10, 2023",
    dueDate: "May 10, 2023",
    branch: "USA",
    taxAmount: 1606.5,
    taxType: "Sales Tax",
  },
  {
    id: "INV-010",
    customer: "Stellar Solutions",
    amount: 95000,
    currency: "INR",
    status: "paid",
    date: "Mar 30, 2023",
    dueDate: "Apr 30, 2023",
    branch: "India",
    taxAmount: 17100,
    taxType: "GST",
  },
]

// Summary data for each status
const summaryData = {
  all: {
    total: 152,
    totalChange: 12,
    paid: 45231.89,
    paidChange: 8,
    pending: 12456.0,
    pendingChange: -2,
    overdue: 8125.0,
    overdueChange: 5,
    currency: "USD",
  },
  india: {
    total: 68,
    totalChange: 15,
    paid: 2150000,
    paidChange: 12,
    pending: 850000,
    pendingChange: 5,
    overdue: 450000,
    overdueChange: -3,
    currency: "INR",
  },
  uae: {
    total: 42,
    totalChange: 8,
    paid: 95000,
    paidChange: 10,
    pending: 45000,
    pendingChange: -5,
    overdue: 25000,
    overdueChange: 12,
    currency: "AED",
  },
  usa: {
    total: 42,
    totalChange: 10,
    paid: 35000,
    paidChange: 5,
    pending: 18000,
    pendingChange: -8,
    overdue: 12000,
    overdueChange: 15,
    currency: "USD",
  },
}

export default function InvoicesPage() {
  const router = useRouter()
  const { currentBranch, formatCurrency } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [invoices, setInvoices] = useState(allInvoices)
  const [summary, setSummary] = useState(summaryData.all)
  const itemsPerPage = 8

  // Update data when global branch changes
  useEffect(() => {
    setSelectedBranch(currentBranch)
  }, [currentBranch])

  // Filter invoices based on selected branch
  useEffect(() => {
    if (selectedBranch === "all") {
      setInvoices(allInvoices)
      setSummary(summaryData.all)
    } else {
      const filteredInvoices = allInvoices.filter(
        (invoice) => invoice.branch.toLowerCase() === selectedBranch.toLowerCase(),
      )
      setInvoices(filteredInvoices)
      setSummary(summaryData[selectedBranch])
    }
    setCurrentPage(1) // Reset to first page when branch changes
  }, [selectedBranch])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "overdue":
        return <Badge className="bg-digibayt-500">Overdue</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      searchQuery === "" ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search results",
      description: `Found ${filteredInvoices.length} invoices matching "${searchQuery}"`,
    })
  }

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value)
    toast({
      title: "Filter applied",
      description: `Showing invoices for ${value === "all" ? "all branches" : `${value} branch`}`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Exporting invoices",
      description: "Your invoices are being exported to CSV",
    })
  }

  const handleCreateInvoice = () => {
    toast({
      title: "Create invoice",
      description: "Navigating to invoice creation form",
    })
    router.push("/invoices/new")
  }

  const handleInvoiceAction = (action: string, invoice: (typeof allInvoices)[0]) => {
    switch (action) {
      case "view":
        toast({
          title: "View invoice",
          description: `Viewing details for invoice ${invoice.id}`,
        })
        router.push(`/invoices/${invoice.id}`)
        break
      case "print":
        toast({
          title: "Print invoice",
          description: `Preparing to print invoice ${invoice.id}`,
        })
        break
      case "send":
        toast({
          title: "Send invoice",
          description: `Preparing to send invoice ${invoice.id} to customer`,
        })
        break
      case "download":
        toast({
          title: "Download invoice",
          description: `Downloading invoice ${invoice.id} as PDF`,
        })
        break
      case "markAsPaid":
        toast({
          title: "Mark as paid",
          description: `Invoice ${invoice.id} marked as paid`,
        })
        break
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">
          {selectedBranch === "all"
            ? "Manage and track all your invoices"
            : `Manage invoices for ${selectedBranch} branch`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total}</div>
            <p className="text-xs text-muted-foreground">
              {summary.totalChange > 0 ? "+" : ""}
              {summary.totalChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {formatCurrency(summary.paid, summary.currency as any)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.paidChange > 0 ? "+" : ""}
              {summary.paidChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {formatCurrency(summary.pending, summary.currency as any)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.pendingChange > 0 ? "+" : ""}
              {summary.pendingChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-digibayt-500">
              {formatCurrency(summary.overdue, summary.currency as any)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.overdueChange > 0 ? "+" : ""}
              {summary.overdueChange}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
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
            <Select value={selectedBranch} onValueChange={handleBranchChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={handleCreateInvoice}>
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No invoices found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {invoice.id}
                      </div>
                    </TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount, invoice.currency as any)}</TableCell>
                    <TableCell>
                      {invoice.taxAmount > 0
                        ? formatCurrency(invoice.taxAmount, invoice.currency as any) + ` (${invoice.taxType})`
                        : "Tax Exempt"}
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{invoice.branch}</Badge>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleInvoiceAction("view", invoice)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleInvoiceAction("print", invoice)}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleInvoiceAction("send", invoice)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send to customer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleInvoiceAction("download", invoice)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-digibayt-500"
                            onClick={() => handleInvoiceAction("markAsPaid", invoice)}
                          >
                            Mark as paid
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
              {Math.min(filteredInvoices.length, (currentPage - 1) * itemsPerPage + 1)}
            </span>{" "}
            to <span className="font-medium">{Math.min(filteredInvoices.length, currentPage * itemsPerPage)}</span> of{" "}
            <span className="font-medium">{filteredInvoices.length}</span> invoices
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

