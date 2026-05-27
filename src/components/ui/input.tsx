import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "min-h-12 w-full rounded-sm border border-forest-200/70 bg-surface px-4 py-3 text-sm text-forest-900 shadow-[0_1px_0_rgba(26,42,29,0.03)] transition placeholder:text-text-muted/75 hover:border-forest-500/45 focus:border-gold-500 focus:outline-none focus:ring-4 focus:ring-gold-500/15",
        className
      )}
      {...props}
    />
  );
}
