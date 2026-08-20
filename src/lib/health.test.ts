import assert from "node:assert/strict";
import test from "node:test";
import { formatServerErrorLog } from "./server-log.ts";

test("formatServerErrorLog safely formats health.check_failed events", () => {
  const output = formatServerErrorLog("health.check_failed", new Error("Database connection timed out at postgresql://user:secret@db.supabase.co"));
  const parsed = JSON.parse(output);

  assert.equal(parsed.level, "error");
  assert.equal(parsed.event, "health.check_failed");
  assert.equal(parsed.errorName, "Error");
  assert.equal(output.includes("secret"), false);
  assert.equal(output.includes("postgresql://"), false);
});

test("formatServerErrorLog safely formats system.unhandled_error events", () => {
  const output = formatServerErrorLog("system.unhandled_error", new Error("Unexpected crash in action handler"));
  const parsed = JSON.parse(output);

  assert.equal(parsed.level, "error");
  assert.equal(parsed.event, "system.unhandled_error");
  assert.equal(parsed.errorName, "Error");
});
