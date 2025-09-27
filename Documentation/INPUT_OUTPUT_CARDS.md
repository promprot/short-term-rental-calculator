# STR Calculator - Input & Output Cards Reference

## Input Cards

### Revenue Section
**Card ID:** "rental"

- **Average Nightly Rate**
   - Field Name: averageNightlyRate
   - Field Type: Number (currency)
   - Default Value: $200
   - Help Text: "Your base nightly rate before fees. Research comparable properties within 2-3 miles using AirDNA, Mashvisor, or Airbnb searches. This calculator assumes a minimum 2-night stay requirement to reduce turnover costs and attract quality guests."

- **Occupancy Rate**
   - Field Name: occupancyRate
   - Field Type: Slider
   - Default Value: 65%
   - Range: 30% - 95%
   - Help Text: "Percentage of nights booked annually. Realistic targets: New properties 45-65% first year, established properties 65-85%. Consider seasonality and local market conditions when setting expectations."

### Costs Section
**Card ID:** "costs"

- **Cleaning Fee per Stay**
   - Field Name: cleaningFee
   - Field Type: Number (currency)
   - Default Value: $125
   - Help Text: "One-time cleaning fee charged per booking (minimum 2 nights). Set competitively: Studio/1BR: $75-125, 2-3BR: $100-175, 4+BR: $150-300. This fee is revenue to you - actual cleaning costs are calculated separately based on your occupancy rate."

- **Property Tax (Annual)**
   - Field Name: propertyTax
   - Field Type: Number (currency)
   - Default Value: $4,800
   - Help Text: "Annual property taxes assessed by local government. Based on assessed property value and local tax rates. STR properties may face higher assessments in some areas. Typically 0.5-2.5% of property value annually."

- **HOA Fees (Annual)**
   - Field Name: hoaFees
   - Field Type: Number (currency)
   - Default Value: $0
   - Help Text: "Annual homeowner association fees for condos, townhomes, or communities with shared amenities. Includes maintenance of common areas, amenities, and sometimes utilities like water/trash."

- **Insurance (Annual)**
   - Field Name: insurance
   - Field Type: Number (currency)
   - Default Value: $2,400
   - Help Text: "Annual STR-specific insurance coverage beyond standard homeowner's policy. Includes liability protection, property damage from guests, and loss of income coverage. Providers: Proper, CBIZ, Farmers. Costs vary by property value and location."

- **Utilities (Monthly)**
   - Field Name: utilities
   - Field Type: Number (currency)
   - Default Value: $0
   - Help Text: "Monthly electricity, gas, water, trash, sewer, internet, and cable costs. STR properties use 20-40% more utilities than long-term rentals due to guest turnover and comfort expectations. Include high-speed internet and cable as they're essential for guest satisfaction."

- **Management Fee**
   - Field Name: managementFee
   - Field Type: Slider
   - Default Value: 0%
   - Range: 0% - 50%
   - Step: 0.25%
   - Help Text: "Percentage of gross revenue paid to property management companies. Most owners self-manage (0%) to maximize profits. Professional management typically charges 15-30% for full-service including guest communication, cleaning coordination, maintenance, and marketing."

- **Platform Fees**
   - Field Name: platformFees
   - Field Type: Slider
   - Default Value: 3%
   - Range: 0% - 15%
   - Step: 0.1%
   - Help Text: "Platform booking fees charged by Airbnb (typically 3% host fee) and VRBO (typically 5-8% commission). These are deducted from your payout automatically. Factor in payment processing fees and any additional service charges."

- **Maintenance & Repairs (Annual)**
   - Field Name: maintenance
   - Field Type: Number (currency)
   - Default Value: $0
   - Help Text: "Annual maintenance and repairs including HVAC servicing, plumbing, electrical, appliance repairs, and general upkeep. STR properties need 2-3x more maintenance than long-term rentals due to higher usage and guest wear."

- **Lodging Tax (Annual)**
   - Field Name: lodgingTax
   - Field Type: Number (currency)
   - Default Value: $2,400
   - Help Text: "Annual occupancy or transient lodging taxes paid to local government. Varies by location: 3-15% of gross revenue. Some cities have flat fees per night ($2-10). Check local regulations as this is often required for STR permits."

- **Other Expenses (Annual)**
    - Field Name: other
    - Field Type: Number (currency)
    - Default Value: $0
    - Help Text: "Additional annual expenses such as permits/licenses, accounting fees, legal costs, marketing expenses, guest amenities, or specialized software subscriptions. Include any costs not covered in other categories."

### Property Section
**Card ID:** "property"

- **Purchase Price**
   - Field Name: purchasePrice
   - Field Type: Number (currency)
   - Default Value: $300,000
   - Help Text: "Total property purchase price. Consider the 1% rule as a starting point (monthly rent ≥ 1% of purchase price), though successful STRs often exceed this benchmark due to higher nightly rates."

- **Down Payment**
   - Field Name: downPayment
   - Field Type: Number (currency)
   - Default Value: $60,000
   - Help Text: "Upfront cash payment toward purchase. Investment properties typically require 20-25% minimum down payment. Higher down payments reduce monthly mortgage costs and improve cash flow metrics."

- **Closing Costs**
   - Field Name: closingCosts
   - Field Type: Number (currency)
   - Default Value: $15,000
   - Help Text: "One-time costs to complete property purchase including title insurance, attorney fees, inspections, appraisal, and lender fees. Typically 2-5% of purchase price."

- **Interest Rate**
   - Field Name: interestRate
   - Field Type: Slider
   - Default Value: 6.5%
   - Range: 3% - 12%
   - Step: 0.125%
   - Help Text: "Annual mortgage interest rate for investment property. Investment rates are typically 0.5-1% higher than primary residence rates."

