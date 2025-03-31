"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Users,
  Building2,
  CalendarClock,
  ShoppingCart,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  FileText,
  DollarSign,
  PieChart,
  Globe,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useAppContext } from "@/contexts/app-context"

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  {
    name: "Customers",
    icon: Users,
    children: [
      { name: "All Customers", href: "/customers" },
      { name: "Add Customer", href: "/customers/new" },
      { name: "Customer Groups", href: "/customers/groups" },
    ],
  },
  {
    name: "Sales",
    icon: ShoppingCart,
    children: [
      { name: "Opportunities", href: "/opportunities" },
      { name: "Deals", href: "/deals" },
      { name: "Sales Pipeline", href: "/sales/pipeline" },
    ],
  },
  {
    name: "Invoices",
    icon: FileText,
    children: [
      { name: "All Invoices", href: "/invoices" },
      { name: "Create Invoice", href: "/invoices/new" },
      { name: "Recurring", href: "/invoices/recurring" },
    ],
  },
  {
    name: "Proposals",
    icon: Briefcase,
    children: [
      { name: "All Proposals", href: "/proposals" },
      { name: "Create Proposal", href: "/proposals/new" },
      { name: "Templates", href: "/proposals/templates" },
    ],
  },
  {
    name: "Finance",
    icon: DollarSign,
    children: [
      { name: "Income", href: "/finance/income" },
      { name: "Expenses", href: "/finance/expenses" },
      { name: "Transactions", href: "/finance/transactions" },
      { name: "Accounts", href: "/finance/accounts" },
    ],
  },
  {
    name: "Companies",
    icon: Building2,
    children: [
      { name: "All Companies", href: "/companies" },
      { name: "Add Company", href: "/companies/new" },
    ],
  },
  { name: "Calendar", href: "/calendar", icon: CalendarClock },
  {
    name: "Reports",
    icon: PieChart,
    children: [
      { name: "Sales Reports", href: "/reports/sales" },
      { name: "Financial Reports", href: "/reports/financial" },
      { name: "Customer Reports", href: "/reports/customers" },
      { name: "Branch Performance", href: "/reports/branches" },
    ],
  },
  {
    name: "Settings",
    icon: Settings,
    children: [
      { name: "General", href: "/settings" },
      { name: "Branches", href: "/settings/branches" },
      { name: "Currencies", href: "/settings/currencies" },
      { name: "Taxes", href: "/settings/taxes" },
      { name: "Users & Roles", href: "/settings/users" },
      { name: "Integrations", href: "/settings/integrations" },
    ],
  },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentBranch, setCurrentBranch } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [openItems, setOpenItems] = useState<string[]>([])

  // Check if a parent item should be open based on current path
  useEffect(() => {
    const openParents = navigation
      .filter((item) => item.children?.some((child) => child.href === pathname))
      .map((item) => item.name)

    setOpenItems(openParents)
  }, [pathname])

  // Toggle collapsible item
  const toggleItem = (name: string) => {
    setOpenItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar for desktop */}
      <motion.div
        className={cn(
          "bg-card fixed inset-y-0 left-0 z-40 w-64 border-r shadow-sm md:shadow-none",
          "transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        initial={false}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-digibayt-500">
                <span className="text-lg font-bold text-white">D</span>
              </div>
              <h1 className="text-xl font-bold">Digibayt CRM</h1>
            </div>
          </div>

          <div className="flex items-center justify-between border-b px-4 py-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <select
                className="bg-transparent text-sm font-medium outline-none cursor-pointer"
                value={currentBranch}
                onChange={(e) => setCurrentBranch(e.target.value as any)}
              >
                <option value="all">All Branches</option>
                <option value="india">India Branch</option>
                <option value="uae">UAE Branch</option>
                <option value="usa">USA Branch</option>
              </select>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {navigation.map((item) => {
              const isActive = item.href ? pathname === item.href : false
              const isOpen = openItems.includes(item.name)

              // Simple menu item without children
              if (!item.children) {
                return (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-digibayt-500 text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                    onClick={(e) => {
                      if (!item.href) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute right-0 h-8 w-1 rounded-l-full bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                )
              }

              // Collapsible menu item with children
              return (
                <Collapsible
                  key={item.name}
                  open={isOpen}
                  onOpenChange={() => toggleItem(item.name)}
                  className="space-y-1"
                >
                  <CollapsibleTrigger className="w-full">
                    <div
                      className={cn(
                        "group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname.startsWith(item.children[0].href.split("/")[1])
                          ? "bg-digibayt-500/10 text-digibayt-500"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            pathname.startsWith(item.children[0].href.split("/")[1])
                              ? "text-digibayt-500"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pl-10">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isChildActive
                              ? "bg-digibayt-500 text-white"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                          onClick={(e) => {
                            // Handle navigation or prevent default if needed
                            if (child.href === "#") {
                              e.preventDefault()
                              // You could show a "coming soon" toast here
                              console.log(`${child.name} feature coming soon`)
                            }
                          }}
                        >
                          {child.name}
                          {isChildActive && (
                            <motion.div
                              layoutId="sidebar-child-indicator"
                              className="absolute right-0 h-8 w-1 rounded-l-full bg-white"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </Link>
                      )
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-digibayt-500 text-white">SK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Salman Kavanur</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => {
                  // Handle logout
                  console.log("Logging out...")
                  // In a real app, you would clear auth state and redirect
                  // router.push('/login');
                }}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

