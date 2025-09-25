"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, HelpCircle, Lightbulb } from "lucide-react"
import { useState } from "react"

interface TaxBenefitsOutputProps {
  calculations: {
    taxBenefits: {
      totalAnnualTaxSavings: number
      depreciationTaxSavings: number
      qbiTaxSavings: number
      bonusDepreciation: number
      totalAnnualDepreciation: number
      qbiDeduction: number
      effectiveTaxReduction: number
      materialParticipation: boolean
      spouseHours: number
    }
  }
}

export function TaxBenefitsOutput({ calculations }: TaxBenefitsOutputProps) {
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
    materialParticipation:
      "Material participation allows STR losses to offset other income. Requires 500+ hours annually OR 100+ hours with no one else participating more. Spouse hours count toward your total participation time.",
  }

  const toggleHelp = (field: string) => {
    setExpandedHelp(expandedHelp === field ? null : field)
  }

  return (
    <Card className="transition-all duration-300 ease-in-out">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-purple-600" />
          Tax Benefits & Savings
          <Badge
            variant="outline"
            className="transition-all duration-300 ease-in-out bg-green-50 text-green-700 border-green-200 text-sm"
          >
            {formatCurrency(calculations.taxBenefits.totalAnnualTaxSavings)}/year
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Total Tax Savings
                <button
                  type="button"
                  onClick={() => toggleHelp("taxSavings")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Total Tax Savings information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(calculations.taxBenefits.totalAnnualTaxSavings)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {calculations.taxBenefits.effectiveTaxReduction.toFixed(1)}% effective tax rate reduction
            </div>
            {expandedHelp === "taxSavings" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Total Tax Savings Info:</strong> {tooltipContent.taxSavings}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Bonus Depreciation
                <button
                  type="button"
                  onClick={() => toggleHelp("bonusDepreciation")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Bonus Depreciation information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(calculations.taxBenefits.depreciationTaxSavings)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatCurrency(
                calculations.taxBenefits.bonusDepreciation +
                  (calculations.taxBenefits.totalAnnualDepreciation - calculations.taxBenefits.bonusDepreciation),
              )}{" "}
              in first-year deductions
            </div>
            {expandedHelp === "bonusDepreciation" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Bonus Depreciation Info:</strong> {tooltipContent.bonusDepreciation}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                QBI Deduction Savings
                <button
                  type="button"
                  onClick={() => toggleHelp("qbiDeduction")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle QBI Deduction information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span className={`text-xl font-bold text-green-600 dark:text-green-400`}>
                {formatCurrency(calculations.taxBenefits.qbiTaxSavings)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              20% deduction on {formatCurrency(calculations.taxBenefits.qbiDeduction)} business income
            </div>
            {expandedHelp === "qbiDeduction" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>QBI Deduction Info:</strong> {tooltipContent.qbiDeduction}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Material Participation
                <button
                  type="button"
                  onClick={() => toggleHelp("materialParticipation")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Material Participation information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-xl font-bold ${calculations.taxBenefits.materialParticipation ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {calculations.taxBenefits.materialParticipation ? "Qualified" : "Not Qualified"}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {calculations.taxBenefits.spouseHours} hours annually •{" "}
              {calculations.taxBenefits.spouseHours >= 500
                ? "Auto-qualifies"
                : calculations.taxBenefits.spouseHours >= 100
                  ? "May qualify"
                  : "Insufficient hours"}
            </div>
            {expandedHelp === "materialParticipation" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Material Participation Info:</strong> {tooltipContent.materialParticipation}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
