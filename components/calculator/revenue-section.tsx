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
            <DollarSign className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Rental Details</CardTitle>
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
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <InputField
                label="Nightly Rate"
                value={data.averageNightlyRate}
                onChange={(value) => onChange("averageNightlyRate", Number.parseFloat(value) || 0)}
                prefix="$"
                description="Your base nightly rate before fees. Research comparable properties within 2-3 miles using AirDNA, Mashvisor, or Airbnb searches. This calculator assumes a minimum 2-night stay requirement to reduce turnover costs and attract quality guests."
                placeholder="200"
              />

              <InputField
                label="Cleaning Fee"
                value={data.cleaningFee}
                onChange={(value) => onChange("cleaningFee", Number.parseFloat(value) || 0)}
                prefix="$"
                description="One-time cleaning fee charged per booking (minimum 2 nights). Set competitively: Studio/1BR: $75-125, 2-3BR: $100-175, 4+BR: $150-300. Actual cleaning costs are calculated separately based on your occupancy rate."
                placeholder="75"
              />
            </div>

            <div>
              <SliderField
                label="Occupancy Rate"
                value={data.occupancyRate}
                onChange={(value) => onChange("occupancyRate", value)}
                min={30}
                max={95}
                suffix="%"
                description="Percentage of nights booked annually. Realistic targets: New properties 45-65% first year, established properties 65-85%. Consider seasonality and local market conditions when setting expectations."
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
