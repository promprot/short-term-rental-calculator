"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, HelpCircle, Lightbulb } from "lucide-react"
import { useState } from "react"

interface InvestmentPerformanceOutputProps {
  calculations: {
    capRate: number
    cashOnCashReturn: number
    totalStartupCosts: number
    breakEvenMonths: number
  }
  showYearly: boolean
}

export function InvestmentPerformanceOutput({ calculations, showYearly }: InvestmentPerformanceOutputProps) {
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
    <Card className="transition-all duration-300 ease-in-out">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Home className="h-5 w-5 text-blue-600" />
          Investment Performance Metrics
          <Badge variant="outline" className="transition-all duration-300 ease-in-out text-sm">
            {formatPercent(calculations.capRate)} Cap Rate
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Cap Rate
                <button
                  type="button"
                  onClick={() => toggleHelp("capRate")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Cap Rate information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.capRate, "rate")}`}
              >
                {formatPercent(calculations.capRate)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">NOI ÷ Property Value</div>
            {expandedHelp === "capRate" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Cap Rate Info:</strong> {tooltipContent.capRate}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Cash-on-Cash Return
                <button
                  type="button"
                  onClick={() => toggleHelp("cashOnCash")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Cash-on-Cash Return information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.cashOnCashReturn, "rate")}`}
              >
                {formatPercent(calculations.cashOnCashReturn)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Annual return on invested capital</div>
            {expandedHelp === "cashOnCash" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Cash-on-Cash Return Info:</strong> {tooltipContent.cashOnCash}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Total Investment
                <button
                  type="button"
                  onClick={() => toggleHelp("totalInvestment")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Total Investment information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.totalStartupCosts, "expense")}`}
              >
                {formatCurrency(calculations.totalStartupCosts)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Initial capital required</div>
            {expandedHelp === "totalInvestment" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Total Investment Info:</strong> {tooltipContent.totalInvestment}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                Break-Even Timeline
                <button
                  type="button"
                  onClick={() => toggleHelp("breakEven")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Break-Even Timeline information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.breakEvenMonths, "timeline")}`}
              >
                {showYearly
                  ? `${(calculations.breakEvenMonths / 12).toFixed(1)} years`
                  : `${calculations.breakEvenMonths.toFixed(1)} months`}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {showYearly
                ? `${calculations.breakEvenMonths.toFixed(1)} months to break even`
                : `${(calculations.breakEvenMonths / 12).toFixed(1)} years to break even`}
            </div>
            {expandedHelp === "breakEven" && (
              <div className="bg-muted/50 rounded-lg p-3 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Break-Even Timeline Info:</strong> {tooltipContent.breakEven}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
