"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface AdminMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function AdminMobileDrawer({ open, onClose, children }: AdminMobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle Escape key
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when drawer is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Focus trap: focus the drawer when it opens
  useEffect(() => {
    if (open && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-forest-900/30 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        tabIndex={-1}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl shadow-forest-900/10 transition-transform duration-300 ease-out flex flex-col focus:outline-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-forest-900/50 hover:text-forest-900 hover:bg-forest-900/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
          >
            <X weight="bold" className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content (same sidebar) */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
