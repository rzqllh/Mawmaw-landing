export type ServerErrorEvent =
  | "contact.persistence_failed"
  | "contact.notification_failed"
  | "health.check_failed"
  | "system.unhandled_error";

type ServerErrorLog = {
  level: "error";
  event: ServerErrorEvent;
  errorName: string;
  code?: string | number;
};

const safeIdentifier = /^[A-Za-z][A-Za-z0-9._-]{0,63}$/;

function getErrorCode(error: unknown): string | number | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  try {
    const code = (error as { code?: unknown }).code;

    if (typeof code === "number" && Number.isFinite(code)) {
      return code;
    }

    if (typeof code === "string" && safeIdentifier.test(code)) {
      return code;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function getErrorName(error: unknown) {
  if (!(error instanceof Error)) {
    return "NonError";
  }

  return safeIdentifier.test(error.name) ? error.name : "Error";
}

export function formatServerErrorLog(
  event: ServerErrorEvent,
  error: unknown
) {
  const entry: ServerErrorLog = {
    level: "error",
    event,
    errorName: getErrorName(error),
  };
  const code = getErrorCode(error);

  if (code !== undefined) {
    entry.code = code;
  }

  return JSON.stringify(entry);
}

export function logServerError(event: ServerErrorEvent, error: unknown) {
  console.error(formatServerErrorLog(event, error));
}
