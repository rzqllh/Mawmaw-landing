import * as React from "react"
import { cn } from "@/lib/utils"

export interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full px-3 py-2 text-sm",
          "admin-input-base",
          error && "admin-input-error",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-forest-900/30",
          className
        )}
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
    )
  }
)
AdminInput.displayName = "AdminInput"

export { AdminInput }
