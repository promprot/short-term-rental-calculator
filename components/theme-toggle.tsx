"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
  }

  const currentTheme = theme || resolvedTheme || "dark"
  const isDark = currentTheme === "dark"

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="bg-gray-100 dark:bg-gray-800 flex gap-0.5 items-center h-fit overflow-hidden rounded-full border p-0 focus-within:overflow-visible"
      tabIndex={0}
    >
      <button
        type="button"
        role="tab"
        aria-selected={!isDark}
        onClick={() => setTheme("light")}
        className="ring-offset-background relative inline-flex justify-center gap-1.5 whitespace-nowrap rounded-full bg-transparent px-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all hover:text-gray-900 dark:hover:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 items-center h-[28px]"
      >
        {!isDark && (
          <div className="absolute inset-0 rounded-full bg-white dark:bg-gray-600 shadow-sm border border-gray-300 dark:border-gray-500" />
        )}
        <div className="relative z-10 flex items-center gap-1.5">
          <Sun className="h-4 w-4" />
          <span className="sr-only">Light</span>
        </div>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={isDark}
        onClick={() => setTheme("dark")}
        className="ring-offset-background relative inline-flex justify-center gap-1.5 whitespace-nowrap rounded-full bg-transparent px-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all hover:text-gray-900 dark:hover:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 items-center h-[28px]"
      >
        {isDark && (
          <div className="absolute inset-0 rounded-full bg-white dark:bg-gray-600 shadow-sm border border-gray-300 dark:border-gray-500" />
        )}
        <div className="relative z-10 flex items-center gap-1.5">
          <Moon className="h-4 w-4" />
          <span className="sr-only">Dark</span>
        </div>
      </button>
    </div>
  )
}
