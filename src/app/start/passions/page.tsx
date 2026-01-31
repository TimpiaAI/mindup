'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OnboardingLayout } from '@/components/onboarding';
import { Icon } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { PASSIONS, MOCK_PROFILE } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function PassionsPage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [selected, setSelected] = useState<string[]>(profile.passions || []);

  // Pre-fill with mock data for demo
  useEffect(() => {
    if (selected.length === 0) {
      setSelected(MOCK_PROFILE.passions);
      setProfile({ passions: MOCK_PROFILE.passions });
    }
  }, []);

  const togglePassion = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(p => p !== id)
      : [...selected, id];
    setSelected(newSelected);
    setProfile({ passions: newSelected });
  };

  const handleNext = () => {
    router.push('/start/free-time');
  };

  const canContinue = selected.length >= 1;

  return (
    <OnboardingLayout
      step={5}
      totalSteps={8}
      title="Ce te pasionează?"
      subtitle="Selectează ce îți place să faci (minim 1)"
      backHref="/start/cv-choice"
      canContinue={canContinue}
      onNext={handleNext}
    >
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {PASSIONS.map((passion, index) => (
          <motion.button
            key={passion.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            onClick={() => togglePassion(passion.id)}
            className={cn(
              'p-3 border rounded-[4px] text-center transition-all duration-150',
              'hover:border-[#2563EB]',
              selected.includes(passion.id)
                ? 'border-[#2563EB] bg-[#EFF6FF]'
                : 'border-[#CBD5E1] bg-white'
            )}
          >
            <Icon name={passion.icon} size={24} className="mx-auto mb-1 text-[#2563EB]" />
            <span className="text-xs font-medium text-[#0F172A]">{passion.label}</span>
          </motion.button>
        ))}
      </div>
    </OnboardingLayout>
  );
}
