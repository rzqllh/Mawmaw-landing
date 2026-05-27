# 06 — Components, State, and Data Guideline

This is the source of truth for reusable UI implementation, state ownership, data flow, forms, and tables.

## Component Principle

Make components reusable only when reuse is real or very likely.

Do not abstract too early.

## Component Types

### UI Primitive

Examples:
- Button,
- Input,
- Badge,
- Card,
- Modal,
- Tabs.

Rules:
- token-based,
- accessible by default,
- variant-driven,
- minimal business logic.

### Shared Component

Examples:
- AppHeader,
- StatusBadge,
- FileUploader,
- DataTable.

Rules:
- reusable across features,
- accepts explicit props,
- avoids hidden data fetching unless intentional.

### Feature Component

Examples:
- ProjectSummaryPanel,
- InvoicePreview,
- DocumentGeneratorForm.

Rules:
- may contain business-specific logic,
- should not become global unless reused.

## Props Rules

- Use clear names.
- Avoid boolean explosion.
- Prefer variant maps for visual variants.
- Use children for composition when appropriate.
- Keep controlled vs uncontrolled behavior explicit.

## State Ownership

| State Type | Default Owner |
|---|---|
| Local UI state | component |
| Form state | form component/library |
| Server data | data fetching layer/cache |
| Global app state | global store only when genuinely shared |
| URL state | route/search params |
| Persistent user preference | storage/database with privacy consideration |

## State Rules

- Keep state close to where it is used.
- Do not duplicate server data in local state without reason.
- Do not use global state for convenience only.
- Use URL state for filters/search/sort when shareable.
- Keep loading/error states explicit.

## Data Source of Truth

Each feature must know:
- where data comes from,
- how it is validated,
- how it is cached,
- who can mutate it,
- what happens on error.

## Mock Data Rules

Mock data is allowed only when:
- task is prototype/demo,
- location is explicit,
- data is clearly marked mock,
- it will not be confused with production data.

Do not mix mock and real data silently.

## Schema and Validation

- Validate external inputs.
- Validate form inputs.
- Validate API boundaries.
- Keep schema definitions near the source of truth.
- Do not duplicate schema rules across UI and backend without a shared source.

## Forms

A production-minded form needs:
- label,
- required/optional clarity,
- validation,
- loading state,
- disabled/submitting state,
- success feedback,
- error feedback,
- accessible focus behavior,
- safe reset/cancel behavior.

## Tables

A production-minded table needs:
- clear column priority,
- loading/empty/error states,
- sorting if useful,
- filtering if useful,
- pagination or virtualization for large data,
- row actions with accessible labels,
- responsive strategy,
- readable status badges.

## File Uploads

When applicable:
- validate type,
- validate size,
- show upload progress,
- handle failure,
- explain accepted formats,
- avoid exposing private file URLs by accident.

## Data Mutation Rules

For create/update/delete:
- confirm destructive actions,
- show pending state,
- handle rollback/failure,
- keep UI and source of truth in sync,
- avoid optimistic updates unless failure handling exists.

## Review Checklist

- No duplicate component doing same job.
- State has one clear owner.
- Data source is explicit.
- Forms/tables handle non-happy paths.
- Mock data is labeled and isolated.
- Accessibility states are preserved.
