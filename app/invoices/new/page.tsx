"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { useAppContext } from "@/contexts/app-context"
import { CalendarIcon, Plus, Trash } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// First, import the tax utility functions
import { calculateTax, getTaxRegistrationLabel, type TaxBreakdown } from "@/utils/tax-utils"
import { TaxInfoCard } from "@/components/invoices/tax-info-card"

export default function NewInvoicePage() {
  const router = useRouter()
  const { currentBranch, currentCurrency, formatCurrency } = useAppContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dueDate, setDueDate] = useState<Date>()
  // Add HSN/SAC code field to the items array
  const [items, setItems] = useState([
    {
      id: 1,
      description: "",
      quantity: 1,
      price: 0,
      total: 0,
      hsnSacCode: "", // Add this for Indian GST
    },
  ])

  // Add taxExempt state to the formData
  const [formData, setFormData] = useState({
    customer: "",
    customerEmail: "",
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    issueDate: new Date(),
    branch: currentBranch === "all" ? "india" : currentBranch, // Default to India branch
    currency: currentCurrency.code,
    notes: "",
    terms: "Payment due within 30 days",
    sendImmediately: true,
    taxExempt: false,
    customerTaxId: "",
  })

  // Add a state for tax breakdown
  const [taxBreakdown, setTaxBreakdown] = useState<TaxBreakdown | null>(null)

  // Helper function to get branch-specific tax note
  const getBranchTaxNote = () => {
    switch (formData.branch) {
      case "india":
        return formData.taxExempt
          ? "This invoice is tax exempt. No GST will be applied."
          : "GST will be applied as per Indian tax regulations (CGST 9% + SGST 9%)."
      case "uae":
        return formData.taxExempt
          ? "This invoice is tax exempt. No VAT will be applied."
          : "5% VAT will be applied as per UAE tax regulations."
      case "usa":
      default:
        return formData.taxExempt
          ? "This invoice is tax exempt. No sales tax will be applied."
          : "Sales tax will be applied as per applicable state regulations."
    }
  }

  // Update the useEffect to recalculate tax when items, branch, or taxExempt changes
  useEffect(() => {
    const subtotal = calculateSubtotal()
    const breakdown = calculateTax(subtotal, formData.branch, formData.currency, formData.taxExempt)
    setTaxBreakdown(breakdown)
  }, [items, formData.branch, formData.currency, formData.taxExempt])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Update the handleItemChange function to handle HSN/SAC code
  const handleItemChange = (id: number, field: string, value: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalculate total if quantity or price changes
          if (field === "quantity" || field === "price") {
            updatedItem.total = Number(updatedItem.quantity) * Number(updatedItem.price)
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const addItem = () => {
    const newId = Math.max(...items.map((item) => item.id), 0) + 1
    setItems([...items, { id: newId, description: "", quantity: 1, price: 0, total: 0, hsnSacCode: "" }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      toast({
        title: "Cannot remove item",
        description: "Invoice must have at least one item",
      })
    }
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  // Replace the calculateTax function with our new one
  const calculateTotalTax = () => {
    return taxBreakdown?.totalTax || 0
  }

  // Update the calculateTotal function
  const calculateTotal = () => {
    return taxBreakdown?.total || calculateSubtotal()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!dueDate) {
      toast({
        title: "Missing due date",
        description: "Please select a due date for the invoice",
      })
      return
    }

    if (calculateSubtotal() <= 0) {
      toast({
        title: "Invalid amount",
        description: "Invoice total must be greater than zero",
      })
      return
    }

    // For India branch, validate HSN/SAC codes if not tax exempt
    if (formData.branch === "india" && !formData.taxExempt) {
      const missingHsnSac = items.some((item) => !item.hsnSacCode)
      if (missingHsnSac) {
        toast({
          title: "Missing HSN/SAC codes",
          description: "Please provide HSN/SAC codes for all items (required for GST compliance)",
        })
        return
      }
    }

    setIsSubmitting(true)

    // Create the invoice data with tax information
    const invoiceData = {
      ...formData,
      items,
      dueDate,
      subtotal: calculateSubtotal(),
      tax: calculateTotalTax(),
      total: calculateTotal(),
      taxBreakdown: taxBreakdown,
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Invoice created",
        description: `Invoice ${formData.invoiceNumber} has been created successfully`,
      })
      setIsSubmitting(false)
      // Navigate back to invoices list
      router.push("/invoices")
    }, 1500)
  }

  const handleCancel = () => {
    toast({
      title: "Operation cancelled",
      description: "Invoice creation cancelled",
    })
    router.push("/invoices")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
          <p className="text-muted-foreground">Create and send a new invoice to your customer</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Invoice"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Enter the customer details for this invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer Name *</Label>
                <Input
                  id="customer"
                  name="customer"
                  placeholder="Acme Corporation"
                  required
                  value={formData.customer}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email *</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  placeholder="billing@acme.com"
                  required
                  value={formData.customerEmail}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Set the invoice number, dates, and other details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input value={format(formData.issueDate, "PPP")} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={formData.branch} onValueChange={(value) => handleSelectChange("branch", value)}>
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Add this after the branch selection dropdown in the form: */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="taxExempt"
                    checked={formData.taxExempt}
                    onCheckedChange={(checked) => handleSwitchChange("taxExempt", checked)}
                  />
                  <Label htmlFor="taxExempt">Tax exempt</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerTaxId">{getTaxRegistrationLabel(formData.branch)} (Customer)</Label>
                <Input
                  id="customerTaxId"
                  name="customerTaxId"
                  placeholder={`Enter customer ${getTaxRegistrationLabel(formData.branch)}`}
                  value={formData.customerTaxId}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Reorder to show INR first */}
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Add the TaxInfoCard here */}
          <div className="md:col-span-1">
            <TaxInfoCard branch={formData.branch} taxExempt={formData.taxExempt} />
          </div>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
              <CardDescription>
                Add the products or services for this invoice
                {!formData.taxExempt && <span className="block mt-1 text-xs font-normal">{getBranchTaxNote()}</span>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                  <div className={formData.branch === "india" ? "col-span-4" : "col-span-6"}>Description</div>
                  {formData.branch === "india" && <div className="col-span-2">HSN/SAC</div>}
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-1">Total</div>
                  <div className="col-span-1"></div>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className={formData.branch === "india" ? "col-span-4" : "col-span-6"}>
                      <Input
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                      />
                    </div>
                    {formData.branch === "india" && (
                      <div className="col-span-2">
                        <Input
                          placeholder="HSN/SAC"
                          value={item.hsnSacCode}
                          onChange={(e) => handleItemChange(item.id, "hsnSacCode", e.target.value)}
                        />
                      </div>
                    )}
                    <div className="col-span-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-1 font-medium">{formatCurrency(item.total, formData.currency as any)}</div>
                    <div className="col-span-1">
                      <Button variant="ghost" size="icon" type="button" onClick={() => removeItem(item.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>

                {/* Replace the subtotal/tax/total section with this: */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">{formatCurrency(calculateSubtotal(), formData.currency as any)}</span>
                  </div>

                  {!formData.taxExempt && taxBreakdown?.taxDetails && taxBreakdown.taxDetails.length > 0
                    ? taxBreakdown.taxDetails.map((tax, index) => (
                        <div className="flex justify-between" key={index}>
                          <span>
                            {tax.name} ({tax.rate}%):
                          </span>
                          <span>{formatCurrency(tax.amount, formData.currency as any)}</span>
                        </div>
                      ))
                    : formData.taxExempt && (
                        <div className="flex justify-between text-muted-foreground">
                          <span>Tax:</span>
                          <span>Exempt</span>
                        </div>
                      )}

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateTotal(), formData.currency as any)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Add notes and payment terms to your invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.branch === "india" && (
                <div className="p-3 bg-muted rounded-md text-sm mb-4">
                  <p>HSN/SAC codes are required for GST compliance in India.</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Additional notes for the customer"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">Payment Terms</Label>
                <Textarea id="terms" name="terms" rows={2} value={formData.terms} onChange={handleChange} />
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <Switch
                  id="sendImmediately"
                  checked={formData.sendImmediately}
                  onCheckedChange={(checked) => handleSwitchChange("sendImmediately", checked)}
                />
                <Label htmlFor="sendImmediately">Send invoice to customer immediately</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

