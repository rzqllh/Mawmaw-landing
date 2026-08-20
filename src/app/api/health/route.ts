import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logServerError } from "@/lib/server-log";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Perform a lightweight database connectivity check
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    logServerError("health.check_failed", error);

    // Return a safe status without leaking connection strings or stack traces
    return NextResponse.json(
      {
        status: "unhealthy",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
