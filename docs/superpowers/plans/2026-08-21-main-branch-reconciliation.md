# Branch Reconciliation Analysis
## local `main` (15 unpushed commits) vs `fix/production-hardening` + `feat/revamp-mobile`

**Tanggal analisis:** 2026-08-21  
**Analis:** Antigravity (read-only inspection — tidak ada perubahan branch/file kerja)  
**Commit baseline origin/main:** `f394557` (chore: remove tracked repository zip archive)

---

## Ringkasan Eksekutif

Local `main` (15 commit ahead `origin/main`) adalah **superset** dari `fix/production-hardening` dan **superset-final** dari `feat/revamp-mobile` (local main punya antislop cleanup yang belum ada di branch revamp). Semua perbedaan yang ditemukan bersifat komplementer atau merupakan versi final yang lebih bersih — **tidak ada kontradiksi logis**. Satu-satunya keputusan nyata yang diperlukan: `prisma/seed.ts` punya copy SiteSetting yang berbeda antara local `main` dan `feat/revamp-mobile`.

---

## 1. Full Commit Inventory

### 1a. `git log origin/main..main --oneline`

Command: `git log origin/main..main --oneline`

```
add1031 feat(observability): add zero-leak health check endpoint and accessible error boundaries
169af69 feat(db): add migration for performance indexes on articles, projects, services, and submissions
5f6c10d fix(backend): add Zod validation, sanitized error handling, query fallbacks, and schema indexes
c1c9c09 feat(tokens): refine typography scale, letter-spacing, and line-height standards
146da87 fix(a11y): add keyboard focus-visible rings to all wizard steps and fix inverse input text color tokens
21ef73b fix(copy): polish services and contact titles to natural grounded Indonesian
f1eb77a feat(layout): unify section container parent padding and remove arbitrary min-h-dvh centering
2723d75 fix(a11y): resolve contrast, keyboard navigation, touch targets, and anchor links
8240bff fix(nav): maintain dark frosted glass header over footer and contact zone
a3ec480 feat(design): harmonize section dividers, alternating tone rhythm, and rock-solid header background detection
ed74f53 fix(mobile): adjust contact section scaling, wizard typography, and navbar capsule on dark sections
04c8237 feat(nav): revamp mobile navigation drawer with luxury dark frosted theme and staggered animation
a63a6b6 fix(hero): refine mobile layout, Apple HIG glassmorphism, clamp scaling, and meta bar
d03a11d feat(hero): revamp mobile hero with editorial layout and refined UX copy
5782102 docs: add mobile hero revamp design spec
```

### 1b. Pengelompokan per Topik

| Topik | Commit(s) | File Utama |
|-------|-----------|------------|
| **Health check + observability** | `add1031` | `src/app/api/health/route.ts`, `src/app/error.tsx`, `src/app/global-error.tsx`, `src/lib/health.test.ts`, `src/lib/server-log.ts` |
| **DB performance indexes** | `169af69` | `prisma/migrations/20260819114514_add_performance_indexes/migration.sql`, `prisma/migrations/migration_lock.toml` |
| **Backend Zod validation + query hardening** | `5f6c10d` | `prisma/schema.prisma`, `prisma/seed.ts`, `src/app/actions/*.ts`, `src/lib/admin-validations.test.ts`, `src/lib/queries.ts`, `src/lib/validations/admin.ts` |
| **Typography tokens** | `c1c9c09` | `src/app/globals.css`, `src/components/layout/site-footer.tsx` |
| **A11y: focus rings + input token** | `146da87` | `WizardStep1-6.tsx`, `input.tsx`, `select.tsx`, `textarea.tsx` |
| **Copywriting** | `21ef73b` | `src/data/public-content.ts` |
| **Layout: container padding** | `f1eb77a` | `src/components/sections/*-section.tsx` (6 files) |
| **A11y: contrast/keyboard/anchors** | `2723d75` | `hero-section.tsx`, `interactive-services.tsx`, `site-footer.tsx`, `button.tsx`, `lightbox-trigger.tsx`, `projects/page.tsx` |
| **Nav: header dark section detection** | `8240bff`, `a3ec480` | `src/components/layout/site-header.tsx` |
| **Design: section dividers + rhythm** | `a3ec480` | `site-header.tsx`, `about/contact/featured-*.tsx` |
| **Mobile: contact/wizard/nav capsule** | `ed74f53` | `WizardProgress.tsx`, `WizardStep1-7.tsx`, `site-header.tsx`, `contact-section.tsx` |
| **Mobile nav drawer revamp** | `04c8237` | `src/components/layout/site-header.tsx` |
| **Hero: mobile layout + glassmorphism** | `a63a6b6` | `site-header.tsx`, `hero-section.tsx` |
| **Hero: editorial mobile revamp** | `d03a11d` | `site-header.tsx`, `hero-section.tsx`, `public-content.ts` |
| **Docs: design spec** | `5782102` | `docs/superpowers/specs/2026-08-19-mobile-hero-revamp-design.md` |

