"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Receipt } from "@/components/simple-icons"
import { HelpCircle } from "lucide-react"
import { useState } from "react"

interface ExpenseSummaryOutputProps {
  results: {
    totalAnnualOperatingCosts: number
    managementFeeAmount: number
    actualCleaningCosts: number
    annualUtilities: number
    monthlyMortgagePayment: number
    annualMortgagePayments: number
  }
  showYearly: boolean
}

export function ExpenseSummaryOutput({ results, showYearly }: ExpenseSummaryOutputProps) {
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
    operatingCosts:
      "All operating expenses including property taxes, insurance, utilities, maintenance, platform fees, and cleaning costs. These scale with occupancy and revenue.",
    totalExpenses:
      "Sum of all operating expenses and mortgage payments. This represents your total monthly cost to operate the property.",
  }

  const toggleHelp = (field: string) => {
    setExpandedHelp(expandedHelp === field ? null : field)
  }

  const totalMonthlyExpenses = results.totalAnnualOperatingCosts / 12 + results.monthlyMortgagePayment
  const totalAnnualExpenses = results.totalAnnualOperatingCosts + results.annualMortgagePayments

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Expense Summary
          </div>
          <Badge variant="destructive">
            {formatCurrency(showYearly ? totalAnnualExpenses : totalMonthlyExpenses)}/{showYearly ? "year" : "month"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.monthlyMortgagePayment > 0 && (
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Mortgage Payment</span>
                <button
                  onClick={() => toggleHelp("mortgage")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Mortgage Payment information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              <span className={`text-sm font-medium ${getValueColor(results.monthlyMortgagePayment)}`}>
                {formatCurrency(showYearly ? results.annualMortgagePayments : results.monthlyMortgagePayment)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {((results.monthlyMortgagePayment / totalMonthlyExpenses) * 100).toFixed(0)}% of total expenses
            </div>

            {expandedHelp === "mortgage" && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
                <strong>Mortgage Payment Info:</strong> {helpContent.mortgage}
              </div>
            )}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Operating Costs</span>
              <button
                onClick={() => toggleHelp("operatingCosts")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Operating Costs information"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <span className={`text-sm font-medium ${getValueColor(results.totalAnnualOperatingCosts / 12)}`}>
              {formatCurrency(showYearly ? results.totalAnnualOperatingCosts : results.totalAnnualOperatingCosts / 12)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {((results.totalAnnualOperatingCosts / 12 / totalMonthlyExpenses) * 100).toFixed(0)}% of total expenses •
            Scales with occupancy
          </div>

          {expandedHelp === "operatingCosts" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
              <strong>Operating Costs Info:</strong> {helpContent.operatingCosts}
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Total Expenses</span>
              <button
                onClick={() => toggleHelp("totalExpenses")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Total Expenses information"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <span className={`text-lg font-semibold ${getValueColor(totalMonthlyExpenses)}`}>
              {formatCurrency(showYearly ? totalAnnualExpenses : totalMonthlyExpenses)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">All operating and financing costs</div>

          {expandedHelp === "totalExpenses" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
              <strong>Total Expenses Info:</strong> {helpContent.totalExpenses}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
