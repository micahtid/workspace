import type { ReactNode } from "react";

export function Demo({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8 border border-border rounded-lg overflow-hidden bg-surface">
      <header className="px-5 py-3 border-b border-border text-sm font-medium">
        {title}
      </header>
      <div className="px-5 py-10 flex items-center justify-center bg-background">
        {children}
      </div>
      <pre className="px-5 py-3 border-t border-border text-xs text-muted overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </section>
  );
}
