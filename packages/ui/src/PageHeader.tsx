import Link from "next/link";
import type { ReactNode } from "react";

export type PageHeaderProps = {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
  back?: { href: string; label?: string };
};

export function PageHeader({
  title,
  subtitle,
  action,
  back,
}: PageHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10">
      {back && (
        <Link
          href={back.href}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>{back.label ?? "Back"}</span>
        </Link>
      )}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-muted">{subtitle}</p>
          )}
        </div>
        {action && (
          <div className="flex items-center gap-2 flex-wrap">{action}</div>
        )}
      </div>
    </header>
  );
}
