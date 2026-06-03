import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import EditArticleForm from "./edit-form";

export const metadata = {
  title: "Edit Artikel - Admin",
};

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const article = await db.article.findUnique({
    where: { id: params.id },
  });

  if (!article) {
    notFound();
  }

  return <EditArticleForm article={article} />;
}
