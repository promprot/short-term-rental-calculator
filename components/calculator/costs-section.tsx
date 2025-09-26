"use client"
import { ChevronDown, ChevronUp, Receipt } from "../simple-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputField } from "./input-field"
import { SliderField } from "./slider-field"

interface CostsSectionProps {
  data: {
    cleaningFee: number
    managementFee: number
    platformFees: number
    lodgingTax: number
    propertyTax: number
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
            Costs
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            {isOpen ? "Collapse" : "Expand"}
            {isOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      {!isOpen && (
        <CardContent>
          <div className="text-sm text-muted-foreground">
            ${data.cleaningFee} cleaning fee • {data.managementFee}% management • {data.platformFees}% platform fees
          </div>
        </CardContent>
      )}
      {isOpen && (
        <CardContent className="space-y-6">
          <InputField
            label="Cleaning Fee per Stay"
            value={data.cleaningFee}
            onChange={(value) => onChange("cleaningFee", Number.parseFloat(value) || 0)}
            prefix="$"
            description="One-time cleaning fee charged per booking (minimum 2 nights). Set competitively: Studio/1BR: $75-125, 2-3BR: $100-175, 4+BR: $150-300. This fee is revenue to you - actual cleaning costs are calculated separately based on your occupancy rate."
            placeholder="125"
          />
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
            label="HOA Fees (Annual)"
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
            label="Management Fee"
            value={data.managementFee}
            onChange={(value) => onChange("managementFee", value)}
            min={0}
            max={30}
            step={0.5}
            suffix="%"
            description="Percentage of gross revenue paid to property management companies. Most owners self-manage (0%) to maximize profits. Professional management typically charges 15-25% for full-service including guest communication, cleaning coordination, maintenance, and marketing."
          />
          <SliderField
            label="Platform Fees"
            value={data.platformFees}
            onChange={(value) => onChange("platformFees", value)}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
            description="Platform booking fees charged by Airbnb (typically 3% host fee) and VRBO (typically 5-8% commission). These are deducted from your payout automatically. Factor in payment processing fees and any additional service charges."
          />
          <InputField
            label="Maintenance & Repairs (Annual)"
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
        </CardContent>
      )}
    </Card>
  )
}
