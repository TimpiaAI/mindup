'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Badge } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { AVAILABLE_SKILLS, MOCK_PROFILE } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface SelectedSkill {
  name: string;
  level: string;
  category: string;
}

const skillLevels = ['beginner', 'intermediate', 'advanced'];

export default function SkillsPage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>(profile.skills || []);
  const [activeCategory, setActiveCategory] = useState<'programming' | 'design' | 'business'>('programming');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [showAutoFillHint, setShowAutoFillHint] = useState(true);
  const autoFillTriggered = useRef(false);

  // Auto-fill animation for demo
  const startAutoFill = async () => {
    if (autoFillTriggered.current) return;
    autoFillTriggered.current = true;
    setIsAutoFilling(true);
    setShowAutoFillHint(false);

    // Clear existing skills first
    setSelectedSkills([]);
    setProfile({ skills: [] });

    // Add skills one by one with animation
    const mockSkills = MOCK_PROFILE.skills;
    for (let i = 0; i < mockSkills.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setSelectedSkills(prev => [...prev, mockSkills[i]]);
    }

    setProfile({ skills: mockSkills });
    setIsAutoFilling(false);
  };

  // Pre-fill with mock data for demo (instant if already has data)
  useEffect(() => {
    if (profile.skills && profile.skills.length > 0) {
      setSelectedSkills(profile.skills);
      setShowAutoFillHint(false);
      autoFillTriggered.current = true;
    }
  }, []);

  const toggleSkill = (skill: string) => {
    const exists = selectedSkills.find(s => s.name === skill);
    if (exists) {
      const newSkills = selectedSkills.filter(s => s.name !== skill);
      setSelectedSkills(newSkills);
      setProfile({ skills: newSkills });
    } else {
      const newSkill = { name: skill, level: 'intermediate', category: activeCategory };
      const newSkills = [...selectedSkills, newSkill];
      setSelectedSkills(newSkills);
      setProfile({ skills: newSkills });
    }
  };

  const handleNext = () => {
    // Go to CV preview before finalizing
    router.push('/start/cv-preview');
  };

  const canContinue = selectedSkills.length >= 1;

  const categories = [
    { id: 'programming', label: 'Programare' },
    { id: 'design', label: 'Design' },
    { id: 'business', label: 'Business' }
  ];

  return (
    <OnboardingLayout
      step={12}
      totalSteps={13}
      title="Ce skilluri ai?"
      subtitle="Selectează tehnologiile și uneltele pe care le cunoști"
      backHref="/start/clarity"
      nextLabel="Preview CV"
      canContinue={canContinue}
      onNext={handleNext}
    >
      {/* Auto-fill hint */}
      <AnimatePresence>
        {showAutoFillHint && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            onClick={startAutoFill}
            disabled={isAutoFilling}
            className="w-full mb-4 p-3 bg-gradient-to-r from-[#EFF6FF] to-[#F5F3FF] border border-[#2563EB]/20 rounded-[4px] flex items-center justify-center gap-2 text-[#2563EB] hover:from-[#DBEAFE] hover:to-[#EDE9FE] transition-colors"
          >
            <Sparkles size={18} className="text-[#7C3AED]" />
            <span className="text-sm font-medium">
              Click pentru demo auto-completare
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Auto-filling indicator */}
      {isAutoFilling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-[#F0FDF4] border border-[#16A34A]/20 rounded-[4px] flex items-center gap-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={18} className="text-[#16A34A]" />
          </motion.div>
          <span className="text-sm text-[#16A34A] font-medium">
            Se adaugă skillurile automat...
          </span>
        </motion.div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as 'programming' | 'design' | 'business')}
            disabled={isAutoFilling}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-[4px] transition-colors',
              activeCategory === cat.id
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]',
              isAutoFilling && 'opacity-50 cursor-not-allowed'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2 mb-6">
        {AVAILABLE_SKILLS[activeCategory].map((skill, index) => {
          const isSelected = selectedSkills.some(s => s.name === skill);
          return (
            <motion.button
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => toggleSkill(skill)}
            >
              <Badge hasSkill={isSelected} className="cursor-pointer hover:opacity-80">
                {skill}
              </Badge>
            </motion.button>
          );
        })}
      </div>

      {/* Selected skills summary */}
      {selectedSkills.length > 0 && (
        <div className="pt-4 border-t border-[#F1F5F9]">
          <p className="text-xs text-[#64748B] mb-2">
            Skilluri selectate ({selectedSkills.length}):
          </p>
          <div className="flex flex-wrap gap-1">
            <AnimatePresence mode="popLayout">
              {selectedSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 25,
                    delay: isAutoFilling ? 0 : index * 0.02
                  }}
                >
                  <Badge hasSkill>
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
}
