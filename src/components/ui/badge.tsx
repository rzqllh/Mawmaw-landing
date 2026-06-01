import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "dark" | "gold" | "overlay";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold",
        variant === "default" &&
          "bg-forest-50 text-forest-800 ring-1 ring-forest-200/70",
        variant === "dark" && "bg-forest-900 text-text-inverse",
        variant === "gold" && "bg-gold-500/18 text-forest-900",
        variant === "overlay" && "border border-text-inverse/18 bg-text-inverse/18 text-text-inverse backdrop-blur-lg uppercase tracking-[0.08em] !text-[0.68rem] !font-extrabold",
        className
      )}
      {...props}
    />
  );
}
