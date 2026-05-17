import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { sections } from "./_lib/registry";
import { ThemeToggle } from "./_lib/ThemeToggle";
import { CommandPalette, CommandPaletteTrigger } from "./_lib/CommandPalette";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Library—@micahtid/ui",
  description:
    "Live documentation for the @micahtid/ui design system: typography, color, and components.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body
        className={`${manrope.variable} antialiased min-h-screen flex`}
        suppressHydrationWarning
      >
        <CommandPalette />

        <aside className="w-64 shrink-0 border-r border-border bg-surface sticky top-0 h-screen overflow-y-auto no-scrollbar flex flex-col">
          <div className="flex items-start justify-between px-6 pt-10 pb-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Library
            </Link>
            <ThemeToggle />
          </div>

          <CommandPaletteTrigger />

          <nav className="space-y-7 flex-1 px-6 pt-8 pb-10">
            {sections.map((section) => (
              <div key={section.title}>
                <div className="text-xs text-muted mb-3 font-medium">
                  {section.title}
                </div>
                <div className="space-y-0.5 -mx-2">
                  {section.entries.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={entry.href}
                      className="block px-2 py-1.5 rounded-md text-sm text-muted hover:text-foreground hover:bg-surface-muted transition-colors"
                    >
                      {entry.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-[760px] px-8 sm:px-12 py-16 sm:py-20">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
