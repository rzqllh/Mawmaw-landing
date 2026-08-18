import assert from "node:assert/strict";
import test from "node:test";

import { sanitizeInternalRedirect } from "./navigation.ts";

test("sanitizeInternalRedirect keeps internal paths", () => {
  assert.equal(sanitizeInternalRedirect("/projects?category=Hunian#top"), "/projects?category=Hunian#top");
});

test("sanitizeInternalRedirect rejects external and protocol-relative URLs", () => {
  assert.equal(sanitizeInternalRedirect("https://example.com"), "/");
  assert.equal(sanitizeInternalRedirect("//example.com"), "/");
  assert.equal(sanitizeInternalRedirect("/\\example.com"), "/");
  assert.equal(sanitizeInternalRedirect("javascript:alert(1)"), "/");
  assert.equal(sanitizeInternalRedirect(null), "/");
});
