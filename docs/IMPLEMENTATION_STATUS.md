# Implementation Status

**Last updated:** 2026-08-21
**Integrated into:** `main` (commit `10823e2`)
**Authority:** Current source, configuration, Prisma schema, migration ledger, GitHub Actions CI ledger, and live production runtime verification
**Status:** Production stable. Live at `https://mawmaw-interior.vercel.app`. All verification gates and GitHub Actions CI passing.

## Decisions

| Date | Decision | Effect |
| --- | --- | --- |
| 2026-08-18 | Retain Next.js 16, Prisma/PostgreSQL, Supabase Auth, and custom admin | Previous Payload/MongoDB/Cloudinary documentation is retired |
| 2026-08-18 | Remove unverified metric and all six known mock portfolio records | Seed no longer publishes example portfolio; empty states remain until real work is added |
| 2026-08-18 | Track project docs in Git | `docs/` is durable; internal agent material uses explicit ignore paths |
| 2026-08-19 | Adopt checked-in Prisma migrations | Migrations are tracked in `prisma/migrations/`; `20260819000000_baseline`, `20260819000100_default_content_status_draft`, and `20260819114514_add_performance_indexes` applied |
| 2026-08-21 | Production hardening and mobile revamp release | Integrated `/api/health` zero-leak check, accessible route/global error boundaries, Zod admin validation, cold-start settings fallback, capped inbox queries, and editorial mobile hero/nav revamp |
| 2026-08-21 | P2-Final: Legal, CI, and SEO completion | Added `kebijakan-privasi` page + footer link + sitemap entry; canonical and twitter card meta on article/project detail pages; fixed hero variant CTA anchor; added GitHub Actions CI workflow |
| 2026-08-21 | CI & UI Polish Gate | Updated Node.js to 22 in CI workflow (`.github/workflows/ci.yml`), added safe DB error fallbacks in `src/lib/queries.ts` for offline/CI builds, restored white/black theme tokens in Tailwind 4, verified CI run `32469662425` passing |

## Completed

### Security and Observability

- Admin reorder and CRUD actions require authenticated Supabase session (`requireAuth` / `verifyAuth`).
- Supabase session handling uses cookie-based SSR tokens managed through `@supabase/ssr` in `src/proxy.ts` and `src/lib/supabase/server.ts`.
- Unauthenticated access to `/admin` is guarded and redirected to `/admin/login`.
- Draft preview has no hardcoded bypass and uses constant-time secret comparison without URL exposure.
- Draft-exit redirect accepts internal paths only, with regression coverage.
- Live `/api/health` endpoint checks database connectivity (`SELECT 1`), returns safe HTTP 200 `{status:"ok", timestamp}` or 503 `{status:"unhealthy"}`, headers `Cache-Control: no-store, no-cache, must-revalidate`, and prevents connection string / stack trace disclosure.
- Route error boundary (`src/app/error.tsx`) and root error boundary (`src/app/global-error.tsx`) provide user-safe Indonesian error states and recovery controls.
- Structured server error logging (`src/lib/server-log.ts`) formats events without credential leakage.
- Security headers verified in production: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- `poweredByHeader: false` in `next.config.mjs` removes `X-Powered-By: Next.js`.
- **Note**: Content-Security-Policy (CSP) header is deferred to owner infrastructure milestone (requires nonce integration for Next.js App Router inline RSC scripts).

### Contact and Wizard

- Direct form and wizard use a unified rate-limit, persistence, and notification pipeline.
- Wizard retains seven-step schema with per-step edit controls and recap.
- WhatsApp handoff functions independently of database persistence.
- User-controlled email HTML is sanitized with `escapeHtml()`.
- Live contact submission verified in browser smoke test on production: Server Action returns success toast, record persists to `db.contactSubmission` with `status: NEW`, exact test record IDs deleted cleanly.

### Data Integrity and CMS

- All admin form mutations validate input boundaries with Zod schemas (`articleSchema`, `projectSchema`, `serviceSchema` in `src/lib/validations/admin.ts`).
- Public queries (`src/lib/queries.ts`) feature safe error handling and fallbacks for cold-start and offline/CI environments.
- Inbox query `getSubmissions()` enforces a bounded limit (`Math.min(Math.max(1, limit), 250)`).
- Checked-in Prisma migrations are fully adopted:
  - `20260819000000_baseline`
  - `20260819000100_default_content_status_draft`
  - `20260819114514_add_performance_indexes`
- Database schema synchronized with Supabase PostgreSQL (`aws-1-ap-southeast-1.pooler.supabase.com`), verified with `npx prisma migrate status`.
- Project and article default to `DRAFT` status.

### UI, Accessibility, and Design System

