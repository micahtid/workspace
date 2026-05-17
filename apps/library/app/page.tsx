export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
        The Component Library.
      </h1>
      <p className="text-muted text-lg max-w-prose leading-relaxed">
        Live documentation for the shared design system used by{" "}
        <span className="text-foreground font-medium">site</span>,{" "}
        <span className="text-foreground font-medium">hub</span>, and{" "}
        <span className="text-foreground font-medium">notes</span>. Every token
        and component renders below—the same import the real apps use.
      </p>
      <p className="text-sm text-muted mt-10">
        Use the sidebar, or press{" "}
        <kbd className="text-[11px] border border-border rounded px-1.5 py-0.5 font-medium text-foreground">
          ⌘K
        </kbd>{" "}
        to jump anywhere.
      </p>
    </div>
  );
}
