"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, TrendingUp, DollarSign, Clock } from "lucide-react"
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
        if (value >= 15) return "text-blue-600"
        if (value >= 10) return "text-blue-500"
        if (value >= 6) return "text-teal-600"
        if (value >= 3) return "text-yellow-600"
        return "text-red-500"
      case "expense":
        return "text-blue-700"
      case "timeline":
        if (value <= 12) return "text-blue-600"
        if (value <= 24) return "text-teal-600"
        if (value <= 36) return "text-yellow-600"
        if (value <= 60) return "text-orange-500"
        return "text-red-500"
      default:
        return "text-foreground"
    }
  }

  const getPerformanceBadge = (value: number, type: "rate" | "timeline") => {
    if (type === "rate") {
      if (value >= 15)
        return {
          label: "Excellent",
          variant: "default" as const,
          className: "bg-blue-100 text-blue-700",
        }
      if (value >= 10)
        return {
          label: "Very Good",
          variant: "default" as const,
          className: "bg-blue-50 text-blue-600",
        }
      if (value >= 6)
        return {
          label: "Good",
          variant: "default" as const,
          className: "bg-teal-100 text-teal-700",
        }
      if (value >= 3)
        return {
          label: "Fair",
          variant: "default" as const,
          className: "bg-yellow-100 text-yellow-700",
        }
      return { label: "Poor", variant: "destructive" as const, className: "" }
    } else {
      if (value <= 12)
        return {
          label: "Excellent",
          variant: "default" as const,
          className: "bg-blue-100 text-blue-700",
        }
      if (value <= 24)
        return {
          label: "Good",
          variant: "default" as const,
          className: "bg-teal-100 text-teal-700",
        }
      if (value <= 36)
        return {
          label: "Fair",
          variant: "default" as const,
          className: "bg-yellow-100 text-yellow-700",
        }
      return { label: "Poor", variant: "destructive" as const, className: "" }
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
    <Card className="overflow-hidden" id="performance-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-lg font-semibold">Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4" id="cap-rate-metric">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Cap Rate</span>
                <button
                  onClick={() => toggleHelp("capRate")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Cap Rate information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
              <Badge className={getPerformanceBadge(results.capRate, "rate").className}>
                {getPerformanceBadge(results.capRate, "rate").label}
              </Badge>
            </div>
            <div className={`text-2xl font-bold ${getValueColor(results.capRate, "rate")}`}>
              {formatPercent(results.capRate)}
            </div>
            <p className="text-xs text-muted-foreground">NOI ÷ Property Value</p>

            {expandedHelp === "capRate" && (
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                <strong>Cap Rate:</strong> {tooltipContent.capRate}
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/30 p-4" id="cash-on-cash-metric">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Cash-on-Cash Return</span>
                <button
                  onClick={() => toggleHelp("cashOnCash")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Cash-on-Cash Return information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
              <Badge className={getPerformanceBadge(results.cashOnCashReturn, "rate").className}>
                {getPerformanceBadge(results.cashOnCashReturn, "rate").label}
              </Badge>
            </div>
            <div className={`text-2xl font-bold ${getValueColor(results.cashOnCashReturn, "rate")}`}>
              {formatPercent(results.cashOnCashReturn)}
            </div>
            <p className="text-xs text-muted-foreground">Annual return on invested capital</p>

            {expandedHelp === "cashOnCash" && (
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                <strong>Cash-on-Cash Return:</strong> {tooltipContent.cashOnCash}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3 rounded-lg border bg-muted/20 p-4" id="total-investment-metric">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Investment</span>
                <button
                  onClick={() => toggleHelp("totalInvestment")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Total Investment information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getValueColor(results.totalCashInvested, "expense")}`}>
              {formatCurrency(results.totalCashInvested)}
            </div>
            <p className="text-xs text-muted-foreground">Initial capital required</p>

            {expandedHelp === "totalInvestment" && (
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                <strong>Total Investment:</strong> {tooltipContent.totalInvestment}
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/20 p-4" id="break-even-metric">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Break-Even Timeline</span>
                <button
                  onClick={() => toggleHelp("breakEven")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Break-Even Timeline information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
              {results.breakEvenMonths > 0 && (
                <Badge className={getPerformanceBadge(results.breakEvenMonths, "timeline").className}>
                  {getPerformanceBadge(results.breakEvenMonths, "timeline").label}
                </Badge>
              )}
            </div>
            <div className={`text-2xl font-bold ${getValueColor(results.breakEvenMonths, "timeline")}`}>
              {results.breakEvenMonths > 0 ? `${results.breakEvenMonths.toFixed(1)} months` : "Never"}
            </div>
            <p className="text-xs text-muted-foreground">
              {results.breakEvenMonths > 0
                ? `${(results.breakEvenMonths / 12).toFixed(1)} years to break even`
                : "Negative cash flow"}
            </p>

            {expandedHelp === "breakEven" && (
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                <strong>Break-Even Timeline:</strong> {tooltipContent.breakEven}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
