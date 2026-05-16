"use client";

import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PageHeader } from "../../../../components/PageHeader";
import { Modal } from "../../../../components/Modal";
import { SkeletonCard } from "../../../../components/Skeleton";
import { useMinLoading } from "@/lib/hooks";
import { parseLocalDate, localDateString } from "@/lib/date";
import { RepInput } from "./RepInput";

export default function SessionPage({
  params,
}: {
  params: Promise<{ id: string; date: string }>;
}) {
  const { id, date } = use(params);
  const workoutId = id as Id<"workouts">;

  const session = useQuery(api.sessions.getForDate, { workoutId, date });
  const previous = useQuery(api.sessions.previousFor, {
    workoutId,
    beforeDate: date,
  });
  const startOrResume = useMutation(api.sessions.startOrResume);
  const complete = useMutation(api.sessions.complete);
  const removeSession = useMutation(api.sessions.remove);
  const router = useRouter();

  const [starting, setStarting] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const discardedRef = useRef(false);

  const today = localDateString(new Date());
  const isFuture = date > today;
  const loading = useMinLoading(
    session === undefined || (session === null && !isFuture),
  );

  // Auto-start a session for any non-future date the user lands on.
  // Suppressed after an explicit Discard so we don't immediately recreate it.
  useEffect(() => {
    if (
      session === null &&
      !isFuture &&
      !starting &&
      !discardedRef.current
    ) {
      setStarting(true);
      void startOrResume({ workoutId, date }).finally(() => setStarting(false));
    }
  }, [session, isFuture, starting, startOrResume, workoutId, date]);

  if (loading || session === undefined || (session === null && !isFuture)) {
    return (
      <Shell back="/workouts">
        <ul className="space-y-5" aria-hidden>
          <li><SkeletonCard className="h-[180px]" /></li>
          <li><SkeletonCard className="h-[180px]" /></li>
        </ul>
      </Shell>
    );
  }

  if (session === null) {
    return (
      <Shell back="/workouts">
        <div className="card p-10 text-center">
          <p className="text-ink-600">
            This date hasn&apos;t happened yet. Come back to log it.
          </p>
        </div>
      </Shell>
    );
  }

  const readableDate = parseLocalDate(date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-6 py-10 sm:py-12 pb-32">
        <PageHeader
          back={{ href: "/workouts", label: "Workouts" }}
          title={session.workoutName}
          subtitle={
            session.completed ? `${readableDate} · Completed` : readableDate
          }
          action={
            <>
              <button
                className="btn btn-danger"
                onClick={() => setConfirmDel(true)}
              >
                Discard
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  complete({ id: session._id, completed: !session.completed })
                }
              >
                {session.completed ? "Unmark Complete" : "Mark Complete"}
              </button>
            </>
          }
        />

        {session.exercises.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-ink-600">
              No active exercises were attached when this session started.
            </p>
            <p className="text-xs text-ink-500 mt-2">
              Activate exercises on the workout, then start a fresh session.
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {session.exercises.map((ex, exerciseIndex) => (
              <li key={`${ex.name}-${exerciseIndex}`}>
                <ExerciseCard
                  sessionId={session._id}
                  exerciseIndex={exerciseIndex}
                  exercise={ex}
                  previous={previous?.exercises.find(
                    (p) => p.name === ex.name,
                  )}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      <Modal
        open={confirmDel}
        onClose={() => setConfirmDel(false)}
        title="Discard This Session?"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setConfirmDel(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                discardedRef.current = true;
                setConfirmDel(false);
                router.push("/workouts");
                await removeSession({ id: session._id });
              }}
            >
              Discard
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-600">
          Removes the session and all logged reps for {readableDate}. Cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}

function Shell({
  children,
  back,
}: {
  children: React.ReactNode;
  back: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader back={{ href: back, label: "Workout" }} title="Session" />
        {children}
      </main>
    </div>
  );
}

function ExerciseCard({
  sessionId,
  exerciseIndex,
  exercise,
  previous,
}: {
  sessionId: Id<"sessions">;
  exerciseIndex: number;
  exercise: {
    name: string;
    sets: number;
    weights: number[];
    reps: number[][];
  };
  previous?: { weights: number[]; reps: number[][] };
}) {
  return (
    <div className="card p-4 sm:p-5">
      <h3 className="text-base font-medium tracking-tight mb-4">
        {exercise.name}
      </h3>
      <div
        className="grid gap-x-3 gap-y-2 items-center"
        style={{
          gridTemplateColumns: `auto repeat(${exercise.sets}, minmax(0, 1fr))`,
        }}
      >
        <div />
        {Array.from({ length: exercise.sets }).map((_, si) => (
          <div
            key={si}
            className="text-xs font-medium text-ink-500 text-center"
          >
            Set {si + 1}
          </div>
        ))}

        {exercise.weights.map((weight, weightIndex) => (
          <Row
            key={weightIndex}
            weight={weight}
            sets={exercise.sets}
            reps={exercise.reps[weightIndex] ?? []}
            previousReps={previous?.reps[weightIndex]}
            sessionId={sessionId}
            exerciseIndex={exerciseIndex}
            weightIndex={weightIndex}
          />
        ))}
      </div>

      {previous && (
        <p className="mt-4 text-xs text-ink-400">
          Faint numbers in the corner show your last session.
        </p>
      )}
    </div>
  );
}

function Row({
  weight,
  sets,
  reps,
  previousReps,
  sessionId,
  exerciseIndex,
  weightIndex,
}: {
  weight: number;
  sets: number;
  reps: number[];
  previousReps?: number[];
  sessionId: Id<"sessions">;
  exerciseIndex: number;
  weightIndex: number;
}) {
  return (
    <>
      <div className="text-sm tabular-nums text-ink-700 pr-4 sm:pr-5">
        {weight === 0 ? "BW" : `${weight}`}
      </div>
      {Array.from({ length: sets }).map((_, si) => (
        <RepInput
          key={si}
          sessionId={sessionId}
          exerciseIndex={exerciseIndex}
          weightIndex={weightIndex}
          setIndex={si}
          value={reps[si] ?? 0}
          ghost={previousReps?.[si]}
        />
      ))}
    </>
  );
}
