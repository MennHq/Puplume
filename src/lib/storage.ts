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
import { syncPuppyToConvex, syncTaskToConvex, syncPottyLogToConvex } from './convex';

const STORAGE_KEYS = {
  PUPPIES: 'puplume_puppies_v1',
  ACTIVE_PUPPY_ID: 'puplume_active_puppy_id_v1',
  TASKS: 'puplume_tasks_v1',
  POTTY_LOGS: 'puplume_potty_logs_v1',
  SLEEP_LOGS: 'puplume_sleep_logs_v1',
  FEEDING_LOGS: 'puplume_feeding_logs_v1',
  WALK_LOGS: 'puplume_walk_logs_v1',
  TRAINING_LESSONS: 'puplume_training_lessons_v1',
  VACCINATIONS: 'puplume_vaccinations_v1',
  MEDICATIONS: 'puplume_medications_v1',
  APPOINTMENTS: 'puplume_appointments_v1',
  EXPENSES: 'puplume_expenses_v1',
  DOCUMENTS: 'puplume_documents_v1',
  BEHAVIOR_LOGS: 'puplume_behavior_logs_v1',
  GROOMING_TASKS: 'puplume_grooming_tasks_v1',
  SOCIALIZATION: 'puplume_socialization_v1',
  JOURNAL: 'puplume_journal_v1',
  FAMILY: 'puplume_family_v1',
  NOTIFICATIONS: 'puplume_notifications_v1',
  AI_CHAT: 'puplume_ai_chat_v1',
  SESSION: 'puplume_session_v1',
};

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
  },
  {
    id: 'potty-3',
    puppyId: 'pup-max-01',
    type: 'accident',
    location: 'indoor_accident',
    timestamp: new Date(Date.now() - 26 * 3600000).toISOString(),
    notes: 'Small pee near kitchen door after intense zoomies. Cleaned with enzymatic spray.'
  },
  {
    id: 'potty-4',
    puppyId: 'pup-max-01',
    type: 'poop',
    location: 'outdoor',
    timestamp: new Date(Date.now() - 28 * 3600000).toISOString(),
    notes: 'Great outdoor spot'
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
    notes: 'Registered to Sarah Miller with primary phone.'
  }
];

export const SEED_BEHAVIOR_LOGS: BehaviorIncident[] = [
  {
    id: 'beh-1',
    puppyId: 'pup-max-01',
    behaviorType: 'biting',
    timestamp: new Date(Date.now() - 18 * 3600000).toISOString(),
    severity: 'moderate',
    trigger: 'Evening 7:00 PM zoomies after dinner',
    whatHelped: 'Offered frozen braided washcloth, then tucked into crate for 45 min power nap. Woke up calm.',
    notes: 'Needle teeth on pant cuffs. Definitely was overtired.'
  },
  {
    id: 'beh-2',
    puppyId: 'pup-max-01',
    behaviorType: 'calm',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    severity: 'mild',
    trigger: 'Doorbell rang for Amazon package delivery',
    whatHelped: 'Asked for Sit + treat. Looked at door but did not bark!',
    notes: 'Huge improvement from last week!'
  }
];

export const SEED_GROOMING_TASKS: GroomingTask[] = [
  {
    id: 'groom-1',
    puppyId: 'pup-max-01',
    type: 'brush',
    label: 'Daily Coat Brush & Detangle',
    lastDone: '2026-09-20',
    nextDue: '2026-09-22',
    frequencyDays: 2
  },
  {
    id: 'groom-2',
    puppyId: 'pup-max-01',
    type: 'teeth',
    label: 'Enzyme Toothpaste & Finger Brush',
    lastDone: '2026-09-19',
    nextDue: '2026-09-22',
    frequencyDays: 3
  },
  {
    id: 'groom-3',
    puppyId: 'pup-max-01',
    type: 'nails',
    label: 'Nail Grinder / Tip Trim with Treats',
    lastDone: '2026-09-12',
    nextDue: '2026-09-26',
    frequencyDays: 14
  },
  {
    id: 'groom-4',
    puppyId: 'pup-max-01',
    type: 'bath',
    label: 'Puppy Oatmeal Bath & Blow-dry acclimatization',
    lastDone: '2026-09-08',
    nextDue: '2026-10-06',
    frequencyDays: 28
  }
];

