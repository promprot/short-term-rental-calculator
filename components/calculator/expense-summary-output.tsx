"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Receipt } from "@/components/simple-icons"
import { HelpCircle, Lightbulb } from "lucide-react"
import { useState } from "react"

interface ExpenseSummaryOutputProps {
  calculations: {
    monthlyExpenses: number
    annualExpenses: number
    expenseBreakdown: {
      mortgage: number
      platformFees: number
      cleaningFees: number
    }
  }
  showYearly: boolean
}

export function ExpenseSummaryOutput({ calculations, showYearly }: ExpenseSummaryOutputProps) {
  const [expandedHelp, setExpandedHelp] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getValueColor = (value: number) => {
    return "text-red-600 dark:text-red-400"
  }

  const helpContent = {
    mortgage:
      "Monthly mortgage payment including principal and interest. This is typically your largest fixed expense and doesn't vary with occupancy rates.",
    platformFees:
      "Combined fees from booking platforms like Airbnb (3% host fee) and VRBO (5% commission), plus payment processing fees. These scale with your revenue.",
    cleaningFees:
      "Professional cleaning costs between guests. While you charge cleaning fees to guests, actual cleaning costs may be higher and scale with occupancy.",
    totalExpenses:
      "Sum of all operating expenses including mortgage, platform fees, cleaning, insurance, utilities, maintenance, and property management costs.",
  }

  const toggleHelp = (field: string) => {
    setExpandedHelp(expandedHelp === field ? null : field)
  }

  return (
    <Card className="transition-all duration-300 ease-in-out">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Receipt className="h-5 w-5 text-red-600" />
          Expense Summary
          <Badge variant="outline" className="transition-all duration-300 ease-in-out text-sm">
            {formatCurrency(showYearly ? calculations.monthlyExpenses * 12 : calculations.monthlyExpenses)}/
            {showYearly ? "year" : "month"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {calculations.expenseBreakdown.mortgage > 0 && (
            <div className="space-y-2 transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  Mortgage Payment
                  <button
                    type="button"
                    onClick={() => toggleHelp("mortgage")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle Mortgage Payment information"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </span>
                <span
                  className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                    showYearly ? calculations.expenseBreakdown.mortgage * 12 : calculations.expenseBreakdown.mortgage,
                  )}`}
                >
                  {formatCurrency(
                    showYearly ? calculations.expenseBreakdown.mortgage * 12 : calculations.expenseBreakdown.mortgage,
                  )}
                </span>
              </div>
              <div className="text-xs text-muted-foreground transition-all duration-300 ease-in-out">
                {((calculations.expenseBreakdown.mortgage / calculations.monthlyExpenses) * 100).toFixed(0)}% of total
                expenses
              </div>
              {expandedHelp === "mortgage" && (
                <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                  <p className="text-xs text-muted-foreground">
                    <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                    <strong>Mortgage Payment Info:</strong> {helpContent.mortgage}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Platform Fees
                <button
                  type="button"
                  onClick={() => toggleHelp("platformFees")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Platform Fees information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                  showYearly
                    ? calculations.expenseBreakdown.platformFees * 12
                    : calculations.expenseBreakdown.platformFees,
                )}`}
              >
                {formatCurrency(
                  showYearly
                    ? calculations.expenseBreakdown.platformFees * 12
                    : calculations.expenseBreakdown.platformFees,
                )}
              </span>
            </div>
            <div className="text-xs text-muted-foreground transition-all duration-300 ease-in-out">
              {((calculations.expenseBreakdown.platformFees / calculations.monthlyExpenses) * 100).toFixed(0)}% of total
              expenses
            </div>
            {expandedHelp === "platformFees" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Platform Fees Info:</strong> {helpContent.platformFees}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Cleaning Costs
                <button
                  type="button"
                  onClick={() => toggleHelp("cleaningFees")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Cleaning Costs information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                  showYearly
                    ? calculations.expenseBreakdown.cleaningFees * 12
                    : calculations.expenseBreakdown.cleaningFees,
                )}`}
              >
                {formatCurrency(
                  showYearly
                    ? calculations.expenseBreakdown.cleaningFees * 12
                    : calculations.expenseBreakdown.cleaningFees,
                )}
              </span>
            </div>
            <div className="text-xs text-muted-foreground transition-all duration-300 ease-in-out">
              {((calculations.expenseBreakdown.cleaningFees / calculations.monthlyExpenses) * 100).toFixed(0)}% of total
              • Scales with occupancy
            </div>
            {expandedHelp === "cleaningFees" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Cleaning Costs Info:</strong> {helpContent.cleaningFees}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Total Expenses
                <button
                  type="button"
                  onClick={() => toggleHelp("totalExpenses")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Total Expenses information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                  showYearly ? calculations.annualExpenses : calculations.monthlyExpenses,
                )}`}
              >
                {formatCurrency(showYearly ? calculations.annualExpenses : calculations.monthlyExpenses)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">All operating and financing costs</div>
            {expandedHelp === "totalExpenses" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Total Expenses Info:</strong> {helpContent.totalExpenses}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
