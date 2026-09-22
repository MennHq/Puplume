import { 
  PuppyProfile, 
  TaskItem, 
  PottyLog, 
  SleepLog, 
  FeedingLog, 
  WalkLog, 
  TrainingLesson, 
  VaccinationRecord, 
  MedicationRecord, 
  VetAppointment, 
  ExpenseRecord, 
  DocumentRecord, 
  BehaviorIncident, 
  GroomingTask, 
  SocializationItem, 
  JournalEntry, 
  FamilyMember, 
  NotificationItem, 
  AIMessage,
  UserSession 
} from '../types';
import { INITIAL_TRAINING_CURRICULUM } from './curriculumData';
import { 
  syncPuppyToConvex, 
  syncTaskToConvex, 
  toggleTaskInConvex,
  skipTaskInConvex,
  syncPottyLogToConvex,
  syncFeedingLogToConvex,
  syncSleepLogToConvex,
  syncWalkLogToConvex,
  syncVaccinationToConvex,
  syncMedicationToConvex,
  syncAppointmentToConvex,
  syncExpenseToConvex,
  syncDocumentToConvex,
  removeDocumentFromConvex,
  syncBehaviorLogToConvex,
  syncGroomingTasksToConvex,
  syncSocializationToConvex,
  syncJournalEntryToConvex,
  syncTrainingLessonToConvex,
  syncSettingsToConvex,
  syncFamilyMemberToConvex,
  removeFamilyMemberFromConvex,
  syncNotificationReadToConvex,
  syncAllNotificationsReadToConvex,
  syncAIMessageToConvex,
  syncAIMessagesToConvex
} from './convex';

export interface UserSettingsData {
  pottyAlerts: boolean;
  feedingAlerts: boolean;
  trainingAlerts: boolean;
  medAlerts: boolean;
  units: 'imperial' | 'metric';
  activePuppyId?: string;
}

// Seed puppy: Max, 14-week old Golden Retriever
export const SEED_PUPPY: PuppyProfile = {
  id: 'pup-max-01',
  name: 'Max',
  photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
  breed: 'Golden Retriever',
  birthDate: '2026-06-15',
  sex: 'male',
  weightLbs: 24.2,
  microchipNumber: '985141002341992',
  allergies: 'None known',
  dietaryRestrictions: 'Large breed puppy kibble with warm bone broth',
  temperament: 'Gentle, curious, food-motivated, evening zoomies enthusiast',
  adoptionDate: '2026-08-10',
  vetName: 'Dr. Eleanor Vance, DVM',
  vetPhone: '(555) 392-8819',
  vetClinic: 'City Vet Animal Hospital',
  insuranceProvider: 'Healthy Paws Pet Insurance',
  insurancePolicyNumber: 'HP-99201-GLD',
  favoriteTreat: 'Dehydrated beef liver & blueberries',
  createdAt: '2026-08-10T10:00:00.000Z'
};

export const SEED_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    puppyId: 'pup-max-01',
    title: 'Breakfast & Fresh Water',
    category: 'feeding',
    time: '07:00 AM',
    durationMin: 15,
    completed: true,
    skipped: false,
    period: 'morning',
    date: new Date().toISOString().split('T')[0],
    description: '1 cup puppy kibble + 2 tbsp warm bone broth',
    completedAt: '07:08 AM'
  },
  {
    id: 'task-2',
    puppyId: 'pup-max-01',
    title: 'Post-Breakfast Potty Break',
    category: 'potty',
    time: '07:15 AM',
    durationMin: 10,
    completed: true,
    skipped: false,
    period: 'morning',
    date: new Date().toISOString().split('T')[0],
    description: 'Target grass patch, repeat "Go Potty" cue once',
    completedAt: '07:22 AM'
  },
  {
    id: 'task-3',
    puppyId: 'pup-max-01',
    title: 'Morning Crate Nap',
    category: 'sleep',
    time: '08:00 AM',
    durationMin: 90,
    completed: true,
    skipped: false,
    period: 'morning',
    date: new Date().toISOString().split('T')[0],
    description: 'Cover crate, white noise machine on low',
    completedAt: '09:35 AM'
  },
  {
    id: 'task-4',
    puppyId: 'pup-max-01',
    title: 'Recall Training ("Rocket Come")',
    category: 'training',
    time: '10:30 AM',
    durationMin: 5,
    completed: false,
    skipped: false,
    period: 'morning',
    date: new Date().toISOString().split('T')[0],
    description: 'High-value treats. 5 repetitions running backwards in hallway'
  },
  {
    id: 'task-5',
    puppyId: 'pup-max-01',
    title: 'Backyard Sniff Walk & Exploration',
    category: 'walk',
    time: '11:00 AM',
    durationMin: 15,
    completed: false,
    skipped: false,
    period: 'morning',
    date: new Date().toISOString().split('T')[0],
    description: 'Loose leash on front-clip harness, let puppy lead sniffing'
  },
  {
    id: 'task-6',
    puppyId: 'pup-max-01',
    title: 'Lunch & Puzzle Toy Feeding',
    category: 'feeding',
    time: '12:00 PM',
    durationMin: 20,
    completed: false,
    skipped: false,
    period: 'afternoon',
    date: new Date().toISOString().split('T')[0],
    description: '0.75 cup kibble inside Bob-A-Lot wobble feeder'
  },
  {
    id: 'task-7',
    puppyId: 'pup-max-01',
    title: 'Post-Lunch Potty',
    category: 'potty',
    time: '12:30 PM',
    durationMin: 10,
    completed: false,
    skipped: false,
    period: 'afternoon',
    date: new Date().toISOString().split('T')[0],
    description: 'Designated outdoor spot'
  },
  {
    id: 'task-8',
    puppyId: 'pup-max-01',
    title: 'Afternoon Deep Rest Nap',
    category: 'sleep',
    time: '01:00 PM',
    durationMin: 120,
    completed: false,
    skipped: false,
    period: 'afternoon',
    date: new Date().toISOString().split('T')[0],
    description: 'Quiet time during house rest hours'
  },
  {
    id: 'task-9',
    puppyId: 'pup-max-01',
    title: 'Evening Meal & Daily Vitamins',
    category: 'feeding',
    time: '05:30 PM',
    durationMin: 15,
    completed: false,
    skipped: false,
    period: 'evening',
    date: new Date().toISOString().split('T')[0],
    description: '1 cup kibble + Omega-3 puppy oil supplement'
  },
  {
    id: 'task-10',
    puppyId: 'pup-max-01',
    title: 'Frozen Kong Teething Wind-Down',
    category: 'custom',
    time: '07:00 PM',
    durationMin: 30,
    completed: false,
    skipped: false,
    period: 'night',
    date: new Date().toISOString().split('T')[0],
    description: 'Frozen Kong with peanut butter and pumpkin puree to soothe teething gums'
  }
];

