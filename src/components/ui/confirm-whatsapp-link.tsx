"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";

type ConfirmWhatsappLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  modalTitle?: string;
  modalDescription?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

function openExternalLink(href: string, target: string) {
  if (target === "_self") {
    window.location.assign(href);
    return;
  }

  const opened = window.open(href, target, "noopener,noreferrer");

  if (!opened) {
    window.location.assign(href);
  }
}

export function ConfirmWhatsappLink({
  href,
  onClick,
  rel,
  target,
  modalTitle = "Lanjutkan ke WhatsApp?",
  modalDescription = "Kami akan membuka WhatsApp di tab baru untuk melanjutkan konsultasi.",
  confirmLabel = "Lanjut WhatsApp",
  cancelLabel = "Batal",
  ...props
}: ConfirmWhatsappLinkProps) {
  const titleId = useId();
  const descriptionId = useId();
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const resolvedTarget = target ?? "_blank";
  const resolvedRel = rel ?? "noopener noreferrer";

  useEffect(() => {
    // Hydration workaround: Mount state must be tracked to avoid hydration mismatch
    // when rendering portals or browser-only APIs (like window.location).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      cancelButtonRef.current?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) return;

    event.preventDefault();
    setIsOpen(true);
  }

  function handleConfirm() {
    setIsOpen(false);
    openExternalLink(href, resolvedTarget);
  }

  const modalContent = isOpen ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[1000] flex min-h-dvh items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Tutup dialog"
        className="absolute inset-0 cursor-default bg-forest-900/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        initial={{ y: 16, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 12, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="glass-dark relative w-full max-w-[30rem] overflow-hidden rounded-[2rem] p-6 text-text-inverse shadow-[0_32px_120px_rgba(4,12,8,0.42)] md:p-7"
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            const first = cancelButtonRef.current;
            const last = confirmButtonRef.current;
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gold-300/18 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-text-inverse/10 blur-3xl"
        />

        <div className="relative">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-pill border border-text-inverse/14 bg-text-inverse/10 text-sm font-extrabold text-gold-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            WA
          </div>

          <h2
            id={titleId}
            className="font-serif text-3xl leading-none tracking-[-0.03em] text-text-inverse md:text-4xl"
          >
            {modalTitle}
          </h2>

          <p
            id={descriptionId}
            className="mt-4 text-sm leading-7 text-text-inverse/72"
          >
            {modalDescription}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_1.15fr]">
            <Button
              ref={cancelButtonRef}
              variant="darkOutline"
              onClick={() => setIsOpen(false)}
            >
              {cancelLabel}
            </Button>

            <Button
              ref={confirmButtonRef}
              variant="gold"
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  ) : null;

  const modal = (
    <AnimatePresence>
      {modalContent}
    </AnimatePresence>
  );

  return (
    <>
      <a
        href={href}
        target={resolvedTarget}
        rel={resolvedRel}
        onClick={handleClick}
        {...props}
      />

      {isMounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}