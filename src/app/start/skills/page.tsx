'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const { profile, setProfile, loadMockData } = useAppStore();
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>(profile.skills || []);
  const [activeCategory, setActiveCategory] = useState<'programming' | 'design' | 'business'>('programming');

  // Pre-fill with mock data for demo
  useEffect(() => {
    if (selectedSkills.length === 0) {
      setSelectedSkills(MOCK_PROFILE.skills);
      setProfile({ skills: MOCK_PROFILE.skills });
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
    // Load full mock data and go to loading screen
    loadMockData();
    router.push('/loading');
  };

  const canContinue = selectedSkills.length >= 1;

  const categories = [
    { id: 'programming', label: 'Programare' },
    { id: 'design', label: 'Design' },
    { id: 'business', label: 'Business' }
  ];

  return (
    <OnboardingLayout
      step={8}
      totalSteps={8}
      title="Ce skilluri ai?"
      subtitle="Selectează tehnologiile și uneltele pe care le cunoști"
      backHref="/start/clarity"
      nextLabel="Finalizează"
      canContinue={canContinue}
      onNext={handleNext}
    >
      {/* Category tabs */}
      <div className="flex gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as 'programming' | 'design' | 'business')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-[4px] transition-colors',
              activeCategory === cat.id
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
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
            {selectedSkills.map(skill => (
              <Badge key={skill.name} hasSkill>
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
}
