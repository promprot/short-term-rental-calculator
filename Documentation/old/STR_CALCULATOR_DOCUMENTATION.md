# STR Calculator - Comprehensive Component Documentation

**Version:** 1.0.0  
**Last Updated:** December 26, 2024  
**Document Type:** Component Reference & Field Specification  
**Maintainer:** Development Team  

---

## Document Purpose

This document serves as the definitive reference for all input and output components in the STR (Short-Term Rental) Calculator application. It includes field specifications, UI states, tooltip descriptions, styling details, and internal identifiers for consistent communication and maintenance.

---

## INPUT CARDS

### 1. RENTAL CARD
**Component:** `components/calculator/revenue-section.tsx`  
**Card Title:** "Rental"  
**Icon:** `DollarSign` in purple rounded background (`bg-primary/10`, `text-primary`)  
**Internal ID:** `rental` (section toggle)

#### Collapsed State
**Display Text:** `${averageNightlyRate}/night • {occupancyRate}% occupancy`  
**Example:** "$200/night • 65% occupancy"

#### Expanded State Fields

**Field 1: Average Nightly Rate**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "200"
- **Variable:** `averageNightlyRate`
- **Tooltip Description:** "Your base nightly rate before fees. Research comparable properties within 2-3 miles using AirDNA, Mashvisor, or Airbnb searches. This calculator assumes a minimum 2-night stay requirement to reduce turnover costs and attract quality guests."

**Field 2: Occupancy Rate**
- **Type:** Slider
- **Component:** `SliderField`
- **Range:** 30% - 95%
- **Suffix:** "%"
- **Default Value:** 65%
- **Variable:** `occupancyRate`
- **Tooltip Description:** "Percentage of nights booked annually. Realistic targets: New properties 45-65% first year, established properties 65-85%. Consider seasonality and local market conditions when setting expectations."

---

### 2. COSTS CARD
**Component:** `components/calculator/costs-section.tsx`  
**Card Title:** "Costs"  
**Icon:** `Receipt` in purple rounded background (`bg-primary/10`, `text-primary`)  
**Internal ID:** `costs` (section toggle)

#### Collapsed State
**Display Text:** `${cleaningFee} cleaning fee • {managementFee}% management • {platformFees}% platform fees`  
**Example:** "$125 cleaning fee • 0% management • 3% platform fees"

#### Expanded State Fields

**Field 1: Cleaning Fee per Stay**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "125"
- **Variable:** `cleaningFee`
- **Tooltip Description:** "One-time cleaning fee charged per booking (minimum 2 nights). Set competitively: Studio/1BR: $75-125, 2-3BR: $100-175, 4+BR: $150-300. This fee is revenue to you - actual cleaning costs are calculated separately based on your occupancy rate."

**Field 2: Property Tax (Annual)**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "4800"
- **Variable:** `propertyTax`
- **Tooltip Description:** "Annual property taxes assessed by local government. Based on assessed property value and local tax rates. STR properties may face higher assessments in some areas. Typically 0.5-2.5% of property value annually."

**Field 3: HOA Fees (Annual)**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "0"
- **Variable:** `hoaFees`
- **Tooltip Description:** "Annual homeowner association fees for condos, townhomes, or communities with shared amenities. Includes maintenance of common areas, amenities, and sometimes utilities like water/trash."

**Field 4: Insurance (Annual)**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "2400"
- **Variable:** `insurance`
- **Tooltip Description:** "Annual STR-specific insurance coverage beyond standard homeowner's policy. Includes liability protection, property damage from guests, and loss of income coverage. Providers: Proper, CBIZ, Farmers. Costs vary by property value and location."

**Field 5: Utilities (Monthly)**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "300"
- **Variable:** `utilities`
- **Tooltip Description:** "Monthly electricity, gas, water, trash, sewer, internet, and cable costs. STR properties use 20-40% more utilities than long-term rentals due to guest turnover and comfort expectations. Include high-speed internet and cable as they're essential for guest satisfaction."

**Field 6: Management Fee**
- **Type:** Slider
- **Component:** `SliderField`
- **Range:** 0% - 30%
- **Step:** 0.5%
- **Suffix:** "%"
- **Default Value:** 0%
- **Variable:** `managementFee`
- **Tooltip Description:** "Percentage of gross revenue paid to property management companies. Most owners self-manage (0%) to maximize profits. Professional management typically charges 15-25% for full-service including guest communication, cleaning coordination, maintenance, and marketing."

