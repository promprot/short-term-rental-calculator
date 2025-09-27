"use client"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { HelpCircle } from "lucide-react"
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
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>{label}</Label>
          {description && (
            <button
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -m-1"
              aria-label={`Toggle ${label} help`}
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="text-sm font-medium">
          {value}
          {suffix}
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full [&_[role=slider]]:bg-slate-800 [&_[role=slider]]:border-slate-600 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 sm:[&_[role=slider]]:h-4 sm:[&_[role=slider]]:w-4"
      />
      {description && (
        <div
          className={cn(
            "rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground transition-all duration-200",
            isDescriptionOpen ? "block" : "hidden",
          )}
        >
          {description}
        </div>
      )}
    </div>
  )
}
