import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { register } from "node:module";
import { resolve } from "node:path";
import test from "node:test";

import type { SetAllCookies } from "@supabase/ssr";
import { NextRequest, type NextResponse } from "next/server.js";

register("./next-server-test-loader.mjs", import.meta.url);

type CreateSupabaseResponse = (
  request: NextRequest,
  cookies: Parameters<SetAllCookies>[0],
  headers: Parameters<SetAllCookies>[1]
) => NextResponse;

test("creates an auth response with request cookies, response cookies, and no-cache headers", async () => {
  const supabaseMiddleware = await import("./supabase/middleware.ts");
  const createSupabaseResponse = (
    supabaseMiddleware as { createSupabaseResponse?: CreateSupabaseResponse }
  ).createSupabaseResponse;

  assert.equal(typeof createSupabaseResponse, "function");
  if (!createSupabaseResponse) return;

  const request = new NextRequest("https://mawmaw.test/admin");
  const response = createSupabaseResponse(
    request,
    [
      {
        name: "sb-access-token",
        value: "refreshed-token",
        options: { httpOnly: true, path: "/" },
      },
    ],
    {
      "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0",
      Expires: "0",
      Pragma: "no-cache",
    }
  );

  assert.equal(request.cookies.get("sb-access-token")?.value, "refreshed-token");
  assert.equal(response.cookies.get("sb-access-token")?.value, "refreshed-token");
  assert.equal(
    response.headers.get("Cache-Control"),
    "private, no-cache, no-store, must-revalidate, max-age=0"
  );
  assert.equal(response.headers.get("Expires"), "0");
  assert.equal(response.headers.get("Pragma"), "no-cache");
});

test("uses the Next.js proxy entrypoint instead of deprecated middleware", async () => {
  const proxyPath = resolve("src/proxy.ts");
  const middlewarePath = resolve("src/middleware.ts");

  assert.equal(existsSync(proxyPath), true, "src/proxy.ts must be present");
  assert.equal(existsSync(middlewarePath), false, "src/middleware.ts must be removed");

  const proxyModule = await import("../proxy.ts");

  assert.equal(typeof proxyModule.proxy, "function");
  assert.deepEqual(proxyModule.config, {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
  });
});
