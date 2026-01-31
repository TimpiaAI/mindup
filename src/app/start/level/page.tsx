'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OnboardingLayout } from '@/components/onboarding';
import { Icon } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { MOCK_USER } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const levels = [
  { id: 'highschool', label: 'Elev de liceu', icon: 'backpack' },
  { id: 'student', label: 'Student', icon: 'graduation' },
  { id: 'graduate', label: 'Absolvent', icon: 'scroll' },
  { id: 'employed', label: 'Angajat', icon: 'briefcase' },
];

export default function LevelPage() {
  const router = useRouter();
  const { user, setUser } = useAppStore();
  const [level, setLevel] = useState<string>(user.level || '');

  // Pre-fill with mock data for demo
  useEffect(() => {
    if (!level) {
      setLevel(MOCK_USER.level);
      setUser({ level: MOCK_USER.level });
    }
  }, []);

  const handleSelect = (id: string) => {
    setLevel(id);
    setUser({ level: id as 'highschool' | 'student' | 'graduate' | 'employed' });
  };

  const handleNext = () => {
    router.push('/start/cv-choice');
  };

  const canContinue = level.length > 0;

  return (
    <OnboardingLayout
      step={3}
      totalSteps={8}
      title="Ce faci acum?"
      subtitle="Selectează situația ta actuală"
      backHref="/start/location"
      canContinue={canContinue}
      onNext={handleNext}
    >
      <div className="grid grid-cols-2 gap-3">
        {levels.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSelect(item.id)}
            className={cn(
              'p-4 border rounded-[4px] text-left transition-all duration-150',
              'hover:border-[#2563EB]',
              level === item.id
                ? 'border-[#2563EB] bg-[#EFF6FF]'
                : 'border-[#CBD5E1] bg-white'
            )}
          >
            <Icon name={item.icon} size={24} className="mb-2 text-[#2563EB]" />
            <span className="text-sm font-medium text-[#0F172A]">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </OnboardingLayout>
  );
}
