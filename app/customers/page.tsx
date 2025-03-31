"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, Download, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Branch-specific customers data
const customersData = {
  all: [
    {
      id: "CUST-001",
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      lastContact: "2 days ago",
      value: "$12,400",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "OM",
      branch: "USA",
    },
    {
      id: "CUST-002",
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      lastContact: "5 days ago",
      value: "$8,200",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JL",
      branch: "USA",
    },
    {
      id: "CUST-003",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      phone: "+1 (555) 345-6789",
      status: "active",
      lastContact: "1 week ago",
      value: "$15,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "IN",
      branch: "USA",
    },
    {
      id: "CUST-004",
      name: "William Kim",
      email: "william.kim@email.com",
      phone: "+1 (555) 456-7890",
      status: "inactive",
      lastContact: "2 weeks ago",
      value: "$5,300",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "WK",
      branch: "USA",
    },
    {
      id: "CUST-005",
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      phone: "+91 98765 43210",
      status: "active",
      lastContact: "3 days ago",
      value: "₹650,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SD",
      branch: "India",
    },
    {
      id: "CUST-006",
      name: "Ethan Johnson",
      email: "ethan.johnson@email.com",
      phone: "+91 87654 32109",
      status: "active",
      lastContact: "1 day ago",
      value: "₹520,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EJ",
      branch: "India",
    },
    {
      id: "CUST-007",
      name: "Ava Wilson",
      email: "ava.wilson@email.com",
      phone: "+971 50 123 4567",
      status: "inactive",
      lastContact: "1 month ago",
      value: "د.إ 22,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AW",
      branch: "UAE",
    },
    {
      id: "CUST-008",
      name: "Noah Brown",
      email: "noah.brown@email.com",
      phone: "+971 55 987 6543",
      status: "active",
      lastContact: "4 days ago",
      value: "د.إ 35,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "NB",
      branch: "UAE",
    },
  ],
  india: [
    {
      id: "CUST-005",
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      phone: "+91 98765 43210",
      status: "active",
      lastContact: "3 days ago",
      value: "₹650,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SD",
      branch: "India",
    },
    {
      id: "CUST-006",
      name: "Ethan Johnson",
      email: "ethan.johnson@email.com",
      phone: "+91 87654 32109",
      status: "active",
      lastContact: "1 day ago",
      value: "₹520,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EJ",
      branch: "India",
    },
    {
      id: "CUST-009",
      name: "Aryan Patel",
      email: "aryan.patel@email.com",
      phone: "+91 76543 21098",
      status: "active",
      lastContact: "2 days ago",
      value: "₹780,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AP",
      branch: "India",
    },
    {
      id: "CUST-010",
      name: "Diya Sharma",
      email: "diya.sharma@email.com",
      phone: "+91 65432 10987",
      status: "inactive",
      lastContact: "2 weeks ago",
      value: "₹320,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DS",
      branch: "India",
    },
  ],
  uae: [
    {
      id: "CUST-007",
      name: "Ava Wilson",
      email: "ava.wilson@email.com",
      phone: "+971 50 123 4567",
      status: "inactive",
      lastContact: "1 month ago",
      value: "د.إ 22,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AW",
      branch: "UAE",
    },
    {
      id: "CUST-008",
      name: "Noah Brown",
      email: "noah.brown@email.com",
      phone: "+971 55 987 6543",
      status: "active",
      lastContact: "4 days ago",
      value: "د.إ 35,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "NB",
      branch: "UAE",
    },
    {
      id: "CUST-011",
      name: "Mohammed Al-Farsi",
      email: "mohammed.alfarsi@email.com",
      phone: "+971 52 345 6789",
      status: "active",
      lastContact: "1 day ago",
      value: "د.إ 48,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MA",
      branch: "UAE",
    },
  ],
  usa: [
    {
      id: "CUST-001",
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      lastContact: "2 days ago",
      value: "$12,400",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "OM",
      branch: "USA",
    },
    {
      id: "CUST-002",
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      lastContact: "5 days ago",
      value: "$8,200",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JL",
      branch: "USA",
    },
    {
      id: "CUST-003",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      phone: "+1 (555) 345-6789",
      status: "active",
      lastContact: "1 week ago",
      value: "$15,000",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "IN",
      branch: "USA",
    },
    {
      id: "CUST-004",
      name: "William Kim",
      email: "william.kim@email.com",
      phone: "+1 (555) 456-7890",
      status: "inactive",
      lastContact: "2 weeks ago",
      value: "$5,300",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "WK",
      branch: "USA",
    },
  ],
}

export default function CustomersPage() {
  const router = useRouter()
  const { currentBranch, formatCurrency } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [customers, setCustomers] = useState(customersData.all)
  const itemsPerPage = 8

  // Update data when global branch changes
  useEffect(() => {
    setCustomers(customersData[currentBranch] || customersData.all)
    setCurrentPage(1) // Reset to first page when branch changes
  }, [currentBranch])

  // Filter customers based on search query and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchQuery === "" ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === "all" || customer.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search results",
      description: `Found ${filteredCustomers.length} customers matching "${searchQuery}"`,
    })
  }

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value)
    setCurrentPage(1) // Reset to first page when filter changes
    toast({
      title: "Filter applied",
      description: `Showing ${value === "all" ? "all customers" : `${value} customers`}`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Exporting customers",
      description: "Your customers data is being exported to CSV",
    })
  }

  const handleAddCustomer = () => {
    toast({
      title: "Add customer",
      description: "Navigating to customer creation form",
    })
    router.push("/customers/new")
  }

  const handleCustomerAction = (action: string, customer: any) => {
    switch (action) {
      case "view":
        toast({
          title: "View customer",
          description: `Viewing details for ${customer.name}`,
        })
        router.push(`/customers/${customer.id}`)
        break
      case "edit":
        toast({
          title: "Edit customer",
          description: `Editing customer ${customer.name}`,
        })
        router.push(`/customers/${customer.id}/edit`)
        break
      case "addNote":
        toast({
          title: "Add note",
          description: `Adding note for ${customer.name}`,
        })
        break
      case "addTask":
        toast({
          title: "Add task",
          description: `Adding task for ${customer.name}`,
        })
        break
      case "delete":
        toast({
          title: "Delete customer",
          description: `Customer ${customer.name} has been deleted`,
        })
        break
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Button onClick={handleAddCustomer}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
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
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Customer Value</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No customers found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback>{customer.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.lastContact}</TableCell>
                    <TableCell>{customer.value}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{customer.branch}</Badge>
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
                          <DropdownMenuItem onClick={() => handleCustomerAction("view", customer)}>
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCustomerAction("edit", customer)}>
                            Edit customer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleCustomerAction("addNote", customer)}>
                            Add note
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCustomerAction("addTask", customer)}>
                            Add task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-digibayt-500"
                            onClick={() => handleCustomerAction("delete", customer)}
                          >
                            Delete customer
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

