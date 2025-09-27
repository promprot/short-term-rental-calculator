"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, HelpCircle } from "lucide-react"
import { useState } from "react"

interface InvestmentPerformanceOutputProps {
  results: {
    netOperatingIncome: number
    annualCashFlow: number
    roi: number
    cashOnCashReturn: number
    capRate: number
    breakEvenMonths: number
    totalCashInvested: number
  }
}

export function InvestmentPerformanceOutput({ results }: InvestmentPerformanceOutputProps) {
  const [expandedHelp, setExpandedHelp] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(1)}%`
  }

  const getValueColor = (value: number, type: "rate" | "expense" | "timeline") => {
    switch (type) {
      case "rate":
        if (value >= 15) return "text-green-600 dark:text-green-400"
        if (value >= 10) return "text-green-600 dark:text-green-400"
        if (value >= 6) return "text-green-600 dark:text-green-400"
        if (value >= 3) return "text-green-600 dark:text-green-400"
        return "text-red-600 dark:text-red-400"
      case "expense":
        return "text-red-600 dark:text-red-400"
      case "timeline":
        if (value <= 12) return "text-green-600 dark:text-green-400"
        if (value <= 24) return "text-green-600 dark:text-green-400"
        if (value <= 36) return "text-green-600 dark:text-green-400"
        if (value <= 60) return "text-red-600 dark:text-red-400"
        return "text-red-600 dark:text-red-400"
      default:
        return "text-foreground"
    }
  }

  const tooltipContent = {
    capRate:
      "Capitalization Rate measures the return on investment based on the property's net operating income divided by property value. Above 8% is excellent, 6-8% is good, 4-6% is fair, below 4% may indicate overpriced property or low rental income.",
    cashOnCash:
      "Cash-on-Cash Return measures your annual pre-tax cash flow relative to the total cash invested (down payment + closing costs + renovations + furnishing). This shows your actual return on the money you put down, not including appreciation.",
    totalInvestment:
      "Total upfront cash required including down payment, closing costs, renovations, and furnishing. This is the amount used to calculate your Cash-on-Cash Return.",
    breakEven:
      "Break-even timeline shows how many months until your cumulative cash flow turns positive. This includes recovering your initial investment and reaching monthly profitability. Shorter timelines indicate better cash flow.",
  }

  const toggleHelp = (field: string) => {
    setExpandedHelp(expandedHelp === field ? null : field)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Investment Performance Metrics
          </div>
          <Badge variant={results.roi > 10 ? "default" : "secondary"}>{formatPercent(results.roi)} ROI</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Cap Rate</span>
              <button
                onClick={() => toggleHelp("capRate")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Cap Rate information"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <div className={`text-lg font-semibold ${getValueColor(results.capRate, "rate")}`}>
              {formatPercent(results.capRate)}
            </div>
            <div className="text-xs text-muted-foreground">NOI ÷ Property Value</div>

            {expandedHelp === "capRate" && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
                <strong>Cap Rate Info:</strong> {tooltipContent.capRate}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Cash-on-Cash Return</span>
              <button
                onClick={() => toggleHelp("cashOnCash")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Cash-on-Cash Return information"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <div className={`text-lg font-semibold ${getValueColor(results.cashOnCashReturn, "rate")}`}>
              {formatPercent(results.cashOnCashReturn)}
            </div>
            <div className="text-xs text-muted-foreground">Annual return on invested capital</div>

            {expandedHelp === "cashOnCash" && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
                <strong>Cash-on-Cash Return Info:</strong> {tooltipContent.cashOnCash}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total Investment</span>
            <button
              onClick={() => toggleHelp("totalInvestment")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Total Investment information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className={`text-lg font-semibold ${getValueColor(results.totalCashInvested, "expense")}`}>
            {formatCurrency(results.totalCashInvested)}
          </div>
          <div className="text-xs text-muted-foreground">Initial capital required</div>

          {expandedHelp === "totalInvestment" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
              <strong>Total Investment Info:</strong> {tooltipContent.totalInvestment}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Break-Even Timeline</span>
            <button
              onClick={() => toggleHelp("breakEven")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Break-Even Timeline information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className={`text-lg font-semibold ${getValueColor(results.breakEvenMonths, "timeline")}`}>
            {results.breakEvenMonths > 0 ? `${results.breakEvenMonths.toFixed(1)} months` : "Never"}
          </div>
          <div className="text-xs text-muted-foreground">
            {results.breakEvenMonths > 0
              ? `${(results.breakEvenMonths / 12).toFixed(1)} years to break even`
              : "Negative cash flow"}
          </div>

          {expandedHelp === "breakEven" && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
              <strong>Break-Even Timeline Info:</strong> {tooltipContent.breakEven}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