**Field 7: Platform Fees**
- **Type:** Slider
- **Component:** `SliderField`
- **Range:** 0% - 15%
- **Step:** 0.1%
- **Suffix:** "%"
- **Default Value:** 3%
- **Variable:** `platformFees`
- **Tooltip Description:** "Platform booking fees charged by Airbnb (typically 3% host fee) and VRBO (typically 5-8% commission). These are deducted from your payout automatically. Factor in payment processing fees and any additional service charges."

**Field 8: Maintenance & Repairs (Annual)**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "6000"
- **Variable:** `maintenance`
- **Tooltip Description:** "Annual maintenance and repairs including HVAC servicing, plumbing, electrical, appliance repairs, and general upkeep. STR properties need 2-3x more maintenance than long-term rentals due to higher usage and guest wear."

**Field 9: Lodging Tax (Annual)**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "2400"
- **Variable:** `lodgingTax`
- **Tooltip Description:** "Annual occupancy or transient lodging taxes paid to local government. Varies by location: 3-15% of gross revenue. Some cities have flat fees per night ($2-10). Check local regulations as this is often required for STR permits."

**Field 10: Other Expenses (Annual)**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "1000"
- **Variable:** `other`
- **Tooltip Description:** "Additional annual expenses such as permits/licenses, accounting fees, legal costs, marketing expenses, guest amenities, or specialized software subscriptions. Include any costs not covered in other categories."

---

### 3. PROPERTY CARD
**Component:** `components/calculator/startup-section.tsx`  
**Card Title:** "Property"  
**Icon:** `Home` in purple rounded background (`bg-primary/10`, `text-primary`)  
**Internal ID:** `property` (section toggle)

#### Collapsed State
**Display Text:** `${formatCurrency(purchasePrice)} purchase • ${formatCurrency(downPayment)} down • {interestRate}% rate`  
**Example:** "$300,000 purchase • $60,000 down • 6.5% rate"

#### Expanded State Fields

**Field 1: Purchase Price**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "300,000"
- **Variable:** `purchasePrice`
- **Layout:** Grid column 1 of 3 (md:grid-cols-3)
- **Tooltip Description:** "Total property purchase price. Consider the 1% rule as a starting point (monthly rent ≥ 1% of purchase price), though successful STRs often exceed this benchmark due to higher nightly rates."

**Field 2: Down Payment**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "60,000"
- **Variable:** `downPayment`
- **Layout:** Grid column 2 of 3 (md:grid-cols-3)
- **Tooltip Description:** "Upfront cash payment toward purchase. Investment properties typically require 20-25% minimum down payment. Higher down payments reduce monthly mortgage costs and improve cash flow metrics."

**Field 3: Closing Costs**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "15,000"
- **Variable:** `closingCosts`
- **Layout:** Grid column 3 of 3 (md:grid-cols-3)
- **Tooltip Description:** "One-time costs to complete property purchase including title insurance, attorney fees, inspections, appraisal, and lender fees. Typically 2-5% of purchase price."

**Field 4: Interest Rate**
- **Type:** Slider
- **Component:** `SliderField`
- **Range:** 3% - 12%
- **Step:** 0.125%
- **Suffix:** "%"
- **Default Value:** 6.5%
- **Variable:** `interestRate`
- **Layout:** Grid column 1 of 2 (md:grid-cols-2)
- **Tooltip Description:** "Annual mortgage interest rate for investment property. Investment rates are typically 0.5-1% higher than primary residence rates."

**Field 5: Loan Term**
- **Type:** Select Dropdown
- **Component:** `Select`
- **Options:** 15, 20, 25, 30 years
- **Default Value:** 30 years
- **Variable:** `loanTerm`
- **Layout:** Grid column 2 of 2 (md:grid-cols-2)
- **Tooltip Description:** "15-year loans have higher monthly payments but lower total interest. 30-year loans improve cash flow but cost more over time. Choose based on your cash flow needs and investment strategy."
- **Special:** Has expandable tooltip with `HelpCircle` icon and state management

**Field 6: Renovation Costs**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "0"
- **Variable:** `renovation`
- **Layout:** Grid column 1 of 2 (md:grid-cols-2)
- **Tooltip Description:** "Guest-ready improvements to maximize bookings and rates. Under Trump's 2025 tax reforms, 100% bonus depreciation allows immediate write-off of qualifying renovations."

