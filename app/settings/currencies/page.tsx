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
import { DollarSign, Edit, Globe, MoreHorizontal, Plus, Search, Trash, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function CurrenciesPage() {
  const currencies = [
    {
      id: 1,
      name: "Indian Rupee",
      code: "INR",
      symbol: "₹",
      exchangeRate: 1.0, // Now INR is the base currency
      isDefault: true,
      isActive: true,
      format: "symbol-amount",
      decimalPlaces: 2,
    },
    {
      id: 2,
      name: "US Dollar",
      code: "USD",
      symbol: "$",
      exchangeRate: 0.012, // 1 INR = 0.012 USD
      isDefault: false,
      isActive: true,
      format: "symbol-amount",
      decimalPlaces: 2,
    },
    {
      id: 3,
      name: "UAE Dirham",
      code: "AED",
      symbol: "د.إ",
      exchangeRate: 0.044, // 1 INR = 0.044 AED
      isDefault: false,
      isActive: true,
      format: "amount-symbol",
      decimalPlaces: 2,
    },
    {
      id: 4,
      name: "Euro",
      code: "EUR",
      symbol: "€",
      exchangeRate: 0.011, // 1 INR = 0.011 EUR
      isDefault: false,
      isActive: false,
      format: "symbol-amount",
      decimalPlaces: 2,
    },
    {
      id: 5,
      name: "British Pound",
      code: "GBP",
      symbol: "£",
      exchangeRate: 0.0095, // 1 INR = 0.0095 GBP
      isDefault: false,
      isActive: false,
      format: "symbol-amount",
      decimalPlaces: 2,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Currency Management</h1>
        <p className="text-muted-foreground">Manage currencies and exchange rates</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Default Currency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">INR</div>
              <Badge className="bg-green-500">Base Rate</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Currencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{currencies.filter((c) => c.isActive).length}</div>
              <div className="flex gap-1">
                {currencies
                  .filter((c) => c.isActive)
                  .map((c) => (
                    <Badge key={c.id} variant="outline">
                      {c.code}
                    </Badge>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">Apr 20, 2023 at 10:30 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search currencies..." className="pl-8 w-[300px]" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Currency
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Exchange Rate</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencies.map((currency) => (
                <TableRow key={currency.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      {currency.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{currency.code}</Badge>
                  </TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <TableCell>
                    <div className="font-mono">{currency.isDefault ? "1.00" : currency.exchangeRate.toFixed(4)}</div>
                  </TableCell>
                  <TableCell>{currency.format}</TableCell>
                  <TableCell>
                    {currency.isDefault ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch checked={currency.isActive} />
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
                          Edit currency
                        </DropdownMenuItem>
                        {!currency.isDefault && (
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            Set as default
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {!currency.isDefault && (
                          <DropdownMenuItem className="text-digibayt-500">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete currency
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

