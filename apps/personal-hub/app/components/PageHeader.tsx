import Link from "next/link";
import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  action,
  back,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  back?: { href: string; label?: string };
}) {
  return (
    <header className="mb-8 sm:mb-10">
      {back && (
        <Link href={back.href} className="back-link mb-6">
          <ChevronLeft size={16} strokeWidth={2} aria-hidden />
          <span>{back.label ?? "Back"}</span>
        </Link>
      )}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-ink-500">{subtitle}</p>
          )}
        </div>
        {action && (
          <div className="flex items-center gap-2 flex-wrap">{action}</div>
        )}
      </div>
    </header>
  );
}