**Field 7: Furnishing & Setup**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "0"
- **Variable:** `furnishing`
- **Layout:** Grid column 2 of 2 (md:grid-cols-2)
- **Tooltip Description:** "Complete furnishing package for guest comfort and professional photos. Qualifies for 100% bonus depreciation under 2025 tax law. Budget by size: Studio $10-18K, 1BR $15-25K, 2BR $20-35K, 3+BR $30-60K."

---

### 4. BENEFITS CARD
**Component:** `components/calculator/tax-benefits-section.tsx`  
**Card Title:** "Benefits"  
**Icon:** `Calculator` in purple rounded background (`bg-primary/10`, `text-primary`)  
**Internal ID:** `benefits` (section toggle)

#### Collapsed State
**Display Text:** `${formatCurrency(annualIncome)} income • {federalTaxRate}% tax rate • {spouseHours} hours`  
**Example:** "$400,000 income • 37% tax rate • 500 hours"

#### Expanded State Fields

**Field 1: Annual Income**
- **Type:** Number Input with prefix
- **Component:** `InputField`
- **Prefix:** "$"
- **Default Placeholder:** "400,000"
- **Variable:** `annualIncome`
- **Tooltip Description:** "Your total annual income from employment and other sources. This determines your tax bracket and potential savings from STR tax benefits. High earners ($400K+) see the greatest benefit."

**Field 2: Federal Tax Rate**
- **Type:** Slider
- **Component:** `SliderField`
- **Range:** 10% - 37%
- **Step:** 1%
- **Suffix:** "%"
- **Default Value:** 37%
- **Variable:** `federalTaxRate`
- **Tooltip Description:** "Your marginal federal tax rate based on income level. For 2025: 37% bracket starts at $394,600 (married filing jointly). Higher tax rates mean greater savings from depreciation and business deductions under Trump's permanent tax reforms."

**Field 3: Material Participation Status**
- **Type:** Switch Toggle
- **Component:** `Switch`
- **Default Value:** true
- **Variable:** `materialParticipation`
- **Label:** "Material Participation Status"
- **Description:** "Qualify to offset other income with rental losses"

**Field 4: Annual STR Hours**
- **Type:** Select Dropdown
- **Component:** `Select`
- **Options:** 100 hours, 500 hours
- **Default Value:** 500 hours
- **Variable:** `spouseHours`
- **Special:** Has expandable tooltip with `HelpCircle` icon and state management
- **Tooltip Description:** "Material participation allows STR losses to offset other income. Requires 500+ hours annually OR 100+ hours with no one else participating more. Spouse hours count toward your total participation time."

---

## OUTPUT CARDS

### 1. REVENUE CARD
**Component:** `components/calculator/revenue-performance-output.tsx`  
**Card Title:** "Revenue"  
**Icon:** `BarChart3` in purple rounded background (`bg-primary/10`, `text-primary`)  
**Toggle Button:** Monthly/Yearly view

#### Main Metrics (Grid Layout - 2 columns)

**Metric 1: Gross Revenue**
- **Icon:** `Target` (`text-muted-foreground`)
- **Label:** "Gross Revenue"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Value Display:** Large currency format with color coding
- **Subtitle:** "Total rental income before expenses"
- **KPI Badge States:**
  - **Excellent:** ≥$8,000/month (`bg-emerald-100 text-emerald-700`)
  - **Very Good:** ≥$5,000/month (`bg-emerald-50 text-emerald-600`)
  - **Good:** ≥$3,000/month (`bg-yellow-100 text-yellow-700`)
  - **Fair:** ≥$1,000/month (`bg-orange-100 text-orange-700`)
  - **Poor:** <$1,000/month (`bg-red-100 text-red-700`)

**Metric 2: Net Revenue**
- **Icon:** `DollarSign` (`text-muted-foreground`)
- **Label:** "Net Revenue"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Value Display:** Large currency format with color coding
- **Subtitle:** "Revenue after platform fees"
- **KPI Badge States:** Same as Gross Revenue

#### Secondary Metrics (Grid Layout - 2 columns)

