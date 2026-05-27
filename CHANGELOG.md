# Changelog

## DRY v2

### Changed

- Rebuilt guideline pack into a smaller single-source-of-truth structure.
- Removed duplicate universal guideline layers.
- Removed project-specific content from the universal pack.
- Merged overlapping docs:
  - design system + UI/UX + content,
  - components + state + data,
  - accessibility + responsive + performance,
  - error handling + security + AI feature behavior,
  - testing + release + documentation.
- Kept motion/animation as a dedicated source-of-truth file.

### Added

- `docs/00_INDEX_SSOT.md` to prevent future redundancy.
- Task, feature spec, decision log, and review templates.
- Clear owner matrix for every guideline area.

### Removed

- Duplicate root/docs `AGENTS.md` patterns.
- Project-specific implementation prompt content.
- Repeated anti-hallucination rules across many files.

### Goal

Make the pack easier for AI agents to follow:
- less conflict,
- less repetition,
- clearer rule ownership,
- fewer places to update,
- better KISS/DRY discipline.
