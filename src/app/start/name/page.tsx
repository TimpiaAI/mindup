'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { OnboardingLayout } from '@/components/onboarding';
import { Input } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { MOCK_USER } from '@/lib/mock-data';

export default function NamePage() {
  const router = useRouter();
  const { user, setUser } = useAppStore();
  const [name, setName] = useState(user.name || '');
  const [surname, setSurname] = useState(user.surname || '');

  // Pre-fill with mock data for demo
  useEffect(() => {
    if (!name && !surname) {
      setName(MOCK_USER.name);
      setSurname(MOCK_USER.surname);
      setUser({ name: MOCK_USER.name, surname: MOCK_USER.surname });
    }
  }, []);

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
      <div className="space-y-4">
        <Input
          label="Prenume"
          placeholder="Ex: Andrei"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setUser({ name: e.target.value });
          }}
        />
        <Input
          label="Nume"
          placeholder="Ex: Popescu"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
            setUser({ surname: e.target.value });
          }}
        />
      </div>
    </OnboardingLayout>
  );
}
