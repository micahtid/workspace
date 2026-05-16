"use client";

import { useMutation, useQuery } from "convex/react";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { PageHeader } from "../../components/PageHeader";
import { Modal } from "../../components/Modal";
import { SkeletonList } from "../../components/Skeleton";
import { HabitModal } from "../HabitModal";
import { localDateString } from "@/lib/date";
import { useMinLoading } from "@/lib/hooks";

export default function HabitsSettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsView />
    </Suspense>
  );
}

function SettingsView() {
  const habits = useQuery(api.habits.list, { includeInactive: true });
  const loading = useMinLoading(habits === undefined);
  const create = useMutation(api.habits.create);
  const [creating, setCreating] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setCreating(true);
      router.replace("/habits/settings");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader
          back={{ href: "/habits", label: "Habits" }}
          title="Settings"
          subtitle="Create a habit, edit it, disable it to hide without losing history, or delete it permanently."
        />

        {loading || habits === undefined ? (
          <SkeletonList count={3} itemClassName="h-[76px]" />
        ) : (
          <div>
            {habits.length === 0 ? (
              <div className="card p-10 text-center">
                <p className="text-ink-600">No habits yet.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {habits.map((h, i) => (
                  <li key={h._id}>
                    <HabitSettingsRow
                      habit={h}
                      isFirst={i === 0}
                      isLast={i === habits.length - 1}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-10">
          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={() => setCreating(true)}
          >
            New Habit
          </button>
        </div>
      </main>

      <HabitModal
        open={creating}
        onClose={() => setCreating(false)}
        onSubmit={async (input) => {
          await create(input);
          setCreating(false);
        }}
      />
    </div>
  );
}

function HabitSettingsRow({
  habit,
  isFirst,
  isLast,
}: {
  habit: Doc<"habits">;
  isFirst: boolean;
  isLast: boolean;
}) {
  const setActive = useMutation(api.habits.setActive);
  const move = useMutation(api.habits.move);
  const update = useMutation(api.habits.update);
  const remove = useMutation(api.habits.remove);
  const [editing, setEditing] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const isActive = habit.active !== false;

  return (
    <div
      className={
        "card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-opacity " +
        (isActive ? "" : "opacity-60")
      }
    >
      <div className="flex items-center gap-3 min-w-0 sm:flex-1">
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            type="button"
            aria-label="Move Up"
            disabled={isFirst}
            onClick={() => move({ id: habit._id, direction: "up" })}
            className="inline-flex items-center justify-center w-6 h-5 rounded-md text-ink-500 hover:text-ink-900 hover:bg-ink-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
          >
            <ChevronUp size={14} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Move Down"
            disabled={isLast}
            onClick={() => move({ id: habit._id, direction: "down" })}
            className="inline-flex items-center justify-center w-6 h-5 rounded-md text-ink-500 hover:text-ink-900 hover:bg-ink-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
          >
            <ChevronDown size={14} strokeWidth={2} aria-hidden />
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium tracking-tight break-words">
            {habit.title}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 flex-wrap">
        <button className="btn btn-ghost" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => setConfirmDel(true)}>
          Delete
        </button>
        <span
          className="mx-1 h-6 w-px bg-ink-200"
          aria-hidden
        />
        <Toggle
          on={isActive}
          onChange={() => setActive({ id: habit._id, active: !isActive })}
          label={isActive ? "Disable Habit" : "Enable Habit"}
        />
      </div>

      <HabitModal
        open={editing}
        onClose={() => setEditing(false)}
        mode="edit"
        initial={{
          title: habit.title,
          targetPerDay: habit.targetPerDay,
          scheduleType: habit.scheduleType,
          daysOfWeek: habit.daysOfWeek ?? [],
          everyN: habit.everyN ?? 2,
          anchorDate: habit.anchorDate ?? localDateString(new Date()),
          targetPerWeek: habit.targetPerWeek ?? 3,
        }}
        onSubmit={async (input) => {
          await update({ id: habit._id as Id<"habits">, ...input });
          setEditing(false);
        }}
      />

      <Modal
        open={confirmDel}
        onClose={() => setConfirmDel(false)}
        title="Delete This Habit?"
        footer={
          <>
            <button
              className="btn btn-ghost"
              onClick={() => setConfirmDel(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                await remove({ id: habit._id as Id<"habits"> });
                setConfirmDel(false);
              }}
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-600">
          This removes the habit and all of its history. Cannot be undone. To
          temporarily hide a habit instead, disable it with the toggle.
        </p>
      </Modal>
    </div>
  );
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={
        "relative w-11 h-6 rounded-full border transition-colors shrink-0 " +
        (on
          ? "bg-ink-900 border-ink-900"
          : "bg-ink-0 border-ink-300 hover:border-ink-900")
      }
    >
      <span
        className={
          "absolute top-0.5 bottom-0.5 aspect-square rounded-full transition-all " +
          (on ? "right-0.5 bg-ink-0" : "left-0.5 bg-ink-400")
        }
      />
    </button>
  );
}

