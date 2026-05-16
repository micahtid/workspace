"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAutosaved } from "@/lib/hooks";

export function RepInput({
  sessionId,
  exerciseIndex,
  weightIndex,
  setIndex,
  value,
  ghost,
}: {
  sessionId: Id<"sessions">;
  exerciseIndex: number;
  weightIndex: number;
  setIndex: number;
  value: number;
  ghost?: number;
}) {
  const updateReps = useMutation(api.sessions.updateReps);
  const [local, setLocal] = useAutosaved(value, (v) =>
    updateReps({
      id: sessionId,
      exerciseIndex,
      weightIndex,
      setIndex,
      reps: v,
    }),
  );

  const showGhost = ghost !== undefined && ghost > 0;

  return (
    <div className="relative">
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={local || ""}
        onChange={(e) => setLocal(Math.max(0, Number(e.target.value) || 0))}
        placeholder="—"
        aria-label={`Reps for set ${setIndex + 1}`}
        className="input !text-center !py-2 tabular-nums placeholder:!text-ink-300"
      />
      {showGhost && (
        <span
          className="pointer-events-none absolute top-1.5 left-2 text-[10px] leading-none text-ink-400 tabular-nums"
          aria-hidden
          title="Last session"
        >
          {ghost}
        </span>
      )}
    </div>
  );
}
