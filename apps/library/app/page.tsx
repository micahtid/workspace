import Link from "next/link";
import { sections } from "./_lib/registry";

export default function HomePage() {
  return (
    <div>
      <header className="mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          The Component Library.
        </h1>
        <p className="text-muted text-lg max-w-prose leading-relaxed">
          Live documentation for the shared design system used by{" "}
          <span className="text-foreground font-medium">site</span>,{" "}
          <span className="text-foreground font-medium">hub</span>, and{" "}
          <span className="text-foreground font-medium">notes</span>. Every
          token and component renders below — the same import the real apps
          use.
        </p>
      </header>

      {sections.map((section) => (
        <section key={section.title} className="mb-16">
          <div className="flex items-center mb-6">
            <h2 className="text-lg font-bold shrink-0">{section.title}</h2>
            <div className="h-px bg-border grow ml-4" />
          </div>
          <div className="space-y-1 -mx-2">
            {section.entries.map((entry) => (
              <Link
                key={entry.slug}
                href={entry.href}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 px-2 py-2.5 rounded-md hover:bg-surface-muted transition-colors group"
              >
                <span className="font-medium">{entry.name}</span>
                <span className="text-sm text-muted sm:text-right sm:max-w-[60%]">
                  {entry.summary}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
