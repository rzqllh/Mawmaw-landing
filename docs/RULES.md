# Engineering Rules

## Source of truth

1. Current source, package manifest, Prisma schema, and `.env.example` outrank prose docs.
2. When behavior changes, update affected docs and `IMPLEMENTATION_STATUS.md` in the same change.
3. Prisma `db.project` is the shared project source for admin and public site.

## Change scope

- Prefer the smallest complete root-cause fix.
- Preserve unrelated behavior and dirty user work.
- Do not add dependencies, restructure folders, or replace component systems without approval.
- Do not create parallel data clients or duplicate save pipelines.

## Server and data

- Instantiate Prisma only in `src/lib/db.ts`.
- Validate trust-boundary input.
- Require Supabase user checks before every admin mutation.
- New project/article records default to `DRAFT`.
- Revalidate real URL paths, never route-group names.
- Public reads must not create or update rows.
- Seed cleanup must use an explicit identifier allowlist and never broad deletion criteria.

## Content integrity

- No sample portfolio may be published as real work.
- Do not invent metrics, testimonials, coverage areas, clients, dates, or results.
- Store incomplete content as draft or show an honest empty state.
- User-authored image URLs require meaningful alt text before publication.

## Frontend

- Server components fetch; client components handle interaction.
- Keep UI, state, validation, persistence, and integration logic separate.
- Maintain responsive content flow and keyboard access.
- Respect reduced motion.
- Reuse installed icon and UI systems.
- Use English identifiers and Indonesian user-facing copy.

## Security

- Never print or commit secrets.
- Never render `PREVIEW_SECRET` into HTML or client URLs.
- Compare secrets in constant time.
- Allow redirects to validated internal paths only.
- Escape user content before HTML email or JSON-in-script output.
- Keep browser-exposed variables limited to intended public keys.

## Git and documentation

- `docs/` is tracked project documentation.
- `docs/internal/`, named validation reports, `AGENT.md`, and antislop reports remain local-only.
- Avoid destructive Git commands.
- Do not commit environment files, build output, dependency directories, or worktrees.

## Required verification

```bash
npm test
npm run lint
npm run typecheck
npx prisma validate
npm run build
git diff --check
```

If build cannot reach required infrastructure, report it as blocked with exact stage. Passing lint or typecheck does not equal a passing build.
