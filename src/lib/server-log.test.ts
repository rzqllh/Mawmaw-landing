import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

type ServerLogModule = {
  formatServerErrorLog: (event: string, error: unknown) => string;
};

async function loadServerLog(): Promise<ServerLogModule> {
  const utilityUrl = new URL("./server-log.ts", import.meta.url);

  if (!existsSync(fileURLToPath(utilityUrl))) {
    assert.fail("Expected the server log utility to exist.");
  }

  return (await import(utilityUrl.href)) as ServerLogModule;
}

test("formatServerErrorLog emits a safe structured error for Error instances", async () => {
  const { formatServerErrorLog } = await loadServerLog();
  const rawMessage =
    "Could not email ayu@example.com with password=hunter2 at https://api.example.test";
  const output = formatServerErrorLog(
    "contact.persistence_failed",
    Object.assign(new Error(rawMessage), { code: "P2002" })
  );

  assert.deepEqual(JSON.parse(output), {
    level: "error",
    event: "contact.persistence_failed",
    errorName: "Error",
    code: "P2002",
  });
  assert.equal(output.includes(rawMessage), false);
  assert.equal(output.includes("ayu@example.com"), false);
  assert.equal(output.includes("hunter2"), false);
  assert.equal(output.includes("https://api.example.test"), false);
});

test("formatServerErrorLog normalizes non-Error values and keeps numeric error codes", async () => {
  const { formatServerErrorLog } = await loadServerLog();
  const output = formatServerErrorLog("contact.notification_failed", {
    code: 429,
    email: "ayu@example.com",
    message: "password=hunter2",
  });

  assert.deepEqual(JSON.parse(output), {
    level: "error",
    event: "contact.notification_failed",
    errorName: "NonError",
    code: 429,
  });
  assert.equal(output.includes("ayu@example.com"), false);
  assert.equal(output.includes("hunter2"), false);
});
