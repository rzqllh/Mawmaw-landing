# Implementation Status

**Last updated:** 2026-08-19
**Integrated into:** `main`
**Authority:** Current source, configuration, Prisma schema, and command output
**Status:** Production release verification complete: PASS. Production deployed at `https://mawmaw-interior.vercel.app`.

## Decisions

| Date | Decision | Effect |
| --- | --- | --- |
| 2026-08-18 | Retain Next.js 16, Prisma/PostgreSQL, Supabase Auth, and custom admin | Previous Payload/MongoDB/Cloudinary documentation is retired |
| 2026-08-18 | Remove unverified metric and all six known mock portfolio records | Seed no longer publishes example portfolio; empty states remain until real work is added |
| 2026-08-18 | Track project docs in Git | `docs/` is durable; internal agent material uses explicit ignore paths |

## Completed

### Security

- Admin reorder action requires Supabase authentication.
- Draft preview has no hardcoded bypass and uses constant-time secret comparison.
- Preview secrets are not rendered in admin URLs.
- Draft-exit redirect accepts internal paths only, with regression coverage.
- Unauthenticated access to `/admin` is guarded and redirected to `/admin/login`.
- Authenticated admin session verified in production browser (login with owner credentials opens protected dashboard without redirect loops).

### Contact and wizard

- Direct form and wizard use one rate-limit, persistence, and notification pipeline.
- Wizard keeps its richer seven-step schema.
- WhatsApp opens from direct user interaction independently of database success.
- Step 7 includes recap and per-step edit controls.
- All user-controlled email HTML is escaped.
- Contact form submission successfully persists to `db.contactSubmission` in production.

### Data integrity and CMS

- Public settings query is read-only; seed owns default creation.
- Project and article default to `DRAFT` and expose status controls.
- Revalidation targets real URLs.
- `.env.example` matches variables read by source.
- Static project fixtures are empty.
- Seed cleanup is restricted to six exact legacy mock slugs.
- Live seed cleanup removed the six legacy mock project records on 2026-08-19.
- Default settings no longer contain the unverified project-count value.
- Production database read/write verified (temporary draft project created, isolated from published query, read back, and deleted).
- Admin CMS list rendering normalized to DataGrid across projects, services, and articles to prevent Server-to-Client function serialization errors.

### UI and resilience

- Project/article category controls use query-parameter filtering.
- Public route loading/error boundaries and section empty states exist.
- Major sections use content-flowing minimum height.
- Wizard and mobile navigation accessibility states are implemented.
- Placeholder contrast and footer affordances were corrected.
- Public decorative effects and generic CTA/copy patterns were reduced.
- Responsive layout verified across Mobile (390px), Tablet (768px), and Desktop (1440px).

### SEO and documentation

- `sitemap.xml` uses static routes plus published project/article queries (`https://mawmaw-interior.vercel.app/sitemap.xml`).
- `robots.txt` blocks admin/API crawling (`https://mawmaw-interior.vercel.app/robots.txt`).
- Public layout emits escaped `ProfessionalService` JSON-LD from site settings with valid schema.org markup.
- README and 13 project docs reflect current implementation.
- Project docs are no longer hidden by a blanket ignore rule.

### Production release verification

- Vercel production deployment `https://mawmaw-interior.vercel.app` built and marked `● Ready`.
- Public routes (`/`, `/projects`, `/articles`, `/articles/ruang-tamu-hangat`, `/sitemap.xml`, `/robots.txt`) verified with HTTP 200 and zero runtime/hydration errors.
- Mock project slugs verified absent in both HTML and PostgreSQL database.
- 150+ project count verified absent from all public views and metadata.
- Authenticated admin routes (`/admin`, `/admin/projects`, `/admin/articles`, `/admin/services`, `/admin/settings`, `/admin/inbox`) verified with live database reads.

## Pending

- Publish only owner-verified project records through admin.
- Introduce checked-in Prisma migrations before routine production schema evolution.
- Add database integration tests and browser tests when test infrastructure is approved.
- Decide whether service detail pages, media upload workflow, furniture catalog, or testimonials belong in a later product phase.
- Resolve Next.js middleware convention deprecation in a dedicated compatibility change.
- Address npm audit vulnerabilities (3 moderate, 11 high) in a dedicated dependency maintenance update.

## Blocked

None. All release-critical criteria verified.

## Verification

