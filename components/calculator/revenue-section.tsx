"use client"
import { ChevronDown, ChevronUp, DollarSign } from "../simple-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputField } from "./input-field"
import { SliderField } from "./slider-field"

interface RevenueSectionProps {
  data: {
    averageNightlyRate: number
    occupancyRate: number
    cleaningFee: number
  }
  onChange: (field: string, value: number) => void
  isOpen: boolean
  onToggle: () => void
}

export function RevenueSection({ data, onChange, isOpen, onToggle }: RevenueSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Rental Details
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
            ${data.averageNightlyRate}/night • {data.occupancyRate}% occupancy • ${data.cleaningFee} cleaning fee
          </div>
        </CardContent>
      )}
      {isOpen && (
        <CardContent className="space-y-6">
          <InputField
            label="Average Nightly Rate"
            value={data.averageNightlyRate}
            onChange={(value) => onChange("averageNightlyRate", Number.parseFloat(value) || 0)}
            prefix="$"
            description="Your base nightly rate before fees. Research comparable properties within 2-3 miles using AirDNA, Mashvisor, or Airbnb searches. This calculator assumes a minimum 2-night stay requirement to reduce turnover costs and attract quality guests."
            placeholder="200"
          />
          <InputField
            label="Cleaning Fee per Stay"
            value={data.cleaningFee}
            onChange={(value) => onChange("cleaningFee", Number.parseFloat(value) || 0)}
            prefix="$"
            description="One-time cleaning fee charged per booking (minimum 2 nights). Set competitively: Studio/1BR: $75-125, 2-3BR: $100-175, 4+BR: $150-300. Actual cleaning costs are calculated separately based on your occupancy rate."
            placeholder="75"
          />

          <SliderField
            label="Occupancy Rate"
            value={data.occupancyRate}
            onChange={(value) => onChange("occupancyRate", value)}
            min={30}
            max={95}
            suffix="%"
            description="Percentage of nights booked annually. Realistic targets: New properties 45-65% first year, established properties 65-85%. Consider seasonality and local market conditions when setting expectations."
          />
        </CardContent>
      )}
    </Card>
  )
}
