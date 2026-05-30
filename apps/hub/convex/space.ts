import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// "Space" is a single shared plain-text canvas, so list returns every text.
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("spaceTexts").collect();
  },
});

export const create = mutation({
  args: {
    x: v.number(),
    y: v.number(),
    text: v.string(),
    fontSize: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("spaceTexts", args);
  },
});

// One patch covers all three interactions: move (x/y), resize (fontSize),
// and edit (text). Only the provided fields are written.
export const update = mutation({
  args: {
    id: v.id("spaceTexts"),
    x: v.optional(v.number()),
    y: v.optional(v.number()),
    text: v.optional(v.string()),
    fontSize: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await ctx.db.patch(id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("spaceTexts") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
