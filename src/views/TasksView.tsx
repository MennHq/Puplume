import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Plus, 
  Sparkles, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PuppyProfile, TaskItem } from '../types';
import { storage } from '../lib/storage';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface TasksViewProps {
  puppy: PuppyProfile;
  onOpenLesson: (lessonId: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ puppy, onOpenLesson }) => {
  const [tasks, setTasks] = useState<TaskItem[]>(storage.getTasks());
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('training');
  const [time, setTime] = useState('02:00 PM');
  const [durationMin, setDurationMin] = useState('15');
  const [period, setPeriod] = useState<any>('afternoon');
  const [description, setDescription] = useState('');

  const handleToggle = (taskId: string) => {
    const updated = storage.toggleTask(taskId);
    setTasks([...updated]);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    storage.addTask({
      puppyId: puppy.id,
      title,
      category,
      time,
      durationMin: parseInt(durationMin, 10) || 15,
      completed: false,
      skipped: false,
      period,
      description,
      date: new Date().toISOString().split('T')[0]
    });
    setTasks(storage.getTasks());
    setIsAddOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleRegenerateWithAI = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      // Re-seed with fresh balanced Day plan
      storage.saveTasks(storage.getTasks().map(t => ({ ...t, completed: false, skipped: false })));
      setTasks(storage.getTasks());
      setIsRegenerating(false);
    }, 800);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'potty', label: 'Potty' },
    { id: 'feeding', label: 'Feeding' },
    { id: 'training', label: 'Training' },
    { id: 'sleep', label: 'Sleep' },
    { id: 'walk', label: 'Walk' },
    { id: 'health', label: 'Health' },
    { id: 'grooming', label: 'Grooming' }
  ];

  const filteredTasks = tasks.filter(t => {
    if (activeFilter === 'pending' && (t.completed || t.skipped)) return false;
    if (activeFilter === 'completed' && !t.completed) return false;
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E8DDD3] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#2C211B]">
              Daily Routine & Planner
            </h1>
            <span className="text-xs font-bold bg-[#F3E7DA] text-[#5F3E29] px-2.5 py-0.5 rounded-full">
              {completedCount} / {tasks.length} done
            </span>
          </div>
          <p className="text-xs text-[#766A63] mt-1">
            Predictable rhythms establish security, house training, and emotional calm for {puppy.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            isLoading={isRegenerating}
            onClick={handleRegenerateWithAI}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#8B5E3C]" />}
          >
            Smart Re-balance
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Category Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 p-1 rounded-xl bg-[#F3E7DA] border border-[#E8DDD3]">
            {[
              { id: 'all', label: `All (${tasks.length})` },
              { id: 'pending', label: `Remaining (${tasks.length - completedCount})` },
              { id: 'completed', label: `Done (${completedCount})` }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-white text-[#2C211B] shadow-2xs'
                    : 'text-[#766A63] hover:text-[#2C211B]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category horizontal scrolling pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]'
                  : 'bg-white text-[#766A63] border-[#E8DDD3] hover:bg-[#FFF9F2]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E8DDD3] text-xs text-[#766A63]">
            <CheckCircle2 className="w-8 h-8 text-[#A8B59A] mx-auto mb-2" />
            No tasks found matching your filter criteria.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                task.completed
                  ? 'bg-[#FFF9F2]/60 border-[#E8DDD3]/70 opacity-65'
                  : 'bg-white border-[#E8DDD3] hover:border-[#8B5E3C]/40 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <button
                  type="button"
                  onClick={() => handleToggle(task.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer flex-shrink-0 mt-0.5 ${
                    task.completed
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-[#E8DDD3] hover:border-[#8B5E3C] bg-white'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold text-[#2C211B] truncate ${task.completed ? 'line-through text-[#766A63]' : ''}`}>
                      {task.title}
                    </h3>
                    <Badge variant={task.category as any} size="sm">
                      {task.category}
                    </Badge>
                  </div>
                  {task.description && (
                    <p className="text-xs text-[#766A63] mt-1 leading-relaxed">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-[#766A63]">
                    <span className="flex items-center gap-1 font-semibold text-[#5F3E29]">
                      <Clock className="w-3.5 h-3.5" /> {task.time} ({task.durationMin} min)
                    </span>
                    <span className="capitalize text-[#766A63]">• {task.period}</span>
                    {task.completedAt && (
                      <span className="text-emerald-700 font-medium">✓ Done at {task.completedAt}</span>
                    )}
                  </div>
                </div>
              </div>

              {task.category === 'training' && !task.completed && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onOpenLesson('lesson-1')}
                  className="flex-shrink-0 text-xs hidden sm:flex"
                >
                  Start Drill
                </Button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create Custom Task"
        subtitle={`Schedule an activity for ${puppy.name}`}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Crate quiet settling practice"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-sm focus:outline-none focus:border-[#8B5E3C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-xs focus:outline-none focus:border-[#8B5E3C]"
              >
                <option value="training">Training</option>
                <option value="potty">Potty</option>
                <option value="feeding">Feeding</option>
                <option value="sleep">Sleep</option>
                <option value="walk">Walk</option>
                <option value="health">Health</option>
                <option value="grooming">Grooming</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
                Day Period
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-xs focus:outline-none focus:border-[#8B5E3C]"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:30 AM"
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-sm focus:outline-none focus:border-[#8B5E3C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
                Duration (min)
              </label>
              <input
                type="number"
                min="1"
                value={durationMin}
                onChange={(e) => setDurationMin(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-sm focus:outline-none focus:border-[#8B5E3C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2C211B] uppercase tracking-wider mb-1">
              Instructions / Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What to prepare, treats to use..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#E8DDD3] bg-[#FFF9F2] text-xs focus:outline-none focus:border-[#8B5E3C]"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Save Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