---

## 2. Per-Fitur Overlap Table

### 2a. `/api/health` Route

Command: `git show main:src/app/api/health/route.ts` dan `git show fix/production-hardening:src/app/api/health/route.ts`

| Aspek | local `main` | `fix/production-hardening` | `origin/main` baseline |
|-------|--------------|---------------------------|------------------------|
| File ada? | Ya | Ya | Tidak ada |
| Implementasi | `db.$queryRaw SELECT 1`, 200/503, no-store cache | **identik byte-per-byte** | — |
| Error logging | `logServerError("health.check_failed", error)` | **identik** | — |

**Verdict: IDENTIK** — tidak ada konflik.

---

### 2b. Error Boundaries (`error.tsx`, `global-error.tsx`)

Command: `git show fix/production-hardening:src/app/error.tsx` → `fatal: path exists on disk, but not in 'fix/production-hardening'`

| File | local `main` | `fix/production-hardening` | `feat/revamp-mobile` |
|------|--------------|---------------------------|---------------------|
| `src/app/error.tsx` | Ada — "Gagal Memuat Konten", amber accent, accessible reset button | **TIDAK ADA** | **TIDAK ADA** |
| `src/app/global-error.tsx` | Ada — "Terjadi Kendala Sistem", red accent, `<html lang="id">` | **TIDAK ADA** | **TIDAK ADA** |

**Verdict: UNIK DI LOCAL MAIN** — tambahan baru. Tidak ada konflik, tapi kalau kedua branch di-merge ke origin/main tanpa commit `add1031`, kedua file ini tidak akan ikut.

---

### 2c. `src/lib/server-log.ts`

Command: `git show origin/main:src/lib/server-log.ts`, `git show fix/production-hardening:src/lib/server-log.ts`, `git show main:src/lib/server-log.ts`

| Aspek | `origin/main` | `fix/production-hardening` | local `main` |
|-------|---------------|---------------------------|--------------|
| Type union | `ContactFailureEvent` — 2 events saja | `ServerErrorEvent` — 4 events (+ `health.check_failed`, `system.unhandled_error`) | **identik dengan fix branch** |
| Fungsi publik | sama | sama | sama |

**Verdict: local main = fix branch (superset dari origin/main).** Tidak ada konflik.

---

### 2d. `src/lib/queries.ts` — Cold-Start Fallback + Query Bounding

Command: `git show origin/main:src/lib/queries.ts`, `git show fix/production-hardening:src/lib/queries.ts`, `git show main:src/lib/queries.ts`

| Aspek | `origin/main` | `fix/production-hardening` | local `main` |
|-------|---------------|---------------------------|--------------|
| `getDefaultSiteSettings()` | **Tidak ada** — crash di fresh DB | Ada — fallback ke `public-content.ts` | **identik dengan fix** |
| `getSubmissions()` | Unbounded (tak ada limit) | `Math.min(Math.max(1, limit), 250)` cap | **identik dengan fix** |

**Verdict: local main = fix branch (superset dari origin/main).** Tidak ada konflik.

---

### 2e. `src/lib/validations/admin.ts` (Zod schemas)

