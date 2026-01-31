'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  const { setUser } = useAppStore();

  const handleSelect = (hasCV: boolean) => {
    setUser({ hasCV });
    // For demo, we always go to the discovery flow
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
      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(option.id === 'yes')}
            className={cn(
              'w-full p-4 border border-[#CBD5E1] rounded-[4px] text-left',
              'hover:border-[#2563EB] transition-colors duration-150',
              'flex items-start gap-4'
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
