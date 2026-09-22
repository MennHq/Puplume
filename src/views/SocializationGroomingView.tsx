import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Check, 
  Plus, 
  Smile, 
  Meh, 
  Frown, 
  Volume2, 
  Scissors, 
  ShieldCheck, 
  Heart 
} from 'lucide-react';
import { PuppyProfile } from '../types';
import { Button } from '../components/ui/Button';

interface SocializationGroomingViewProps {
  puppy: PuppyProfile;
}

interface SocializationItem {
  id: string;
  category: 'people' | 'surfaces' | 'sounds' | 'environments';
  name: string;
  status: 'positive' | 'neutral' | 'needs_work' | 'unexposed';
  notes?: string;
}

interface GroomingItem {
  id: string;
  name: string;
  frequency: string;
  lastDone: string;
  cooperativeLevel: 'comfort' | 'tolerates' | 'training';
}

const INITIAL_SOCIAL_ITEMS: SocializationItem[] = [
  { id: 's1', category: 'people', name: 'Children playing outdoors', status: 'positive' },
  { id: 's2', category: 'people', name: 'Men wearing wide-brim hats', status: 'positive' },
  { id: 's3', category: 'people', name: 'Delivery drivers with cardboard boxes', status: 'neutral' },
  { id: 's4', category: 'people', name: 'People using wheelchairs / strollers', status: 'positive' },
  { id: 's5', category: 'surfaces', name: 'Hardwood & slippery tiles', status: 'positive' },
  { id: 's6', category: 'surfaces', name: 'Metal outdoor sewer grates', status: 'needs_work' },
  { id: 's7', category: 'surfaces', name: 'Wet grass & autumn leaves', status: 'positive' },
  { id: 's8', category: 'sounds', name: 'Household vacuum cleaner', status: 'needs_work' },
  { id: 's9', category: 'sounds', name: 'Thunderstorm & rain audio track', status: 'positive' },
  { id: 's10', category: 'sounds', name: 'Front doorbell chime', status: 'neutral' },
  { id: 's11', category: 'environments', name: 'Vet clinic waiting area', status: 'positive' },
  { id: 's12', category: 'environments', name: 'Short car ride with puppy harness', status: 'positive' },
  { id: 's13', category: 'environments', name: 'Dog-friendly patio cafe', status: 'neutral' }
];

const INITIAL_GROOMING_ITEMS: GroomingItem[] = [
  { id: 'g1', name: 'Daily Coat Brush (Slicker Brush)', frequency: 'Daily (5 min)', lastDone: 'Today, 8:45 AM', cooperativeLevel: 'comfort' },
  { id: 'g2', name: 'Tooth Brushing (Enzymatic Paste)', frequency: 'Every 2 days', lastDone: 'Yesterday', cooperativeLevel: 'tolerates' },
  { id: 'g3', name: 'Nail Grinder Conditioning (Dremel)', frequency: 'Twice weekly', lastDone: '3 days ago', cooperativeLevel: 'training' },
  { id: 'g4', name: 'Paw Pad & Ear Inspection', frequency: 'Daily', lastDone: 'Today, 9:00 AM', cooperativeLevel: 'comfort' },
  { id: 'g5', name: 'Puppy Bath & Blowdry Desensitization', frequency: 'Monthly', lastDone: '10 days ago', cooperativeLevel: 'tolerates' }
];

