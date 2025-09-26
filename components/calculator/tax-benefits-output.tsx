"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, HelpCircle, Percent, TrendingDown, Shield, PiggyBank } from "lucide-react"
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

  const getTaxSavingsColor = (amount: number) => {
    if (amount >= 15000) return "text-emerald-600" // Excellent tax savings
    if (amount >= 10000) return "text-emerald-500" // Very good tax savings
    if (amount >= 5000) return "text-teal-600" // Good tax savings
    if (amount >= 2000) return "text-teal-500" // Fair tax savings
    return "text-muted-foreground" // Minimal tax savings
  }

  const getTaxSavingsBadge = (amount: number) => {
    if (amount >= 15000) return { label: "Exceptional", className: "bg-emerald-100 text-emerald-700" }
    if (amount >= 10000) return { label: "Excellent", className: "bg-emerald-50 text-emerald-600" }
    if (amount >= 5000) return { label: "Very Good", className: "bg-teal-100 text-teal-700" }
    if (amount >= 2000) return { label: "Good", className: "bg-teal-50 text-teal-600" }
    return { label: "Minimal", className: "bg-muted/10 text-muted-foreground" }
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
  }

  const toggleHelp = (field: string) => {
    setExpandedHelp(expandedHelp === field ? null : field)
  }

  return (
    <Card className="overflow-hidden" id="deductions-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <Shield className="h-4 w-4 text-emerald-600" />
          </div>
          <span className="text-lg font-semibold">Deductions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="space-y-3 rounded-lg border-2 border-emerald-200 bg-muted/20 p-6"
          id="total-tax-savings-summary"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-emerald-600" />
              <span className="text-lg font-semibold">Total Tax Savings</span>
              <button
                onClick={() => toggleHelp("taxSavings")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Total Tax Savings information"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <Badge className={getTaxSavingsBadge(results.taxSavings).className}>
              {getTaxSavingsBadge(results.taxSavings).label}
            </Badge>
          </div>
          <div className={`text-3xl font-bold ${getTaxSavingsColor(results.taxSavings)}`}>
            {formatCurrency(results.taxSavings)}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Annual federal tax reduction</p>
            <Badge variant="outline" className="text-xs">
              {((results.taxSavings / 100000) * 100).toFixed(1)}% effective rate reduction
            </Badge>
          </div>

          {expandedHelp === "taxSavings" && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              <strong>Total Tax Savings:</strong> {tooltipContent.taxSavings}
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4" id="bonus-depreciation-metric">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Bonus Depreciation</span>
                <button
                  onClick={() => toggleHelp("bonusDepreciation")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Bonus Depreciation information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
              <Badge className="bg-teal-100 text-teal-700 text-xs">100% First Year</Badge>
            </div>
            <div className="text-2xl font-bold text-teal-600">{formatCurrency(results.bonusDepreciation)}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Immediate deduction on improvements</p>
              <Badge variant="secondary" className="text-xs">
                ${((results.bonusDepreciation * 0.37) / 1000).toFixed(0)}k tax savings
              </Badge>
            </div>

            {expandedHelp === "bonusDepreciation" && (
              <div className="rounded-md border border-teal-200 bg-teal-50 p-3 text-sm text-teal-700">
                <strong>Bonus Depreciation:</strong> {tooltipContent.bonusDepreciation}
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/30 p-4" id="qbi-deduction-metric">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">QBI Deduction</span>
                <button
                  onClick={() => toggleHelp("qbiDeduction")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle QBI Deduction information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 text-xs">20% Deduction</Badge>
            </div>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(results.qbiDeduction)}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">20% deduction on qualifying business income</p>
              <Badge variant="secondary" className="text-xs">
                ${((results.qbiDeduction * 0.37) / 1000).toFixed(0)}k tax savings
              </Badge>
            </div>

            {expandedHelp === "qbiDeduction" && (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                <strong>QBI Deduction:</strong> {tooltipContent.qbiDeduction}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 rounded-lg border bg-muted/20 p-4" id="total-depreciation-metric">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Depreciation</span>
              <button
                onClick={() => toggleHelp("depreciation")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Depreciation information"
              >
                <HelpCircle className="h-3.5 w-3.5" />
              </button>
            </div>
            <Badge variant="secondary" className="text-xs">
              First Year
            </Badge>
          </div>
          <div className="text-2xl font-bold text-slate-700">{formatCurrency(results.totalFirstYearDepreciation)}</div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">First-year depreciation deductions</p>
            <Badge variant="outline" className="text-xs">
              ${((results.totalFirstYearDepreciation * 0.37) / 1000).toFixed(0)}k tax impact
            </Badge>
          </div>

          {expandedHelp === "depreciation" && (
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <strong>Depreciation:</strong> {tooltipContent.depreciation}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
