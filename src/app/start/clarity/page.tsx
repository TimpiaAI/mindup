'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OnboardingLayout } from '@/components/onboarding';
import { useAppStore } from '@/lib/store';
import { CLARITY_TRIGGERS, MOCK_PROFILE } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function ClarityPage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [selected, setSelected] = useState(profile.clarityTrigger || '');

  // Pre-fill with mock data for demo
  useEffect(() => {
    if (!selected) {
      setSelected(MOCK_PROFILE.clarityTrigger);
      setProfile({ clarityTrigger: MOCK_PROFILE.clarityTrigger });
    }
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    setProfile({ clarityTrigger: id });
  };

  const handleNext = () => {
    router.push('/start/skills');
  };

  const canContinue = selected.length > 0;

  return (
    <OnboardingLayout
      step={11}
      totalSteps={13}
      title="Când simți că ești cel mai bun?"
      subtitle="Ce activitate îți dă cel mai mult sens și claritate?"
      backHref="/start/free-time"
      canContinue={canContinue}
      onNext={handleNext}
    >
      <div className="space-y-2">
        {CLARITY_TRIGGERS.map((trigger, index) => (
          <motion.button
            key={trigger.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSelect(trigger.id)}
            className={cn(
              'w-full p-4 border rounded-[4px] text-left transition-all duration-150',
              'hover:border-[#2563EB]',
              selected === trigger.id
                ? 'border-[#2563EB] bg-[#EFF6FF]'
                : 'border-[#CBD5E1] bg-white'
            )}
          >
            <span className="text-sm font-medium text-[#0F172A]">{trigger.label}</span>
          </motion.button>
        ))}
      </div>
    </OnboardingLayout>
  );
}
