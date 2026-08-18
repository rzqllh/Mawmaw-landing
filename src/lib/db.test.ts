import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("db module loads .env.local when imported by the ESM seed runtime", () => {
  const temporaryDirectory = mkdtempSync(join(tmpdir(), "mawmaw-db-esm-"));
  const moduleUrl = pathToFileURL(resolve("src/lib/db.ts")).href;
  const environment = { ...process.env };
  delete environment.DATABASE_URL;

  writeFileSync(
    join(temporaryDirectory, ".env.local"),
    'DATABASE_URL="postgresql://test:test@127.0.0.1:5432/test"\n'
  );

  try {
    const result = spawnSync(
      process.execPath,
      [
        "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON",
        "--experimental-strip-types",
        "--input-type=module",
        "--eval",
        `await import(${JSON.stringify(moduleUrl)});`,
      ],
      {
        cwd: temporaryDirectory,
        encoding: "utf8",
        env: { ...environment, NODE_ENV: "test" },
        timeout: 10_000,
      }
    );

    assert.equal(result.status, 0, result.stderr);
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
