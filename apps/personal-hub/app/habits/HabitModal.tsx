"use client";

import { useState } from "react";
import { Modal } from "../components/Modal";
import { DayPicker } from "../components/DayPicker";
import { localDateString } from "@/lib/date";

export type ScheduleType = "daysOfWeek" | "everyNDays" | "perWeek";

export type HabitInput = {
  title: string;
  targetPerDay: number;
  scheduleType: ScheduleType;
  daysOfWeek?: number[];
  everyN?: number;
  anchorDate?: string;
  targetPerWeek?: number;
};

export function HabitModal({
  open,
  onClose,
  onSubmit,
  initial,
  mode = "create",
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: HabitInput) => Promise<void>;
  initial?: {
    title: string;
    targetPerDay: number;
    scheduleType: ScheduleType;
    daysOfWeek: number[];
    everyN: number;
    anchorDate: string;
    targetPerWeek?: number;
  };
  mode?: "create" | "edit";
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [target, setTarget] = useState<string>(
    String(initial?.targetPerDay ?? 1),
  );
  const [scheduleType, setScheduleType] = useState<ScheduleType>(
    initial?.scheduleType ?? "daysOfWeek",
  );
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>(
    initial?.daysOfWeek ?? [1, 2, 3, 4, 5],
  );
  const [everyN, setEveryN] = useState<string>(String(initial?.everyN ?? 2));
  const [anchorDate, setAnchorDate] = useState(
    initial?.anchorDate ?? localDateString(new Date()),
  );
  const [targetPerWeek, setTargetPerWeek] = useState<string>(
    String(initial?.targetPerWeek ?? 3),
  );

  const submit = async () => {
    if (!title.trim()) return;
    const targetNum = Math.max(1, Math.floor(Number(target)) || 1);
    const everyNum = Math.max(1, Math.floor(Number(everyN)) || 1);
    const weekNum = Math.max(1, Math.floor(Number(targetPerWeek)) || 1);
    const input: HabitInput = {
      title: title.trim(),
      targetPerDay: targetNum,
      scheduleType,
    };
    if (scheduleType === "daysOfWeek") {
      input.daysOfWeek = daysOfWeek;
    } else if (scheduleType === "everyNDays") {
      input.everyN = everyNum;
      input.anchorDate = anchorDate;
    } else {
      input.targetPerWeek = weekNum;
    }
    await onSubmit(input);
    if (mode === "create") {
      setTitle("");
      setTarget("1");
      setDaysOfWeek([1, 2, 3, 4, 5]);
      setEveryN("2");
      setTargetPerWeek("3");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "edit" ? "Edit Habit" : "New Habit"}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={submit}
            disabled={!title.trim()}
          >
            {mode === "edit" ? "Save" : "Create"}
          </button>
        </>
      }
    >
      <div>
        <label className="label">Title</label>
        <input
          className="input"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Read 20 minutes"
        />
      </div>

      {scheduleType !== "perWeek" && (
        <div>
          <label className="label">Target / Day</label>
          <input
            type="number"
            min={1}
            className="input"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onBlur={() => {
              if (target === "" || Number(target) < 1) setTarget("1");
            }}
          />
        </div>
      )}

      <div>
        <span className="label">Schedule</span>
        <div className="segmented flex-wrap">
          <button
            type="button"
            onClick={() => setScheduleType("daysOfWeek")}
            className={
              "segmented-item " +
              (scheduleType === "daysOfWeek" ? "is-active" : "")
            }
          >
            Days of Week
          </button>
          <button
            type="button"
            onClick={() => setScheduleType("perWeek")}
            className={
              "segmented-item " +
              (scheduleType === "perWeek" ? "is-active" : "")
            }
          >
            Per Week
          </button>
          <button
            type="button"
            onClick={() => setScheduleType("everyNDays")}
            className={
              "segmented-item " +
              (scheduleType === "everyNDays" ? "is-active" : "")
            }
          >
            Every N Days
          </button>
        </div>
      </div>

      {scheduleType === "daysOfWeek" && (
        <div>
          <span className="label">Active Days</span>
          <DayPicker value={daysOfWeek} onChange={setDaysOfWeek} />
        </div>
      )}

      {scheduleType === "everyNDays" && (
        <div className="space-y-3">
          <div>
            <label className="label">Every</label>
            <input
              type="number"
              min={1}
              className="input"
              value={everyN}
              onChange={(e) => setEveryN(e.target.value)}
              onBlur={() => {
                if (everyN === "" || Number(everyN) < 1) setEveryN("1");
              }}
            />
          </div>
          <div>
            <label className="label">Starting</label>
            <input
              type="date"
              className="input"
              value={anchorDate}
              onChange={(e) => setAnchorDate(e.target.value)}
            />
          </div>
        </div>
      )}

      {scheduleType === "perWeek" && (
        <div>
          <label className="label">Times Per Week</label>
          <input
            type="number"
            min={1}
            max={7}
            className="input"
            value={targetPerWeek}
            onChange={(e) => setTargetPerWeek(e.target.value)}
            onBlur={() => {
              if (targetPerWeek === "" || Number(targetPerWeek) < 1)
                setTargetPerWeek("1");
            }}
          />
        </div>
      )}
    </Modal>
  );
}
