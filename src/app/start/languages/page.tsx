'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Languages, ChevronDown, Check } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Button, Card, Badge } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { MOCK_PROFILE } from '@/lib/mock-data';
import { cn, generateId } from '@/lib/utils';

interface Language {
  id: string;
  name: string;
  level: string;
}

const availableLanguages = [
  { name: 'Engleză', flag: '🇬🇧' },
  { name: 'Franceză', flag: '🇫🇷' },
  { name: 'Germană', flag: '🇩🇪' },
  { name: 'Spaniolă', flag: '🇪🇸' },
  { name: 'Italiană', flag: '🇮🇹' },
  { name: 'Portugheză', flag: '🇵🇹' },
  { name: 'Chineză', flag: '🇨🇳' },
  { name: 'Japoneză', flag: '🇯🇵' },
  { name: 'Coreeană', flag: '🇰🇷' },
  { name: 'Rusă', flag: '🇷🇺' },
];

const levels = [
  { id: 'A1', label: 'A1 - Începător', description: 'Înțelegi și folosești expresii de bază' },
  { id: 'A2', label: 'A2 - Elementar', description: 'Comunici în situații simple de rutină' },
  { id: 'B1', label: 'B1 - Intermediar', description: 'Te descurci în călătorii și conversații simple' },
  { id: 'B2', label: 'B2 - Intermediar avansat', description: 'Conversezi fluent despre subiecte variate' },
  { id: 'C1', label: 'C1 - Avansat', description: 'Te exprimi fluent și spontan în orice context' },
  { id: 'C2', label: 'C2 - Fluent', description: 'Înțelegi și vorbești ca un nativ' },
  { id: 'native', label: 'Nativ', description: 'Limba ta maternă' },
];

