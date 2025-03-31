"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarClock, Mail, Phone } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const customers = [
  {
    id: "CUST-001",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "active",
    date: "Apr 23, 2023",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "OM",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "CUST-002",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    status: "active",
    date: "Apr 22, 2023",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JL",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "CUST-003",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    status: "active",
    date: "Apr 20, 2023",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "IN",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "CUST-004",
    name: "William Kim",
    email: "william.kim@email.com",
    status: "inactive",
    date: "Apr 18, 2023",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "WK",
    phone: "+1 (555) 456-7890",
  },
]

export function RecentCustomers() {
  const router = useRouter()

  const handleViewProfile = (customer: (typeof customers)[0]) => {
    toast({
      title: "Viewing profile",
      description: `Navigating to ${customer.name}'s profile`,
    })
    // In a real app, you would navigate to the customer profile
    // router.push(`/customers/${customer.id}`);
  }

  const handleContactCustomer = (type: "email" | "phone", customer: (typeof customers)[0]) => {
    if (type === "email") {
      toast({
        title: "Email customer",
        description: `Composing email to ${customer.email}`,
      })
      // In a real app, you would open an email compose modal or navigate to email page
      // window.location.href = `mailto:${customer.email}`;
    } else {
      toast({
        title: "Call customer",
        description: `Calling ${customer.phone}`,
      })
      // In a real app, you would initiate a call or show call options
      // window.location.href = `tel:${customer.phone}`;
    }
  }

  return (
    <div className="space-y-6">
      {customers.map((customer) => (
        <div key={customer.email} className="group relative rounded-lg border p-4 transition-all hover:bg-muted/50">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src={customer.avatar} alt={customer.name} />
              <AvatarFallback className="text-lg bg-digibayt-500 text-white">{customer.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-medium leading-none">{customer.name}</h4>
                <Badge variant={customer.status === "active" ? "default" : "secondary"} className="ml-auto">
                  {customer.status}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-digibayt-500 transition-colors"
                  onClick={() => handleContactCustomer("email", customer)}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{customer.email}</span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-digibayt-500 transition-colors"
                  onClick={() => handleContactCustomer("phone", customer)}
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarClock className="h-3.5 w-3.5" />
                  <span>Added: {customer.date}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="sm" variant="outline" onClick={() => handleViewProfile(customer)}>
              View Profile
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

