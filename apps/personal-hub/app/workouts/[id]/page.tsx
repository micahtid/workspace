"use client";

import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Modal } from "../../components/Modal";
import { DayPicker } from "../../components/DayPicker";
import { SkeletonCard } from "../../components/Skeleton";
import { ExerciseRow } from "./ExerciseRow";
import { Id } from "@/convex/_generated/dataModel";
import { parseLocalDate } from "@/lib/date";
import { useMinLoading } from "@/lib/hooks";

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const workoutId = id as Id<"workouts">;
  const workout = useQuery(api.workouts.get, { id: workoutId });
  const sessions = useQuery(api.sessions.listForWorkout, { workoutId });
  const loading = useMinLoading(workout === undefined);
  const update = useMutation(api.workouts.update);
  const remove = useMutation(api.workouts.remove);
  const addExercise = useMutation(api.workouts.addExercise);
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  if (loading || workout === undefined) {
    return (
      <Shell>
        <ul className="space-y-3" aria-hidden>
          <li><SkeletonCard className="h-[140px]" /></li>
          <li><SkeletonCard className="h-[140px]" /></li>
        </ul>
      </Shell>
    );
  }
  if (workout === null) {
    return (
      <Shell>
        <div className="text-sm text-ink-500">Workout not found.</div>
      </Shell>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader
          back={{ href: "/workouts/manage", label: "Edit Workouts" }}
          title={workout.name}
          subtitle={
            workout.days.length === 0
              ? "Unscheduled"
              : workout.days
                  .map((d) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d])
                  .join(" · ")
          }
          action={
            <>
              <button className="btn btn-ghost" onClick={() => setEditing(true)}>
                Edit Name & Days
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setConfirmDel(true)}
              >
                Delete
              </button>
            </>
          }
        />

        <section>
          <h2 className="text-sm font-medium text-ink-700 mb-3">Exercises</h2>

          {workout.exercises.length > 0 && (
            <ul className="space-y-3 mb-3">
              {workout.exercises.map((ex) => (
                <li key={ex._id}>
                  <ExerciseRow exercise={ex} />
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() => setAdding(true)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-ink-300 px-4 py-3 text-sm font-medium text-ink-500 hover:text-ink-900 hover:border-ink-900 transition-colors"
          >
            <Plus size={16} strokeWidth={2} aria-hidden />
            <span>Add Exercise</span>
          </button>
        </section>

        {sessions && sessions.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-medium text-ink-700 mb-3">
              History
            </h2>
            <ul className="space-y-2">
              {sessions.slice(0, 10).map((s) => {
                const total = s.exercises.reduce(
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
                      href={`/workouts/${id}/session/${s.date}`}
                      className="card p-4 flex items-center justify-between gap-3 hover:border-ink-900 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="font-medium">
                          {parseLocalDate(s.date).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-xs text-ink-500 mt-0.5">
                          {total}/{possible} Sets Logged
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
          </section>
        )}
      </main>

      <EditWorkoutModal
        open={editing}
        onClose={() => setEditing(false)}
        initialName={workout.name}
        initialDays={workout.days}
        onSave={async (name, days) => {
          await update({ id: workoutId, name, days });
          setEditing(false);
        }}
      />

      <AddExerciseModal
        open={adding}
        onClose={() => setAdding(false)}
        onAdd={async (name, sets, weights) => {
          await addExercise({ workoutId, name, sets, weights });
          setAdding(false);
        }}
      />

      <Modal
        open={confirmDel}
        onClose={() => setConfirmDel(false)}
        title="Delete This Workout?"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setConfirmDel(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                await remove({ id: workoutId });
                router.push("/workouts/manage");
              }}
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-600">
          This removes the workout and all of its exercises. Cannot be undone.
        </p>
      </Modal>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader back={{ href: "/workouts/manage", label: "Edit workouts" }} title="Workout" />
        {children}
      </main>
    </div>
  );
}

function EditWorkoutModal({
  open,
  onClose,
  initialName,
  initialDays,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  initialName: string;
  initialDays: number[];
  onSave: (name: string, days: number[]) => Promise<void>;
}) {
  const [name, setName] = useState(initialName);
  const [days, setDays] = useState<number[]>(initialDays);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Workout"
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onSave(name.trim() || initialName, days)}
          >
            Save
          </button>
        </>
      }
    >
      <div>
        <label className="label">Name</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <span className="label">Days</span>
        <DayPicker value={days} onChange={setDays} />
      </div>
    </Modal>
  );
}

function AddExerciseModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, sets: number, weights: number[]) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState<string>("3");
  const [weights, setWeights] = useState("0");

  const reset = () => {
    setName("");
    setSets("3");
    setWeights("0");
  };

  const submit = async () => {
    if (!name.trim()) return;
    const parsed = weights
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n));
    const setsNum = Math.max(1, Math.floor(Number(sets)) || 1);
    await onAdd(name.trim(), setsNum, parsed.length === 0 ? [0] : parsed);
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Add Exercise"
      footer={
        <>
          <button
            className="btn btn-ghost"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!name.trim()}>
            Add
          </button>
        </>
      }
    >
      <div>
        <label className="label">Name</label>
        <input
          className="input"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tricep Extensions"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Sets</label>
          <input
            type="number"
            min={1}
            className="input"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            onBlur={() => {
              if (sets === "" || Number(sets) < 1) setSets("1");
            }}
          />
        </div>
        <div>
          <label className="label">Weights</label>
          <input
            className="input"
            value={weights}
            onChange={(e) => setWeights(e.target.value)}
            placeholder="65, 70, 75"
          />
        </div>
      </div>
      <p className="text-xs text-ink-500 -mt-1">
        Comma-separated weight options. Use <code>0</code> for bodyweight.
      </p>
    </Modal>
  );
}
