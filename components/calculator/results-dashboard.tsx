"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, HelpCircle, Home, Calculator, Receipt } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ResultsDashboardProps {
  calculations: {
    grossMonthlyRevenue: number // Added gross revenue
    monthlyRevenue: number
    monthlyExpenses: number
    netMonthlyIncome: number
    annualRevenue: number
    annualExpenses: number
    annualNetIncome: number
    totalStartupCosts: number
    breakEvenMonths: number
    roi: number
    profitMargin: number
    occupancyRate: number
    adr: number
    noi: number
    capRate: number
    cashOnCashReturn: number
    nightsBooked: number
    bookingsPerMonth: number
    monthlyMortgagePayment: number // Added mortgage payment
    monthlyPlatformFees: number // Added platform fees
    taxBenefits: {
      totalAnnualTaxSavings: number
      depreciationTaxSavings: number
      qbiTaxSavings: number
      totalAnnualDepreciation: number
      bonusDepreciation: number
      qbiDeduction: number
      effectiveTaxReduction: number
      materialParticipation: boolean
      spouseHours: number
    }
    expenseBreakdown: {
      managementFee: number
      platformFees: number // Added platform fees
      lodgingTax: number
      propertyTax: number
      cleaningFees: number
      maintenance: number
      insurance: number
      utilities: number
      hoaFees: number
      other: number
      mortgage: number // Added mortgage
    }
  }
}

