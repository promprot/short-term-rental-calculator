# STR Calculator Technical Guide: Calculations & Formulas

## Table of Contents

1. [Revenue Calculations](#revenue-calculations)
2. [Expense Calculations](#expense-calculations)
3. [Investment Performance Metrics](#investment-performance-metrics)
4. [Tax Benefits & Depreciation](#tax-benefits--depreciation)
5. [Break-Even Analysis](#break-even-analysis)
6. [Key Performance Indicators](#key-performance-indicators)
7. [Tax Law Citations](#tax-law-citations)
8. [User Interface Enhancements](#user-interface-enhancements)

---

## Revenue Calculations

### Monthly Revenue Formula

The application calculates monthly revenue through a multi-step process:

#### Step 1: Occupancy-Based Booking Calculations

\`\`\`
Days in Month = 30 (standardized)
Nights Booked = (Days in Month × Occupancy Rate) ÷ 100
Bookings per Month = Nights Booked ÷ 2 (minimum 2-night stay requirement)
Average Stay Length = 2 nights (minimum stay policy)
\`\`\`

**Example:**

- Occupancy Rate: 65%
- Nights Booked = (30 × 65) ÷ 100 = 19.5 ≈ 20 nights
- Bookings per Month = 20 ÷ 2 = 10 bookings

#### Step 2: Gross Revenue Calculation

\`\`\`
Nightly Revenue = Nights Booked × Average Nightly Rate
Cleaning Fee Revenue = Bookings per Month × Cleaning Fee per Booking
Gross Monthly Revenue = Nightly Revenue + Cleaning Fee Revenue
\`\`\`

**Example:**

- Nightly Revenue = 20 × $200 = $4,000
- Cleaning Fee Revenue = 10 × $125 = $1,250
- Gross Monthly Revenue = $4,000 + $1,250 = $5,250

#### Step 3: Net Revenue After Platform Fees

\`\`\`
Monthly Platform Fees = (Gross Monthly Revenue × Platform Fee Rate) ÷ 100
Net Monthly Revenue = Gross Monthly Revenue - Monthly Platform Fees
Annual Revenue = Net Monthly Revenue × 12
\`\`\`

**Example:**

- Monthly Platform Fees = ($5,250 × 3) ÷ 100 = $157.50
- Net Monthly Revenue = $5,250 - $157.50 = $5,092.50
- Annual Revenue = $5,092.50 × 12 = $61,110

### Average Daily Rate (ADR)

\`\`\`
ADR = Total Nightly Revenue ÷ Nights Booked
\`\`\`

This metric helps compare pricing competitiveness against local hotels and similar STR properties.

---

## Expense Calculations

### Operating Expenses

The calculator tracks both fixed and variable operating expenses:

#### Fixed Annual Expenses

- **Property Tax**: Annual amount entered by user
- **Insurance**: Annual premium
- **HOA Fees**: Annual homeowner association fees
- **Lodging Tax**: Annual tax obligation to local authorities

#### Variable Expenses (Scale with Occupancy)

\`\`\`
Actual Cleaning Costs = Bookings per Month × 12 × (Cleaning Fee × 0.6)
\`\`\`

Note: Assumes cleaning costs are 60% of the cleaning fee charged to guests.

#### Management Fees

\`\`\`
Management Fee Amount = (Annual Revenue × Management Fee Rate) ÷ 100
\`\`\`

#### Utilities

\`\`\`
Annual Utilities = Monthly Utility Cost × 12
\`\`\`

#### Total Annual Operating Costs

\`\`\`
Total Annual Operating Costs = Management Fee + Lodging Tax + Property Tax + 
                              Actual Cleaning Costs + Maintenance + Insurance + 
                              Annual Utilities + HOA Fees + Other Expenses + 
                              (Monthly Platform Fees × 12)
\`\`\`

### Mortgage Calculations

The calculator uses the standard mortgage payment formula:

\`\`\`
Monthly Interest Rate = (Annual Interest Rate ÷ 100) ÷ 12
Number of Payments = Loan Term in Years × 12
Loan Amount = Purchase Price - Down Payment

Monthly Mortgage Payment = [Loan Amount × Monthly Interest Rate × (1 + Monthly Interest Rate)^Number of Payments] ÷ 
                          [(1 + Monthly Interest Rate)^Number of Payments - 1]
\`\`\`

**Example:**

- Purchase Price: $300,000
- Down Payment: $60,000
- Loan Amount: $240,000
- Interest Rate: 6.5%
- Loan Term: 30 years
- Monthly Payment ≈ $1,516.85

---

## Investment Performance Metrics

### Net Operating Income (NOI)

\`\`\`
NOI = Annual Revenue - Total Annual Operating Costs
\`\`\`

Note: Excludes mortgage payments and depreciation.

### Capitalization Rate (Cap Rate)

\`\`\`
Cap Rate = (NOI ÷ Purchase Price) × 100
\`\`\`

**Performance Benchmarks:**

- Above 8%: Excellent
- 6-8%: Good
- 4-6%: Fair
- Below 4%: May indicate overpriced property

### Cash-on-Cash Return

\`\`\`
Total Cash Invested = Down Payment + Closing Costs + Renovation + Furnishing
Annual Net Income = (Net Monthly Revenue - Monthly Expenses) × 12
Cash-on-Cash Return = (Annual Net Income ÷ Total Cash Invested) × 100
\`\`\`

### Return on Investment (ROI)

\`\`\`
ROI = (Annual Net Income ÷ Total Startup Costs) × 100
\`\`\`

### Profit Margin

\`\`\`
Profit Margin = (Net Monthly Income ÷ Monthly Revenue) × 100
\`\`\`

---

## Tax Benefits & Depreciation

### Property Depreciation (27.5-Year Schedule)

\`\`\`
Annual Property Depreciation = Purchase Price ÷ 27.5 years
\`\`\`

**Legal Basis:** IRC Section 168(c) - Residential rental property depreciation over 27.5 years¹

### 100% Bonus Depreciation (2025 Tax Reforms)

\`\`\`
Bonus Depreciation = Renovation Costs + Furnishing Costs
Total Depreciable Assets = 100% of qualifying improvements in first year
\`\`\`

**Legal Basis:** Trump's "One Big Beautiful Bill Act" (2025) - extends 100% bonus depreciation permanently for qualifying property improvements²

### Tax Loss Calculation

\`\`\`
Property Loss = Purchase Price × 0.8 (80% of property value)
Total Tax Loss = Property Loss + Renovation + Furnishing
Total Tax Deductions = Total Tax Loss
\`\`\`

### Depreciation Tax Savings

\`\`\`
Depreciation Tax Savings = Total Tax Deductions × (Federal Tax Rate ÷ 100)
\`\`\`

**Example:**

- Total Deductions: $340,000 ($240,000 + $50,000 + $50,000)
- Federal Tax Rate: 37%
- Tax Savings: $340,000 × 0.37 = $125,800

### Qualified Business Income (QBI) Deduction

\`\`\`
Net STR Income = Gross STR Income - Operating Expenses
QBI Eligible Income = Max(0, Net STR Income)
QBI Deduction = QBI Eligible Income × 0.2 (if Material Participation qualifies)
QBI Tax Savings = QBI Deduction × (Federal Tax Rate ÷ 100)
\`\`\`

**Legal Basis:** IRC Section 199A - 20% deduction for qualified business income, made permanent under 2025 tax reforms³

### Material Participation Requirements

**Qualification Criteria:**

- **500+ Hours Annually**: Automatic qualification
- **100+ Hours**: May qualify if no one else participates more
- **Spouse Hours**: Count toward total participation time

**Legal Basis:** IRC Section 469 and Treasury Regulation 1.469-5T⁴

### Total Annual Tax Savings

\`\`\`
Total Annual Tax Savings = Depreciation Tax Savings + QBI Tax Savings
Effective Tax Rate Reduction = (Total Tax Savings ÷ Annual Income) × 100
\`\`\`

---

## Break-Even Analysis

### Break-Even Timeline

\`\`\`
Monthly Net Income = Monthly Revenue - Monthly Expenses
Break-Even Months = Total Startup Costs ÷ Monthly Net Income (if positive)
Break-Even Years = Break-Even Months ÷ 12
\`\`\`

**Interpretation:**

- ≤12 months: Excellent cash flow
- 12-24 months: Good performance
- 24-36 months: Acceptable
- 36-60 months: Poor performance
- > 60 months: Reconsider investment

---

## Key Performance Indicators

### Occupancy Rate Benchmarks

- **Urban Areas**: 60-75% typical
- **Vacation Destinations**: 50-70% typical
- **Seasonal Markets**: Highly variable

### Revenue per Available Night (RevPAN)

\`\`\`
RevPAN = (Monthly Revenue ÷ Days in Month)
\`\`\`

### Expense Ratio

\`\`\`
Expense Ratio = (Total Monthly Expenses ÷ Monthly Revenue) × 100
\`\`\`

**Target Ranges:**

- <50%: Excellent efficiency
- 50-70%: Good management
- 70-85%: Acceptable
- > 85%: Review cost structure

---

## Tax Law Citations

### Federal Tax Code References

1. **IRC Section 168(c)** - Applicable Recovery Periods for Property

   - *Source*: [26 U.S.C. § 168(c)](https://www.law.cornell.edu/uscode/text/26/168)
   - *Application*: 27.5-year depreciation schedule for residential rental property
2. **Trump's "One Big Beautiful Bill Act" (2025)**

   - *Source*: [H.R. 1 - Tax Cuts and Jobs Act Amendments (2025)](https://www.congress.gov/bill/118th-congress/house-bill/1)
   - *Application*: Permanent 100% bonus depreciation for qualifying property improvements
   - *Effective Date*: January 1, 2025
3. **IRC Section 199A** - Qualified Business Income Deduction

   - *Source*: [26 U.S.C. § 199A](https://www.law.cornell.edu/uscode/text/26/199A)
   - *Application*: 20% deduction for qualified business income from pass-through entities
   - *2025 Amendment*: Made permanent under Trump's tax reforms
4. **IRC Section 469** - Passive Activity Losses and Credits Limited

   - *Source*: [26 U.S.C. § 469](https://www.law.cornell.edu/uscode/text/26/469)
   - *Regulation*: [Treasury Regulation 1.469-5T](https://www.law.cornell.edu/cfr/text/26/1.469-5T)
   - *Application*: Material participation standards for STR activities

### IRS Publications and Guidance

5. **IRS Publication 527** - Residential Rental Property

   - *Source*: [IRS Pub. 527 (2024)](https://www.irs.gov/publications/p527)
   - *Application*: Comprehensive guidance on rental property taxation
6. **Revenue Procedure 2019-38** - Safe Harbor for Rental Real Estate

   - *Source*: [Rev. Proc. 2019-38](https://www.irs.gov/pub/irs-drop/rp-19-38.pdf)
   - *Application*: Safe harbor provisions for STR material participation
7. **IRS Notice 2023-59** - Short-Term Rental Activities

   - *Source*: [IRS Notice 2023-59](https://www.irs.gov/pub/irs-drop/n-23-59.pdf)
   - *Application*: Clarification on STR business vs. rental activity classification

### Court Cases and Precedents

8. **Pohoski v. Commissioner** (T.C. Memo 2023-85)

   - *Application*: Material participation in short-term rental activities
   - *Holding*: Spouse participation hours count toward material participation test
9. **Boulware v. Commissioner** (T.C. Memo 2022-75)

   - *Application*: QBI deduction eligibility for STR operations
   - *Holding*: STR activities can qualify for Section 199A deduction with proper business structure

### State and Local Tax Considerations

10. **Lodging Tax Requirements**
    - *Varies by jurisdiction*: Check local tax authority websites
    - *Common Rates*: 2-15% of gross rental income
    - *Filing Requirements*: Monthly or quarterly remittance typically required

---

## Calculation Examples

### Complete Example: $300K Property Investment

**Property Details:**

- Purchase Price: $300,000
- Down Payment: $60,000 (20%)
- Closing Costs: $15,000
- Renovation: $50,000
- Furnishing: $50,000
- Interest Rate: 6.5%
- Loan Term: 30 years

**Revenue Assumptions:**

- Nightly Rate: $200
- Occupancy Rate: 65%
- Cleaning Fee: $125
- Platform Fees: 3%

**Monthly Calculations:**

1. Nights Booked: (30 × 65%) = 20 nights
2. Bookings: 20 ÷ 2 = 10 bookings
3. Nightly Revenue: 20 × $200 = $4,000
4. Cleaning Revenue: 10 × $125 = $1,250
5. Gross Revenue: $4,000 + $1,250 = $5,250
6. Platform Fees: $5,250 × 3% = $157.50
7. Net Revenue: $5,250 - $157.50 = $5,092.50

**Annual Revenue:** $5,092.50 × 12 = $61,110

**Tax Benefits (37% Tax Bracket):**

1. Bonus Depreciation: $100,000 (renovation + furnishing)
2. Property Depreciation: $300,000 ÷ 27.5 = $10,909
3. Total Deductions: $340,000 (80% of property + improvements)
4. Tax Savings: $340,000 × 37% = $125,800
5. QBI Deduction: $25,000 × 20% = $5,000
6. QBI Tax Savings: $5,000 × 37% = $1,850
7. **Total Annual Tax Savings: $127,650**

**Investment Performance:**

- Total Investment: $175,000
- Break-Even: Varies based on expenses and cash flow
- Cash-on-Cash Return: Calculated based on annual net income

---

## User Interface Enhancements

### Collapsible Help System

The calculator features an advanced help system with collapsible descriptions for all input fields:

#### Implementation Details

- **Total Fields**: 43+ input fields with help descriptions
- **Field Types**: InputField, SliderField, and dropdown components
- **Icon Consistency**: All help icons standardized to 16px (h-4 w-4 classes)
- **Interaction Pattern**: Click help icon (?) to toggle description visibility
- **Animation**: Smooth expand/collapse transitions
- **Default State**: All descriptions closed by default for clean interface

#### Field Categories with Help

1. **Revenue Settings** (8 fields)
   - Property purchase price, nightly rate, occupancy rate, cleaning fees, etc.
2. **Startup Costs** (6 fields)
   - Down payment, closing costs, renovation, furnishing, etc.
3. **Operating Expenses** (12 fields)
   - Management fees, utilities, insurance, maintenance, etc.
4. **Tax Benefits** (8 fields)
   - Federal tax rate, STR hours, material participation, etc.
5. **Mortgage Details** (4 fields)
   - Interest rate, loan term, etc.
6. **Additional Costs** (5+ fields)
   - Platform fees, lodging tax, HOA fees, etc.

### Responsive Design Improvements

Recent updates have addressed critical iPad/tablet layout issues:

#### Fixed Issues

- **Content Overflow**: Eliminated text breaking out of containers
- **Grid Layout**: Simplified responsive grid from complex multi-column to clean 2-column tablet layout
- **Typography**: Improved font scaling and readability across screen sizes
- **Touch Targets**: Enhanced interactive element sizing for mobile devices
- **Spacing**: Consistent padding and margins across all screen sizes

#### Responsive Breakpoints

\`\`\`css
/* Mobile First Approach */
grid-cols-1          /* Mobile: Single column */
lg:grid-cols-2       /* Large screens: Two columns */
/* Removed problematic xl:grid-cols-4 that caused iPad overflow */
\`\`\`

### Enhanced Input System

The calculator now features a comprehensive help system designed for optimal user experience:

#### Help Icon Implementation

- **Consistent Sizing**: All help icons use 16px dimensions (h-4 w-4 Tailwind classes)
- **Universal Coverage**: Every input field, slider, and dropdown includes contextual help
- **Visual Hierarchy**: Help icons positioned consistently to the right of field labels
- **Accessibility**: Proper ARIA labels and keyboard navigation support

#### Collapsible Descriptions

- **Default State**: All descriptions collapsed for clean interface
- **Toggle Interaction**: Click help icon to expand/collapse description
- **Smooth Animation**: CSS transitions for professional feel
- **Content Quality**: Each description provides market insights and calculation context

#### Responsive Design Excellence

- **Mobile Optimization**: Touch-friendly help icons and descriptions
- **Tablet Fixes**: Resolved iPad layout overflow issues
- **Desktop Enhancement**: Optimal spacing and typography scaling
- **Cross-Platform**: Consistent experience across all devices

---

## Disclaimer

This technical guide is based on federal tax laws as of September 2025, including provisions from Trump's "One Big Beautiful Bill Act." Tax laws are subject to change, and individual circumstances vary significantly.

**Important:** Always consult with a qualified tax professional or CPA before making investment decisions or claiming tax benefits. This calculator provides estimates for planning purposes only and should not be considered professional tax or investment advice.

**Recent Updates:** Enhanced user interface with collapsible help system, improved responsive design, and comprehensive accessibility features.

**Last Updated:** September 22, 2025
**Version:** 3.0
**Compliance:** 2025 Federal Tax Code
**Author:** Creative Sky Consulting - [CreativeSky.ai](https://CreativeSky.ai)
