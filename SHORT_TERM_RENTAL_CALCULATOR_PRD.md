# Short Term Rental Calculator - Product Requirements Document

## Overview
A comprehensive financial calculator for short-term rental property investments that helps users analyze revenue potential, operating costs, startup expenses, and tax benefits to make informed investment decisions.

## Technology Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons + custom simple-icons
- **Typography**: Geist Sans and Geist Mono fonts
- **Theme**: Light/dark mode toggle with system preference detection

## Page Structure & SEO

### Metadata
- **Title**: "Short Term Rental Calculator - Analyze Your Investment ROI"
- **Description**: "Calculate potential returns, costs, and tax benefits for your short-term rental property investment. Free comprehensive financial analysis tool."
- **Keywords**: "short term rental calculator, Airbnb calculator, rental property ROI, vacation rental investment"

### Header
- **Main Title**: "Short Term Rental Calculator"
- **Subtitle**: "Analyze your investment potential with comprehensive financial projections"
- **Theme Toggle**: Sun/moon icon in top-right corner

### Footer
- **Copyright**: "© 2025 Short Term Rental Calculator. All rights reserved."
- **Social Links**:
  - Twitter: https://twitter.com/strcalculator
  - LinkedIn: https://linkedin.com/company/strcalculator
  - GitHub: https://github.com/strcalculator

## Input Sections

### 1. Revenue & Performance Section
**Section Title**: "Revenue & Performance"
**Icon**: TrendingUp
**Collapsible**: Yes (default: expanded)

#### Fields:
1. **Average Daily Rate (ADR)**
   - Type: Currency input
   - Default: $150
   - Placeholder: "Enter daily rate"
   - Help: "Average nightly rate you plan to charge guests"

2. **Occupancy Rate**
   - Type: Slider (0-100%)
   - Default: 70%
   - Help: "Percentage of nights booked per year"

3. **Seasonal Adjustment**
   - Type: Slider (0-50%)
   - Default: 20%
   - Help: "Revenue variation due to seasonal demand"

4. **Cleaning Fee per Stay**
   - Type: Currency input
   - Default: $75
   - Placeholder: "Enter cleaning fee"
   - Help: "One-time cleaning fee charged per booking"

5. **Average Stay Length**
   - Type: Number input (1-30 days)
   - Default: 3
   - Placeholder: "Enter days"
   - Help: "Average number of nights per booking"

### 2. Operating Costs Section
**Section Title**: "Operating Costs"
**Icon**: Calculator
**Collapsible**: Yes (default: expanded)

#### Fields:
1. **Property Management Fee**
   - Type: Percentage slider (0-30%)
   - Default: 15%
   - Help: "Fee charged by property management company"

2. **Platform Fees (Airbnb, VRBO)**
   - Type: Percentage slider (0-20%)
   - Default: 6%
   - Help: "Combined fees from booking platforms"

3. **Cleaning Costs per Stay**
   - Type: Currency input
   - Default: $60
   - Placeholder: "Enter cleaning cost"
   - Help: "Your cost for professional cleaning service"

4. **Utilities (Monthly)**
   - Type: Currency input
   - Default: $200
   - Placeholder: "Enter monthly utilities"
   - Help: "Electricity, water, gas, internet, cable"

5. **Insurance (Annual)**
   - Type: Currency input
   - Default: $2000
   - Placeholder: "Enter annual insurance"
   - Help: "Short-term rental insurance premium"

6. **Property Taxes (Annual)**
   - Type: Currency input
   - Default: $3000
   - Placeholder: "Enter annual taxes"
   - Help: "Annual property tax assessment"

7. **Maintenance & Repairs (Annual)**
   - Type: Currency input
   - Default: $2500
   - Placeholder: "Enter annual maintenance"
   - Help: "Regular upkeep and unexpected repairs"

8. **Supplies & Amenities (Monthly)**
   - Type: Currency input
   - Default: $150
   - Placeholder: "Enter monthly supplies"
   - Help: "Toiletries, linens, coffee, snacks, etc."

### 3. Startup & Investment Section
**Section Title**: "Startup & Investment"
**Icon**: DollarSign
**Collapsible**: Yes (default: expanded)

#### Fields:
1. **Property Purchase Price**
   - Type: Currency input
   - Default: $300000
   - Placeholder: "Enter purchase price"
   - Help: "Total cost to acquire the property"

