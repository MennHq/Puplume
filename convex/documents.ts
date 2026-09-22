import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listDocuments = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("documents")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const addDocument = mutation({
  args: {
    puppyId: v.string(),
    title: v.string(),
    category: v.string(),
    date: v.string(),
    fileType: v.string(),
    fileSize: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("documents", {
      ...args,
      userId: identity.subject,
    });
  },
});

export const deleteDocument = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const normId = ctx.db.normalizeId("documents", args.id);
    if (normId) {
      const doc = await ctx.db.get(normId);
      if (doc && doc.userId === identity.subject) {
        await ctx.db.delete(normId);
        return normId;
      }
    }

    const doc = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("title"), args.id))
      .first();
    if (doc) {
      await ctx.db.delete(doc._id);
      return doc._id;
    }
    return null;
  },
});
