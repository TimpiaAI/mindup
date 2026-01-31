'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { OnboardingLayout } from '@/components/onboarding';
import { Input, Select } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { CITIES, MOCK_USER } from '@/lib/mock-data';

export default function LocationPage() {
  const router = useRouter();
  const { user, setUser } = useAppStore();
  const [age, setAge] = useState(user.age || 0);
  const [city, setCity] = useState(user.city || '');

  // Pre-fill with mock data for demo
  useEffect(() => {
    if (!age && !city) {
      setAge(MOCK_USER.age);
      setCity(MOCK_USER.city);
      setUser({ age: MOCK_USER.age, city: MOCK_USER.city });
    }
  }, []);

  const handleNext = () => {
    setUser({ age, city });
    router.push('/start/level');
  };

  const cityOptions = CITIES.map(c => ({ value: c, label: c }));
  const canContinue = age > 0 && city.trim().length > 0;

  return (
    <OnboardingLayout
      step={2}
      totalSteps={8}
      title="Unde te afli?"
      subtitle="Ne ajută să găsim oportunități locale"
      backHref="/start/name"
      canContinue={canContinue}
      onNext={handleNext}
    >
      <div className="space-y-4">
        <Input
          label="Vârstă"
          type="number"
          placeholder="Ex: 19"
          min={14}
          max={65}
          value={age || ''}
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
          onChange={(e) => {
            setCity(e.target.value);
            setUser({ city: e.target.value });
          }}
        />
      </div>
    </OnboardingLayout>
  );
}
