"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Article, FolderOpen, Tray, Briefcase, Gear } from "@phosphor-icons/react";
import { SignOutButton } from "@/app/admin/components/sign-out-button";
import { cn } from "@/lib/utils";

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <div className="admin-glass-sidebar w-full h-full flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      
      {/* Brand Header */}
      <div className="p-6 pb-4 relative z-10">
        <Link 
          href="/admin" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-md"
          aria-label="Kembali ke Dashboard"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-900/5 text-forest-900 flex items-center justify-center border border-forest-900/10 group-hover:bg-forest-900/10 transition-colors shadow-sm">
            <span className="font-serif font-bold text-lg">M</span>
          </div>
          <div>
            <div className="text-[17px] font-medium text-forest-900 tracking-tight leading-none">Mawmaw.</div>
            <div className="text-[10px] text-forest-700/60 tracking-wider uppercase font-bold mt-1">Workspace</div>
          </div>
        </Link>
      </div>
      
      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-2 flex flex-col gap-1.5 relative z-10" aria-label="Main Navigation">
        <div className="px-2 mb-2 text-[10px] font-bold text-forest-900/40 uppercase tracking-widest">
          Manajemen Data
        </div>
        
        <Link 
          href="/admin/projects" 
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
            pathname?.startsWith("/admin/projects")
              ? "bg-forest-900 shadow-sm !text-white"
              : "text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5"
          )}
          aria-current={pathname?.startsWith("/admin/projects") ? "page" : undefined}
        >
          <FolderOpen weight={pathname?.startsWith("/admin/projects") ? "fill" : "duotone"} className="w-4 h-4" />
          Kelola Proyek
        </Link>

        <Link 
          href="/admin/articles" 
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
            pathname?.startsWith("/admin/articles")
              ? "bg-forest-900 shadow-sm !text-white"
              : "text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5"
          )}
          aria-current={pathname?.startsWith("/admin/articles") ? "page" : undefined}
        >
          <Article weight={pathname?.startsWith("/admin/articles") ? "fill" : "duotone"} className="w-4 h-4" />
          Kelola Artikel
        </Link>

        <div className="px-2 mt-4 mb-2 text-[10px] font-bold text-forest-900/40 uppercase tracking-widest">
          Website Utama
        </div>

        <Link 
          href="/admin/inbox" 
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
            pathname?.startsWith("/admin/inbox")
              ? "bg-forest-900 shadow-sm !text-white"
              : "text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5"
          )}
          aria-current={pathname?.startsWith("/admin/inbox") ? "page" : undefined}
        >
          <Tray weight={pathname?.startsWith("/admin/inbox") ? "fill" : "duotone"} className="w-4 h-4" />
          Inbox Pesan
        </Link>

        <Link 
          href="/admin/services" 
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
            pathname?.startsWith("/admin/services")
              ? "bg-forest-900 shadow-sm !text-white"
              : "text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5"
          )}
          aria-current={pathname?.startsWith("/admin/services") ? "page" : undefined}
        >
          <Briefcase weight={pathname?.startsWith("/admin/services") ? "fill" : "duotone"} className="w-4 h-4" />
          Kelola Layanan
        </Link>

        <Link 
          href="/admin/settings" 
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
            pathname?.startsWith("/admin/settings")
              ? "bg-forest-900 shadow-sm !text-white"
              : "text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5"
          )}
          aria-current={pathname?.startsWith("/admin/settings") ? "page" : undefined}
        >
          <Gear weight={pathname?.startsWith("/admin/settings") ? "fill" : "duotone"} className="w-4 h-4" />
          Pengaturan Web
        </Link>
      </nav>
      
      {/* Account Area */}
      <div className="p-4 relative z-10 mt-auto">
        <Link 
          href="/" 
          target="_blank"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5 focus-visible:bg-forest-900/5 focus-visible:text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 mb-4"
        >
          <House weight="duotone" className="w-4 h-4" />
          Lihat Website
        </Link>

        <div className="pt-4 border-t border-forest-900/10 flex items-center justify-between gap-3 px-1">
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-forest-900 truncate" title={userEmail}>{userEmail}</span>
            <span className="text-[10px] text-forest-900/50 uppercase tracking-wider font-bold">Administrator</span>
          </div>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