- **Loan Term**
   - Field Name: loanTerm
   - Field Type: Select
   - Default Value: 30 years
   - Options: 15, 20, 25, 30 years
   - Help Text: "15-year loans have higher monthly payments but lower total interest. 30-year loans improve cash flow but cost more over time. Choose based on your cash flow needs and investment strategy."

- **Renovation Costs**
   - Field Name: renovation
   - Field Type: Number (currency)
   - Default Value: $0
   - Help Text: "Guest-ready improvements to maximize bookings and rates. Under Trump's 2025 tax reforms, 100% bonus depreciation allows immediate write-off of qualifying renovations."

- **Furnishing & Setup**
   - Field Name: furnishing
   - Field Type: Number (currency)
   - Default Value: $0
   - Help Text: "Complete furnishing package for guest comfort and professional photos. Qualifies for 100% bonus depreciation under 2025 tax law. Budget by size: Studio $10-18K, 1BR $15-25K, 2BR $20-35K, 3+BR $30-60K."

### Tax Benefits Section
**Card ID:** "benefits"

- **Annual Income**
   - Field Name: annualIncome
   - Field Type: Number (currency)
   - Default Value: $400,000
   - Help Text: "Your total annual income from employment and other sources. This determines your tax bracket and potential savings from STR tax benefits. High earners ($400K+) see the greatest benefit."

- **Federal Tax Rate**
   - Field Name: federalTaxRate
   - Field Type: Slider
   - Default Value: 37%
   - Range: 10% - 37%
   - Step: 1%
   - Help Text: "Your marginal federal tax rate based on income level. For 2025: 37% bracket starts at $394,600 (married filing jointly). Higher tax rates mean greater savings from depreciation and business deductions under Trump's permanent tax reforms."

- **Material Participation Status**
   - Field Name: materialParticipation
   - Field Type: Switch (Boolean)
   - Default Value: true
   - Label: "Material Participation Status"
   - Description: "Qualify to offset other income with rental losses"

- **Annual STR Hours**
   - Field Name: spouseHours
   - Field Type: Select
   - Default Value: 500 hours
   - Options: 100, 500 hours
   - Help Text: "Material participation allows STR losses to offset other income. Requires 500+ hours annually OR 100+ hours with no one else participating more. Spouse hours count toward your total participation time."

## Output Cards

### Revenue Performance
- **Gross Revenue**
   - Output Name: grossRevenue
   - Output: Total rental income before expenses
   - Dynamic Badge: Excellent ($8K+), Very Good ($5K+), Good ($3K+), Fair ($1K+), Poor (<$1K)
   - Description: "Total rental income before expenses"
   - Help Text: "Gross Revenue is your total rental income before any expenses, calculated as nightly rate × occupancy rate × cleaning fees. This represents your maximum earning potential."

- **Net Revenue (NOI)**
   - Output Name: monthlyNetOperatingIncome / annualNetOperatingIncome
   - Output: Net Operating Income after all operating expenses but before mortgage
   - Dynamic Badge: Same thresholds as Gross Revenue
   - Description: "Revenue after all operating expenses"
   - Help Text: "Net Revenue (NOI) is your Net Operating Income after ALL operating expenses including platform fees, cleaning costs, maintenance, insurance, taxes, utilities, and management fees, but BEFORE mortgage payments. This is the true profitability of your rental property operations."

- **Nights Booked**
   - Output Name: nightsBooked
   - Output: Number of nights booked per month/year
   - Dynamic Badge: Based on occupancy percentage
   - Description: Shows nights booked and occupancy rate

- **Bookings**
   - Output Name: bookings
   - Output: Number of bookings per month/year
   - Badge: Shows average nights per booking (2+ nights minimum)
   - Description: Total number of separate bookings

### Expense Summary
- **Monthly Mortgage**
   - Output Name: monthlyMortgage
   - Output: Principal and interest payment
   - Description: "Monthly mortgage payment (P&I only)"

- **Operating Costs**
   - Output Name: operatingCosts
   - Output: All operating expenses combined
   - Description: "Total monthly operating expenses"

- **Total Expenses**
   - Output Name: totalExpenses
   - Output: Mortgage + operating costs
   - Description: "Total monthly expenses"

### Investment Performance
- **Cash Flow**
   - Output Name: cashFlow
   - Output: Monthly/annual profit after all expenses
   - Dynamic Badge: Positive (green), Break-even (yellow), Negative (red)
   - Description: "Monthly profit after all expenses"

- **Cash-on-Cash Return**
   - Output Name: cashOnCashReturn
   - Output: Annual return percentage on cash invested
   - Dynamic Badge: Excellent (15%+), Good (10%+), Fair (5%+), Poor (<5%)
   - Description: "Annual return on cash invested"

- **Cap Rate**
   - Output Name: capRate
   - Output: Net operating income / purchase price
   - Dynamic Badge: Excellent (8%+), Good (6%+), Fair (4%+), Poor (<4%)
   - Description: "Property's earning potential"

- **Break-Even**
   - Output Name: breakEven
   - Output: Months to recover initial investment
   - Description: "Time to recover cash invested"

### Tax Benefits
- **Annual Tax Savings**
   - Output Name: taxSavings
   - Output: Total tax savings from depreciation and QBI
   - Description: "Annual tax savings from STR benefits"

- **Bonus Depreciation**
   - Output Name: bonusDepreciation
   - Output: 100% first-year depreciation on furnishing/renovation
   - Description: "First-year bonus depreciation"

- **Regular Depreciation**
   - Output Name: regularDepreciation
   - Output: Annual building depreciation (27.5 years)
   - Description: "Annual building depreciation"

- **QBI Deduction**
   - Output Name: qbiDeduction
   - Output: 20% qualified business income deduction
   - Description: "Qualified Business Income deduction"
