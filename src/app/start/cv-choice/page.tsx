'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Icon } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const options = [
  {
    id: 'yes',
    label: 'Da, am CV',
    description: 'Îl voi încărca și AI-ul va extrage datele',
    icon: 'document'
  },
  {
    id: 'no',
    label: 'Nu, nu am CV',
    description: 'Voi răspunde la câteva întrebări și AI-ul îl va genera',
    icon: 'sparkles'
  }
];

export default function CVChoicePage() {
  const router = useRouter();
  const { setUser, demoMode } = useAppStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const demoStarted = useRef(false);

  // Demo mode: auto-select and auto-navigate
  useEffect(() => {
    if (demoMode && !demoStarted.current) {
      demoStarted.current = true;
      const runDemo = async () => {
        setIsAutoFilling(true);
        await new Promise(resolve => setTimeout(resolve, 600));

        // Select "Nu, nu am CV" option
        setSelectedOption('no');
        setUser({ hasCV: false });

        setIsAutoFilling(false);
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push('/start/passions');
      };
      runDemo();
    }
  }, [demoMode]);

  const handleSelect = (hasCV: boolean) => {
    setSelectedOption(hasCV ? 'yes' : 'no');
    setUser({ hasCV });
    router.push('/start/passions');
  };

  return (
    <OnboardingLayout
      step={4}
      totalSteps={13}
      title="Ai un CV?"
      subtitle="Putem să extragem datele sau să-l generăm pentru tine"
      backHref="/start/level"
      canContinue={false}
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

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !isAutoFilling && handleSelect(option.id === 'yes')}
            disabled={isAutoFilling}
            className={cn(
              'w-full p-4 border rounded-[4px] text-left',
              'hover:border-[#2563EB] transition-colors duration-150',
              'flex items-start gap-4',
              selectedOption === option.id
                ? 'border-[#2563EB] bg-[#EFF6FF]'
                : 'border-[#CBD5E1]',
              isAutoFilling && 'cursor-not-allowed opacity-70'
            )}
          >
            <Icon name={option.icon} size={24} className="text-[#2563EB]" />
            <div>
              <div className="font-medium text-[#0F172A]">{option.label}</div>
              <div className="text-sm text-[#64748B] mt-0.5">{option.description}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </OnboardingLayout>
  );
}
