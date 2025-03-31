export interface TaxDetail {
  name: string
  rate: number
  amount: number
}

export interface TaxBreakdown {
  taxDetails: TaxDetail[]
  totalTax: number
  total: number
}

// Get the tax registration label based on branch
export function getTaxRegistrationLabel(branch: string): string {
  switch (branch) {
    case "india":
      return "GSTIN"
    case "uae":
      return "TRN"
    case "usa":
    default:
      return "Tax ID"
  }
}

// Get the company tax registration number based on branch
export function getCompanyTaxRegistration(branch: string): string {
  switch (branch) {
    case "india":
      return "27AADCD1234F1Z5" // Example GSTIN
    case "uae":
      return "123456789012345" // Example TRN
    case "usa":
    default:
      return "12-3456789" // Example EIN
  }
}

// Calculate tax based on branch, amount, and currency
export function calculateTax(amount: number, branch: string, currency: string, taxExempt: boolean): TaxBreakdown {
  if (taxExempt) {
    return {
      taxDetails: [],
      totalTax: 0,
      total: amount,
    }
  }

  let taxDetails: TaxDetail[] = []
  let totalTax = 0

  switch (branch) {
    case "india":
      // GST in India is split into CGST and SGST (9% each for most services)
      const cgstRate = 9
      const sgstRate = 9
      const cgstAmount = (amount * cgstRate) / 100
      const sgstAmount = (amount * sgstRate) / 100

      taxDetails = [
        { name: "CGST", rate: cgstRate, amount: cgstAmount },
        { name: "SGST", rate: sgstRate, amount: sgstAmount },
      ]
      totalTax = cgstAmount + sgstAmount
      break

    case "uae":
      // VAT in UAE is 5%
      const vatRate = 5
      const vatAmount = (amount * vatRate) / 100

      taxDetails = [{ name: "VAT", rate: vatRate, amount: vatAmount }]
      totalTax = vatAmount
      break

    case "usa":
    default:
      // Sales tax in the US (varies by state, using 8.5% as an example)
      const salesTaxRate = 8.5
      const salesTaxAmount = (amount * salesTaxRate) / 100

      taxDetails = [{ name: "Sales Tax", rate: salesTaxRate, amount: salesTaxAmount }]
      totalTax = salesTaxAmount
      break
  }

  return {
    taxDetails,
    totalTax,
    total: amount + totalTax,
  }
}

export const TAX_RATES = {
  india: {
    cgst: 9,
    sgst: 9,
  },
  uae: {
    vat: 5,
  },
  usa: {
    salesTax: 8.5,
  },
}

export const COMPANY_TAX_REGISTRATIONS = {
  india: "27AADCD1234F1Z5", // Example GSTIN
  uae: "123456789012345", // Example TRN
  usa: "12-3456789", // Example EIN
}

