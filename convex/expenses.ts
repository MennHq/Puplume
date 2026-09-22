import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listExpenses = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("expenses")
      .withIndex("by_puppy", (idx) => idx.eq("puppyId", args.puppyId))
      .collect();
  },
});

export const addExpense = mutation({
  args: {
    puppyId: v.string(),
    title: v.string(),
    category: v.string(),
    amount: v.number(),
    date: v.string(),
    vendor: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    return await ctx.db.insert("expenses", {
      ...args,
      userId: identity.subject,
    });
  },
});
