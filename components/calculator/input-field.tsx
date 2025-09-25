"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lightbulb, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

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
  const [displayValue, setDisplayValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
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
    // Remove commas and parse as float
    const cleaned = str.replace(/,/g, "")
    const parsed = Number.parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }

  useEffect(() => {
    if (!isFocused) {
      const numValue = typeof value === "string" ? Number.parseFloat(value) || 0 : value
      if (prefix === "$" && numValue > 0) {
        setDisplayValue(formatCurrency(numValue))
      } else {
        setDisplayValue(value.toString())
      }
    }
  }, [value, isFocused, prefix])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (prefix === "$") {
      // Allow typing numbers, commas, and decimal points
      const cleanValue = inputValue.replace(/[^0-9.,]/g, "")
      setDisplayValue(cleanValue)

      // Parse and send numeric value to parent
      const numericValue = parseCurrency(cleanValue)
      onChange(numericValue.toString())
    } else {
      setDisplayValue(inputValue)
      onChange(inputValue)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (prefix === "$") {
      // Show raw numeric value for editing
      const numValue = typeof value === "string" ? Number.parseFloat(value) || 0 : value
      setDisplayValue(numValue > 0 ? numValue.toString() : "")
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (prefix === "$") {
      // Format for display
      const numValue = parseCurrency(displayValue)
      if (numValue > 0) {
        setDisplayValue(formatCurrency(numValue))
        onChange(numValue.toString())
      } else {
        setDisplayValue("")
        onChange("0")
      }
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2.5">
        <Label htmlFor={label.replace(/\s+/g, "-").toLowerCase()} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        {description && (
          <button
            type="button"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Toggle ${label} information`}
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>
        )}
        <Input
          id={label.replace(/\s+/g, "-").toLowerCase()}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400",
            prefix && "pl-8",
            suffix && "pr-12",
          )}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>
        )}
      </div>

      {description && isDescriptionExpanded && (
        <div className="bg-muted/50 rounded-lg p-4 border border-dashed animate-in slide-in-from-top-2 duration-200">
          <p className="text-xs text-muted-foreground">
            <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" />
            <strong>{label} Info:</strong> {description}
          </p>
        </div>
      )}
    </div>
  )
}
