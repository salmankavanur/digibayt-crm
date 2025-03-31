"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Printer, Send, ArrowLeft, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/contexts/app-context"

// Import the tax utility functions
import { getTaxRegistrationLabel, getCompanyTaxRegistration } from "@/utils/tax-utils"

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { formatCurrency } = useAppContext()

  // In a real app, you would fetch the invoice data based on the ID
  // Update the invoice data to include tax details
  const invoice = {
    id: params.id,
    customer: "Acme Corporation",
    customerEmail: "billing@acme.com",
    customerTaxId: "ACMEIN12345", // Example tax ID
    amount: 12500,
    currency: "USD",
    status: "paid",
    issueDate: "Mar 15, 2023",
    dueDate: "Apr 15, 2023",
    branch: "USA",
    taxExempt: false,
    items: [
      { id: 1, description: "Website Development", quantity: 1, price: 8000, total: 8000, hsnSacCode: "998313" },
      { id: 2, description: "UI/UX Design", quantity: 1, price: 3500, total: 3500, hsnSacCode: "998314" },
      { id: 3, description: "Content Creation", quantity: 2, price: 500, total: 1000, hsnSacCode: "998391" },
    ],
    subtotal: 12500,
    tax: 1062.5, // 8.5% tax
    taxDetails: [{ name: "Sales Tax", rate: 8.5, amount: 1062.5 }],
    total: 13562.5,
    notes: "Thank you for your business!",
    terms: "Payment due within 30 days",
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "overdue":
        return <Badge className="bg-digibayt-500">Overdue</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAction = (action: string) => {
    switch (action) {
      case "print":
        toast({
          title: "Print invoice",
          description: `Preparing to print invoice ${invoice.id}`,
        })
        break
      case "download":
        toast({
          title: "Download invoice",
          description: `Downloading invoice ${invoice.id} as PDF`,
        })
        break
      case "send":
        toast({
          title: "Send invoice",
          description: `Sending invoice ${invoice.id} to ${invoice.customerEmail}`,
        })
        break
      case "edit":
        toast({
          title: "Edit invoice",
          description: `Navigating to edit invoice ${invoice.id}`,
        })
        break
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/invoices")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoice {invoice.id}</h1>
            <p className="text-muted-foreground">View and manage invoice details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAction("print")}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction("download")}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction("send")}>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
          <Button size="sm" onClick={() => handleAction("edit")}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Invoice Details</CardTitle>
              {getStatusBadge(invoice.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">From</h3>
                  <div className="mt-1">
                    <p className="font-medium">Digibayt</p>
                    <p>123 Business Street</p>
                    <p>{invoice.branch} Branch</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">To</h3>
                  <div className="mt-1">
                    <p className="font-medium">{invoice.customer}</p>
                    <p>{invoice.customerEmail}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Invoice Number</h3>
                  <p className="mt-1 font-medium">{invoice.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Issue Date</h3>
                  <p className="mt-1">{invoice.issueDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                  <p className="mt-1">{invoice.dueDate}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Invoice Items</h3>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                        {invoice.branch === "india" && (
                          <th className="px-4 py-3 text-left text-sm font-medium">HSN/SAC</th>
                        )}
                        <th className="px-4 py-3 text-right text-sm font-medium">Quantity</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Price</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {invoice.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm">{item.description}</td>
                          {invoice.branch === "india" && <td className="px-4 py-3 text-sm">{item.hsnSacCode}</td>}
                          <td className="px-4 py-3 text-right text-sm">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-sm">
                            {formatCurrency(item.price, invoice.currency as any)}
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium">
                            {formatCurrency(item.total, invoice.currency as any)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* Update the tax section in the invoice table footer */}
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium">
                          Subtotal
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-medium">
                          {formatCurrency(invoice.subtotal, invoice.currency as any)}
                        </td>
                      </tr>

                      {invoice.taxExempt ? (
                        <tr>
                          <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium">
                            Tax (Exempt)
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium">
                            {formatCurrency(0, invoice.currency as any)}
                          </td>
                        </tr>
                      ) : (
                        invoice.taxDetails.map((tax, index) => (
                          <tr key={index}>
                            <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium">
                              {tax.name} ({tax.rate}%)
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-medium">
                              {formatCurrency(tax.amount, invoice.currency as any)}
                            </td>
                          </tr>
                        ))
                      )}

                      <tr className="bg-muted/50">
                        <td colSpan={3} className="px-4 py-3 text-right text-base font-bold">
                          Total
                        </td>
                        <td className="px-4 py-3 text-right text-base font-bold">
                          {formatCurrency(invoice.total, invoice.currency as any)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <div className="mt-1">
                {getStatusBadge(invoice.status)}
                {invoice.status === "paid" && (
                  <p className="mt-1 text-sm text-muted-foreground">Paid on Apr 10, 2023</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
              <p className="mt-1">Bank Transfer</p>
            </div>

            {/* Add tax registration information to the payment information card */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tax Information</h3>
              <div className="mt-1">
                <p className="text-sm">
                  <span className="font-medium">{getTaxRegistrationLabel(invoice.branch)}:</span>{" "}
                  {getCompanyTaxRegistration(invoice.branch)}
                </p>
                {invoice.customerTaxId && (
                  <p className="text-sm">
                    <span className="font-medium">Customer {getTaxRegistrationLabel(invoice.branch)}:</span>{" "}
                    {invoice.customerTaxId}
                  </p>
                )}
                {invoice.taxExempt && <p className="text-sm font-medium text-green-600">Tax Exempt</p>}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p className="mt-1 text-sm">{invoice.notes}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Terms</h3>
              <p className="mt-1 text-sm">{invoice.terms}</p>
            </div>
          </CardContent>
          <CardFooter>
            {invoice.status !== "paid" && (
              <Button
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Mark as paid",
                    description: `Invoice ${invoice.id} marked as paid`,
                  })
                }}
              >
                Mark as Paid
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