**Metric 3: Nights Booked**
- **Icon:** `Calendar` (color-coded by performance)
- **Label:** "Nights Booked"
- **Value Display:** Large number format
- **Badges:** 
  - Time period badge (`nights/month` or `nights/year`)
  - Occupancy percentage badge (color-coded)
- **Color Coding:**
  - **Excellent:** ≥25 nights (`text-emerald-600`)
  - **Good:** ≥20 nights (`text-emerald-500`)
  - **Fair:** ≥15 nights (`text-yellow-600`)
  - **Poor:** ≥10 nights (`text-orange-500`)
  - **Very Poor:** <10 nights (`text-red-500`)

**Metric 4: Bookings**
- **Icon:** `TrendingUp` (`text-emerald-600`)
- **Label:** "Bookings"
- **Value Display:** Large number format (always green)
- **Badges:**
  - Time period badge (`bookings/month` or `bookings/year`)
  - Average nights per booking badge (`bg-emerald-100 text-emerald-700`)

---

### 2. EXPENSES CARD
**Component:** `components/calculator/expense-summary-output.tsx`  
**Card Title:** "Expenses"  
**Icon:** `PieChart` in red background (`bg-red-100`, `text-red-600`)  
**Internal ID:** `expenses-card`

#### Metrics

**Metric 1: Mortgage Payment** (Conditional - only if > 0)
- **Icon:** `Home` (color-coded by amount)
- **Label:** "Mortgage Payment"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `mortgage-payment-metric`
- **Subtitle:** "Fixed expense"
- **Additional Badge:** Percentage of total expenses
- **KPI Badge States:**
  - **Low:** ≤$1,200/month (`bg-emerald-100 text-emerald-700`)
  - **Moderate:** ≤$2,000/month (`bg-yellow-100 text-yellow-700`)
  - **High:** >$2,000/month (`bg-red-100 text-red-700`)

**Metric 2: Operating Costs**
- **Icon:** `Wrench` (color-coded by amount)
- **Label:** "Operating Costs"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `operating-costs-metric`
- **Subtitle:** "Scales with occupancy"
- **Additional Badge:** Percentage of total expenses
- **KPI Badge States:**
  - **Efficient:** ≤$800/month (`bg-emerald-100 text-emerald-700`)
  - **Moderate:** ≤$1,500/month (`bg-yellow-100 text-yellow-700`)
  - **High:** >$1,500/month (`bg-red-100 text-red-700`)

**Metric 3: Total Expenses** (Summary Section)
- **Icon:** `AlertTriangle` (`text-red-600`)
- **Label:** "Total Expenses"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `total-expenses-summary`
- **Border:** Double red border (`border-2 border-red-200`)
- **Subtitle:** "All operating and financing costs"
- **Additional Badge:** Time period indicator
- **KPI Badge States:**
  - **Low Cost:** ≤$2,000/month (`bg-emerald-100 text-emerald-700`)
  - **Moderate:** ≤$3,500/month (`bg-yellow-100 text-yellow-700`)
  - **High Cost:** >$3,500/month (`bg-red-100 text-red-700`)

---

### 3. PERFORMANCE CARD
**Component:** `components/calculator/investment-performance-output.tsx`  
**Card Title:** "Performance"  
**Icon:** `TrendingUp` in blue background (`bg-blue-100`, `text-blue-600`)  
**Internal ID:** `performance-card`

#### Main Metrics (Grid Layout - 2 columns)

**Metric 1: Cap Rate**
- **Icon:** `TrendingUp` (`text-muted-foreground`)
- **Label:** "Cap Rate"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `cap-rate-metric`
- **Subtitle:** "NOI ÷ Property Value"
- **KPI Badge States:**
  - **Excellent:** ≥15% (`bg-blue-100 text-blue-700`)
  - **Very Good:** ≥10% (`bg-blue-50 text-blue-600`)
  - **Good:** ≥6% (`bg-teal-100 text-teal-700`)
  - **Fair:** ≥3% (`bg-yellow-100 text-yellow-700`)
  - **Poor:** <3% (`bg-red-100 text-red-700`)

**Metric 2: Cash-on-Cash Return**
- **Icon:** `DollarSign` (`text-muted-foreground`)
- **Label:** "Cash-on-Cash Return"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `cash-on-cash-metric`
- **Subtitle:** "Annual return on invested capital"
- **KPI Badge States:** Same as Cap Rate

#### Secondary Metrics

