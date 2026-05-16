"use client";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DayPicker({
  value,
  onChange,
}: {
  value: number[];
  onChange: (next: number[]) => void;
}) {
  const toggle = (i: number) => {
    const set = new Set(value);
    if (set.has(i)) set.delete(i);
    else set.add(i);
    onChange([...set].sort((a, b) => a - b));
  };

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Days">
      {DAYS.map((d, i) => {
        const on = value.includes(i);
        return (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            aria-label={LABELS[i]}
            aria-pressed={on}
            className={
              "w-9 h-9 rounded-full text-sm font-medium border transition-colors " +
              (on
                ? "bg-ink-900 text-ink-0 border-ink-900"
                : "bg-ink-0 text-ink-600 border-ink-300 hover:border-ink-900 hover:text-ink-900")
            }
          >
            {d}
          </button>
        );
      })}
    </div>
  );
}
