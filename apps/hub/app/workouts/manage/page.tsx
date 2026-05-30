"use client";

import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { PageHeader } from "../../components/PageHeader";
import { Modal } from "../../components/Modal";
import { DayPicker } from "../../components/DayPicker";
import { SkeletonList } from "../../components/Skeleton";
import { useMinLoading } from "@/lib/hooks";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ManageWorkoutsPage() {
  const workouts = useQuery(api.workouts.list);
  const loading = useMinLoading(workouts === undefined);
  const create = useMutation(api.workouts.create);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [days, setDays] = useState<number[]>([]);

  const onCreate = async () => {
    if (!name.trim()) return;
    await create({ name: name.trim(), days });
    setName("");
    setDays([]);
    setCreating(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[680px] mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader
          back={{ href: "/workouts", label: "Workouts" }}
          title="Edit Workouts"
          subtitle="Define a workout's name, days, and exercises."
        />

        {loading || workouts === undefined ? (
          <SkeletonList count={3} itemClassName="h-[76px]" />
        ) : workouts.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-ink-600">No workouts yet.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {workouts.map((w) => {
              const total = w.exercises.length;
              const active = w.exercises.filter((e) => e.active).length;
              return (
                <li key={w._id}>
                  <Link
                    href={`/workouts/${w._id}`}
                    className="card p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 hover:border-ink-900 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-medium tracking-tight truncate">
                        {w.name}
                      </div>
                      <div className="mt-1 text-xs text-ink-500">
                        {active} of {total} Active
                        {total === 0 ? " · Empty" : ""}
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 shrink-0">
                      {w.days.length === 0 ? (
                        <span className="text-xs text-ink-400">Unscheduled</span>
                      ) : (
                        w.days.map((d) => (
                          <span key={d} className="chip">
                            {DAY_LABELS[d]}
                          </span>
                        ))
                      )}
                    </div>
                    <ChevronRight
                      size={18}
                      strokeWidth={2}
                      className="shrink-0 text-ink-400"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-10">
          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={() => setCreating(true)}
          >
            New Workout
          </button>
        </div>
      </main>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title="New Workout"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setCreating(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={onCreate}
              disabled={!name.trim()}
            >
              Create
            </button>
          </>
        }
      >
        <div>
          <label className="label" htmlFor="mname">
            Name
          </label>
          <input
            id="mname"
            className="input"
            placeholder="Push Hypertrophy"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") onCreate();
            }}
          />
        </div>
        <div>
          <span className="label">Days</span>
          <DayPicker value={days} onChange={setDays} />
        </div>
      </Modal>
    </div>
  );
}
