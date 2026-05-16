import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workouts: defineTable({
    name: v.string(),
    // Days of week this workout is assigned to (0 = Sunday … 6 = Saturday).
    days: v.array(v.number()),
    order: v.number(),
  }).index("by_order", ["order"]),

  exercises: defineTable({
    workoutId: v.id("workouts"),
    name: v.string(),
    sets: v.number(),
    // Multiple weight options per exercise (matches the original workout.json shape).
    weights: v.array(v.number()),
    active: v.boolean(),
    order: v.number(),
  })
    .index("by_workout", ["workoutId"])
    .index("by_workout_order", ["workoutId", "order"]),

  habits: defineTable({
    title: v.string(),
    // Target completions per active day.
    targetPerDay: v.number(),
    // Schedule type drives which fields below are used.
    scheduleType: v.union(
      v.literal("daysOfWeek"),
      v.literal("everyNDays"),
      v.literal("perWeek"),
    ),
    // For "daysOfWeek": 0 = Sunday … 6 = Saturday.
    daysOfWeek: v.optional(v.array(v.number())),
    // For "everyNDays": cadence + anchor date (YYYY-MM-DD local).
    everyN: v.optional(v.number()),
    anchorDate: v.optional(v.string()),
    // For "perWeek": target completions per ISO week, no specific days.
    targetPerWeek: v.optional(v.number()),
    // Disabled habits are hidden from the daily list but preserved with history.
    active: v.optional(v.boolean()),
    order: v.number(),
  }).index("by_order", ["order"]),

  habitEntries: defineTable({
    habitId: v.id("habits"),
    // Local date string YYYY-MM-DD.
    date: v.string(),
    count: v.number(),
  })
    .index("by_habit_date", ["habitId", "date"])
    .index("by_habit", ["habitId"]),

  // A single execution of a workout on a given day.
  // exercises holds a snapshot so future edits to the template don't rewrite history.
  sessions: defineTable({
    workoutId: v.id("workouts"),
    workoutName: v.string(),
    date: v.string(), // YYYY-MM-DD local
    completed: v.boolean(),
    completedAt: v.optional(v.number()),
    exercises: v.array(
      v.object({
        exerciseId: v.optional(v.id("exercises")),
        name: v.string(),
        sets: v.number(),
        weights: v.array(v.number()),
        // reps[weightIndex][setIndex] — 0 when not yet entered.
        reps: v.array(v.array(v.number())),
      }),
    ),
  })
    .index("by_date", ["date"])
    .index("by_workout_date", ["workoutId", "date"])
    .index("by_workout", ["workoutId"]),
});
