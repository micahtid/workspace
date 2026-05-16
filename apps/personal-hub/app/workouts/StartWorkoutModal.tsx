"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Modal } from "../components/Modal";
import { Doc } from "@/convex/_generated/dataModel";

type Workout = Doc<"workouts"> & {
  exercises: { active: boolean }[];
};

export function StartWorkoutModal({
  open,
  onClose,
  date,
  dow,
  workouts,
}: {
  open: boolean;
  onClose: () => void;
  date: string;
  dow: number;
  workouts: Workout[];
}) {
  const assigned = workouts.filter((w) => w.days.includes(dow));
  const others = workouts.filter((w) => !w.days.includes(dow));

  return (
    <Modal open={open} onClose={onClose} title="Start a Workout">
      {workouts.length === 0 ? (
        <p className="text-sm text-ink-500">
          No workouts yet. Create one to get started.
        </p>
      ) : (
        <div className="space-y-5">
          <Section title="Assigned" empty="Nothing assigned to this weekday.">
            {assigned.map((w) => (
              <WorkoutItem key={w._id} workout={w} date={date} onClose={onClose} />
            ))}
          </Section>
          {others.length > 0 && (
            <Section title="Others">
              {others.map((w) => (
                <WorkoutItem
                  key={w._id}
                  workout={w}
                  date={date}
                  onClose={onClose}
                />
              ))}
            </Section>
          )}
        </div>
      )}
    </Modal>
  );
}

function Section({
  title,
  empty,
  children,
}: {
  title: string;
  empty?: string;
  children: React.ReactNode[];
}) {
  return (
    <section>
      <h3 className="text-xs font-medium text-ink-500 mb-2">
        {title}
      </h3>
      {children.length === 0 ? (
        <p className="text-xs text-ink-400">{empty ?? "Nothing here."}</p>
      ) : (
        <ul className="space-y-2">{children}</ul>
      )}
    </section>
  );
}

function WorkoutItem({
  workout,
  date,
  onClose,
}: {
  workout: Workout;
  date: string;
  onClose: () => void;
}) {
  const activeCount = workout.exercises.filter((e) => e.active).length;
  return (
    <li>
      <Link
        href={`/workouts/${workout._id}/session/${date}`}
        onClick={onClose}
        className="card p-3 flex items-center justify-between gap-3 hover:border-ink-900 transition-colors"
      >
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium truncate">{workout.name}</div>
          <div className="text-xs text-ink-500 mt-0.5">
            {activeCount} Active Exercise{activeCount === 1 ? "" : "s"}
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
}
