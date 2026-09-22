import React, { useState } from 'react';
import { 
  Heart, 
  Plus, 
  Calendar, 
  Sparkles, 
  Camera, 
  Trash2, 
  Award, 
  Share2 
} from 'lucide-react';
import { PuppyProfile } from '../types';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface PuppyJournalViewProps {
  puppy: PuppyProfile;
}

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  milestone?: string;
  photoUrl?: string;
}

const INITIAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j1',
    date: 'Yesterday',
    title: 'First full night sleeping through! 🌙',
    body: 'Max slept from 10:15 PM all the way to 6:30 AM without a single whine or accident! Put the white noise machine right by his crate and gave him a frozen Kong filled with pumpkin puree.',
    milestone: '8-Hour Sleep Milestone',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'j2',
    date: '3 days ago',
    title: 'Zero indoor accidents for 48 hours!',
    body: 'Taking him out on the 25-minute schedule suggested by PupLume paid off. He walked right to the back door and tapped the bell on his own.',
    milestone: 'Bell Training Breakthrough'
  },
  {
    id: 'j3',
    date: '1 week ago',
    title: 'Puppy kindergarten playdate with a Corgi',
    body: 'Practiced soft play bows and took breaks whenever excitement spiked. His bite inhibition is getting so much gentler!',
    photoUrl: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80'
  }
];

export const PuppyJournalView: React.FC<PuppyJournalViewProps> = ({ puppy }) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('puplume_journal_entries');
    return saved ? JSON.parse(saved) : INITIAL_ENTRIES;
  });
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [milestone, setMilestone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: 'Today',
      title,
      body,
      milestone: milestone || undefined,
      photoUrl: photoUrl || undefined
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('puplume_journal_entries', JSON.stringify(updated));
    setIsAddOpen(false);
    setTitle('');
    setBody('');
    setMilestone('');
    setPhotoUrl('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E8DDD3] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#2C211B]">
              {puppy.name}’s Memory Book & Journal
            </h1>
            <span className="text-xs font-bold bg-[#F3E7DA] text-[#5F3E29] px-2.5 py-0.5 rounded-full">
              {entries.length} Memories
            </span>
          </div>
          <p className="text-xs text-[#766A63] mt-1">
            Capture puppy milestones, cute quirks, funny moments, and puppyhood breakthroughs.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Journal Entry
        </Button>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-5 rounded-3xl bg-white border border-[#E8DDD3] shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#8B5E3C] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {entry.date}
              </span>

              {entry.milestone && (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1 border border-amber-200">
                  <Award className="w-3 h-3 text-amber-700" />
                  {entry.milestone}
                </span>
              )}
            </div>

            <h3 className="text-base font-extrabold text-[#2C211B]">{entry.title}</h3>
            <p className="text-xs sm:text-sm text-[#5F3E29] leading-relaxed whitespace-pre-line">
              {entry.body}
            </p>

            {entry.photoUrl && (
              <div className="rounded-2xl overflow-hidden max-h-64 border border-[#E8DDD3]">
                <img src={entry.photoUrl} alt={entry.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Journal Memory">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
              Title / Milestone
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mastered the 'Down' command!"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-sm focus:outline-none focus:border-[#8B5E3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
              Milestone Tag (Optional)
            </label>
            <input
              type="text"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              placeholder="e.g. Crate Training Victory"
              className="w-full px-3.5 py-2 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-xs focus:outline-none focus:border-[#8B5E3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
              What happened?
            </label>
            <textarea
              rows={3}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write the sweet details, what treats worked, how happy you felt..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-xs focus:outline-none focus:border-[#8B5E3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-xs focus:outline-none focus:border-[#8B5E3C]"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Save Memory
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
