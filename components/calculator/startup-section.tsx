"use client"
import { ChevronDown, ChevronUp, Home, HelpCircle } from "../simple-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputField } from "./input-field"
import { SliderField } from "./slider-field"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface StartupSectionProps {
  data: {
    purchasePrice: number
    downPayment: number
    closingCosts: number
    interestRate: number
    renovation: number
    furnishing: number
    loanTerm: number
  }
  onChange: (field: string, value: number | boolean) => void
  isOpen: boolean
  onToggle: () => void
}

export function StartupSection({ data, onChange, isOpen, onToggle }: StartupSectionProps) {
  const [isLoanTermDescriptionOpen, setIsLoanTermDescriptionOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US").format(amount)
  }

  return (
    <Card className={`transition-all duration-300 ease-in-out ${!isOpen ? "" : "py-3 gap-3"}`}>
      <CardHeader
        className={`${!isOpen ? "cursor-pointer hover:bg-muted/50 transition-colors pb-4" : "pb-3"}`}
        onClick={!isOpen ? onToggle : undefined}
      >
        <div
          className={`flex items-center justify-between ${isOpen ? "cursor-pointer" : ""}`}
          onClick={isOpen ? onToggle : undefined}
        >
          <div className="flex items-center gap-3">
            <Home className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Investment Property</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">{isOpen ? "Collapse" : "Expand"}</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {!isOpen && (
        <CardContent
          className="pt-0 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={onToggle}
        ></CardContent>
      )}
      {isOpen && (
        <CardContent className="pt-0 px-6 pb-6">
          <div className="grid grid-cols-1 gap-8">
            {/* Primary Investment Details - 3 columns on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <InputField
                label="Purchase Price"
                value={data.purchasePrice}
                onChange={(value) => onChange("purchasePrice", Number.parseFloat(value) || 0)}
                prefix="$"
                description="Total property purchase price. Consider the 1% rule as a starting point (monthly rent ≥ 1% of purchase price), though successful STRs often exceed this benchmark due to higher nightly rates."
                placeholder={formatCurrency(300000)}
              />

              <InputField
                label="Down Payment"
                value={data.downPayment}
                onChange={(value) => onChange("downPayment", Number.parseFloat(value) || 0)}
                prefix="$"
                description="Upfront cash payment toward purchase. Investment properties typically require 20-25% minimum down payment. Higher down payments reduce monthly mortgage costs and improve cash flow metrics."
                placeholder={formatCurrency(60000)}
              />

              <InputField
                label="Closing Costs"
                value={data.closingCosts}
                onChange={(value) => onChange("closingCosts", Number.parseFloat(value) || 0)}
                prefix="$"
                description="One-time costs to complete property purchase including title insurance, attorney fees, inspections, appraisal, and lender fees. Typically 2-5% of purchase price."
                placeholder={formatCurrency(15000)}
              />
            </div>

            {/* Loan Details - 2 columns with loan term in tooltip-style box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <SliderField
                label="Interest Rate"
                value={data.interestRate}
                onChange={(value) => onChange("interestRate", value)}
                min={3}
                max={12}
                step={0.125}
                suffix="%"
                description="Annual mortgage interest rate for investment property. Investment rates are typically 0.5-1% higher than primary residence rates."
              />

              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <Label htmlFor="loan-term" className="text-sm font-medium">
                    Loan Term
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsLoanTermDescriptionOpen(!isLoanTermDescriptionOpen)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle Loan Term help"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </div>
                <Select
                  value={data.loanTerm.toString()}
                  onValueChange={(value) => onChange("loanTerm", Number.parseInt(value))}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select loan term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200 ease-in-out",
                    isLoanTermDescriptionOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="bg-muted/50 rounded-lg p-4 border border-dashed">
                    <p className="text-xs text-muted-foreground">
                      <strong>Loan Term Info:</strong> 15-year loans have higher monthly payments but lower total
                      interest. 30-year loans improve cash flow but cost more over time. Choose based on your cash flow
                      needs and investment strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Costs - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <InputField
                label="Renovation Budget"
                value={data.renovation}
                onChange={(value) => onChange("renovation", Number.parseFloat(value) || 0)}
                prefix="$"
                description="Guest-ready improvements to maximize bookings and rates. Under Trump's 2025 tax reforms, 100% bonus depreciation allows immediate write-off of qualifying renovations."
                placeholder={formatCurrency(0)}
              />

              <InputField
                label="Furnishing Budget"
                value={data.furnishing}
                onChange={(value) => onChange("furnishing", Number.parseFloat(value) || 0)}
                prefix="$"
                description="Complete furnishing package for guest comfort and professional photos. Qualifies for 100% bonus depreciation under 2025 tax law. Budget by size: Studio $10-18K, 1BR $15-25K, 2BR $20-35K, 3+BR $30-60K."
                placeholder={formatCurrency(0)}
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
