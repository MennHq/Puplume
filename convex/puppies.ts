import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getPuppies = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("puppies")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const getPuppy = query({
  args: { id: v.optional(v.id("puppies")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    if (args.id) {
      const puppy = await ctx.db.get(args.id);
      if (puppy && puppy.userId === identity.subject) return puppy;
      return null;
    }

    return await ctx.db
      .query("puppies")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .first();
  },
});

export const createPuppy = mutation({
  args: {
    name: v.string(),
    breed: v.string(),
    birthDate: v.string(),
    sex: v.string(),
    weightLbs: v.number(),
    photoUrl: v.string(),
    temperament: v.string(),
    dietaryRestrictions: v.optional(v.string()),
    microchipNumber: v.optional(v.string()),
    allergies: v.optional(v.string()),
    vetClinic: v.optional(v.string()),
    vetPhone: v.optional(v.string()),
    vetName: v.optional(v.string()),
    insuranceProvider: v.optional(v.string()),
    favoriteTreat: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required: Please sign in with Clerk to add a puppy.");
    }

    return await ctx.db.insert("puppies", {
      ...args,
      userId: identity.subject,
      createdAt: new Date().toISOString(),
    });
  },
});

export const updatePuppy = mutation({
  args: {
    id: v.id("puppies"),
    name: v.optional(v.string()),
    breed: v.optional(v.string()),
    birthDate: v.optional(v.string()),
    sex: v.optional(v.string()),
    weightLbs: v.optional(v.number()),
    photoUrl: v.optional(v.string()),
    temperament: v.optional(v.string()),
    dietaryRestrictions: v.optional(v.string()),
    microchipNumber: v.optional(v.string()),
    allergies: v.optional(v.string()),
    vetClinic: v.optional(v.string()),
    vetPhone: v.optional(v.string()),
    vetName: v.optional(v.string()),
    insuranceProvider: v.optional(v.string()),
    favoriteTreat: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required");
    }

    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing || existing.userId !== identity.subject) {
      throw new Error("Puppy not found or unauthorized");
    }

    await ctx.db.patch(id, updates);
    return id;
  },
});

export const savePuppy = mutation({
  args: {
    id: v.optional(v.string()),
    name: v.string(),
    breed: v.string(),
    birthDate: v.string(),
    sex: v.string(),
    weightLbs: v.number(),
    photoUrl: v.string(),
    temperament: v.string(),
    dietaryRestrictions: v.optional(v.string()),
    microchipNumber: v.optional(v.string()),
    allergies: v.optional(v.string()),
    vetClinic: v.optional(v.string()),
    vetPhone: v.optional(v.string()),
    vetName: v.optional(v.string()),
    insuranceProvider: v.optional(v.string()),
    insurancePolicyNumber: v.optional(v.string()),
    favoriteTreat: v.optional(v.string()),
    adoptionDate: v.optional(v.string()),
    createdAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required");
    }

    // Try finding existing puppy by ID first, then by name
    let existing = null;
    if (args.id) {
      const normId = ctx.db.normalizeId("puppies", args.id);
      if (normId) {
        const p = await ctx.db.get(normId);
        if (p && p.userId === identity.subject) {
          existing = p;
        }
      }
    }

    if (!existing) {
      existing = await ctx.db
        .query("puppies")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .filter((q) => q.eq(q.field("name"), args.name))
        .first();
    }

    const data = {
      userId: identity.subject,
      name: args.name,
      breed: args.breed,
      birthDate: args.birthDate,
      sex: args.sex,
      weightLbs: args.weightLbs,
      photoUrl: args.photoUrl,
      temperament: args.temperament,
      dietaryRestrictions: args.dietaryRestrictions,
      microchipNumber: args.microchipNumber,
      allergies: args.allergies,
      vetClinic: args.vetClinic,
      vetPhone: args.vetPhone,
      vetName: args.vetName,
      insuranceProvider: args.insuranceProvider,
      insurancePolicyNumber: args.insurancePolicyNumber,
      favoriteTreat: args.favoriteTreat,
      adoptionDate: args.adoptionDate,
      createdAt: args.createdAt || new Date().toISOString(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    }

    return await ctx.db.insert("puppies", data);
  },
});

export const deletePuppy = mutation({

  args: { id: v.id("puppies") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required");
    }

    const existing = await ctx.db.get(args.id);
    if (!existing || existing.userId !== identity.subject) {
      throw new Error("Puppy not found or unauthorized");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
