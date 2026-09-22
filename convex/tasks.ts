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

    let q = ctx.db
      .query("tasks")
      .withIndex("by_user", (idx) => idx.eq("userId", identity.subject));

    const tasks = await q.collect();
    return tasks.filter((t) => {
      if (t.puppyId !== args.puppyId && t.puppyId !== "pup-max-01") {
        // match specific puppy or fallback
      }
      if (args.date && t.date !== args.date) return false;
      return true;
    });
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
    id: v.optional(v.id("tasks")),
    title: v.optional(v.string()),
    puppyId: v.optional(v.string()),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    let task = null;
    if (args.id) {
      task = await ctx.db.get(args.id);
    } else if (args.title) {
      task = await ctx.db
        .query("tasks")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .filter((q) => q.eq(q.field("title"), args.title))
        .first();
    }

    if (!task || task.userId !== identity.subject) {
      return null;
    }

    await ctx.db.patch(task._id, {
      completed: args.completed,
      skipped: false,
      completedAt: args.completed ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
    });
    return task._id;
  },
});

export const skipTask = mutation({
  args: {
    id: v.optional(v.id("tasks")),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    let task = null;
    if (args.id) {
      task = await ctx.db.get(args.id);
    } else if (args.title) {
      task = await ctx.db
        .query("tasks")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .filter((q) => q.eq(q.field("title"), args.title))
        .first();
    }

    if (!task || task.userId !== identity.subject) {
      return null;
    }

    await ctx.db.patch(task._id, {
      skipped: true,
      completed: false,
    });
    return task._id;
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

