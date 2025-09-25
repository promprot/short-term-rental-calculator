import type * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("bg-card text-card-foreground flex flex-col gap-2 rounded-xl border py-6 shadow-sm", className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto] items-start gap-1 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div>
      <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />
    </div>
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={className} {...props}></div>
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div>
      <div
        data-slot="card-action"
        className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
        {...props}
      />
    </div>
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div>
      <div data-slot="card-content" className={cn("px-4", className)} {...props} />
    </div>
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div>
      <div data-slot="card-footer" className={cn("flex items-center px-4 [.border-t]:pt-6", className)} {...props} />
    </div>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
