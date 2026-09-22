import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listNotifications = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
  },
});

export const addNotification = mutation({
  args: {
    title: v.string(),
    message: v.string(),
    category: v.string(),
    timestamp: v.string(),
    actionUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("notifications", {
      ...args,
      userId: identity.subject,
      read: false,
    });
  },
});

export const markNotificationRead = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const normId = ctx.db.normalizeId("notifications", args.id);
    if (normId) {
      const item = await ctx.db.get(normId);
      if (item && item.userId === identity.subject) {
        await ctx.db.patch(normId, { read: true });
        return;
      }
    }

    const item = await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("read"), false))
      .first();
    if (item) {
      await ctx.db.patch(item._id, { read: true });
    }
  },
});

export const markAllNotificationsRead = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("read"), false))
      .collect();

    for (const item of unread) {
      await ctx.db.patch(item._id, { read: true });
    }
  },
});
