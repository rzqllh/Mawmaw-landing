"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { List } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { AdminMobileDrawer } from "./admin-mobile-drawer";

interface AdminLayoutShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
}

export function AdminLayoutShell({
  sidebar,
  header,
  children,
  className,
  ...props
}: AdminLayoutShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <div className={cn("admin-layout-shell flex w-full", className)} {...props}>
      {/* Desktop Sidebar — fixed full-height */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 z-40 shrink-0">
        {sidebar}
      </aside>

      {/* Mobile Drawer */}
      <AdminMobileDrawer open={drawerOpen} onClose={closeDrawer}>
        <div onClick={closeDrawer}>
          {sidebar}
        </div>
      </AdminMobileDrawer>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Mobile Header with Menu Trigger */}
        <header className="sticky top-0 z-30 w-full md:hidden">
          <div className="flex h-14 items-center gap-3 border-b border-forest-900/8 bg-white/80 backdrop-blur-xl px-4">
            <button
              type="button"
              onClick={openDrawer}
              aria-label="Buka menu navigasi"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
            >
              <List weight="bold" className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-forest-900 tracking-tight">Mawmaw.</span>
            <span className="text-[10px] text-forest-700/50 font-bold uppercase tracking-wider">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
