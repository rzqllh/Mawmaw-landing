# AGENTS.md — Universal AI Project Guardrail

This file is the entrypoint for AI coding agents such as Codex, Claude Code, Cursor, Windsurf, or any LLM-assisted development tool.

## Prime Directive

Build only what is requested, using the existing project as the source of truth. Do not invent requirements, dependencies, design decisions, routes, database fields, APIs, or business rules.

When the task is unclear, do not guess silently. Ask a short clarification or provide a bounded assumption with a warning.

## Rule Hierarchy

Follow rules in this order:

1. Explicit user instruction in the current task.
2. Existing repository code and configuration.
3. Project-specific docs filled by the owner, especially `docs/01_PROJECT_CONTEXT_TEMPLATE.md` once customized.
4. This `AGENTS.md`.
5. The universal guidelines in `docs/`.
6. General framework/library best practices.

If rules conflict, stop and report the conflict before editing.

## Required Reading Order

Before changing files, read:

1. `docs/00_INDEX_SSOT.md`
2. `docs/01_PROJECT_CONTEXT_TEMPLATE.md`
3. `docs/02_AGENT_OPERATING_RULES.md`
4. `docs/03_SCOPE_CHANGE_CONTROL.md`

Then read task-specific guideline:

- Architecture/code task → `docs/04_ARCHITECTURE_CODE_GUIDELINE.md`
- UI/design task → `docs/05_DESIGN_SYSTEM_UI_UX_GUIDELINE.md`
- Component/state/data task → `docs/06_COMPONENTS_STATE_DATA_GUIDELINE.md`
- Accessibility/responsive/performance task → `docs/07_ACCESSIBILITY_RESPONSIVE_PERFORMANCE_GUIDELINE.md`
- Motion/animation task → `docs/08_MOTION_ANIMATION_GUIDELINE.md`
- Error/security/AI task → `docs/09_ERROR_SECURITY_AI_GUIDELINE.md`
- QA/release/docs task → `docs/10_TESTING_RELEASE_DOCS_GUIDELINE.md`

## Non-Negotiables

- Do not create a second source of truth.
- Do not duplicate rules from one guideline into another.
- Do not add dependencies unless the task requires them and the trade-off is explained.
- Do not refactor unrelated code.
- Do not overwrite tokens, configs, schemas, routes, or public API behavior without explicit scope.
- Do not remove accessibility, responsive, performance, or motion safeguards.
- Do not hardcode fake production data unless the task is explicitly about mock data.
- Do not claim something was tested unless it was actually tested.

## Work Style

For every task:

1. Inspect relevant files first.
2. Identify the minimal safe change.
3. Preserve existing conventions.
4. Implement in small, reversible edits.
5. Validate with available checks.
6. Report changed files, validation result, and remaining risks.

## Output Format After Work

Use this structure:

```md
## Summary

- What changed.

## Files Changed

- `path/file`: reason.

## Validation

- Command/check run.
- Result.

## Notes / Risks

- Anything uncertain, skipped, or requiring owner decision.
```

## Forbidden Agent Behavior

Never respond as if a feature exists unless you verified it in the repository.

Never invent screenshots, test results, user research, analytics, routes, API endpoints, database tables, or design tokens.

Never silently convert a small task into a large rewrite.
