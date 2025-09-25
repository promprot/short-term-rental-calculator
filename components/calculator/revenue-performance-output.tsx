"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, HelpCircle, Lightbulb } from "lucide-react"
import { useState } from "react"

interface RevenuePerformanceOutputProps {
  calculations: {
    grossMonthlyRevenue: number
    netMonthlyIncome: number
    annualNetIncome: number
    adr: number
    occupancyRate: number
    nightsBooked: number
    bookingsPerMonth: number
  }
  showYearly: boolean
}

export function RevenuePerformanceOutput({ calculations, showYearly }: RevenuePerformanceOutputProps) {
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

  const getValueColor = (value: number, type: "revenue" | "profit" | "rate") => {
    switch (type) {
      case "revenue":
        return "text-green-600 dark:text-green-400"
      case "profit":
        if (value > 0) return "text-green-600 dark:text-green-400"
        if (value === 0) return "text-muted-foreground"
        return "text-red-600 dark:text-red-400"
      case "rate":
        if (value >= 15) return "text-green-600 dark:text-green-400"
        if (value >= 10) return "text-green-600 dark:text-green-400"
        if (value >= 6) return "text-green-600 dark:text-green-400"
        if (value >= 3) return "text-green-600 dark:text-green-400"
        return "text-red-600 dark:text-red-400"
      default:
        return "text-foreground"
    }
  }

  const tooltipContent = {
    grossRevenue:
      "Gross Revenue is your total rental income before any expenses, calculated as nightly rate × occupancy rate × cleaning fees. This represents your maximum earning potential.",
    netCashFlow:
      "Net Cash Flow is your monthly profit after all expenses including mortgage, taxes, fees, and operating costs. Positive cash flow means the property pays for itself and generates income.",
    adr: "Average Daily Rate is your revenue per occupied night, calculated as total nightly revenue divided by nights booked. Compare this to local hotel rates and similar short-term rentals to ensure competitive pricing.",
    occupancy:
      "Occupancy Rate shows the percentage of nights your property is booked per year. Market averages vary by location: urban areas typically see 60-75%, vacation destinations 50-70%. Higher rates indicate strong demand.",
  }

  const toggleHelp = (field: string) => {
    setExpandedHelp(expandedHelp === field ? null : field)
  }

  return (
    <Card className="transition-all duration-300 ease-in-out">
      <CardHeader className="pb-4 sm:pb-5">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3 text-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Revenue & Performance</span>
          </div>
          <Badge
            variant="outline"
            className="transition-all duration-300 ease-in-out text-sm self-start sm:self-center"
          >
            {formatCurrency(showYearly ? calculations.grossMonthlyRevenue * 12 : calculations.grossMonthlyRevenue)}/
            {showYearly ? "year" : "month"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-3 transition-all duration-300 ease-in-out">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <span className="text-sm font-medium flex items-center gap-2.5 min-w-0 flex-1">
                <span className="truncate">Gross Revenue</span>
                <button
                  type="button"
                  onClick={() => toggleHelp("grossRevenue")}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -m-1"
                  aria-label="Toggle Gross Revenue information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-lg sm:text-xl font-bold transition-all duration-300 ease-in-out flex-shrink-0 ${getValueColor(
                  showYearly ? calculations.grossMonthlyRevenue * 12 : calculations.grossMonthlyRevenue,
                  "revenue",
                )}`}
              >
                {formatCurrency(showYearly ? calculations.grossMonthlyRevenue * 12 : calculations.grossMonthlyRevenue)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Total rental income before expenses</div>
            {expandedHelp === "grossRevenue" && (
              <div className="bg-muted/50 rounded-lg p-4 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Gross Revenue Info:</strong> {tooltipContent.grossRevenue}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 transition-all duration-300 ease-in-out">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <span className="text-sm font-medium flex items-center gap-2.5 min-w-0 flex-1">
                <span className="truncate">Net Cash Flow</span>
                <button
                  type="button"
                  onClick={() => toggleHelp("netCashFlow")}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -m-1"
                  aria-label="Toggle Net Cash Flow information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-lg sm:text-xl font-bold transition-all duration-300 ease-in-out flex-shrink-0 ${getValueColor(
                  showYearly ? calculations.annualNetIncome : calculations.netMonthlyIncome,
                  "profit",
                )}`}
              >
                {formatCurrency(showYearly ? calculations.annualNetIncome : calculations.netMonthlyIncome)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Profit after all expenses</div>
            {expandedHelp === "netCashFlow" && (
              <div className="bg-muted/50 rounded-lg p-4 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Net Cash Flow Info:</strong> {tooltipContent.netCashFlow}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 transition-all duration-300 ease-in-out">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <span className="text-sm font-medium flex items-center gap-2.5 min-w-0 flex-1">
                <span className="truncate">Average Daily Rate</span>
                <button
                  type="button"
                  onClick={() => toggleHelp("adr")}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -m-1"
                  aria-label="Toggle Average Daily Rate information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-lg sm:text-xl font-bold transition-all duration-300 ease-in-out flex-shrink-0 ${getValueColor(calculations.adr, "revenue")}`}
              >
                {formatCurrency(calculations.adr)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground transition-all duration-300 ease-in-out">
              Revenue per occupied night
            </div>
            {expandedHelp === "adr" && (
              <div className="bg-muted/50 rounded-lg p-4 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Average Daily Rate Info:</strong> {tooltipContent.adr}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 transition-all duration-300 ease-in-out">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <span className="text-sm font-medium flex items-center gap-2.5 min-w-0 flex-1">
                <span className="truncate">Occupancy Rate</span>
                <button
                  type="button"
                  onClick={() => toggleHelp("occupancy")}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -m-1"
                  aria-label="Toggle Occupancy Rate information"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </span>
              <span
                className={`text-lg sm:text-xl font-bold transition-all duration-300 ease-in-out flex-shrink-0 ${getValueColor(calculations.occupancyRate, "rate")}`}
              >
                {formatPercent(calculations.occupancyRate)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground transition-all duration-300 ease-in-out">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span>
                  {showYearly
                    ? `${Math.round((365 * calculations.occupancyRate) / 100)} nights/year`
                    : `${Math.round((30 * calculations.occupancyRate) / 100)} nights/month`}
                </span>
                <span className="hidden sm:inline">•</span>
                <span>
                  {showYearly
                    ? `${(calculations.bookingsPerMonth * 12).toFixed(0)} bookings/year`
                    : `${calculations.bookingsPerMonth} bookings/month`}
                </span>
              </div>
            </div>
            {expandedHelp === "occupancy" && (
              <div className="bg-muted/50 rounded-lg p-4 border border-dashed animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
                  <strong>Occupancy Rate Info:</strong> {tooltipContent.occupancy}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
