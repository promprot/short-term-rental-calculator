// filepath: components/calculator/tax-benefits-section.tsx
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
import { cn } from "@/lib/utils"

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
            <Calculator className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">Tax Benefits</CardTitle>
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
          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
                description="Your marginal federal tax rate based on income level. For 2025: 37% bracket starts at $394,600 (married filing jointly). Higher tax rates mean greater savings from depreciation and business deductions."
              />
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-dashed">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="material-participation" className="text-sm font-medium">
                    Material Participation Status
                  </Label>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Qualify to offset other income with rental losses
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Switch
                    id="material-participation"
                    checked={data.materialParticipation}
                    onCheckedChange={(checked) => onChange("materialParticipation", checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Label htmlFor="spouse-hours" className="text-sm font-medium">
                      Annual STR Hours
                    </Label>
                    <button
                      type="button"
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
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 hours</SelectItem>
                      <SelectItem value="500">500 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-in-out",
                      isHoursDescriptionOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="bg-muted/50 rounded-lg p-4 border border-dashed">
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        <strong>Hours Requirement:</strong> 100+ hours with no one else participating more qualifies for
                        material participation. 500+ hours automatically qualifies, allowing rental losses to offset
                        other income.
                      </p>
                    </div>
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