export default function LanguagesPage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [languages, setLanguages] = useState<Language[]>([
    { id: 'romanian', name: 'Română', level: 'native' } // Default Romanian
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('B1');

  // Pre-fill with mock data for demo
  useEffect(() => {
    if (languages.length === 1 && MOCK_PROFILE.languages) {
      const mockLanguages = MOCK_PROFILE.languages.map(lang => ({
        id: generateId(),
        name: lang.name,
        level: lang.level
      }));
      setLanguages([
        { id: 'romanian', name: 'Română', level: 'native' },
        ...mockLanguages
      ]);
    }
  }, []);

  const handleAddLanguage = () => {
    if (!selectedLanguage) return;

    const newLanguage: Language = {
      id: generateId(),
      name: selectedLanguage,
      level: selectedLevel
    };

    setLanguages([...languages, newLanguage]);
    setSelectedLanguage('');
    setSelectedLevel('B1');
    setShowAddForm(false);
  };

  const handleDeleteLanguage = (id: string) => {
    if (id === 'romanian') return; // Can't delete Romanian
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const handleUpdateLevel = (id: string, level: string) => {
    setLanguages(languages.map(lang =>
      lang.id === id ? { ...lang, level } : lang
    ));
  };

  const handleNext = () => {
    setProfile({ languages: languages.map(({ name, level }) => ({ name, level })) as any });
    router.push('/start/free-time');
  };

  const canContinue = languages.length >= 1;

  const getFlag = (name: string) => {
    return availableLanguages.find(l => l.name === name)?.flag || '🌐';
  };

  const getLevelInfo = (level: string) => {
    return levels.find(l => l.id === level) || levels[2];
  };

  const getLevelColor = (level: string) => {
    if (level === 'native' || level === 'C2') return 'bg-[#16A34A]';
    if (level === 'C1') return 'bg-[#2563EB]';
    if (level === 'B2') return 'bg-[#7C3AED]';
    if (level === 'B1') return 'bg-[#CA8A04]';
    return 'bg-[#64748B]';
  };

  const unusedLanguages = availableLanguages.filter(
    lang => !languages.some(l => l.name === lang.name)
  );

  return (
    <OnboardingLayout
      step={9}
      totalSteps={13}
      title="Limbi străine"
      subtitle="Ce limbi vorbești și la ce nivel?"
      backHref="/start/projects"
      canContinue={canContinue}
      onNext={handleNext}
    >
      {/* Language list */}
      <div className="space-y-3 mb-4">
        <AnimatePresence>
          {languages.map((lang, index) => {
            const levelInfo = getLevelInfo(lang.level);
            return (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="relative">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getFlag(lang.name)}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#0F172A]">{lang.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <select
                          value={lang.level}
                          onChange={(e) => handleUpdateLevel(lang.id, e.target.value)}
                          disabled={lang.id === 'romanian'}
                          className={cn(
                            'text-xs font-medium px-2 py-1 rounded-[4px] text-white border-0 cursor-pointer',
                            getLevelColor(lang.level),
                            lang.id === 'romanian' && 'cursor-not-allowed opacity-80'
                          )}
                        >
                          {levels.map(level => (
                            <option key={level.id} value={level.id}>
                              {level.id === 'native' ? 'Nativ' : level.id}
                            </option>
                          ))}
                        </select>
                        <span className="text-xs text-[#64748B]">{levelInfo.description}</span>
                      </div>
                    </div>
                    {lang.id !== 'romanian' && (
                      <button
                        onClick={() => handleDeleteLanguage(lang.id)}
                        className="p-2 text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add form */}
      <AnimatePresence mode="wait">
        {showAddForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-[#2563EB] border-2">
              <h3 className="font-medium text-[#0F172A] mb-4">Adaugă limbă</h3>

              {/* Language selector */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Selectează limba</label>
                <div className="flex flex-wrap gap-2">
                  {unusedLanguages.map(lang => (
                    <button
                      key={lang.name}
                      onClick={() => setSelectedLanguage(lang.name)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-[4px] text-sm transition-colors',
                        selectedLanguage === lang.name
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]'
                      )}
                    >
                      <span>{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level selector */}
              {selectedLanguage && (
                <div className="mb-4">
                  <label className="text-sm text-[#64748B] mb-2 block">Nivel</label>
                  <div className="space-y-2">
                    {levels.filter(l => l.id !== 'native').map(level => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={cn(
                          'w-full p-3 rounded-[4px] text-left transition-colors flex items-center justify-between',
                          selectedLevel === level.id
                            ? 'bg-[#EFF6FF] border-2 border-[#2563EB]'
                            : 'bg-[#F1F5F9] border-2 border-transparent hover:bg-[#E2E8F0]'
                        )}
                      >
                        <div>
                          <div className="font-medium text-[#0F172A] text-sm">{level.label}</div>
                          <div className="text-xs text-[#64748B]">{level.description}</div>
                        </div>
                        {selectedLevel === level.id && (
                          <Check size={20} className="text-[#2563EB]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleAddLanguage} disabled={!selectedLanguage}>
                  <Plus size={16} className="mr-1" /> Adaugă
                </Button>
                <Button variant="ghost" onClick={() => {
                  setShowAddForm(false);
                  setSelectedLanguage('');
                }}>
                  Anulează
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : unusedLanguages.length > 0 ? (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full p-4 border-2 border-dashed border-[#CBD5E1] rounded-[4px] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Adaugă limbă
            </button>
          </motion.div>
        ) : (
          <p className="text-center text-sm text-[#64748B]">
            Ai adăugat toate limbile disponibile
          </p>
        )}
      </AnimatePresence>

      {/* CEFR info */}
      <div className="mt-6 p-4 bg-[#F1F5F9] rounded-[4px]">
        <p className="text-xs text-[#64748B]">
          <strong>Niveluri CEFR:</strong> A1-A2 (începător), B1-B2 (intermediar), C1-C2 (avansat).
          Selectează nivelul care se potrivește cel mai bine competențelor tale.
        </p>
      </div>
    </OnboardingLayout>
  );
}
