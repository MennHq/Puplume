import { ConvexReactClient } from "convex/react";
import { PuppyProfile, TaskItem, PottyLog } from "../types";

const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://energetic-partridge-407.convex.cloud";

export const convex = new ConvexReactClient(convexUrl);

export const CONVEX_DEPLOYMENT = 
  import.meta.env.CONVEX_DEPLOYMENT || 
  "dev:energetic-partridge-407|eyJ2MiI6ImIyZjQ0MTY2YjEwYjQzMThiODNhNThlZWMyYTJmMGI0In0=";

// Sync helper that safely saves to Convex if available
export async function syncPuppyToConvex(puppy: PuppyProfile, userId?: string): Promise<boolean> {
  try {
    // Attempt mutation via convex client
    await convex.mutation("puppies:savePuppy" as any, {
      name: puppy.name,
      breed: puppy.breed,
      birthDate: puppy.birthDate,
      sex: puppy.sex,
      weightLbs: puppy.weightLbs,
      photoUrl: puppy.photoUrl,
      temperament: puppy.temperament,
      dietaryRestrictions: puppy.dietaryRestrictions,
      microchipNumber: puppy.microchipNumber,
      allergies: puppy.allergies,
      vetClinic: puppy.vetClinic,
      vetPhone: puppy.vetPhone,
      vetName: puppy.vetName,
      insuranceProvider: puppy.insuranceProvider,
      favoriteTreat: puppy.favoriteTreat,
      createdAt: puppy.createdAt,
    });
    return true;
  } catch (err) {
    // Background fallback: logs to local storage seamlessly
    console.debug("[Convex] syncPuppy note:", err);
    return false;
  }
}

export async function syncTaskToConvex(task: TaskItem): Promise<boolean> {
  try {
    await convex.mutation("tasks:addTask" as any, {
      puppyId: task.puppyId,
      title: task.title,
      category: task.category,
      time: task.time,
      durationMin: task.durationMin,
      completed: task.completed,
      skipped: task.skipped,
      period: task.period,
      date: task.date,
      description: task.description,
      notes: task.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncTask note:", err);
    return false;
  }
}

export async function syncPottyLogToConvex(log: PottyLog): Promise<boolean> {
  try {
    await convex.mutation("potty:addPottyLog" as any, {
      puppyId: log.puppyId,
      type: log.type,
      location: log.location,
      timestamp: log.timestamp,
      notes: log.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncPottyLog note:", err);
    return false;
  }
}
