# 10 — Testing, Release, and Documentation Guideline

This is the source of truth for validation, QA, release hygiene, and documentation.

## Testing Principle

Do not claim correctness without evidence.

Testing depth should match risk.

## Validation Levels

### Level 1 — Static Check

Use for small changes:
- type check,
- lint,
- formatting,
- import/build check.

### Level 2 — Functional Check

Use for feature changes:
- form submit behavior,
- loading/error states,
- route behavior,
- API success/failure,
- responsive states.

### Level 3 — Regression Check

Use for system changes:
- relevant automated tests,
- visual review,
- accessibility pass,
- performance sanity check,
- migration/rollback path.

## Test Types

Use as appropriate:
- unit test,
- integration test,
- component test,
- e2e test,
- visual regression,
- accessibility check,
- performance profiling.

Do not add test frameworks unless needed and approved.

## QA Checklist

Before marking done:

- requested behavior works,
- unrelated behavior not changed,
- no obvious console/runtime error,
- loading state handled,
- empty state handled,
- error state handled,
- mobile layout checked if UI changed,
- keyboard/focus checked if interactive,
- performance impact considered,
- security/privacy not worsened.

## Release Principle

Release notes should tell the truth.

Do not hide breaking changes.

## Changelog Format

```md
## [version/date]

### Added
- 

### Changed
- 

### Fixed
- 

### Removed
- 

### Notes
- 
```

## Migration Notes

Required when changing:
- database schema,
- env variables,
- API contract,
- authentication,
- storage paths,
- design token names,
- routing structure.

Include:
- what changed,
- why,
- migration steps,
- rollback notes,
- risk.

## Documentation Principle

Document decisions, not obvious code.

Docs should prevent future mistakes.

## README Minimum

A project README should include:
- project purpose,
- stack,
- setup,
- env variables,
- run commands,
- test commands,
- deployment notes,
- folder overview,
- known limitations.

## Decision Logs

Use `docs/templates/DECISION_LOG_TEMPLATE.md` for meaningful decisions.

Good decision logs explain:
- context,
- options considered,
- chosen decision,
- trade-offs,
- follow-up.

## Agent Documentation Rule

When the agent changes architecture, public behavior, env, schema, or design tokens, it must update the relevant docs.

Do not update docs for trivial code formatting.