export const SEED_POTTY_LOGS: PottyLog[] = [
  {
    id: 'potty-1',
    puppyId: 'pup-max-01',
    type: 'both',
    location: 'outdoor',
    timestamp: new Date(Date.now() - 3.5 * 3600000).toISOString(),
    notes: 'Pee and firm poop at grass patch, rewarded with liver treat'
  },
  {
    id: 'potty-2',
    puppyId: 'pup-max-01',
    type: 'pee',
    location: 'outdoor',
    timestamp: new Date(Date.now() - 1.5 * 3600000).toISOString(),
    notes: 'Quick pee within 45 seconds of stepping outside'
  }
];

export const SEED_SLEEP_LOGS: SleepLog[] = [
  {
    id: 'sleep-1',
    puppyId: 'pup-max-01',
    type: 'night',
    startTime: new Date(Date.now() - 13 * 3600000).toISOString(),
    endTime: new Date(Date.now() - 4.5 * 3600000).toISOString(),
    durationMin: 510,
    notes: 'Slept 8.5 hours uninterrupted in crate without whining'
  },
  {
    id: 'sleep-2',
    puppyId: 'pup-max-01',
    type: 'nap',
    startTime: new Date(Date.now() - 3.5 * 3600000).toISOString(),
    endTime: new Date(Date.now() - 2.0 * 3600000).toISOString(),
    durationMin: 90,
    notes: 'Post-breakfast morning nap on dog bed'
  }
];

export const SEED_FEEDING_LOGS: FeedingLog[] = [
  {
    id: 'feed-1',
    puppyId: 'pup-max-01',
    mealType: 'breakfast',
    amountCups: 1.0,
    foodBrand: 'Purina Pro Plan Large Breed Puppy',
    timestamp: new Date(Date.now() - 4.2 * 3600000).toISOString(),
    notes: 'Ate well in under 5 minutes with slow feeder bowl'
  },
  {
    id: 'feed-2',
    puppyId: 'pup-max-01',
    mealType: 'water',
    foodBrand: 'Fresh filtered water',
    timestamp: new Date(Date.now() - 2.0 * 3600000).toISOString(),
    notes: 'Refilled bowl, drank ~200ml'
  }
];

export const SEED_WALK_LOGS: WalkLog[] = [
  {
    id: 'walk-1',
    puppyId: 'pup-max-01',
    startTime: new Date(Date.now() - 24 * 3600000).toISOString(),
    durationMin: 18,
    distanceMiles: 0.45,
    peesCount: 2,
    poopsCount: 1,
    pullingRating: 'mild',
    reactivityNotes: 'Curious about a passing stroller, sat politely when prompted',
    notes: 'Good loose leash practice on our block'
  }
];

export const SEED_VACCINATIONS: VaccinationRecord[] = [
  {
    id: 'vac-1',
    puppyId: 'pup-max-01',
    vaccineName: 'DHPP (Distemper, Adenovirus, Parvovirus, Parainfluenza) #1',
    administeredDate: '2026-07-25',
    nextDueDate: '2026-08-22',
    vetClinic: 'City Vet Animal Hospital',
    status: 'up_to_date',
    lotNumber: 'DHPP-7729B',
    notes: 'Tolerated well, slight drowsiness for 4 hours.'
  },
  {
    id: 'vac-2',
    puppyId: 'pup-max-01',
    vaccineName: 'DHPP Booster #2 & Bordetella (Intranasal)',
    administeredDate: '2026-08-22',
    nextDueDate: '2026-10-12',
    vetClinic: 'City Vet Animal Hospital',
    status: 'up_to_date',
    lotNumber: 'DHPP-9901A',
    notes: 'Kennel cough intranasal spray completed.'
  },
  {
    id: 'vac-3',
    puppyId: 'pup-max-01',
    vaccineName: 'Rabies 1-Year & Final DHPP #3 Booster',
    administeredDate: '2026-10-12',
    nextDueDate: '2026-10-12',
    vetClinic: 'City Vet Animal Hospital',
    status: 'due_soon',
    notes: 'Scheduled for 16-week milestone clinic visit.'
  }
];

export const SEED_MEDICATIONS: MedicationRecord[] = [
  {
    id: 'med-1',
    puppyId: 'pup-max-01',
    name: 'Heartgard Plus (Heartworm Prevention)',
    dosage: '1 chewable tablet (up to 25 lbs)',
    frequency: 'Monthly (1st of month)',
    startDate: '2026-08-01',
    reminderTime: '09:00 AM',
    active: true,
    notes: 'Tastes like beef chew, Max eats it like a treat.'
  },
  {
    id: 'med-2',
    puppyId: 'pup-max-01',
    name: 'NexGard (Flea & Tick Prevention)',
    dosage: '1 chewable tablet (10.1 - 24 lbs)',
    frequency: 'Monthly (1st of month)',
    startDate: '2026-08-01',
    reminderTime: '09:00 AM',
    active: true,
    notes: 'Next dose due October 1.'
  }
];

export const SEED_APPOINTMENTS: VetAppointment[] = [
  {
    id: 'apt-1',
    puppyId: 'pup-max-01',
    title: 'Puppy 16-Week Booster & Rabies Exam',
    clinic: 'City Vet Animal Hospital',
    date: '2026-10-12',
    time: '03:00 PM',
    reason: 'Final DHPP booster, Rabies vaccine, dental check, microchip check',
    status: 'scheduled',
    doctor: 'Dr. Eleanor Vance',
    notes: 'Bring stool sample in clean container for routine fecal test.'
  }
];

export const SEED_EXPENSES: ExpenseRecord[] = [
  {
    id: 'exp-1',
    puppyId: 'pup-max-01',
    title: '12-Week Exam, DHPP #2 & Bordetella',
    category: 'vet',
    amount: 145.00,
    date: '2026-08-22',
    vendor: 'City Vet Animal Hospital'
  },
  {
    id: 'exp-2',
    puppyId: 'pup-max-01',
    title: 'Purina Pro Plan Large Puppy 30lb Bag',
    category: 'food',
    amount: 72.99,
    date: '2026-09-02',
    vendor: 'Chewy.com'
  },
  {
    id: 'exp-3',
    puppyId: 'pup-max-01',
    title: 'Puppy Teething KONG & Chew Rope Set',
    category: 'toys',
    amount: 28.50,
    date: '2026-09-10',
    vendor: 'Petco'
  },
  {
    id: 'exp-4',
    puppyId: 'pup-max-01',
    title: 'Healthy Paws Pet Insurance (Monthly)',
    category: 'insurance',
    amount: 44.00,
    date: '2026-09-15',
    vendor: 'Healthy Paws'
  }
];

