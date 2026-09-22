import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles synced from Clerk authentication
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  // Puppies belonging to authenticated users
  puppies: defineTable({
    userId: v.string(),
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
    createdAt: v.string(),
  }).index("by_user", ["userId"]),

  // Daily schedule tasks
  tasks: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    title: v.string(),
    category: v.string(),
    time: v.string(),
    durationMin: v.number(),
    completed: v.boolean(),
    skipped: v.boolean(),
    period: v.string(),
    date: v.string(),
    description: v.optional(v.string()),
    notes: v.optional(v.string()),
    completedAt: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"])
    .index("by_puppy_date", ["puppyId", "date"]),

  // Potty and bathroom tracking
  pottyLogs: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    type: v.string(), // pee, poop, both, accident
    location: v.string(), // outdoor, pad, indoor_accident
    timestamp: v.string(),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Feeding & meals tracking
  feedingLogs: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    mealType: v.string(), // breakfast, lunch, dinner, snack, water
    amountCups: v.number(),
    timestamp: v.string(),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Sleep and nap tracking
  sleepLogs: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    type: v.string(), // nap, night, crate
    startTime: v.string(),
    endTime: v.optional(v.string()),
    durationMin: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Walk & exercise logs
  walkLogs: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    durationMin: v.number(),
    distanceMiles: v.optional(v.number()),
    timestamp: v.string(),
    route: v.optional(v.string()),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Health: Vaccinations
  vaccinations: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    name: v.string(),
    status: v.string(), // completed, scheduled, overdue
    administeredDate: v.optional(v.string()),
    dueDate: v.string(),
    isCore: v.boolean(),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Health: Medications
  medications: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    name: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    startDate: v.string(),
    reminderTime: v.optional(v.string()),
    active: v.boolean(),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Health: Veterinary Appointments
  appointments: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    title: v.string(),
    clinic: v.string(),
    date: v.string(),
    time: v.string(),
    reason: v.string(),
    status: v.string(), // scheduled, completed, cancelled
    doctor: v.optional(v.string()),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Financial tracking / Expenses
  expenses: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    title: v.string(),
    category: v.string(), // vet, food, toys, training, grooming, gear, medical, insurance
    amount: v.number(),
    date: v.string(),
    vendor: v.string(),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Memory book & Milestones Journal
  journalEntries: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    title: v.string(),
    date: v.string(),
    notes: v.string(),
    mediaUrl: v.optional(v.string()),
    milestoneBadge: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),

  // Socialization checklist
  socialization: defineTable({
    puppyId: v.string(),
    userId: v.string(),
    category: v.string(),
    title: v.string(),
    description: v.string(),
    status: v.string(), // not_started, introduced, comfortable, needs_work
    lastUpdated: v.string(),
    notes: v.optional(v.string()),
  })
    .index("by_puppy", ["puppyId"])
    .index("by_user", ["userId"]),
});
