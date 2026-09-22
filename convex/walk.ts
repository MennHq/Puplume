import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listWalkLogs = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("walkLogs")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

export const addWalkLog = mutation({
  args: {
    puppyId: v.string(),
    startTime: v.optional(v.string()),
    durationMin: v.number(),
    distanceMiles: v.optional(v.number()),
    peesCount: v.optional(v.number()),
    poopsCount: v.optional(v.number()),
    pullingRating: v.optional(v.string()),
    reactivityNotes: v.optional(v.string()),
    timestamp: v.optional(v.string()),
    route: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("walkLogs", {
      ...args,
      userId: identity.subject,
    });
  },
});
