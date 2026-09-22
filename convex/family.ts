import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listFamilyMembers = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("familyMembers")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const addFamilyMember = mutation({
  args: {
    puppyId: v.optional(v.string()),
    name: v.string(),
    email: v.string(),
    role: v.string(),
    avatarUrl: v.optional(v.string()),
    dateAdded: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("familyMembers", {
      ...args,
      userId: identity.subject,
    });
  },
});

export const deleteFamilyMember = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const normId = ctx.db.normalizeId("familyMembers", args.id);
    if (normId) {
      const member = await ctx.db.get(normId);
      if (member && member.userId === identity.subject) {
        await ctx.db.delete(normId);
        return normId;
      }
    }

    const member = await ctx.db
      .query("familyMembers")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("email"), args.id))
      .first();
    if (member) {
      await ctx.db.delete(member._id);
      return member._id;
    }
    return null;
  },
});
