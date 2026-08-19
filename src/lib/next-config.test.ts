import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import test from "node:test";

type ConfigSchemaIssue = {
  message: string;
  path: readonly PropertyKey[];
};

type ConfigSchemaResult =
  | { success: true }
  | {
      success: false;
      error: { issues: readonly ConfigSchemaIssue[] };
    };

type ConfigSchemaModule = {
  configSchema: {
    safeParse(value: unknown): ConfigSchemaResult;
  };
};

type NextConfigModule = {
  default: unknown;
};

test("installed Next.js schema accepts the exported app config", async () => {
  const configUrl = pathToFileURL(resolve("next.config.mjs")).href;
  const nextConfigModule = (await import(configUrl)) as unknown as NextConfigModule;
  const schemaModule = (await import(
    "next/dist/server/config-schema.js"
  )) as unknown as ConfigSchemaModule;

  const result = schemaModule.configSchema.safeParse(nextConfigModule.default);

  if (!result.success) {
    const issues = result.error.issues
      .map(({ message, path }) => `${path.join(".")}: ${message}`)
      .join("\n");

    assert.fail(`Next.js rejected next.config.mjs:\n${issues}`);
  }
});
