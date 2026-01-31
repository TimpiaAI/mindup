'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Briefcase, GraduationCap, Code, Trophy, Heart, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Button, Card, Badge } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { cn, generateId } from '@/lib/utils';

interface Experience {
  id: string;
  type: 'volunteer' | 'course' | 'project' | 'competition' | 'job';
  title: string;
  organization: string;
  startYear: string;
  endYear: string;
  current: boolean;
  description: string;
  skills: string[];
}

const experienceTypes = [
  { id: 'job', label: 'Job / Internship', icon: Briefcase, color: 'bg-[#2563EB]' },
  { id: 'project', label: 'Proiect Personal', icon: Code, color: 'bg-[#7C3AED]' },
  { id: 'course', label: 'Curs / Certificare', icon: GraduationCap, color: 'bg-[#16A34A]' },
  { id: 'competition', label: 'Competiție / Hackathon', icon: Trophy, color: 'bg-[#CA8A04]' },
  { id: 'volunteer', label: 'Voluntariat', icon: Heart, color: 'bg-[#DC2626]' },
];

const suggestedSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'SQL',
  'Communication', 'Teamwork', 'Problem Solving', 'Leadership',
  'Project Management', 'Design', 'Marketing', 'Data Analysis'
];

// Demo data for auto-fill animation
const demoExperience = {
  type: 'project' as const,
  title: 'Frontend Developer Intern',
  organization: 'TechStart Solutions',
  startYear: '2023',
  endYear: '2024',
  current: true,
  description: 'Am dezvoltat interfețe web moderne folosind React și TypeScript. Am colaborat cu echipa de design pentru implementarea UI/UX.',
  skills: ['React', 'TypeScript', 'Teamwork', 'Problem Solving']
};