export function ResultsDashboard({ calculations }: ResultsDashboardProps) {
  const [showYearly, setShowYearly] = useState(false)

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

  const getValueColor = (value: number, type: "revenue" | "expense" | "profit" | "rate" | "timeline") => {
    switch (type) {
      case "revenue":
        if (value >= 5000) return "text-green-600 dark:text-green-400"
        if (value >= 3000) return "text-green-600 dark:text-green-400"
        if (value >= 1000) return "text-green-600 dark:text-green-400"
        return "text-green-600 dark:text-green-400"

      case "expense":
        if (value >= 3000) return "text-red-600 dark:text-red-400"
        if (value >= 2000) return "text-red-600 dark:text-red-400"
        if (value >= 1000) return "text-red-600 dark:text-red-400"
        return "text-red-600 dark:text-red-400"

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

  const getProfitabilityColor = (netIncome: number) => {
    return getValueColor(netIncome, "profit")
  }

  const getProfitabilityIcon = (netIncome: number) => {
    if (netIncome > 0) return <TrendingUp className="h-4 w-4" />
    if (netIncome < 0) return <TrendingDown className="h-4 w-4" />
    return <DollarSign className="h-4 w-4" />
  }

  const tooltipContent = {
    capRate:
      "Capitalization Rate measures the return on investment based on the property's net operating income divided by property value. Above 8% is excellent, 6-8% is good, 4-6% is fair, below 4% may indicate overpriced property or low rental income.",
    adr: "Average Daily Rate is your revenue per occupied night, calculated as total nightly revenue divided by nights booked. Compare this to local hotel rates and similar short-term rentals to ensure competitive pricing.",
    cashOnCash:
      "Cash-on-Cash Return measures your annual pre-tax cash flow relative to the total cash invested (down payment + closing costs + renovations + furnishing). This shows your actual return on the money you put down, not including appreciation.",
    breakEven:
      "Break-even timeline shows how many months until your cumulative cash flow turns positive. This includes recovering your initial investment and reaching monthly profitability. Shorter timelines indicate better cash flow.",
    noi: "Net Operating Income is your annual rental income minus all operating expenses (excluding mortgage payments and depreciation). This is the key metric used to calculate Cap Rate and evaluate property performance.",
    occupancy:
      "Occupancy Rate shows the percentage of nights your property is booked per year. Market averages vary by location: urban areas typically see 60-75%, vacation destinations 50-70%. Higher rates indicate strong demand.",
    grossRevenue:
      "Gross Revenue is your total rental income before any expenses, calculated as nightly rate × occupancy rate × cleaning fees. This represents your maximum earning potential.",
    netCashFlow:
      "Net Cash Flow is your monthly profit after all expenses including mortgage, taxes, fees, and operating costs. Positive cash flow means the property pays for itself and generates income.",
    monthlyRevenue:
      "Monthly Revenue is your net rental income after platform fees and taxes, but before operating expenses. This is the actual money you receive from bookings each month.",
    monthlyExpenses:
      "Monthly Expenses include all costs to operate the property: mortgage, insurance, taxes, maintenance, utilities, management fees, and variable costs like cleaning that scale with bookings.",
    taxSavings:
      "Annual tax savings from STR ownership including 100% bonus depreciation on renovations/furnishing (Trump's 2025 tax reforms), property depreciation, and 20% QBI deduction for qualifying business income. High earners see substantial benefits.",
    bonusDepreciation:
      "Under Trump's 'One Big Beautiful Bill' (2025), you can immediately deduct 100% of qualifying property improvements like renovations and furnishing in the first year, creating significant tax savings for high earners.",
    qbiDeduction:
      "Qualified Business Income deduction allows 20% deduction on STR profits (now permanent under 2025 tax reforms). Combined with material participation status, this provides substantial tax benefits for high-income earners.",
    materialParticipation:
      "Material participation allows STR losses to offset other income. Requires 500+ hours annually OR 100+ hours with no one else participating more. Spouse hours count toward your total participation time.",
  }

  return (
    <div className="space-y-6 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-center space-x-2">
        <Label htmlFor="period-toggle" className="text-sm font-medium">
          Monthly
        </Label>
        <Switch id="period-toggle" checked={showYearly} onCheckedChange={setShowYearly} />
        <Label htmlFor="period-toggle" className="text-sm font-medium">
          Yearly
        </Label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="transition-all duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue & Performance
              <Badge variant="outline" className="transition-all duration-300 ease-in-out">
                {formatCurrency(showYearly ? calculations.grossMonthlyRevenue * 12 : calculations.grossMonthlyRevenue)}/
                {showYearly ? "year" : "month"}
              </Badge>
            </CardTitle>
            <CardDescription>{showYearly ? "Annual" : "Monthly"} income performance and key metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Gross Revenue
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about gross revenue"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Gross Revenue</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.grossRevenue}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                      showYearly ? calculations.grossMonthlyRevenue * 12 : calculations.grossMonthlyRevenue,
                      "revenue",
                    )}`}
                  >
                    {formatCurrency(
                      showYearly ? calculations.grossMonthlyRevenue * 12 : calculations.grossMonthlyRevenue,
                    )}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Total rental income before expenses</div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Net Cash Flow
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about net cash flow"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Net Cash Flow</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.netCashFlow}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getProfitabilityColor(
                      showYearly ? calculations.annualNetIncome : calculations.netMonthlyIncome,
                    )}`}
                  >
                    {formatCurrency(showYearly ? calculations.annualNetIncome : calculations.netMonthlyIncome)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Profit after all expenses</div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Average Daily Rate
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about average daily rate"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Average Daily Rate (ADR)</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.adr}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.adr, "revenue")}`}
                  >
                    {formatCurrency(calculations.adr)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground transition-all duration-300 ease-in-out">
                  Revenue per occupied night
                </div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Occupancy Rate
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about occupancy rate"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Occupancy Rate</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.occupancy}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.occupancyRate, "rate")}`}
                  >
                    {formatPercent(calculations.occupancyRate)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground transition-all duration-300 ease-in-out">
                  {showYearly
                    ? `${Math.round((365 * calculations.occupancyRate) / 100)} nights/year • ${(calculations.bookingsPerMonth * 12).toFixed(0)} bookings/year`
                    : `${Math.round((30 * calculations.occupancyRate) / 100)} nights/month • ${calculations.bookingsPerMonth} bookings/month`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600" />
              Investment Performance Metrics
              <Badge variant="outline" className="transition-all duration-300 ease-in-out">
                {formatPercent(calculations.capRate)} Cap Rate
              </Badge>
            </CardTitle>
            <CardDescription>Key financial indicators for your short-term rental investment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Cap Rate
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about cap rate"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Capitalization Rate</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.capRate}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.capRate, "rate")}`}
                  >
                    {formatPercent(calculations.capRate)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">NOI ÷ Property Value</div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Cash-on-Cash Return
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about cash-on-cash return"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Cash-on-Cash Return</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.cashOnCash}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.cashOnCashReturn, "rate")}`}
                  >
                    {formatPercent(calculations.cashOnCashReturn)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Annual return on invested capital</div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Total Investment
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about total investment"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Total Investment</h4>
                          <p className="text-sm text-muted-foreground">
                            Total upfront cash required including down payment, closing costs, renovations, and
                            furnishing. This is the amount used to calculate your Cash-on-Cash Return.
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(calculations.totalStartupCosts, "expense")}`}
                  >
                    {formatCurrency(calculations.totalStartupCosts)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Initial capital required</div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Break-Even Timeline
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about break-even timeline"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Break-Even Timeline</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.breakEven}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="transition-all duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="h-5 w-5 text-red-600" />
              Expense Summary
              <Badge variant="outline" className="transition-all duration-300 ease-in-out">
                {formatCurrency(showYearly ? calculations.monthlyExpenses * 12 : calculations.monthlyExpenses)}/
                {showYearly ? "year" : "month"}
              </Badge>
            </CardTitle>
            <CardDescription>
              {showYearly ? "Annual" : "Monthly"} operating costs and financing breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              {calculations.expenseBreakdown.mortgage > 0 && (
                <div className="space-y-1 transition-all duration-300 ease-in-out">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Mortgage Payment</span>
                    <span
                      className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                        showYearly
                          ? calculations.expenseBreakdown.mortgage * 12
                          : calculations.expenseBreakdown.mortgage,
                        "expense",
                      )}`}
                    >
                      {formatCurrency(
                        showYearly
                          ? calculations.expenseBreakdown.mortgage * 12
                          : calculations.expenseBreakdown.mortgage,
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground transition-all duration-300 ease-in-out">
                    {((calculations.expenseBreakdown.mortgage / calculations.monthlyExpenses) * 100).toFixed(0)}% of
                    total expenses
                  </div>
                </div>
              )}

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Platform Fees</span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                      showYearly
                        ? calculations.expenseBreakdown.platformFees * 12
                        : calculations.expenseBreakdown.platformFees,
                      "expense",
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
                  {((calculations.expenseBreakdown.platformFees / calculations.monthlyExpenses) * 100).toFixed(0)}% of
                  total expenses
                </div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cleaning Costs</span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                      showYearly
                        ? calculations.expenseBreakdown.cleaningFees * 12
                        : calculations.expenseBreakdown.cleaningFees,
                      "expense",
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
                  {((calculations.expenseBreakdown.cleaningFees / calculations.monthlyExpenses) * 100).toFixed(0)}% of
                  total • Scales with occupancy
                </div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Expenses</span>
                  <span
                    className={`text-xl font-bold transition-all duration-300 ease-in-out ${getValueColor(
                      showYearly ? calculations.annualExpenses : calculations.monthlyExpenses,
                      "expense",
                    )}`}
                  >
                    {formatCurrency(showYearly ? calculations.annualExpenses : calculations.monthlyExpenses)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">All operating and financing costs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-purple-600" />
              Tax Benefits & Savings
              <Badge
                variant="outline"
                className="transition-all duration-300 ease-in-out bg-green-50 text-green-700 border-green-200"
              >
                {formatCurrency(calculations.taxBenefits.totalAnnualTaxSavings)}/year
              </Badge>
            </CardTitle>
            <CardDescription>Annual tax savings from STR ownership under 2025 federal tax laws</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Total Tax Savings
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about tax savings"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Total Tax Savings</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.taxSavings}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(calculations.taxBenefits.totalAnnualTaxSavings)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {calculations.taxBenefits.effectiveTaxReduction.toFixed(1)}% effective tax rate reduction
                </div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Bonus Depreciation
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about bonus depreciation"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">100% Bonus Depreciation</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.bonusDepreciation}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
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
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    QBI Deduction Savings
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about QBI deduction"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">QBI Deduction (20%)</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.qbiDeduction}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                  <span className={`text-xl font-bold text-green-600 dark:text-green-400`}>
                    {formatCurrency(calculations.taxBenefits.qbiTaxSavings)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  20% deduction on {formatCurrency(calculations.taxBenefits.qbiDeduction)} business income
                </div>
              </div>

              <div className="space-y-1 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    Material Participation
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-100 focus:bg-muted active:bg-muted cursor-pointer"
                          aria-label="More information about material participation"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-100" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" side="top" align="center">
                        <div className="space-y-2">
                          <h4 className="font-medium">Material Participation Status</h4>
                          <p className="text-sm text-muted-foreground">{tooltipContent.materialParticipation}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
