"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, HelpCircle } from "lucide-react"
import { useState } from "react"

interface RevenuePerformanceOutputProps {
  results: {
    nightsBooked: number
    bookingsPerMonth: number
    monthlyRevenue: number
    annualRevenue: number
    grossMonthlyRevenue: number
    cleaningFeeRevenue: number
    monthlyPlatformFees: number
  }
  showYearly: boolean
  onToggleView: () => void
}

export function RevenuePerformanceOutput({ results, showYearly, onToggleView }: RevenuePerformanceOutputProps) {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue & Performance
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {formatCurrency(showYearly ? results.annualRevenue : results.monthlyRevenue)}/
              {showYearly ? "year" : "month"}
            </Badge>
            <Button variant="outline" size="sm" onClick={onToggleView}>
              {showYearly ? "Monthly" : "Yearly"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Gross Revenue</span>
            <button
              onClick={() => toggleHelp("grossRevenue")}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -m-1"
              aria-label="Toggle Gross Revenue information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <span className={`text-sm font-medium ${getValueColor(results.grossMonthlyRevenue, "revenue")}`}>
            {formatCurrency(showYearly ? results.grossMonthlyRevenue * 12 : results.grossMonthlyRevenue)}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">Total rental income before expenses</div>

        {expandedHelp === "grossRevenue" && (
          <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
            <strong>Gross Revenue Info:</strong> {tooltipContent.grossRevenue}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Net Revenue</span>
            <button
              onClick={() => toggleHelp("netCashFlow")}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -m-1"
              aria-label="Toggle Net Cash Flow information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <span className={`text-sm font-medium ${getValueColor(results.monthlyRevenue, "profit")}`}>
            {formatCurrency(showYearly ? results.annualRevenue : results.monthlyRevenue)}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">Revenue after platform fees</div>

        {expandedHelp === "netCashFlow" && (
          <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
            <strong>Net Revenue Info:</strong> {tooltipContent.netCashFlow}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Nights Booked</span>
            </div>
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              {showYearly ? Math.round(results.nightsBooked * 12) : results.nightsBooked}
            </div>
            <div className="text-xs text-muted-foreground">{showYearly ? "nights/year" : "nights/month"}</div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Bookings</span>
            </div>
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              {showYearly ? Math.round(results.bookingsPerMonth * 12) : results.bookingsPerMonth}
            </div>
            <div className="text-xs text-muted-foreground">{showYearly ? "bookings/year" : "bookings/month"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
