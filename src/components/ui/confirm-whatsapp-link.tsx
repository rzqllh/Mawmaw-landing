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

  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const resolvedTarget = target ?? "_blank";
  const resolvedRel = rel ?? "noopener noreferrer";

  useEffect(() => {
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

  const modal = isOpen ? (
    <div className="fixed inset-0 z-[1000] flex min-h-dvh items-center justify-center p-4">
      <button
        type="button"
        aria-label="Tutup dialog"
        className="absolute inset-0 cursor-default bg-forest-900/72 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="glass-dark relative w-full max-w-[30rem] overflow-hidden rounded-[2rem] p-6 text-text-inverse shadow-[0_32px_120px_rgba(4,12,8,0.42)] md:p-7"
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
            <button
              ref={cancelButtonRef}
              type="button"
              className="dark-outline-button inline-flex h-12 items-center justify-center rounded-pill px-5 text-sm font-extrabold transition hover:scale-[1.01] active:scale-[0.99]"
              onClick={() => setIsOpen(false)}
            >
              {cancelLabel}
            </button>

            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-pill bg-gold-300 px-5 text-sm font-extrabold text-forest-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_18px_42px_rgba(4,12,8,0.22)] transition hover:scale-[1.01] hover:bg-gold-100 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
              onClick={handleConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

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