export const SEED_SOCIALIZATION: SocializationItem[] = [
  {
    id: 'soc-1',
    category: 'People',
    title: 'People wearing large hats & sunglasses',
    description: 'Encounter humans with varied silhouettes without fear or barking',
    status: 'comfortable',
    lastUpdated: '2026-09-18'
  },
  {
    id: 'soc-2',
    category: 'People',
    title: 'Young children running & laughing',
    description: 'Remain calm on leash while children play nearby',
    status: 'introduced',
    lastUpdated: '2026-09-19',
    notes: 'Watched school playground from 50 feet away while eating liver treats'
  },
  {
    id: 'soc-3',
    category: 'Sounds',
    title: 'Vacuum cleaner running in room',
    description: 'Settle calmly with chew while household appliances operate',
    status: 'introduced',
    lastUpdated: '2026-09-17'
  },
  {
    id: 'soc-4',
    category: 'Surfaces',
    title: 'Wet grass, gravel, and metal storm grates',
    description: 'Walk confidently across unfamiliar tactile ground surfaces',
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
    text: "Hello Sarah! I'm PupLume, your AI puppy co-pilot. I'm actively tracking Max's routines, training, potty rhythm, and health milestones. How can I help you and Max today?",
    timestamp: '09:00 AM'
  }
];

export const SEED_SESSION: UserSession = {
  isAuthenticated: true,
  email: 'sarah.miller@example.com',
  name: 'Sarah Miller',
  plan: 'premium'
};

