'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Upload, Award, FileImage, Calendar, Building2 } from 'lucide-react';
import { OnboardingLayout } from '@/components/onboarding';
import { Button, Card, Badge } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { cn, generateId } from '@/lib/utils';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  imagePreview?: string;
}

const suggestedCertificates = [
  { title: 'Google Digital Marketing', issuer: 'Google / Coursera' },
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services' },
  { title: 'Meta Frontend Developer', issuer: 'Meta / Coursera' },
  { title: 'Cambridge English', issuer: 'Cambridge Assessment' },
  { title: 'ECDL', issuer: 'ECDL Foundation' },
  { title: 'Diploma BAC', issuer: 'Ministerul Educației' },
];

export default function CertificatesPage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: '',
    issuer: '',
    date: '2024',
    credentialId: '',
    credentialUrl: '',
    imagePreview: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagePreview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCertificate = () => {
    if (!formData.title) return;

    const newCertificate: Certificate = {
      id: generateId(),
      title: formData.title || '',
      issuer: formData.issuer || '',
      date: formData.date || '2024',
      credentialId: formData.credentialId,
      credentialUrl: formData.credentialUrl,
      imagePreview: formData.imagePreview
    };

    setCertificates([...certificates, newCertificate]);
    setFormData({
      title: '',
      issuer: '',
      date: '2024',
      credentialId: '',
      credentialUrl: '',
      imagePreview: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const handleQuickAdd = (suggestion: { title: string; issuer: string }) => {
    setFormData({
      ...formData,
      title: suggestion.title,
      issuer: suggestion.issuer
    });
    setShowAddForm(true);
  };

  const handleNext = () => {
    setProfile({ certificates: certificates as any });
    router.push('/start/projects');
  };

  const canContinue = true; // Optional step

  const years = Array.from({ length: 15 }, (_, i) => (2024 - i).toString());

  return (
    <OnboardingLayout
      step={7}
      totalSteps={13}
      title="Certificate și Diplome"
      subtitle="Adaugă certificările și diplomele tale - poți încărca și imagini"
      backHref="/start/experiences"
      canContinue={canContinue}
      onNext={handleNext}
      nextLabel={certificates.length === 0 ? 'Sari peste' : 'Continuă'}
    >
      {/* Quick add suggestions */}
      {certificates.length === 0 && !showAddForm && (
        <div className="mb-4">
          <p className="text-sm text-[#64748B] mb-2">Sugestii populare:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedCertificates.map((suggestion, index) => (
              <motion.button
                key={suggestion.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleQuickAdd(suggestion)}
                className="px-3 py-2 bg-[#F1F5F9] text-[#334155] text-sm rounded-[4px] hover:bg-[#E2E8F0] transition-colors flex items-center gap-2"
              >
                <Award size={14} className="text-[#CA8A04]" />
                {suggestion.title}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Certificate list */}
      <div className="space-y-3 mb-4">
        <AnimatePresence>
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="relative">
                <div className="flex gap-4">
                  {/* Image preview */}
                  {cert.imagePreview ? (
                    <div className="w-20 h-20 rounded-[4px] overflow-hidden flex-shrink-0 bg-[#F1F5F9]">
                      <img
                        src={cert.imagePreview}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-[4px] bg-gradient-to-br from-[#CA8A04] to-[#A16207] flex items-center justify-center flex-shrink-0">
                      <Award size={32} className="text-white" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-[#0F172A]">{cert.title}</h3>
                        <p className="text-sm text-[#64748B] flex items-center gap-1">
                          <Building2 size={12} />
                          {cert.issuer}
                        </p>
                        <p className="text-xs text-[#94A3B8] flex items-center gap-1 mt-1">
                          <Calendar size={12} />
                          {cert.date}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="p-1 text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#2563EB] hover:underline mt-1 inline-block"
                      >
                        Vezi certificatul →
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
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
              <h3 className="font-medium text-[#0F172A] mb-4">Adaugă certificat / diplomă</h3>

              {/* Image upload */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Imagine (opțional)</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {formData.imagePreview ? (
                  <div className="relative w-full h-40 rounded-[4px] overflow-hidden bg-[#F1F5F9]">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={() => setFormData({ ...formData, imagePreview: '' })}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-[#CBD5E1] rounded-[4px] flex flex-col items-center justify-center gap-2 text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                  >
                    <Upload size={24} />
                    <span className="text-sm">Click pentru a încărca o imagine</span>
                    <span className="text-xs">PNG, JPG, max 5MB</span>
                  </button>
                )}
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Denumire certificat / diplomă *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Google Digital Marketing Certificate"
                  className="w-full px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Issuer */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Emis de</label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="Ex: Google / Coursera"
                  className="w-full px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Anul obținerii</label>
                <select
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB]"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Credential URL */}
              <div className="mb-4">
                <label className="text-sm text-[#64748B] mb-2 block">Link către certificat (opțional)</label>
                <input
                  type="url"
                  value={formData.credentialUrl}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  placeholder="https://www.credly.com/badges/..."
                  className="w-full px-3 py-2 bg-white text-[#0F172A] text-sm border border-[#CBD5E1] rounded-[4px] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleAddCertificate} disabled={!formData.title}>
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
              Adaugă certificat sau diplomă
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </OnboardingLayout>
  );
}
