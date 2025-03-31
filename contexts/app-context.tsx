"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { toast } from "@/components/ui/use-toast"

type Branch = "india" | "uae" | "usa" | "all"
type Currency = "INR" | "AED" | "USD"

interface CurrencyInfo {
  code: Currency
  symbol: string
  name: string
  exchangeRate: number // Rate relative to INR (now INR is the base)
}

interface AppContextType {
  currentBranch: Branch
  setCurrentBranch: (branch: Branch) => void
  currentCurrency: CurrencyInfo
  setCurrentCurrency: (currency: CurrencyInfo) => void
  formatCurrency: (amount: number, originalCurrency?: Currency) => string
  convertCurrency: (amount: number, from: Currency, to: Currency) => number
}

// Updated exchange rates with INR as the base currency
const currencies: Record<Currency, CurrencyInfo> = {
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", exchangeRate: 1 },
  USD: { code: "USD", symbol: "$", name: "US Dollar", exchangeRate: 0.012 }, // 1 INR = 0.012 USD
  AED: { code: "AED", symbol: "د.إ", name: "UAE Dirham", exchangeRate: 0.044 }, // 1 INR = 0.044 AED
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentBranch, setCurrentBranch] = useState<Branch>("all")
  // Set INR as the default currency
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyInfo>(currencies.INR)

  // Convert amount from one currency to another
  const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
    // Convert to INR first (as base currency)
    const amountInINR = from === "INR" ? amount : amount / currencies[from].exchangeRate
    // Then convert from INR to target currency
    return to === "INR" ? amountInINR : amountInINR * currencies[to].exchangeRate
  }

  // Format currency with proper symbol and decimal places
  const formatCurrency = (amount: number, originalCurrency?: Currency): string => {
    let convertedAmount = amount

    // If original currency is provided and different from current, convert it
    if (originalCurrency && originalCurrency !== currentCurrency.code) {
      convertedAmount = convertCurrency(amount, originalCurrency, currentCurrency.code)
    }

    // Format the number with proper decimal places and thousands separators
    const formattedNumber = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedAmount)

    return `${currentCurrency.symbol}${formattedNumber}`
  }

  // Handle branch change
  const handleBranchChange = (branch: Branch) => {
    setCurrentBranch(branch)

    // Automatically switch currency based on branch if not "all"
    if (branch !== "all") {
      const branchCurrency = branch === "india" ? currencies.INR : branch === "uae" ? currencies.AED : currencies.USD

      setCurrentCurrency(branchCurrency)

      toast({
        title: "Branch & Currency Changed",
        description: `Switched to ${branch} branch with ${branchCurrency.name}`,
      })
    } else {
      // When viewing all branches, default to INR instead of USD
      setCurrentCurrency(currencies.INR)

      toast({
        title: "Branch Changed",
        description: "Viewing data from all branches",
      })
    }
  }

  const value = {
    currentBranch,
    setCurrentBranch: handleBranchChange,
    currentCurrency,
    setCurrentCurrency,
    formatCurrency,
    convertCurrency,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

// Helper hook for currency formatting
export function useCurrencyFormatter() {
  const { formatCurrency } = useAppContext()
  return formatCurrency
}

