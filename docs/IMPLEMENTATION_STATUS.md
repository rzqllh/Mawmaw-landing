# Implementation Status

**Last updated:** 2026-08-21
**Integrated into:** `main` (commit `add1031`)
**Authority:** Current source, configuration, Prisma schema, migration ledger, and live production runtime verification
**Status:** Production release verification complete: PASS. Production deployed at `https://mawmaw-interior.vercel.app` on commit `add1031`.

## Decisions

| Date | Decision | Effect |
| --- | --- | --- |
| 2026-08-18 | Retain Next.js 16, Prisma/PostgreSQL, Supabase Auth, and custom admin | Previous Payload/MongoDB/Cloudinary documentation is retired |
| 2026-08-18 | Remove unverified metric and all six known mock portfolio records | Seed no longer publishes example portfolio; empty states remain until real work is added |
| 2026-08-18 | Track project docs in Git | `docs/` is durable; internal agent material uses explicit ignore paths |
| 2026-08-19 | Adopt checked-in Prisma migrations | Migrations are tracked in `prisma/migrations/`; `20260819000000_baseline`, `20260819000100_default_content_status_draft`, and `20260819114514_add_performance_indexes` applied |
| 2026-08-21 | Production hardening and mobile revamp release | Integrated `/api/health` zero-leak check, accessible route/global error boundaries, Zod admin validation, cold-start settings fallback, capped inbox queries, and editorial mobile hero/nav revamp |

## Completed

### Security and Observability

- Admin reorder and CRUD actions require authenticated Supabase session (`requireAuth` / `verifyAuth`).
- Supabase session handling uses cookie-based SSR tokens managed through `@supabase/ssr` in `src/proxy.ts` and `src/lib/supabase/server.ts`.
- Unauthenticated access to `/admin` is guarded and redirected to `/admin/login`.
- Draft preview has no hardcoded bypass and uses constant-time secret comparison without URL exposure.
- Draft-exit redirect accepts internal paths only, with regression coverage.
- Live `/api/health` endpoint checks database connectivity (`SELECT 1`), returns safe HTTP 200 `{status:"ok", timestamp}` or 503 `{status:"unhealthy"}`, headers `Cache-Control: no-store, no-cache, must-revalidate`, and prevents connection string / stack trace disclosure.
- Route error boundary (`src/app/error.tsx`) and root error boundary (`src/app/global-error.tsx`) provide user-safe Indonesian error states and recovery controls.
- Structured server error logging (`src/lib/server-log.ts`) formats events (`contact.persistence_failed`, `contact.notification_failed`, `health.check_failed`, `system.unhandled_error`) without credential leakage.

### Contact and Wizard

- Direct form and wizard use a unified rate-limit, persistence, and notification pipeline.
- Wizard retains seven-step schema with per-step edit controls and recap.
- WhatsApp handoff functions independently of database persistence.
- User-controlled email HTML is sanitized with `escapeHtml()`.
- Live contact submission verified in production (Server Action returns `{success:true}`, record persists to `db.contactSubmission` with `status: NEW`, and smoke record cleanup verified).

### Data Integrity and CMS

- All admin form mutations validate input boundaries with Zod schemas (`articleSchema`, `projectSchema`, `serviceSchema` in `src/lib/validations/admin.ts`).
- Public settings query (`getSiteSettings` in `src/lib/queries.ts`) includes `getDefaultSiteSettings()` cold-start fallback so initial render succeeds before admin creates row.
- Inbox query `getSubmissions()` enforces a bounded limit (`Math.min(Math.max(1, limit), 250)`).
- Checked-in Prisma migrations are fully adopted:
  - `20260819000000_baseline`
  - `20260819000100_default_content_status_draft`
  - `20260819114514_add_performance_indexes` (additive, non-breaking performance indexes on Project, Article, ContactSubmission, Service)
