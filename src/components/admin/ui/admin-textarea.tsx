import * as React from "react"
import { cn } from "@/lib/utils"

export interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const AdminTextarea = React.forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full px-3 py-2 text-sm",
          "admin-input-base resize-y",
          error && "admin-input-error",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "placeholder:text-forest-900/55",
          className
        )}
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
    )
  }
)
AdminTextarea.displayName = "AdminTextarea"

export { AdminTextarea }
