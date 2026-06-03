import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "inverse" | "admin";
  size?: "default" | "sm" | "compact";
}

export function Input({ className, variant = "default", size = "default", ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full transition-field focus:outline-none",
        // Sizes
        size === "default" && "min-h-12 px-4 py-3 text-sm",
        size === "sm" && "min-h-10 px-3 py-2 text-[13px]",
        size === "compact" && "min-h-9 px-3 py-1.5 text-[13px]",
        // Variants
        variant === "default" &&
          "rounded-[var(--radius-sm)] border border-forest-200/70 bg-surface text-forest-900 shadow-[0_1px_0_rgba(26,42,29,0.03)] placeholder:text-text-muted/75 hover:border-forest-500/45 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 disabled:opacity-50 disabled:cursor-not-allowed aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15",
        variant === "inverse" && "field-dark rounded-[var(--radius-sm)] text-forest-900 disabled:opacity-50 disabled:cursor-not-allowed aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15",
        variant === "admin" && "rounded-lg bg-forest-900/5 border border-transparent text-forest-900 placeholder:text-forest-900/30 hover:bg-forest-900/10 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 disabled:opacity-50 disabled:bg-forest-900/5 disabled:hover:bg-forest-900/5 disabled:cursor-not-allowed aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50 aria-[invalid=true]:focus:ring-red-400/20 aria-[invalid=true]:focus:bg-white",
        className
      )}
      {...props}
    />
  );
}