- Database schema is synchronized with live Supabase PostgreSQL (`aws-1-ap-southeast-1.pooler.supabase.com`), verified with `npx prisma migrate status`.
- Project and article default to `DRAFT` status.

### UI, Accessibility, and Design System

- Full-bleed editorial mobile hero revamp with split-pill CTA, floating pill navbar, and calibrated typography.
- Mobile navigation drawer built with luxury dark frosted glass theme and staggered animations.
- WCAG 2.1 touch target compliance (button sm size 44px min).
- Keyboard focus-visible rings across all wizard steps and form inputs.
- Inverse input text color token corrected to `text-text-inverse`.
- Public decorative filler and unverified metric tags removed.

### Production Release Status

- **App Deployment:** Current — Vercel production deployment verified live at `https://mawmaw-interior.vercel.app` (Vercel check: success).
- **Database Schema:** Current — Supabase PostgreSQL migration history is current with no pending or divergent migrations.
- **Backward Compatibility:** Verified — application-contract backward-compatible; additive indexes only.

## Pending

- Add owner portfolio projects through the admin dashboard (`/admin/projects/new`).
- Configure production Resend API key (`RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL`) if email notification dispatch is desired.
- Evaluate external uptime monitoring (e.g., pinging `/api/health`) and external error monitoring integration in a future ops milestone.
- Security note: Supabase supports MFA/TOTP, but Mawmaw currently has no application-level MFA enrollment, challenge, or AAL2 enforcement.
- Decide whether service detail pages, media upload workflow, furniture catalog, or testimonials belong in a later product phase.

## Blocked

None. All release-critical criteria verified.

## Verification

| Date | Command / Check | Status | Evidence |
| --- | --- | --- | --- |
| 2026-08-21 | Local regression suite `npm test` | PASS | 30 tests, 0 failures |
| 2026-08-21 | Code quality check `npm run lint` | PASS | Exit 0, 0 errors, 0 warnings |
| 2026-08-21 | TypeScript check `npm run typecheck` | PASS | Exit 0, 0 errors |
| 2026-08-21 | Dependency vulnerability gate `npm run audit:ci` | PASS | Exit 0, 0 unexpected vulnerabilities |
| 2026-08-21 | Prisma schema validate `npx prisma validate` | PASS | Schema valid |
| 2026-08-21 | Production migration status `npx prisma migrate status` | PASS | 3 migrations found, database schema up to date on Supabase pooler |
| 2026-08-21 | Production build `npm run build` | PASS | Compiled successfully, 27/27 static pages generated with Turbopack |
| 2026-08-21 | Whitespace and merge check `git diff --check` | PASS | Exit 0, 0 whitespace errors or conflict markers |
| 2026-08-21 | Git push to origin `git push origin main` | PASS | Pushed `f394557..add1031` to `origin/main` |
| 2026-08-21 | Live health check endpoint verification | PASS | `GET https://mawmaw-interior.vercel.app/api/health` returns HTTP 200 `{"status":"ok","timestamp":"..."}` |
| 2026-08-21 | Live public routes check | PASS | `/`, `/projects`, `/articles`, `/articles/ruang-tamu-hangat`, `/sitemap.xml`, `/robots.txt` return HTTP 200 |
| 2026-08-21 | Live admin auth guard check | PASS | `GET https://mawmaw-interior.vercel.app/admin` returns HTTP 307 redirect to `/admin/login` |
| 2026-08-21 | Live contact form submission smoke test | PASS | Direct form submitted via live Next.js Server Action; server returned `{success:true}` |
| 2026-08-21 | Production DB persistence & cleanup verification | PASS | Smoke record retrieved from Supabase `db.contactSubmission` (`status: NEW`), then deleted (count: 8 cleanup) |

## Update Protocol

1. Move an item between Completed, Pending, and Blocked only when source or external evidence changes.
2. Add exact command, date, and pass/fail evidence under Verification.
3. Never mark build or deployment complete from lint/typecheck results.
4. Keep historical decisions; replace stale implementation statements elsewhere in docs.

