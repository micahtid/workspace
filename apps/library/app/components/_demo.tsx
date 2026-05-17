import type { ReactNode } from "react";

export function Demo({
  title,
  description,
  code,
  background = "muted",
  children,
}: {
  title: string;
  description?: string;
  code?: string;
  background?: "muted" | "surface";
  children: ReactNode;
}) {
  const bg = background === "muted" ? "bg-surface-muted" : "bg-surface";
  return (
    <section className="mb-12 border border-border rounded-[12px] overflow-hidden bg-surface">
      <header className="px-6 py-4 border-b border-border flex items-baseline justify-between gap-4">
        <div className="text-sm font-medium">{title}</div>
        {description && (
          <div className="text-xs text-muted">{description}</div>
        )}
      </header>
      <div className={`px-6 py-14 ${bg}`}>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {children}
        </div>
      </div>
      {code && (
        <pre className="px-6 py-4 border-t border-border text-xs text-muted overflow-x-auto font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      )}
    </section>
  );
}

export function PageHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-12">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-muted text-base leading-relaxed max-w-prose">
        {description}
      </p>
    </header>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center mb-6 mt-12">
      <h2 className="text-lg font-bold shrink-0">{children}</h2>
      <div className="h-px bg-border grow ml-4" />
    </div>
  );
}
