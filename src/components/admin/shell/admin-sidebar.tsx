"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Article,
  FolderOpen,
  Tray,
  Briefcase,
  Gear,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { SignOutButton } from "@/app/admin/components/sign-out-button";
import { cn } from "@/lib/utils";

/* ─── Nav Group label ─── */
function NavGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 mt-5 mb-2 first:mt-0 text-[10px] font-bold text-forest-900/40 uppercase tracking-widest">
      {children}
    </div>
  );
}

/* ─── Nav link ─── */
function NavLink({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ComponentType<{ weight: "fill" | "duotone"; className?: string }>;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
        isActive
          ? "bg-forest-900 shadow-md shadow-forest-900/10 !text-white"
          : "text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        weight={isActive ? "fill" : "duotone"}
        className="w-4 h-4 shrink-0"
      />
      {label}
    </Link>
  );
}

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  const isExact = (path: string) => pathname === path;
  const isPrefix = (path: string) => pathname?.startsWith(path) ?? false;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white/90 border-r border-forest-900/8">
      {/* Brand Header */}
      <div className="p-6 pb-4">
        <Link
          href="/admin"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-md"
          aria-label="Kembali ke Dashboard"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-900/5 text-forest-900 flex items-center justify-center border border-forest-900/10 group-hover:bg-forest-900/10 transition-colors shadow-sm">
            <span className="font-serif font-bold text-lg">M</span>
          </div>
          <div>
            <div className="text-[17px] font-medium text-forest-900 tracking-tight leading-none">
              Mawmaw.
            </div>
            <div className="text-[10px] text-forest-700/60 tracking-wider uppercase font-bold mt-1">
              Admin
            </div>
          </div>
        </Link>
      </div>

      {/* Primary Navigation */}
      <nav
        className="flex-1 px-4 py-2 flex flex-col gap-1 overflow-y-auto"
        aria-label="Navigasi Admin"
      >
        <NavLink
          href="/admin"
          icon={House}
          label="Dashboard"
          isActive={isExact("/admin")}
        />

        <NavGroupLabel>Konten</NavGroupLabel>
        <NavLink
          href="/admin/projects"
          icon={FolderOpen}
          label="Proyek"
          isActive={isPrefix("/admin/projects")}
        />
        <NavLink
          href="/admin/articles"
          icon={Article}
          label="Artikel"
          isActive={isPrefix("/admin/articles")}
        />
        <NavLink
          href="/admin/services"
          icon={Briefcase}
          label="Layanan"
          isActive={isPrefix("/admin/services")}
        />

        <NavGroupLabel>Website</NavGroupLabel>
        <NavLink
          href="/admin/settings"
          icon={Gear}
          label="Pengaturan"
          isActive={isPrefix("/admin/settings")}
        />

        <NavGroupLabel>Data Masuk</NavGroupLabel>
        <NavLink
          href="/admin/inbox"
          icon={Tray}
          label="Pesan"
          isActive={isPrefix("/admin/inbox")}
        />
      </nav>

      {/* Bottom Utility */}
      <div className="p-4 mt-auto">
        <Link
          href="/"
          target="_blank"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 mb-3"
        >
          <ArrowSquareOut weight="duotone" className="w-4 h-4 shrink-0" />
          Lihat Website
        </Link>

        <div className="pt-3 border-t border-forest-900/10 flex items-center justify-between gap-3 px-1">
          <div className="flex flex-col overflow-hidden">
            <span
              className="text-xs font-bold text-forest-900 truncate"
              title={userEmail}
            >
              {userEmail}
            </span>
            <span className="text-[10px] text-forest-900/50 uppercase tracking-wider font-bold">
              Administrator
            </span>
          </div>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
