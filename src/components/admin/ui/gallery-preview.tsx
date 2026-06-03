"use client";

import React, { useState } from "react";
import { Plus, X, Image as ImageIcon } from "@phosphor-icons/react";
import { AdminInput } from "./admin-input";
import { AdminLabel } from "./admin-label";

export interface GalleryItem {
  src: string;
  alt: string;
  blur?: string;
}

interface GalleryPreviewProps {
  initialItems?: GalleryItem[];
  name?: string; // name for the hidden input field to submit JSON
}

export function GalleryPreview({ initialItems = [], name = "gallery" }: GalleryPreviewProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    setItems([...items, { src: newUrl, alt: newAlt || "Gallery image" }]);
    setNewUrl("");
    setNewAlt("");
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Hidden input to pass data to Server Action */}
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      {/* Grid Display */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-forest-900/10 bg-forest-900/5 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  aria-label="Remove image"
                >
                  <X weight="bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-12 flex flex-col items-center justify-center border border-dashed border-forest-900/20 rounded-xl bg-forest-900/[0.02]">
          <ImageIcon weight="duotone" className="w-10 h-10 text-forest-900/20 mb-3" />
          <p className="text-sm font-semibold text-forest-900/60">Belum ada gambar</p>
          <p className="text-xs text-forest-900/40 mt-1">Tambahkan URL gambar di bawah untuk membuat galeri.</p>
        </div>
      )}

      {/* Add New Item */}
      <div className="flex flex-col sm:flex-row gap-3 items-end p-4 bg-white/50 border border-forest-900/10 rounded-xl">
        <div className="flex-1 w-full">
          <AdminLabel htmlFor="newUrl" className="text-[11px]">URL Gambar Baru</AdminLabel>
          <AdminInput 
            id="newUrl" 
            value={newUrl} 
            onChange={e => setNewUrl(e.target.value)} 
            placeholder="https://..." 
          />
        </div>
        <div className="flex-1 w-full">
          <AdminLabel htmlFor="newAlt" className="text-[11px]">Alt Text</AdminLabel>
          <AdminInput 
            id="newAlt" 
            value={newAlt} 
            onChange={e => setNewAlt(e.target.value)} 
            placeholder="Deskripsi..." 
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newUrl.trim()}
          className="h-[38px] px-4 bg-forest-900 text-white rounded-md text-xs font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-800 transition-colors flex items-center gap-1.5 whitespace-nowrap"
        >
          <Plus weight="bold" />
          Tambah
        </button>
      </div>
    </div>
  );
}
