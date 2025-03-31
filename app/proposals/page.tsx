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
  Search,
  SlidersHorizontal,
  Send,
  Copy,
  Edit,
  Trash,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProposalsPage() {
  const proposals = [
    {
      id: "PROP-001",
      title: "Enterprise Software Implementation",
      customer: "Acme Corporation",
      amount: "$45,000.00",
      currency: "USD",
      status: "accepted",
      date: "Mar 15, 2023",
      expiryDate: "Apr 15, 2023",
      branch: "USA",
    },
    {
      id: "PROP-002",
      title: "Digital Marketing Campaign",
      customer: "TechGiant Inc",
      amount: "₹250,000.00",
      currency: "INR",
      status: "pending",
      date: "Mar 20, 2023",
      expiryDate: "Apr 20, 2023",
      branch: "India",
    },
    {
      id: "PROP-003",
      title: "IT Infrastructure Upgrade",
      customer: "Global Enterprises",
      amount: "د.إ 35,000.00",
      currency: "AED",
      status: "declined",
      date: "Feb 28, 2023",
      expiryDate: "Mar 28, 2023",
      branch: "UAE",
    },
    {
      id: "PROP-004",
      title: "Cloud Migration Strategy",
      customer: "Innovative Solutions",
      amount: "$22,500.00",
      currency: "USD",
      status: "draft",
      date: "Apr 02, 2023",
      expiryDate: "May 02, 2023",
      branch: "USA",
    },
    {
      id: "PROP-005",
      title: "Mobile App Development",
      customer: "Pinnacle Systems",
      amount: "₹350,000.00",
      currency: "INR",
      status: "accepted",
      date: "Mar 10, 2023",
      expiryDate: "Apr 10, 2023",
      branch: "India",
    },
    {
      id: "PROP-006",
      title: "E-commerce Platform",
      customer: "Desert Technologies",
      amount: "د.إ 42,000.00",
      currency: "AED",
      status: "pending",
      date: "Apr 05, 2023",
      expiryDate: "May 05, 2023",
      branch: "UAE",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-500">Accepted</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "declined":
        return <Badge className="bg-digibayt-500">Declined</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
        <p className="text-muted-foreground">Create and manage client proposals</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">42</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">28</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-digibayt-500">48.8%</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search proposals..." className="pl-8 w-[300px]" />
            </div>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
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
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Proposal
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proposal</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {proposal.id}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={proposal.title}>
                    {proposal.title}
                  </TableCell>
                  <TableCell>{proposal.customer}</TableCell>
                  <TableCell>{proposal.amount}</TableCell>
                  <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                  <TableCell>{proposal.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{proposal.branch}</Badge>
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
                        <DropdownMenuItem>
                          <Link href={`/proposals/${proposal.id}`} className="flex w-full items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send to customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-digibayt-500">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

