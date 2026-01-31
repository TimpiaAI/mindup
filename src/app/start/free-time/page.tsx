'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { useAppStore } from '@/lib/store';
import { MOCK_PROFILE } from '@/lib/mock-data';

export default function FreeTimePage() {
  const router = useRouter();
  const { profile, setProfile, demoMode } = useAppStore();
  const [freeTime, setFreeTime] = useState(profile.freeTime || '');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const demoStarted = useRef(false);

  // Typewriter effect
  const typeText = async (text: string, setter: (val: string) => void, delay = 20) => {
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setter(text.slice(0, i));
    }
  };

  // Demo mode: auto-fill and auto-navigate
  useEffect(() => {
    if (demoMode && !demoStarted.current) {
      demoStarted.current = true;
      const runDemo = async () => {
        setIsAutoFilling(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        await typeText(MOCK_PROFILE.freeTime, (val) => {
          setFreeTime(val);
          setProfile({ freeTime: val });
        }, 15);

        setIsAutoFilling(false);
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push('/start/clarity');
      };
      runDemo();
    } else if (!demoMode && !freeTime) {
      setFreeTime(MOCK_PROFILE.freeTime);
      setProfile({ freeTime: MOCK_PROFILE.freeTime });
    }
  }, [demoMode]);

  const handleNext = () => {
    setProfile({ freeTime });
    router.push('/start/clarity');
  };

  const canContinue = freeTime.trim().length > 10;

  return (
    <OnboardingLayout
      step={10}
      totalSteps={13}
      title="Ce faci în timpul liber?"
      subtitle="Spune-ne ce îți place să faci când ai timp liber"
      backHref="/start/languages"
      canContinue={canContinue}
      onNext={handleNext}
    >
      <textarea
        value={freeTime}
        onChange={(e) => {
          setFreeTime(e.target.value);
          setProfile({ freeTime: e.target.value });
        }}
        placeholder="Ex: Îmi place să lucrez la proiecte personale de coding, să joc jocuri video și să urmăresc tutoriale pe YouTube..."
        className="w-full h-40 px-3 py-2 bg-white text-[#0F172A] text-base border border-[#CBD5E1] rounded-[4px] placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors duration-150 resize-none"
      />
      <p className="mt-2 text-xs text-[#64748B]">
        Minimum 10 caractere. Cu cât ești mai detaliat, cu atât mai bune vor fi recomandările.
      </p>
    </OnboardingLayout>
  );
}
