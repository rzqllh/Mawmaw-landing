"use client";

import { useState } from "react";
import { Link as LinkIcon, WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface ArticleShareProps {
  title: string;
}

export function ArticleShare({ title }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const text = `Baca artikel menarik ini: ${title} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm font-semibold uppercase tracking-wider text-text-muted">
        Bagikan Artikel
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-pill"
          onClick={handleWhatsAppShare}
        >
          <WhatsappLogo className="mr-2 h-4 w-4" weight="fill" />
          WhatsApp
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-pill"
          onClick={handleCopyLink}
        >
          <LinkIcon className="mr-2 h-4 w-4" weight="bold" />
          {copied ? "Tersalin!" : "Salin Tautan"}
        </Button>
      </div>
    </div>
  );
}
