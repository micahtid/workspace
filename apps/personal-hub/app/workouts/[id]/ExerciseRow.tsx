"use client";

import { useMutation } from "convex/react";
import { useRef, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useAutosaved } from "@/lib/hooks";
import { Modal } from "../../components/Modal";
import { Doc } from "@/convex/_generated/dataModel";

type Exercise = Doc<"exercises">;

export function ExerciseRow({ exercise }: { exercise: Exercise }) {
  const updateExercise = useMutation(api.workouts.updateExercise);
  const removeExercise = useMutation(api.workouts.removeExercise);

  const [name, setName] = useAutosaved(exercise.name, (v) =>
    updateExercise({ id: exercise._id, name: v }),
  );
  const [sets, setSets] = useAutosaved(exercise.sets, (v) =>
    updateExercise({ id: exercise._id, sets: v }),
  );
  const [weights, setWeights] = useAutosaved(exercise.weights, (v) =>
    updateExercise({ id: exercise._id, weights: v }),
  );

  const [confirmDel, setConfirmDel] = useState(false);

  const toggle = () =>
    updateExercise({ id: exercise._id, active: !exercise.active });

  return (
    <div
      className={
        "card p-4 sm:p-5 transition-colors " +
        (exercise.active ? "" : "bg-ink-50 opacity-70")
      }
    >
      <div className="flex items-center gap-3 flex-wrap">
        <Toggle on={exercise.active} onChange={toggle} />
        <input
          aria-label="Exercise name"
          className="input flex-1 min-w-[160px] !border-transparent !bg-transparent !px-2 font-medium"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="btn btn-danger text-xs !px-3 !py-1.5 !min-h-0"
          onClick={() => setConfirmDel(true)}
          aria-label="Delete exercise"
        >
          Remove
        </button>
      </div>

      <div className="mt-3 grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 items-center">
        <span className="text-xs font-medium text-ink-500">Sets</span>
        <div className="flex items-center gap-2">
          <SetButton onClick={() => setSets(Math.max(1, sets - 1))} aria-label="Decrease sets">
            <Minus size={14} strokeWidth={2} aria-hidden />
          </SetButton>
          <span className="w-8 text-center tabular-nums">{sets}</span>
          <SetButton onClick={() => setSets(sets + 1)} aria-label="Increase sets">
            <Plus size={14} strokeWidth={2} aria-hidden />
          </SetButton>
        </div>
        <span className="hidden sm:block" />

        <span className="text-xs font-medium text-ink-500">Weights</span>
        <div className="col-span-1 sm:col-span-2">
          <WeightsEditor value={weights} onChange={setWeights} />
        </div>
      </div>

      <Modal
        open={confirmDel}
        onClose={() => setConfirmDel(false)}
        title="Remove This Exercise?"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setConfirmDel(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                await removeExercise({ id: exercise._id });
                setConfirmDel(false);
              }}
            >
              Remove
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-600">This cannot be undone.</p>
      </Modal>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className={
        "relative w-9 h-5 rounded-full border transition-colors shrink-0 " +
        (on
          ? "bg-ink-900 border-ink-900"
          : "bg-ink-0 border-ink-300 hover:border-ink-900")
      }
    >
      <span
        className={
          "absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-all " +
          (on ? "left-[18px] bg-ink-0" : "left-[2px] bg-ink-400")
        }
      />
    </button>
  );
}

function SetButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}

function WeightsEditor({
  value,
  onChange,
}: {
  value: number[];
  onChange: (next: number[]) => void;
}) {
  const set = (i: number, v: number) => {
    const next = [...value];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => {
    const next = value.filter((_, idx) => idx !== i);
    onChange(next.length === 0 ? [0] : next);
  };
  const add = () => onChange([...value, value[value.length - 1] ?? 0]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {value.map((w, i) => (
        <WeightField
          key={i}
          weight={w}
          showRemove={value.length > 1}
          onChange={(v) => set(i, v)}
          onRemove={() => remove(i)}
        />
      ))}
      <button
        type="button"
        onClick={add}
        className="text-xs text-ink-500 hover:text-ink-900 transition-colors border border-dashed border-ink-300 hover:border-ink-900 rounded-full px-3 py-1"
      >
        + Weight
      </button>
    </div>
  );
}

function WeightField({
  weight,
  showRemove,
  onChange,
  onRemove,
}: {
  weight: number;
  showRemove: boolean;
  onChange: (v: number) => void;
  onRemove: () => void;
}) {
  // Local string state so the user can clear the input while typing.
  // Synced to the canonical numeric value on commit (blur or change).
  const [text, setText] = useState<string>(
    Number.isFinite(weight) ? String(weight) : "0",
  );
  const lastWeightRef = useRef(weight);
  if (lastWeightRef.current !== weight) {
    lastWeightRef.current = weight;
    setText(Number.isFinite(weight) ? String(weight) : "0");
  }

  return (
    <div className="flex items-center gap-1">
      <input
        type="number"
        className="input !w-20 !py-1.5 !text-sm tabular-nums"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const n = Number(e.target.value);
          if (Number.isFinite(n)) onChange(n);
        }}
        onBlur={() => {
          if (text === "") {
            setText("0");
            onChange(0);
          }
        }}
      />
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove weight"
          className="inline-flex items-center justify-center w-6 h-6 rounded-md text-ink-400 hover:text-ink-900 hover:bg-ink-50 transition-colors"
        >
          <X size={14} strokeWidth={2} aria-hidden />
        </button>
      )}
    </div>
  );
}
