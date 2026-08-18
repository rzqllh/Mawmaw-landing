import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "inverse" | "admin";
  inputSize?: "default" | "sm" | "compact"; // Using inputSize because Textarea doesn't have native size, but for consistency
}

export function Textarea({ className, variant = "default", inputSize = "default", ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex w-full transition-field focus:outline-none",
        // Sizes
        inputSize === "default" && "min-h-[9rem] px-4 py-3 text-sm",
        inputSize === "sm" && "min-h-[7rem] px-3 py-2 text-[13px]",
        inputSize === "compact" && "min-h-[5rem] px-3 py-2 text-[13px]",
        // Variants
        variant === "default" &&
          "rounded-[var(--radius-sm)] border border-forest-200/70 bg-surface text-forest-900 shadow-[0_1px_0_rgba(26,42,29,0.03)] placeholder:text-text-muted/75 hover:border-forest-500/45 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 disabled:opacity-50 disabled:cursor-not-allowed aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15",
        variant === "inverse" && "field-dark rounded-[var(--radius-sm)] text-forest-900 disabled:opacity-50 disabled:cursor-not-allowed aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15",
        variant === "admin" && "rounded-lg bg-forest-900/5 border border-transparent text-forest-900 placeholder:text-forest-900/55 hover:bg-forest-900/10 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 disabled:opacity-50 disabled:bg-forest-900/5 disabled:hover:bg-forest-900/5 disabled:cursor-not-allowed aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50 aria-[invalid=true]:focus:ring-red-400/20 aria-[invalid=true]:focus:bg-white",
        className
      )}
      {...props}
    />
  );
}
