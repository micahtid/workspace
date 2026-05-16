import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const workouts = await ctx.db.query("workouts").withIndex("by_order").collect();
    workouts.sort((a, b) => a.order - b.order);
    const withExercises = await Promise.all(
      workouts.map(async (w) => {
        const exercises = await ctx.db
          .query("exercises")
          .withIndex("by_workout_order", (q) => q.eq("workoutId", w._id))
          .collect();
        exercises.sort((a, b) => a.order - b.order);
        return { ...w, exercises };
      }),
    );
    return withExercises;
  },
});

export const get = query({
  args: { id: v.id("workouts") },
  handler: async (ctx, { id }) => {
    const workout = await ctx.db.get(id);
    if (!workout) return null;
    const exercises = await ctx.db
      .query("exercises")
      .withIndex("by_workout_order", (q) => q.eq("workoutId", id))
      .collect();
    exercises.sort((a, b) => a.order - b.order);
    return { ...workout, exercises };
  },
});

export const create = mutation({
  args: { name: v.string(), days: v.array(v.number()) },
  handler: async (ctx, { name, days }) => {
    const existing = await ctx.db.query("workouts").collect();
    const maxOrder = existing.reduce((m, w) => Math.max(m, w.order), -1);
    return await ctx.db.insert("workouts", {
      name,
      days,
      order: maxOrder + 1,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("workouts"),
    name: v.optional(v.string()),
    days: v.optional(v.array(v.number())),
  },
  handler: async (ctx, { id, ...patch }) => {
    const clean: Record<string, unknown> = {};
    if (patch.name !== undefined) clean.name = patch.name;
    if (patch.days !== undefined) clean.days = patch.days;
    await ctx.db.patch(id, clean);
  },
});

export const remove = mutation({
  args: { id: v.id("workouts") },
  handler: async (ctx, { id }) => {
    const exercises = await ctx.db
      .query("exercises")
      .withIndex("by_workout", (q) => q.eq("workoutId", id))
      .collect();
    await Promise.all(exercises.map((e) => ctx.db.delete(e._id)));
    await ctx.db.delete(id);
  },
});

export const addExercise = mutation({
  args: {
    workoutId: v.id("workouts"),
    name: v.string(),
    sets: v.number(),
    weights: v.array(v.number()),
  },
  handler: async (ctx, { workoutId, name, sets, weights }) => {
    const existing = await ctx.db
      .query("exercises")
      .withIndex("by_workout", (q) => q.eq("workoutId", workoutId))
      .collect();
    const maxOrder = existing.reduce((m, e) => Math.max(m, e.order), -1);
    return await ctx.db.insert("exercises", {
      workoutId,
      name,
      sets,
      weights,
      active: true,
      order: maxOrder + 1,
    });
  },
});

export const updateExercise = mutation({
  args: {
    id: v.id("exercises"),
    name: v.optional(v.string()),
    sets: v.optional(v.number()),
    weights: v.optional(v.array(v.number())),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...patch }) => {
    const clean: Record<string, unknown> = {};
    if (patch.name !== undefined) clean.name = patch.name;
    if (patch.sets !== undefined) clean.sets = patch.sets;
    if (patch.weights !== undefined) clean.weights = patch.weights;
    if (patch.active !== undefined) clean.active = patch.active;
    await ctx.db.patch(id, clean);
  },
});

export const removeExercise = mutation({
  args: { id: v.id("exercises") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
