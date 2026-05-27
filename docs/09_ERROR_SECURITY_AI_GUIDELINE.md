# 09 — Error Handling, Security, Privacy, and AI Feature Guideline

This is the source of truth for non-happy-path behavior, safe implementation, privacy boundaries, and AI-powered product behavior.

## Error Handling Principle

Every feature must handle failure honestly and helpfully.

Do not expose internal errors to users. Do not hide actionable errors from developers.

## Error Categories

| Error Type | User Message | Developer Detail |
|---|---|---|
| Validation | explain how to fix input | validation schema/path |
| Network | retry or status guidance | status code/request id |
| Permission | explain lack of access | user role/permission check |
| Not found | explain missing resource | queried id/source |
| Server | safe generic message | logged stack trace |
| AI uncertainty | explain uncertainty | missing context/source |

## User-Facing Error Copy

Good error copy:
- says what happened,
- says how to fix or retry,
- avoids blame,
- avoids leaking internals.

Bad:
- "Something went wrong" everywhere,
- raw stack trace,
- database error,
- provider exception text,
- misleading success.

## Security Principle

Default to least privilege and safe boundaries.

## Secrets

- Never expose secrets to client code.
- Never commit API keys.
- Never log secrets.
- Never invent env names without documenting them.
- Use server-side access for privileged operations.

## Authentication and Authorization

Authentication answers: who is the user?

Authorization answers: what can this user do?

Do not confuse them.

Rules:
- check permissions server-side,
- do not trust client-only guards,
- hide UI actions only as convenience, not security,
- define role behavior explicitly.

## Input Validation

Validate:
- form inputs,
- query params,
- route params,
- API body,
- file uploads,
- external API response,
- AI-generated structured data.

## File Upload Safety

Consider:
- file type,
- file size,
- storage path,
- access control,
- malware scanning if needed,
- public/private URL behavior,
- deletion/retention.

## Privacy

Do not collect more data than needed.

Do not log sensitive personal data unless necessary and approved.

Define:
- what is stored,
- why it is stored,
- how long it is stored,
- who can access it,
- how it can be deleted.

## AI Feature Principle

AI features must be grounded, reviewable, and honest about uncertainty.

## AI Must Not

- claim facts without context,
- invent citations,
- invent project data,
- invent document contents,
- hide uncertainty,
- make irreversible actions without review,
- output sensitive data unnecessarily.

## Context Handling

Before generating AI output, identify:

- user input,
- retrieved context,
- system rules,
- missing context,
- output format,
- confidence/uncertainty.

If context is insufficient, the product should:
- ask for more input,
- show uncertainty,
- produce a draft only,
- cite available sources when applicable.

## AI Output UX

AI-generated output should have:
- preview,
- edit option,
- regenerate option when useful,
- copy/export option when useful,
- review-before-final behavior for important actions.

## AI Guardrails

For AI features involving documents, decisions, or user-facing content:

- mark AI output clearly,
- preserve source text,
- keep audit trail when needed,
- avoid overwriting user work,
- allow user correction,
- never present generated content as verified fact without evidence.

## Logging

Log enough for debugging without exposing sensitive data.

Recommended:
- request id,
- timestamp,
- user id reference if appropriate,
- feature/action,
- error code,
- provider status.

Avoid:
- passwords,
- tokens,
- raw private documents,
- full prompts containing sensitive data unless explicitly approved.

## Review Checklist

- Failure states exist.
- Errors are safe and useful.
- Secrets stay server-side.
- Permission checks are server-side.
- Inputs are validated.
- AI output is grounded/reviewable.
- Privacy implications are considered.
