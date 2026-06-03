"use client";

import { useEffect } from "react";
import { updateSubmissionStatus } from "@/app/actions/inbox";
import { ContactStatus } from "@prisma/client";

export function InboxDetailClient({ id, status }: { id: string, status: ContactStatus }) {
  useEffect(() => {
    // Auto-mark as read when viewed if it was NEW
    if (status === "NEW") {
      updateSubmissionStatus(id, "READ").catch(console.error);
    }
  }, [id, status]);

  return null;
}
