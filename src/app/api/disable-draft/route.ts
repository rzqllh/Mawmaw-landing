import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { sanitizeInternalRedirect } from "@/lib/navigation";

export async function GET(request: Request) {
  (await draftMode()).disable();
  const { searchParams } = new URL(request.url);
  redirect(sanitizeInternalRedirect(searchParams.get("redirect")));
}
