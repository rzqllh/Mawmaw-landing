"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import type { ImageAsset } from "@/data/public-content";
import { Lightbox } from "./lightbox";
import { ArrowsOut } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type LightboxTriggerProps = {
  images: ImageAsset[];
  initialIndex?: number;
  children: React.ReactNode;
  className?: string;
};

export function LightboxTrigger({ images, initialIndex = 0, children, className }: LightboxTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        role="button"
        tabIndex={0}
        aria-label="Buka gambar dalam tampilan penuh"
        className={cn("group relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2", className)}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        {children}
        
        {/* Subtle hover overlay hint */}
        <div className="absolute inset-0 bg-forest-900/0 transition-colors duration-300 group-hover:bg-forest-900/10 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 backdrop-blur-md text-forest-900 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <ArrowsOut className="w-5 h-5" />
          </div>
        </div>
      </div>

      {isOpen && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          <Lightbox
            images={images}
            initialIndex={initialIndex}
            onClose={() => setIsOpen(false)}
          />
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
