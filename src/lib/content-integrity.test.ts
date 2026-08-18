import assert from "node:assert/strict";
import test from "node:test";

import {
  heroContent,
  legacyMockProjectSlugs,
  projects,
} from "../data/public-content.ts";

const expectedMockSlugs = [
  "serenity-residence",
  "oakwood-apartment",
  "kopi-ruang-tengah",
  "aruna-house",
  "senja-office",
  "nala-suite",
] as const;

test("public defaults contain no unverified project-count metric", () => {
  assert.equal(
    heroContent.statCards.some((card) => card.value === "150+"),
    false
  );
});

test("seed cleanup is limited to the six approved mock project slugs", () => {
  assert.deepEqual(legacyMockProjectSlugs, expectedMockSlugs);
  assert.deepEqual(projects, []);
});
