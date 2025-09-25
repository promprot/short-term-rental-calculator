"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { HelpCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SliderFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  description?: string
  suffix?: string
  className?: string
}

export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  description,
  suffix = "%",
  className,
}: SliderFieldProps) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <Label className="text-sm font-medium text-foreground truncate">{label}</Label>
          {description && (
            <button
              type="button"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -m-1"
              aria-label={`Toggle ${label} help`}
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          )}
        </div>
        <span className="text-sm sm:text-base font-semibold text-primary flex-shrink-0 min-w-[3rem] text-right">
          {value}
          {suffix}
        </span>
      </div>

      <div className="px-1 py-2">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={step}
          className="w-full [&_[role=slider]]:bg-slate-800 [&_[role=slider]]:border-slate-600 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 sm:[&_[role=slider]]:h-4 sm:[&_[role=slider]]:w-4"
        />
      </div>

      {description && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-in-out",
            isDescriptionOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="bg-muted/50 rounded-lg p-4 border border-dashed animate-in slide-in-from-top-2 duration-200">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
              <strong>{label} Info:</strong> {description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
