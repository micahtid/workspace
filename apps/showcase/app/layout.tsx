import type { Metadata } from "next";
import Link from "next/link";
import { components } from "./_lib/registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Showcase — @micahtid/ui",
  description: "Component showcase for the @micahtid/ui design system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex">
        <aside className="w-64 shrink-0 border-r border-border bg-surface px-5 py-8 sticky top-0 h-screen overflow-y-auto">
          <Link href="/" className="block mb-8">
            <div className="text-sm uppercase tracking-widest text-muted">
              @micahtid/ui
            </div>
            <div className="text-xl font-semibold">Showcase</div>
          </Link>

          <nav className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-muted mb-2">
              Components
            </div>
            {components.map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.slug}`}
                className="block px-3 py-2 rounded-md text-sm hover:bg-background hover:text-foreground text-muted transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-10 py-12 max-w-4xl">{children}</main>
      </body>
    </html>
  );
}