export const SEED_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc-1',
    puppyId: 'pup-max-01',
    title: 'City Vet Vaccination Card & Health Records',
    category: 'vaccination',
    date: '2026-08-22',
    fileType: 'PDF',
    fileSize: '1.4 MB',
    notes: 'Shows DHPP #1, #2, and Bordetella with clinic stamp.'
  },
  {
    id: 'doc-2',
    puppyId: 'pup-max-01',
    title: 'Healthy Paws Insurance Certificate & Policy',
    category: 'insurance',
    date: '2026-08-12',
    fileType: 'PDF',
    fileSize: '840 KB',
    notes: 'Policy #HP-99201-GLD with $250 annual deductible, 90% reimbursement.'
  },
  {
    id: 'doc-3',
    puppyId: 'pup-max-01',
    title: 'HomeAgain Microchip Registration Certificate',
    category: 'microchip',
    date: '2026-08-10',
    fileType: 'PDF',
    fileSize: '512 KB',
    notes: 'Registered to primary account holder.'
  }
];

export const SEED_BEHAVIOR_LOGS: BehaviorIncident[] = [
  {
    id: 'beh-1',
    puppyId: 'pup-max-01',
    behaviorType: 'biting',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    severity: 'mild',
    trigger: 'Excited game of tug',
    whatHelped: 'Froze, yelped softly, redirected mouth onto soft squeaky toy immediately',
    notes: 'Calmed within 20 seconds once toy was provided'
  }
];


export const SEED_GROOMING_TASKS: GroomingTask[] = [
  { id: 'g-1', puppyId: 'pup-max-01', type: 'brush', label: 'Daily Coat Brush', lastDone: '2026-09-20', nextDue: '2026-09-21', frequencyDays: 1 },
  { id: 'g-2', puppyId: 'pup-max-01', type: 'teeth', label: 'Enzymatic Toothpaste', lastDone: '2026-09-19', nextDue: '2026-09-21', frequencyDays: 2 },
  { id: 'g-3', puppyId: 'pup-max-01', type: 'nails', label: 'Nail Tip Dremel / Clip', lastDone: '2026-09-10', nextDue: '2026-09-24', frequencyDays: 14 },
  { id: 'g-4', puppyId: 'pup-max-01', type: 'ears', label: 'Ear Canal Check & Wipe', lastDone: '2026-09-15', nextDue: '2026-09-22', frequencyDays: 7 },
  { id: 'g-5', puppyId: 'pup-max-01', type: 'bath', label: 'Puppy Oatmeal Bath', lastDone: '2026-09-05', nextDue: '2026-10-03', frequencyDays: 28 }
];

export const SEED_SOCIALIZATION: SocializationItem[] = [
  {
    id: 'soc-1',
    category: 'Surfaces',
    title: 'Metal grates, tile & hardwood',
    description: 'Walking confidently across slick and textured flooring',
    status: 'comfortable',
    lastUpdated: '2026-09-18'
  },
  {
    id: 'soc-2',
    category: 'Sounds',
    title: 'Vacuum cleaner from another room',
    description: 'Hearing vacuum at low volume while eating frozen Kong',
    status: 'introduced',
    lastUpdated: '2026-09-19',
    notes: 'Showed alert ears but stayed lying down with treat'
  },
  {
    id: 'soc-3',
    category: 'Sounds',
    title: 'Traffic & Sirens (Distance)',
    description: 'Outdoor sidewalk observations of passing buses and cars',
    status: 'comfortable',
    lastUpdated: '2026-09-17'
  },
  {
    id: 'soc-4',
    category: 'People',
    title: 'Person wearing sunglasses & wide-brim hat',
    description: 'Neutral observation of diverse apparel without barking',
    status: 'comfortable',
    lastUpdated: '2026-09-16'
  },
  {
    id: 'soc-5',
    category: 'Handling',
    title: 'Paws, ears, and mouth gentle inspection',
    description: 'Allows gentle touching of toenails and teeth inspection without squirming',
    status: 'needs_work',
    lastUpdated: '2026-09-20',
    notes: 'Front right paw is sensitive. Pair touch with peanut butter spoon.'
  },
  {
    id: 'soc-6',
    category: 'Environment',
    title: 'Car rides in travel crate/harness',
    description: 'Quiet, nausea-free car trips to fun destinations',
    status: 'comfortable',
    lastUpdated: '2026-09-15'
  }
];

export const SEED_JOURNAL: JournalEntry[] = [
  {
    id: 'jrn-1',
    puppyId: 'pup-max-01',
    title: 'First Full Night Without Whining! 🎉',
    date: '2026-09-18',
    notes: 'Max slept from 10:00 PM to 6:30 AM in his crate without a single whimper. Truly a golden milestone!',
    mediaUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
    milestoneBadge: 'Sleep Champion'
  },
  {
    id: 'jrn-2',
    puppyId: 'pup-max-01',
    title: 'First Outdoor Sit at the Busy Crosswalk',
    date: '2026-09-14',
    notes: 'Offered an unprompted polite sit while waiting for the traffic light to change on our morning walk.',
    mediaUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
    milestoneBadge: 'Polite Scholar'
  }
];

export const SEED_FAMILY: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    role: 'Owner',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    dateAdded: '2026-08-10'
  },
  {
    id: 'fam-2',
    name: 'David Miller',
    email: 'david.miller@example.com',
    role: 'Caregiver',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    dateAdded: '2026-08-12'
  }
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Vaccination Due Next Month',
    message: 'Max is due for Rabies and final DHPP booster on October 12 at 3:00 PM at City Vet.',
    category: 'health',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Training Reminder',
    message: 'Time for 5-minute Recall Training with high-value treats!',
    category: 'tasks',
    timestamp: '15 minutes ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Email Intelligence Found Appointment',
    message: 'We detected appointment confirmation from City Vet Animal Hospital.',
    category: 'calendar',
    timestamp: 'Yesterday',
    read: true
  }
];

export const SEED_AI_MESSAGES: AIMessage[] = [
  {
    id: 'ai-1',
    sender: 'assistant',
    text: "Hello! I'm PupLume, your AI puppy co-pilot. I'm actively tracking routines, training, potty rhythm, and health milestones. How can I help you today?",
    timestamp: '09:00 AM'
  }
];

export const SEED_SESSION: UserSession = {
  isAuthenticated: true,
  email: 'petparent@example.com',
  name: 'Pet Parent',
  plan: 'premium'
};

const DEFAULT_SETTINGS: UserSettingsData = {
  pottyAlerts: true,
  feedingAlerts: true,
  trainingAlerts: true,
  medAlerts: true,
  units: 'imperial',
};

class StorageManager {
  private currentUserId: string | null = null;
  private listeners: Set<() => void> = new Set();
  private hasHydratedFromConvex = false;

