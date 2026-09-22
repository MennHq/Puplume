import { ConvexReactClient } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PuppyProfile, TaskItem, PottyLog, FeedingLog, SleepLog, WalkLog, VaccinationRecord, MedicationRecord, VetAppointment, ExpenseRecord, DocumentRecord, BehaviorIncident, GroomingTask, JournalEntry } from "../types";

const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://energetic-partridge-407.convex.cloud";

export const convex = new ConvexReactClient(convexUrl);

export const CONVEX_DEPLOYMENT = 
  import.meta.env.CONVEX_DEPLOYMENT || 
  "dev:energetic-partridge-407|eyJ2MiI6ImIyZjQ0MTY2YjEwYjQzMThiODNhNThlZWMyYTJmMGI0In0=";

// Async background mutation helpers to Convex
export async function syncPuppyToConvex(puppy: PuppyProfile): Promise<boolean> {
  try {
    await convex.mutation(api.puppies.savePuppy, {
      id: puppy.id,
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
      insurancePolicyNumber: puppy.insurancePolicyNumber,
      favoriteTreat: puppy.favoriteTreat,
      adoptionDate: puppy.adoptionDate,
      createdAt: puppy.createdAt,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncPuppy note:", err);
    return false;
  }
}

export async function syncTaskToConvex(task: TaskItem): Promise<boolean> {
  try {
    await convex.mutation(api.tasks.createTask, {
      puppyId: task.puppyId,
      title: task.title,
      category: task.category,
      time: task.time,
      durationMin: task.durationMin,
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

export async function toggleTaskInConvex(title: string, completed: boolean): Promise<boolean> {
  try {
    await convex.mutation(api.tasks.toggleTask, {
      title,
      completed,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] toggleTask note:", err);
    return false;
  }
}

export async function skipTaskInConvex(title: string): Promise<boolean> {
  try {
    await convex.mutation(api.tasks.skipTask, {
      title,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] skipTask note:", err);
    return false;
  }
}

export async function syncPottyLogToConvex(log: PottyLog): Promise<boolean> {
  try {
    await convex.mutation(api.potty.addPottyLog, {
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

export async function syncFeedingLogToConvex(log: FeedingLog): Promise<boolean> {
  try {
    await convex.mutation(api.feeding.addFeedingLog, {
      puppyId: log.puppyId,
      mealType: log.mealType,
      amountCups: log.amountCups,
      foodBrand: log.foodBrand,
      timestamp: log.timestamp,
      notes: log.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncFeedingLog note:", err);
    return false;
  }
}

export async function syncSleepLogToConvex(log: SleepLog): Promise<boolean> {
  try {
    await convex.mutation(api.sleep.addSleepLog, {
      puppyId: log.puppyId,
      type: log.type,
      startTime: log.startTime,
      endTime: log.endTime,
      durationMin: log.durationMin,
      notes: log.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncSleepLog note:", err);
    return false;
  }
}

export async function syncWalkLogToConvex(log: WalkLog): Promise<boolean> {
  try {
    await convex.mutation(api.walk.addWalkLog, {
      puppyId: log.puppyId,
      durationMin: log.durationMin,
      distanceMiles: log.distanceMiles,
      peesCount: log.peesCount,
      poopsCount: log.poopsCount,
      pullingRating: log.pullingRating,
      reactivityNotes: log.reactivityNotes,
      timestamp: log.startTime || new Date().toISOString(),
      notes: log.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncWalkLog note:", err);
    return false;
  }
}

export async function syncVaccinationToConvex(v: VaccinationRecord): Promise<boolean> {
  try {
    await convex.mutation(api.health.addVaccination, {
      puppyId: v.puppyId,
      name: v.vaccineName,
      vaccineName: v.vaccineName,
      status: v.status,
      administeredDate: v.administeredDate,
      dueDate: v.nextDueDate,
      nextDueDate: v.nextDueDate,
      vetClinic: v.vetClinic,
      lotNumber: v.lotNumber,
      isCore: true,
      notes: v.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncVaccination note:", err);
    return false;
  }
}

export async function syncMedicationToConvex(m: MedicationRecord): Promise<boolean> {
  try {
    await convex.mutation(api.health.addMedication, {
      puppyId: m.puppyId,
      name: m.name,
      dosage: m.dosage,
      frequency: m.frequency,
      startDate: m.startDate,
      reminderTime: m.reminderTime,
      active: m.active,
      notes: m.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncMedication note:", err);
    return false;
  }
}

export async function syncAppointmentToConvex(a: VetAppointment): Promise<boolean> {
  try {
    await convex.mutation(api.health.addAppointment, {
      puppyId: a.puppyId,
      title: a.title,
      clinic: a.clinic,
      date: a.date,
      time: a.time,
      reason: a.reason,
      status: a.status,
      doctor: a.doctor,
      notes: a.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncAppointment note:", err);
    return false;
  }
}

export async function syncExpenseToConvex(e: ExpenseRecord): Promise<boolean> {
  try {
    await convex.mutation(api.expenses.addExpense, {
      puppyId: e.puppyId,
      title: e.title,
      category: e.category,
      amount: e.amount,
      date: e.date,
      vendor: e.vendor,
      notes: e.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncExpense note:", err);
    return false;
  }
}

export async function syncDocumentToConvex(d: DocumentRecord): Promise<boolean> {
  try {
    await convex.mutation(api.documents.addDocument, {
      puppyId: d.puppyId,
      title: d.title,
      category: d.category,
      date: d.date,
      fileType: d.fileType,
      fileSize: d.fileSize,
      notes: d.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncDocument note:", err);
    return false;
  }
}

export async function removeDocumentFromConvex(id: string): Promise<boolean> {
  try {
    await convex.mutation(api.documents.deleteDocument, { id });
    return true;
  } catch (err) {
    console.debug("[Convex] removeDocument note:", err);
    return false;
  }
}

export async function syncBehaviorLogToConvex(b: BehaviorIncident): Promise<boolean> {
  try {
    await convex.mutation(api.behavior.addBehaviorLog, {
      puppyId: b.puppyId,
      behaviorType: b.behaviorType,
      timestamp: b.timestamp,
      severity: b.severity,
      trigger: b.trigger,
      whatHelped: b.whatHelped,
      notes: b.notes,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncBehaviorLog note:", err);
    return false;
  }
}

export async function syncGroomingTasksToConvex(puppyId: string, tasks: GroomingTask[]): Promise<boolean> {
  try {
    await convex.mutation(api.grooming.saveGroomingTasks, {
      puppyId,
      tasks: tasks.map(t => ({
        type: t.type,
        label: t.label,
        lastDone: t.lastDone,
        nextDue: t.nextDue,
        frequencyDays: t.frequencyDays,
      })),
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncGroomingTasks note:", err);
    return false;
  }
}

export async function syncSocializationToConvex(puppyId: string, item: any): Promise<boolean> {
  try {
    await convex.mutation(api.socialization.updateSocializationStatus, {
      puppyId,
      category: item.category || "General",
      title: item.title,
      description: item.description || "",
      status: item.status,
      notes: item.notes,
      lastUpdated: item.lastUpdated || new Date().toISOString().split("T")[0],
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncSocialization note:", err);
    return false;
  }
}

export async function syncJournalEntryToConvex(j: JournalEntry): Promise<boolean> {
  try {
    await convex.mutation(api.journal.addJournalEntry, {
      puppyId: j.puppyId,
      title: j.title,
      date: j.date,
      notes: j.notes,
      mediaUrl: j.mediaUrl,
      milestoneBadge: j.milestoneBadge,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncJournalEntry note:", err);
    return false;
  }
}

export async function syncTrainingLessonToConvex(puppyId: string, lessonId: string, completed: boolean, mastered: boolean): Promise<boolean> {
  try {
    await convex.mutation(api.training.updateLessonStatus, {
      puppyId,
      lessonId,
      completed,
      mastered,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncTrainingLesson note:", err);
    return false;
  }
}

export async function syncSettingsToConvex(settings: {
  pottyAlerts: boolean;
  feedingAlerts: boolean;
  trainingAlerts: boolean;
  medAlerts: boolean;
  units: string;
  activePuppyId?: string;
}): Promise<boolean> {
  try {
    await convex.mutation(api.settings.saveSettings, settings);
    return true;
  } catch (err) {
    console.debug("[Convex] syncSettings note:", err);
    return false;
  }
}

export async function syncFamilyMemberToConvex(m: {
  puppyId?: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  dateAdded: string;
}): Promise<boolean> {
  try {
    await convex.mutation(api.family.addFamilyMember, m);
    return true;
  } catch (err) {
    console.debug("[Convex] syncFamilyMember note:", err);
    return false;
  }
}

export async function removeFamilyMemberFromConvex(id: string): Promise<boolean> {
  try {
    await convex.mutation(api.family.deleteFamilyMember, { id });
    return true;
  } catch (err) {
    console.debug("[Convex] removeFamilyMember note:", err);
    return false;
  }
}

export async function syncNotificationReadToConvex(id: string): Promise<boolean> {
  try {
    await convex.mutation(api.notifications.markNotificationRead, { id });
    return true;
  } catch (err) {
    console.debug("[Convex] syncNotificationRead note:", err);
    return false;
  }
}

export async function syncAllNotificationsReadToConvex(): Promise<boolean> {
  try {
    await convex.mutation(api.notifications.markAllNotificationsRead, {});
    return true;
  } catch (err) {
    console.debug("[Convex] syncAllNotificationsRead note:", err);
    return false;
  }
}

export async function syncAIMessageToConvex(puppyId: string, msg: { sender: string; text: string; timestamp: string }): Promise<boolean> {
  try {
    await convex.mutation(api.ai.addAIMessage, {
      puppyId,
      sender: msg.sender,
      text: msg.text,
      timestamp: msg.timestamp,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncAIMessage note:", err);
    return false;
  }
}

export async function syncAIMessagesToConvex(puppyId: string, messages: { sender: string; text: string; timestamp: string }[]): Promise<boolean> {
  try {
    await convex.mutation(api.ai.saveAIMessages, {
      puppyId,
      messages,
    });
    return true;
  } catch (err) {
    console.debug("[Convex] syncAIMessages note:", err);
    return false;
  }
}
