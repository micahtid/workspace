import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const scheduleValidator = v.union(
  v.literal("daysOfWeek"),
  v.literal("everyNDays"),
  v.literal("perWeek"),
);

export const list = query({
  args: { includeInactive: v.optional(v.boolean()) },
  handler: async (ctx, { includeInactive }) => {
    const habits = await ctx.db.query("habits").withIndex("by_order").collect();
    habits.sort((a, b) => a.order - b.order);
    if (includeInactive) return habits;
    return habits.filter((h) => h.active !== false);
  },
});

export const get = query({
  args: { id: v.id("habits") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const entriesFor = query({
  args: { habitId: v.id("habits") },
  handler: async (ctx, { habitId }) => {
    const entries = await ctx.db
      .query("habitEntries")
      .withIndex("by_habit", (q) => q.eq("habitId", habitId))
      .collect();
    return entries;
  },
});

export const allEntries = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("habitEntries").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    targetPerDay: v.number(),
    scheduleType: scheduleValidator,
    daysOfWeek: v.optional(v.array(v.number())),
    everyN: v.optional(v.number()),
    anchorDate: v.optional(v.string()),
    targetPerWeek: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("habits").collect();
    const maxOrder = existing.reduce((m, h) => Math.max(m, h.order), -1);
    return await ctx.db.insert("habits", {
      ...args,
      order: maxOrder + 1,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("habits"),
    title: v.optional(v.string()),
    targetPerDay: v.optional(v.number()),
    scheduleType: v.optional(scheduleValidator),
    daysOfWeek: v.optional(v.array(v.number())),
    everyN: v.optional(v.number()),
    anchorDate: v.optional(v.string()),
    targetPerWeek: v.optional(v.number()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...patch }) => {
    // For schema mode changes (e.g. daysOfWeek → perWeek), null out fields
    // that don't apply to the new mode so we don't carry stale data.
    if (patch.scheduleType === "daysOfWeek") {
      patch.everyN = undefined;
      patch.anchorDate = undefined;
      patch.targetPerWeek = undefined;
    } else if (patch.scheduleType === "everyNDays") {
      patch.daysOfWeek = undefined;
      patch.targetPerWeek = undefined;
    } else if (patch.scheduleType === "perWeek") {
      patch.daysOfWeek = undefined;
      patch.everyN = undefined;
      patch.anchorDate = undefined;
    }
    await ctx.db.patch(id, patch);
  },
});

export const setActive = mutation({
  args: { id: v.id("habits"), active: v.boolean() },
  handler: async (ctx, { id, active }) => {
    await ctx.db.patch(id, { active });
  },
});

export const move = mutation({
  args: {
    id: v.id("habits"),
    direction: v.union(v.literal("up"), v.literal("down")),
  },
  handler: async (ctx, { id, direction }) => {
    const habits = await ctx.db.query("habits").withIndex("by_order").collect();
    habits.sort((a, b) => a.order - b.order);
    const idx = habits.findIndex((h) => h._id === id);
    if (idx === -1) return;
    const neighbor = direction === "up" ? habits[idx - 1] : habits[idx + 1];
    if (!neighbor) return;
    const current = habits[idx];
    await ctx.db.patch(current._id, { order: neighbor.order });
    await ctx.db.patch(neighbor._id, { order: current.order });
  },
});

export const remove = mutation({
  args: { id: v.id("habits") },
  handler: async (ctx, { id }) => {
    const entries = await ctx.db
      .query("habitEntries")
      .withIndex("by_habit", (q) => q.eq("habitId", id))
      .collect();
    await Promise.all(entries.map((e) => ctx.db.delete(e._id)));
    await ctx.db.delete(id);
  },
});

export const setCount = mutation({
  args: {
    habitId: v.id("habits"),
    date: v.string(),
    count: v.number(),
  },
  handler: async (ctx, { habitId, date, count }) => {
    const existing = await ctx.db
      .query("habitEntries")
      .withIndex("by_habit_date", (q) => q.eq("habitId", habitId).eq("date", date))
      .first();
    if (existing) {
      if (count <= 0) {
        await ctx.db.delete(existing._id);
      } else {
        await ctx.db.patch(existing._id, { count });
      }
    } else if (count > 0) {
      await ctx.db.insert("habitEntries", { habitId, date, count });
    }
  },
});

export const increment = mutation({
  args: { habitId: v.id("habits"), date: v.string(), delta: v.number() },
  handler: async (ctx, { habitId, date, delta }) => {
    const existing = await ctx.db
      .query("habitEntries")
      .withIndex("by_habit_date", (q) => q.eq("habitId", habitId).eq("date", date))
      .first();
    const next = (existing?.count ?? 0) + delta;
    if (existing) {
      if (next <= 0) {
        await ctx.db.delete(existing._id);
      } else {
        await ctx.db.patch(existing._id, { count: next });
      }
    } else if (next > 0) {
      await ctx.db.insert("habitEntries", { habitId, date, count: next });
    }
  },
});
