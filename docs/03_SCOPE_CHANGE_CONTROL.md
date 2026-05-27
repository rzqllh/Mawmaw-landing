# 03 — Scope and Change Control

This is the source of truth for preventing scope creep.

## Scope Principle

Every task must have a clear boundary.

The agent should solve the requested problem, not all nearby problems.

## Scope Classification

### Small Fix

Examples:
- typo,
- broken import,
- minor UI spacing,
- simple validation message,
- one component bug.

Allowed:
- edit only relevant files,
- no new architecture,
- no dependency changes.

### Feature Addition

Examples:
- new form,
- new page,
- new component variant,
- new export flow,
- new API call.

Required:
- identify data source,
- identify UI states,
- identify validation,
- identify error handling,
- update docs if needed.

### System Change

Examples:
- auth,
- schema,
- routing architecture,
- design system tokens,
- state management,
- AI provider,
- file storage.

Required:
- ask/confirm unless explicitly requested,
- write decision log,
- provide migration/rollback notes.

## In-Scope Rules

A change is in scope when:
- directly requested,
- necessary for the requested change to function,
- consistent with existing source of truth,
- small enough to validate in the same task.

## Out-of-Scope Rules

A change is out of scope when:
- it changes unrelated behavior,
- it introduces new product assumptions,
- it rewrites working code without need,
- it modifies global design identity without request,
- it adds new tech for convenience only.

## Incidental Findings

If the agent finds unrelated issues:

Do:
- mention them in notes,
- suggest a separate task.

Do not:
- fix them automatically,
- include them in the same patch,
- hide them inside "cleanup."

## Confirmation Required

Ask or explicitly flag before:

- deleting files,
- changing schema,
- changing auth/permission,
- changing env names,
- replacing libraries,
- redesigning core UI,
- altering public API contracts,
- changing animation/motion personality,
- changing content tone,
- introducing AI behavior that makes claims.

## Change Size Limit

Prefer one task = one coherent change.

If the task becomes too large:
- complete the safest core part,
- report remaining steps,
- do not promise background work.

## Rollback Awareness

Every change should be understandable and reversible.

Avoid changes that:
- mix formatting with logic,
- rename many files unnecessarily,
- change multiple layers at once without clear reason,
- remove old behavior before new behavior is verified.

## Task Brief Requirement

For non-trivial work, use:

`docs/templates/TASK_BRIEF_TEMPLATE.md`

The brief prevents agent drift.