**Metric 3: Total Investment**
- **Icon:** `DollarSign` (`text-muted-foreground`)
- **Label:** "Total Investment"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `total-investment-metric`
- **Subtitle:** "Initial capital required"
- **Color:** Always blue (`text-blue-700`)

**Metric 4: Break-Even Timeline**
- **Icon:** `Clock` (`text-muted-foreground`)
- **Label:** "Break-Even Timeline"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `break-even-metric`
- **Value Display:** "X.X months" or "Never"
- **Subtitle:** "X.X years to break even" or "Negative cash flow"
- **KPI Badge States:**
  - **Excellent:** ≤12 months (`bg-blue-100 text-blue-700`)
  - **Good:** ≤24 months (`bg-teal-100 text-teal-700`)
  - **Fair:** ≤36 months (`bg-yellow-100 text-yellow-700`)
  - **Poor:** >36 months (`bg-red-100 text-red-700`)

---

### 4. DEDUCTIONS CARD
**Component:** `components/calculator/tax-benefits-output.tsx`  
**Card Title:** "Deductions"  
**Icon:** `Shield` in emerald background (`bg-emerald-100`, `text-emerald-600`)  
**Internal ID:** `deductions-card`

#### Main Summary

**Total Tax Savings** (Primary Section)
- **Icon:** `PiggyBank` (`text-emerald-600`)
- **Label:** "Total Tax Savings"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `total-tax-savings-summary`
- **Border:** Double emerald border (`border-2 border-emerald-200`)
- **Subtitle:** "Annual federal tax reduction"
- **Additional Badge:** Effective rate reduction percentage
- **KPI Badge States:**
  - **Exceptional:** ≥$15,000 (`bg-emerald-100 text-emerald-700`)
  - **Excellent:** ≥$10,000 (`bg-emerald-50 text-emerald-600`)
  - **Very Good:** ≥$5,000 (`bg-teal-100 text-teal-700`)
  - **Good:** ≥$2,000 (`bg-teal-50 text-teal-600`)
  - **Minimal:** <$2,000 (`bg-muted/10 text-muted-foreground`)

#### Detail Metrics (Grid Layout - 2 columns)

**Metric 1: Bonus Depreciation**
- **Icon:** `TrendingDown` (`text-muted-foreground`)
- **Label:** "Bonus Depreciation"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `bonus-depreciation-metric`
- **Badge:** "100% First Year" (`bg-teal-100 text-teal-700`)
- **Subtitle:** "Immediate deduction on improvements"
- **Additional Badge:** Tax savings calculation
- **Color:** Always teal (`text-teal-600`)

**Metric 2: QBI Deduction**
- **Icon:** `Percent` (`text-muted-foreground`)
- **Label:** "QBI Deduction"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `qbi-deduction-metric`
- **Badge:** "20% Deduction" (`bg-emerald-100 text-emerald-700`)
- **Subtitle:** "20% deduction on qualifying business income"
- **Additional Badge:** Tax savings calculation
- **Color:** Always emerald (`text-emerald-600`)

**Metric 3: Total Depreciation**
- **Icon:** `Calculator` (`text-muted-foreground`)
- **Label:** "Total Depreciation"
- **Help Icon:** `HelpCircle` (expandable tooltip)
- **Internal ID:** `total-depreciation-metric`
- **Badge:** "First Year" (`variant="secondary"`)
- **Subtitle:** "First-year depreciation deductions"
- **Additional Badge:** Tax impact calculation
- **Color:** Always slate (`text-slate-700`)

---

## TOOLTIP SYSTEM

All tooltips use the same pattern:
- **Trigger:** `HelpCircle` icon (`h-3.5 w-3.5` or `h-4 w-4`)
- **State Management:** Individual `useState` for each tooltip
- **Styling:** Rounded border with colored background matching the card theme
- **Content:** Bold label followed by detailed description

---

## EXPANDABLE BEHAVIOR

- **Input Cards:** Independent expansion (multiple can be open simultaneously)
- **Section Toggles:** Use individual boolean states, not exclusive accordion behavior
- **Tooltip Expansion:** Independent per tooltip, managed by individual state variables

---

## CHANGELOG

### Version 1.0.0 - December 26, 2024
- Initial comprehensive documentation
- Documented all input and output components
- Included KPI states, styling details, and internal identifiers
- Established version tracking system
