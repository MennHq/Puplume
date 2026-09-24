import React, { useState, useEffect } from 'react';
import { useUser, useClerk, SignInButton, SignUpButton } from '@clerk/react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { PuppyProfile } from './types';
import { storage } from './lib/storage';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Views
import { OnboardingWizard } from './views/OnboardingWizard';
import { HomeScreen } from './views/HomeScreen';
import { TasksView } from './views/TasksView';
import { AIAssistantView } from './views/AIAssistantView';
import { TrainingAcademyView } from './views/TrainingAcademyView';
import { PottyTrackerView } from './views/PottyTrackerView';
import { HealthCenterView } from './views/HealthCenterView';
import { ExpensesView } from './views/ExpensesView';
import { DocumentVaultView } from './views/DocumentVaultView';
import { SocializationGroomingView } from './views/SocializationGroomingView';
import { PuppyJournalView } from './views/PuppyJournalView';
import { PuppyProfileView } from './views/PuppyProfileView';
import { FamilySharingView } from './views/FamilySharingView';
import { SettingsView } from './views/SettingsView';
import { MoreMenuView } from './views/MoreMenuView';
import { Dog, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { clearUserDataInConvex } from './lib/convex';

export default function App() {
  const { isSignedIn, isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const [puppy, setPuppy] = useState<PuppyProfile | null>(() => storage.getPuppy());
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authoritative real-time data subscription from Convex scoped to user.id
  const cloudData = useQuery(
    api.app.getUserAppData,
    isSignedIn && user?.id ? { userId: user.id } : 'skip'
  );

  const syncUserMutation = useMutation(api.users.syncUser);

  // Set authenticated user on storage to isolate data across users
  useEffect(() => {
    storage.setAuthenticatedUser(user?.id ?? null);
  }, [user?.id]);

  // Sync user profile to Convex upon signing in
  useEffect(() => {
    if (isSignedIn && user?.id) {
      syncUserMutation({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName || 'Pup Parent',
        avatarUrl: user.imageUrl,
      }).catch((err) => console.debug('[App] syncUser error:', err));
    }
  }, [isSignedIn, user?.id, syncUserMutation]);

  // Reactive listener to storage changes
  useEffect(() => {
    const unsubscribe = storage.subscribe(() => {
      const current = storage.getPuppy();
      setPuppy(current ? { ...current } : null);
    });
    return unsubscribe;
  }, []);

  // Hydrate from Convex reactive cloud subscription (No fake data!)
  useEffect(() => {
    if (cloudData && user?.id) {
      if (cloudData.puppies && cloudData.puppies.length > 0) {
        storage.hydrateFromConvex(cloudData);
        const activePup = storage.getPuppy();
        setPuppy(activePup ? { ...activePup } : null);
      } else {
        const localPup = storage.getActivePuppy() || storage.getPuppy();
        if (localPup) {
          storage.syncFullStateToConvex(user.id);
          setPuppy(localPup);
        } else if (cloudData.settings?.hasCompletedOnboarding) {
          // Existing user who already completed onboarding
        } else {
          // Brand-new account with zero data (only if not already set locally)
          const current = storage.getPuppy();
          if (!current) {
            setPuppy(null);
          }
        }
      }
    }
  }, [cloudData, user?.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Loading authentication state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#8B5E3C] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-[#766A63]">Loading PupLume...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated: Clean, focused Clerk Sign-In screen (No fake data, no custom popups)
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8DDD3] p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F3E7DA] text-[#8B5E3C] flex items-center justify-center mx-auto mb-5 shadow-2xs">
            <Dog className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-[#2C211B] tracking-tight mb-2">
            PupLume
          </h1>
          <p className="text-sm text-[#766A63] mb-6 leading-relaxed">
            AI-powered puppy manager for routine planning, training curriculum, health tracking, and smart care.
          </p>

          <div className="space-y-3">
            <SignInButton mode="modal">
              <button className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-[#8B5E3C] text-white hover:bg-[#6D492F] transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-2">
                <span>Sign In to Your Account</span>
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="w-full py-3 px-4 rounded-xl text-sm font-semibold border border-[#E8DDD3] text-[#5F3E29] hover:bg-[#F3E7DA] transition-colors cursor-pointer flex items-center justify-center gap-2">
                <span>Create New Account</span>
              </button>
            </SignUpButton>
          </div>

          <div className="mt-8 pt-6 border-t border-[#F3E7DA] grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <Sparkles className="w-4 h-4 text-[#8B5E3C] mb-1" />
              <span className="text-[11px] font-semibold text-[#2C211B]">AI Assistant</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-4 h-4 text-[#8B5E3C] mb-1" />
              <span className="text-[11px] font-semibold text-[#2C211B]">Health & Care</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-[#8B5E3C] mb-1" />
              <span className="text-[11px] font-semibold text-[#2C211B]">Clerk Auth</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Waiting for user's cloud data to load before making routing decision
  if (cloudData === undefined && !puppy) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#8B5E3C] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-[#766A63]">Loading your puppy profile...</span>
        </div>
      </div>
    );
  }

  // Active puppy from state, storage, or cloud data
  const activePuppy: PuppyProfile | null = puppy || storage.getPuppy() || (cloudData?.puppies && cloudData.puppies.length > 0 ? {
    id: cloudData.puppies[0]._id,
    name: cloudData.puppies[0].name,
    breed: cloudData.puppies[0].breed,
    birthDate: cloudData.puppies[0].birthDate,
    sex: cloudData.puppies[0].sex as 'male' | 'female',
    weightLbs: cloudData.puppies[0].weightLbs,
    photoUrl: cloudData.puppies[0].photoUrl,
    temperament: cloudData.puppies[0].temperament,
    dietaryRestrictions: cloudData.puppies[0].dietaryRestrictions,
    favoriteTreat: cloudData.puppies[0].favoriteTreat,
    createdAt: cloudData.puppies[0].createdAt,
  } : null);

  // 4. Show onboarding only if user explicitly navigated to it, OR if user has no puppy profile yet
  if (!activePuppy || currentView === 'onboarding') {
    return (
      <OnboardingWizard
        userId={user?.id}
        onComplete={(newPuppy) => {
          setPuppy(newPuppy);
          setCurrentView('home');
          showToast(`Welcome ${newPuppy.name}! Your puppy's schedule is ready.`);
          if (user?.id) {
            storage.syncFullStateToConvex(user.id);
          }
        }}
        onCancel={() => {
          if (activePuppy) setCurrentView('home');
        }}
      />
    );
  }

  // 5. Authenticated with puppy profile: Full Application
  return (
    <AppLayout
      currentView={currentView}
      onNavigate={(view) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      puppy={activePuppy}
      onSelectLesson={(lessonId) => {
        setSelectedLessonId(lessonId);
        setCurrentView('academy');
      }}
      onOpenNewPuppyWizard={() => setCurrentView('onboarding')}
    >
      {/* Demo Profile Alert Banner if user still has placeholder Max */}
      {activePuppy.name === 'Max' && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Demo profile active:</strong> Set up your real puppy&apos;s schedule with our conversational AI Onboarding!
            </span>
          </div>
          <button
            onClick={async () => {
              if (user?.id) {
                await clearUserDataInConvex(user.id);
              }
              storage.clearAllUserData();
              setPuppy(null);
              setCurrentView('onboarding');
            }}
            className="px-3 py-1 bg-[#8B5E3C] hover:bg-[#6D492F] text-white font-bold rounded-lg transition-colors cursor-pointer shrink-0 text-xs shadow-xs"
          >
            Start Real AI Onboarding
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#2C211B] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-[#E8DDD3]/30">
          🐾 {toastMessage}
        </div>
      )}

      {/* Main View Router */}
      {currentView === 'home' && (
        <HomeScreen
          puppy={activePuppy}
          onNavigate={setCurrentView}
          onOpenSearch={() => {
            const searchBtn = document.getElementById('home-search-button');
            if (searchBtn) searchBtn.click();
          }}
          onOpenNotifications={() => {
            const notifBtn = document.getElementById('home-notifications-button');
            if (notifBtn) notifBtn.click();
          }}
          onOpenLesson={(lessonId) => {
            setSelectedLessonId(lessonId);
            setCurrentView('academy');
          }}
        />
      )}

      {currentView === 'tasks' && (
        <TasksView
          puppy={activePuppy}
          onOpenLesson={(lessonId) => {
            setSelectedLessonId(lessonId);
            setCurrentView('academy');
          }}
        />
      )}

      {currentView === 'ai' && (
        <AIAssistantView
          puppy={activePuppy}
          onActionTriggered={(msg) => showToast(msg)}
        />
      )}

      {currentView === 'academy' && (
        <TrainingAcademyView
          puppy={activePuppy}
          activeLessonId={selectedLessonId}
          onCloseLessonModal={() => setSelectedLessonId(null)}
        />
      )}

      {currentView === 'more' && (
        <MoreMenuView
          puppy={activePuppy}
          onNavigate={setCurrentView}
          onSignOut={async () => {
            storage.clearActiveSession();
            setPuppy(null);
            await signOut();
          }}
        />
      )}

      {currentView === 'potty' && (
        <PottyTrackerView puppy={activePuppy} />
      )}

      {currentView === 'health' && (
        <HealthCenterView puppy={activePuppy} />
      )}

      {currentView === 'expenses' && (
        <ExpensesView puppy={activePuppy} />
      )}

      {currentView === 'vault' && (
        <DocumentVaultView puppy={activePuppy} />
      )}

      {currentView === 'socialization' && (
        <SocializationGroomingView puppy={activePuppy} />
      )}

      {currentView === 'journal' && (
        <PuppyJournalView puppy={activePuppy} />
      )}

      {currentView === 'puppy' && (
        <PuppyProfileView
          puppy={activePuppy}
          onUpdatePuppy={(updated) => {
            setPuppy(updated);
            showToast(`${updated.name}'s profile updated!`);
          }}
        />
      )}

      {currentView === 'sharing' && (
        <FamilySharingView puppy={activePuppy} />
      )}

      {currentView === 'settings' && (
        <SettingsView
          puppy={activePuppy}
          onResetData={async () => {
            if (user?.id) {
              await clearUserDataInConvex(user.id);
            }
            storage.clearAllUserData();
            setPuppy(null);
            setCurrentView('onboarding');
            showToast('All data cleared. Welcome to AI Onboarding!');
          }}
        />
      )}
    </AppLayout>
  );
}
