import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listSocialization = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("socialization")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const updateSocializationStatus = mutation({
  args: {
    puppyId: v.string(),
    category: v.string(),
    title: v.string(),
    description: v.string(),
    status: v.string(),
    notes: v.optional(v.string()),
    lastUpdated: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const existing = await ctx.db
      .query("socialization")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("title"), args.title)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        status: args.status,
        notes: args.notes,
        lastUpdated: args.lastUpdated,
      });
      return existing._id;
    }

    return await ctx.db.insert("socialization", {
      ...args,
      userId: identity.subject,
    });
  },
});
