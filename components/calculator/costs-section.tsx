"use client"
import { ChevronDown, ChevronUp, Receipt } from "../simple-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputField } from "./input-field"
import { SliderField } from "./slider-field"

interface CostsSectionProps {
  data: {
    managementFee: number
    platformFees: number
    lodgingTax: number
    propertyTax: number
    cleaningFees: number
    maintenance: number
    insurance: number
    utilities: number
    hoaFees: number
    other: number
  }
  onChange: (field: string, value: number) => void
  isOpen: boolean
  onToggle: () => void
}

export function CostsSection({ data, onChange, isOpen, onToggle }: CostsSectionProps) {
  return (
    <Card className={`transition-all duration-300 ease-in-out ${!isOpen ? "" : "py-3 gap-3"}`}>
      <CardHeader
        className={`${!isOpen ? "cursor-pointer hover:bg-muted/50 transition-colors pb-4" : "pb-3"}`}
        onClick={!isOpen ? onToggle : undefined}
      >
        <div
          className={`flex items-center justify-between ${isOpen ? "cursor-pointer" : ""}`}
          onClick={isOpen ? onToggle : undefined}
        >
          <div className="flex items-center gap-3">
            <Receipt className="h-5 w-5 text-red-600" />
            <CardTitle className="text-lg">Operating Costs</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">{isOpen ? "Collapse" : "Expand"}</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {!isOpen && (
        <CardContent
          className="pt-0 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={onToggle}
        ></CardContent>
      )}
      {isOpen && (
        <CardContent className="pt-0 px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Property-related fixed costs first */}
            <InputField
              label="Property Tax (Annual)"
              value={data.propertyTax}
              onChange={(value) => onChange("propertyTax", Number.parseFloat(value) || 0)}
              prefix="$"
              description="Annual property taxes assessed by local government. Based on assessed property value and local tax rates. STR properties may face higher assessments in some areas. Typically 0.5-2.5% of property value annually."
              placeholder="4800"
            />

            <InputField
              label="HOA Dues (Annual)"
              value={data.hoaFees}
              onChange={(value) => onChange("hoaFees", Number.parseFloat(value) || 0)}
              prefix="$"
              description="Annual homeowner association fees for condos, townhomes, or communities with shared amenities. Includes maintenance of common areas, amenities, and sometimes utilities like water/trash."
              placeholder="0"
            />

            <InputField
              label="Insurance (Annual)"
              value={data.insurance}
              onChange={(value) => onChange("insurance", Number.parseFloat(value) || 0)}
              prefix="$"
              description="Annual STR-specific insurance coverage beyond standard homeowner's policy. Includes liability protection, property damage from guests, and loss of income coverage. Providers: Proper, CBIZ, Farmers. Costs vary by property value and location."
              placeholder="2400"
            />

            <InputField
              label="Utilities (Monthly)"
              value={data.utilities}
              onChange={(value) => onChange("utilities", Number.parseFloat(value) || 0)}
              prefix="$"
              description="Monthly electricity, gas, water, trash, sewer, internet, and cable costs. STR properties use 20-40% more utilities than long-term rentals due to guest turnover and comfort expectations. Include high-speed internet and cable as they're essential for guest satisfaction."
              placeholder="300"
            />

            {/* Variable costs based on revenue/bookings */}
            <SliderField
              label="Management Fee (%)"
              value={data.managementFee}
              onChange={(value) => onChange("managementFee", value)}
              min={0}
              max={30}
              step={0.5}
              suffix="%"
              description="Percentage of gross revenue paid to property management companies. Most owners self-manage (0%) to maximize profits. Professional management typically charges 15-25% for full-service including guest communication, cleaning coordination, maintenance, and marketing."
            />

            <SliderField
              label="Platform Fees (%)"
              value={data.platformFees}
              onChange={(value) => onChange("platformFees", value)}
              min={0}
              max={15}
              step={0.1}
              suffix="%"
              description="Platform booking fees charged by Airbnb (typically 3% host fee) and VRBO (typically 5-8% commission). These are deducted from your payout automatically. Factor in payment processing fees and any additional service charges."
            />

            <InputField
              label="Cleaning Fee (Per Stay)"
              value={data.cleaningFees}
              onChange={(value) => onChange("cleaningFees", Number.parseFloat(value) || 0)}
              prefix="$"
              description="Cleaning fee charged to guests per booking. This will be used to calculate total cleaning revenue and actual cleaning costs (typically 60% of fee charged). Standard range is $75-150 depending on property size and local market rates."
              placeholder="125"
            />

            <InputField
              label="Maintenance (Annual)"
              value={data.maintenance}
              onChange={(value) => onChange("maintenance", Number.parseFloat(value) || 0)}
              prefix="$"
              description="Annual maintenance and repairs including HVAC servicing, plumbing, electrical, appliance repairs, and general upkeep. STR properties need 2-3x more maintenance than long-term rentals due to higher usage and guest wear."
              placeholder="6000"
            />

            {/* Tax and regulatory costs */}
            <InputField
              label="Lodging Tax (Annual)"
              value={data.lodgingTax}
              onChange={(value) => onChange("lodgingTax", Number.parseFloat(value) || 0)}
              prefix="$"
              description="Annual occupancy or transient lodging taxes paid to local government. Varies by location: 3-15% of gross revenue. Some cities have flat fees per night ($2-10). Check local regulations as this is often required for STR permits."
              placeholder="2400"
            />

            <InputField
              label="Other Expenses (Annual)"
              value={data.other}
              onChange={(value) => onChange("other", Number.parseFloat(value) || 0)}
              prefix="$"
              description="Additional annual expenses such as permits/licenses, accounting fees, legal costs, marketing expenses, guest amenities, or specialized software subscriptions. Include any costs not covered in other categories."
              placeholder="1000"
            />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
