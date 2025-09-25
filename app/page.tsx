"use client"

import { useState, useEffect } from "react"
import { RevenueSection } from "@/components/calculator/revenue-section"
import { CostsSection } from "@/components/calculator/costs-section"
import { StartupSection } from "@/components/calculator/startup-section"
import { Home } from "@/components/simple-icons"
import { TaxBenefitsSection } from "@/components/calculator/tax-benefits-section"
import { RevenuePerformanceOutput } from "@/components/calculator/revenue-performance-output"
import { ExpenseSummaryOutput } from "@/components/calculator/expense-summary-output"
import { InvestmentPerformanceOutput } from "@/components/calculator/investment-performance-output"
import { TaxBenefitsOutput } from "@/components/calculator/tax-benefits-output"
import { Footer } from "@/components/footer"

interface CalculatorData {
  // Revenue data
  averageNightlyRate: number
  occupancyRate: number
  cleaningFee: number

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

  // Startup data
  purchasePrice: number
  downPayment: number
  closingCosts: number // Added closing costs field
  interestRate: number // Added interest rate
  renovation: number
  furnishing: number

  annualIncome: number
  federalTaxRate: number
  spouseHours: number
  materialParticipation: boolean
  loanTerm: number
}

export default function STRCalculator() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["revenue"]))
  const [isDark, setIsDark] = useState(true)
  const [showYearly, setShowYearly] = useState(false)
  const [hideInputs, setHideInputs] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const [data, setData] = useState<CalculatorData>({
    // Revenue defaults
    averageNightlyRate: 200, // Updated default nightly rate from 150 to 200
    occupancyRate: 65,
    cleaningFee: 125, // Updated cleaning fee from $75 to $125 for more accurate market rate

    managementFee: 0,
    platformFees: 3, // Default 3% for Airbnb host fee
    lodgingTax: 2400,
    propertyTax: 4800,
    cleaningFees: 125, // Now represents cleaning fee per stay, not annual cost
    maintenance: 0, // Set maintenance cost to $0
    insurance: 2400,
    utilities: 0,
    hoaFees: 0,
    other: 0,

    // Startup defaults
    purchasePrice: 300000, // Set purchase price to $300,000
    downPayment: 60000, // Set down payment to $60,000
    closingCosts: 15000, // Set closing costs to $15,000
    interestRate: 6.5, // Updated interest rate from 7.5% to 6.5%
    renovation: 0, // Updated renovation from 50000 to 0
    furnishing: 0, // Updated furnishing from 50000 to 0

    annualIncome: 400000, // $400k annual income
    federalTaxRate: 37, // 37% tax bracket for $400k income
    spouseHours: 500, // Default to 500 hours for material participation
    materialParticipation: true, // Default to qualifying for material participation

    loanTerm: 30, // Default 30-year loan term
  })

  const updateData = (field: string, value: number | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSectionToggle = (section: string) => {
    setOpenSections((prev) => {
      const newSections = new Set(prev)
      if (newSections.has(section)) {
        // If closing a section, close all sections
        return new Set()
      } else {
        return new Set([section])
      }
    })
  }

  const calculateResults = () => {
    const daysInMonth = 30
    const nightsBooked = Math.round((daysInMonth * data.occupancyRate) / 100)

    const bookingsPerMonth = Math.round(nightsBooked / 2) // Minimum 2 nights per booking
    const averageStayLength = 2 // Minimum stay requirement

    // Revenue calculations
    const nightlyRevenue = nightsBooked * data.averageNightlyRate
    const cleaningFeeRevenue = bookingsPerMonth * data.cleaningFees
    const grossMonthlyRevenue = nightlyRevenue + cleaningFeeRevenue

    const monthlyPlatformFees = (grossMonthlyRevenue * data.platformFees) / 100
    const monthlyRevenue = grossMonthlyRevenue - monthlyPlatformFees

    const annualRevenue = monthlyRevenue * 12
    const managementFeeAmount = (annualRevenue * data.managementFee) / 100
    const annualUtilities = data.utilities * 12

    const actualCleaningCosts = bookingsPerMonth * 12 * (data.cleaningFees * 0.6) // Assume cleaning costs are 60% of cleaning fee charged

    const totalAnnualOperatingCosts =
      managementFeeAmount +
      data.lodgingTax +
      data.propertyTax +
      actualCleaningCosts + // Using calculated cleaning costs based on occupancy
      data.maintenance +
      data.insurance +
      annualUtilities +
      data.hoaFees +
      data.other +
      monthlyPlatformFees * 12

    const loanAmount = data.purchasePrice - data.downPayment
    const monthlyInterestRate = data.interestRate / 100 / 12
    const numberOfPayments = data.loanTerm * 12 // Use selected loan term
    const monthlyMortgagePayment =
      loanAmount > 0 && monthlyInterestRate > 0
        ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        : 0

    const monthlyExpenses = totalAnnualOperatingCosts / 12 + monthlyMortgagePayment
    const netMonthlyIncome = monthlyRevenue - monthlyExpenses

    // Annual calculations
    const annualExpenses = totalAnnualOperatingCosts + monthlyMortgagePayment * 12
    const annualNetIncome = netMonthlyIncome * 12

    // Startup costs
    const totalStartupCosts = data.downPayment + data.closingCosts + data.renovation + data.furnishing // Use actual closing costs instead of calculated

    const breakEvenMonths = netMonthlyIncome > 0 ? totalStartupCosts / netMonthlyIncome : -1
    const roi = totalStartupCosts > 0 ? (annualNetIncome / totalStartupCosts) * 100 : 0
    const profitMargin = monthlyRevenue > 0 ? (netMonthlyIncome / monthlyRevenue) * 100 : 0

    // Calculate Average Daily Rate (ADR)
    const adr = nightsBooked > 0 ? nightlyRevenue / nightsBooked : 0

    // Calculate Net Operating Income (NOI) - before debt service
    const noi = annualRevenue - totalAnnualOperatingCosts

    // Calculate Capitalization Rate (Cap Rate) - NOI / Property Value
    const capRate = data.purchasePrice > 0 ? (noi / data.purchasePrice) * 100 : 0

    // Calculate Cash-on-Cash Return - Annual cash flow / Cash invested
    const cashOnCashReturn = totalStartupCosts > 0 ? (annualNetIncome / totalStartupCosts) * 100 : 0

    // Calculate tax benefits for high earners with STR investments
    const totalDepreciableAssets = data.renovation + data.furnishing
    const propertyDepreciation = data.purchasePrice / 27.5 // Residential rental depreciation over 27.5 years

    // 100% bonus depreciation on qualifying assets (Trump's One Big Beautiful Bill 2025)
    const bonusDepreciation = totalDepreciableAssets // 100% first-year depreciation on renovations/furnishing

    // Calculate total annual depreciation
    const totalAnnualDepreciation = propertyDepreciation + bonusDepreciation

    // Calculate rental losses that can offset other income (if material participation qualifies)
    // Using the new calculation: $340,000 loss ($300,000 × 80% + $50,000 + $50,000)
    const propertyLoss = data.purchasePrice * 0.8 // 80% of property value
    const totalLoss = propertyLoss + data.renovation + data.furnishing // $340,000 total loss
    const totalTaxDeductions = totalLoss

    // QBI Deduction (20% of qualified business income, permanent under Trump's bill)
    const grossSTRIncome = annualRevenue // Use calculated annual revenue
    const operatingExpenses = totalAnnualOperatingCosts // Use calculated operating costs
    const propertyTaxes = data.propertyTax // Use existing property tax field

    const netSTRIncome = grossSTRIncome - operatingExpenses // Using calculated values
    const qbiEligibleIncome = Math.max(0, netSTRIncome) // Only positive income qualifies
    const qbiDeduction = data.materialParticipation ? qbiEligibleIncome * 0.2 : 0 // 20% of net income

    // Calculate tax savings
    // Bonus depreciation savings: $340,000 × 37% = $125,800
    const depreciationTaxSavings = totalTaxDeductions * (data.federalTaxRate / 100)
    // QBI tax savings: calculated from net STR income
    const qbiTaxSavings = qbiDeduction * (data.federalTaxRate / 100)
    const totalAnnualTaxSavings = depreciationTaxSavings + qbiTaxSavings

    const effectiveTaxReduction =
      data.annualIncome > 0 ? (totalAnnualTaxSavings / (data.annualIncome * (data.federalTaxRate / 100))) * 100 : 0

    return {
      grossMonthlyRevenue,
      monthlyRevenue,
      monthlyExpenses,
      netMonthlyIncome,
      annualRevenue,
      annualExpenses,
      annualNetIncome,
      totalStartupCosts,
      breakEvenMonths,
      roi,
      profitMargin,
      occupancyRate: data.occupancyRate,
      adr,
      noi,
      capRate,
      cashOnCashReturn,
      nightsBooked,
      bookingsPerMonth,
      averageStayLength, // Added average stay length to results
      monthlyMortgagePayment,
      monthlyPlatformFees,
      taxBenefits: {
        totalAnnualTaxSavings,
        depreciationTaxSavings,
        qbiTaxSavings,
        totalAnnualDepreciation,
        bonusDepreciation,
        qbiDeduction,
        effectiveTaxReduction,
        materialParticipation: data.materialParticipation,
        spouseHours: data.spouseHours,
      },
      expenseBreakdown: {
        managementFee: managementFeeAmount / 12,
        platformFees: monthlyPlatformFees,
        lodgingTax: data.lodgingTax / 12,
        propertyTax: data.propertyTax / 12,
        cleaningFees: actualCleaningCosts / 12, // Using calculated cleaning costs
        maintenance: data.maintenance / 12,
        insurance: data.insurance / 12,
        utilities: data.utilities,
        hoaFees: data.hoaFees / 12,
        other: data.other / 12,
        mortgage: monthlyMortgagePayment,
      },
    }
  }

  const calculations = calculateResults()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-600 flex-shrink-0">
                <Home className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-bold text-balance truncate">
                  <span className="sm:hidden">STR Calculator</span>
                  <span className="hidden sm:inline">Short Term Rental Calculator</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* View controls first - affects primary data display */}
                <div className="relative inline-flex h-8 sm:h-9 items-center rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all duration-200 ease-in-out hover:bg-background/80">
                  <button
                    onClick={() => setShowYearly(false)}
                    className={`relative inline-flex h-6 sm:h-7 px-3 sm:px-4 items-center justify-center text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ease-in-out ${
                      !showYearly
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setShowYearly(true)}
                    className={`relative inline-flex h-6 sm:h-7 px-3 sm:px-4 items-center justify-center text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ease-in-out ${
                      showYearly
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Year
                  </button>
                </div>

                {/* Layout controls second - affects interface layout */}
                <button
                  onClick={() => setHideInputs(!hideInputs)}
                  className={`relative inline-flex h-8 sm:h-9 px-3 sm:px-4 items-center justify-center text-xs sm:text-sm font-medium rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
                    hideInputs
                      ? "text-primary-foreground bg-primary border-primary"
                      : "text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary"
                  }`}
                >
                  <span className="sm:hidden">{hideInputs ? "Show" : "Hide"}</span>
                  <span className="hidden sm:inline">{hideInputs ? "Show Inputs" : "Hide Inputs"}</span>
                </button>

                {/* Action buttons last - performs actions on data */}
                <button
                  onClick={() => {
                    // Placeholder for PDF export functionality
                    alert("PDF export functionality will be implemented soon!")
                  }}
                  className="relative inline-flex h-8 sm:h-9 px-3 sm:px-4 items-center justify-center text-xs sm:text-sm font-medium rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary"
                >
                  Export
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="relative inline-flex h-8 sm:h-9 w-14 sm:w-16 items-center justify-between px-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all duration-200 ease-in-out hover:bg-background/80 hover:scale-105 active:scale-95 focus:outline-none text-muted-foreground hover:text-foreground"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {/* Sun icon - left side */}
                  <svg
                    className={`h-4 sm:h-5 w-4 sm:w-5 transition-all duration-300 ease-in-out cursor-pointer ${
                      isDark
                        ? "opacity-40 text-gray-400 scale-90 hover:opacity-60 hover:text-yellow-400 hover:scale-95 active:scale-110"
                        : "opacity-100 text-yellow-500 scale-100 drop-shadow-sm hover:text-yellow-400 hover:scale-110 hover:drop-shadow-md active:scale-125 active:text-yellow-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* Moon icon - right side */}
                  <svg
                    className={`h-4 sm:h-5 w-4 sm:w-5 transition-all duration-300 ease-in-out cursor-pointer ${
                      isDark
                        ? "opacity-100 text-white scale-100 drop-shadow-sm hover:text-purple-400 hover:scale-110 hover:drop-shadow-md active:scale-125 active:text-purple-300"
                        : "opacity-40 text-gray-400 scale-90 hover:opacity-100 hover:text-purple-500 hover:scale-110 hover:drop-shadow-md active:scale-125 active:text-purple-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex-1">
        <div
          className={`grid gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10 ${hideInputs ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
        >
          {!hideInputs && (
            <div className="space-y-5 sm:space-y-6">
              <RevenueSection
                data={data}
                onChange={updateData}
                isOpen={openSections.has("revenue")}
                onToggle={() => handleSectionToggle("revenue")}
              />
              <CostsSection
                data={data}
                onChange={updateData}
                isOpen={openSections.has("costs")}
                onToggle={() => handleSectionToggle("costs")}
              />
              <StartupSection
                data={data}
                onChange={updateData}
                isOpen={openSections.has("startup")}
                onToggle={() => handleSectionToggle("startup")}
              />
              <TaxBenefitsSection
                data={data}
                onChange={updateData}
                isOpen={openSections.has("taxBenefits")}
                onToggle={() => handleSectionToggle("taxBenefits")}
              />
            </div>
          )}
          <div className="space-y-5 sm:space-y-6">
            <RevenuePerformanceOutput calculations={calculations} showYearly={showYearly} />
            <ExpenseSummaryOutput calculations={calculations} showYearly={showYearly} />
            <InvestmentPerformanceOutput calculations={calculations} showYearly={showYearly} />
            <TaxBenefitsOutput calculations={calculations} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
