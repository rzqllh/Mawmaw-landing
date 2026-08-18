# Agent Context

Use this file as short project orientation. Detailed truth lives in linked docs and source.

## Project

Mawmaw Interior is a Next.js 16 public portfolio and custom admin application. Public content comes from PostgreSQL through Prisma. Supabase Auth protects admin routes and mutations.

## Read before changing

1. `README.md`
2. `docs/IMPLEMENTATION_STATUS.md`
3. Relevant source and tests
4. `prisma/schema.prisma` for data work
5. `.env.example` for configuration work

## Hard constraints

- Keep Prisma/PostgreSQL/Supabase architecture.
- Use shared `db` client; never instantiate Prisma elsewhere.
- Preserve separate direct-form and wizard schemas while sharing persistence.
- Require auth on admin actions.
- Default new project/article content to draft.
- Do not publish placeholder portfolio, customer stories, testimonials, or metrics.
- Add no dependency without owner approval.
- Keep UI responsive, keyboard-accessible, and reduced-motion aware.
- Update durable docs when implementation truth changes.

## Current public routes

`/`, `/projects`, `/projects/[slug]`, `/articles`, `/articles/[slug]`, `/sitemap.xml`, `/robots.txt`.

## Current admin scope

Project, article, service, global settings, inbox, ordering, draft/publish, and secure preview.

## Consultation flow

Seven steps collect service, space, style, budget, timeline, Jabodetabek location, recap, and contact details. Submission opens WhatsApp from the user click and independently attempts database persistence plus optional email notification.

## Definition of done

- Requested behavior exists end to end.
- Regression test covers non-trivial new logic.
- `npm test`, lint, typecheck, Prisma validation, and diff check pass.
- Production build passes, or infrastructure failure is recorded under Blocked with exact evidence.
- `docs/IMPLEMENTATION_STATUS.md` reflects final status.
