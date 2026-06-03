import * as React from "react"
import { cn } from "@/lib/utils"

export interface AdminLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const AdminLabel = React.forwardRef<HTMLLabelElement, AdminLabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "admin-label-text inline-flex items-center gap-1.5 mb-2",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 font-bold" aria-hidden="true">*</span>}
    </label>
  )
)
AdminLabel.displayName = "AdminLabel"

export { AdminLabel }
