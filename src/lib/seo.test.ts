import assert from "node:assert/strict";
import test from "node:test";

import { serializeJsonLd } from "./seo.ts";

test("serializeJsonLd cannot terminate its script element", () => {
  const serialized = serializeJsonLd({
    name: "</script><script>alert(1)</script>",
  });

  assert.equal(serialized.includes("<"), false);
  assert.match(serialized, /\\u003c\/script>/);
});
