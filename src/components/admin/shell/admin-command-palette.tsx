"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { 
  MagnifyingGlass, 
  FolderOpen, 
  Article, 
  Plus, 
  House, 
  SignOut,
  Tray,
  Briefcase
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

export function AdminCommandPalette() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const navigateTo = (path: string) => {
    startTransition(() => {
      const ReactObj = React as unknown as { addTransitionType?: (type: string) => void };
      if (typeof ReactObj.addTransitionType === 'function') {
        ReactObj.addTransitionType('nav-forward');
      }
      router.push(path);
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-forest-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <Command 
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-forest-900/10 flex flex-col animate-in fade-in zoom-in-95 duration-200"
        label="Global Command Menu"
      >
        <div className="flex items-center border-b border-forest-900/5 px-4">
          <MagnifyingGlass weight="bold" className="w-5 h-5 text-forest-900/40 mr-2 shrink-0" />
          <Command.Input 
            autoFocus
            value={inputValue}
            onValueChange={setInputValue}
            placeholder="Ketik perintah atau pencarian..." 
            className="flex h-14 w-full bg-transparent py-3 text-sm font-medium text-forest-900 placeholder:text-forest-900/40 focus:outline-none"
          />
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
          <Command.Empty className="py-6 text-center text-sm text-forest-900/60">
            Tidak ada hasil yang ditemukan.
          </Command.Empty>

          <Command.Group heading="Navigasi" className="text-[11px] font-bold uppercase tracking-wider text-forest-900/40 px-2 py-1.5">
            <Command.Item 
              onSelect={() => runCommand(() => navigateTo("/admin/projects"))}
              className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm text-forest-900 font-medium cursor-pointer aria-selected:bg-forest-900/5 aria-selected:text-gold-700 transition-colors"
            >
              <FolderOpen weight="duotone" className="w-4 h-4 text-forest-900/50" />
              Kelola Proyek
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigateTo("/admin/articles"))}
              className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm text-forest-900 font-medium cursor-pointer aria-selected:bg-forest-900/5 aria-selected:text-gold-700 transition-colors"
            >
              <Article weight="duotone" className="w-4 h-4 text-forest-900/50" />
              Kelola Artikel
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigateTo("/admin/inbox"))}
              className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm text-forest-900 font-medium cursor-pointer aria-selected:bg-forest-900/5 aria-selected:text-gold-700 transition-colors"
            >
              <Tray weight="duotone" className="w-4 h-4 text-forest-900/50" />
              Inbox Pesan
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigateTo("/admin/services"))}
              className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm text-forest-900 font-medium cursor-pointer aria-selected:bg-forest-900/5 aria-selected:text-gold-700 transition-colors"
            >
              <Briefcase weight="duotone" className="w-4 h-4 text-forest-900/50" />
              Kelola Layanan
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Aksi Cepat" className="text-[11px] font-bold uppercase tracking-wider text-forest-900/40 px-2 pt-3 pb-1.5 mt-2 border-t border-forest-900/5">
            <Command.Item 
              onSelect={() => runCommand(() => navigateTo("/admin/projects/new"))}
              className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm text-forest-900 font-medium cursor-pointer aria-selected:bg-forest-900/5 aria-selected:text-gold-700 transition-colors"
            >
              <div className="w-4 h-4 flex items-center justify-center rounded bg-forest-900/10 text-forest-900/70">
                <Plus weight="bold" className="w-3 h-3" />
              </div>
              Buat Proyek Baru
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigateTo("/admin/articles/new"))}
              className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm text-forest-900 font-medium cursor-pointer aria-selected:bg-forest-900/5 aria-selected:text-gold-700 transition-colors"
            >
              <div className="w-4 h-4 flex items-center justify-center rounded bg-forest-900/10 text-forest-900/70">
                <Plus weight="bold" className="w-3 h-3" />
              </div>
              Tulis Artikel Baru
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Sistem" className="text-[11px] font-bold uppercase tracking-wider text-forest-900/40 px-2 pt-3 pb-1.5 mt-2 border-t border-forest-900/5">
            <Command.Item 
              onSelect={() => runCommand(() => window.open("/", "_blank"))}
              className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm text-forest-900 font-medium cursor-pointer aria-selected:bg-forest-900/5 aria-selected:text-gold-700 transition-colors"
            >
              <House weight="duotone" className="w-4 h-4 text-forest-900/50" />
              Lihat Website Publik
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="border-t border-forest-900/5 px-4 py-3 bg-forest-900/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-forest-900/40 font-medium">
            <span className="bg-white border border-forest-900/10 px-1.5 py-0.5 rounded shadow-sm text-[10px] font-bold font-mono">↑↓</span> navigasi
          </div>
          <div className="flex items-center gap-2 text-xs text-forest-900/40 font-medium">
            <span className="bg-white border border-forest-900/10 px-1.5 py-0.5 rounded shadow-sm text-[10px] font-bold font-mono">Enter</span> pilih
          </div>
        </div>
      </Command>
    </div>
  );
}
