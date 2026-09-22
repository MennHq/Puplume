import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSettings = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .first();
  },
});

export const saveSettings = mutation({
  args: {
    pottyAlerts: v.boolean(),
    feedingAlerts: v.boolean(),
    trainingAlerts: v.boolean(),
    medAlerts: v.boolean(),
    units: v.string(),
    activePuppyId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized: Please sign in");

    const existing = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .first();

    const updatedAt = new Date().toISOString();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt,
      });
      return existing._id;
    }

    return await ctx.db.insert("userSettings", {
      ...args,
      userId: identity.subject,
      updatedAt,
    });
  },
});