Command: `git diff fix/production-hardening:src/lib/validations/admin.ts main:src/lib/validations/admin.ts` → empty output

| Aspek | `origin/main` | `fix/production-hardening` | local `main` |
|-------|---------------|---------------------------|--------------|
| File | Tidak ada | `articleSchema`, `projectSchema`, `serviceSchema` | **identik dengan fix** |

**Verdict: IDENTIK antara main dan fix/production-hardening.** Tidak ada konflik.

---

### 2f. `src/app/actions/*.ts` (Zod validation di server actions)

Command: `git diff fix/production-hardening main -- src/app/actions/articles.ts src/app/actions/projects.ts src/app/actions/services.ts src/app/actions/settings.ts src/app/actions/inbox.ts` → **empty output**

| File | `origin/main` | `fix/production-hardening` | local `main` |
|------|---------------|---------------------------|--------------|
| `articles.ts` | `formData.get()` tanpa Zod | `articleSchema.safeParse()`, sanitized errors | **identik dengan fix** |
| `projects.ts` | Tanpa Zod | `projectSchema.safeParse()` | **identik** |
| `services.ts` | Tanpa Zod | `serviceSchema.safeParse()` | **identik** |
| `inbox.ts` | `getSubmissions()` unbounded | `getSubmissions(limit=100)` dengan cap 250 | **identik** |
| `settings.ts` | Minor diff | Minor diff | **identik dengan fix** |

**Verdict: IDENTIK** — tidak ada konflik.

---

### 2g. DB Performance Indexes

Command: `git show main:prisma/migrations/20260819114514_add_performance_indexes/migration.sql` dan `git show fix/production-hardening:prisma/migrations/20260819114514_add_performance_indexes/migration.sql` → output identik

| Aspek | `origin/main` | `fix/production-hardening` | local `main` |
|-------|---------------|---------------------------|--------------|
| `prisma/schema.prisma` @@index | Tidak ada | Ada (9 indexes: Project, Article, ContactSubmission, Service) | **identik dengan fix** |
| `migration.sql` | Tidak ada | Ada — 9 `CREATE INDEX` statements | **identik dengan fix** |
| `migration_lock.toml` | Tidak ada | Ada | **identik dengan fix** |

**Verdict: IDENTIK antara main dan fix branch.** Tidak ada konflik.

---

### 2h. Test Coverage

Command: `git diff fix/production-hardening:src/lib/health.test.ts main:src/lib/health.test.ts` → empty. `git diff fix/production-hardening:src/lib/admin-validations.test.ts main:src/lib/admin-validations.test.ts` → empty.

**Verdict: IDENTIK** — tidak ada konflik.

---

### 2i. Frontend — `src/app/globals.css`

Command: `git diff main feat/revamp-mobile -- src/app/globals.css` → empty output

**Verdict: IDENTIK antara main dan feat/revamp-mobile.** Tidak ada konflik.

---

### 2j. Frontend — `src/components/layout/site-header.tsx`

Command: `git diff main feat/revamp-mobile -- src/components/layout/site-header.tsx` → empty output

**Verdict: IDENTIK** — tidak ada konflik.

---

### 2k. Frontend — `src/components/sections/hero-section.tsx`

Command: `git diff main feat/revamp-mobile -- src/components/sections/hero-section.tsx`

Output diff menunjukkan perbedaan di dua area:

1. **Eyebrow comment** — `feat/revamp-mobile`: komentar pendek; local main: komentar panjang dengan reasoning antislop R-31
2. **`01 • RESIDENTIAL` badge** — `feat/revamp-mobile`: **masih ada** (hardcoded badge fake); local main: **sudah dihapus**
3. **Slide progress bar** — `feat/revamp-mobile`: **masih ada** (fake hardcoded); local main: **sudah dihapus**

Commit message `feat/revamp-mobile` (`4d05b2b`) sendiri menyebutkan penghapusan ini sebagai "antislop Hard Gate fixes applied before landing" — tapi versi yang di-push ke origin **belum mengaplikasikan** fix tersebut ke file `hero-section.tsx`.

