# 04 — Architecture and Code Guideline

This is the source of truth for structure, boundaries, and code quality.

## Architecture Principles

- Use the existing architecture before inventing a new one.
- Separate UI, data access, business logic, and integration boundaries.
- Prefer explicit code over clever abstractions.
- Optimize for maintainability before novelty.
- Keep public contracts stable unless the task explicitly changes them.

## Recommended Universal Structure

Adapt to the framework, but keep responsibilities clear.

```txt
src/
  app/ or pages/          routing layer
  components/             reusable UI and feature components
  features/               feature-specific modules
  lib/                    framework-agnostic utilities
  services/               external API/service integration
  data/                   static data or data adapters
  hooks/                  reusable client hooks
  styles/                 global styles/tokens
  types/                  shared TypeScript types
  tests/                  test utilities/specs
```

Do not force this structure if the project already has a clear pattern.

## Boundaries

### UI Layer

Responsible for:
- rendering,
- layout,
- interaction states,
- accessibility attributes.

Not responsible for:
- database calls,
- business rule decisions,
- secret handling.

### Business Logic Layer

Responsible for:
- validation,
- calculations,
- permissions checks,
- transformations.

Not responsible for:
- visual styling,
- DOM-specific behavior.

### Data Layer

Responsible for:
- fetching,
- parsing,
- caching boundary,
- schema validation,
- persistence.

Not responsible for:
- component styling,
- page layout decisions.

## Naming Rules

Use names that describe purpose, not implementation detail.

Good:
- `ProjectStatusBadge`
- `formatCurrency`
- `createDocumentPreview`
- `useProjectFilters`

Avoid:
- `NewComponent`
- `Helper`
- `Thing`
- `Data2`
- `FinalFinal`

## File Rules

- One file should have one clear responsibility.
- Keep feature-specific code near the feature.
- Move to shared only after reuse is real.
- Avoid barrel files if they obscure ownership.
- Do not create duplicate utilities.

## API Rules

- Validate inputs at boundaries.
- Return consistent success/error shapes.
- Do not expose secrets.
- Do not leak internal stack traces to users.
- Keep backward compatibility unless changing API is the task.

## Environment Rules

- Never hardcode secrets.
- Do not invent env variable names without documenting them.
- Read env only at safe server/build boundaries.
- Add env examples to `.env.example` if the project uses one.

## Type Safety

- Prefer narrow types.
- Avoid `any` unless there is a documented reason.
- Validate unknown external data.
- Keep type definitions close to the source of truth.

## Code Style

- Follow existing formatter/linter.
- Prefer clarity over compactness.
- Keep functions small enough to review.
- Do not mix formatting-only changes with logic changes.
- Avoid premature optimization.

## Comments

Use comments for:
- business rules,
- non-obvious trade-offs,
- integration quirks,
- migration notes.

Do not comment obvious code.

## Architecture Decision Rule

Use `docs/templates/DECISION_LOG_TEMPLATE.md` for decisions involving:

- framework changes,
- database design,
- auth/security,
- AI provider,
- major state management,
- public API contract,
- design system architecture.
