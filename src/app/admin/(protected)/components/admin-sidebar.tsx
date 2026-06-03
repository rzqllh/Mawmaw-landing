"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Article, FolderOpen } from "@phosphor-icons/react";
import { SignOutButton } from "@/app/admin/components/sign-out-button";
import { cn } from "@/lib/utils";

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 hidden md:flex flex-col p-4 h-screen sticky top-0 z-40">
      <div className="admin-glass-navigation flex-1 rounded-2xl flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        
        {/* Brand Header */}
        <div className="p-6 pb-2 relative z-10">
          <Link href="/admin" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-md">
            <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-700 flex items-center justify-center border border-gold-500/20 group-hover:bg-gold-500/25 transition-colors">
              <span className="font-serif font-bold text-lg">M</span>
            </div>
            <div>
              <div className="text-[17px] font-medium text-forest-900 tracking-tight leading-none">Mawmaw.</div>
              <div className="text-[10px] text-forest-700/60 tracking-wider uppercase font-bold mt-0.5">Workspace</div>
            </div>
          </Link>
        </div>
        
        {/* Primary Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1.5 relative z-10" aria-label="Main Navigation">
          <div className="px-3 mb-1.5 text-[10px] font-bold text-forest-900/40 uppercase tracking-widest">
            Manajemen Data
          </div>
          
          <Link 
            href="/admin/projects" 
            className={cn(
              "group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold transition-colors relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
              pathname?.startsWith("/admin/projects")
                ? "bg-forest-900/[0.04] text-forest-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                : "text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5"
            )}
          >
            {pathname?.startsWith("/admin/projects") && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-gold-500 rounded-r-full" />
            )}
            <FolderOpen weight="duotone" className={cn("w-4 h-4", pathname?.startsWith("/admin/projects") ? "text-forest-900" : "text-forest-900/60 group-hover:text-forest-900")} />
            Kelola Proyek
          </Link>

          <Link 
            href="/admin/articles" 
            className={cn(
              "group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold transition-colors relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
              pathname?.startsWith("/admin/articles")
                ? "bg-forest-900/[0.04] text-forest-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                : "text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5"
            )}
          >
            {pathname?.startsWith("/admin/articles") && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-gold-500 rounded-r-full" />
            )}
            <Article weight="duotone" className={cn("w-4 h-4", pathname?.startsWith("/admin/articles") ? "text-forest-900" : "text-forest-900/60 group-hover:text-forest-900")} />
            Kelola Artikel
          </Link>
        </nav>
        
        {/* Account Area */}
        <div className="p-4 relative z-10 mt-auto">
          <Link 
            href="/" 
            target="_blank"
            className="group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold transition-colors text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5 focus-visible:bg-forest-900/5 focus-visible:text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 mb-3"
          >
            <House weight="duotone" className="w-4 h-4 text-forest-900/60 group-hover:text-forest-900" />
            Lihat Website
          </Link>

          <div className="pt-4 border-t border-forest-900/10 flex items-center justify-between gap-3">
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-forest-900 truncate" title={userEmail}>{userEmail}</span>
              <span className="text-[10px] text-forest-900/50 uppercase tracking-wider font-bold">Administrator</span>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </aside>
  );
}
