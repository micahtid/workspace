"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { localDateString, parseLocalDate } from "@/lib/date";
import { SkeletonBar } from "../components/Skeleton";
import { useMinLoading } from "@/lib/hooks";
import { StartWorkoutModal } from "./StartWorkoutModal";

export function DayDetail({ date }: { date: string }) {
  const sessions = useQuery(api.sessions.listForDate, { date });
  const workouts = useQuery(api.workouts.list);
  const [picking, setPicking] = useState(false);

  const parsed = parseLocalDate(date);
  const todayKey = localDateString(new Date());
  const isFuture = date > todayKey;
  const dow = parsed.getDay();

  const longLabel = parsed.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const loading = useMinLoading(
    sessions === undefined || workouts === undefined,
  );
  const hasSessions = (sessions?.length ?? 0) > 0;

  return (
    <div className="card p-5 sm:p-6">
      <h2 className="text-base sm:text-lg font-medium tracking-tight mb-5">
        {longLabel}
      </h2>

      {loading ? (
        <div className="space-y-2" aria-hidden>
          <SkeletonBar className="h-[68px] w-full" />
          <SkeletonBar className="h-[38px] w-full mt-5" />
        </div>
      ) : (
        <div>
          {hasSessions ? (
            <ul className="space-y-2">
              {sessions!.map((s) => {
                const logged = s.exercises.reduce(
                  (sum, e) => sum + e.reps.flat().filter((r) => r > 0).length,
                  0,
                );
                const possible = s.exercises.reduce(
                  (sum, e) => sum + e.weights.length * e.sets,
                  0,
                );
                return (
                  <li key={s._id}>
                    <Link
                      href={`/workouts/${s.workoutId}/session/${s.date}`}
                      className="card p-4 flex items-center justify-between gap-3 hover:border-ink-900 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {s.workoutName}
                        </div>
                        <div className="text-xs text-ink-500 mt-1">
                          {logged}/{possible} Sets Logged
                          {s.completed ? " · Complete" : ""}
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 text-ink-400"
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            !isFuture && (
              <p className="text-sm text-ink-500">
                No sessions logged for this day yet.
              </p>
            )
          )}

          {isFuture && !hasSessions && (
            <p className="text-sm text-ink-500">
              Nothing scheduled. Come back on the day to log a workout.
            </p>
          )}

          {!isFuture && (
            <button
              type="button"
              onClick={() => setPicking(true)}
              className="btn btn-ghost w-full mt-5"
            >
              <Plus size={16} strokeWidth={2} aria-hidden />
              <span>Start a Workout</span>
            </button>
          )}
        </div>
      )}

      <StartWorkoutModal
        open={picking}
        onClose={() => setPicking(false)}
        date={date}
        dow={dow}
        workouts={workouts ?? []}
      />
    </div>
  );
}
