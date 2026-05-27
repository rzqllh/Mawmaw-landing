# Mawmaw Interior

Premium public portfolio website for Mawmaw Interior, a studio desain interior that presents services, selected projects, articles, and a consultation contact flow.

This repository uses the guideline pack in `AGENTS.md` and `docs/00_INDEX_SSOT.md`. Before making code changes, agents must follow those files and the project context in `docs/01_PROJECT_CONTEXT_TEMPLATE.md`.

## Tech Stack

- Framework: Next.js 16 App Router
- Language: TypeScript, React 19
- Styling: Tailwind CSS v4 through `@tailwindcss/postcss`
- UI patterns: local components with `class-variance-authority`, `clsx`, and `tailwind-merge`
- Forms and validation: `react-hook-form`, `@hookform/resolvers`, `zod`
- Feedback: `sonner`
- Icons: `@phosphor-icons/react`
- Motion and effects: `motion`, `shaders`

## Setup

```bash
npm install
npm run dev
```

The local development server defaults to `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Environment

Use `.env.example` as the env variable reference. Do not commit `.env`, `.env.local`, or any file containing real secrets.

Current env groups listed in `.env.example`:

- Site public settings
- Supabase
- Cloudinary
- Email / Resend
- Bot protection
- Auth / Admin
- Logging
- Environment

Some listed integrations may be planned or unused until implementation verifies them in source code. Do not assume an integration exists only because an env variable is present.

## Routes

- `/`: homepage with hero, about, services, featured projects, featured articles, and contact sections
- `/projects`: project listing
- `/projects/[slug]`: project detail pages generated from static project content
- `/articles`: article listing
- `/articles/[slug]`: article detail pages generated from static article content

## Folder Overview

- `src/app`: routes, layout, metadata, global styles, and not-found page
- `src/components/ui`: reusable UI primitives
- `src/components/layout`: shared layout components
- `src/components/sections`: homepage sections
- `src/components/cards`: repeated content cards
- `src/components/motion`: shared reveal motion
- `src/components/effects`: hero shader effect
- `src/data/public-content.ts`: public site content, navigation, projects, articles, and contact copy
- `src/lib`: utilities, icons, validation, and WhatsApp link helper
- `public/brand`: brand assets used by the app
- `Logo`: source or alternate logo assets
- `docs`: AI project guidelines, source-of-truth index, project context, and templates

## Source Of Truth

- Project facts: `docs/01_PROJECT_CONTEXT_TEMPLATE.md`
- Agent rules: `AGENTS.md`, `docs/00_INDEX_SSOT.md`, `docs/02_AGENT_OPERATING_RULES.md`
- App routes: `src/app`
- Public content: `src/data/public-content.ts`
- Design tokens and global styles: `src/app/globals.css`
- Reusable UI primitives: `src/components/ui`
- Contact validation schema: `src/lib/validation.ts`
- Env variable reference: `.env.example`

## Validation

Run these checks before reporting code or documentation changes as complete:

```bash
npm run lint
npm run typecheck
npm run build
```

Report the exact commands run and their results. Do not claim validation passed unless the commands were actually run.

## Deployment

Deployment target is `Unknown - owner to confirm`.

The app is a Next.js project and can be evaluated for deployment on any compatible host after owner confirmation. Do not add deployment-specific configuration without explicit scope.

## Known Limitations

- `docs/01_PROJECT_CONTEXT_TEMPLATE.md` still contains owner-confirmation fields for business, deployment, and operational context.
- The contact form currently appears to submit locally with UI feedback; no backend persistence or email delivery should be assumed unless verified in source code.
- `.env.example` lists possible integrations, but active integration behavior must be verified in code before use.
