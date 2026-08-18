# Full SSOT Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align public content, SEO, and durable documentation with the implemented Prisma/PostgreSQL/Supabase application.

**Architecture:** Keep current data flow intact. Sanitize seed inputs and exact legacy rows, use native Next.js metadata routes, add one script-safe JSON-LD serializer, and rewrite documentation from current source evidence.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Prisma 7/PostgreSQL, Supabase Auth, Node test runner.

## Global Constraints

- Delete only `serenity-residence`, `oakwood-apartment`, `kopi-ruang-tengah`, `aruna-house`, `senja-office`, and `nala-suite`.
- Never delete or modify unrelated/admin-created projects.
- Remove `150+`; do not add another metric.
- Current source/config/schema is documentation authority.
- No dependency additions or unrelated refactors.
- Static checks must finish even when live database access is unavailable.

---

### Task 1: Lock content-truth contract

**Files:**
- Create: `src/lib/content-integrity.test.ts`
- Modify: `src/data/public-content.ts`
- Modify: `prisma/seed.ts`

**Interfaces:**
- Consumes: `heroContent.statCards`, `projects`, Prisma `project.deleteMany`, and `siteSetting.upsert`.
- Produces: `legacyMockProjectSlugs` exact tuple and sanitized seed behavior.

- [x] **Step 1: Add failing regression tests**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { heroContent, legacyMockProjectSlugs, projects } from "../data/public-content.ts";

const expectedMockSlugs = [
  "serenity-residence",
  "oakwood-apartment",
  "kopi-ruang-tengah",
  "aruna-house",
  "senja-office",
  "nala-suite",
] as const;

test("public defaults contain no unverified project-count metric", () => {
  assert.equal(heroContent.statCards.some((card) => card.value === "150+"), false);
});

test("seed cleanup is limited to the six approved mock project slugs", () => {
  assert.deepEqual(legacyMockProjectSlugs, expectedMockSlugs);
  assert.deepEqual(projects, []);
});
```

- [x] **Step 2: Verify RED**

Run: `npm test`
Expected: fail because `legacyMockProjectSlugs` does not exist and current content includes six projects plus `150+`.

- [x] **Step 3: Sanitize defaults and seed**

Implement exact tuple, replace `projects` with an empty typed array, remove only the `150+` stat card, delete exact legacy slugs during seed, and update only `heroStatCards` on the existing global settings row.

- [x] **Step 4: Verify GREEN**

Run: `npm test && npm run typecheck && npx prisma validate`
Expected: all tests pass, TypeScript exits 0, Prisma schema valid.

- [x] **Step 5: Commit task**

```bash
git add src/lib/content-integrity.test.ts src/data/public-content.ts prisma/seed.ts
git commit -m "fix: remove unverified portfolio seed content"
```

### Task 2: Add native SEO surfaces

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/lib/seo.test.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/(public)/layout.tsx`

**Interfaces:**
- Consumes: `siteConfig.url`, `getPublishedProjects`, `getPublishedArticles`, and `getSiteSettings`.
- Produces: `serializeJsonLd(value: unknown): string`, Next.js sitemap/robots metadata routes, and `ProfessionalService` JSON-LD.

- [x] **Step 1: Add failing serializer test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { serializeJsonLd } from "./seo.ts";

