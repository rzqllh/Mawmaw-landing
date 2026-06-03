"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { cn } from "@/lib/utils";
import { Eye, PencilSimpleLine } from "@phosphor-icons/react";

interface MarkdownEditorProps {
  id?: string;
  name?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  required?: boolean;
  variant?: "article" | "project";
}

export function MarkdownEditor({
  id,
  name,
  label,
  defaultValue = "",
  placeholder,
  rows = 20,
  className,
  required,
  variant = "article"
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [content, setContent] = useState(defaultValue);

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-forest-900/10 pb-3">
        {label && (
          <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-forest-900/50">
            {label}
          </label>
        )}
        <div className="flex items-center gap-1 bg-forest-900/5 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
              mode === "write" 
                ? "bg-white text-forest-900 shadow-sm" 
                : "text-forest-900/50 hover:text-forest-900 hover:bg-forest-900/10"
            )}
          >
            <PencilSimpleLine weight={mode === "write" ? "bold" : "regular"} className="w-3.5 h-3.5" />
            Tulis
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
              mode === "preview" 
                ? "bg-white text-forest-900 shadow-sm" 
                : "text-forest-900/50 hover:text-forest-900 hover:bg-forest-900/10"
            )}
          >
            <Eye weight={mode === "preview" ? "bold" : "regular"} className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>
      </div>

      <div className="relative rounded-xl border border-forest-900/10 bg-white/50 overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-gold-500/50 focus-within:border-gold-500/50 transition-all">
        {mode === "write" ? (
          <Textarea
            id={id}
            name={name}
            defaultValue={content}
            onChange={(e) => setContent(e.target.value)}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className="w-full text-base leading-loose resize-y font-serif bg-transparent border-none focus:outline-none focus:ring-0 p-6 min-h-[500px]"
          />
        ) : (
          <div className="p-6 min-h-[500px] overflow-y-auto bg-white/80">
            {content.trim() ? (
              <MarkdownContent content={content} variant={variant} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-forest-900/30 min-h-[300px]">
                <Eye weight="duotone" className="w-10 h-10 mb-3 opacity-50" />
                <p className="text-[13px] font-bold uppercase tracking-widest">Preview Kosong</p>
                <p className="text-xs mt-1">Mulai menulis di mode Tulis untuk melihat hasilnya di sini.</p>
              </div>
            )}
            {/* Hidden textarea to ensure form submission still includes the content when in preview mode */}
            <textarea name={name} value={content} readOnly className="hidden" />
          </div>
        )}
      </div>
      
      {/* Markdown Hint Toolbar */}
      {mode === "write" && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium text-forest-900/40 px-2">
          <span><strong className="font-bold text-forest-900/60">#</strong> Heading 1</span>
          <span><strong className="font-bold text-forest-900/60">##</strong> Heading 2</span>
          <span><strong className="font-bold text-forest-900/60">**teks**</strong> Tebal</span>
          <span><strong className="font-bold text-forest-900/60">-</strong> List</span>
          <span><strong className="font-bold text-forest-900/60">&gt;</strong> Kutipan</span>
          <span><strong className="font-bold text-forest-900/60">[teks](url)</strong> Link</span>
        </div>
      )}
    </div>
  );
}
