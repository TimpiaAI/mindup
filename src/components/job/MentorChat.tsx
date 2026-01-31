'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button, Card, Icon } from '@/components/ui';
import { getMentorForJob, getMentorResponse } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { generateId } from '@/lib/utils';

interface MentorChatProps {
  jobId: number;
}

const quickQuestions = [
  { id: 'day', label: 'Ce faci într-o zi?' },
  { id: 'salary', label: 'Salariu?' },
  { id: 'interview', label: 'Interviu?' },
  { id: 'learn', label: 'Ce să învăț?' }
];

export function MentorChat({ jobId }: MentorChatProps) {
  const mentor = getMentorForJob(jobId);
  const { chatMessages, addChatMessage } = useAppStore();
  const messages = chatMessages[jobId] || [];
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: generateId(),
      role: 'user' as const,
      content: text,
      timestamp: new Date()
    };
    addChatMessage(jobId, userMessage);
    setInput('');

    // Simulate AI typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get AI response
    const response = getMentorResponse(jobId, text);
    const mentorMessage = {
      id: generateId(),
      role: 'mentor' as const,
      content: response,
      timestamp: new Date()
    };
    addChatMessage(jobId, mentorMessage);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Show greeting if no messages
  const showGreeting = messages.length === 0;

  return (
    <Card className="overflow-hidden">
      {/* Mentor header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#F1F5F9]">
        <div className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center">
          <Icon name={mentor?.avatar || 'user'} size={20} className="text-[#2563EB]" />
        </div>
        <div>
          <div className="font-medium text-[#0F172A]">{mentor?.name || 'Mentor AI'}</div>
          <div className="text-xs text-[#64748B]">
            {mentor?.role} @ {mentor?.company} • {mentor?.years} ani experiență
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto mb-4 space-y-3">
        {showGreeting && mentor && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F1F5F9] rounded-[4px] p-3"
          >
            <p className="text-sm text-[#334155] whitespace-pre-line">
              {mentor.responses.greeting}
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-[4px] p-3 ${
                msg.role === 'user'
                  ? 'bg-[#2563EB] text-white ml-8'
                  : 'bg-[#F1F5F9] text-[#334155] mr-8'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#F1F5F9] rounded-[4px] p-3 mr-8"
          >
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick questions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickQuestions.map((q) => (
          <button
            key={q.id}
            onClick={() => sendMessage(q.label)}
            className="px-3 py-1.5 text-xs font-medium bg-[#F1F5F9] text-[#334155] rounded-[4px] hover:bg-[#E2E8F0] transition-colors"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrie un mesaj..."
          className="flex-1 px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
        />
        <Button type="submit" disabled={!input.trim() || isTyping}>
          <Send size={16} />
        </Button>
      </form>
    </Card>
  );
}
