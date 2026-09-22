import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listPottyLogs = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("pottyLogs")
      .withIndex("by_puppy", (idx) => idx.eq("puppyId", args.puppyId))
      .order("desc")
      .collect();
  },
});

export const addPottyLog = mutation({
  args: {
    puppyId: v.string(),
    type: v.string(),
    location: v.string(),
    timestamp: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    return await ctx.db.insert("pottyLogs", {
      ...args,
      userId: identity.subject,
    });
  },
});

export const deletePottyLog = mutation({
  args: { id: v.id("pottyLogs") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    const log = await ctx.db.get(args.id);
    if (!log || log.userId !== identity.subject) {
      throw new Error("Log not found or unauthorized");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
