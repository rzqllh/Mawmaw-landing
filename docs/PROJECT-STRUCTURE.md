# Project Structure

```text
.
├── prisma/
│   ├── schema.prisma          # PostgreSQL data contract
│   └── seed.ts                # Initial content and exact mock cleanup
├── public/                    # Static brand assets
├── src/
│   ├── actions/               # Wizard action delegate
│   ├── app/
│   │   ├── (public)/          # Public pages and layout
│   │   ├── admin/             # Login and protected custom admin
│   │   ├── actions/           # Server actions
│   │   ├── api/               # Draft mode routes
│   │   ├── globals.css        # Tailwind theme and global tokens
│   │   ├── robots.ts          # Crawler policy
│   │   └── sitemap.ts         # Public URL inventory
│   ├── components/
│   │   ├── admin/             # Admin shell and controls
│   │   ├── cards/             # Project/article/service cards
│   │   ├── editor/            # Markdown editor
│   │   ├── forms/wizard/      # Seven-step consultation flow
│   │   ├── layout/            # Public header/footer/page helpers
│   │   ├── motion/            # Reveal primitive
│   │   ├── sections/          # Landing-page sections
│   │   └── ui/                # Shared UI primitives
│   ├── data/                  # Static defaults and content types
│   ├── hooks/                 # Wizard store
│   ├── lib/
│   │   ├── supabase/          # Browser/server/middleware clients
│   │   ├── validations/       # Wizard schemas
│   │   ├── db.ts              # Singleton Prisma client
│   │   ├── queries.ts         # Cached public reads and DTO mapping
│   │   └── *.test.ts          # Node runner regression tests
│   └── middleware.ts          # Supabase session refresh and admin guard
├── .env.example
├── next.config.mjs
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Boundaries

- Public pages read data through `src/lib/queries.ts`; they do not import seed arrays as runtime content.
- Admin mutations live in `src/app/actions/` and verify Supabase user identity.
- Only `src/lib/db.ts` creates `PrismaClient`.
- Direct and wizard schemas remain separate, then converge on one persistence pipeline.
- Shared UI primitives stay presentation-focused; database access remains server-side.

## Naming

- React components and exported types: PascalCase.
- Functions, variables, hooks: camelCase.
- Route folders and regular source filenames: kebab-case unless existing Next.js convention requires another name.
- Database models/enums: Prisma PascalCase.
- Domain identifiers remain English; user-facing copy remains Indonesian.

## Generated and local-only paths

- `.next/`, `node_modules/`, `.vercel/`, `.worktrees/`, and environment files are ignored.
- `docs/internal/`, specific validation reports, `AGENT.md`, and `anti-slop/` are local/internal.
- Project documentation under `docs/` is tracked unless explicitly excluded.
