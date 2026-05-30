"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { PageHeader } from "../../components/PageHeader";
import { SkeletonBar, SkeletonCard } from "../../components/Skeleton";
import {
  addDays,
  daysBetween,
  isHabitActiveOn,
  localDateString,
} from "@/lib/date";
import { useMinLoading } from "@/lib/hooks";

type Habit = Doc<"habits">;
type Entry = Doc<"habitEntries">;

export default function ProgressPage() {
  const habits = useQuery(api.habits.list, {});
  const entries = useQuery(api.habits.allEntries);
  const loading = useMinLoading(habits === undefined || entries === undefined);
  const [filter, setFilter] = useState<"all" | string>("all");
  const [range, setRange] = useState<13 | 26 | 52>(26);

  if (loading || habits === undefined || entries === undefined) {
    return (
      <Shell>
        <SkeletonCard className="h-[260px]">
          <SkeletonBar className="h-5 w-1/4" />
        </SkeletonCard>
        <div className="mt-8 grid gap-3 grid-cols-2 md:grid-cols-3">
          <SkeletonCard className="h-[88px]" />
          <SkeletonCard className="h-[88px]" />
          <SkeletonCard className="h-[88px] col-span-2 md:col-span-1" />
        </div>
      </Shell>
    );
  }

  const filtered = filter === "all" ? habits : habits.filter((h) => h._id === filter);

  return (
    <Shell>
      <div>
      <div className="card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <h2 className="text-base font-medium tracking-tight">Heatmap</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              className="input !py-1.5 !w-auto !text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter Habit"
            >
              <option value="all">All Habits</option>
              {habits.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.title}
                </option>
              ))}
            </select>
            <div className="segmented">
              {[13, 26, 52].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setRange(w as 13 | 26 | 52)}
                  className={
                    "segmented-item " + (range === w ? "is-active" : "")
                  }
                >
                  {w === 13 ? "3 Mo" : w === 26 ? "6 Mo" : "1 Yr"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-ink-500 text-center py-8">No habits yet.</p>
        ) : (
          <Heatmap habits={filtered} entries={entries} weeks={range} />
        )}
      </div>

      <div className="mt-8 grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard
          label="Habits Tracked"
          value={String(filtered.length)}
        />
        <StatCard
          label="Total Completions"
          value={String(
            entries
              .filter((e) =>
                filter === "all" ? true : e.habitId === filter,
              )
              .reduce((sum, e) => sum + e.count, 0),
          )}
        />
        <StatCard
          label="Streak"
          value={String(currentStreak(filtered, entries))}
          suffix="Day(s)"
          className="col-span-2 md:col-span-1"
        />
      </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[680px] mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader
          back={{ href: "/habits", label: "Habits" }}
          title="Progress"
          subtitle="The long view. Filter by habit, scrub the range."
        />
        {children}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  className,
}: {
  label: string;
  value: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={"card p-5 " + (className ?? "")}>
      <div className="text-xs font-medium text-ink-500">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-2xl font-medium tracking-tight tabular-nums">
          {value}
        </span>
        {suffix && <span className="text-xs text-ink-500">{suffix}</span>}
      </div>
    </div>
  );
}

function Heatmap({
  habits,
  entries,
  weeks,
}: {
  habits: Habit[];
  entries: Entry[];
  weeks: number;
}) {
  const today = new Date();
  const start = addDays(today, -(weeks * 7 - 1));
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  // Aggregate for a given date across selected habits.
  const cellFor = (day: Date) => {
    if (daysBetween(day, today) < 0) return null; // future
    let target = 0;
    let count = 0;
    let activeAny = false;
    for (const h of habits) {
      if (isHabitActiveOn(h, day)) {
        activeAny = true;
        target += h.targetPerDay;
      }
      const key = localDateString(day);
      const e = entries.find(
        (en) => en.habitId === h._id && en.date === key,
      );
      if (e) count += Math.min(e.count, h.targetPerDay);
    }
    return { activeAny, target, count };
  };

  const columns: Date[][] = [];
  let cursor = new Date(start);
  while (daysBetween(cursor, today) >= 0) {
    const col: Date[] = [];
    for (let d = 0; d < 7; d++) {
      col.push(new Date(cursor));
      cursor = addDays(cursor, 1);
    }
    columns.push(col);
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-[3px]">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {col.map((day) => {
              const key = localDateString(day);
              const future = daysBetween(day, today) < 0;
              if (future) {
                return (
                  <div
                    key={key}
                    className="w-3 h-3 rounded-[3px] bg-transparent"
                    aria-hidden
                  />
                );
              }
              const info = cellFor(day);
              if (!info) {
                return (
                  <div
                    key={key}
                    className="w-3 h-3 rounded-[3px] bg-transparent"
                  />
                );
              }
              const { activeAny, target, count } = info;
              const ratio = target > 0 ? count / target : 0;
              let cls = "bg-ink-100";
              if (activeAny) {
                if (count === 0) cls = "bg-ink-0 border border-ink-300";
                else if (ratio < 0.34) cls = "bg-ink-300";
                else if (ratio < 0.67) cls = "bg-ink-500";
                else if (ratio < 1) cls = "bg-ink-700";
                else cls = "bg-ink-900";
              } else if (count > 0) {
                cls = "bg-ink-300";
              }
              const title = activeAny
                ? `${key} · ${count}/${target}`
                : `${key} · rest day`;
              return (
                <div
                  key={key}
                  className={`w-3 h-3 rounded-[3px] ${cls}`}
                  title={title}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-500">
        <span>Less</span>
        <span className="w-3 h-3 rounded-[3px] bg-ink-0 border border-ink-300" />
        <span className="w-3 h-3 rounded-[3px] bg-ink-300" />
        <span className="w-3 h-3 rounded-[3px] bg-ink-500" />
        <span className="w-3 h-3 rounded-[3px] bg-ink-700" />
        <span className="w-3 h-3 rounded-[3px] bg-ink-900" />
        <span>More</span>
      </div>
    </div>
  );
}

function currentStreak(habits: Habit[], entries: Entry[]): number {
  if (habits.length === 0) return 0;
  let streak = 0;
  let cursor = new Date();
  // Walk back until we hit a "scheduled day where target not met for any habit".
  for (let safety = 0; safety < 365; safety++) {
    const key = localDateString(cursor);
    let scheduled = false;
    let hit = true;
    for (const h of habits) {
      if (isHabitActiveOn(h, cursor)) {
        scheduled = true;
        const e = entries.find(
          (en) => en.habitId === h._id && en.date === key,
        );
        if ((e?.count ?? 0) < h.targetPerDay) hit = false;
      }
    }
    if (!scheduled) {
      cursor = addDays(cursor, -1);
      continue;
    }
    if (hit) {
      streak += 1;
      cursor = addDays(cursor, -1);
    } else {
      break;
    }
  }
  return streak;
}
