'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Input } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { MOCK_USER } from '@/lib/mock-data';

export default function NamePage() {
  const router = useRouter();
  const { user, setUser, demoMode } = useAppStore();
  const [name, setName] = useState(user.name || '');
  const [surname, setSurname] = useState(user.surname || '');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const demoStarted = useRef(false);

  // Typewriter effect
  const typeText = async (text: string, setter: (val: string) => void, delay = 40) => {
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

        // Type name
        await typeText(MOCK_USER.name, (val) => {
          setName(val);
          setUser({ name: val });
        });

        await new Promise(resolve => setTimeout(resolve, 300));

        // Type surname
        await typeText(MOCK_USER.surname, (val) => {
          setSurname(val);
          setUser({ surname: val });
        });

        setIsAutoFilling(false);

        // Auto-navigate after delay
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push('/start/location');
      };
      runDemo();
    } else if (!demoMode && !name && !surname) {
      // Normal pre-fill for non-demo
      setName(MOCK_USER.name);
      setSurname(MOCK_USER.surname);
      setUser({ name: MOCK_USER.name, surname: MOCK_USER.surname });
    }
  }, [demoMode]);

  const handleNext = () => {
    setUser({ name, surname });
    router.push('/start/location');
  };

  const canContinue = name.trim().length > 0 && surname.trim().length > 0;

  return (
    <OnboardingLayout
      step={1}
      totalSteps={13}
      title="Cum te numești?"
      subtitle="Hai să ne cunoaștem"
      backHref="/"
      canContinue={canContinue}
      onNext={handleNext}
    >
      {/* Demo mode indicator */}
      <AnimatePresence>
        {demoMode && isAutoFilling && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-[#F0FDF4] border border-[#16A34A]/20 rounded-[4px] flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={18} className="text-[#16A34A]" />
            </motion.div>
            <span className="text-sm text-[#16A34A] font-medium">
              Demo automat în desfășurare...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <Input
          label="Prenume"
          placeholder="Ex: Andrei"
          value={name}
          disabled={isAutoFilling}
          onChange={(e) => {
            setName(e.target.value);
            setUser({ name: e.target.value });
          }}
        />
        <Input
          label="Nume"
          placeholder="Ex: Popescu"
          value={surname}
          disabled={isAutoFilling}
          onChange={(e) => {
            setSurname(e.target.value);
            setUser({ surname: e.target.value });
          }}
        />
      </div>
    </OnboardingLayout>
  );
}
