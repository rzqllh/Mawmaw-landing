import { createHash, timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

function secretsMatch(provided: string | null, expected: string | undefined) {
  if (!provided || !expected) {
    return false;
  }

  const providedHash = createHash("sha256").update(provided).digest();
  const expectedHash = createHash("sha256").update(expected).digest();

  return timingSafeEqual(providedHash, expectedHash);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type"); // project | article

  if (!secretsMatch(secret, process.env.PREVIEW_SECRET)) {
    return new Response("Invalid token", { status: 401 });
  }

  (await draftMode()).enable();

  if (type === "project" && slug) {
    redirect(`/projects/${slug}`);
  } else if (type === "article" && slug) {
    redirect(`/articles/${slug}`);
  }
  
  redirect("/");
}
