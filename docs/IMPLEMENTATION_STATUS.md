# Implementation Status

**Last updated:** 2026-08-18
**Integrated into:** `main`
**Authority:** Current source, configuration, Prisma schema, and command output
**Status:** Code implementation complete; release verification remains blocked by database environment.

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

### Contact and wizard

- Direct form and wizard use one rate-limit, persistence, and notification pipeline.
- Wizard keeps its richer seven-step schema.
- WhatsApp opens from direct user interaction independently of database success.
- Step 7 includes recap and per-step edit controls.
- All user-controlled email HTML is escaped.

### Data integrity and CMS

- Public settings query is read-only; seed owns default creation.
- Project and article default to `DRAFT` and expose status controls.
- Revalidation targets real URLs.
- `.env.example` matches variables read by source.
- Static project fixtures are empty.
- Seed cleanup is restricted to six exact legacy mock slugs.
- Default settings no longer contain the unverified project-count value.

### UI and resilience

- Project/article category controls use query-parameter filtering.
- Public route loading/error boundaries and section empty states exist.
- Major sections use content-flowing minimum height.
- Wizard and mobile navigation accessibility states are implemented.
- Placeholder contrast and footer affordances were corrected.
- Public decorative effects and generic CTA/copy patterns were reduced.

### SEO and documentation

- `sitemap.xml` uses static routes plus published project/article queries.
- `robots.txt` blocks admin/API crawling.
- Public layout emits escaped `ProfessionalService` JSON-LD from site settings.
- README and 13 project docs reflect current implementation.
- Project docs are no longer hidden by a blanket ignore rule.

## Pending

- Publish only owner-verified project records through admin.
- Introduce checked-in Prisma migrations before routine production schema evolution.
- Add database integration tests and browser tests when test infrastructure is approved.
- Decide whether service detail pages, media upload workflow, furniture catalog, or testimonials belong in a later product phase.
- Resolve Next.js middleware convention deprecation in a dedicated compatibility change.

## Blocked

| Item | Blocker | Unblock condition |
| --- | --- | --- |
| Execute exact mock-row cleanup | No valid live database credentials in current environment | Configure valid `DATABASE_URL` and `DIRECT_URL`, then run `npm run db:seed` |
| Verify production build | Build-time public queries require reachable PostgreSQL and seeded settings | Supply valid credentials and `global` SiteSetting row, then run `npm run build` |
| Verify Vercel deployment | Current deployment is failing and environment state is external | Correct Vercel database variables, redeploy, then smoke-test public/admin routes |

No source change should hide these infrastructure failures. Static verification remains mandatory.

## Verification

| Date | Command | Status | Evidence |
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
| 2026-08-18 | `npm run db:seed` after loader fix | BLOCKED | Seed starts, then PostgreSQL rejects the configured tenant/user before exact mock-row cleanup can execute |
| 2026-08-18 | `npm run build` on `main` | BLOCKED | Compile and TypeScript pass; page-data collection fails for `/projects/[slug]` because the configured PostgreSQL tenant/user is not found |
| 2026-08-18 | Post-merge `npm test` on `main` | PASS | 13 tests, 0 failures |

## Update protocol

1. Move an item between Completed, Pending, and Blocked only when source or external evidence changes.
2. Add exact command, date, and pass/fail evidence under Verification.
3. Never mark build or deployment complete from lint/typecheck results.
4. Keep historical decisions; replace stale implementation statements elsewhere in docs.
