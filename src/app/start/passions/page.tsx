'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Icon } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { PASSIONS, MOCK_PROFILE } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function PassionsPage() {
  const router = useRouter();
  const { profile, setProfile, demoMode } = useAppStore();
  const [selected, setSelected] = useState<string[]>(profile.passions || []);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const demoStarted = useRef(false);

  // Demo mode: auto-select and auto-navigate
  useEffect(() => {
    if (demoMode && !demoStarted.current) {
      demoStarted.current = true;
      const runDemo = async () => {
        setIsAutoFilling(true);
        setSelected([]);

        // Add passions one by one
        for (let i = 0; i < MOCK_PROFILE.passions.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setSelected(prev => [...prev, MOCK_PROFILE.passions[i]]);
        }

        setProfile({ passions: MOCK_PROFILE.passions });
        setIsAutoFilling(false);

        await new Promise(resolve => setTimeout(resolve, 800));
        router.push('/start/experiences');
      };
      runDemo();
    } else if (!demoMode && selected.length === 0) {
      setSelected(MOCK_PROFILE.passions);
      setProfile({ passions: MOCK_PROFILE.passions });
    }
  }, [demoMode]);

  const togglePassion = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(p => p !== id)
      : [...selected, id];
    setSelected(newSelected);
    setProfile({ passions: newSelected });
  };

  const handleNext = () => {
    router.push('/start/experiences');
  };

  const canContinue = selected.length >= 1;

  return (
    <OnboardingLayout
      step={5}
      totalSteps={13}
      title="Ce te pasionează?"
      subtitle="Selectează ce îți place să faci (minim 1)"
      backHref="/start/cv-choice"
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

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {PASSIONS.map((passion, index) => (
          <motion.button
            key={passion.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            onClick={() => !isAutoFilling && togglePassion(passion.id)}
            disabled={isAutoFilling}
            className={cn(
              'p-3 border rounded-[4px] text-center transition-all duration-150',
              'hover:border-[#2563EB]',
              selected.includes(passion.id)
                ? 'border-[#2563EB] bg-[#EFF6FF]'
                : 'border-[#CBD5E1] bg-white',
              isAutoFilling && 'cursor-not-allowed'
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