**Verdict: local main adalah versi final yang lebih bersih.** Local main sudah apply cleanup yang disebutkan di commit message feat/revamp-mobile tapi belum ada di branch yang di-push. Bukan konflik — local main superset.

---

### 2l. Frontend — `src/components/layout/site-footer.tsx`

Command: `git diff main feat/revamp-mobile -- src/components/layout/site-footer.tsx`

```diff
- <span className="... !bg-forest-700 ... bg-gold-500/14 ...">
+ <span className="... bg-forest-700 ...">
```

`feat/revamp-mobile`: masih punya `!bg-forest-700` (Tailwind force-override `!`) yang override dead `bg-gold-500/14`. Local main: sudah fix — hanya `bg-forest-700`, tanpa `bg-gold-500/14`.

**Verdict: local main adalah versi benar** — fix dead CSS. Bukan konflik.

---

### 2m. `prisma/seed.ts` — SiteSetting copy (PERBEDAAN NYATA)

Command: `git diff fix/production-hardening feat/revamp-mobile -- prisma/seed.ts`

| Field SiteSetting | local `main` / `fix/production-hardening` | `feat/revamp-mobile` |
|-------------------|-------------------------------------------|---------------------|
| `servicesLabel` | `servicesSection.label` (dari public-content.ts) | `"LAYANAN KAMI"` (hardcoded) |
| `servicesTitle` | `servicesSection.title` | `"Eksplorasi Layanan"` |
| `servicesDesc` | `servicesSection.description` | `"Kami menawarkan berbagai layanan..."` |
| `projectsDesc` | `"Pilihan proyek interior yang telah kami rancang dengan sentuhan personal."` | `"Lihat pilihan proyek interior yang telah kami kerjakan."` |
| `articlesTitle` | `"Inspirasi & Wawasan"` | `"Inspirasi & Tips"` |
| `articlesDesc` | `"Catatan dan panduan seputar desain interior dan tata ruang."` | `"Baca panduan praktis dan inspirasi seputar desain interior."` |
| `contactTitle` | `contactContent.title` (dari public-content.ts) | `"Mulai Konsultasi"` (hardcoded) |
| `contactDesc` | `contactContent.description` | `"Ceritakan kebutuhan ruang Anda..."` |

Konfirmasi: `git diff fix/production-hardening main -- prisma/seed.ts` → empty (local main = fix branch untuk file ini).

**Verdict: BERBEDA NYATA antara feat/revamp-mobile dan local main.** Lihat Seksi 4 untuk analisis trade-off.

---

### 2n. Semua komponen lain di `feat/revamp-mobile`

Command: masing-masing `git diff main feat/revamp-mobile -- <file>` → empty untuk semua file berikut:

| File(s) | Verdict |
|---------|---------|
| `src/data/public-content.ts` | IDENTIK |
| `src/components/sections/about-section.tsx`, `contact-section.tsx`, `featured-articles-section.tsx`, `featured-projects-section.tsx`, `interactive-services.tsx`, `services-section.tsx` | IDENTIK (6 files) |
| `src/components/forms/wizard/WizardStep1-7.tsx`, `WizardProgress.tsx` | IDENTIK (8 files) |
| `src/components/ui/button.tsx`, `input.tsx`, `select.tsx`, `textarea.tsx`, `lightbox-trigger.tsx` | IDENTIK (5 files) |

---

## 3. Konflik Nyata vs Konflik Semu

### 3a. Konflik Semu — Aman (identik atau saling melengkapi)

| Area | Situasi | Evidence |
|------|---------|---------|
| `/api/health/route.ts` | Identik di main dan fix | `git diff fix/production-hardening:... main:...` → empty |
| `server-log.ts` | Identik di main dan fix | idem |
| `validations/admin.ts` | Identik di main dan fix | idem |
| `actions/*.ts` (5 files) | Identik di main dan fix | `git diff fix... main -- actions/` → empty |
| `queries.ts` | Identik di main dan fix | idem |
| `prisma/schema.prisma` | Identik | idem |
| `migration.sql` + `migration_lock.toml` | Identik | idem |
| `globals.css` | Identik di main dan revamp | `git diff main feat/revamp-mobile -- globals.css` → empty |
| `site-header.tsx` | Identik di main dan revamp | idem |
| Sections (6 files) | Identik | idem |
| Wizard (8 files) | Identik | idem |
| UI primitives (5 files) | Identik | idem |
| `public-content.ts` | Identik | idem |
| Tests (2 files) | Identik | `git diff fix... main -- *.test.ts` → empty |

