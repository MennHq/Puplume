import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  Utensils, 
  Moon, 
  DollarSign, 
  Activity,
  Trash2,
  HelpCircle
} from 'lucide-react';
import { PuppyProfile, AIMessage, AIActionSuggestion } from '../types';
import { storage } from '../lib/storage';
import { Button } from '../components/ui/Button';
import { PupLumeLogo } from '../components/common/PupLumeLogo';

interface AIAssistantViewProps {
  puppy: PuppyProfile;
  onActionTriggered?: (msg: string) => void;
}

const STARTER_PROMPTS = [
  'Why is Max biting so much?',
  'What should Max do today?',
  'When is Max’s next vaccine?',
  'Create a potty-training plan.',
  'Why won’t Max settle in the crate?',
  'Summarize Max’s progress this week.'
];

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ puppy, onActionTriggered }) => {
  const [messages, setMessages] = useState<AIMessage[]>(storage.getAIMessages());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [executedActions, setExecutedActions] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = storage.subscribe(() => {
      setMessages(storage.getAIMessages());
    });
    return unsub;
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setInput('');

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    storage.saveAIMessages(updated);
    setIsLoading(true);

    try {
      const birthDate = new Date(puppy.birthDate);
      const ageWeeks = Math.max(1, Math.floor((new Date().getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)));

      const payload = {
        message: text,
        puppyContext: {
          name: puppy.name,
          breed: puppy.breed,
          ageWeeks,
          weightLbs: puppy.weightLbs,
          temperament: puppy.temperament,
          recentPottySummary: '86% outdoor reliability, 3 outdoor logs today, 1 indoor slip yesterday',
          recentSleepSummary: '8.5h uninterrupted night sleep, 1.5h morning nap',
          upcomingTasks: 'Recall Training at 10:30 AM, Sniff walk at 11:00 AM',
          upcomingVet: 'Puppy 16-Week Booster & Rabies Exam on Oct 12 with Dr. Vance at City Vet'
        }
      };

      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('AI request failed');

      const data = await res.json();

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions
      };

      const finalMessages = [...updated, aiMsg];
      setMessages(finalMessages);
      storage.saveAIMessages(finalMessages);
    } catch (err) {
      console.error('Error calling AI endpoint:', err);
      // Fallback message
      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `I've analyzed ${puppy.name}'s daily schedule. For a ${puppy.breed} at this stage, focusing on positive reinforcement and short 5-minute drills works best. Let me know if you'd like to log a potty event or adjust today's nap windows.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const finalMessages = [...updated, aiMsg];
      setMessages(finalMessages);
      storage.saveAIMessages(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteAction = (action: AIActionSuggestion) => {
    const p = action.payload || {};

    if (action.type === 'CREATE_TASK') {
      storage.addTask({
        puppyId: puppy.id,
        title: p.title || action.title,
        category: p.category || 'training',
        time: p.time || '02:00 PM',
        durationMin: p.durationMin || 15,
        completed: false,
        skipped: false,
        period: 'afternoon',
        date: new Date().toISOString().split('T')[0]
      });
    } else if (action.type === 'CREATE_APPOINTMENT') {
      storage.addAppointment({
        puppyId: puppy.id,
        title: p.title || action.title,
        clinic: p.clinic || puppy.vetClinic || 'City Vet Animal Hospital',
        date: p.date || new Date().toISOString().split('T')[0],
        time: p.time || '11:00 AM',
        reason: p.reason || 'Veterinary checkup',
        status: 'scheduled'
      });
    } else if (action.type === 'LOG_POTTY') {
      storage.addPottyLog({
        puppyId: puppy.id,
        type: p.type || 'pee',
        location: p.location || 'outdoor',
        timestamp: new Date().toISOString(),
        notes: 'Logged via AI Assistant'
      });
    } else if (action.type === 'LOG_FEEDING') {
      storage.addFeedingLog({
        puppyId: puppy.id,
        mealType: p.mealType || 'lunch',
        amountCups: p.amountCups || 0.75,
        foodBrand: puppy.dietaryRestrictions || 'Puppy kibble',
        timestamp: new Date().toISOString()
      });
    } else if (action.type === 'LOG_SLEEP') {
      const dur = p.durationMin || 60;
      storage.addSleepLog({
        puppyId: puppy.id,
        type: p.type || 'nap',
        startTime: new Date(Date.now() - dur * 60000).toISOString(),
        endTime: new Date().toISOString(),
        durationMin: dur,
        notes: 'Logged via AI'
      });
    } else if (action.type === 'ADD_EXPENSE') {
      storage.addExpense({
        puppyId: puppy.id,
        title: p.title || action.title,
        category: p.category || 'other',
        amount: p.amount || 25.00,
        date: new Date().toISOString().split('T')[0],
        vendor: 'Local Store'
      });
    }

    setExecutedActions(prev => ({ ...prev, [action.id]: true }));
    if (onActionTriggered) {
      onActionTriggered(`Executed: ${action.title}`);
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear chat history with PupLume?')) {
      const reset = [
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant' as const,
          text: `Chat reset. I'm ready to help with ${puppy.name}'s training, schedule, or potty rhythm!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      setMessages(reset);
      storage.saveAIMessages(reset);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-145px)] sm:h-[calc(100vh-120px)] max-w-4xl mx-auto pb-4">
      {/* Top Banner with Puppy Context */}
      <div className="bg-white rounded-2xl border border-[#E8DDD3] p-3.5 sm:p-4 mb-3 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#8B5E3C]/10 text-[#8B5E3C]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold text-[#2C211B] flex items-center gap-1.5">
              PupLume AI Co-Pilot
              <span className="text-[10px] font-bold bg-[#F3E7DA] text-[#5F3E29] px-1.5 py-0.2 rounded-md">
                Active Context: {puppy.name}
              </span>
            </h2>
            <p className="text-[11px] text-[#766A63]">
              Grounds advice in positive canine psychology, age-appropriate biology, and your daily logs
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 text-[#766A63] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
          title="Clear chat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Medical Safety Disclaimer Alert */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-2 text-[11px] text-amber-900 flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Veterinary Guardrail:</strong> PupLume provides educational canine advice. For severe symptoms, vomiting, or poisoning, always consult your licensed veterinarian directly.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-1 space-y-3.5 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-[#FFF9F2] border border-[#E8DDD3] flex items-center justify-center text-[#8B5E3C] flex-shrink-0 shadow-xs">
                <PupLumeLogo variant="icon" size="sm" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-[#8B5E3C] text-white rounded-tr-xs'
                  : 'bg-white border border-[#E8DDD3] text-[#2C211B] rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-line prose-sm">{msg.text}</div>

              {/* Action Proposal Cards */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-[#E8DDD3] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Proposed Action
                  </span>

                  {msg.suggestedActions.map((action) => {
                    const isDone = executedActions[action.id];
                    return (
                      <div
                        key={action.id}
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all ${
                          isDone
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-[#FFF9F2] border-[#8B5E3C]/30 text-[#2C211B]'
                        }`}
                      >
                        <div>
                          <h5 className="text-xs font-bold flex items-center gap-1.5">
                            {action.title}
                          </h5>
                          <p className="text-[11px] text-[#766A63] mt-0.5">{action.summary}</p>
                        </div>

                        {isDone ? (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Added to PupLume
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleExecuteAction(action)}
                            className="text-xs"
                          >
                            Confirm Action
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <span
                className={`text-[10px] mt-1.5 block text-right ${
                  msg.sender === 'user' ? 'text-white/70' : 'text-[#766A63]'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-[#5F3E29] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#766A63] p-2">
            <PupLumeLogo variant="icon" size="sm" />
            <span className="animate-pulse font-medium">PupLume is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Pills */}
      <div className="py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-nowrap">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#FFF9F2] hover:bg-[#F3E7DA] text-[#5F3E29] border border-[#E8DDD3] whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative flex items-center gap-2 mt-1"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask anything about ${puppy.name}... (e.g. "Create potty plan", "Why is Max biting?")`}
          className="w-full pl-4 pr-12 py-3 rounded-2xl border border-[#E8DDD3] bg-white text-sm text-[#2C211B] shadow-xs focus:outline-none focus:border-[#8B5E3C]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 p-2 rounded-xl bg-[#8B5E3C] hover:bg-[#5F3E29] disabled:opacity-40 text-white transition-colors cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
