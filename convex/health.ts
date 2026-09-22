import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Vaccinations
export const listVaccinations = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("vaccinations")
      .withIndex("by_puppy", (idx) => idx.eq("puppyId", args.puppyId))
      .collect();
  },
});

export const addVaccination = mutation({
  args: {
    puppyId: v.string(),
    name: v.string(),
    status: v.string(),
    administeredDate: v.optional(v.string()),
    dueDate: v.string(),
    isCore: v.boolean(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    return await ctx.db.insert("vaccinations", {
      ...args,
      userId: identity.subject,
    });
  },
});

// Medications
export const listMedications = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("medications")
      .withIndex("by_puppy", (idx) => idx.eq("puppyId", args.puppyId))
      .collect();
  },
});

export const addMedication = mutation({
  args: {
    puppyId: v.string(),
    name: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    startDate: v.string(),
    reminderTime: v.optional(v.string()),
    active: v.boolean(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    return await ctx.db.insert("medications", {
      ...args,
      userId: identity.subject,
    });
  },
});

// Vet Appointments
export const listAppointments = query({
  args: { puppyId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("appointments")
      .withIndex("by_puppy", (idx) => idx.eq("puppyId", args.puppyId))
      .collect();
  },
});

export const addAppointment = mutation({
  args: {
    puppyId: v.string(),
    title: v.string(),
    clinic: v.string(),
    date: v.string(),
    time: v.string(),
    reason: v.string(),
    status: v.string(),
    doctor: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    return await ctx.db.insert("appointments", {
      ...args,
      userId: identity.subject,
    });
  },
});