### 3b. Unik di Local Main (tidak di branch lain — hilang kalau main direbuild dari branch)

| File | Situasi |
|------|---------|
| `src/app/error.tsx` | Hanya ada di local main |
| `src/app/global-error.tsx` | Hanya ada di local main |
| `docs/superpowers/specs/2026-08-19-mobile-hero-revamp-design.md` | Ada di local main, **dihapus** di `feat/revamp-mobile` (cleaned branch) |

### 3c. Konflik Nyata (Perlu Keputusan)

| Area | Situasi |
|------|---------|
| `prisma/seed.ts` | Dua versi copy untuk SiteSetting fields |

### 3d. Local Main = Superset-Final (aman, tapi perlu dijaga agar tidak tertimpa)

| File | Situasi |
|------|---------|
| `hero-section.tsx` | Main sudah hapus fake RESIDENTIAL badge + fake progress bar; revamp belum |
| `site-footer.tsx` | Main sudah fix `!bg-forest-700` dead override; revamp belum |

---

## 4. Rekomendasi Urutan Reconcile

> Ini proposal analitis, bukan instruksi eksekusi. Tidak ada merge/push/rebase dijalankan.

**Urutan PR/merge yang paling aman:**

```
Step 1: Merge fix/production-hardening → origin/main
        Alasan: Backend-only, identik dengan local main, zero frontend overlap.
        Expected merge conflicts: NONE (semua files di fix juga ada di main identik).

Step 2: Merge feat/revamp-mobile → origin/main
        (setelah step 1 selesai)
        Expected merge conflicts: prisma/seed.ts (PERLU KEPUTUSAN HAFIZH, lihat bawah)
        Files yang main lebih baru (hero-section, site-footer) — main harus jadi source of truth.

Step 3: Push local main → origin/main
        (setelah step 1 dan 2 masuk ke origin)
        Ini akan membawa: error.tsx, global-error.tsx, antislop-cleaned hero-section,
        footer bugfix, dan semua 15 commits lokal yang belum pernah di-push.
```

---

### ⚠️ PERLU KEPUTUSAN HAFIZH: `prisma/seed.ts` — SiteSetting copy

**Konteks:**  
File seed hanya digunakan saat `prisma db seed` — di development/staging reset, bukan di production runtime. Isi copy menentukan nilai default SiteSetting di DB setelah seed dijalankan ulang.

**Versi A (local main / fix/production-hardening):**
```ts
servicesLabel: servicesSection.label,   // = nilai dari public-content.ts
contactTitle: contactContent.title,
contactDesc: contactContent.description,
articlesTitle: "Inspirasi & Wawasan",
```
- **Kelebihan:** Single source of truth — perubahan di `public-content.ts` otomatis tersinkron saat seed
- **Kekurangan:** Coupling antara seed dan public-content shape; kalau export berubah, seed bisa break

**Versi B (feat/revamp-mobile):**
```ts
servicesLabel: "LAYANAN KAMI",          // hardcoded
contactTitle: "Mulai Konsultasi",       // hardcoded
articlesTitle: "Inspirasi & Tips",      // beda dari yang di public-content.ts saat ini
```
- **Kelebihan:** Seed independen dari perubahan struktur public-content; copy lebih dikurasi
- **Kekurangan:** Duplikasi antara seed copy dan public-content copy yang bisa diverge; "Inspirasi & Tips" vs "Inspirasi & Wawasan" di UI (inconsistency)

**Trade-off tanpa rekomendasi memihak:**  
Ini bukan soal correctness/security — keduanya valid. Keputusan bergantung pada: (a) seberapa sering DB di-reset dari seed, (b) apakah `public-content.ts` sering berubah, (c) mana copy yang ingin jadi "ground truth" untuk SiteSetting.

