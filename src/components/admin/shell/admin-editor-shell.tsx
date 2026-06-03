import * as React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

interface AdminEditorShellProps {
  title: string;
  backUrl: string;
  backLabel?: string;
  isPending: boolean;
  primaryContent: React.ReactNode;
  sidebarContent: React.ReactNode;
  submitLabel?: string;
  error?: string | null;
  previewUrl?: string;
}

export function AdminEditorShell({
  title,
  backUrl,
  backLabel = "Kembali",
  isPending,
  primaryContent,
  sidebarContent,
  submitLabel = "Simpan",
  error,
  previewUrl,
}: AdminEditorShellProps) {
  return (
    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-24">
      {/* Sticky Top Action Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-forest-900/10 mb-8 -mx-4 px-4 py-4 md:-mx-8 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <Link 
            href={backUrl} 
            className="inline-flex items-center gap-2 text-forest-900/50 hover:text-gold-700 transition-colors text-xs font-bold uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 rounded-sm mb-1"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
            {backLabel}
          </Link>
          <h1 className="text-xl md:text-2xl font-serif text-forest-900 font-bold leading-none">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {previewUrl && (
            <Link 
              href={previewUrl} 
              target="_blank"
              className="text-[13px] font-bold text-forest-900/50 hover:text-forest-900 transition-colors px-3 py-2 rounded-lg hover:bg-forest-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
            >
              Pratinjau
            </Link>
          )}
          <Link 
            href={backUrl} 
            className="text-[13px] font-bold text-forest-900/50 hover:text-forest-900 transition-colors px-3 py-2 rounded-lg hover:bg-forest-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
          >
            Batal
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isPending}
            className="shadow-sm bg-forest-900 text-white hover:bg-forest-800"
          >
            <CheckCircle weight="bold" className="w-4 h-4 mr-2" />
            {isPending ? "Menyimpan..." : submitLabel}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 flex items-start gap-3 text-[13px] text-red-800 bg-red-100 border border-red-200 rounded-xl font-medium">
          <div className="mt-0.5 font-bold">X</div>
          <div>{error}</div>
        </div>
      )}

      {/* Editor Layout: Main Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {primaryContent}
        </div>
        <div className="lg:col-span-1 space-y-6">
          {sidebarContent}
        </div>
      </div>
    </div>
  );
}
