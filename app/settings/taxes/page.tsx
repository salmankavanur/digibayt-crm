"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"
import { TAX_RATES, COMPANY_TAX_REGISTRATIONS } from "@/utils/tax-utils"

export default function TaxSettingsPage() {
  const { currentBranch } = useAppContext()
  const [activeTab, setActiveTab] = useState(currentBranch === "all" ? "india" : currentBranch)

  // State for tax registration numbers
  const [taxRegistrations, setTaxRegistrations] = useState({
    india: COMPANY_TAX_REGISTRATIONS.india,
    uae: COMPANY_TAX_REGISTRATIONS.uae,
    usa: COMPANY_TAX_REGISTRATIONS.usa,
  })

  // State for tax rates
  const [taxRates, setTaxRates] = useState({
    india: {
      cgst: TAX_RATES.india.cgst,
      sgst: TAX_RATES.india.sgst,
    },
    uae: {
      vat: TAX_RATES.uae.vat,
    },
    usa: {
      salesTax: TAX_RATES.usa.salesTax,
    },
  })

  // State for tax settings
  const [taxSettings, setTaxSettings] = useState({
    autoCalculate: true,
    showTaxColumn: true,
    roundTaxCalculation: true,
  })

  const handleTaxRegistrationChange = (branch: string, value: string) => {
    setTaxRegistrations((prev) => ({
      ...prev,
      [branch]: value,
    }))
  }

  const handleTaxRateChange = (branch: string, taxType: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setTaxRates((prev) => ({
      ...prev,
      [branch]: {
        ...prev[branch],
        [taxType]: numValue,
      },
    }))
  }

  const handleSettingChange = (setting: string, value: boolean) => {
    setTaxSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const handleSave = () => {
    toast({
      title: "Tax settings saved",
      description: "Your tax settings have been updated successfully.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Tax Settings</h1>
        <p className="text-muted-foreground">Configure tax rates and settings for each branch</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="india">India</TabsTrigger>
          <TabsTrigger value="uae">UAE</TabsTrigger>
          <TabsTrigger value="usa">USA</TabsTrigger>
          <TabsTrigger value="general">General Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="india" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GST Settings (India)</CardTitle>
              <CardDescription>Configure Goods and Services Tax settings for India</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gstin">GSTIN (Goods and Services Tax Identification Number)</Label>
                <Input
                  id="gstin"
                  value={taxRegistrations.india}
                  onChange={(e) => handleTaxRegistrationChange("india", e.target.value)}
                  placeholder="27AADCB2230M1ZT"
                />
                <p className="text-sm text-muted-foreground">
                  Your company's GSTIN will appear on all invoices for Indian customers
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cgst">CGST Rate (%)</Label>
                  <Input
                    id="cgst"
                    type="number"
                    value={taxRates.india.cgst}
                    onChange={(e) => handleTaxRateChange("india", "cgst", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sgst">SGST Rate (%)</Label>
                  <Input
                    id="sgst"
                    type="number"
                    value={taxRates.india.sgst}
                    onChange={(e) => handleTaxRateChange("india", "sgst", e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Rate (%)</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CGST</TableCell>
                      <TableCell>{taxRates.india.cgst}%</TableCell>
                      <TableCell>Central Goods and Services Tax</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SGST</TableCell>
                      <TableCell>{taxRates.india.sgst}%</TableCell>
                      <TableCell>State Goods and Services Tax</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total GST</TableCell>
                      <TableCell>{taxRates.india.cgst + taxRates.india.sgst}%</TableCell>
                      <TableCell>Combined GST rate</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uae" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>VAT Settings (UAE)</CardTitle>
              <CardDescription>Configure Value Added Tax settings for UAE</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="trn">TRN (Tax Registration Number)</Label>
                <Input
                  id="trn"
                  value={taxRegistrations.uae}
                  onChange={(e) => handleTaxRegistrationChange("uae", e.target.value)}
                  placeholder="100399401900003"
                />
                <p className="text-sm text-muted-foreground">
                  Your company's TRN will appear on all invoices for UAE customers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat">VAT Rate (%)</Label>
                <Input
                  id="vat"
                  type="number"
                  value={taxRates.uae.vat}
                  onChange={(e) => handleTaxRateChange("uae", "vat", e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Rate (%)</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>VAT</TableCell>
                      <TableCell>{taxRates.uae.vat}%</TableCell>
                      <TableCell>Value Added Tax</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Tax Settings (USA)</CardTitle>
              <CardDescription>Configure Sales Tax settings for USA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ein">EIN (Employer Identification Number)</Label>
                <Input
                  id="ein"
                  value={taxRegistrations.usa}
                  onChange={(e) => handleTaxRegistrationChange("usa", e.target.value)}
                  placeholder="12-3456789"
                />
                <p className="text-sm text-muted-foreground">
                  Your company's EIN will appear on all invoices for USA customers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salesTax">Sales Tax Rate (%)</Label>
                <Input
                  id="salesTax"
                  type="number"
                  value={taxRates.usa.salesTax}
                  onChange={(e) => handleTaxRateChange("usa", "salesTax", e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Rate (%)</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Sales Tax</TableCell>
                      <TableCell>{taxRates.usa.salesTax}%</TableCell>
                      <TableCell>State and Local Sales Tax</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Tax Settings</CardTitle>
              <CardDescription>Configure global tax settings for all branches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoCalculate"
                  checked={taxSettings.autoCalculate}
                  onCheckedChange={(checked) => handleSettingChange("autoCalculate", checked)}
                />
                <Label htmlFor="autoCalculate">Automatically calculate taxes on invoices</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showTaxColumn"
                  checked={taxSettings.showTaxColumn}
                  onCheckedChange={(checked) => handleSettingChange("showTaxColumn", checked)}
                />
                <Label htmlFor="showTaxColumn">Show tax column on invoices</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="roundTaxCalculation"
                  checked={taxSettings.roundTaxCalculation}
                  onCheckedChange={(checked) => handleSettingChange("roundTaxCalculation", checked)}
                />
                <Label htmlFor="roundTaxCalculation">Round tax calculations to 2 decimal places</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Tax Settings</Button>
      </div>
    </div>
  )
}

