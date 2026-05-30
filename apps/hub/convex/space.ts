import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

export const update = mutation({
    args: {
        id: v.id("spaceTexts"),
        x: v.optional(v.number()),
        y: v.optional(v.number()),
        text: v.optional(v.string()),
        fontSize: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...patch } = args;
        await ctx.db.patch(id, patch);
    },
});

export const remove = mutation({
    args: {
        id: v.id("spaceTexts"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
