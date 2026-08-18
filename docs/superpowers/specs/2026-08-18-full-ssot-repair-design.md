# Full SSOT Repair Design

**Date:** 2026-08-18
**Status:** Approved
**Decision owner:** Project owner

## Objective

Make repository truth match implemented application: Next.js 16, Prisma/PostgreSQL, Supabase Auth, custom admin, and database-backed public content. Remove unverified portfolio claims, add baseline SEO routes and structured data, and make project status remotely auditable.

## Constraints

- Delete only these known mock project slugs: `serenity-residence`, `oakwood-apartment`, `kopi-ruang-tengah`, `aruna-house`, `senja-office`, `nala-suite`.
- Do not delete or modify unrelated projects created through admin.
- Remove `150+` without replacing it with another metric.
- Use current code, configuration, and Prisma schema as documentation authority.
- Add no dependency and avoid unrelated refactors.
- Live database execution may remain blocked; all static verification must still run.

## Data truth

Static portfolio samples stop seeding. Seed cleanup uses one exact slug allowlist and `deleteMany({ slug: { in: [...] } })`, so unrelated rows remain untouched. Existing global settings receive the sanitized `heroStatCards` value when seed runs; other editable settings remain unchanged.

Public project pages already support empty results. No replacement portfolio or metric is invented.

## SEO

- `sitemap.ts` emits `/`, `/projects`, and `/articles`, plus published project/article URLs from current Prisma queries.
- `robots.ts` allows public crawling, blocks `/admin` and `/api`, and points to sitemap.
- Public layout emits escaped JSON-LD using `ProfessionalService` and existing `SiteSetting` fields only. No rating, opening hours, pricing, or geographic claim is invented.

One small `serializeJsonLd` helper is justified because raw JSON inside a script element must escape `<` to prevent script termination. It receives a focused regression test.

## Documentation

Remove blanket `docs/` ignore. Keep internal-only material ignored through explicit paths, including `docs/internal/`, validation reports, agent files, and antislop reports.

Restore `README.md`. Rewrite these 13 local project documents from implementation evidence:

- `API-SPEC.md`
- `ARCHITECTURE.md`
- `COMPONENTS.md`
- `DEPLOYMENT.md`
- `DESIGN-SYSTEM.md`
- `ENVIRONMENT.md`
- `MASTER_PROMPT.md`
- `PRD.md`
- `PROJECT-STRUCTURE.md`
- `RULES.md`
- `SCHEMA.md`
- `STACK.md`
- `TESTING.md`

Add `docs/IMPLEMENTATION_STATUS.md` with separate Completed, Pending, Blocked, and Verification sections. Deleted generic guideline/template files from the previous commit stay deleted; they are not current project SSOT.

## Verification

- Regression tests prove the forbidden metric and exact mock slug contract.
- SEO serialization test proves JSON-LD script safety.
- Run test, lint, typecheck, Prisma validation, stale-doc scans, and diff checks.
- Run production build. If database credentials still fail, report exact stage and keep it under Blocked rather than claiming a successful build.
