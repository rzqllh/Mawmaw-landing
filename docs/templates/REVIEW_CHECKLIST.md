# Review Checklist

Use this before merging or accepting AI-generated code.

## Scope

- [ ] Change matches requested scope.
- [ ] No unrelated refactor.
- [ ] No invented feature or route.
- [ ] No hidden dependency added.

## Code

- [ ] Existing conventions followed.
- [ ] Types are safe.
- [ ] No duplicated utility/component.
- [ ] No obvious dead code.

## UI / UX

- [ ] Visual tokens respected.
- [ ] Responsive layout checked.
- [ ] Loading/empty/error states considered.
- [ ] Copy is concrete and not generic AI fluff.

## Accessibility

- [ ] Semantic elements used.
- [ ] Keyboard/focus behavior checked.
- [ ] Images/labels handled.
- [ ] Reduced motion considered if animation exists.

## Performance

- [ ] No unnecessary client code.
- [ ] Images optimized/reserved.
- [ ] Animation uses performant properties.
- [ ] Heavy libraries justified.

## Security / Privacy

- [ ] No secrets exposed.
- [ ] Inputs validated.
- [ ] Permission checks server-side where needed.
- [ ] Logs do not leak sensitive data.

## Validation

- [ ] Lint/typecheck/build/test run or limitation explained.
- [ ] Manual checks described.
- [ ] Risks documented.
