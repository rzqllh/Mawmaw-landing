"use client";

import { useDominantColor } from "@/hooks/use-dominant-color";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type AmbientGlowProps = {
  imageSrc: string;
  className?: string;
  opacity?: number;
};

export function AmbientGlow({ imageSrc, className, opacity = 0.08 }: AmbientGlowProps) {
  const dominantColor = useDominantColor(imageSrc);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const style = dominantColor 
    ? { 
        background: `radial-gradient(circle at 50% 0%, rgba(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b}, ${opacity}), transparent 70%)` 
      }
    : {};

  return (
    <div 
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 transition-colors duration-1000 ease-in-out",
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}