2. **Down Payment**
   - Type: Percentage slider (0-100%)
   - Default: 25%
   - Help: "Percentage of purchase price paid upfront"

3. **Mortgage Interest Rate**
   - Type: Percentage slider (0-15%)
   - Default: 6.5%
   - Help: "Annual interest rate on your mortgage"

4. **Loan Term**
   - Type: Slider (10-30 years)
   - Default: 30
   - Help: "Length of mortgage in years"

5. **Initial Furnishing & Setup**
   - Type: Currency input
   - Default: $15000
   - Placeholder: "Enter setup costs"
   - Help: "Furniture, appliances, initial supplies"

6. **Renovation Costs**
   - Type: Currency input
   - Default: $10000
   - Placeholder: "Enter renovation costs"
   - Help: "Improvements needed before listing"

### 4. Tax Benefits Section
**Section Title**: "Tax Benefits"
**Icon**: Receipt
**Collapsible**: Yes (default: expanded)

#### Fields:
1. **Personal Tax Rate**
   - Type: Percentage slider (10-50%)
   - Default: 24%
   - Help: "Your marginal income tax rate"

2. **Personal Use Days**
   - Type: Number input (0-365)
   - Default: 14
   - Placeholder: "Enter days"
   - Help: "Days you personally use the property"

3. **Property Depreciation Period**
   - Type: Slider (10-40 years)
   - Default: 27.5
   - Help: "IRS depreciation schedule (27.5 years residential)"

## Output Sections

### 1. Revenue Performance Output
**Section Title**: "Revenue Performance"
**Icon**: TrendingUp

#### Metrics Displayed:
1. **Gross Annual Revenue**: Calculated total revenue before expenses
2. **Average Monthly Revenue**: Gross annual revenue ÷ 12
3. **Revenue per Available Night**: Daily rate × occupancy rate
4. **Seasonal Revenue Range**: Base revenue ± seasonal adjustment
5. **Total Annual Bookings**: Based on occupancy and average stay length
6. **Cleaning Fee Revenue**: Annual cleaning fees collected

### 2. Expense Summary Output
**Section Title**: "Expense Summary"
**Icon**: Calculator

#### Metrics Displayed:
1. **Total Annual Operating Expenses**: Sum of all operating costs
2. **Monthly Operating Expenses**: Annual expenses ÷ 12
3. **Mortgage Payment (P&I)**: Principal and interest payment
4. **Operating Expense Ratio**: Operating expenses ÷ gross revenue
5. **Cost per Booking**: Total costs ÷ number of bookings
6. **Variable Costs**: Costs that change with bookings
7. **Fixed Costs**: Costs that remain constant

### 3. Investment Performance Output
**Section Title**: "Investment Performance"
**Icon**: DollarSign

#### Metrics Displayed:
1. **Net Operating Income (NOI)**: Revenue - operating expenses
2. **Cash Flow (Before Tax)**: NOI - mortgage payments
3. **Cash-on-Cash Return**: Cash flow ÷ initial investment
4. **Cap Rate**: NOI ÷ property value
5. **Total ROI**: (Cash flow + tax benefits) ÷ initial investment
6. **Break-Even Occupancy**: Minimum occupancy to cover expenses
7. **Payback Period**: Time to recover initial investment

### 4. Tax Benefits Output
**Section Title**: "Tax Benefits"
**Icon**: Receipt

#### Metrics Displayed:
1. **Annual Depreciation Deduction**: Property value ÷ depreciation period
2. **Deductible Operating Expenses**: Tax-deductible business expenses
3. **Mortgage Interest Deduction**: Deductible portion of interest
4. **Total Tax Deductions**: Sum of all deductible expenses
5. **Estimated Tax Savings**: Deductions × tax rate
6. **Effective Tax Reduction**: Tax savings as % of total tax burden

## Calculation Logic

### Revenue Calculations
- **Gross Annual Revenue** = (ADR × 365 × Occupancy Rate) + (Cleaning Fee × Annual Bookings)
- **Annual Bookings** = (365 × Occupancy Rate) ÷ Average Stay Length
- **Seasonal Adjustment** = Base Revenue × (1 ± Seasonal Percentage)

### Expense Calculations
- **Monthly Mortgage Payment** = PMT(Interest Rate/12, Loan Term×12, Loan Amount)
- **Loan Amount** = Purchase Price × (1 - Down Payment %)
- **Operating Expense Ratio** = Total Operating Expenses ÷ Gross Revenue
- **Variable Costs** = Cleaning Costs + Platform Fees + Management Fees
- **Fixed Costs** = Insurance + Property Taxes + Utilities + Maintenance

