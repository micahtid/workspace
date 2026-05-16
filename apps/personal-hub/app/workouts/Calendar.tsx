"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { localDateString } from "@/lib/date";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export function Calendar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  const [cursor, setCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const todayKey = localDateString(today);

  const yearMonth = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
  const sessions = useQuery(api.sessions.listForMonth, { yearMonth }) ?? [];

  const hasSession = new Set(sessions.map((s) => s.date));

  const daysInMonth = new Date(
    cursor.getFullYear(),
    cursor.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    cursor.getFullYear(),
    cursor.getMonth(),
    1,
  ).getDay();

  const cells: ({ day: number; key: string } | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, key });
  }

  const monthLabel = cursor.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-7 gap-2">
        <button
          type="button"
          className="icon-btn"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
          }
          aria-label="Previous Month"
        >
          <ChevronLeft size={18} strokeWidth={2} aria-hidden />
        </button>
        <h3 className="text-sm font-medium tracking-tight">{monthLabel}</h3>
        <button
          type="button"
          className="icon-btn"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
          }
          aria-label="Next Month"
        >
          <ChevronRight size={18} strokeWidth={2} aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {DAY_LABELS.map((d, i) => (
          <div
            key={i}
            className="text-[11px] text-ink-400 text-center font-medium"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((cell, i) => {
          if (!cell) return <div key={i} className="aspect-square" />;
          const has = hasSession.has(cell.key);
          const isToday = cell.key === todayKey;
          const isSelected = cell.key === selected;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(cell.key)}
              className={
                "aspect-square rounded-lg text-sm tabular-nums border transition-colors flex items-center justify-center " +
                (isSelected
                  ? "bg-ink-900 text-ink-0 border-ink-900"
                  : has
                    ? "bg-ink-100 text-ink-900 border-ink-200 hover:border-ink-400"
                    : isToday
                      ? "bg-ink-0 text-ink-900 border-ink-400"
                      : "bg-ink-0 text-ink-500 border-transparent hover:border-ink-200")
              }
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
