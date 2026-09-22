import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTrainingLessons = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("trainingLessons")
      .withIndex("by_puppy", (q) => q.eq("puppyId", args.puppyId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const updateLessonStatus = mutation({
  args: {
    puppyId: v.string(),
    lessonId: v.string(),
    completed: v.boolean(),
    mastered: v.boolean(),
    lastPracticed: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const existing = await ctx.db
      .query("trainingLessons")
      .withIndex("by_puppy_lesson", (q) =>
        q.eq("puppyId", args.puppyId).eq("lessonId", args.lessonId)
      )
      .first();

    if (existing && existing.userId === identity.subject) {
      await ctx.db.patch(existing._id, {
        completed: args.completed,
        mastered: args.mastered,
        lastPracticed: args.lastPracticed || new Date().toISOString().split("T")[0],
      });
      return existing._id;
    }

    return await ctx.db.insert("trainingLessons", {
      puppyId: args.puppyId,
      userId: identity.subject,
      lessonId: args.lessonId,
      completed: args.completed,
      mastered: args.mastered,
      lastPracticed: args.lastPracticed || new Date().toISOString().split("T")[0],
    });
  },
});