---

## 5. Working Tree Loose Ends

### 5a. `next-env.d.ts` — Modified (tidak staged)

Command: `git diff next-env.d.ts`

```diff
-import "./.next/types/routes.d.ts";
-import "./.next/types/root-params.d.ts";
+import "./.next/dev/types/routes.d.ts";
+import "./.next/dev/types/root-params.d.ts";
```

**Penjelasan:**  
Perubahan path `.next/types/` → `.next/dev/types/` adalah artifact dari Next.js dev server. File ini di-generate otomatis oleh `next dev`. File berisi komentar `// NOTE: This file should not be edited`.

**Status:** Build artifact, bukan perubahan kode intentional. Aman untuk di-revert (`git restore next-env.d.ts`) atau diabaikan. Jangan di-commit dalam keadaan ini.

---

### 5b. `mawmaw-next-steps-roadmap.md` — Untracked

Command: `git log --all --oneline -- mawmaw-next-steps-roadmap.md` → empty (tidak pernah di-commit di manapun)

**Isi file:**  
Roadmap post-launch per 2026-08-19:
- P0 (done): Zod validation, error handling, cold-start fallback, DB indexes, RLS, Upstash, frontend audit selesai
- P1 (todo): Production smoke test, `/api/health` monitoring, Sentry, backup verification, admin 2FA
- P2-P4: E2E tests, security headers, performance, SEO, analytics, staging env

**Status:** File baru, belum pernah ada di history manapun. Tidak ada versi lain untuk dibandingkan.

**Pilihan yang tersedia:**
- Commit ke `docs/` → tracking di git
- Tambah ke `.gitignore` → tetap lokal
- Biarkan untracked → risiko hilang kalau working tree di-clean

---

## 6. Summary Matrix

| File | main vs fix | main vs revamp | Keputusan? |
|------|-------------|---------------|------------|
| `src/app/api/health/route.ts` | IDENTIK | (revamp: tidak ada) | Tidak |
| `src/app/error.tsx` | Unik di main | Unik di main | Tidak — jangan hilang |
| `src/app/global-error.tsx` | Unik di main | Unik di main | Tidak — jangan hilang |
| `src/lib/server-log.ts` | IDENTIK | — | Tidak |
| `src/lib/queries.ts` | IDENTIK | — | Tidak |
| `src/lib/validations/admin.ts` | IDENTIK | — | Tidak |
| `src/app/actions/*.ts` (5 files) | IDENTIK | — | Tidak |
| `src/lib/health.test.ts` | IDENTIK | — | Tidak |
| `src/lib/admin-validations.test.ts` | IDENTIK | — | Tidak |
| `prisma/schema.prisma` | IDENTIK | — | Tidak |
| `prisma/migrations/*/migration.sql` | IDENTIK | — | Tidak |
| `prisma/migrations/migration_lock.toml` | IDENTIK | — | Tidak |
| `prisma/seed.ts` | IDENTIK | **BERBEDA** | **⚠️ YA — lihat Seksi 4** |
| `src/app/globals.css` | — | IDENTIK | Tidak |
| `src/components/layout/site-header.tsx` | — | IDENTIK | Tidak |
| `src/components/sections/hero-section.tsx` | — | Main lebih baru (antislop cleanup) | Tidak — main wins |
| `src/components/layout/site-footer.tsx` | — | Main lebih baru (dead CSS fix) | Tidak — main wins |
| Sections (6), Wizard (8), UI (5) | — | IDENTIK | Tidak |
| `src/data/public-content.ts` | — | IDENTIK | Tidak |
| `docs/superpowers/specs/2026-08-19-*.md` | — | Unik di main (revamp removed it) | Tidak |
| `next-env.d.ts` (working tree) | Build artifact | Build artifact | Tidak — jangan commit |
| `mawmaw-next-steps-roadmap.md` (untracked) | Belum ada di git | Belum ada | Tidak — tapi putuskan tindakan |

---

## 7. Daftar Command Git yang Dijalankan

Semua claim "identik" atau "berbeda" dalam laporan ini dibuktikan dengan output command berikut:

