import assert from "node:assert/strict";
import test from "node:test";
import {
  checkAuditReport,
  type AuditReport,
} from "../../scripts/audit-ci.ts";

test("checkAuditReport passes for the known upstream Prisma deepmerge-ts advisory", () => {
  const sampleReport: AuditReport = {
    vulnerabilities: {
      "@prisma/config": {
        name: "@prisma/config",
        severity: "high",
        isDirect: false,
        via: ["deepmerge-ts"],
        effects: ["prisma"],
      },
      "deepmerge-ts": {
        name: "deepmerge-ts",
        severity: "high",
        isDirect: false,
        via: [
          {
            source: 1145093,
            url: "https://github.com/advisories/GHSA-ggr8-5vv4-36mx",
            title:
              "DeepmergeTS has stack exhaustion when merging recursive object graphs",
            severity: "high",
          },
        ],
        effects: ["@prisma/config"],
      },
      prisma: {
        name: "prisma",
        severity: "high",
        isDirect: true,
        via: ["@prisma/config"],
        effects: [],
      },
    },
    metadata: {
      vulnerabilities: {
        info: 0,
        low: 0,
        moderate: 0,
        high: 3,
        critical: 0,
        total: 3,
      },
    },
  };

  const unexpected = checkAuditReport(sampleReport);
  assert.deepEqual(unexpected, []);
});

test("checkAuditReport flags unexpected vulnerable packages", () => {
  const sampleReport: AuditReport = {
    vulnerabilities: {
      "some-other-pkg": {
        name: "some-other-pkg",
        severity: "high",
        isDirect: true,
        via: [
          {
            url: "https://github.com/advisories/GHSA-xxxx-xxxx-xxxx",
            severity: "high",
          },
        ],
        effects: [],
      },
    },
  };

  const unexpected = checkAuditReport(sampleReport);
  assert.equal(unexpected.length, 1);
  assert.equal(unexpected[0].package, "some-other-pkg");
});

test("checkAuditReport flags unapproved advisories in prisma chain", () => {
  const sampleReport: AuditReport = {
    vulnerabilities: {
      "deepmerge-ts": {
        name: "deepmerge-ts",
        severity: "critical",
        isDirect: false,
        via: [
          {
            url: "https://github.com/advisories/GHSA-evil-rce-xxxx",
            severity: "critical",
          },
        ],
        effects: ["@prisma/config"],
      },
    },
  };

  const unexpected = checkAuditReport(sampleReport);
  assert.equal(unexpected.length, 1);
  assert.match(unexpected[0].reason, /Unexpected advisory/);
});
