"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, HelpCircle } from "lucide-react"
import { useState } from "react"

interface TaxBenefitsOutputProps {
  results: {
    annualDepreciation: number
    bonusDepreciation: number
    totalFirstYearDepreciation: number
    qbiDeduction: number
    taxSavings: number
    taxableRentalIncome: number
    passiveLossLimitation: number
  }
}

export function TaxBenefitsOutput({ results }: TaxBenefitsOutputProps) {
  const [expandedHelp, setExpandedHelp] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const tooltipContent = {
    taxSavings:
      "Annual tax savings from STR ownership including 100% bonus depreciation on renovations/furnishing (Trump's 2025 tax reforms), property depreciation, and 20% QBI deduction for qualifying business income. High earners see substantial benefits.",
    bonusDepreciation:
      "Under Trump's 'One Big Beautiful Bill' (2025), you can immediately deduct 100% of qualifying property improvements like renovations and furnishing in the first year, creating significant tax savings for high earners.",
    qbiDeduction:
      "Qualified Business Income deduction allows 20% deduction on STR profits (now permanent under 2025 tax reforms). Combined with material participation status, this provides substantial tax benefits for high-income earners.",
    depreciation:
      "Regular property depreciation over 27.5 years plus bonus depreciation for improvements. This creates paper losses that can offset other income when you qualify for material participation.",
    materialParticipation:
      "Material participation allows STR losses to offset other income. Requires 500+ hours annually OR 100+ hours with no one else participating more. Spouse hours count toward your total participation time.",
  }

  const toggleHelp = (field: string) => {
    setExpandedHelp(expandedHelp === field ? null : field)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tax Benefits & Savings
          </div>
          <Badge variant="default" className="bg-green-600 text-white">
            {formatCurrency(results.taxSavings)}/year
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total Tax Savings</span>
            <button
              onClick={() => toggleHelp("taxSavings")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Total Tax Savings information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(results.taxSavings)}
          </div>
          <div className="text-xs text-muted-foreground">Annual federal tax reduction from STR benefits</div>

          {expandedHelp === "taxSavings" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
              <strong>Total Tax Savings Info:</strong> {tooltipContent.taxSavings}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Bonus Depreciation</span>
            <button
              onClick={() => toggleHelp("bonusDepreciation")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Bonus Depreciation information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(results.bonusDepreciation)}
          </div>
          <div className="text-xs text-muted-foreground">100% first-year deduction on improvements</div>

          {expandedHelp === "bonusDepreciation" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
              <strong>Bonus Depreciation Info:</strong> {tooltipContent.bonusDepreciation}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">QBI Deduction</span>
            <button
              onClick={() => toggleHelp("qbiDeduction")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle QBI Deduction information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(results.qbiDeduction)}
          </div>
          <div className="text-xs text-muted-foreground">20% deduction on qualifying business income</div>

          {expandedHelp === "qbiDeduction" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
              <strong>QBI Deduction Info:</strong> {tooltipContent.qbiDeduction}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total Depreciation</span>
            <button
              onClick={() => toggleHelp("depreciation")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Depreciation information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(results.totalFirstYearDepreciation)}
          </div>
          <div className="text-xs text-muted-foreground">First-year depreciation deductions</div>

          {expandedHelp === "depreciation" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
              <strong>Depreciation Info:</strong> {tooltipContent.depreciation}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
