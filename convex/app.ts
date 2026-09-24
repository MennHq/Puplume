import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserAppData = query({
  args: { 
    puppyId: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || args.userId;
    if (!userId) {
      return null;
    }

    // 1. User profile
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", userId))
      .first();

    // 2. Puppies
    const puppies = await ctx.db
      .query("puppies")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 3. User settings
    const settings = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    // 4. Tasks
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 5. Potty logs
    const pottyLogs = await ctx.db
      .query("pottyLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // 6. Feeding logs
    const feedingLogs = await ctx.db
      .query("feedingLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // 7. Sleep logs
    const sleepLogs = await ctx.db
      .query("sleepLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // 8. Walk logs
    const walkLogs = await ctx.db
      .query("walkLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // 9. Vaccinations
    const vaccinations = await ctx.db
      .query("vaccinations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 10. Medications
    const medications = await ctx.db
      .query("medications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 11. Appointments
    const appointments = await ctx.db
      .query("appointments")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 12. Expenses
    const expenses = await ctx.db
      .query("expenses")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 13. Documents
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 14. Behavior Logs
    const behaviorLogs = await ctx.db
      .query("behaviorLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // 15. Grooming Tasks
    const groomingTasks = await ctx.db
      .query("groomingTasks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 16. Socialization
    const socialization = await ctx.db
      .query("socialization")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 17. Journal Entries
    const journalEntries = await ctx.db
      .query("journalEntries")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 18. Training lessons
    const trainingLessons = await ctx.db
      .query("trainingLessons")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 19. Notifications
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // 20. AI Messages
    const aiMessages = await ctx.db
      .query("aiMessages")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // 21. Family Members
    const familyMembers = await ctx.db
      .query("familyMembers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return {
      userId,
      user,
      puppies,
      settings,
      tasks,
      pottyLogs,
      feedingLogs,
      sleepLogs,
      walkLogs,
      vaccinations,
      medications,
      appointments,
      expenses,
      documents,
      behaviorLogs,
      groomingTasks,
      socialization,
      journalEntries,
      trainingLessons,
      notifications,
      aiMessages,
      familyMembers,
    };
  },
});

export const seedStarterData = mutation({
  args: {
    userId: v.optional(v.string()),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || args.userId;
    if (!userId) throw new Error("User identifier required to initialize database documents");

    // 1. Ensure user record exists
    let existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", userId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        clerkId: userId,
        email: identity?.email || args.email,
        name: identity?.name || args.name || "Pet Parent",
        avatarUrl: args.avatarUrl,
        createdAt: new Date().toISOString(),
      });
    }

    // 2. Ensure User Settings document exists without fake puppy
    const existingSettings = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!existingSettings) {
      await ctx.db.insert("userSettings", {
        userId,
        pottyAlerts: true,
        feedingAlerts: true,
        trainingAlerts: true,
        medAlerts: true,
        units: "imperial",
        updatedAt: new Date().toISOString(),
      });
    }

    return { seeded: false, userId };
  },
});

export const completeAIOnboarding = mutation({
  args: {
    userId: v.optional(v.string()),
    puppy: v.object({
      name: v.string(),
      breed: v.string(),
      birthDate: v.string(),
      sex: v.string(),
      weightLbs: v.number(),
      photoUrl: v.string(),
      temperament: v.optional(v.string()),
      dietaryRestrictions: v.optional(v.string()),
      favoriteTreat: v.optional(v.string()),
    }),
    tasks: v.array(
      v.object({
        title: v.string(),
        category: v.string(),
        time: v.string(),
        durationMin: v.number(),
        period: v.string(),
        description: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || args.userId;
    if (!userId) throw new Error("Authentication or userId required");

    // Clear any previous placeholder puppies & tasks for a fresh start
    const oldPuppies = await ctx.db
      .query("puppies")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    for (const p of oldPuppies) {
      await ctx.db.delete(p._id);
    }

    const oldTasks = await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    for (const t of oldTasks) {
      await ctx.db.delete(t._id);
    }

    // Insert user's real puppy
    const newPupId = await ctx.db.insert("puppies", {
      userId,
      name: args.puppy.name,
      breed: args.puppy.breed,
      birthDate: args.puppy.birthDate,
      sex: args.puppy.sex,
      weightLbs: args.puppy.weightLbs,
      photoUrl: args.puppy.photoUrl,
      temperament: args.puppy.temperament || "Friendly and playful",
      dietaryRestrictions: args.puppy.dietaryRestrictions,
      favoriteTreat: args.puppy.favoriteTreat,
      createdAt: new Date().toISOString(),
    });

    // Update settings with active puppy ID and mark onboarding completed
    const settings = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    if (settings) {
      await ctx.db.patch(settings._id, {
        activePuppyId: newPupId,
        hasCompletedOnboarding: true,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await ctx.db.insert("userSettings", {
        userId,
        pottyAlerts: true,
        feedingAlerts: true,
        trainingAlerts: true,
        medAlerts: true,
        units: "imperial",
        activePuppyId: newPupId,
        hasCompletedOnboarding: true,
        updatedAt: new Date().toISOString(),
      });
    }

    // Insert user's real customized tasks
    const today = new Date().toISOString().split("T")[0];
    const createdTaskIds: string[] = [];
    for (const t of args.tasks) {
      const taskId = await ctx.db.insert("tasks", {
        puppyId: newPupId,
        userId,
        title: t.title,
        category: t.category,
        time: t.time,
        durationMin: t.durationMin,
        completed: false,
        skipped: false,
        period: t.period,
        date: today,
        description: t.description,
      });
      createdTaskIds.push(taskId);
    }

    return {
      success: true,
      puppyId: newPupId,
      taskCount: createdTaskIds.length,
    };
  },
});

export const clearUserData = mutation({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || args.userId;
    if (!userId) throw new Error("Authentication or userId required");

    const tables = [
      "puppies",
      "tasks",
      "pottyLogs",
      "feedingLogs",
      "sleepLogs",
      "walkLogs",
      "vaccinations",
      "medications",
      "appointments",
      "expenses",
      "documents",
      "behaviorLogs",
      "socialization",
      "journalEntries",
    ] as const;

    for (const table of tables) {
      const records = await ctx.db
        .query(table)
        .withIndex("by_user", (q: any) => q.eq("userId", userId))
        .collect();
      for (const rec of records) {
        await ctx.db.delete(rec._id);
      }
    }

    return { success: true };
  },
});
