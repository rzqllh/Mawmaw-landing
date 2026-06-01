import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "../components/sign-out-button";
import { type ReactNode } from "react";
import {
  House,
  Article,
  FolderOpen
} from "@phosphor-icons/react/dist/ssr";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-page-shell flex min-h-screen">
      {/* Floating Sidebar */}
      <aside className="w-64 hidden md:flex flex-col p-4 h-screen sticky top-0">
        <div className="bg-surface/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_8px_32px_rgba(4,12,8,0.05)] flex-1 rounded-[var(--radius-card)] flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />
          
          <div className="p-6 pb-2 relative z-10">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-700 flex items-center justify-center border border-gold-500/20 group-hover:bg-gold-500/25 transition-colors">
                <span className="font-serif font-bold text-lg">M</span>
              </div>
              <div>
                <div className="text-lg font-medium text-forest-900 tracking-tight">Mawmaw.</div>
                <div className="text-xs text-forest-700/60 tracking-wider uppercase font-bold">Workspace</div>
              </div>
            </Link>
          </div>
          
          <nav className="flex-1 px-3 py-4 flex flex-col gap-1.5 relative z-10">
            <div className="px-3 mb-1.5 text-[10px] font-bold text-forest-900/40 uppercase tracking-widest">
              Manajemen Data
            </div>
            <Link 
              href="/admin/projects" 
              className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-interactive bg-forest-900/5 text-forest-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_0_0_1px_rgba(17,32,25,0.05)] relative overflow-hidden"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gold-500 rounded-r-full" />
              <FolderOpen weight="duotone" className="w-4 h-4 text-forest-900" />
              Kelola Proyek
            </Link>
            <Link 
              href="/admin/articles" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-interactive text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5 focus-visible:bg-forest-900/5 focus-visible:text-forest-900 outline-none"
            >
              <Article weight="duotone" className="w-4 h-4 transition-colors" />
              Kelola Artikel
            </Link>
          </nav>
          
          <div className="p-4 relative z-10 mt-auto">
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-interactive text-forest-900/60 hover:text-forest-900 hover:bg-forest-900/5 focus-visible:bg-forest-900/5 focus-visible:text-forest-900 outline-none mb-3"
            >
              <House weight="duotone" className="w-4 h-4 transition-colors" />
              Lihat Website
            </Link>

            <div className="pt-4 border-t border-forest-900/10 flex items-center justify-between gap-3">
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-forest-900 truncate">{user.email}</span>
                <span className="text-[10px] text-forest-900/50 uppercase tracking-wider font-bold">Administrator</span>
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[100vw] md:max-w-[calc(100vw-16rem)] flex flex-col min-h-screen">
        <div className="flex-1 p-4 md:p-6 md:pt-8 w-full max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
