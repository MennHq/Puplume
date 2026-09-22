import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listFeedingLogs = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("feedingLogs")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

export const addFeedingLog = mutation({
  args: {
    puppyId: v.string(),
    mealType: v.string(),
    amountCups: v.optional(v.number()),
    foodBrand: v.optional(v.string()),
    timestamp: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("feedingLogs", {
      ...args,
      userId: identity.subject,
    });
  },
});
