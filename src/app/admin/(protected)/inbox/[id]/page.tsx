import React from "react";
import { notFound } from "next/navigation";
import { getSubmission } from "@/app/actions/inbox";
import { InboxDetailForm } from "./components/inbox-detail-form";
import { InboxDetailClient } from "./components/inbox-detail-client";

export default async function InboxDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const submission = await getSubmission(id);

  if (!submission) {
    notFound();
  }

  return (
    <div className="animate-in fade-in duration-700">
      <InboxDetailClient id={id} status={submission.status} />
      <InboxDetailForm submission={submission} />
    </div>
  );
}
