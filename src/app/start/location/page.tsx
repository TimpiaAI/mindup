'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Input, Select } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { CITIES, MOCK_USER } from '@/lib/mock-data';

export default function LocationPage() {
  const router = useRouter();
  const { user, setUser, demoMode } = useAppStore();
  const [age, setAge] = useState(user.age || 0);
  const [city, setCity] = useState(user.city || '');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const demoStarted = useRef(false);

  // Demo mode: auto-fill and auto-navigate
  useEffect(() => {
    if (demoMode && !demoStarted.current) {
      demoStarted.current = true;
      const runDemo = async () => {
        setIsAutoFilling(true);
        await new Promise(resolve => setTimeout(resolve, 400));

        // Animate age typing
        for (let i = 1; i <= MOCK_USER.age; i++) {
          await new Promise(resolve => setTimeout(resolve, 30));
          setAge(i);
          setUser({ age: i });
        }

        await new Promise(resolve => setTimeout(resolve, 300));

        // Set city
        setCity(MOCK_USER.city);
        setUser({ city: MOCK_USER.city });

        setIsAutoFilling(false);
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push('/start/level');
      };
      runDemo();
    } else if (!demoMode && !age && !city) {
      setAge(MOCK_USER.age);
      setCity(MOCK_USER.city);
      setUser({ age: MOCK_USER.age, city: MOCK_USER.city });
    }
  }, [demoMode]);

  const handleNext = () => {
    setUser({ age, city });
    router.push('/start/level');
  };

  const cityOptions = CITIES.map(c => ({ value: c, label: c }));
  const canContinue = age > 0 && city.trim().length > 0;

  return (
    <OnboardingLayout
      step={2}
      totalSteps={13}
      title="Unde te afli?"
      subtitle="Ne ajută să găsim oportunități locale"
      backHref="/start/name"
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

      <div className="space-y-4">
        <Input
          label="Vârstă"
          type="number"
          placeholder="Ex: 19"
          min={14}
          max={65}
          value={age || ''}
          disabled={isAutoFilling}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            setAge(val);
            setUser({ age: val });
          }}
        />
        <Select
          label="Oraș"
          options={cityOptions}
          value={city}
          disabled={isAutoFilling}
          onChange={(e) => {
            setCity(e.target.value);
            setUser({ city: e.target.value });
          }}
        />
      </div>
    </OnboardingLayout>
  );
}
