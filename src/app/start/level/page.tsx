'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
  const { user, setUser, demoMode } = useAppStore();
  const [level, setLevel] = useState<string>(user.level || '');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const demoStarted = useRef(false);

  // Demo mode: auto-select and auto-navigate
  useEffect(() => {
    if (demoMode && !demoStarted.current) {
      demoStarted.current = true;
      const runDemo = async () => {
        setIsAutoFilling(true);
        await new Promise(resolve => setTimeout(resolve, 600));

        setLevel(MOCK_USER.level);
        setUser({ level: MOCK_USER.level });

        setIsAutoFilling(false);
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push('/start/cv-choice');
      };
      runDemo();
    } else if (!demoMode && !level) {
      setLevel(MOCK_USER.level);
      setUser({ level: MOCK_USER.level });
    }
  }, [demoMode]);

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
      totalSteps={13}
      title="Ce faci acum?"
      subtitle="Selectează situația ta actuală"
      backHref="/start/location"
      canContinue={canContinue}
      onNext={handleNext}
    >
      <AnimatePresence>
        {demoMode && isAutoFilling && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-[#F0FDF4] border border-[#16A34A]/20 rounded-[4px] flex items-center gap-2"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Sparkles size={18} className="text-[#16A34A]" />
            </motion.div>
            <span className="text-sm text-[#16A34A] font-medium">Demo automat în desfășurare...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3">
        {levels.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => !isAutoFilling && handleSelect(item.id)}
            disabled={isAutoFilling}
            className={cn(
              'p-4 border rounded-[4px] text-left transition-all duration-150',
              'hover:border-[#2563EB]',
              level === item.id
                ? 'border-[#2563EB] bg-[#EFF6FF]'
                : 'border-[#CBD5E1] bg-white',
              isAutoFilling && 'cursor-not-allowed opacity-70'
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