// Safe LocalStorage access helper
class StorageManager {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set error:', e);
    }
  }

  // Puppies
  getPuppies(): PuppyProfile[] {
    return this.get<PuppyProfile[]>(STORAGE_KEYS.PUPPIES, []);
  }

  getPuppy(): PuppyProfile | null {
    return this.getActivePuppy();
  }

  getActivePuppy(): PuppyProfile | null {
    const puppies = this.getPuppies();
    if (puppies.length === 0) return null;
    const activeId = this.get<string | null>(STORAGE_KEYS.ACTIVE_PUPPY_ID, null);
    return puppies.find(p => p.id === activeId) || puppies[0] || null;
  }

  setActivePuppyId(id: string): void {
    this.set(STORAGE_KEYS.ACTIVE_PUPPY_ID, id);
  }

  savePuppy(puppy: PuppyProfile): void {
    const list = this.getPuppies();
    const index = list.findIndex(p => p.id === puppy.id);
    if (index >= 0) {
      list[index] = puppy;
    } else {
      list.push(puppy);
    }
    this.set(STORAGE_KEYS.PUPPIES, list);
    this.setActivePuppyId(puppy.id);
    // Asynchronous background sync to Convex Realtime Cloud
    syncPuppyToConvex(puppy).catch(() => {});
  }

  // Tasks
  getTasks(): TaskItem[] {
    return this.get<TaskItem[]>(STORAGE_KEYS.TASKS, []);
  }

  saveTasks(tasks: TaskItem[]): void {
    this.set(STORAGE_KEYS.TASKS, tasks);
  }

  toggleTask(taskId: string): TaskItem[] {
    const tasks = this.getTasks();
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const completed = !t.completed;
        return {
          ...t,
          completed,
          skipped: false,
          completedAt: completed ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
        };
      }
      return t;
    });
    this.saveTasks(updated);
    return updated;
  }

  skipTask(taskId: string): TaskItem[] {
    const tasks = this.getTasks();
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, skipped: true, completed: false };
      }
      return t;
    });
    this.saveTasks(updated);
    return updated;
  }

  addTask(task: Omit<TaskItem, 'id'>): TaskItem {
    const tasks = this.getTasks();
    const newTask: TaskItem = {
      ...task,
      id: `task-${Date.now()}`
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
    syncTaskToConvex(newTask).catch(() => {});
    return newTask;
  }

  // Potty logs
  getPottyLogs(): PottyLog[] {
    return this.get<PottyLog[]>(STORAGE_KEYS.POTTY_LOGS, []);
  }

  addPottyLog(log: Omit<PottyLog, 'id'>): PottyLog {
    const logs = this.getPottyLogs();
    const newLog: PottyLog = { ...log, id: `potty-${Date.now()}` };
    logs.unshift(newLog);
    this.set(STORAGE_KEYS.POTTY_LOGS, logs);
    syncPottyLogToConvex(newLog).catch(() => {});
    return newLog;
  }

  // Sleep logs
  getSleepLogs(): SleepLog[] {
    return this.get<SleepLog[]>(STORAGE_KEYS.SLEEP_LOGS, []);
  }

  addSleepLog(log: Omit<SleepLog, 'id'>): SleepLog {
    const logs = this.getSleepLogs();
    const newLog: SleepLog = { ...log, id: `sleep-${Date.now()}` };
    logs.unshift(newLog);
    this.set(STORAGE_KEYS.SLEEP_LOGS, logs);
    return newLog;
  }

  // Feeding logs
  getFeedingLogs(): FeedingLog[] {
    return this.get<FeedingLog[]>(STORAGE_KEYS.FEEDING_LOGS, []);
  }

  addFeedingLog(log: Omit<FeedingLog, 'id'>): FeedingLog {
    const logs = this.getFeedingLogs();
    const newLog: FeedingLog = { ...log, id: `feed-${Date.now()}` };
    logs.unshift(newLog);
    this.set(STORAGE_KEYS.FEEDING_LOGS, logs);
    return newLog;
  }

  // Walk logs
  getWalkLogs(): WalkLog[] {
    return this.get<WalkLog[]>(STORAGE_KEYS.WALK_LOGS, []);
  }

  addWalkLog(log: Omit<WalkLog, 'id'>): WalkLog {
    const logs = this.getWalkLogs();
    const newLog: WalkLog = { ...log, id: `walk-${Date.now()}` };
    logs.unshift(newLog);
    this.set(STORAGE_KEYS.WALK_LOGS, logs);
    return newLog;
  }

  // Training
  getTrainingLessons(): TrainingLesson[] {
    return this.get<TrainingLesson[]>(STORAGE_KEYS.TRAINING_LESSONS, INITIAL_TRAINING_CURRICULUM);
  }

  saveTrainingLessons(lessons: TrainingLesson[]): void {
    this.set(STORAGE_KEYS.TRAINING_LESSONS, lessons);
  }

  updateLessonStatus(lessonId: string, completed: boolean, mastered: boolean): TrainingLesson[] {
    const lessons = this.getTrainingLessons();
    const updated = lessons.map(l => {
      if (l.id === lessonId) {
        return {
          ...l,
          completed,
          mastered,
          lastPracticed: new Date().toISOString().split('T')[0]
        };
      }
      return l;
    });
    this.saveTrainingLessons(updated);
    return updated;
  }

  // Health records
  getVaccinations(): VaccinationRecord[] {
    return this.get<VaccinationRecord[]>(STORAGE_KEYS.VACCINATIONS, []);
  }

  addVaccination(v: Omit<VaccinationRecord, 'id'>): VaccinationRecord {
    const list = this.getVaccinations();
    const newVac: VaccinationRecord = { ...v, id: `vac-${Date.now()}` };
    list.push(newVac);
    this.set(STORAGE_KEYS.VACCINATIONS, list);
    return newVac;
  }

  getMedications(): MedicationRecord[] {
    return this.get<MedicationRecord[]>(STORAGE_KEYS.MEDICATIONS, []);
  }

  addMedication(m: Omit<MedicationRecord, 'id'>): MedicationRecord {
    const list = this.getMedications();
    const newMed: MedicationRecord = { ...m, id: `med-${Date.now()}` };
    list.push(newMed);
    this.set(STORAGE_KEYS.MEDICATIONS, list);
    return newMed;
  }

  getAppointments(): VetAppointment[] {
    return this.get<VetAppointment[]>(STORAGE_KEYS.APPOINTMENTS, []);
  }

  addAppointment(a: Omit<VetAppointment, 'id'>): VetAppointment {
    const list = this.getAppointments();
    const newApt: VetAppointment = { ...a, id: `apt-${Date.now()}` };
    list.push(newApt);
    this.set(STORAGE_KEYS.APPOINTMENTS, list);
    return newApt;
  }

  // Expenses
  getExpenses(): ExpenseRecord[] {
    return this.get<ExpenseRecord[]>(STORAGE_KEYS.EXPENSES, []);
  }

  addExpense(e: Omit<ExpenseRecord, 'id'>): ExpenseRecord {
    const list = this.getExpenses();
    const newExp: ExpenseRecord = { ...e, id: `exp-${Date.now()}` };
    list.unshift(newExp);
    this.set(STORAGE_KEYS.EXPENSES, list);
    return newExp;
  }

  // Documents
  getDocuments(): DocumentRecord[] {
    return this.get<DocumentRecord[]>(STORAGE_KEYS.DOCUMENTS, []);
  }

  addDocument(d: Omit<DocumentRecord, 'id'>): DocumentRecord {
    const list = this.getDocuments();
    const newDoc: DocumentRecord = { ...d, id: `doc-${Date.now()}` };
    list.unshift(newDoc);
    this.set(STORAGE_KEYS.DOCUMENTS, list);
    return newDoc;
  }

  // Behavior
  getBehaviorLogs(): BehaviorIncident[] {
    return this.get<BehaviorIncident[]>(STORAGE_KEYS.BEHAVIOR_LOGS, []);
  }

  addBehaviorIncident(b: Omit<BehaviorIncident, 'id'>): BehaviorIncident {
    const list = this.getBehaviorLogs();
    const newBeh: BehaviorIncident = { ...b, id: `beh-${Date.now()}` };
    list.unshift(newBeh);
    this.set(STORAGE_KEYS.BEHAVIOR_LOGS, list);
    return newBeh;
  }

  // Grooming & Socialization
  getGroomingTasks(): GroomingTask[] {
    return this.get<GroomingTask[]>(STORAGE_KEYS.GROOMING_TASKS, []);
  }

  saveGroomingTasks(tasks: GroomingTask[]): void {
    this.set(STORAGE_KEYS.GROOMING_TASKS, tasks);
  }

  getSocialization(): SocializationItem[] {
    return this.get<SocializationItem[]>(STORAGE_KEYS.SOCIALIZATION, []);
  }

  updateSocializationStatus(id: string, status: any, notes?: string): SocializationItem[] {
    const list = this.getSocialization();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    this.set(STORAGE_KEYS.SOCIALIZATION, updated);
    return updated;
  }

  // Journal
  getJournal(): JournalEntry[] {
    return this.get<JournalEntry[]>(STORAGE_KEYS.JOURNAL, []);
  }

  addJournalEntry(j: Omit<JournalEntry, 'id'>): JournalEntry {
    const list = this.getJournal();
    const newEntry: JournalEntry = { ...j, id: `jrn-${Date.now()}` };
    list.unshift(newEntry);
    this.set(STORAGE_KEYS.JOURNAL, list);
    return newEntry;
  }

  // Family
  getFamily(): FamilyMember[] {
    return this.get<FamilyMember[]>(STORAGE_KEYS.FAMILY, []);
  }

  addFamilyMember(m: Omit<FamilyMember, 'id'>): FamilyMember {
    const list = this.getFamily();
    const newMember: FamilyMember = { ...m, id: `fam-${Date.now()}` };
    list.push(newMember);
    this.set(STORAGE_KEYS.FAMILY, list);
    return newMember;
  }

  // Notifications
  getNotifications(): NotificationItem[] {
    return this.get<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  }

  markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const updated = list.map(n => n.id === id ? { ...n, read: true } : n);
    this.set(STORAGE_KEYS.NOTIFICATIONS, updated);
  }

  markAllNotificationsRead(): void {
    const list = this.getNotifications();
    const updated = list.map(n => ({ ...n, read: true }));
    this.set(STORAGE_KEYS.NOTIFICATIONS, updated);
  }

  // AI Chat
  getAIMessages(): AIMessage[] {
    return this.get<AIMessage[]>(STORAGE_KEYS.AI_CHAT, SEED_AI_MESSAGES);
  }

  saveAIMessages(messages: AIMessage[]): void {
    this.set(STORAGE_KEYS.AI_CHAT, messages);
  }

  addAIMessage(msg: AIMessage): void {
    const list = this.getAIMessages();
    list.push(msg);
    this.saveAIMessages(list);
  }

  // Session
  getSession(): UserSession {
    return this.get<UserSession>(STORAGE_KEYS.SESSION, SEED_SESSION);
  }

  saveSession(session: UserSession): void {
    this.set(STORAGE_KEYS.SESSION, session);
  }

  // Clear all stored data
  clearAll(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Clear storage error:', e);
    }
  }

  // Reset to starter data
  resetAll(): void {
    this.clearAll();
  }

  resetToDefaults(): void {
    this.clearAll();
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
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    return JSON.stringify(data, null, 2);
  }

  // Generate .ICS Calendar File
  generateICSFile(puppyName: string): string {
    const appointments = this.getAppointments();
    const tasks = this.getTasks().filter(t => t.category === 'health' || t.category === 'training');

    let ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PupLume//AI Puppy Manager//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${puppyName} - PupLume Schedule`
    ];

    appointments.forEach(apt => {
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

    tasks.forEach(t => {
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
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
}

export const storage = new StorageManager();
