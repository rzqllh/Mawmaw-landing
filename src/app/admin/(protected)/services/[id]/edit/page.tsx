import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import EditServiceForm from "./edit-form";

export const metadata = {
  title: "Edit Layanan - Admin",
};

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const service = await db.service.findUnique({
    where: { id: params.id },
  });

  if (!service) {
    notFound();
  }

  return <EditServiceForm service={service} />;
}