export const SocializationGroomingView: React.FC<SocializationGroomingViewProps> = ({ puppy }) => {
  const [tab, setTab] = useState<'socialization' | 'grooming'>('socialization');
  const [socialItems, setSocialItems] = useState<SocializationItem[]>(INITIAL_SOCIAL_ITEMS);
  const [groomingItems, setGroomingItems] = useState<GroomingItem[]>(INITIAL_GROOMING_ITEMS);

  const handleCycleSocial = (id: string) => {
    setSocialItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus: Record<SocializationItem['status'], SocializationItem['status']> = {
          unexposed: 'positive',
          positive: 'neutral',
          neutral: 'needs_work',
          needs_work: 'positive'
        };
        return { ...item, status: nextStatus[item.status] };
      }
      return item;
    }));
  };

  const handleMarkGrooming = (id: string) => {
    setGroomingItems(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, lastDone: 'Just now!' };
      }
      return g;
    }));
  };

  const positiveCount = socialItems.filter(s => s.status === 'positive').length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E8DDD3] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#2C211B]">
              Socialization & Grooming
            </h1>
            <span className="text-xs font-bold bg-[#A8B59A] text-white px-2.5 py-0.5 rounded-full">
              Fear-Free Protocol
            </span>
          </div>
          <p className="text-xs text-[#766A63] mt-1">
            Build a confident, bulletproof dog through intentional exposure and low-stress handling.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('socialization')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              tab === 'socialization'
                ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]'
                : 'bg-white text-[#766A63] border-[#E8DDD3] hover:bg-[#FFF9F2]'
            }`}
          >
            Socialization ({positiveCount}/{socialItems.length})
          </button>
          <button
            onClick={() => setTab('grooming')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              tab === 'grooming'
                ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]'
                : 'bg-white text-[#766A63] border-[#E8DDD3] hover:bg-[#FFF9F2]'
            }`}
          >
            Grooming & Handling
          </button>
        </div>
      </div>

      {tab === 'socialization' && (
        <div className="space-y-5">
          {/* Socialization Info Box */}
          <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#E8DDD3] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#8B5E3C] flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#2C211B]">The Critical 16-Week Socialization Window</strong>
              <p className="text-[#766A63] mt-0.5 leading-relaxed">
                Socialization is NOT simply letting dogs run up to {puppy.name}. It means creating calm, positive, neutral associations with novel sounds, textures, and strange sights. Click any item to toggle its reaction status!
              </p>
            </div>
          </div>

          {/* Social items categorized */}
          {(['people', 'surfaces', 'sounds', 'environments'] as const).map(cat => (
            <div key={cat} className="bg-white rounded-2xl border border-[#E8DDD3] p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] mb-3 capitalize">
                {cat} Exposure Checklist
              </h3>

              <div className="space-y-2">
                {socialItems.filter(i => i.category === cat).map(item => {
                  const badgeMap = {
                    positive: { text: 'Confident / Happy', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                    neutral: { text: 'Neutral / Calm', color: 'bg-amber-100 text-amber-800 border-amber-200' },
                    needs_work: { text: 'Needs Desensitization', color: 'bg-rose-100 text-rose-800 border-rose-200' },
                    unexposed: { text: 'Not Exposed', color: 'bg-stone-100 text-stone-700 border-stone-200' }
                  };
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCycleSocial(item.id)}
                      className="p-3 rounded-xl border border-[#E8DDD3] hover:border-[#8B5E3C]/40 bg-[#FFF9F2]/50 hover:bg-[#FFF9F2] transition-colors flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="text-xs font-bold text-[#2C211B]">{item.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeMap[item.status].color}`}>
                        {badgeMap[item.status].text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'grooming' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#E8DDD3] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#8B5E3C] flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#2C211B]">Cooperative Care & Body Touch</strong>
              <p className="text-[#766A63] mt-0.5 leading-relaxed">
                By conditioning nail trims, ear cleaning, and mouth checks now with high-value lick mats, {puppy.name} will never fear the vet or groomer table.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {groomingItems.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#E8DDD3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h3 className="text-sm font-bold text-[#2C211B]">{item.name}</h3>
                  <p className="text-xs text-[#766A63] mt-0.5">
                    Recommended: {item.frequency} • Last Done: <strong>{item.lastDone}</strong>
                  </p>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#8B5E3C] bg-[#FFF9F2] px-2 py-0.5 rounded-md border border-[#E8DDD3] mt-1.5">
                    Cooperative state: {item.cooperativeLevel}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMarkGrooming(item.id)}
                  leftIcon={<Check className="w-4 h-4" />}
                >
                  Mark Completed Today
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
