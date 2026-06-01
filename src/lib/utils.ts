import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [{ text: [/^forest-/, /^gold-/, "text-primary", "text-secondary", "text-muted", "text-inverse", "white", "black", "transparent"] }],
      "bg-color": [{ bg: [/^forest-/, /^gold-/, "text-primary", "text-secondary", "text-muted", "text-inverse", "background", "background-muted", "surface", "surface-warm", "white", "black", "transparent"] }],
      "border-color": [{ border: [/^forest-/, /^gold-/, "text-primary", "text-secondary", "text-muted", "text-inverse", "white", "black", "transparent"] }],
      "shadow-color": [{ shadow: [/^forest-/, /^gold-/] }],
      "ring-color": [{ ring: [/^forest-/, /^gold-/] }],
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
