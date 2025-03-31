"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, TrendingUp, TrendingDown, Wallet, CreditCard } from "lucide-react"
import { FinanceChart } from "@/components/finance/finance-chart"
import { RecentTransactions } from "@/components/finance/recent-transactions"
import { AccountsOverview } from "@/components/finance/accounts-overview"
import { motion } from "framer-motion"

export default function FinancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
        <p className="text-muted-foreground">Manage your income, expenses, and accounts</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-background/80 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-none bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                  <TrendingUp className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$128,430.00</div>
                  <p className="text-xs text-white/70">
                    <span className="flex items-center font-medium">
                      +12.5% <ArrowUpRight className="ml-1 h-4 w-4" />
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
              <Card className="overflow-hidden border-none bg-gradient-to-br from-digibayt-500 to-red-600 text-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$85,240.00</div>
                  <p className="text-xs text-white/70">
                    <span className="flex items-center font-medium">
                      +8.2% <ArrowUpRight className="ml-1 h-4 w-4" />
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
              <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                  <Wallet className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$43,190.00</div>
                  <p className="text-xs text-white/70">
                    <span className="flex items-center font-medium">
                      +22.5% <ArrowUpRight className="ml-1 h-4 w-4" />
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
              <Card className="overflow-hidden border-none bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                  <CreditCard className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$215,670.00</div>
                  <p className="text-xs text-white/70">
                    <span className="flex items-center font-medium">
                      +5.3% <ArrowUpRight className="ml-1 h-4 w-4" />
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
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>Income vs Expenses</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <FinanceChart />
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
                  <CardTitle>Accounts Overview</CardTitle>
                  <CardDescription>Balance by account</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccountsOverview />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

