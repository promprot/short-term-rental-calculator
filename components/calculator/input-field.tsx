"use client"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface InputFieldProps {
  label: string
  value: string | number
  onChange: (value: string) => void
  description?: string
  type?: "text" | "number"
  prefix?: string
  suffix?: string
  placeholder?: string
  className?: string
}

export function InputField({
  label,
  value,
  onChange,
  description,
  type = "number",
  prefix,
  suffix,
  placeholder,
  className,
}: InputFieldProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const formatCurrency = (num: number): string => {
    if (isNaN(num) || num === 0) return ""
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const parseCurrency = (str: string): number => {
    if (!str) return 0
    const cleaned = str.replace(/[^0-9.]/g, "")
    const parsed = Number.parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (prefix === "$") {
      // Allow typing numbers, commas, and decimal points
      const cleanValue = inputValue.replace(/[^0-9.,]/g, "")
      onChange(parseCurrency(cleanValue).toString())
    } else {
      onChange(inputValue)
    }
  }

  const getDisplayValue = () => {
    const numValue = typeof value === "string" ? Number.parseFloat(value) || 0 : value

    if (prefix === "$" && numValue > 0) {
      return formatCurrency(numValue)
    } else if (prefix === "$") {
      return ""
    } else {
      return value.toString()
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Label htmlFor={label.replace(/\s+/g, "-").toLowerCase()}>{label}</Label>
        {description && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Toggle ${label} information`}
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="relative">
        {prefix && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{prefix}</div>}
        <Input
          id={label.replace(/\s+/g, "-").toLowerCase()}
          type="text"
          value={getDisplayValue()}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(prefix && "pl-8", suffix && "pr-8")}
        />
        {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{suffix}</div>}
      </div>
      {description && isDescriptionExpanded && (
        <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          <strong>{label} Info:</strong> {description}
        </div>
      )}
    </div>
  )
}
