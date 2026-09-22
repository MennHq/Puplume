import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listSleepLogs = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("sleepLogs")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

export const addSleepLog = mutation({
  args: {
    puppyId: v.string(),
    type: v.string(),
    startTime: v.string(),
    endTime: v.optional(v.string()),
    durationMin: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("sleepLogs", {
      ...args,
      userId: identity.subject,
    });
  },
});
