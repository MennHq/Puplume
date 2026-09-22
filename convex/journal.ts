import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listJournalEntries = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("journalEntries")
      .withIndex("by_puppy", (idx) => idx.eq("puppyId", args.puppyId))
      .collect();
  },
});

export const addJournalEntry = mutation({
  args: {
    puppyId: v.string(),
    title: v.string(),
    date: v.string(),
    notes: v.string(),
    mediaUrl: v.optional(v.string()),
    milestoneBadge: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    return await ctx.db.insert("journalEntries", {
      ...args,
      userId: identity.subject,
    });
  },
});