| Date | Command / Check | Status | Evidence |
| --- | --- | --- | --- |
| 2026-08-18 | Worktree baseline `npm test` | PASS | 10 tests, 0 failures |
| 2026-08-18 | Content cleanup `npm test` | PASS | 12 tests, 0 failures |
| 2026-08-18 | SEO task `npm test` | PASS | 13 tests, 0 failures |
| 2026-08-18 | SEO task `npm run lint` | PASS | Exit 0 |
| 2026-08-18 | SEO task `npm run typecheck` | PASS | Exit 0 |
| 2026-08-18 | Content task `npx prisma validate` | PASS | Schema valid |
| 2026-08-18 | Final `npm test` | PASS | 13 tests, 0 failures |
| 2026-08-18 | Final `npm run lint` | PASS | Exit 0, no reported warnings |
| 2026-08-18 | Final `npm run typecheck` | PASS | Exit 0 |
| 2026-08-18 | Final `npx prisma validate` | PASS | Schema valid |
| 2026-08-18 | Active documentation drift scan | PASS | 13 active project docs, 0 stale-stack/content matches |
| 2026-08-18 | Forbidden live-copy scan | PASS | 0 matches outside regression/cleanup records |
| 2026-08-18 | Seed loader regression `npm test` | PASS | 14 tests, 0 failures; ESM import loads `.env.local` without CommonJS `require` |
| 2026-08-18 | Post-merge `npm test` on `main` | PASS | 13 tests, 0 failures |
| 2026-08-18 | Post-loader merge `npm test` on `main` | PASS | 14 tests, 0 failures |
| 2026-08-18 | Post-loader merge `npm run lint` on `main` | PASS | Exit 0, no reported warnings |
| 2026-08-18 | Post-loader merge `npm run typecheck` on `main` | PASS | Exit 0 |
| 2026-08-18 | Post-loader merge `npx prisma validate` on `main` | PASS | Schema valid |
| 2026-08-18 | Main SSOT integrity scan | PASS | README, 13 active project docs, implementation ledger, SEO routes/helper, and exact mock-slug cleanup guard are tracked; project docs are not blanket-ignored |
| 2026-08-19 | `npm run db:seed` | PASS | Removed 6 legacy mock projects; seeded 6 articles, 6 services, and site settings |
| 2026-08-19 | `npm run build` | PASS | Compiled, completed TypeScript and page-data collection, then generated 27/27 static pages |
| 2026-08-19 | Vercel production build & deploy | PASS | Commit `e80199b` deployed to `https://mawmaw-interior.vercel.app`, status `● Ready` |
| 2026-08-19 | Production public routes check | PASS | `/`, `/projects`, `/articles`, `/articles/ruang-tamu-hangat`, `/sitemap.xml`, `/robots.txt` return HTTP 200 |
| 2026-08-19 | Content truth & mock removal check | PASS | `150+` metric and 6 mock slugs absent in production HTML and DB; empty states render gracefully |
| 2026-08-19 | Production sitemap & robots check | PASS | `/sitemap.xml` has valid XML with 6 articles & public routes; `/robots.txt` disallows `/admin` and `/api` |
| 2026-08-19 | JSON-LD schema verification | PASS | Valid `ProfessionalService` JSON-LD with real `SiteSetting` data, escaped and without fake metrics |
| 2026-08-19 | Admin auth guard smoke test | PASS | `/admin` automatically redirects unauthenticated users to `/admin/login` |
| 2026-08-19 | Admin authenticated access | PASS | Signed in via `/admin/login` in production; verified `/admin`, `/admin/projects`, `/admin/articles`, `/admin/services`, `/admin/settings`, and `/admin/inbox` with production DB reads |
| 2026-08-19 | Production DB read/write smoke test | PASS | Temporary draft project created, isolated from published query, read back, and deleted |
| 2026-08-19 | Contact form submission persistence | PASS | Submitted contact form through live UI; record persisted to `db.contactSubmission`; test record cleaned up |
| 2026-08-19 | Contact email delivery | NOT VERIFIED | Non-blocking; Resend API key unconfigured, but contact persistence completes successfully without crashing |
| 2026-08-19 | Browser & responsive smoke test | PASS | Checked Desktop (1440px), Mobile (390px), and Tablet (768px); no horizontal overflow; zero console errors |
| 2026-08-19 | Full local regression test suite | PASS | `npm test` (14/14), `npm run lint` (0 errors), `npm run typecheck` (0 errors), `npx prisma validate`, `npm run build` (27/27 static pages) |
| 2026-08-19 | Post-release credential & secret scan | PASS | Tracked repository and Git history contain 0 secrets/passwords; `.env.local` is ignored and untracked; temporary testing scripts removed |
| 2026-08-19 | Dependency vulnerability audit (`npm audit`) | PASS | Read-only scan triaged 14 vulnerabilities (3 moderate, 11 high); dev/upstream classification documented for scheduled maintenance |
| 2026-08-19 | Resend production readiness audit | PASS | Non-blocking contact persistence verified; manual configuration requirements documented for owner |
| 2026-08-19 | Prisma migration readiness audit | PASS | Safe non-destructive baseline adoption plan documented (`prisma migrate dev --create-only` + `prisma migrate resolve --applied`) |
| 2026-08-19 | Next.js middleware deprecation audit | PASS | Informational deprecation analyzed; zero runtime breakage; migration plan to `src/proxy.ts` established |

## Update protocol

1. Move an item between Completed, Pending, and Blocked only when source or external evidence changes.
2. Add exact command, date, and pass/fail evidence under Verification.
3. Never mark build or deployment complete from lint/typecheck results.
4. Keep historical decisions; replace stale implementation statements elsewhere in docs.
