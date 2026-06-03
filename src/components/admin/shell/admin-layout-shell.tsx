import * as React from "react"
import { cn } from "@/lib/utils"

interface AdminLayoutShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  header: React.ReactNode;
}

export function AdminLayoutShell({
  sidebar,
  header,
  children,
  className,
  ...props
}: AdminLayoutShellProps) {
  return (
    <div className={cn("admin-layout-shell flex w-full", className)} {...props}>
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 z-40">
        {sidebar}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 w-full">
          {header}
        </header>
        
        <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
