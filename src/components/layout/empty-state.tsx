import Link from "next/link";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  href: string;
  action: string;
};

export function EmptyState({ title, description, href, action }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-forest-200/60 bg-surface p-8 text-center shadow-card">
      <h2 className="font-serif text-4xl text-forest-900">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary">
        {description}
      </p>
      <Button asChild className="mt-6">
        <Link href={href}>{action}</Link>
      </Button>
    </div>
  );
}
