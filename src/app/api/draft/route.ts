import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type"); // project | article

  if (secret !== process.env.PREVIEW_SECRET && secret !== "dev_preview") {
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
