export function localDateString(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(d: Date, n: number): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}

export function daysBetween(a: Date, b: Date): number {
  const ms = 1000 * 60 * 60 * 24;
  const aUtc = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bUtc = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((bUtc - aUtc) / ms);
}

export type Habit = {
  scheduleType: "daysOfWeek" | "everyNDays" | "perWeek";
  daysOfWeek?: number[];
  everyN?: number;
  anchorDate?: string;
  targetPerWeek?: number;
};

export function isHabitActiveOn(habit: Habit, day: Date): boolean {
  if (habit.scheduleType === "daysOfWeek") {
    if (!habit.daysOfWeek || habit.daysOfWeek.length === 0) return false;
    return habit.daysOfWeek.includes(day.getDay());
  }
  if (habit.scheduleType === "everyNDays") {
    const n = habit.everyN ?? 1;
    if (n < 1) return false;
    const anchor = habit.anchorDate ? parseLocalDate(habit.anchorDate) : day;
    const diff = daysBetween(anchor, day);
    if (diff < 0) return false;
    return diff % n === 0;
  }
  // perWeek: any day is a valid logging day.
  return true;
}

// Returns the Monday of the week containing `day` (local time, Mon-anchored).
export function startOfWeek(day: Date): Date {
  const dow = day.getDay();
  const offsetToMonday = dow === 0 ? -6 : 1 - dow;
  return addDays(day, offsetToMonday);
}