  // Active in-memory state scoped to authenticated user
  private puppies: PuppyProfile[] = [SEED_PUPPY];
  private activePuppyId: string | null = SEED_PUPPY.id;
  private tasks: TaskItem[] = [...SEED_TASKS];
  private pottyLogs: PottyLog[] = [...SEED_POTTY_LOGS];
  private sleepLogs: SleepLog[] = [...SEED_SLEEP_LOGS];
  private feedingLogs: FeedingLog[] = [...SEED_FEEDING_LOGS];
  private walkLogs: WalkLog[] = [...SEED_WALK_LOGS];
  private trainingLessons: TrainingLesson[] = [...INITIAL_TRAINING_CURRICULUM];
  private vaccinations: VaccinationRecord[] = [...SEED_VACCINATIONS];
  private medications: MedicationRecord[] = [...SEED_MEDICATIONS];
  private appointments: VetAppointment[] = [...SEED_APPOINTMENTS];
  private expenses: ExpenseRecord[] = [...SEED_EXPENSES];
  private documents: DocumentRecord[] = [...SEED_DOCUMENTS];
  private behaviorLogs: BehaviorIncident[] = [...SEED_BEHAVIOR_LOGS];
  private groomingTasks: GroomingTask[] = [...SEED_GROOMING_TASKS];
  private socialization: SocializationItem[] = [...SEED_SOCIALIZATION];
  private journal: JournalEntry[] = [...SEED_JOURNAL];
  private family: FamilyMember[] = [...SEED_FAMILY];
  private notifications: NotificationItem[] = [...SEED_NOTIFICATIONS];
  private aiMessages: AIMessage[] = [...SEED_AI_MESSAGES];
  private settings: UserSettingsData = { ...DEFAULT_SETTINGS };

