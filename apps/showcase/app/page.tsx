import Link from "next/link";
import { components } from "./_lib/registry";

export default function HomePage() {
  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-semibold mb-3">@micahtid/ui</h1>
        <p className="text-muted text-lg">
          Component showcase. Every component below renders in isolation —
          same import the real apps use.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {components.map((c) => (
          <Link
            key={c.slug}
            href={`/components/${c.slug}`}
            className="block border border-border rounded-lg p-5 bg-surface hover:border-foreground transition-colors"
          >
            <div className="font-medium mb-1">{c.name}</div>
            <div className="text-sm text-muted">{c.summary}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