export default function ExperiencesPage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [autoFillStep, setAutoFillStep] = useState(0);

  // Form state
  const [formData, setFormData] = useState<Partial<Experience>>({
    type: 'project',
    title: '',
    organization: '',
    startYear: '2024',
    endYear: '2024',
    current: false,
    description: '',
    skills: []
  });

  // Typewriter effect for input
  const typeText = async (text: string, setter: (val: string) => void, delay = 30) => {
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setter(text.slice(0, i));
    }
  };

  // Auto-fill animation
  const startAutoFill = async () => {
    setIsAutoFilling(true);

    // Step 1: Select type
    setAutoFillStep(1);
    await new Promise(resolve => setTimeout(resolve, 300));
    setFormData(prev => ({ ...prev, type: demoExperience.type }));

    // Step 2: Type title
    setAutoFillStep(2);
    await new Promise(resolve => setTimeout(resolve, 200));
    await typeText(demoExperience.title, (val) => setFormData(prev => ({ ...prev, title: val })));

    // Step 3: Type organization
    setAutoFillStep(3);
    await new Promise(resolve => setTimeout(resolve, 200));
    await typeText(demoExperience.organization, (val) => setFormData(prev => ({ ...prev, organization: val })));

    // Step 4: Select years
    setAutoFillStep(4);
    await new Promise(resolve => setTimeout(resolve, 300));
    setFormData(prev => ({ ...prev, startYear: demoExperience.startYear, current: demoExperience.current }));

    // Step 5: Type description
    setAutoFillStep(5);
    await new Promise(resolve => setTimeout(resolve, 200));
    await typeText(demoExperience.description, (val) => setFormData(prev => ({ ...prev, description: val })), 15);

    // Step 6: Select skills one by one
    setAutoFillStep(6);
    for (const skill of demoExperience.skills) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFormData(prev => ({ ...prev, skills: [...(prev.skills || []), skill] }));
    }

    setAutoFillStep(7);
    setIsAutoFilling(false);
  };

  const handleOpenForm = () => {
    setShowAddForm(true);
    // Reset form
    setFormData({
      type: 'project',
      title: '',
      organization: '',
      startYear: '2024',
      endYear: '2024',
      current: false,
      description: '',
      skills: []
    });
    setAutoFillStep(0);

    // Auto-start demo after a short delay
    setTimeout(() => {
      startAutoFill();
    }, 500);
  };

  const handleAddExperience = () => {
    if (!formData.title || !formData.type) return;

    const newExperience: Experience = {
      id: generateId(),
      type: formData.type as Experience['type'],
      title: formData.title || '',
      organization: formData.organization || '',
      startYear: formData.startYear || '2024',
      endYear: formData.current ? 'Prezent' : (formData.endYear || '2024'),
      current: formData.current || false,
      description: formData.description || '',
      skills: formData.skills || []
    };

    setExperiences([...experiences, newExperience]);
    setFormData({
      type: 'project',
      title: '',
      organization: '',
      startYear: '2024',
      endYear: '2024',
      current: false,
      description: '',
      skills: []
    });
    setShowAddForm(false);
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const toggleSkill = (skill: string) => {
    const current = formData.skills || [];
    if (current.includes(skill)) {
      setFormData({ ...formData, skills: current.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...current, skill] });
    }
  };

  const handleNext = () => {
    setProfile({ experiences: experiences as any });
    router.push('/start/certificates');
  };

  const canContinue = experiences.length >= 0; // Optional, can skip

  const years = Array.from({ length: 10 }, (_, i) => (2024 - i).toString());

  const getTypeInfo = (type: string) => {
    return experienceTypes.find(t => t.id === type) || experienceTypes[0];
  };

  return (
    <OnboardingLayout
      step={6}
      totalSteps={13}
      title="Experiențele tale"
      subtitle="Adaugă experiențele relevante - joburi, proiecte, cursuri, voluntariat"
      backHref="/start/passions"
      canContinue={canContinue}
      onNext={handleNext}
      nextLabel={experiences.length === 0 ? 'Sari peste' : 'Continuă'}
    >
      {/* Experience list */}
      <div className="space-y-3 mb-4">
        <AnimatePresence>
          {experiences.map((exp, index) => {
            const typeInfo = getTypeInfo(exp.type);
            const TypeIcon = typeInfo.icon;
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="relative overflow-hidden">
                  <div
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  >
                    <div className={cn('w-10 h-10 rounded-[4px] flex items-center justify-center', typeInfo.color)}>
                      <TypeIcon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-[#0F172A] truncate">{exp.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#64748B]">
                            {exp.startYear}{exp.endYear !== exp.startYear ? ` - ${exp.endYear}` : ''}
                          </span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                      <p className="text-sm text-[#64748B] truncate">{exp.organization}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pt-3 border-t border-[#F1F5F9]"
                      >
                        {exp.description && (
                          <p className="text-sm text-[#334155] mb-3">{exp.description}</p>
                        )}
                        {exp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {exp.skills.map(skill => (
                              <Badge key={skill} hasSkill>{skill}</Badge>
                            ))}
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExperience(exp.id);
                          }}
                          className="text-[#DC2626] hover:bg-[#FEE2E2]"
                        >
                          <X size={14} className="mr-1" /> Șterge
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add form or button */}
      <AnimatePresence mode="wait">
        {showAddForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-[#2563EB] border-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#0F172A]">Adaugă experiență nouă</h3>
                {isAutoFilling && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF4] text-[#16A34A] text-xs font-medium rounded-full"
                  >
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Sparkles size={14} />
                    </motion.div>
                    Se completează automat...
                  </motion.div>
                )}
                {!isAutoFilling && autoFillStep > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF4] text-[#16A34A] text-xs font-medium rounded-full"
                  >
                    <Sparkles size={14} />
                    Demo completat!
                  </motion.div>
                )}
              </div>

              {/* Type selector */}
              <motion.div
                className="mb-4"
                animate={{
                  scale: autoFillStep === 1 ? [1, 1.02, 1] : 1,
                  backgroundColor: autoFillStep === 1 ? ['transparent', '#EFF6FF', 'transparent'] : 'transparent'
                }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm text-[#64748B] mb-2 block">Tip experiență</label>
                <div className="flex flex-wrap gap-2">
                  {experienceTypes.map(type => {
                    const TypeIcon = type.icon;
                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => !isAutoFilling && setFormData({ ...formData, type: type.id as Experience['type'] })}
                        disabled={isAutoFilling}
                        animate={{
                          scale: autoFillStep === 1 && formData.type === type.id ? [1, 1.1, 1] : 1
                        }}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-[4px] text-sm transition-colors',
                          formData.type === type.id
                            ? `${type.color} text-white`
                            : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]',
                          isAutoFilling && 'cursor-not-allowed'
                        )}
                      >
                        <TypeIcon size={16} />
                        {type.label}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                className="mb-4"
                animate={{
                  scale: autoFillStep === 2 ? [1, 1.02, 1] : 1,
                  backgroundColor: autoFillStep === 2 ? ['transparent', '#EFF6FF', 'transparent'] : 'transparent'
                }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm text-[#64748B] mb-2 block">Titlu / Rol *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => !isAutoFilling && setFormData({ ...formData, title: e.target.value })}
                  disabled={isAutoFilling}
                  placeholder="Ex: Frontend Developer Intern"
                  className={cn(
                    "w-full px-3 py-2 bg-white text-[#0F172A] text-sm border rounded-[4px] focus:outline-none focus:border-[#2563EB] transition-colors",
                    autoFillStep === 2 ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20' : 'border-[#CBD5E1]'
                  )}
                />
              </motion.div>

              {/* Organization */}
              <motion.div
                className="mb-4"
                animate={{
                  scale: autoFillStep === 3 ? [1, 1.02, 1] : 1,
                  backgroundColor: autoFillStep === 3 ? ['transparent', '#EFF6FF', 'transparent'] : 'transparent'
                }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm text-[#64748B] mb-2 block">Organizație / Companie</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => !isAutoFilling && setFormData({ ...formData, organization: e.target.value })}
                  disabled={isAutoFilling}
                  placeholder="Ex: Google, Coursera, Personal"
                  className={cn(
                    "w-full px-3 py-2 bg-white text-[#0F172A] text-sm border rounded-[4px] focus:outline-none focus:border-[#2563EB] transition-colors",
                    autoFillStep === 3 ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20' : 'border-[#CBD5E1]'
                  )}
                />
              </motion.div>

              {/* Period */}
              <motion.div
                className="mb-4"
                animate={{
                  scale: autoFillStep === 4 ? [1, 1.02, 1] : 1,
                  backgroundColor: autoFillStep === 4 ? ['transparent', '#EFF6FF', 'transparent'] : 'transparent'
                }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm text-[#64748B] mb-2 block">Perioada</label>
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={formData.startYear}
                    onChange={(e) => !isAutoFilling && setFormData({ ...formData, startYear: e.target.value })}
                    disabled={isAutoFilling}
                    className={cn(
                      "px-3 py-2 bg-white text-[#0F172A] text-sm border rounded-[4px] focus:outline-none focus:border-[#2563EB]",
                      autoFillStep === 4 ? 'border-[#2563EB]' : 'border-[#CBD5E1]'
                    )}
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <span className="text-[#64748B]">—</span>
                  {formData.current ? (
                    <motion.span
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-2 bg-[#EFF6FF] text-[#2563EB] text-sm rounded-[4px] font-medium"
                    >
                      Prezent
                    </motion.span>
                  ) : (
                    <select
                      value={formData.endYear}
                      onChange={(e) => !isAutoFilling && setFormData({ ...formData, endYear: e.target.value })}
                      disabled={isAutoFilling}
                      className="px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB]"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  )}
                  <label className="flex items-center gap-2 text-sm text-[#64748B] ml-2">
                    <input
                      type="checkbox"
                      checked={formData.current}
                      onChange={(e) => !isAutoFilling && setFormData({ ...formData, current: e.target.checked })}
                      disabled={isAutoFilling}
                      className="rounded border-[#CBD5E1]"
                    />
                    În desfășurare
                  </label>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                className="mb-4"
                animate={{
                  scale: autoFillStep === 5 ? [1, 1.02, 1] : 1,
                  backgroundColor: autoFillStep === 5 ? ['transparent', '#EFF6FF', 'transparent'] : 'transparent'
                }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm text-[#64748B] mb-2 block">Descriere (opțional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => !isAutoFilling && setFormData({ ...formData, description: e.target.value })}
                  disabled={isAutoFilling}
                  placeholder="Descrie pe scurt ce ai făcut, ce ai învățat, ce rezultate ai obținut..."
                  rows={3}
                  className={cn(
                    "w-full px-3 py-2 bg-white text-[#0F172A] text-sm border rounded-[4px] focus:outline-none focus:border-[#2563EB] resize-none transition-colors",
                    autoFillStep === 5 ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20' : 'border-[#CBD5E1]'
                  )}
                />
              </motion.div>

              {/* Skills */}
              <motion.div
                className="mb-4"
                animate={{
                  scale: autoFillStep === 6 ? [1, 1.02, 1] : 1,
                  backgroundColor: autoFillStep === 6 ? ['transparent', '#EFF6FF', 'transparent'] : 'transparent'
                }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm text-[#64748B] mb-2 block">Skilluri folosite/învățate</label>
                <div className="flex flex-wrap gap-1">
                  {suggestedSkills.map(skill => (
                    <motion.button
                      key={skill}
                      onClick={() => !isAutoFilling && toggleSkill(skill)}
                      disabled={isAutoFilling}
                      animate={{
                        scale: autoFillStep === 6 && formData.skills?.includes(skill) ? 1.15 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className={cn(
                        'px-2 py-1 text-xs rounded-[2px] transition-colors',
                        formData.skills?.includes(skill)
                          ? 'bg-[#DCFCE7] text-[#16A34A]'
                          : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]',
                        isAutoFilling && 'cursor-not-allowed'
                      )}
                    >
                      {skill}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleAddExperience} disabled={!formData.title || isAutoFilling}>
                  <Plus size={16} className="mr-1" /> Adaugă
                </Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)} disabled={isAutoFilling}>
                  Anulează
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={handleOpenForm}
              className="w-full p-4 border-2 border-dashed border-[#CBD5E1] rounded-[4px] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Adaugă experiență
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {experiences.length === 0 && !showAddForm && (
        <p className="text-center text-sm text-[#64748B] mt-4">
          Nu ai adăugat încă experiențe. Poți sări peste acest pas sau adaugă experiențele tale.
        </p>
      )}
    </OnboardingLayout>
  );
}
