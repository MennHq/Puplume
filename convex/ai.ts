import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAIMessages = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("aiMessages")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const addAIMessage = mutation({
  args: {
    puppyId: v.string(),
    sender: v.string(),
    text: v.string(),
    timestamp: v.string(),
    suggestedActions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("aiMessages", {
      ...args,
      userId: identity.subject,
    });
  },
});

export const saveAIMessages = mutation({
  args: {
    puppyId: v.string(),
    messages: v.array(
      v.object({
        sender: v.string(),
        text: v.string(),
        timestamp: v.string(),
        suggestedActions: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Remove existing
    const existing = await ctx.db
      .query("aiMessages")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    for (const m of existing) {
      await ctx.db.delete(m._id);
    }

    // Insert new
    for (const m of args.messages) {
      await ctx.db.insert("aiMessages", {
        puppyId: args.puppyId,
        userId: identity.subject,
        sender: m.sender,
        text: m.text,
        timestamp: m.timestamp,
        suggestedActions: m.suggestedActions,
      });
    }

    return true;
  },
});
