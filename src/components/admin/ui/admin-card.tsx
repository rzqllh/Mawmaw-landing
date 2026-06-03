import * as React from "react"
import { cn } from "@/lib/utils"

const AdminCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "admin-glass-panel text-forest-900",
        className
      )}
      {...props}
    />
  )
)
AdminCard.displayName = "AdminCard"

const AdminCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
AdminCardHeader.displayName = "AdminCardHeader"

const AdminCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-serif text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
AdminCardTitle.displayName = "AdminCardTitle"

const AdminCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
AdminCardContent.displayName = "AdminCardContent"

export { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardContent }
