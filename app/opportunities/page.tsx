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
import { ChevronLeft, ChevronRight, Download, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default function OpportunitiesPage() {
  const opportunities = [
    {
      id: "OPP-001",
      name: "Enterprise Software Implementation",
      company: "Acme Corporation",
      value: "$120,000",
      stage: "proposal",
      probability: "60%",
      expectedCloseDate: "Jun 30, 2023",
      owner: "John Smith",
    },
    {
      id: "OPP-002",
      name: "Cloud Migration Project",
      company: "Globex Industries",
      value: "$85,000",
      stage: "negotiation",
      probability: "80%",
      expectedCloseDate: "May 15, 2023",
      owner: "Sarah Johnson",
    },
    {
      id: "OPP-003",
      name: "CRM Implementation",
      company: "Initech Solutions",
      value: "$45,000",
      stage: "discovery",
      probability: "30%",
      expectedCloseDate: "Aug 10, 2023",
      owner: "Michael Brown",
    },
    {
      id: "OPP-004",
      name: "Data Analytics Platform",
      company: "Massive Dynamic",
      value: "$200,000",
      stage: "closed_won",
      probability: "100%",
      expectedCloseDate: "Apr 5, 2023",
      owner: "Emily Davis",
    },
    {
      id: "OPP-005",
      name: "Security Assessment",
      company: "Stark Industries",
      value: "$75,000",
      stage: "proposal",
      probability: "50%",
      expectedCloseDate: "Jul 22, 2023",
      owner: "David Wilson",
    },
    {
      id: "OPP-006",
      name: "Infrastructure Upgrade",
      company: "Wayne Enterprises",
      value: "$150,000",
      stage: "discovery",
      probability: "25%",
      expectedCloseDate: "Sep 15, 2023",
      owner: "Jennifer Lee",
    },
    {
      id: "OPP-007",
      name: "Software Licensing Deal",
      company: "Umbrella Corporation",
      value: "$95,000",
      stage: "closed_lost",
      probability: "0%",
      expectedCloseDate: "Mar 30, 2023",
      owner: "Robert Taylor",
    },
    {
      id: "OPP-008",
      name: "AI Implementation Project",
      company: "Cyberdyne Systems",
      value: "$180,000",
      stage: "negotiation",
      probability: "75%",
      expectedCloseDate: "Jun 8, 2023",
      owner: "Amanda Martinez",
    },
  ]

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case "discovery":
        return { label: "Discovery", variant: "secondary" as const }
      case "proposal":
        return { label: "Proposal", variant: "warning" as const }
      case "negotiation":
        return { label: "Negotiation", variant: "default" as const }
      case "closed_won":
        return { label: "Closed Won", variant: "success" as const }
      case "closed_lost":
        return { label: "Closed Lost", variant: "destructive" as const }
      default:
        return { label: stage, variant: "secondary" as const }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Opportunity
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search opportunities..." className="pl-8 w-[300px]" />
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
                <TableHead>Opportunity</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Expected Close</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opportunity) => {
                const stage = getStageLabel(opportunity.stage)
                return (
                  <TableRow key={opportunity.id}>
                    <TableCell>
                      <div className="font-medium">{opportunity.name}</div>
                    </TableCell>
                    <TableCell>{opportunity.company}</TableCell>
                    <TableCell>{opportunity.value}</TableCell>
                    <TableCell>
                      <Badge variant={stage.variant}>{stage.label}</Badge>
                    </TableCell>
                    <TableCell>{opportunity.probability}</TableCell>
                    <TableCell>{opportunity.expectedCloseDate}</TableCell>
                    <TableCell>{opportunity.owner}</TableCell>
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
                            <Link href={`/opportunities/${opportunity.id}`} className="flex w-full">
                              View details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit opportunity</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Add task</DropdownMenuItem>
                          <DropdownMenuItem>Add note</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete opportunity</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
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