  constructor() {
    this.loadCache();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.warn('Listener notification error:', e);
      }
    });
  }

  setAuthenticatedUser(userId: string | null): void {
    if (this.currentUserId === userId) return;

    this.currentUserId = userId;
    this.hasHydratedFromConvex = false;

    // Load user cache or local cache
    this.loadCache();
    this.notifyListeners();
  }

  private userKey(key: string): string {
    return this.currentUserId ? `puplume_u_${this.currentUserId}_${key}` : `puplume_local_${key}`;
  }

  private loadCache(): void {
    try {
      const prefix = this.userKey('');
      const cachedPuppies = localStorage.getItem(`${prefix}puppies`);
      if (cachedPuppies) {
        this.puppies = JSON.parse(cachedPuppies);
        this.activePuppyId = localStorage.getItem(`${prefix}active_puppy_id`) || (this.puppies[0]?.id ?? null);
      }

      const cachedTasks = localStorage.getItem(`${prefix}tasks`);
      if (cachedTasks) this.tasks = JSON.parse(cachedTasks);

      const cachedPotty = localStorage.getItem(`${prefix}potty_logs`);
      if (cachedPotty) this.pottyLogs = JSON.parse(cachedPotty);

      const cachedSleep = localStorage.getItem(`${prefix}sleep_logs`);
      if (cachedSleep) this.sleepLogs = JSON.parse(cachedSleep);

      const cachedFeeding = localStorage.getItem(`${prefix}feeding_logs`);
      if (cachedFeeding) this.feedingLogs = JSON.parse(cachedFeeding);

      const cachedWalk = localStorage.getItem(`${prefix}walk_logs`);
      if (cachedWalk) this.walkLogs = JSON.parse(cachedWalk);

      const cachedLessons = localStorage.getItem(`${prefix}training_lessons`);
      if (cachedLessons) this.trainingLessons = JSON.parse(cachedLessons);

      const cachedVaccinations = localStorage.getItem(`${prefix}vaccinations`);
      if (cachedVaccinations) this.vaccinations = JSON.parse(cachedVaccinations);

      const cachedMedications = localStorage.getItem(`${prefix}medications`);
      if (cachedMedications) this.medications = JSON.parse(cachedMedications);

      const cachedAppointments = localStorage.getItem(`${prefix}appointments`);
      if (cachedAppointments) this.appointments = JSON.parse(cachedAppointments);

      const cachedExpenses = localStorage.getItem(`${prefix}expenses`);
      if (cachedExpenses) this.expenses = JSON.parse(cachedExpenses);

      const cachedDocuments = localStorage.getItem(`${prefix}documents`);
      if (cachedDocuments) this.documents = JSON.parse(cachedDocuments);

      const cachedBehavior = localStorage.getItem(`${prefix}behavior_logs`);
      if (cachedBehavior) this.behaviorLogs = JSON.parse(cachedBehavior);

      const cachedGrooming = localStorage.getItem(`${prefix}grooming_tasks`);
      if (cachedGrooming) this.groomingTasks = JSON.parse(cachedGrooming);

      const cachedSocialization = localStorage.getItem(`${prefix}socialization`);
      if (cachedSocialization) this.socialization = JSON.parse(cachedSocialization);

      const cachedJournal = localStorage.getItem(`${prefix}journal`);
      if (cachedJournal) this.journal = JSON.parse(cachedJournal);

      const cachedFamily = localStorage.getItem(`${prefix}family`);
      if (cachedFamily) this.family = JSON.parse(cachedFamily);

      const cachedSettings = localStorage.getItem(`${prefix}settings`);
      if (cachedSettings) this.settings = JSON.parse(cachedSettings);
    } catch (e) {
      console.warn('Error loading cache:', e);
    }
  }

  private persistUserCache(): void {
    try {
      const prefix = this.userKey('');
      localStorage.setItem(`${prefix}puppies`, JSON.stringify(this.puppies));
      if (this.activePuppyId) {
        localStorage.setItem(`${prefix}active_puppy_id`, this.activePuppyId);
      }
      localStorage.setItem(`${prefix}tasks`, JSON.stringify(this.tasks));
      localStorage.setItem(`${prefix}potty_logs`, JSON.stringify(this.pottyLogs));
      localStorage.setItem(`${prefix}sleep_logs`, JSON.stringify(this.sleepLogs));
      localStorage.setItem(`${prefix}feeding_logs`, JSON.stringify(this.feedingLogs));
      localStorage.setItem(`${prefix}walk_logs`, JSON.stringify(this.walkLogs));
      localStorage.setItem(`${prefix}training_lessons`, JSON.stringify(this.trainingLessons));
      localStorage.setItem(`${prefix}vaccinations`, JSON.stringify(this.vaccinations));
      localStorage.setItem(`${prefix}medications`, JSON.stringify(this.medications));
      localStorage.setItem(`${prefix}appointments`, JSON.stringify(this.appointments));
      localStorage.setItem(`${prefix}expenses`, JSON.stringify(this.expenses));
      localStorage.setItem(`${prefix}documents`, JSON.stringify(this.documents));
      localStorage.setItem(`${prefix}behavior_logs`, JSON.stringify(this.behaviorLogs));
      localStorage.setItem(`${prefix}grooming_tasks`, JSON.stringify(this.groomingTasks));
      localStorage.setItem(`${prefix}socialization`, JSON.stringify(this.socialization));
      localStorage.setItem(`${prefix}journal`, JSON.stringify(this.journal));
      localStorage.setItem(`${prefix}family`, JSON.stringify(this.family));
      localStorage.setItem(`${prefix}settings`, JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Error persisting user cache:', e);
    }
  }

  // Hydrate authoritative state from Convex reactive subscription
  hydrateFromConvex(cloudData: any): void {
    if (!cloudData || !this.currentUserId) return;

    this.hasHydratedFromConvex = true;

    // 1. Puppies
    if (Array.isArray(cloudData.puppies) && cloudData.puppies.length > 0) {
      this.puppies = cloudData.puppies.map((p: any) => ({
        id: p._id || p.id || 'pup-1',
        name: p.name,
        breed: p.breed,
        birthDate: p.birthDate,
        sex: p.sex,
        weightLbs: p.weightLbs,
        photoUrl: p.photoUrl,
        temperament: p.temperament,
        dietaryRestrictions: p.dietaryRestrictions,
        microchipNumber: p.microchipNumber,
        allergies: p.allergies,
        vetClinic: p.vetClinic,
        vetPhone: p.vetPhone,
        vetName: p.vetName,
        insuranceProvider: p.insuranceProvider,
        insurancePolicyNumber: p.insurancePolicyNumber,
        favoriteTreat: p.favoriteTreat,
        adoptionDate: p.adoptionDate,
        createdAt: p.createdAt,
      }));

      // Active puppy
      const savedActiveId = cloudData.settings?.activePuppyId;
      if (savedActiveId && this.puppies.some((p) => p.id === savedActiveId)) {
        this.activePuppyId = savedActiveId;
      } else if (!this.activePuppyId || !this.puppies.some((p) => p.id === this.activePuppyId)) {
        this.activePuppyId = this.puppies[0].id;
      }
    }

    // 2. Settings
    if (cloudData.settings) {
      this.settings = {
        pottyAlerts: cloudData.settings.pottyAlerts ?? true,
        feedingAlerts: cloudData.settings.feedingAlerts ?? true,
        trainingAlerts: cloudData.settings.trainingAlerts ?? true,
        medAlerts: cloudData.settings.medAlerts ?? true,
        units: cloudData.settings.units || 'imperial',
        activePuppyId: cloudData.settings.activePuppyId,
      };
    }

    // 3. Tasks
    if (Array.isArray(cloudData.tasks) && cloudData.tasks.length > 0) {
      this.tasks = cloudData.tasks.map((t: any) => ({
        id: t._id || t.id,
        puppyId: t.puppyId,
        title: t.title,
        category: t.category,
        time: t.time,
        durationMin: t.durationMin,
        completed: t.completed,
        skipped: t.skipped,
        period: t.period,
        date: t.date,
        description: t.description,
        notes: t.notes,
        completedAt: t.completedAt,
      }));
    }

    // 4. Potty Logs
    if (Array.isArray(cloudData.pottyLogs) && cloudData.pottyLogs.length > 0) {
      this.pottyLogs = cloudData.pottyLogs.map((l: any) => ({
        id: l._id || l.id,
        puppyId: l.puppyId,
        type: l.type,
        location: l.location,
        timestamp: l.timestamp,
        notes: l.notes,
      }));
    }

    // 5. Feeding Logs
    if (Array.isArray(cloudData.feedingLogs) && cloudData.feedingLogs.length > 0) {
      this.feedingLogs = cloudData.feedingLogs.map((l: any) => ({
        id: l._id || l.id,
        puppyId: l.puppyId,
        mealType: l.mealType,
        amountCups: l.amountCups || 1,
        foodBrand: l.foodBrand,
        timestamp: l.timestamp,
        notes: l.notes,
      }));
    }

    // 6. Sleep Logs
    if (Array.isArray(cloudData.sleepLogs) && cloudData.sleepLogs.length > 0) {
      this.sleepLogs = cloudData.sleepLogs.map((l: any) => ({
        id: l._id || l.id,
        puppyId: l.puppyId,
        type: l.type,
        startTime: l.startTime,
        endTime: l.endTime,
        durationMin: l.durationMin,
        notes: l.notes,
      }));
    }

    // 7. Walk Logs
    if (Array.isArray(cloudData.walkLogs) && cloudData.walkLogs.length > 0) {
      this.walkLogs = cloudData.walkLogs.map((l: any) => ({
        id: l._id || l.id,
        puppyId: l.puppyId,
        startTime: l.startTime || l.timestamp,
        durationMin: l.durationMin,
        distanceMiles: l.distanceMiles || 0.5,
        peesCount: l.peesCount || 0,
        poopsCount: l.poopsCount || 0,
        pullingRating: l.pullingRating || 'mild',
        reactivityNotes: l.reactivityNotes,
        notes: l.notes,
      }));
    }

    // 8. Vaccinations
    if (Array.isArray(cloudData.vaccinations) && cloudData.vaccinations.length > 0) {
      this.vaccinations = cloudData.vaccinations.map((v: any) => ({
        id: v._id || v.id,
        puppyId: v.puppyId,
        vaccineName: v.vaccineName || v.name || 'Vaccine',
        administeredDate: v.administeredDate,
        nextDueDate: v.nextDueDate || v.dueDate || '',
        vetClinic: v.vetClinic || 'City Vet',
        status: v.status || 'up_to_date',
        lotNumber: v.lotNumber,
        notes: v.notes,
      }));
    }

    // 9. Medications
    if (Array.isArray(cloudData.medications) && cloudData.medications.length > 0) {
      this.medications = cloudData.medications.map((m: any) => ({
        id: m._id || m.id,
        puppyId: m.puppyId,
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        startDate: m.startDate,
        reminderTime: m.reminderTime,
        active: m.active ?? true,
        notes: m.notes,
      }));
    }

    // 10. Appointments
    if (Array.isArray(cloudData.appointments) && cloudData.appointments.length > 0) {
      this.appointments = cloudData.appointments.map((a: any) => ({
        id: a._id || a.id,
        puppyId: a.puppyId,
        title: a.title,
        clinic: a.clinic,
        date: a.date,
        time: a.time,
        reason: a.reason,
        status: a.status || 'scheduled',
        doctor: a.doctor,
        notes: a.notes,
      }));
    }

    // 11. Expenses
    if (Array.isArray(cloudData.expenses) && cloudData.expenses.length > 0) {
      this.expenses = cloudData.expenses.map((e: any) => ({
        id: e._id || e.id,
        puppyId: e.puppyId,
        title: e.title,
        category: e.category,
        amount: e.amount,
        date: e.date,
        vendor: e.vendor,
        notes: e.notes,
      }));
    }

    // 12. Documents
    if (Array.isArray(cloudData.documents) && cloudData.documents.length > 0) {
      this.documents = cloudData.documents.map((d: any) => ({
        id: d._id || d.id,
        puppyId: d.puppyId,
        title: d.title,
        category: d.category,
        date: d.date,
        fileType: d.fileType,
        fileSize: d.fileSize,
        notes: d.notes,
      }));
    }

    // 13. Behavior Logs
    if (Array.isArray(cloudData.behaviorLogs) && cloudData.behaviorLogs.length > 0) {
      this.behaviorLogs = cloudData.behaviorLogs.map((b: any) => ({
        id: b._id || b.id,
        puppyId: b.puppyId,
        behaviorType: b.behaviorType,
        timestamp: b.timestamp,
        severity: b.severity || 'mild',
        trigger: b.trigger,
        whatHelped: b.whatHelped,
        notes: b.notes,
      }));
    }

    // 14. Grooming Tasks
    if (Array.isArray(cloudData.groomingTasks) && cloudData.groomingTasks.length > 0) {
      this.groomingTasks = cloudData.groomingTasks.map((g: any) => ({
        id: g._id || g.id,
        puppyId: g.puppyId,
        type: g.type,
        label: g.label,
        lastDone: g.lastDone,
        nextDue: g.nextDue,
        frequencyDays: g.frequencyDays,
      }));
    }

    // 15. Socialization
    if (Array.isArray(cloudData.socialization) && cloudData.socialization.length > 0) {
      this.socialization = cloudData.socialization.map((s: any) => ({
        id: s._id || s.id,
        category: s.category,
        title: s.title,
        description: s.description,
        status: s.status,
        lastUpdated: s.lastUpdated,
        notes: s.notes,
      }));
    }

    // 16. Journal
    if (Array.isArray(cloudData.journalEntries) && cloudData.journalEntries.length > 0) {
      this.journal = cloudData.journalEntries.map((j: any) => ({
        id: j._id || j.id,
        puppyId: j.puppyId,
        title: j.title,
        date: j.date,
        notes: j.notes,
        mediaUrl: j.mediaUrl,
        milestoneBadge: j.milestoneBadge,
      }));
    }

    // 17. Training Lessons Status
    if (Array.isArray(cloudData.trainingLessons) && cloudData.trainingLessons.length > 0) {
      const lessonMap = new Map(cloudData.trainingLessons.map((l: any) => [l.lessonId, l]));
      this.trainingLessons = INITIAL_TRAINING_CURRICULUM.map((lesson) => {
        const cloudLesson: any = lessonMap.get(lesson.id);
        if (cloudLesson) {
          return {
            ...lesson,
            completed: cloudLesson.completed,
            mastered: cloudLesson.mastered,
            lastPracticed: cloudLesson.lastPracticed,
          };
        }
        return lesson;
      });
    }

    // 18. Notifications
    if (Array.isArray(cloudData.notifications) && cloudData.notifications.length > 0) {
      this.notifications = cloudData.notifications.map((n: any) => ({
        id: n._id || n.id,
        title: n.title,
        message: n.message,
        category: n.category,
        timestamp: n.timestamp,
        read: n.read,
      }));
    }

    // 19. AI Messages
    if (Array.isArray(cloudData.aiMessages) && cloudData.aiMessages.length > 0) {
      this.aiMessages = cloudData.aiMessages.map((m: any) => ({
        id: m._id || m.id,
        sender: m.sender as 'user' | 'assistant',
        text: m.text,
        timestamp: m.timestamp,
      }));
    }

    // 20. Family Members
    if (Array.isArray(cloudData.familyMembers) && cloudData.familyMembers.length > 0) {
      this.family = cloudData.familyMembers.map((f: any) => ({
        id: f._id || f.id,
        name: f.name,
        email: f.email,
        role: f.role as any,
        avatarUrl: f.avatarUrl,
        dateAdded: f.dateAdded,
      }));
    }

    this.persistUserCache();
    this.notifyListeners();
  }

  // Puppies
  getPuppies(): PuppyProfile[] {
    return this.puppies;
  }

  getPuppy(): PuppyProfile | null {
    return this.getActivePuppy();
  }

  getActivePuppy(): PuppyProfile | null {
    if (this.puppies.length === 0) return null;
    return this.puppies.find((p) => p.id === this.activePuppyId) || this.puppies[0] || null;
  }

  setActivePuppyId(id: string): void {
    this.activePuppyId = id;
    this.settings.activePuppyId = id;
    this.persistUserCache();
    this.notifyListeners();
    syncSettingsToConvex(this.settings).catch(() => {});
  }

  savePuppy(puppy: PuppyProfile): void {
    const index = this.puppies.findIndex((p) => p.id === puppy.id || p.name === puppy.name);
    if (index >= 0) {
      this.puppies[index] = puppy;
    } else {
      this.puppies.push(puppy);
    }
    this.activePuppyId = puppy.id;
    this.persistUserCache();
    this.notifyListeners();
    syncPuppyToConvex(puppy).catch(() => {});
  }

  // Tasks
  getTasks(): TaskItem[] {
    return this.tasks;
  }

  saveTasks(tasks: TaskItem[]): void {
    this.tasks = tasks;
    this.persistUserCache();
    this.notifyListeners();
  }

  toggleTask(taskId: string): TaskItem[] {
    let taskTitle = '';
    let targetCompleted = false;

    this.tasks = this.tasks.map((t) => {
      if (t.id === taskId) {
        taskTitle = t.title;
        targetCompleted = !t.completed;
        return {
          ...t,
          completed: targetCompleted,
          skipped: false,
          completedAt: targetCompleted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
        };
      }
      return t;
    });

    this.persistUserCache();
    this.notifyListeners();

    if (taskTitle) {
      toggleTaskInConvex(taskTitle, targetCompleted).catch(() => {});
    }

    return this.tasks;
  }

  skipTask(taskId: string): TaskItem[] {
    let taskTitle = '';
    this.tasks = this.tasks.map((t) => {
      if (t.id === taskId) {
        taskTitle = t.title;
        return { ...t, skipped: true, completed: false };
      }
      return t;
    });

    this.persistUserCache();
    this.notifyListeners();

    if (taskTitle) {
      skipTaskInConvex(taskTitle).catch(() => {});
    }

    return this.tasks;
  }

  addTask(task: Omit<TaskItem, 'id'>): TaskItem {
    const newTask: TaskItem = {
      ...task,
      id: `task-${Date.now()}`,
    };
    this.tasks.push(newTask);
    this.persistUserCache();
    this.notifyListeners();
    syncTaskToConvex(newTask).catch(() => {});
    return newTask;
  }

  // Potty logs
  getPottyLogs(): PottyLog[] {
    return this.pottyLogs;
  }

  addPottyLog(log: Omit<PottyLog, 'id'>): PottyLog {
    const newLog: PottyLog = { ...log, id: `potty-${Date.now()}` };
    this.pottyLogs.unshift(newLog);
    this.persistUserCache();
    this.notifyListeners();
    syncPottyLogToConvex(newLog).catch(() => {});
    return newLog;
  }

  deletePottyLog(id: string): void {
    this.pottyLogs = this.pottyLogs.filter((p) => p.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  // Sleep logs
  getSleepLogs(): SleepLog[] {
    return this.sleepLogs;
  }

  addSleepLog(log: Omit<SleepLog, 'id'>): SleepLog {
    const newLog: SleepLog = { ...log, id: `sleep-${Date.now()}` };
    this.sleepLogs.unshift(newLog);
    this.persistUserCache();
    this.notifyListeners();
    syncSleepLogToConvex(newLog).catch(() => {});
    return newLog;
  }

  deleteSleepLog(id: string): void {
    this.sleepLogs = this.sleepLogs.filter((s) => s.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  // Feeding logs
  getFeedingLogs(): FeedingLog[] {
    return this.feedingLogs;
  }

  addFeedingLog(log: Omit<FeedingLog, 'id'>): FeedingLog {
    const newLog: FeedingLog = { ...log, id: `feed-${Date.now()}` };
    this.feedingLogs.unshift(newLog);
    this.persistUserCache();
    this.notifyListeners();
    syncFeedingLogToConvex(newLog).catch(() => {});
    return newLog;
  }

  deleteFeedingLog(id: string): void {
    this.feedingLogs = this.feedingLogs.filter((f) => f.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  // Walk logs
  getWalkLogs(): WalkLog[] {
    return this.walkLogs;
  }

  addWalkLog(log: Omit<WalkLog, 'id'>): WalkLog {
    const newLog: WalkLog = { ...log, id: `walk-${Date.now()}` };
    this.walkLogs.unshift(newLog);
    this.persistUserCache();
    this.notifyListeners();
    syncWalkLogToConvex(newLog).catch(() => {});
    return newLog;
  }

  deleteWalkLog(id: string): void {
    this.walkLogs = this.walkLogs.filter((w) => w.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  // Training
  getTrainingLessons(): TrainingLesson[] {
    return this.trainingLessons;
  }

  saveTrainingLessons(lessons: TrainingLesson[]): void {
    this.trainingLessons = lessons;
    this.persistUserCache();
    this.notifyListeners();
  }

  updateLessonStatus(lessonId: string, completed: boolean, mastered: boolean): TrainingLesson[] {
    this.trainingLessons = this.trainingLessons.map((l) => {
      if (l.id === lessonId) {
        return {
          ...l,
          completed,
          mastered,
          lastPracticed: new Date().toISOString().split('T')[0],
        };
      }
      return l;
    });

    this.persistUserCache();
    this.notifyListeners();

    const activePup = this.getActivePuppy();
    if (activePup) {
      syncTrainingLessonToConvex(activePup.id, lessonId, completed, mastered).catch(() => {});
    }

    return this.trainingLessons;
  }

  // Health records
  getVaccinations(): VaccinationRecord[] {
    return this.vaccinations;
  }

  addVaccination(v: Omit<VaccinationRecord, 'id'>): VaccinationRecord {
    const newVac: VaccinationRecord = { ...v, id: `vac-${Date.now()}` };
    this.vaccinations.push(newVac);
    this.persistUserCache();
    this.notifyListeners();
    syncVaccinationToConvex(newVac).catch(() => {});
    return newVac;
  }

  deleteVaccination(id: string): void {
    this.vaccinations = this.vaccinations.filter((v) => v.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  getMedications(): MedicationRecord[] {
    return this.medications;
  }

  addMedication(m: Omit<MedicationRecord, 'id'>): MedicationRecord {
    const newMed: MedicationRecord = { ...m, id: `med-${Date.now()}` };
    this.medications.push(newMed);
    this.persistUserCache();
    this.notifyListeners();
    syncMedicationToConvex(newMed).catch(() => {});
    return newMed;
  }

  deleteMedication(id: string): void {
    this.medications = this.medications.filter((m) => m.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  getAppointments(): VetAppointment[] {
    return this.appointments;
  }

  addAppointment(a: Omit<VetAppointment, 'id'>): VetAppointment {
    const newApt: VetAppointment = { ...a, id: `apt-${Date.now()}` };
    this.appointments.push(newApt);
    this.persistUserCache();
    this.notifyListeners();
    syncAppointmentToConvex(newApt).catch(() => {});
    return newApt;
  }

  deleteAppointment(id: string): void {
    this.appointments = this.appointments.filter((a) => a.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  // Expenses
  getExpenses(): ExpenseRecord[] {
    return this.expenses;
  }

  addExpense(e: Omit<ExpenseRecord, 'id'>): ExpenseRecord {
    const newExp: ExpenseRecord = { ...e, id: `exp-${Date.now()}` };
    this.expenses.unshift(newExp);
    this.persistUserCache();
    this.notifyListeners();
    syncExpenseToConvex(newExp).catch(() => {});
    return newExp;
  }

  deleteExpense(id: string): void {
    this.expenses = this.expenses.filter((e) => e.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  // Documents
  getDocuments(): DocumentRecord[] {
    return this.documents;
  }

  addDocument(d: Omit<DocumentRecord, 'id'>): DocumentRecord {
    const newDoc: DocumentRecord = { ...d, id: `doc-${Date.now()}` };
    this.documents.unshift(newDoc);
    this.persistUserCache();
    this.notifyListeners();
    syncDocumentToConvex(newDoc).catch(() => {});
    return newDoc;
  }

  deleteDocument(id: string): void {
    this.documents = this.documents.filter((d) => d.id !== id);
    this.persistUserCache();
    this.notifyListeners();
    removeDocumentFromConvex(id).catch(() => {});
  }

  // Behavior
  getBehaviorLogs(): BehaviorIncident[] {
    return this.behaviorLogs;
  }

  addBehaviorIncident(b: Omit<BehaviorIncident, 'id'>): BehaviorIncident {
    const newBeh: BehaviorIncident = { ...b, id: `beh-${Date.now()}` };
    this.behaviorLogs.unshift(newBeh);
    this.persistUserCache();
    this.notifyListeners();
    syncBehaviorLogToConvex(newBeh).catch(() => {});
    return newBeh;
  }

  // Grooming & Socialization
  getGroomingTasks(): GroomingTask[] {
    return this.groomingTasks;
  }

  saveGroomingTasks(tasks: GroomingTask[]): void {
    this.groomingTasks = tasks;
    this.persistUserCache();
    this.notifyListeners();
    const activePup = this.getActivePuppy();
    if (activePup) {
      syncGroomingTasksToConvex(activePup.id, tasks).catch(() => {});
    }
  }

  getSocialization(): SocializationItem[] {
    return this.socialization;
  }

  updateSocializationStatus(id: string, status: any, notes?: string): SocializationItem[] {
    let updatedItem: SocializationItem | null = null;
    this.socialization = this.socialization.map((item) => {
      if (item.id === id) {
        const itemUpdated = {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
        updatedItem = itemUpdated;
        return itemUpdated;
      }
      return item;
    });

    this.persistUserCache();
    this.notifyListeners();

    const activePup = this.getActivePuppy();
    if (activePup && updatedItem) {
      syncSocializationToConvex(activePup.id, updatedItem).catch(() => {});
    }

    return this.socialization;
  }

  // Journal
  getJournal(): JournalEntry[] {
    return this.journal;
  }

  addJournalEntry(j: Omit<JournalEntry, 'id'>): JournalEntry {
    const newEntry: JournalEntry = { ...j, id: `jrn-${Date.now()}` };
    this.journal.unshift(newEntry);
    this.persistUserCache();
    this.notifyListeners();
    syncJournalEntryToConvex(newEntry).catch(() => {});
    return newEntry;
  }

  deleteJournalEntry(id: string): void {
    this.journal = this.journal.filter((j) => j.id !== id);
    this.persistUserCache();
    this.notifyListeners();
  }

  // Family
  getFamily(): FamilyMember[] {
    return this.family;
  }

  addFamilyMember(m: Omit<FamilyMember, 'id'>): FamilyMember {
    const newMember: FamilyMember = { ...m, id: `fam-${Date.now()}` };
    this.family.push(newMember);
    this.persistUserCache();
    this.notifyListeners();
    const activePup = this.getActivePuppy();
    syncFamilyMemberToConvex({
      puppyId: activePup?.id,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      avatarUrl: newMember.avatarUrl,
      dateAdded: newMember.dateAdded,
    }).catch(() => {});
    return newMember;
  }

  removeFamilyMember(id: string): void {
    this.family = this.family.filter((f) => f.id !== id);
    this.persistUserCache();
    this.notifyListeners();
    removeFamilyMemberFromConvex(id).catch(() => {});
  }

  // Notifications
  getNotifications(): NotificationItem[] {
    return this.notifications;
  }

  markNotificationRead(id: string): void {
    this.notifications = this.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.persistUserCache();
    this.notifyListeners();
    syncNotificationReadToConvex(id).catch(() => {});
  }

  markAllNotificationsRead(): void {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
    this.persistUserCache();
    this.notifyListeners();
    syncAllNotificationsReadToConvex().catch(() => {});
  }

  // AI Chat
  getAIMessages(): AIMessage[] {
    return this.aiMessages;
  }

  saveAIMessages(messages: AIMessage[]): void {
    this.aiMessages = messages;
    this.persistUserCache();
    this.notifyListeners();
    const activePup = this.getActivePuppy();
    if (activePup) {
      syncAIMessagesToConvex(activePup.id, messages).catch(() => {});
    }
  }

  addAIMessage(msg: AIMessage): void {
    this.aiMessages.push(msg);
    this.persistUserCache();
    this.notifyListeners();
    const activePup = this.getActivePuppy();
    if (activePup) {
      syncAIMessageToConvex(activePup.id, msg).catch(() => {});
    }
  }

  // User Settings
  getSettings(): UserSettingsData {
    return this.settings;
  }

  saveSettings(newSettings: Partial<UserSettingsData>): UserSettingsData {
    this.settings = { ...this.settings, ...newSettings };
    this.persistUserCache();
    this.notifyListeners();
    syncSettingsToConvex(this.settings).catch(() => {});
    return this.settings;
  }

  // Session
  getSession(): UserSession {
    return SEED_SESSION;
  }

  saveSession(session: UserSession): void {
    // Session is handled via Clerk
  }

  // Clear active session on Sign-out (Crucial: DOES NOT DELETE CLOUD DATA)
  clearActiveSession(): void {
    this.currentUserId = null;
    this.hasHydratedFromConvex = false;
    this.resetToDefaults();
  }

  clearAll(): void {
    this.resetToDefaults();
  }

  resetAll(): void {
    this.resetToDefaults();
  }

  resetToDefaults(): void {
    this.puppies = [SEED_PUPPY];
    this.activePuppyId = SEED_PUPPY.id;
    this.tasks = [...SEED_TASKS];
    this.pottyLogs = [...SEED_POTTY_LOGS];
    this.sleepLogs = [...SEED_SLEEP_LOGS];
    this.feedingLogs = [...SEED_FEEDING_LOGS];
    this.walkLogs = [...SEED_WALK_LOGS];
    this.trainingLessons = [...INITIAL_TRAINING_CURRICULUM];
    this.vaccinations = [...SEED_VACCINATIONS];
    this.medications = [...SEED_MEDICATIONS];
    this.appointments = [...SEED_APPOINTMENTS];
    this.expenses = [...SEED_EXPENSES];
    this.documents = [...SEED_DOCUMENTS];
    this.behaviorLogs = [...SEED_BEHAVIOR_LOGS];
    this.groomingTasks = [...SEED_GROOMING_TASKS];
    this.socialization = [...SEED_SOCIALIZATION];
    this.journal = [...SEED_JOURNAL];
    this.family = [...SEED_FAMILY];
    this.notifications = [...SEED_NOTIFICATIONS];
    this.aiMessages = [...SEED_AI_MESSAGES];
    this.settings = { ...DEFAULT_SETTINGS };
    this.persistUserCache();
    this.notifyListeners();
  }

  // Export data as JSON
  exportDataJSON(): string {
    const data = {
      puppy: this.getActivePuppy(),
      tasks: this.getTasks(),
      potty: this.getPottyLogs(),
      sleep: this.getSleepLogs(),
      feeding: this.getFeedingLogs(),
      walks: this.getWalkLogs(),
      training: this.getTrainingLessons(),
      vaccinations: this.getVaccinations(),
      medications: this.getMedications(),
      appointments: this.getAppointments(),
      expenses: this.getExpenses(),
      documents: this.getDocuments(),
      behavior: this.getBehaviorLogs(),
      socialization: this.getSocialization(),
      journal: this.getJournal(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString(),
      version: '2.0.0-convex',
    };
    return JSON.stringify(data, null, 2);
  }

  // Generate .ICS Calendar File
  generateICSFile(puppyName: string): string {
    const appointments = this.getAppointments();
    const tasks = this.getTasks().filter((t) => t.category === 'health' || t.category === 'training');

    let ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PupLume//AI Puppy Manager//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${puppyName} - PupLume Schedule`,
    ];

    appointments.forEach((apt) => {
      const dt = apt.date.replace(/-/g, '');
      const timeClean = apt.time.replace(/[^0-9]/g, '').padEnd(4, '0');
      ics.push(
        'BEGIN:VEVENT',
        `UID:apt-${apt.id}@puplume.app`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART:${dt}T${timeClean}00Z`,
        `SUMMARY:${apt.title} - ${puppyName}`,
        `DESCRIPTION:${apt.reason}. Doctor: ${apt.doctor || 'Vet'}. Clinic: ${apt.clinic}`,
        `LOCATION:${apt.clinic}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });

    tasks.forEach((t) => {
      const dt = t.date.replace(/-/g, '');
      ics.push(
        'BEGIN:VEVENT',
        `UID:task-${t.id}@puplume.app`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART:${dt}T090000Z`,
        `SUMMARY:[PupLume] ${t.title}`,
        `DESCRIPTION:${t.description || ''}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });

    ics.push('END:VCALENDAR');
    return ics.join('\r\n');
  }

  clearSession(): void {
    this.clearActiveSession();
  }
}

export const storage = new StorageManager();
