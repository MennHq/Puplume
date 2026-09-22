import React, { useState, useMemo } from 'react';
import { Search, Calendar, GraduationCap, DollarSign, Activity, FileText, ArrowRight, X } from 'lucide-react';
import { Modal } from './Modal';
import { storage } from '../../lib/storage';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return null;
    const q = query.toLowerCase();

    const tasks = storage.getTasks().filter(t => 
      t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))
    ).map(t => ({
      id: t.id,
      title: t.title,
      subtitle: `${t.time} • ${t.category}`,
      type: 'Task',
      icon: <Calendar className="w-4 h-4 text-emerald-600" />,
      targetView: 'tasks'
    }));

    const lessons = storage.getTrainingLessons().filter(l => 
      l.title.toLowerCase().includes(q) || l.goal.toLowerCase().includes(q) || l.moduleTitle.toLowerCase().includes(q)
    ).map(l => ({
      id: l.id,
      title: l.title,
      subtitle: `Academy: ${l.moduleTitle}`,
      type: 'Training',
      icon: <GraduationCap className="w-4 h-4 text-[#8B5E3C]" />,
      targetView: 'training'
    }));

    const appointments = storage.getAppointments().filter(a => 
      a.title.toLowerCase().includes(q) || a.clinic.toLowerCase().includes(q) || a.reason.toLowerCase().includes(q)
    ).map(a => ({
      id: a.id,
      title: a.title,
      subtitle: `${a.date} at ${a.time} • ${a.clinic}`,
      type: 'Appointment',
      icon: <Activity className="w-4 h-4 text-rose-600" />,
      targetView: 'health'
    }));

    const vaccines = storage.getVaccinations().filter(v => 
      v.vaccineName.toLowerCase().includes(q) || v.vetClinic.toLowerCase().includes(q)
    ).map(v => ({
      id: v.id,
      title: v.vaccineName,
      subtitle: `Due: ${v.nextDueDate} • ${v.vetClinic}`,
      type: 'Health',
      icon: <Activity className="w-4 h-4 text-rose-600" />,
      targetView: 'health'
    }));

    const expenses = storage.getExpenses().filter(e => 
      e.title.toLowerCase().includes(q) || e.vendor.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
    ).map(e => ({
      id: e.id,
      title: `${e.title} ($${e.amount.toFixed(2)})`,
      subtitle: `${e.date} • ${e.vendor} (${e.category})`,
      type: 'Expense',
      icon: <DollarSign className="w-4 h-4 text-amber-600" />,
      targetView: 'expenses'
    }));

    const documents = storage.getDocuments().filter(d => 
      d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
    ).map(d => ({
      id: d.id,
      title: d.title,
      subtitle: `${d.fileType} • ${d.fileSize}`,
      type: 'Document',
      icon: <FileText className="w-4 h-4 text-purple-600" />,
      targetView: 'documents'
    }));

    return [...tasks, ...lessons, ...appointments, ...vaccines, ...expenses, ...documents];
  }, [query]);

  const handleSelect = (view: string) => {
    onNavigate(view);
    onClose();
    setQuery('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Search" maxWidth="lg">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#766A63] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, vaccines, training drills, expenses..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-sm text-[#2C211B] focus:outline-none focus:border-[#8B5E3C] focus:bg-white"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#766A63] hover:text-[#2C211B]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suggested Quick Searches */}
        {!query && (
          <div className="space-y-2 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#766A63]">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Recall training',
                'Rabies vaccine',
                'Chewy food order',
                'City Vet',
                'Biting & Mouthing',
                'Crate schedule'
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-2.5 py-1 rounded-lg bg-[#F3E7DA] hover:bg-[#E8DDD3] text-xs text-[#5F3E29] font-medium transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {searchResults && (
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#766A63]">
                No records found matching "{query}".
              </div>
            ) : (
              searchResults.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item.targetView)}
                  className="p-3 rounded-xl border border-[#E8DDD3] bg-white hover:bg-[#FFF9F2] hover:border-[#8B5E3C]/40 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[#FFF9F2] border border-[#E8DDD3] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#2C211B] truncate">{item.title}</h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#F3E7DA] text-[#5F3E29] font-semibold flex-shrink-0">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#766A63] truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#766A63] group-hover:text-[#8B5E3C] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
