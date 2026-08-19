# Mobile Hero Revamp Design Specification

**Branch:** `feat/revamp-mobile`  
**Date:** 2026-08-19  
**Goal:** Revamp the home page Hero component to match the high-end editorial mobile interior design reference image while preserving full desktop responsiveness, accessibility, and clean performance.

---

## 1. Visual & Architectural Structure

### A. Background & Visual Atmosphere
- Full-bleed background image with ambient warm lighting.
- Top-to-bottom soft vignette / gradient overlay (`linear-gradient(to bottom, rgba(17,32,25,0.45) 0%, rgba(17,32,25,0.2) 30%, rgba(17,32,25,0.6) 80%, rgba(17,32,25,0.85) 100%)`) ensuring all text and controls meet WCAG AAA contrast ratio standards.

### B. Header / Navigation Overlay (Mobile & Desktop)
- Mobile floating pill navbar with frosted glassmorphism (`backdrop-blur-md bg-forest-900/30 border border-white/15 text-[#FDFBF7]`).
- Left: Circular emblem badge + "Mawmaw." brand name.
- Right: Minimalist 3-line hamburger menu trigger.
- Fullscreen mobile navigation overlay with smooth enter/exit animations and full keyboard accessibility (Escape to close, focus trap).

### C. Hero Typography & Editorial Layout
- **Eyebrow:**
  - `STUDIO DESAIN INTERIOR`
  - `JAKARTA` with an elegant horizontal divider line (`JAKARTA ───`).
  - Small uppercase, wide tracking (`tracking-[0.2em]`), warm champagne text (`#D4C5A9` / `text-stone-300`).
- **Headline:**
  - Font: `font-serif` (`Cormorant Garamond`), italicized or roman, large editorial scale:
    ```
    Ruang yang
    mengerti cara
    Anda hidup.
    ```
  - Color: Warm ivory (`#FDFBF7`), tracking-tight.
- **Subheadline:**
  - Font: `font-sans` (`Plus Jakarta Sans`), clean, warm:
    ```
    Desain interior yang personal,
    fungsional, dan mencerminkan siapa Anda.
    ```
  - Color: Muted warm cream (`#E2DCD5`), leading relaxed.

### D. CTAs & Interactive Controls
- **Primary CTA (Split Pill Button):**
  - Dark forest green container (`bg-forest-900` / `#14271C`), subtle border (`border-white/15`).
  - Left segment: Round icon box with ArrowRight (`→`).
  - Vertical separator line (`border-r border-white/10`).
  - Right segment: Text `"Ceritakan Proyek Anda"` linking to WhatsApp consultation confirmation dialog.
  - Min touch target: 48px height, comfortable click area.
- **Secondary CTA (Underlined Minimal Link):**
  - Text `"Lihat Portfolio"` with subtle underline, smooth-scrolling to `#proyek`.
- **Bottom Meta Bar:**
  - Left: `01` in serif/modern font + vertical badge `RESIDENTIAL` (or category identifier).
  - Center: Tagline micro-copy: `"Setiap ruang punya cerita. Kami hadir untuk merancangnya bersama Anda."`
  - Right: Circular scroll down button `↓` with smooth scroll affordance.
  - Base: Sleek progress slide indicator bar.

---

## 2. Copywriting & Tone (Anti-Slop & No-AI-Slop Compliant)

- No em dashes in UI copy (per R-02).
- Natural, elegant Indonesian prose tailored for discerning homeowners, commercial space owners, and architects.
- No generic buzzwords (revolutionary, seamless, cutting-edge).

---

## 3. Responsive Adaptations

- **Mobile (`< 768px`)**: Pure full-bleed atmospheric editorial experience with interactive bottom meta bar.
- **Tablet & Desktop (`≥ 768px`)**: Cohesive luxury layout adapting the same atmospheric styling with spacious desktop alignment, grid stability, and parallax image depth.

---

## 4. Verification Plan

1. `npm test` — all existing and updated unit tests pass.
2. `npm run typecheck` — TypeScript exits 0 with 0 errors.
3. `npm run lint` — ESLint exits 0 with 0 warnings.
4. `npx prisma validate` — Schema valid.
5. `npm run audit:ci` — Audit CI gate passes cleanly.
6. `npm run build` — Next.js 16.3.1 static page generation succeeds for all 27 routes.
