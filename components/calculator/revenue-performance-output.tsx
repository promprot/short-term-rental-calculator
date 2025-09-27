"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, HelpCircle, DollarSign, Calendar, Target, BarChart3 } from "lucide-react"
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
    monthlyNetOperatingIncome: number
    annualNetOperatingIncome: number
    monthlyCashFlow: number
    annualCashFlow: number
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

  const getRevenueColor = (value: number, type: "gross" | "net") => {
    const monthlyValue = type === "gross" ? value : value
    if (monthlyValue >= 8000) return "text-emerald-600" // Excellent revenue - green
    if (monthlyValue >= 5000) return "text-emerald-500" // Good revenue - lighter green
    if (monthlyValue >= 3000) return "text-yellow-600" // Fair revenue - yellow
    if (monthlyValue >= 1000) return "text-orange-500" // Poor revenue - orange
    return "text-red-500" // Very poor - red
  }

  const getRevenueBadge = (value: number, type: "gross" | "net") => {
    const monthlyValue = type === "gross" ? value : value
    if (monthlyValue >= 8000) return { label: "Excellent", className: "bg-emerald-100 text-emerald-700" }
    if (monthlyValue >= 5000) return { label: "Very Good", className: "bg-emerald-50 text-emerald-600" }
    if (monthlyValue >= 3000) return { label: "Good", className: "bg-yellow-100 text-yellow-700" }
    if (monthlyValue >= 1000) return { label: "Fair", className: "bg-orange-100 text-orange-700" }
    return { label: "Poor", className: "bg-red-100 text-red-700" }
  }

  const getOccupancyColor = (nights: number) => {
    if (nights >= 25) return "text-emerald-600" // Excellent occupancy
    if (nights >= 20) return "text-emerald-500" // Good occupancy
    if (nights >= 15) return "text-yellow-600" // Fair occupancy
    if (nights >= 10) return "text-orange-500" // Poor occupancy
    return "text-red-500" // Very poor occupancy
  }

  const tooltipContent = {
    grossRevenue:
      "Gross Revenue is your total rental income before any expenses, calculated as nightly rate × occupancy rate × cleaning fees. This represents your maximum earning potential.",
    netRevenue:
      "Net Revenue (NOI) is your Net Operating Income after ALL operating expenses including platform fees, cleaning costs, maintenance, insurance, taxes, utilities, and management fees, but BEFORE mortgage payments. This is the true profitability of your rental property operations.",
  }

  const toggleHelp = (field: string) => {
    setExpandedHelp(expandedHelp === field ? null : field)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-semibold">Revenue</span>
          </div>
          <Button variant="outline" size="sm" onClick={onToggleView} className="shrink-0 bg-transparent">
            {showYearly ? "Monthly" : "Yearly"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Gross Revenue</span>
                <button
                  onClick={() => toggleHelp("grossRevenue")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Gross Revenue information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
              <Badge className={getRevenueBadge(results.grossMonthlyRevenue, "gross").className}>
                {getRevenueBadge(results.grossMonthlyRevenue, "gross").label}
              </Badge>
            </div>
            <div className={`text-2xl font-bold ${getRevenueColor(results.grossMonthlyRevenue, "gross")}`}>
              {formatCurrency(showYearly ? results.grossMonthlyRevenue * 12 : results.grossMonthlyRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Total rental income before expenses</p>

            {expandedHelp === "grossRevenue" && (
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
                <strong>Gross Revenue:</strong> {tooltipContent.grossRevenue}
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Net Revenue (NOI)</span>
                <button
                  onClick={() => toggleHelp("netRevenue")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle Net Revenue information"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </div>
              <Badge className={getRevenueBadge(results.monthlyNetOperatingIncome, "net").className}>
                {getRevenueBadge(results.monthlyNetOperatingIncome, "net").label}
              </Badge>
            </div>
            <div className={`text-2xl font-bold ${getRevenueColor(results.monthlyNetOperatingIncome, "net")}`}>
              {formatCurrency(showYearly ? results.annualNetOperatingIncome : results.monthlyNetOperatingIncome)}
            </div>
            <p className="text-xs text-muted-foreground">Revenue after all operating expenses</p>

            {expandedHelp === "netRevenue" && (
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
                <strong>Net Revenue:</strong> {tooltipContent.netRevenue}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className={`h-4 w-4 ${getOccupancyColor(results.nightsBooked)}`} />
                <span className="text-sm font-medium">Nights Booked</span>
              </div>
              <div className={`text-2xl font-bold ${getOccupancyColor(results.nightsBooked)}`}>
                {showYearly ? Math.round(results.nightsBooked * 12) : results.nightsBooked}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {showYearly ? "nights/year" : "nights/month"}
                </Badge>
                <Badge
                  className={`text-xs ${getOccupancyColor(results.nightsBooked) === "text-emerald-600" ? "bg-emerald-100 text-emerald-700" : getOccupancyColor(results.nightsBooked) === "text-emerald-500" ? "bg-emerald-50 text-emerald-600" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {((results.nightsBooked / 30) * 100).toFixed(0)}% occupancy
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium">Bookings</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">
                {showYearly ? Math.round(results.bookingsPerMonth * 12) : results.bookingsPerMonth}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {showYearly ? "bookings/year" : "bookings/month"}
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                  {(results.nightsBooked / results.bookingsPerMonth).toFixed(1)} nights/booking
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