- Full-bleed editorial mobile hero revamp with split-pill CTA, floating pill navbar, and calibrated typography.
- Mobile navigation drawer built with luxury dark frosted glass theme and staggered animations.
- Responsive viewports verified across 360px, 390px, 768px, 1024px, and 1440px.
- Skip-to-content keyboard link (`#main-content`) verified active on Tab keypress.
- Focus rings verified on interactive elements.
- Design tokens: `--color-white`, `--color-black`, `--color-text-inverse` defined in `@theme inline` for Tailwind 4.

### SEO and Metadata

- Root layout: global OG image, title template, `metadataBase`, twitter card.
- Public layout: JSON-LD `ProfessionalService` structured data with `serializeJsonLd()` (XSS-safe, angle-bracket escaped). Tested in `src/lib/seo.test.ts`.
- Article detail pages: canonical URL, twitter card meta, OG image/title/description.
- Project detail pages: canonical URL, full OG block, twitter card meta.
- `sitemap.xml`: dynamic route, includes home, projects, articles, kebijakan-privasi, published project slugs, published article slugs.
- `robots.txt`: allows `/`, disallows `/admin` and `/api`, sitemap reference.

### Legal and Privacy

- `/kebijakan-privasi` page with full Indonesian privacy policy content.
- Privacy policy linked in site footer bottom bar and sitemap.

### CI/CD

- GitHub Actions CI workflow (`.github/workflows/ci.yml`) using Node.js 22.
- Verified successful run `32469662425` on commit `6513761` (all 10 steps passed: Setup, Checkout, Node 22, Install, Prisma generate, Typecheck, Lint, Tests, Audit CI, Production Build).
- Vercel deploys automatically from `main` via GitHub integration.

### Lighthouse & Performance Audits (Production)

- **Homepage (`/`)**:
  - SEO: 100
  - Best Practices: 100
  - Accessibility: 92
  - Performance: 70 (CLS: 0, FCP: 1.5s, TBT: 430ms)
- **Article Detail (`/articles/ruang-tamu-hangat`)**:
  - SEO: 100
  - Best Practices: 100
  - Accessibility: 96
  - Performance: 89 (CLS: 0, FCP: 1.1s, LCP: 2.9s, TBT: 290ms)

## Pending (Owner-Dependent)

- Add real owner portfolio projects through the admin dashboard (`/admin/projects/new`).
- Admin E2E authentication flow (requires real Supabase owner login credentials).
- Configure production Resend API key (`RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL`) if email notification dispatch is desired.
- Configure SPF/DKIM/DMARC DNS records on domain registrar for custom domain email delivery.
- Set up external uptime monitoring (e.g. UptimeRobot) pinging `/api/health`.
- Set up Sentry DSN if third-party error monitoring is desired.
- CSP header nonce integration (deferred infrastructure task).

## Blocked

None. All release-critical criteria verified with fresh runtime evidence.

## Verification Log

| Date | Command / Check | Status | Evidence |
| --- | --- | --- | --- |
| 2026-08-21 | Local regression suite `npm test` | PASS | 30 tests, 0 failures |
| 2026-08-21 | Code quality check `npm run lint` | PASS | Exit 0, 0 errors, 0 warnings |
| 2026-08-21 | TypeScript check `npm run typecheck` | PASS | Exit 0, 0 errors |
| 2026-08-21 | Dependency vulnerability gate `npm run audit:ci` | PASS | Exit 0, 0 unexpected vulnerabilities |
| 2026-08-21 | Prisma schema validate `npx prisma validate` | PASS | Schema valid |
| 2026-08-21 | Production migration status `npx prisma migrate status` | PASS | 3 migrations applied, database schema up to date on Supabase pooler |
| 2026-08-21 | Production build `npm run build` | PASS | Compiled successfully, 28/28 static pages generated |
| 2026-08-21 | Whitespace check `git diff --check` | PASS | Exit 0, 0 whitespace errors |
| 2026-08-21 | GitHub Actions CI Run | PASS | Run ID `32469662425` on commit `6513761` completed `success` |
| 2026-08-21 | Live health check endpoint | PASS | `GET https://mawmaw-interior.vercel.app/api/health` returns HTTP 200 `{"status":"ok"}` |
| 2026-08-21 | Live public routes check | PASS | `/`, `/projects`, `/articles`, `/kebijakan-privasi`, `/sitemap.xml`, `/robots.txt` return HTTP 200 |
| 2026-08-21 | Responsive viewports check | PASS | 360px, 390px, 768px, 1024px, 1440px verified in browser |
| 2026-08-21 | Contact smoke test | PASS | Form submit verified on prod, DB record verified & deleted cleanly |
| 2026-08-21 | Lighthouse Homepage | PASS | SEO: 100, Best Practices: 100, Accessibility: 92, Performance: 70 |
| 2026-08-21 | Lighthouse Article Detail | PASS | SEO: 100, Best Practices: 100, Accessibility: 96, Performance: 89 |
