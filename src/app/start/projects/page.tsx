'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Github, Globe, Linkedin, ExternalLink, Link2, Folder } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Button, Card, Badge } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { cn, generateId } from '@/lib/utils';

interface Project {
  id: string;
  type: 'github' | 'portfolio' | 'linkedin' | 'project' | 'other';
  title: string;
  url: string;
  description?: string;
}

const linkTypes = [
  { id: 'github', label: 'GitHub', icon: Github, color: 'bg-[#24292F]', placeholder: 'https://github.com/username' },
  { id: 'portfolio', label: 'Portfolio', icon: Globe, color: 'bg-[#2563EB]', placeholder: 'https://myportfolio.com' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'bg-[#0A66C2]', placeholder: 'https://linkedin.com/in/username' },
  { id: 'project', label: 'Proiect', icon: Folder, color: 'bg-[#7C3AED]', placeholder: 'https://myproject.com' },
  { id: 'other', label: 'Alt link', icon: Link2, color: 'bg-[#64748B]', placeholder: 'https://...' },
];

export default function ProjectsPage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Project>>({
    type: 'github',
    title: '',
    url: '',
    description: ''
  });

  const handleAddProject = () => {
    if (!formData.url) return;

    const typeInfo = linkTypes.find(t => t.id === formData.type);
    const newProject: Project = {
      id: generateId(),
      type: formData.type as Project['type'],
      title: formData.title || typeInfo?.label || 'Link',
      url: formData.url || '',
      description: formData.description
    };

    setProjects([...projects, newProject]);
    setFormData({
      type: 'github',
      title: '',
      url: '',
      description: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleQuickAdd = (type: string) => {
    setFormData({ ...formData, type: type as Project['type'] });
    setShowAddForm(true);
  };

  const handleNext = () => {
    setProfile({ projects: projects as any });
    router.push('/start/languages');
  };

  const canContinue = true; // Optional step

  const getTypeInfo = (type: string) => {
    return linkTypes.find(t => t.id === type) || linkTypes[4];
  };

  // Detect type from URL
  const detectType = (url: string) => {
    if (url.includes('github.com')) return 'github';
    if (url.includes('linkedin.com')) return 'linkedin';
    return formData.type;
  };

  return (
    <OnboardingLayout
      step={8}
      totalSteps={13}
      title="Proiecte și Linkuri"
      subtitle="Adaugă linkuri către proiectele tale, GitHub, portfolio, LinkedIn"
      backHref="/start/certificates"
      canContinue={canContinue}
      onNext={handleNext}
      nextLabel={projects.length === 0 ? 'Sari peste' : 'Continuă'}
    >
      {/* Quick add buttons */}
      {projects.length === 0 && !showAddForm && (
        <div className="mb-6">
          <p className="text-sm text-[#64748B] mb-3">Adaugă rapid:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {linkTypes.slice(0, 4).map((type, index) => {
              const TypeIcon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleQuickAdd(type.id)}
                  className={cn(
                    'p-4 rounded-[4px] text-white flex flex-col items-center gap-2 hover:opacity-90 transition-opacity',
                    type.color
                  )}
                >
                  <TypeIcon size={24} />
                  <span className="text-sm font-medium">{type.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Project list */}
      <div className="space-y-3 mb-4">
        <AnimatePresence>
          {projects.map((project, index) => {
            const typeInfo = getTypeInfo(project.type);
            const TypeIcon = typeInfo.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="relative">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-[4px] flex items-center justify-center', typeInfo.color)}>
                      <TypeIcon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#0F172A] truncate">{project.title}</h3>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#2563EB] hover:underline truncate block"
                      >
                        {project.url.replace(/^https?:\/\//, '')}
                      </a>
                      {project.description && (
                        <p className="text-xs text-[#64748B] mt-1 truncate">{project.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
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
              <h3 className="font-medium text-[#0F172A] mb-4">Adaugă link</h3>

              {/* Type selector */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Tip link</label>
                <div className="flex flex-wrap gap-2">
                  {linkTypes.map(type => {
                    const TypeIcon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setFormData({ ...formData, type: type.id as Project['type'] })}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-[4px] text-sm transition-colors',
                          formData.type === type.id
                            ? `${type.color} text-white`
                            : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                        )}
                      >
                        <TypeIcon size={16} />
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* URL */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">URL *</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => {
                    const url = e.target.value;
                    setFormData({
                      ...formData,
                      url,
                      type: detectType(url)
                    });
                  }}
                  placeholder={linkTypes.find(t => t.id === formData.type)?.placeholder}
                  className="w-full px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Titlu (opțional)</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={`Ex: ${linkTypes.find(t => t.id === formData.type)?.label} personal`}
                  className="w-full px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Descriere (opțional)</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ex: Portfolio personal cu proiecte React"
                  className="w-full px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleAddProject} disabled={!formData.url}>
                  <Plus size={16} className="mr-1" /> Adaugă
                </Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
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
              onClick={() => setShowAddForm(true)}
              className="w-full p-4 border-2 border-dashed border-[#CBD5E1] rounded-[4px] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Adaugă link
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {projects.length > 0 && (
        <p className="text-center text-xs text-[#64748B] mt-4">
          Linkurile vor fi afișate pe CV-ul tău generat
        </p>
      )}
    </OnboardingLayout>
  );
}
