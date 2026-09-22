import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserAppData = query({
  args: { puppyId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const userId = identity.subject;

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
    force: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    // Check if user already has puppies in Convex
    const existingPuppies = await ctx.db
      .query("puppies")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    if (existingPuppies.length > 0 && !args.force) {
      return { seeded: false, reason: "Account already has cloud data" };
    }

    // 1. Seed user profile if missing
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", userId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        clerkId: userId,
        email: identity.email,
        name: identity.name || "Pet Parent",
        createdAt: new Date().toISOString(),
      });
    }

    // 2. Insert Seed Puppy Max
    const puppyId = await ctx.db.insert("puppies", {
      userId,
      name: "Max",
      photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
      breed: "Golden Retriever",
      birthDate: "2026-06-15",
      sex: "male",
      weightLbs: 24.2,
      microchipNumber: "985141002341992",
      allergies: "None known",
      dietaryRestrictions: "Large breed puppy kibble with warm bone broth",
      temperament: "Gentle, curious, food-motivated, evening zoomies enthusiast",
      adoptionDate: "2026-08-10",
      vetName: "Dr. Eleanor Vance, DVM",
      vetPhone: "(555) 392-8819",
      vetClinic: "City Vet Animal Hospital",
      insuranceProvider: "Healthy Paws Pet Insurance",
      insurancePolicyNumber: "HP-99201-GLD",
      favoriteTreat: "Dehydrated beef liver & blueberries",
      createdAt: "2026-08-10T10:00:00.000Z",
    });

    const puppyIdStr = puppyId.toString();

    // 3. User Settings
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
        activePuppyId: puppyIdStr,
        updatedAt: new Date().toISOString(),
      });
    }

    // 4. Seed Schedule Tasks
    const today = new Date().toISOString().split("T")[0];
    const starterTasks = [
      { title: "Breakfast & Fresh Water", category: "feeding", time: "07:00 AM", durationMin: 15, completed: true, skipped: false, period: "morning", description: "1 cup puppy kibble + 2 tbsp warm bone broth", completedAt: "07:08 AM" },
      { title: "Post-Breakfast Potty Break", category: "potty", time: "07:15 AM", durationMin: 10, completed: true, skipped: false, period: "morning", description: "Target grass patch, repeat 'Go Potty' cue once", completedAt: "07:22 AM" },
      { title: "Morning Crate Nap", category: "sleep", time: "08:00 AM", durationMin: 90, completed: true, skipped: false, period: "morning", description: "Cover crate, white noise machine on low", completedAt: "09:35 AM" },
      { title: "Recall Training ('Rocket Come')", category: "training", time: "10:30 AM", durationMin: 5, completed: false, skipped: false, period: "morning", description: "High-value treats. 5 repetitions running backwards in hallway" },
      { title: "Backyard Sniff Walk & Exploration", category: "walk", time: "11:00 AM", durationMin: 15, completed: false, skipped: false, period: "morning", description: "Loose leash on front-clip harness, let puppy lead sniffing" },
      { title: "Lunch & Puzzle Toy Feeding", category: "feeding", time: "12:00 PM", durationMin: 20, completed: false, skipped: false, period: "afternoon", description: "0.75 cup kibble inside Bob-A-Lot wobble feeder" },
      { title: "Post-Lunch Potty", category: "potty", time: "12:30 PM", durationMin: 10, completed: false, skipped: false, period: "afternoon", description: "Designated outdoor spot" },
      { title: "Afternoon Deep Rest Nap", category: "sleep", time: "01:00 PM", durationMin: 120, completed: false, skipped: false, period: "afternoon", description: "Quiet time during house rest hours" },
      { title: "Evening Meal & Daily Vitamins", category: "feeding", time: "05:30 PM", durationMin: 15, completed: false, skipped: false, period: "evening", description: "1 cup kibble + Omega-3 puppy oil supplement" },
      { title: "Frozen Kong Teething Wind-Down", category: "custom", time: "07:00 PM", durationMin: 30, completed: false, skipped: false, period: "night", description: "Frozen Kong with peanut butter and pumpkin puree to soothe teething gums" },
    ];

    for (const t of starterTasks) {
      await ctx.db.insert("tasks", {
        ...t,
        puppyId: puppyIdStr,
        userId,
        date: today,
      });
    }

    // 5. Seed Potty logs
    const now = Date.now();
    await ctx.db.insert("pottyLogs", { puppyId: puppyIdStr, userId, type: "both", location: "outdoor", timestamp: new Date(now - 3.5 * 3600000).toISOString(), notes: "Pee and firm poop at grass patch, rewarded with liver treat" });
    await ctx.db.insert("pottyLogs", { puppyId: puppyIdStr, userId, type: "pee", location: "outdoor", timestamp: new Date(now - 1.5 * 3600000).toISOString(), notes: "Quick pee within 45 seconds of stepping outside" });

    // 6. Seed Vaccinations
    await ctx.db.insert("vaccinations", { puppyId: puppyIdStr, userId, name: "DHPP (Booster #1)", vaccineName: "DHPP #1", administeredDate: "2026-07-25", dueDate: "2026-08-22", nextDueDate: "2026-08-22", vetClinic: "City Vet Animal Hospital", status: "up_to_date", lotNumber: "DHPP-7729B", isCore: true, notes: "Tolerated well." });
    await ctx.db.insert("vaccinations", { puppyId: puppyIdStr, userId, name: "DHPP Booster #2 & Bordetella", vaccineName: "DHPP Booster #2", administeredDate: "2026-08-22", dueDate: "2026-10-12", nextDueDate: "2026-10-12", vetClinic: "City Vet Animal Hospital", status: "up_to_date", lotNumber: "DHPP-9901A", isCore: true, notes: "Kennel cough intranasal spray completed." });
    await ctx.db.insert("vaccinations", { puppyId: puppyIdStr, userId, name: "Rabies 1-Year & Final DHPP #3 Booster", vaccineName: "Rabies 1-Year", administeredDate: undefined, dueDate: "2026-10-12", nextDueDate: "2026-10-12", vetClinic: "City Vet Animal Hospital", status: "due_soon", isCore: true, notes: "Scheduled for 16-week milestone clinic visit." });

    // 7. Seed Medications
    await ctx.db.insert("medications", { puppyId: puppyIdStr, userId, name: "Heartgard Plus (Heartworm Prevention)", dosage: "1 chewable tablet (up to 25 lbs)", frequency: "Monthly (1st of month)", startDate: "2026-08-01", reminderTime: "09:00 AM", active: true, notes: "Tastes like beef chew, Max eats it like a treat." });
    await ctx.db.insert("medications", { puppyId: puppyIdStr, userId, name: "NexGard (Flea & Tick Prevention)", dosage: "1 chewable tablet (10.1 - 24 lbs)", frequency: "Monthly (1st of month)", startDate: "2026-08-01", reminderTime: "09:00 AM", active: true, notes: "Next dose due October 1." });

    // 8. Seed Appointments
    await ctx.db.insert("appointments", { puppyId: puppyIdStr, userId, title: "Puppy 16-Week Booster & Rabies Exam", clinic: "City Vet Animal Hospital", date: "2026-10-12", time: "03:00 PM", reason: "Final DHPP booster, Rabies vaccine, dental check, microchip check", status: "scheduled", doctor: "Dr. Eleanor Vance", notes: "Bring stool sample in clean container for routine fecal test." });

    // 9. Seed Expenses
    await ctx.db.insert("expenses", { puppyId: puppyIdStr, userId, title: "12-Week Exam, DHPP #2 & Bordetella", category: "vet", amount: 145.0, date: "2026-08-22", vendor: "City Vet Animal Hospital", notes: "Vaccines and physical check" });
    await ctx.db.insert("expenses", { puppyId: puppyIdStr, userId, title: "Purina Pro Plan Large Puppy 30lb Bag", category: "food", amount: 72.99, date: "2026-09-02", vendor: "Chewy.com" });

    // 10. Seed Journal
    await ctx.db.insert("journalEntries", { puppyId: puppyIdStr, userId, title: "First Full Night Without Whining! 🎉", date: "2026-09-18", notes: "Max slept from 10:00 PM to 6:30 AM in his crate without a single whimper. Truly a golden milestone!", mediaUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80", milestoneBadge: "Sleep Champion" });

    // 11. Seed Notifications
    await ctx.db.insert("notifications", { userId, title: "Vaccination Due Next Month", message: "Max is due for Rabies and final DHPP booster on October 12 at 3:00 PM at City Vet.", category: "health", timestamp: "2 hours ago", read: false });
    await ctx.db.insert("notifications", { userId, title: "Training Reminder", message: "Time for 5-minute Recall Training with high-value treats!", category: "tasks", timestamp: "15 minutes ago", read: false });

    // 12. Seed AI message
    await ctx.db.insert("aiMessages", { puppyId: puppyIdStr, userId, sender: "assistant", text: "Hello! I'm PupLume, your AI puppy co-pilot. I'm actively tracking routines, training, potty rhythm, and health milestones. How can I help you today?", timestamp: "09:00 AM" });

    // 13. Seed Family Member
    await ctx.db.insert("familyMembers", {
      puppyId: puppyIdStr,
      userId,
      name: identity.name || "Pet Parent",
      email: identity.email || "owner@puplume.local",
      role: "owner",
      dateAdded: new Date().toISOString().split("T")[0],
    });

    // 14. Seed Training Lessons
    const defaultLessons = [
      { lessonId: "l1", completed: true, mastered: true, lastPracticed: "2026-09-20" },
      { lessonId: "l2", completed: true, mastered: false, lastPracticed: "2026-09-21" },
      { lessonId: "l3", completed: false, mastered: false },
      { lessonId: "l4", completed: false, mastered: false },
    ];
    for (const l of defaultLessons) {
      await ctx.db.insert("trainingLessons", {
        puppyId: puppyIdStr,
        userId,
        lessonId: l.lessonId,
        completed: l.completed,
        mastered: l.mastered,
        lastPracticed: l.lastPracticed,
      });
    }

    // 15. Seed Grooming Tasks
    const defaultGrooming = [
      { type: "brush", label: "Slicker Brush Coat", nextDue: "Tomorrow", frequencyDays: 2 },
      { type: "teeth", label: "Enzymatic Toothpaste", nextDue: "Today", frequencyDays: 1 },
      { type: "nails", label: "Nail Grind / Trim", nextDue: "in 5 days", frequencyDays: 14 },
      { type: "ears", label: "Ear Rinse & Wipe", nextDue: "in 10 days", frequencyDays: 14 },
    ];
    for (const g of defaultGrooming) {
      await ctx.db.insert("groomingTasks", {
        puppyId: puppyIdStr,
        userId,
        type: g.type,
        label: g.label,
        nextDue: g.nextDue,
        frequencyDays: g.frequencyDays,
      });
    }

    return { seeded: true, puppyId: puppyIdStr };
  },
});
