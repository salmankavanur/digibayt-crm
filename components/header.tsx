"use client"

import type React from "react"

import { Bell, Moon, Search, Sun, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/app-context"

export default function Header() {
  const router = useRouter()
  const { currentCurrency, setCurrentCurrency } = useAppContext()

  const [notifications] = useState([
    { id: 1, title: "New lead assigned", time: "5 minutes ago" },
    { id: 2, title: "Meeting reminder: Client call", time: "1 hour ago" },
    { id: 3, title: "Deal closed: Acme Corp", time: "Yesterday" },
  ])

  // Updated order to show INR first
  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee", exchangeRate: 1 },
    { code: "USD", symbol: "$", name: "US Dollar", exchangeRate: 0.012 },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", exchangeRate: 0.044 },
  ]

  const [searchQuery, setSearchQuery] = useState("")

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      })
      // In a real app, you would perform the search and navigate to results
      console.log(`Searching for: ${searchQuery}`)
    }
  }

  const handleCurrencyChange = (currency: any) => {
    setCurrentCurrency(currency)
    toast({
      title: "Currency changed",
      description: `Currency set to ${currency.name}`,
    })
  }

  const handleNotificationClick = (id: number) => {
    // In a real app, you would mark the notification as read
    console.log(`Notification ${id} clicked`)
    toast({
      title: "Notification viewed",
      description: "Notification marked as read",
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="hidden md:block w-1/3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className="flex items-center gap-4 md:ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 border-dashed">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{currentCurrency.code}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {currencies.map((currency) => (
                <DropdownMenuItem
                  key={currency.code}
                  className="cursor-pointer"
                  onClick={() => handleCurrencyChange(currency)}
                >
                  <span className="mr-2 text-center w-4">{currency.symbol}</span>
                  <span>{currency.name}</span>
                  {currentCurrency.code === currency.code && (
                    <Badge className="ml-2 bg-digibayt-500" variant="default">
                      Active
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-digibayt-500 text-[10px] font-bold text-white">
                  {notifications.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="cursor-pointer p-4"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer justify-center text-center"
                onClick={() => {
                  toast({
                    title: "All notifications",
                    description: "Viewing all notifications",
                  })
                  // router.push('/notifications')
                }}
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-digibayt-500 text-white">SK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/billing")}>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  console.log("Logging out...")
                  toast({
                    title: "Logged out",
                    description: "You have been logged out successfully",
                  })
                  // In a real app, you would clear auth state and redirect
                  // router.push('/login');
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

