import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import EditProjectForm from "./edit-form";

export const metadata = {
  title: "Edit Proyek - Admin",
};

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await db.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}
