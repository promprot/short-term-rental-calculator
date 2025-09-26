"use client"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
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
        const formatted = formatCurrency(numValue)
        setDisplayValue(formatted)
      } else if (prefix === "$") {
        setDisplayValue("")
      } else {
        setDisplayValue(value.toString())
      }
    }
  }, [value, isFocused, prefix])

  useEffect(() => {
    const numValue = typeof value === "string" ? Number.parseFloat(value) || 0 : value
    if (prefix === "$" && numValue > 0) {
      setDisplayValue(formatCurrency(numValue))
    } else if (prefix === "$") {
      setDisplayValue("")
    } else {
      setDisplayValue(value.toString())
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (prefix === "$") {
      const cleanValue = inputValue.replace(/[^0-9.,]/g, "")
      setDisplayValue(cleanValue)
      // Don't call onChange here - only on blur to prevent feedback loop
    } else {
      setDisplayValue(inputValue)
      onChange(inputValue)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (prefix === "$") {
      const numValue = typeof value === "string" ? Number.parseFloat(value) || 0 : value
      setDisplayValue(numValue > 0 ? numValue.toString() : "")
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (prefix === "$") {
      const numValue = parseCurrency(displayValue)
      onChange(numValue.toString())

      // Format for display
      if (numValue > 0) {
        setDisplayValue(formatCurrency(numValue))
      } else {
        setDisplayValue("")
      }
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
          type={type}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