### Investment Performance Calculations
- **Net Operating Income** = Gross Revenue - Operating Expenses
- **Cash Flow** = NOI - Mortgage Payments
- **Cash-on-Cash Return** = Annual Cash Flow ÷ Total Initial Investment
- **Cap Rate** = NOI ÷ Property Purchase Price
- **Total Initial Investment** = Down Payment + Furnishing + Renovation Costs

### Tax Benefit Calculations
- **Annual Depreciation** = (Purchase Price - Land Value) ÷ Depreciation Period
- **Business Use Percentage** = (365 - Personal Use Days) ÷ 365
- **Deductible Expenses** = Operating Expenses × Business Use Percentage
- **Tax Savings** = Total Deductions × Personal Tax Rate
- **Effective Tax Reduction** = Tax Savings ÷ (Income × Tax Rate) × 100

## Design Specifications

### Color Scheme
- **Primary**: Blue (#3b82f6)
- **Secondary**: Slate gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Geist Sans, font-semibold
- **Body**: Geist Sans, font-normal
- **Code/Numbers**: Geist Mono

### Layout
- **Container**: Max width 1200px, centered
- **Grid**: 2-column layout on desktop (inputs left, outputs right)
- **Mobile**: Single column, stacked layout
- **Spacing**: Consistent 1rem (16px) spacing throughout
- **Cards**: Rounded corners (8px), subtle shadows

### Interactive Elements
- **Sliders**: Custom styled with blue track and thumb
- **Inputs**: Border focus states, validation styling
- **Buttons**: Hover and active states
- **Collapsible Sections**: Smooth expand/collapse animations
- **Theme Toggle**: Smooth transition between light/dark modes

### Responsive Behavior
- **Desktop (1024px+)**: 2-column layout, full feature set
- **Tablet (768px-1023px)**: Single column, maintained spacing
- **Mobile (< 768px)**: Compact layout, touch-friendly controls
- **All Breakpoints**: Readable text, accessible touch targets

## Accessibility Features
- **ARIA Labels**: All form controls properly labeled
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic HTML structure
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Focus Indicators**: Visible focus states for all interactive elements

## Performance Requirements
- **Initial Load**: < 2 seconds on 3G connection
- **Calculation Speed**: Real-time updates as user types
- **Bundle Size**: Optimized component loading
- **SEO**: Server-side rendering for search engine optimization

## Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

## Future Enhancement Considerations
- **Data Persistence**: Save calculations locally
- **Comparison Tool**: Compare multiple properties
- **Market Data Integration**: Real-time market rates
- **PDF Export**: Generate investment reports
- **Advanced Tax Scenarios**: More complex tax situations

## Critical Implementation Details

### Component Architecture
The application uses a modular component structure:
- **Main Page**: `app/page.tsx` - Contains all calculation logic and state management
- **Input Sections**: 4 collapsible sections with grouped related fields
- **Output Sections**: 4 sections displaying calculated results in real-time
- **Shared Components**: InputField, SliderField for consistent form controls

### State Management
- **Single State Object**: All form data stored in one React state object
- **Real-time Calculations**: All outputs recalculate immediately when inputs change
- **No External State**: Pure React state, no Redux or external state management

### Input Field Specifications

#### InputField Component Props:
- `label`: Display name for the field
- `value`: Current numeric value
- `onChange`: Callback function for value changes
- `placeholder`: Placeholder text for empty fields
- `help`: Tooltip text explaining the field
- `type`: "currency" or "number" or "percentage"
- `min`/`max`: Validation bounds for numeric inputs

#### SliderField Component Props:
- `label`: Display name for the slider
- `value`: Current numeric value
- `onChange`: Callback function for value changes
- `min`/`max`: Slider range bounds
- `step`: Increment step (default: 1)
- `suffix`: Display suffix (%, years, etc.)
- `help`: Tooltip text explaining the field

### Exact Default Values
\`\`\`javascript
const defaultValues = {
  // Revenue & Performance
  averageDailyRate: 150,
  occupancyRate: 70,
  seasonalAdjustment: 20,
  cleaningFeePerStay: 75,
  averageStayLength: 3,
  
  // Operating Costs
  propertyManagementFee: 15,
  platformFees: 6,
  cleaningCostsPerStay: 60,
  utilitiesMonthly: 200,
  insuranceAnnual: 2000,
  propertyTaxesAnnual: 3000,
  maintenanceAnnual: 2500,
  suppliesMonthly: 150,
  
  // Startup & Investment
  propertyPurchasePrice: 300000,
  downPayment: 25,
  mortgageInterestRate: 6.5,
  loanTerm: 30,
  initialFurnishing: 15000,
  renovationCosts: 10000,
  
  // Tax Benefits
  personalTaxRate: 24,
  personalUseDays: 14,
  propertyDepreciationPeriod: 27.5
}
\`\`\`

### Critical Calculation Formulas

#### Mortgage Payment Calculation (PMT Function):
\`\`\`javascript
const monthlyRate = annualRate / 12;
const numPayments = loanTermYears * 12;
const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                      (Math.pow(1 + monthlyRate, numPayments) - 1);
\`\`\`

#### Tax Benefits Business Use Percentage:
\`\`\`javascript
const businessUsePercentage = Math.max(0, (365 - personalUseDays) / 365);
\`\`\`

#### Material Participation Rule:
- If personal use days > 14 OR > 10% of rental days, then personal use property
- Affects deductibility of expenses and depreciation

### Layout Structure
- **Desktop**: 2-column grid (inputs left 50%, outputs right 50%)
- **Mobile**: Single column stack
- **Section Spacing**: 2rem between major sections
- **Card Padding**: 1.5rem internal padding
- **Input Spacing**: 1rem between form fields

### Theme Implementation
- **CSS Variables**: Uses CSS custom properties for theming
- **Dark Mode**: Automatic system preference detection + manual toggle
- **Color Tokens**: Semantic color naming (background, foreground, muted, etc.)

### Icons Used
- **TrendingUp**: Revenue sections
- **Calculator**: Cost/expense sections  
- **DollarSign**: Investment/financial sections
- **Receipt**: Tax-related sections
- **Sun/Moon**: Theme toggle
- **ChevronDown/ChevronUp**: Collapsible section indicators
- **HelpCircle**: Help tooltip triggers

### Validation Rules
- **Currency Fields**: Minimum $0, maximum $10,000,000
- **Percentage Fields**: 0% to 100% (some exceptions like seasonal adjustment 0-50%)
- **Day Fields**: 1 to 365 days
- **Year Fields**: 10 to 40 years (loan term, depreciation)
- **Real-time Validation**: No form submission, immediate feedback

### Error Handling
- **Division by Zero**: Handled in all calculations
- **Negative Values**: Prevented in UI, handled in calculations
- **Invalid Inputs**: Graceful fallback to default values
- **NaN Prevention**: All calculations check for valid numbers

### Accessibility Implementation
- **ARIA Labels**: `aria-label` on all form controls
- **ARIA Described By**: Help text linked via `aria-describedby`
- **Keyboard Navigation**: Tab order follows logical flow
- **Screen Reader**: Semantic HTML with proper heading hierarchy
- **Focus Management**: Visible focus indicators on all interactive elements

### Performance Optimizations
- **React.memo**: Memoized components to prevent unnecessary re-renders
- **useMemo**: Expensive calculations memoized
- **Debounced Updates**: Input changes debounced for smooth performance
- **Lazy Loading**: Components loaded as needed

### SEO Meta Tags Required
\`\`\`html
<title>Short Term Rental Calculator - Analyze Your Investment ROI</title>
<meta name="description" content="Calculate potential returns, costs, and tax benefits for your short-term rental property investment. Free comprehensive financial analysis tool." />
<meta name="keywords" content="short term rental calculator, Airbnb calculator, rental property ROI, vacation rental investment" />
<meta property="og:title" content="Short Term Rental Calculator" />
<meta property="og:description" content="Analyze your investment potential with comprehensive financial projections" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
\`\`\`

### Font Loading Configuration
\`\`\`javascript
// In layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})
\`\`\`

### CSS Custom Properties (globals.css)
\`\`\`css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  
  /* Light mode colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --ring: 217.2 91.2% 59.8%;
  }
}
\`\`\`

### Required Dependencies
\`\`\`json
{
  "dependencies": {
    "next": "15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^4.0.0",
    "lucide-react": "latest",
    "@radix-ui/react-slider": "latest",
    "@radix-ui/react-tooltip": "latest",
    "@radix-ui/react-collapsible": "latest"
  }
}
