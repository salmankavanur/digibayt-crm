import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTaxRegistrationLabel, getCompanyTaxRegistration } from "@/utils/tax-utils"

interface TaxInfoCardProps {
  branch: string
  taxExempt: boolean
}

export function TaxInfoCard({ branch, taxExempt }: TaxInfoCardProps) {
  const taxLabel = getTaxRegistrationLabel(branch)
  const companyTaxId = getCompanyTaxRegistration(branch)

  if (taxExempt) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tax Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-md border border-yellow-200 dark:border-yellow-900">
            <p>This invoice is marked as tax exempt.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Tax Information</CardTitle>
        <CardDescription>
          {branch === "india"
            ? "GST details for this invoice"
            : branch === "uae"
              ? "VAT details for this invoice"
              : "Tax details for this invoice"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-1">
          <div className="font-medium">Company {taxLabel}:</div>
          <div>{companyTaxId}</div>
        </div>

        {branch === "india" && (
          <div className="bg-muted p-3 rounded-md">
            <p className="font-medium mb-1">GST Information</p>
            <p>CGST and SGST will be applied at 9% each (total 18%).</p>
            <p className="mt-2 text-xs text-muted-foreground">HSN/SAC codes are required for all items.</p>
          </div>
        )}

        {branch === "uae" && (
          <div className="bg-muted p-3 rounded-md">
            <p className="font-medium mb-1">VAT Information</p>
            <p>VAT will be applied at 5% on all taxable items.</p>
          </div>
        )}

        {branch === "usa" && (
          <div className="bg-muted p-3 rounded-md">
            <p className="font-medium mb-1">Sales Tax Information</p>
            <p>Sales tax will be applied at 8.5% on all taxable items.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

