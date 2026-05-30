"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Minus, Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { SkeletonList } from "../components/Skeleton";
import Link from "next/link";
import { addDays, isHabitActiveOn, localDateString, startOfWeek } from "@/lib/date";
import { useMinLoading } from "@/lib/hooks";
import { WeekStrip } from "./WeekStrip";

type Habit = Doc<"habits">;

export default function HabitsPage() {
  const habits = useQuery(api.habits.list, {});
  const allEntries = useQuery(api.habits.allEntries);
  const loading = useMinLoading(
    habits === undefined || allEntries === undefined,
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[680px] mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader
          back={{ href: "/", label: "Hub" }}
          title="Habits"
          subtitle="Define a habit, set a schedule, log it each day."
        />

        {loading || habits === undefined || allEntries === undefined ? (
          <SkeletonList count={3} itemClassName="h-[112px]" />
        ) : (
          <div>
            {habits.length === 0 ? (
              <div className="card p-10 text-center">
                <p className="text-ink-600">No habits yet.</p>
                <Link
                  href="/habits/settings?new=1"
                  className="btn btn-primary mt-5"
                >
                  Create Your First Habit
                </Link>
              </div>
            ) : (
              <>
                <ul className="space-y-3">
                  {habits.map((h) => (
                    <li key={h._id}>
                      <HabitCard
                        habit={h}
                        entries={allEntries.filter((e) => e.habitId === h._id)}
                      />
                    </li>
                  ))}
                </ul>
                <div className="mt-10 grid grid-cols-2 gap-3">
                  <Link
                    href="/habits/progress"
                    className="btn btn-ghost w-full"
                  >
                    Progress
                  </Link>
                  <Link
                    href="/habits/settings"
                    className="btn btn-ghost w-full"
                  >
                    Settings
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function HabitCard({
  habit,
  entries,
}: {
  habit: Habit;
  entries: Doc<"habitEntries">[];
}) {
  const increment = useMutation(api.habits.increment);

  const today = new Date();
  const todayKey = localDateString(today);
  const todayEntry = entries.find((e) => e.date === todayKey);
  const todayCount = todayEntry?.count ?? 0;
  const activeToday = isHabitActiveOn(habit, today);

  // For perWeek habits, the headline progress is X / targetPerWeek for the
  // current Mon-Sun week. A day "counts" if its entry hit at least 1.
  const isPerWeek = habit.scheduleType === "perWeek";
  const weekTarget = Math.max(1, habit.targetPerWeek ?? 1);
  let weekCount = 0;
  if (isPerWeek) {
    const monday = startOfWeek(today);
    for (let i = 0; i < 7; i++) {
      const k = localDateString(addDays(monday, i));
      const e = entries.find((en) => en.date === k);
      if ((e?.count ?? 0) > 0) weekCount += 1;
    }
  }

  const done = isPerWeek
    ? weekCount >= weekTarget
    : todayCount >= habit.targetPerDay && activeToday;

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="font-medium tracking-tight min-w-0 truncate">
          {habit.title}
        </div>
        {isPerWeek ? (
          <span className="text-sm tabular-nums shrink-0">
            <span
              className={done ? "font-medium text-ink-900" : "text-ink-700"}
            >
              {weekCount}
            </span>
            <span className="text-ink-400">/{weekTarget}</span>
            <span className="text-ink-500"> wk</span>
          </span>
        ) : activeToday ? (
          <span className="text-sm tabular-nums shrink-0">
            <span
              className={done ? "font-medium text-ink-900" : "text-ink-700"}
            >
              {todayCount}
            </span>
            <span className="text-ink-400">/{habit.targetPerDay}</span>
          </span>
        ) : (
          <span className="chip shrink-0">Rest Day</span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              increment({ habitId: habit._id, date: todayKey, delta: -1 })
            }
            aria-label="Decrease today"
            className="icon-btn !w-7 !h-7 !rounded-lg"
          >
            <Minus size={13} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() =>
              increment({ habitId: habit._id, date: todayKey, delta: 1 })
            }
            aria-label="Increase today"
            className={
              "icon-btn !w-7 !h-7 !rounded-lg " +
              (done ? "!bg-ink-900 !text-ink-0 !border-ink-900" : "")
            }
          >
            <Plus size={13} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <WeekStrip habit={habit} entries={entries} />
      </div>
    </div>
  );
}
