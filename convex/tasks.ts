import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listTasks = query({
  args: { 
    puppyId: v.string(), 
    date: v.optional(v.string()) 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    if (args.date) {
      return await ctx.db
        .query("tasks")
        .withIndex("by_puppy", (idx) => idx.eq("puppyId", args.puppyId))
        .filter((q) => q.eq(q.field("date"), args.date))
        .collect();
    }

    return await ctx.db
      .query("tasks")
      .withIndex("by_puppy", (idx) => idx.eq("puppyId", args.puppyId))
      .collect();
  },
});

export const createTask = mutation({
  args: {
    puppyId: v.string(),
    title: v.string(),
    category: v.string(),
    time: v.string(),
    durationMin: v.number(),
    period: v.string(),
    date: v.string(),
    description: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    return await ctx.db.insert("tasks", {
      ...args,
      userId: identity.subject,
      completed: false,
      skipped: false,
    });
  },
});

export const toggleTask = mutation({
  args: { 
    id: v.id("tasks"), 
    completed: v.boolean() 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or unauthorized");
    }

    await ctx.db.patch(args.id, {
      completed: args.completed,
      skipped: false,
      completedAt: args.completed ? new Date().toISOString() : undefined,
    });
    return args.id;
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or unauthorized");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
