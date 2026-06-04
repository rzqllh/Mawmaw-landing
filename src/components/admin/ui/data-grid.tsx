"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PencilSimple, Trash, ArrowUpRight, Image as ImageIcon } from "@phosphor-icons/react";

export interface DataGridItemProps {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  excerpt?: string;
  coverSrc?: string | null;
  editUrl: string;
  viewUrl?: string;
  previewUrl?: string;
  statusBadge?: React.ReactNode;
  onDelete?: () => void;
  deleteAction?: React.ReactNode;
}

export function DataGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6">
      {children}
    </div>
  );
}

export function DataGridItem({
  title,
  subtitle,
  excerpt,
  coverSrc,
  editUrl,
  viewUrl,
  previewUrl,
  statusBadge,
  deleteAction
}: DataGridItemProps) {
  return (
    <div className="group admin-solid-surface flex flex-col sm:flex-row gap-6 p-5 transition-all hover:border-forest-900/20 hover:shadow-lg hover:-translate-y-0.5">
      {/* Thumbnail */}
      <div className="shrink-0 w-full sm:w-56 h-36 bg-forest-900/5 rounded-xl overflow-hidden border border-forest-900/10 relative flex items-center justify-center">
        {coverSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={coverSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <ImageIcon weight="duotone" className="w-10 h-10 text-forest-900/20" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 py-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif font-semibold text-forest-900 leading-tight group-hover:text-gold-700 transition-colors">
                {title}
              </h2>
              {statusBadge}
            </div>
            {subtitle && (
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-bold uppercase tracking-wider text-forest-900/50">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        <p className="mt-3 text-sm text-forest-900/70 leading-relaxed line-clamp-2">
          {excerpt || "Tidak ada ringkasan."}
        </p>

        {/* Actions */}
        <div className="mt-auto pt-5 flex items-center gap-3">
          <Link 
            href={editUrl}
            className="text-[13px] font-bold text-forest-900 bg-white/60 border border-forest-900/10 hover:bg-forest-900/5 px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 flex items-center gap-2 shadow-sm"
          >
            <PencilSimple weight="bold" className="w-4 h-4" />
            Edit
          </Link>
          {previewUrl && (
            <Link 
              href={previewUrl}
              target="_blank"
              className="text-[13px] font-bold text-gold-700 hover:text-gold-800 hover:bg-gold-500/10 px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 flex items-center gap-2"
            >
              <ArrowUpRight weight="bold" className="w-4 h-4" />
              Preview
            </Link>
          )}
          {viewUrl && !previewUrl && (
            <Link 
              href={viewUrl}
              target="_blank"
              className="text-[13px] font-bold text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5 px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 flex items-center gap-2"
            >
              <ArrowUpRight weight="bold" className="w-4 h-4" />
              Lihat Web
            </Link>
          )}
          <div className="flex-1"></div>
          {deleteAction}
        </div>
      </div>
    </div>
  );
}
