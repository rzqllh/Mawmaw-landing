import * as React from "react"
import { cn } from "@/lib/utils"

export interface AdminPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  backButton?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  action,
  backButton,
  className,
  ...props
}: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 mb-8 pb-6 border-b border-forest-900/10", className)} {...props}>
      {backButton && <div className="mb-2">{backButton}</div>}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-forest-900 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-text-secondary max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
