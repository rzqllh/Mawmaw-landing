"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react/dist/ssr";

import type { NavItem } from "@/data/public-content";
import { Button } from "@/components/ui/button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  primaryHref: string;
  portfolioHref: string;
};

export function MobileMenu({
  open,
  onClose,
  navItems,
  primaryHref,
  portfolioHref,
}: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-forest-900/38 backdrop-blur-sm"
            aria-label="Tutup menu"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi utama"
            className="glass-strong absolute inset-x-3 bottom-3 rounded-xl p-5 shadow-glass"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-semibold text-forest-900">Menu</span>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-forest-900 hover:bg-forest-50"
                aria-label="Tutup menu"
                onClick={onClose}
              >
                <X aria-hidden className="h-5 w-5" weight="bold" />
              </button>
            </div>
            <nav aria-label="Navigasi seluler">
              <ul className="grid gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex rounded-md px-3 py-3 text-base font-semibold text-forest-900 hover:bg-forest-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-5 grid gap-3">
              <Button asChild size="lg">
                <Link href={primaryHref} onClick={onClose}>
                  Konsultasi via WhatsApp
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={portfolioHref} onClick={onClose}>
                  Lihat Portfolio
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
