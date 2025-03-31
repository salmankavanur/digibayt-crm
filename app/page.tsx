"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, CalendarClock, Briefcase } from "lucide-react"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { UpcomingActivities } from "@/components/dashboard/upcoming-activities"
import { PipelineStats } from "@/components/dashboard/pipeline-stats"
import { BranchPerformance } from "@/components/dashboard/branch-performance"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Branch-specific data (updated to use INR as base currency)
const branchData = {
  all: {
    revenue: 3500000, // In INR
    revenueChange: 20.1,
    customers: 2350,
    customersChange: 10.5,
    deals: 152,
    dealsChange: -3.2,
    meetings: 42,
    meetingsChange: 12.5,
    currency: "INR",
  },
  india: {
    revenue: 2500000, // In INR
    revenueChange: 15.3,
    customers: 980,
    customersChange: 8.2,
    deals: 65,
    dealsChange: 5.7,
    meetings: 18,
    meetingsChange: 10.2,
    currency: "INR",
  },
  uae: {
    revenue: 120000 * 22.73, // Converted to INR (AED to INR rate)
    revenueChange: 18.7,
    customers: 450,
    customersChange: 12.8,
    deals: 32,
    dealsChange: -1.5,
    meetings: 12,
    meetingsChange: 9.1,
    currency: "INR",
  },
  usa: {
    revenue: 38000 * 83.33, // Converted to INR (USD to INR rate)
    revenueChange: 22.4,
    customers: 920,
    customersChange: 11.3,
    deals: 55,
    dealsChange: 2.8,
    meetings: 14,
    meetingsChange: 15.6,
    currency: "INR",
  },
}

export default function Dashboard() {
  const { currentBranch, formatCurrency } = useAppContext()
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState(branchData.all)

  // Update dashboard data when branch changes
  useEffect(() => {
    setDashboardData(branchData[currentBranch] || branchData.all)
  }, [currentBranch])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {currentBranch === "all"
              ? "Welcome to Digibayt CRM"
              : `${currentBranch.charAt(0).toUpperCase() + currentBranch.slice(1)} Branch Dashboard`}
          </h1>
          <p className="text-muted-foreground">
            {currentBranch === "all"
              ? "Here's an overview of your business performance"
              : `Performance metrics for ${currentBranch} branch`}
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        className="space-y-6"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          if (value !== "overview") {
            toast({
              title: `${value.charAt(0).toUpperCase() + value.slice(1)} view`,
              description: `Switched to ${value} view`,
            })
          }
        }}
      >
        <TabsList className="bg-background/80 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-none bg-gradient-purple text-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(dashboardData.revenue, dashboardData.currency as any)}
                  </div>
                  <p className="text-xs text-white/70">
                    <span className="flex items-center font-medium">
                      {dashboardData.revenueChange > 0 ? "+" : ""}
                      {dashboardData.revenueChange}%
                      {dashboardData.revenueChange > 0 ? (
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="ml-1 h-4 w-4" />
                      )}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-none bg-gradient-blue text-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{dashboardData.customers.toLocaleString()}</div>
                  <p className="text-xs text-white/70">
                    <span className="flex items-center font-medium">
                      {dashboardData.customersChange > 0 ? "+" : ""}
                      {dashboardData.customersChange}%
                      {dashboardData.customersChange > 0 ? (
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="ml-1 h-4 w-4" />
                      )}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="overflow-hidden border-none bg-gradient-orange text-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                  <Briefcase className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.deals}</div>
                  <p className="text-xs text-white/70">
                    <span className="flex items-center font-medium">
                      {dashboardData.dealsChange > 0 ? "+" : ""}
                      {dashboardData.dealsChange}%
                      {dashboardData.dealsChange > 0 ? (
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="ml-1 h-4 w-4" />
                      )}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card className="overflow-hidden border-none bg-gradient-green text-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Meetings</CardTitle>
                  <CalendarClock className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.meetings}</div>
                  <p className="text-xs text-white/70">
                    <span className="flex items-center font-medium">
                      {dashboardData.meetingsChange > 0 ? "+" : ""}
                      {dashboardData.meetingsChange}%
                      {dashboardData.meetingsChange > 0 ? (
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="ml-1 h-4 w-4" />
                      )}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-6 lg:grid-cols-7">
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="h-full border shadow-md">
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>
                    {currentBranch === "all"
                      ? "Monthly revenue and deals closed"
                      : `${currentBranch.charAt(0).toUpperCase() + currentBranch.slice(1)} branch performance`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <SalesChart branch={currentBranch} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Card className="h-full border shadow-md">
                <CardHeader>
                  <CardTitle>Pipeline Overview</CardTitle>
                  <CardDescription>
                    {currentBranch === "all"
                      ? "Current deals by stage"
                      : `${currentBranch.charAt(0).toUpperCase() + currentBranch.slice(1)} branch pipeline`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <PipelineStats branch={currentBranch} />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {currentBranch === "all" && (
              <motion.div
                className="md:col-span-1 lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Card className="h-full border shadow-md">
                  <CardHeader>
                    <CardTitle>Branch Performance</CardTitle>
                    <CardDescription>Revenue by branch location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BranchPerformance />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              className={`md:col-span-1 ${currentBranch === "all" ? "lg:col-span-4" : "lg:col-span-7"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Card className="h-full border shadow-md">
                <CardHeader>
                  <CardTitle>Upcoming Activities</CardTitle>
                  <CardDescription>
                    {currentBranch === "all"
                      ? "Your scheduled meetings and tasks"
                      : `Scheduled activities for ${currentBranch} branch`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingActivities branch={currentBranch} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                {currentBranch === "all"
                  ? "Detailed performance metrics and trends"
                  : `Detailed analytics for ${currentBranch} branch`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Analytics content will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                {currentBranch === "all" ? "Generate and view custom reports" : `Reports for ${currentBranch} branch`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Reports content will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