test("serializeJsonLd cannot terminate its script element", () => {
  const serialized = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.equal(serialized.includes("<"), false);
  assert.match(serialized, /\\u003c\/script>/);
});
```

- [x] **Step 2: Verify RED**

Run: `npm test`
Expected: fail because `src/lib/seo.ts` does not exist.

- [x] **Step 3: Implement minimal serializer**

```ts
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}
```

- [x] **Step 4: Add metadata routes and JSON-LD**

Use `MetadataRoute.Sitemap` and `MetadataRoute.Robots`. Construct JSON-LD from existing settings only, filter empty social URLs, and pass it through `serializeJsonLd` before `dangerouslySetInnerHTML`.

- [x] **Step 5: Verify SEO task**

Run: `npm test && npm run lint && npm run typecheck`
Expected: all commands exit 0.

- [x] **Step 6: Commit task**

```bash
git add src/lib/seo.ts src/lib/seo.test.ts src/app/sitemap.ts src/app/robots.ts "src/app/(public)/layout.tsx"
git commit -m "feat: add sitemap robots and structured data"
```

### Task 3: Restore durable project documentation

**Files:**
- Modify: `.gitignore`
- Create: `README.md`
- Create: `docs/API-SPEC.md`
- Create: `docs/ARCHITECTURE.md`
- Create: `docs/COMPONENTS.md`
- Create: `docs/DEPLOYMENT.md`
- Create: `docs/DESIGN-SYSTEM.md`
- Create: `docs/ENVIRONMENT.md`
- Create: `docs/MASTER_PROMPT.md`
- Create: `docs/PRD.md`
- Create: `docs/PROJECT-STRUCTURE.md`
- Create: `docs/RULES.md`
- Create: `docs/SCHEMA.md`
- Create: `docs/STACK.md`
- Create: `docs/TESTING.md`
- Create: `docs/IMPLEMENTATION_STATUS.md`

**Interfaces:**
- Consumes: current `package.json`, `.env.example`, Prisma schema, route tree, actions, queries, components, and validation scripts.
- Produces: tracked project SSOT and remotely auditable implementation ledger.

- [x] **Step 1: Fix ignore boundary**

Remove blanket `docs/`. Keep `AGENT.md`, `anti-slop/`, exact internal reports, and add `docs/internal/`.

- [x] **Step 2: Restore README from current evidence**

Document exact stack, setup commands (`npm install`, `prisma generate`, database deployment, `npm run db:seed`, `npm run dev`), route inventory, scripts, environment categories, and current database requirement. Do not claim Cloudinary integration.

- [x] **Step 3: Rewrite runtime/data docs**

Rewrite `STACK.md`, `ARCHITECTURE.md`, `SCHEMA.md`, `API-SPEC.md`, `ENVIRONMENT.md`, `DEPLOYMENT.md`, and `PROJECT-STRUCTURE.md`. Every stack or route statement must map to current source. Mark database credentials and deployment verification as environment-dependent.

- [x] **Step 4: Rewrite product/engineering docs**

Rewrite `PRD.md`, `COMPONENTS.md`, `DESIGN-SYSTEM.md`, `RULES.md`, `TESTING.md`, and `MASTER_PROMPT.md`. Remove Payload, MongoDB, Cloudinary, Furniture, Testimonials, and other unimplemented scope claims unless explicitly labeled out of scope.

- [x] **Step 5: Add durable status ledger**

Create separate `Completed`, `Pending`, `Blocked`, and `Verification` sections. Record stack decision, mock-content removal, SEO state, database credential blocker, deploy/build state, commands with dates, and rules for future updates.

- [x] **Step 6: Scan documentation drift**

Run: `rg -n -i "Payload|MongoDB|Mongo Atlas|Cloudinary|Next\.js 15|Next 15|150\+|Kopi Ruang Tengah|Nala Suite" README.md docs --glob '!docs/superpowers/**' --glob '!docs/IMPLEMENTATION_STATUS.md'`
Expected: no matches in active project documentation. Plan and status history may name removed technology or content when recording the decision.

- [x] **Step 7: Commit task**

```bash
git add .gitignore README.md docs
git commit -m "docs: restore current project source of truth"
```

### Task 4: Final verification and ledger update

**Files:**
- Modify: `docs/IMPLEMENTATION_STATUS.md`

**Interfaces:**
- Consumes: complete working tree and command outputs.
- Produces: verified final status with honest database/build blocker.

- [x] **Step 1: Run static verification**

Run: `npm test`
Expected: all tests pass.

Run: `npm run lint`
Expected: exit 0 with no warnings.

Run: `npm run typecheck`
Expected: exit 0.

Run: `npx prisma validate`
Expected: schema valid.

Run: `git diff --check`
Expected: exit 0.

- [x] **Step 2: Run production build**

Run: `npm run build`
Expected with current environment: compilation and TypeScript may pass, then page-data collection may fail because worktree has no valid database credentials. Record actual output; never report build pass unless exit code is 0.

- [x] **Step 3: Update verification ledger**

Record exact pass/fail counts and build stage in `docs/IMPLEMENTATION_STATUS.md`. Keep database execution and deployment under Blocked until credentials exist.

- [x] **Step 4: Verify clean documentation and diff**

Run: `rg -n -i "Payload|MongoDB|Mongo Atlas|Cloudinary|Next\.js 15|Next 15|150\+|Kopi Ruang Tengah|Nala Suite" README.md docs src prisma`
Expected: forbidden live claims absent. Allowed matches are exact mock-slug cleanup constants, regression tests, and explicit plan/status history.

Run: `git status --short`
Expected: only final ledger update before commit.

- [x] **Step 5: Commit verification ledger**

```bash
git add docs/IMPLEMENTATION_STATUS.md
git commit -m "docs: record ssot repair verification"
```
