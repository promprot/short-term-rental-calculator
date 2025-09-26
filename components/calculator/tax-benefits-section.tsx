"use client"
import { ChevronDown, ChevronUp, Calculator, HelpCircle } from "../simple-icons"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputField } from "./input-field"
import { SliderField } from "./slider-field"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaxBenefitsSectionProps {
  data: {
    annualIncome: number
    federalTaxRate: number
    spouseHours: number
    materialParticipation: boolean
  }
  onChange: (field: string, value: number | boolean) => void
  isOpen: boolean
  onToggle: () => void
}

export function TaxBenefitsSection({ data, onChange, isOpen, onToggle }: TaxBenefitsSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US").format(amount)
  }

  const [isHoursDescriptionOpen, setIsHoursDescriptionOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Calculator className="h-4 w-4 text-primary" />
            </div>
            Benefits
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
            ${formatCurrency(data.annualIncome)} income • {data.federalTaxRate}% tax rate • {data.spouseHours} hours
          </div>
        </CardContent>
      )}
      {isOpen && (
        <CardContent className="space-y-6">
          <InputField
            label="Annual Income"
            value={data.annualIncome}
            onChange={(value) => onChange("annualIncome", Number.parseFloat(value) || 0)}
            prefix="$"
            description="Your total annual income from employment and other sources. This determines your tax bracket and potential savings from STR tax benefits. High earners ($400K+) see the greatest benefit."
            placeholder={formatCurrency(400000)}
          />
          <SliderField
            label="Federal Tax Rate"
            value={data.federalTaxRate}
            onChange={(value) => onChange("federalTaxRate", value)}
            min={10}
            max={37}
            step={1}
            suffix="%"
            description="Your marginal federal tax rate based on income level. For 2025: 37% bracket starts at $394,600 (married filing jointly). Higher tax rates mean greater savings from depreciation and business deductions under Trump's permanent tax reforms."
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="material-participation">Material Participation Status</Label>
                <div className="text-sm text-muted-foreground">Qualify to offset other income with rental losses</div>
              </div>
              <Switch
                id="material-participation"
                checked={data.materialParticipation}
                onCheckedChange={(checked) => onChange("materialParticipation", checked)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="spouse-hours">Annual STR Hours</Label>
                <button
                  onClick={() => setIsHoursDescriptionOpen(!isHoursDescriptionOpen)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                  aria-label="Toggle Annual STR Hours help"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              <Select
                value={data.spouseHours.toString()}
                onValueChange={(value) => onChange("spouseHours", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 hours</SelectItem>
                  <SelectItem value="500">500 hours</SelectItem>
                </SelectContent>
              </Select>
              {isHoursDescriptionOpen && (
                <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
                  <strong>Material Participation Info:</strong> Material participation allows STR losses to offset other
                  income. Requires 500+ hours annually OR 100+ hours with no one else participating more. Spouse hours
                  count toward your total participation time.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