```bash
# Commit inventory
git log origin/main..main --oneline
git log origin/main..main --stat
git log fix/production-hardening --oneline -20
git log feat/revamp-mobile --oneline -20

# Branch tip content
git show fix/production-hardening --stat --name-only
git show feat/revamp-mobile --stat --name-only

# Diff stats
git diff main fix/production-hardening --stat
git diff main feat/revamp-mobile --stat
git diff fix/production-hardening feat/revamp-mobile --stat

# Backend file comparisons (git show)
git show main:src/app/api/health/route.ts
git show fix/production-hardening:src/app/api/health/route.ts
git show fix/production-hardening:src/app/error.tsx          # → fatal (tidak ada)
git show main:src/lib/server-log.ts
git show fix/production-hardening:src/lib/server-log.ts
git show origin/main:src/lib/server-log.ts
git show main:src/lib/queries.ts
git show fix/production-hardening:src/lib/queries.ts
git show origin/main:src/lib/queries.ts
git show main:src/lib/validations/admin.ts
git show fix/production-hardening:src/lib/validations/admin.ts
git show main:src/app/actions/inbox.ts
git show fix/production-hardening:src/app/actions/inbox.ts
git show origin/main:src/app/actions/inbox.ts
git show main:prisma/schema.prisma
git show fix/production-hardening:prisma/schema.prisma
git show main:prisma/migrations/20260819114514_add_performance_indexes/migration.sql
git show fix/production-hardening:prisma/migrations/20260819114514_add_performance_indexes/migration.sql
git show main:src/lib/health.test.ts
git show fix/production-hardening:src/lib/health.test.ts
git show main:src/lib/admin-validations.test.ts
git show fix/production-hardening:src/lib/admin-validations.test.ts
git show main:src/app/actions/articles.ts        # (first 30 lines)
git show fix/production-hardening:src/app/actions/articles.ts   # (first 30 lines)
git show main:src/app/actions/services.ts        # (first 80 lines)
git show fix/production-hardening:src/app/actions/services.ts   # (first 80 lines)

# Backend diff (verified empty)
git diff fix/production-hardening main -- src/app/actions/articles.ts src/app/actions/projects.ts src/app/actions/services.ts src/app/actions/settings.ts src/app/actions/inbox.ts
git diff fix/production-hardening:src/lib/validations/admin.ts main:src/lib/validations/admin.ts
git diff fix/production-hardening:src/lib/health.test.ts main:src/lib/health.test.ts
git diff fix/production-hardening:src/lib/admin-validations.test.ts main:src/lib/admin-validations.test.ts
git diff fix/production-hardening:src/app/actions/articles.ts main:src/app/actions/articles.ts

# Frontend file comparisons (git diff)
git diff main feat/revamp-mobile -- src/app/globals.css                                # empty
git diff main feat/revamp-mobile -- src/components/layout/site-header.tsx              # empty
git diff main feat/revamp-mobile -- src/components/sections/hero-section.tsx           # ada diff
git diff main feat/revamp-mobile -- src/components/layout/site-footer.tsx              # ada diff
git diff main feat/revamp-mobile -- src/data/public-content.ts                         # empty
git diff main feat/revamp-mobile -- src/components/sections/about-section.tsx ...      # empty
git diff main feat/revamp-mobile -- src/components/forms/wizard/WizardStep3Style.tsx   # empty
git diff main feat/revamp-mobile -- src/components/ui/button.tsx ...                   # empty

# Seed diff
git diff fix/production-hardening feat/revamp-mobile -- prisma/seed.ts   # ada diff
git diff fix/production-hardening main -- prisma/seed.ts                  # empty

# Working tree
git diff next-env.d.ts
git show main:next-env.d.ts
git log --all --oneline -- mawmaw-next-steps-roadmap.md   # empty — tidak pernah di-commit
Get-Content "mawmaw-next-steps-roadmap.md" -TotalCount 50
```

Semua command dijalankan dengan CWD `c:\Users\Hafizh Rizqullah\Documents\Code\Mawmaw_Inetrior` pada 2026-08-21.
