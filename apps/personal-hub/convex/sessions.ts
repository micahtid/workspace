import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const exerciseSnapshot = v.object({
  exerciseId: v.optional(v.id("exercises")),
  name: v.string(),
  sets: v.number(),
  weights: v.array(v.number()),
  reps: v.array(v.array(v.number())),
});

function emptyReps(weights: number[], sets: number): number[][] {
  return weights.map(() => Array.from({ length: sets }, () => 0));
}

export const getForDate = query({
  args: { workoutId: v.id("workouts"), date: v.string() },
  handler: async (ctx, { workoutId, date }) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_workout_date", (q) =>
        q.eq("workoutId", workoutId).eq("date", date),
      )
      .first();
  },
});

export const listForMonth = query({
  args: { yearMonth: v.string() }, // "YYYY-MM"
  handler: async (ctx, { yearMonth }) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_date")
      .collect();
    return sessions.filter((s) => s.date.startsWith(yearMonth + "-"));
  },
});

export const listForDate = query({
  args: { date: v.string() },
  handler: async (ctx, { date }) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_date", (q) => q.eq("date", date))
      .collect();
  },
});

export const listForWorkout = query({
  args: { workoutId: v.id("workouts") },
  handler: async (ctx, { workoutId }) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_workout", (q) => q.eq("workoutId", workoutId))
      .collect();
    sessions.sort((a, b) => b.date.localeCompare(a.date));
    return sessions;
  },
});

export const previousFor = query({
  args: { workoutId: v.id("workouts"), beforeDate: v.string() },
  handler: async (ctx, { workoutId, beforeDate }) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_workout", (q) => q.eq("workoutId", workoutId))
      .collect();
    const earlier = sessions
      .filter((s) => s.date < beforeDate)
      .sort((a, b) => b.date.localeCompare(a.date));
    return earlier[0] ?? null;
  },
});

// Start (or resume) a session for the workout on the given date.
// Snapshots the workout's currently-active exercises if a session didn't exist.
export const startOrResume = mutation({
  args: { workoutId: v.id("workouts"), date: v.string() },
  handler: async (ctx, { workoutId, date }) => {
    const existing = await ctx.db
      .query("sessions")
      .withIndex("by_workout_date", (q) =>
        q.eq("workoutId", workoutId).eq("date", date),
      )
      .first();
    if (existing) return existing._id;

    const workout = await ctx.db.get(workoutId);
    if (!workout) throw new Error("Workout not found");

    const allExercises = await ctx.db
      .query("exercises")
      .withIndex("by_workout_order", (q) => q.eq("workoutId", workoutId))
      .collect();
    allExercises.sort((a, b) => a.order - b.order);
    const active = allExercises.filter((e) => e.active);

    return await ctx.db.insert("sessions", {
      workoutId,
      workoutName: workout.name,
      date,
      completed: false,
      exercises: active.map((e) => ({
        exerciseId: e._id,
        name: e.name,
        sets: e.sets,
        weights: e.weights,
        reps: emptyReps(e.weights, e.sets),
      })),
    });
  },
});

export const updateReps = mutation({
  args: {
    id: v.id("sessions"),
    exerciseIndex: v.number(),
    weightIndex: v.number(),
    setIndex: v.number(),
    reps: v.number(),
  },
  handler: async (ctx, { id, exerciseIndex, weightIndex, setIndex, reps }) => {
    const session = await ctx.db.get(id);
    if (!session) return;
    const next = session.exercises.map((e, i) =>
      i !== exerciseIndex
        ? e
        : {
            ...e,
            reps: e.reps.map((row, wi) =>
              wi !== weightIndex
                ? row
                : row.map((r, si) => (si !== setIndex ? r : Math.max(0, reps))),
            ),
          },
    );
    await ctx.db.patch(id, { exercises: next });
  },
});

export const setExercises = mutation({
  args: {
    id: v.id("sessions"),
    exercises: v.array(exerciseSnapshot),
  },
  handler: async (ctx, { id, exercises }) => {
    await ctx.db.patch(id, { exercises });
  },
});

export const complete = mutation({
  args: { id: v.id("sessions"), completed: v.boolean() },
  handler: async (ctx, { id, completed }) => {
    await ctx.db.patch(id, {
      completed,
      completedAt: completed ? Date.now() : undefined,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("sessions") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
