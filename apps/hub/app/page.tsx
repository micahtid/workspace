import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "./components/PageHeader";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[680px] mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader
          title="Hub"
          subtitle="A quiet place to track the work and the habit."
        />

        <ul className="space-y-3">
          <li>
            <Tile href="/workouts" title="Workout Tracker" />
          </li>
          <li>
            <Tile href="/habits" title="Habit Tracker" />
          </li>
          <li>
<<<<<<< HEAD
            <Tile href="/leetcode" title="LeetCode" />
=======
            <Tile href="/space" title="Space" />
>>>>>>> space
          </li>
        </ul>
      </main>
    </div>
  );
}

function Tile({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="card p-4 sm:p-5 flex items-center justify-between gap-3 hover:border-ink-900 transition-colors"
    >
      <span className="font-medium tracking-tight min-w-0 truncate">
        {title}
      </span>
      <ChevronRight
        size={18}
        strokeWidth={2}
        className="shrink-0 text-ink-400"
        aria-hidden
      />
    </Link>
  );
}
