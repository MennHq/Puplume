import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAIMessages = query({
  args: { 
    puppyId: v.string(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || args.userId;
    if (!userId) return [];

    return await ctx.db
      .query("aiMessages")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const addAIMessage = mutation({
  args: {
    puppyId: v.string(),
    userId: v.optional(v.string()),
    sender: v.string(),
    text: v.string(),
    timestamp: v.string(),
    suggestedActions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || args.userId;
    if (!userId) throw new Error("Authentication or userId required");

    const { userId: _, ...data } = args;

    return await ctx.db.insert("aiMessages", {
      ...data,
      userId,
    });
  },
});

export const saveAIMessages = mutation({
  args: {
    puppyId: v.string(),
    userId: v.optional(v.string()),
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
    const userId = identity?.subject || args.userId;
    if (!userId) throw new Error("Authentication or userId required");

    // Remove existing
    const existing = await ctx.db
      .query("aiMessages")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    for (const m of existing) {
      await ctx.db.delete(m._id);
    }

    // Insert new
    for (const msg of args.messages) {
      await ctx.db.insert("aiMessages", {
        puppyId: args.puppyId,
        userId,
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp,
        suggestedActions: msg.suggestedActions,
      });
    }

    return true;
  },
});
