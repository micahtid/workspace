import Link from "next/link";
import {
  Activity,
  Check,
  Code2,
  AlignCenter,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

const APPS: { href: string; title: string; Icon: LucideIcon }[] = [
  { href: "/habits", title: "Habit", Icon: Check },
  { href: "/workouts", title: "Workout", Icon: Activity },
  { href: "/leetcode", title: "LeetCode", Icon: Code2 },
  { href: "/space", title: "Space", Icon: AlignCenter },
];

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 sm:px-6 py-10">
      <div className="card divide-y divide-ink-200 overflow-hidden w-full max-w-[680px] -mt-16 sm:-mt-24">
        {APPS.map((app) => (
          <AppRow key={app.href} {...app} />
        ))}
      </div>
    </main>
  );
}

function AppRow({
  href,
  title,
  Icon,
}: {
  href: string;
  title: string;
  Icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 px-4 sm:px-5 py-4 transition-colors hover:bg-ink-50"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-200 bg-ink-0 text-ink-700 transition-colors group-hover:border-ink-300 group-hover:text-ink-900">
        <Icon size={20} strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0 flex-1 font-medium tracking-tight text-ink-900">
        {title}
      </div>
      <ChevronRight
        size={18}
        strokeWidth={2}
        className="shrink-0 text-ink-400"
        aria-hidden
      />
    </Link>
  );
}
