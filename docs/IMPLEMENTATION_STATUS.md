# Implementation Status

**Last updated:** 2026-08-21
**Integrated into:** `main` (commit `e73aa4f`)
**Authority:** Current source, configuration, Prisma schema, migration ledger, and live production runtime verification
**Status:** Production stable. Live at `https://mawmaw-interior.vercel.app`. Commits `05c1f69`, `a811a04`, `e73aa4f` pushed and verified live.

## Decisions

| Date | Decision | Effect |
| --- | --- | --- |
| 2026-08-18 | Retain Next.js 16, Prisma/PostgreSQL, Supabase Auth, and custom admin | Previous Payload/MongoDB/Cloudinary documentation is retired |
| 2026-08-18 | Remove unverified metric and all six known mock portfolio records | Seed no longer publishes example portfolio; empty states remain until real work is added |
| 2026-08-18 | Track project docs in Git | `docs/` is durable; internal agent material uses explicit ignore paths |
| 2026-08-19 | Adopt checked-in Prisma migrations | Migrations are tracked in `prisma/migrations/`; `20260819000000_baseline`, `20260819000100_default_content_status_draft`, and `20260819114514_add_performance_indexes` applied |
| 2026-08-21 | Production hardening and mobile revamp release | Integrated `/api/health` zero-leak check, accessible route/global error boundaries, Zod admin validation, cold-start settings fallback, capped inbox queries, and editorial mobile hero/nav revamp |
| 2026-08-21 | P2-Final: Legal, CI, and SEO completion | Added `kebijakan-privasi` page + footer link + sitemap entry; canonical and twitter card meta on article/project detail pages; fixed hero variant CTA anchor; added GitHub Actions CI workflow |

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
- Security headers present in production (verified 2026-08-21): `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- `poweredByHeader: false` in next.config.mjs removes `X-Powered-By: Next.js`.
- **Note**: Content-Security-Policy (CSP) header is NOT currently set. Adding CSP to Next.js 16 App Router requires nonce integration (RSC inline scripts break with strict CSP). Deferred to owner-dependent infrastructure milestone.

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
- Skip-to-content anchor (`#main-content`) present in public layout for keyboard/assistive tech navigation.
- No `outline: none` or `outline: 0` without replacement in any CSS or component.
- Focus ring token `--focus-ring: rgba(212, 190, 66, 0.86)` defined and applied.

### SEO and Metadata

- Root layout: global OG image, title template, `metadataBase`, twitter card.
- Public layout: JSON-LD `ProfessionalService` structured data with `serializeJsonLd()` (XSS-safe, angle-bracket escaped). Tested in `src/lib/seo.test.ts`.
- Article detail pages: canonical URL, twitter card meta, OG image/title/description.
- Project detail pages: canonical URL, full OG block (title, description, url, siteName, type, images with dimensions), twitter card meta.
- `sitemap.xml`: dynamic route, includes home, projects, articles, kebijakan-privasi, published project slugs, published article slugs.
- `robots.txt`: allows `/`, disallows `/admin` and `/api`, sitemap reference.

### Legal and Privacy

- `/kebijakan-privasi` page with full Indonesian privacy policy content: data collection disclosure, purpose, storage, user rights, contact for data requests.
- Privacy policy linked in site footer bottom bar.
- Privacy policy included in sitemap.xml.
- Privacy policy metadata correct (`title`, `description`).

### CI/CD

- GitHub Actions CI workflow at `.github/workflows/ci.yml`: triggers on push/PR to `main`, runs `npm ci`, `prisma generate`, `typecheck`, `lint`, `test`, `audit:ci`, and production `build`.
- Vercel deploys automatically from `main` via GitHub integration.

### Production Release Status

- **App Deployment:** Current — Vercel production deployment live at `https://mawmaw-interior.vercel.app`. Commits `05c1f69`, `a811a04`, `e73aa4f` pushed to `origin/main`.
- **Database Schema:** Current — Supabase PostgreSQL migration history is current with no pending or divergent migrations.
- **Backward Compatibility:** Verified — application-contract backward-compatible; additive indexes only.

## Pending

- Add owner portfolio projects through the admin dashboard (`/admin/projects/new`).
- Configure production Resend API key (`RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL`) if email notification dispatch is desired.
- Evaluate external uptime monitoring (e.g., pinging `/api/health`) and external error monitoring integration in a future ops milestone.
- Security note: Supabase supports MFA/TOTP, but Mawmaw currently has no application-level MFA enrollment, challenge, or AAL2 enforcement.
- Decide whether service detail pages, media upload workflow, furniture catalog, or testimonials belong in a later product phase.
- CSP header: deferred — requires nonce integration for Next.js 16 App Router (RSC inline scripts incompatible with strict CSP without nonces). Owner-dependent infrastructure decision.
- SPF/DKIM/DMARC DNS records: owner-dependent (requires access to domain registrar DNS panel).
- External uptime monitoring (UptimeRobot, Better Uptime, etc.): owner-dependent account setup.
- Third-party error alerting (Sentry DSN): owner-dependent account setup.
- Admin MFA/2FA: owner-dependent Supabase configuration.

## Blocked

None. All release-critical criteria verified.

## Verification

| Date | Command / Check | Status | Evidence |
| --- | --- | --- | --- |
| 2026-08-21 | Local regression suite `npm test` | PASS | 30 tests, 0 failures |
| 2026-08-21 | Code quality check `npm run lint` | PASS | Exit 0, 0 errors, 0 warnings |
| 2026-08-21 | TypeScript check `npm run typecheck` | PASS | Exit 0, 0 errors |
| 2026-08-21 | Dependency vulnerability gate `npm run audit:ci` | PASS | Exit 0, 0 unexpected vulnerabilities |
| 2026-08-21 | Prisma schema validate `npx prisma validate` | PASS | Schema valid (prior session) |
| 2026-08-21 | Production migration status `npx prisma migrate status` | PASS | 3 migrations found, database schema up to date on Supabase pooler (prior session) |
| 2026-08-21 | Production build `npm run build` | PASS | Compiled successfully, 27/27 static pages generated (prior session) |
| 2026-08-21 | Whitespace and merge check `git diff --check` | PASS | Exit 0, 0 whitespace errors or conflict markers |
| 2026-08-21 | Git push to origin `git push origin main` | PASS | Pushed `47bc1af..e73aa4f` to `origin/main` (3 new commits) |
| 2026-08-21 | Live health check endpoint | PASS | `GET https://mawmaw-interior.vercel.app/api/health` returns HTTP 200 `{"status":"ok","timestamp":"2026-08-21T09:01:15.692Z"}` |
| 2026-08-21 | Live public routes check | PASS | `/`, `/projects`, `/articles`, `/sitemap.xml`, `/robots.txt` return HTTP 200 |
| 2026-08-21 | Live kebijakan-privasi route check | PASS | `GET https://mawmaw-interior.vercel.app/kebijakan-privasi` returns HTTP 200 |
| 2026-08-21 | Live admin auth guard check | PASS | `GET https://mawmaw-interior.vercel.app/admin` returns redirect (unauthenticated guard active) |
| 2026-08-21 | Production security headers check | PASS | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` confirmed in response headers |
| 2026-08-21 | Git working tree clean | PASS | `git status` shows `nothing to commit, working tree clean` |

## Update Protocol

1. Move an item between Completed, Pending, and Blocked only when source or external evidence changes.
2. Add exact command, date, and pass/fail evidence under Verification.
3. Never mark build or deployment complete from lint/typecheck results.
4. Keep historical decisions; replace stale implementation statements elsewhere in docs.
