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
    const cleaningFeeRevenue = bookingsPerMonth * data.cleaningFee
    const grossMonthlyRevenue = nightlyRevenue + cleaningFeeRevenue
    const monthlyPlatformFees = (grossMonthlyRevenue * data.platformFees) / 100
    const monthlyRevenue = grossMonthlyRevenue - monthlyPlatformFees
    const annualRevenue = monthlyRevenue * 12

    const managementFeeAmount = (annualRevenue * data.managementFee) / 100
    const annualUtilities = data.utilities * 12
    const actualCleaningCosts = bookingsPerMonth * 12 * 75 // Assume $75 actual cost per cleaning

    const totalAnnualOperatingCosts =
      managementFeeAmount +
      data.lodgingTax +
      data.propertyTax +
      actualCleaningCosts +
      data.maintenance +
      data.insurance +
      annualUtilities +
      data.hoaFees +
      data.other +
      monthlyPlatformFees * 12

    const loanAmount = data.purchasePrice - data.downPayment
    const monthlyInterestRate = data.interestRate / 100 / 12
    const numberOfPayments = data.loanTerm * 12

    const monthlyMortgagePayment =
      loanAmount > 0 && monthlyInterestRate > 0
        ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        : 0

    const annualMortgagePayments = monthlyMortgagePayment * 12
    const netOperatingIncome = annualRevenue - totalAnnualOperatingCosts
    const annualCashFlow = netOperatingIncome - annualMortgagePayments

    // Investment metrics
    const totalCashInvested = data.downPayment + data.closingCosts + data.renovation + data.furnishing
    const roi = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0
    const cashOnCashReturn = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0
    const capRate = data.purchasePrice > 0 ? (netOperatingIncome / data.purchasePrice) * 100 : 0

    const breakEvenMonths = annualCashFlow > 0 ? totalCashInvested / (annualCashFlow / 12) : Number.POSITIVE_INFINITY

    const depreciationBasis = data.purchasePrice * 0.8 // 80% of purchase price (excluding land)
    const annualDepreciation = depreciationBasis / 27.5 // 27.5-year schedule for residential rental

    // 100% bonus depreciation applies to personal property and qualified improvements only
    // This includes furniture, appliances, and certain renovations with MACRS life of 20 years or less
    const personalPropertyBasis = data.furnishing + data.renovation * 0.6 // Assume 60% of renovation qualifies
    const bonusDepreciation = personalPropertyBasis // 100% bonus depreciation under 2025 reforms
    const totalFirstYearDepreciation = annualDepreciation + bonusDepreciation

    // Material participation requires 500+ hours OR 100+ hours with no one else participating more
    const qualifiesForMaterialParticipation = data.materialParticipation && data.spouseHours >= 100

    // QBI calculation - only applies to positive business income with material participation
    const netBusinessIncome = netOperatingIncome - annualDepreciation // Business income after regular depreciation
    const qbiEligibleIncome = qualifiesForMaterialParticipation && netBusinessIncome > 0 ? netBusinessIncome : 0
    const qbiDeduction = qbiEligibleIncome * 0.2 // 20% QBI deduction (permanent under 2025 reforms)

    // Passive loss limitation calculation
    const totalTaxableIncome = netOperatingIncome - totalFirstYearDepreciation
    const passiveLossLimitation = qualifiesForMaterialParticipation
      ? 0 // No limitation with material participation
      : Math.max(0, -totalTaxableIncome) // Passive losses limited if no material participation

    // Calculate allowable deductions
    const allowableDepreciationDeduction = totalFirstYearDepreciation - passiveLossLimitation

    // Tax savings calculation
    const depreciationTaxSavings = allowableDepreciationDeduction * (data.federalTaxRate / 100)
    const qbiTaxSavings = qbiDeduction * (data.federalTaxRate / 100)
    const taxSavings = depreciationTaxSavings + qbiTaxSavings

    const taxableRentalIncome = Math.max(0, netOperatingIncome - allowableDepreciationDeduction)

    return {
      // Revenue metrics
      nightsBooked,
      bookingsPerMonth,
      monthlyRevenue,
      annualRevenue,
      grossMonthlyRevenue,
      cleaningFeeRevenue,
      monthlyPlatformFees,

      // Expense metrics
      totalAnnualOperatingCosts,
      managementFeeAmount,
      actualCleaningCosts,
      annualUtilities,
      monthlyMortgagePayment,
      annualMortgagePayments,

      // Performance metrics
      netOperatingIncome,
      annualCashFlow,
      roi,
      cashOnCashReturn,
      capRate,
      breakEvenMonths,
      totalCashInvested,

      // Tax benefits
      annualDepreciation,
      bonusDepreciation,
      totalFirstYearDepreciation,
      qbiDeduction,
      taxSavings,
      taxableRentalIncome,
      passiveLossLimitation,
    }
  }

  const results = calculateResults()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">Short Term Rental Calculator</h1>
                <p className="text-sm text-muted-foreground text-pretty">
                  Analyze your investment potential with comprehensive financial projections
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Sections */}
          <div className="space-y-6">
            <RevenueSection
              data={{
                averageNightlyRate: data.averageNightlyRate,
                occupancyRate: data.occupancyRate,
                cleaningFee: data.cleaningFee,
              }}
              onChange={updateData}
              isOpen={openSections.has("revenue")}
              onToggle={() => handleSectionToggle("revenue")}
            />

            <CostsSection
              data={{
                managementFee: data.managementFee,
                platformFees: data.platformFees,
                lodgingTax: data.lodgingTax,
                propertyTax: data.propertyTax,
                cleaningFees: data.cleaningFees,
                maintenance: data.maintenance,
                insurance: data.insurance,
                utilities: data.utilities,
                hoaFees: data.hoaFees,
                other: data.other,
              }}
              onChange={updateData}
              isOpen={openSections.has("costs")}
              onToggle={() => handleSectionToggle("costs")}
            />

            <StartupSection
              data={{
                purchasePrice: data.purchasePrice,
                downPayment: data.downPayment,
                closingCosts: data.closingCosts,
                interestRate: data.interestRate,
                renovation: data.renovation,
                furnishing: data.furnishing,
                loanTerm: data.loanTerm,
              }}
              onChange={updateData}
              isOpen={openSections.has("startup")}
              onToggle={() => handleSectionToggle("startup")}
            />

            <TaxBenefitsSection
              data={{
                annualIncome: data.annualIncome,
                federalTaxRate: data.federalTaxRate,
                spouseHours: data.spouseHours,
                materialParticipation: data.materialParticipation,
              }}
              onChange={updateData}
              isOpen={openSections.has("tax")}
              onToggle={() => handleSectionToggle("tax")}
            />
          </div>

          {/* Output Sections */}
          <div className="space-y-6">
            <RevenuePerformanceOutput
              results={{
                nightsBooked: results.nightsBooked,
                bookingsPerMonth: results.bookingsPerMonth,
                monthlyRevenue: results.monthlyRevenue,
                annualRevenue: results.annualRevenue,
                grossMonthlyRevenue: results.grossMonthlyRevenue,
                cleaningFeeRevenue: results.cleaningFeeRevenue,
                monthlyPlatformFees: results.monthlyPlatformFees,
              }}
              showYearly={showYearly}
              onToggleView={() => setShowYearly(!showYearly)}
            />

            <ExpenseSummaryOutput
              results={{
                totalAnnualOperatingCosts: results.totalAnnualOperatingCosts,
                managementFeeAmount: results.managementFeeAmount,
                actualCleaningCosts: results.actualCleaningCosts,
                annualUtilities: results.annualUtilities,
                monthlyMortgagePayment: results.monthlyMortgagePayment,
                annualMortgagePayments: results.annualMortgagePayments,
              }}
              showYearly={showYearly}
            />

            <InvestmentPerformanceOutput
              results={{
                netOperatingIncome: results.netOperatingIncome,
                annualCashFlow: results.annualCashFlow,
                roi: results.roi,
                cashOnCashReturn: results.cashOnCashReturn,
                capRate: results.capRate,
                breakEvenMonths: results.breakEvenMonths,
                totalCashInvested: results.totalCashInvested,
              }}
            />

            <TaxBenefitsOutput
              results={{
                annualDepreciation: results.annualDepreciation,
                bonusDepreciation: results.bonusDepreciation,
                totalFirstYearDepreciation: results.totalFirstYearDepreciation,
                qbiDeduction: results.qbiDeduction,
                taxSavings: results.taxSavings,
                taxableRentalIncome: results.taxableRentalIncome,
                passiveLossLimitation: results.passiveLossLimitation,
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
