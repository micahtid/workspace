"use client";

import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { addDays, isHabitActiveOn, localDateString } from "@/lib/date";

type Habit = Doc<"habits">;
type Entry = Doc<"habitEntries">;

const LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function WeekStrip({
  habit,
  entries,
}: {
  habit: Habit;
  entries: Entry[];
}) {
  const today = new Date();
  const dow = today.getDay();
  const offsetToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = addDays(today, offsetToMonday);
  const todayKey = localDateString(today);

  const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));

  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="flex items-end">
      {days.map((day, i) => {
        const key = localDateString(day);
        const isToday = key === todayKey;
        const isPast = key <= todayKey;
        const active = isHabitActiveOn(habit, day);
        const entry = entries.find((e) => e.date === key);
        const count = entry?.count ?? 0;
        const ratio =
          habit.targetPerDay > 0 ? count / habit.targetPerDay : 0;

        let cls = "bg-ink-50 border-ink-200";
        if (!isPast) {
          cls = "bg-ink-0 border-ink-200";
        } else if (active) {
          if (count === 0) cls = "bg-ink-0 border-ink-300";
          else if (ratio < 0.34) cls = "bg-ink-300 border-ink-300";
          else if (ratio < 0.67) cls = "bg-ink-500 border-ink-500";
          else if (ratio < 1) cls = "bg-ink-700 border-ink-700";
          else cls = "bg-ink-900 border-ink-900";
        } else if (count > 0) {
          cls = "bg-ink-300 border-ink-300";
        }

        const clickable = isPast;
        const isOpen = openKey === key;

        return (
          <div key={key} className="relative flex flex-col items-center gap-1">
            <span
              className={
                "text-[10px] " +
                (isToday ? "text-ink-900 font-medium" : "text-ink-400")
              }
            >
              {LABELS[i]}
            </span>
            <button
              type="button"
              disabled={!clickable}
              onClick={() => setOpenKey(isOpen ? null : key)}
              className={
                "group inline-flex items-center justify-center p-1.5 rounded " +
                (clickable ? "cursor-pointer" : "cursor-default")
              }
              aria-label={
                active
                  ? `${day.toLocaleDateString()}, ${count} of ${habit.targetPerDay}`
                  : `${day.toLocaleDateString()}, rest day`
              }
              title={
                active
                  ? `${day.toLocaleDateString()} · ${count}/${habit.targetPerDay}`
                  : `${day.toLocaleDateString()} · rest day`
              }
            >
              <span
                className={
                  "block w-4 h-4 rounded-[3px] border transition-[background-color,border-color,transform] duration-200 " +
                  cls +
                  (clickable ? " group-hover:scale-110" : "") +
                  (isToday ? " ring-1 ring-ink-900 ring-offset-1 ring-offset-ink-0" : "")
                }
                aria-hidden
              />
            </button>
            {isOpen && (
              <DayEditor
                habitId={habit._id}
                date={key}
                count={count}
                target={habit.targetPerDay}
                active={active}
                onClose={() => setOpenKey(null)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function DayEditor({
  habitId,
  date,
  count,
  target,
  active,
  onClose,
}: {
  habitId: Doc<"habits">["_id"];
  date: string;
  count: number;
  target: number;
  active: boolean;
  onClose: () => void;
}) {
  const setCount = useMutation(api.habits.setCount);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    setTimeout(() => document.addEventListener("mousedown", onDoc), 0);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const readable = new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      ref={ref}
      className="absolute z-20 top-full mt-2 left-1/2 -translate-x-1/2 card p-3 w-44 bg-ink-0"
      role="dialog"
    >
      <div className="text-[11px] text-ink-500 mb-2 text-center">
        {readable}
        {!active && " · Rest Day"}
      </div>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Decrease"
          className="icon-btn !w-8 !h-8"
          onClick={() =>
            setCount({ habitId, date, count: Math.max(0, count - 1) })
          }
        >
          <Minus size={14} strokeWidth={2} aria-hidden />
        </button>
        <span className="tabular-nums text-sm font-medium">
          {count}/{target}
        </span>
        <button
          type="button"
          aria-label="Increase"
          className="icon-btn !w-8 !h-8"
          onClick={() => setCount({ habitId, date, count: count + 1 })}
        >
          <Plus size={14} strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
