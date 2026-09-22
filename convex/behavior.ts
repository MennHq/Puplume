import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listBehaviorLogs = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("behaviorLogs")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

export const addBehaviorLog = mutation({
  args: {
    puppyId: v.string(),
    behaviorType: v.string(),
    timestamp: v.string(),
    severity: v.string(),
    trigger: v.optional(v.string()),
    whatHelped: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("behaviorLogs", {
      ...args,
      userId: identity.subject,
    });
  },
});
