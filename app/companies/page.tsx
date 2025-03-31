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
  Building2,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import Link from "next/link"

export default function CompaniesPage() {
  const companies = [
    {
      id: "COMP-001",
      name: "Acme Corporation",
      industry: "Technology",
      location: "New York, USA",
      employees: "250-500",
      status: "active",
      revenue: "$25M-$50M",
      lastContact: "2 days ago",
    },
    {
      id: "COMP-002",
      name: "Globex Industries",
      industry: "Manufacturing",
      location: "Chicago, USA",
      employees: "1000+",
      status: "active",
      revenue: "$100M-$500M",
      lastContact: "1 week ago",
    },
    {
      id: "COMP-003",
      name: "Initech Solutions",
      industry: "Software",
      location: "San Francisco, USA",
      employees: "50-100",
      status: "inactive",
      revenue: "$5M-$10M",
      lastContact: "1 month ago",
    },
    {
      id: "COMP-004",
      name: "Massive Dynamic",
      industry: "Research",
      location: "Boston, USA",
      employees: "500-1000",
      status: "active",
      revenue: "$50M-$100M",
      lastContact: "3 days ago",
    },
    {
      id: "COMP-005",
      name: "Stark Industries",
      industry: "Technology",
      location: "Los Angeles, USA",
      employees: "1000+",
      status: "active",
      revenue: "$1B+",
      lastContact: "1 day ago",
    },
    {
      id: "COMP-006",
      name: "Wayne Enterprises",
      industry: "Conglomerate",
      location: "Gotham City, USA",
      employees: "1000+",
      status: "active",
      revenue: "$1B+",
      lastContact: "5 days ago",
    },
    {
      id: "COMP-007",
      name: "Umbrella Corporation",
      industry: "Pharmaceuticals",
      location: "Raccoon City, USA",
      employees: "500-1000",
      status: "inactive",
      revenue: "$100M-$500M",
      lastContact: "2 months ago",
    },
    {
      id: "COMP-008",
      name: "Cyberdyne Systems",
      industry: "Robotics",
      location: "Sunnyvale, USA",
      employees: "100-250",
      status: "active",
      revenue: "$25M-$50M",
      lastContact: "1 week ago",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search companies..." className="pl-8 w-[300px]" />
            </div>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="font-medium">{company.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>
                    <Badge variant={company.status === "active" ? "default" : "secondary"}>{company.status}</Badge>
                  </TableCell>
                  <TableCell>{company.revenue}</TableCell>
                  <TableCell>{company.lastContact}</TableCell>
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
                          <Link href={`/companies/${company.id}`} className="flex w-full">
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit company</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add contact</DropdownMenuItem>
                        <DropdownMenuItem>Add opportunity</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete company</DropdownMenuItem>
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
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

