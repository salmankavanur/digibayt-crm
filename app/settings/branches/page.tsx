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
import { Building2, Edit, Globe, MoreHorizontal, Phone, Plus, Search, Trash, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BranchesPage() {
  const branches = [
    {
      id: 1,
      name: "India Headquarters",
      location: "Mumbai, India",
      manager: "Raj Patel",
      employees: 45,
      status: "active",
      phone: "+91 9074433100",
      email: "india@digibayt.com",
      currency: "INR",
    },
    {
      id: 2,
      name: "UAE Office",
      location: "Dubai, UAE",
      manager: "Ahmed Al-Farsi",
      employees: 28,
      status: "active",
      phone: "+971 50 123 4567",
      email: "uae@digibayt.com",
      currency: "AED",
    },
    {
      id: 3,
      name: "USA Office",
      location: "New York, USA",
      manager: "Sarah Johnson",
      employees: 32,
      status: "active",
      phone: "+1 212 555 7890",
      email: "usa@digibayt.com",
      currency: "USD",
    },
    {
      id: 4,
      name: "India - Bangalore",
      location: "Bangalore, India",
      manager: "Priya Sharma",
      employees: 18,
      status: "active",
      phone: "+91 80 2345 6789",
      email: "bangalore@digibayt.com",
      currency: "INR",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Branch Management</h1>
        <p className="text-muted-foreground">Manage your company branches and locations</p>
      </div>

      <Tabs defaultValue="branches" className="space-y-6">
        <TabsList>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="analytics">Branch Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="branches" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div className="text-2xl font-bold">{branches.length}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="text-2xl font-bold">
                    {branches.reduce((acc, branch) => acc + branch.employees, 0)}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div className="text-2xl font-bold">3</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Currencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">3</div>
                  <div className="flex gap-1">
                    <Badge variant="outline">USD</Badge>
                    <Badge variant="outline">INR</Badge>
                    <Badge variant="outline">AED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search branches..." className="pl-8 w-[300px]" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Branch
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Branch Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {branch.name}
                        </div>
                      </TableCell>
                      <TableCell>{branch.location}</TableCell>
                      <TableCell>{branch.manager}</TableCell>
                      <TableCell>{branch.employees}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs">{branch.phone}</span>
                          <span className="text-xs text-muted-foreground">{branch.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{branch.currency}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit branch
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage employees
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Contact details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-digibayt-500">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete branch
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

