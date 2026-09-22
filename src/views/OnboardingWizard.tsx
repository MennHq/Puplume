import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Camera, Check, Dog, Heart, Calendar } from 'lucide-react';
import { PupLumeLogo } from '../components/common/PupLumeLogo';
import { Button } from '../components/ui/Button';
import { PuppyProfile } from '../types';
import { storage } from '../lib/storage';

interface OnboardingWizardProps {
  onComplete: (puppy: PuppyProfile) => void;
  onCancel?: () => void;
}

const PUPPY_PHOTO_PRESETS = [
  { label: 'Golden Retriever', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80' },
  { label: 'French Bulldog', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80' },
  { label: 'Labrador Retriever', url: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=400&q=80' },
  { label: 'Doodle / Poodle', url: 'https://images.unsplash.com/photo-1534361960057-19889db98a1e?auto=format&fit=crop&w=400&q=80' },
  { label: 'German Shepherd', url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=400&q=80' },
  { label: 'Corgi', url: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=400&q=80' }
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);

  // Form states
  const [name, setName] = useState('Max');
  const [photoUrl, setPhotoUrl] = useState(PUPPY_PHOTO_PRESETS[0].url);
  const [breed, setBreed] = useState('Golden Retriever');
  const [birthDate, setBirthDate] = useState('2026-06-15');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [weightLbs, setWeightLbs] = useState('24.2');
  const [primaryFocus, setPrimaryFocus] = useState('House Training & Crate');
  const [temperament, setTemperament] = useState('Gentle, curious, playful, food-motivated');
  const [foodBrand, setFoodBrand] = useState('Purina Pro Plan Large Breed Puppy');
  const [vetClinic, setVetClinic] = useState('City Vet Animal Hospital');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Calculate age in weeks
  const calculateWeeks = (dobStr: string) => {
    const dob = new Date(dobStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - dob.getTime());
    const weeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return isNaN(weeks) ? 14 : weeks;
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Complete
      setIsGeneratingPlan(true);
      setTimeout(() => {
        const puppy: PuppyProfile = {
          id: `pup-${Date.now()}`,
          name,
          breed,
          birthDate,
          sex,
          weightLbs: parseFloat(weightLbs) || 20,
          photoUrl,
          temperament,
          dietaryRestrictions: `${foodBrand}`,
          vetClinic,
          vetName: 'Dr. Eleanor Vance, DVM',
          vetPhone: '(555) 392-8819',
          allergies: 'None known',
          favoriteTreat: 'Chicken jerky and liver',
          createdAt: new Date().toISOString()
        };

        storage.savePuppy(puppy);
        setIsGeneratingPlan(false);
        onComplete(puppy);
      }, 1200);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between py-2">
        <PupLumeLogo variant="full" size="sm" />
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#766A63]">
          Step {step} of 5
        </div>
      </div>

      {/* Progress Track */}
      <div className="max-w-xl mx-auto w-full my-4 bg-[#E8DDD3] h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-[#8B5E3C] h-full transition-all duration-300 rounded-full"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      {/* Main Card */}
      <div className="max-w-xl mx-auto w-full bg-white rounded-3xl border border-[#E8DDD3] shadow-md p-6 sm:p-8 flex-1 flex flex-col justify-between my-2">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
                Step 1: Introduction
              </span>
              <h2 className="text-2xl font-extrabold text-[#2C211B] mt-1">
                What is your puppy’s name?
              </h2>
              <p className="text-xs text-[#766A63] mt-1">
                PupLume builds an individualized daily routine tailored to your puppy.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Puppy's Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Max, Luna, Milo"
                className="w-full text-lg font-bold px-4 py-3 rounded-2xl border border-[#E8DDD3] bg-[#FFF9F2] text-[#2C211B] focus:bg-white focus:outline-none focus:border-[#8B5E3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Choose or customize avatar
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {PUPPY_PHOTO_PRESETS.map((preset) => (
                  <div
                    key={preset.label}
                    onClick={() => {
                      setPhotoUrl(preset.url);
                      if (breed === 'Golden Retriever' && preset.label !== 'Golden Retriever') {
                        setBreed(preset.label);
                      }
                    }}
                    className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer aspect-square group transition-all ${
                      photoUrl === preset.url
                        ? 'border-[#8B5E3C] shadow-sm ring-2 ring-[#8B5E3C]/20'
                        : 'border-[#E8DDD3] hover:border-[#8B5E3C]/50 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-[#2C211B]/60 py-1 text-center text-[10px] text-white font-medium truncate px-1">
                      {preset.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
                Step 2: Breed & Age
              </span>
              <h2 className="text-2xl font-extrabold text-[#2C211B] mt-1">
                Tell us about {name}’s breed & birthday
              </h2>
              <p className="text-xs text-[#766A63] mt-1">
                Developmental milestones like bladder size, teething, and fear windows depend on exact age.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Breed / Mix
              </label>
              <input
                type="text"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Golden Retriever, Mini Goldendoodle, Frenchie"
                className="w-full px-4 py-3 rounded-2xl border border-[#E8DDD3] bg-[#FFF9F2] text-[#2C211B] focus:bg-white focus:outline-none focus:border-[#8B5E3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Birth Date
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#E8DDD3] bg-[#FFF9F2] text-[#2C211B] focus:bg-white focus:outline-none focus:border-[#8B5E3C]"
              />
              <div className="mt-2 text-xs font-semibold text-[#8B5E3C] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Current developmental age: <strong>{calculateWeeks(birthDate)} weeks old</strong></span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
                Step 3: Physical Details
              </span>
              <h2 className="text-2xl font-extrabold text-[#2C211B] mt-1">
                {name}’s weight & sex
              </h2>
              <p className="text-xs text-[#766A63] mt-1">
                Helps calculate accurate medication dosages and daily calorie targets.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Sex
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'male', label: 'Male' },
                  { id: 'female', label: 'Female' }
                ].map(item => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSex(item.id as any)}
                    className={`py-3 px-4 rounded-2xl border text-sm font-bold cursor-pointer transition-all ${
                      sex === item.id
                        ? 'bg-[#8B5E3C] text-white border-[#8B5E3C] shadow-xs'
                        : 'bg-[#FFF9F2] text-[#2C211B] border-[#E8DDD3] hover:bg-[#F3E7DA]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Current Weight (lbs)
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                placeholder="24.2"
                className="w-full px-4 py-3 rounded-2xl border border-[#E8DDD3] bg-[#FFF9F2] text-[#2C211B] focus:bg-white focus:outline-none focus:border-[#8B5E3C]"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
                Step 4: Temperament & Goals
              </span>
              <h2 className="text-2xl font-extrabold text-[#2C211B] mt-1">
                What are your biggest priorities right now?
              </h2>
              <p className="text-xs text-[#766A63] mt-1">
                PupLume will adapt today's daily checklist to focus on this area.
              </p>
            </div>

            <div className="space-y-2">
              {[
                'House Training & Potty Reliability',
                'Puppy Biting & Needle Teeth Redirection',
                'Crate Training & Whine-Free Nights',
                'Loose Leash Walking & Recall ("Rocket Come")',
                '12-Window Socialization Acclimatization'
              ].map((goal) => (
                <div
                  key={goal}
                  onClick={() => setPrimaryFocus(goal)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    primaryFocus === goal
                      ? 'bg-[#FFF9F2] border-[#8B5E3C] shadow-xs font-bold text-[#2C211B]'
                      : 'bg-white border-[#E8DDD3] text-[#766A63] hover:border-[#8B5E3C]/40'
                  }`}
                >
                  <span className="text-xs">{goal}</span>
                  {primaryFocus === goal && (
                    <span className="w-5 h-5 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Temperament notes
              </label>
              <input
                type="text"
                value={temperament}
                onChange={(e) => setTemperament(e.target.value)}
                placeholder="e.g. Friendly, playful, food-driven, prone to evening zoomies"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#E8DDD3] bg-[#FFF9F2] text-xs text-[#2C211B] focus:bg-white focus:outline-none focus:border-[#8B5E3C]"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
                Step 5: Nutrition & Vet
              </span>
              <h2 className="text-2xl font-extrabold text-[#2C211B] mt-1">
                Final Details for {name}
              </h2>
              <p className="text-xs text-[#766A63] mt-1">
                Connect your food and clinic so PupLume can track refills and appointments.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Puppy Food Brand / Formula
              </label>
              <input
                type="text"
                value={foodBrand}
                onChange={(e) => setFoodBrand(e.target.value)}
                placeholder="e.g. Purina Pro Plan Large Breed Puppy"
                className="w-full px-4 py-3 rounded-2xl border border-[#E8DDD3] bg-[#FFF9F2] text-[#2C211B] focus:bg-white focus:outline-none focus:border-[#8B5E3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-2">
                Primary Vet Clinic (optional)
              </label>
              <input
                type="text"
                value={vetClinic}
                onChange={(e) => setVetClinic(e.target.value)}
                placeholder="e.g. City Vet Animal Hospital"
                className="w-full px-4 py-3 rounded-2xl border border-[#E8DDD3] bg-[#FFF9F2] text-[#2C211B] focus:bg-white focus:outline-none focus:border-[#8B5E3C]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#E8DDD3] text-xs text-[#5F3E29] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#8B5E3C] flex-shrink-0 mt-0.5" />
              <div>
                <strong>Ready for your Day 1 Plan!</strong>
                <p className="text-[#766A63] mt-0.5 leading-relaxed">
                  PupLume will now generate an age-appropriate schedule combining potty countdowns, structured sleep, and 5-minute training drills for {name}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-[#E8DDD3] mt-6">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleBack}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            isLoading={isGeneratingPlan}
            onClick={handleNext}
            rightIcon={step < 5 ? <ArrowRight className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          >
            {step < 5 ? 'Continue' : `Build ${name}'s Plan`}
          </Button>
        </div>
      </div>
    </div>
  );
};
