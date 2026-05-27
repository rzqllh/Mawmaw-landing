import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  strong?: boolean;
};

export function GlassCard({ className, strong, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass-surface",
        "rounded-xl",
        className
      )}
      {...props}
    />
  );
}
