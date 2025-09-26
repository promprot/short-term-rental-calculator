"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Home, Wrench, AlertTriangle, PieChart } from "lucide-react"
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

  const getExpenseColor = (amount: number, type: "mortgage" | "operating" | "total") => {
    switch (type) {
      case "mortgage":
        if (amount <= 1200) return "text-emerald-600" // Good mortgage payment
        if (amount <= 2000) return "text-yellow-600" // Fair mortgage payment
        return "text-red-500" // High mortgage payment
      case "operating":
        const monthlyOperating = amount / 12
        if (monthlyOperating <= 800) return "text-emerald-600" // Low operating costs
        if (monthlyOperating <= 1500) return "text-yellow-600" // Moderate operating costs
        return "text-red-500" // High operating costs
      case "total":
        const monthlyTotal = amount / (showYearly ? 12 : 1)
        if (monthlyTotal <= 2000) return "text-emerald-600" // Low total expenses
        if (monthlyTotal <= 3500) return "text-yellow-600" // Moderate total expenses
        return "text-red-500" // High total expenses
      default:
        return "text-red-500"
    }
  }

  const getExpenseBadge = (amount: number, type: "mortgage" | "operating" | "total") => {
    switch (type) {
      case "mortgage":
        if (amount <= 1200) return { label: "Low", className: "bg-emerald-100 text-emerald-700" }
        if (amount <= 2000) return { label: "Moderate", className: "bg-yellow-100 text-yellow-700" }
        return { label: "High", className: "bg-red-100 text-red-700" }
      case "operating":
        const monthlyOperating = amount / 12
        if (monthlyOperating <= 800) return { label: "Efficient", className: "bg-emerald-100 text-emerald-700" }
        if (monthlyOperating <= 1500) return { label: "Moderate", className: "bg-yellow-100 text-yellow-700" }
        return { label: "High", className: "bg-red-100 text-red-700" }
      case "total":
        const monthlyTotal = amount / (showYearly ? 12 : 1)
        if (monthlyTotal <= 2000) return { label: "Low Cost", className: "bg-emerald-100 text-emerald-700" }
        if (monthlyTotal <= 3500) return { label: "Moderate", className: "bg-yellow-100 text-yellow-700" }
        return { label: "High Cost", className: "bg-red-100 text-red-700" }
      default:
        return { label: "High", className: "bg-red-100 text-red-700" }
    }
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
    <Card className="overflow-hidden" id="expenses-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
            <PieChart className="h-4 w-4 text-red-600" />
          </div>
          <span className="text-lg font-semibold">Expenses</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {results.monthlyMortgagePayment > 0 && (
            <div className="space-y-3 rounded-lg border bg-muted/30 p-4" id="mortgage-payment-metric">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className={`h-4 w-4 ${getExpenseColor(results.monthlyMortgagePayment, "mortgage")}`} />
                  <span className="text-sm font-medium">Mortgage Payment</span>
                  <button
                    onClick={() => toggleHelp("mortgage")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle Mortgage Payment information"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Badge className={getExpenseBadge(results.monthlyMortgagePayment, "mortgage").className}>
                  {getExpenseBadge(results.monthlyMortgagePayment, "mortgage").label}
                </Badge>
              </div>
              <div className={`text-2xl font-bold ${getExpenseColor(results.monthlyMortgagePayment, "mortgage")}`}>
                {formatCurrency(showYearly ? results.annualMortgagePayments : results.monthlyMortgagePayment)}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Fixed expense</p>
                <Badge variant="secondary" className="text-xs">
                  {((results.monthlyMortgagePayment / totalMonthlyExpenses) * 100).toFixed(0)}% of total
                </Badge>
              </div>

              {expandedHelp === "mortgage" && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <strong>Mortgage Payment:</strong> {helpContent.mortgage}
                </div>
              )}
            </div>
          )}

          <div className="space-y-3 rounded-lg border bg-muted/30 p-4" id="operating-costs-metric">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className={`h-4 w-4 ${getExpenseColor(results.totalAnnualOperatingCosts, "operating")}`} />
                <span className="text-sm font-medium">Operating Costs</span>
                <button
                  onClick={() => toggleHelp("operatingCosts")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Operating Costs information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
              <Badge className={getExpenseBadge(results.totalAnnualOperatingCosts, "operating").className}>
                {getExpenseBadge(results.totalAnnualOperatingCosts, "operating").label}
              </Badge>
            </div>
            <div className={`text-2xl font-bold ${getExpenseColor(results.totalAnnualOperatingCosts, "operating")}`}>
              {formatCurrency(showYearly ? results.totalAnnualOperatingCosts : results.totalAnnualOperatingCosts / 12)}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Scales with occupancy</p>
              <Badge variant="secondary" className="text-xs">
                {((results.totalAnnualOperatingCosts / 12 / totalMonthlyExpenses) * 100).toFixed(0)}% of total
              </Badge>
            </div>

            {expandedHelp === "operatingCosts" && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <strong>Operating Costs:</strong> {helpContent.operatingCosts}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 rounded-lg border-2 border-red-200 bg-muted/20 p-6" id="total-expenses-summary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-lg font-semibold">Total Expenses</span>
              <button
                onClick={() => toggleHelp("totalExpenses")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Total Expenses information"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <Badge
              className={getExpenseBadge(showYearly ? totalAnnualExpenses : totalMonthlyExpenses, "total").className}
            >
              {getExpenseBadge(showYearly ? totalAnnualExpenses : totalMonthlyExpenses, "total").label}
            </Badge>
          </div>
          <div
            className={`text-3xl font-bold ${getExpenseColor(showYearly ? totalAnnualExpenses : totalMonthlyExpenses, "total")}`}
          >
            {formatCurrency(showYearly ? totalAnnualExpenses : totalMonthlyExpenses)}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">All operating and financing costs</p>
            <Badge variant="outline" className="text-xs">
              {showYearly ? "Annual total" : "Monthly total"}
            </Badge>
          </div>

          {expandedHelp === "totalExpenses" && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <strong>Total Expenses:</strong> {helpContent.totalExpenses}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
