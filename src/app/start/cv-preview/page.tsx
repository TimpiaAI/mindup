'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { OnboardingLayout } from '@/components/onboarding';
import { useAppStore } from '@/lib/store';
import {
  User, MapPin, GraduationCap, Briefcase, Code, Heart,
  Trophy, Award, Globe, Github, Linkedin, ExternalLink,
  Camera, Mail, Phone, Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CVPreviewPage() {
  const router = useRouter();
  const { user, profile, setUser, loadMockData } = useAppStore();
  const [profilePhoto, setProfilePhoto] = useState<string>(user.profilePhoto || '/demo/profile.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePhoto(result);
        setUser({ profilePhoto: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    loadMockData();
    router.push('/loading');
  };

  const levelLabels: Record<string, string> = {
    highschool: 'Elev de liceu',
    student: 'Student',
    graduate: 'Absolvent',
    employed: 'Angajat'
  };

  const experienceIcons: Record<string, React.ElementType> = {
    job: Briefcase,
    project: Code,
    course: GraduationCap,
    competition: Trophy,
    volunteer: Heart
  };

  const linkIcons: Record<string, React.ElementType> = {
    github: Github,
    linkedin: Linkedin,
    portfolio: Globe,
    project: ExternalLink
  };

  return (
    <OnboardingLayout
      step={13}
      totalSteps={13}
      title="Preview CV"
      subtitle="Verifică informațiile tale înainte de a continua"
      backHref="/start/skills"
      nextLabel="Finalizează"
      canContinue={true}
      onNext={handleNext}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm"
      >
        {/* Header with photo and basic info */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] p-6 text-white">
          <div className="flex items-start gap-4">
            {/* Profile Photo */}
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image
                  src={profilePhoto}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {/* Name and info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {user.name || 'Nume'} {user.surname || 'Prenume'}
              </h2>
              <p className="text-white/80 text-sm mt-1">
                {levelLabels[user.level] || 'Student'}
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.city || 'București'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {user.age || 20} ani
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="p-4 space-y-4">
          {/* Skills */}
          {profile.skills.length > 0 && (
            <Section title="Competențe" icon={Code}>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#EFF6FF] text-[#2563EB] text-xs font-medium rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Languages */}
          {profile.languages.length > 0 && (
            <Section title="Limbi" icon={Globe}>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#F1F5F9] text-[#0F172A] text-xs font-medium rounded"
                  >
                    {lang.name} - {lang.level}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Passions */}
          {profile.passions.length > 0 && (
            <Section title="Pasiuni" icon={Heart}>
              <div className="flex flex-wrap gap-1.5">
                {profile.passions.map((passion, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#FEF2F2] text-[#DC2626] text-xs font-medium rounded"
                  >
                    {passion}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Experiences */}
          {profile.experiences.length > 0 && (
            <Section title="Experiență" icon={Briefcase}>
              <div className="space-y-3">
                {profile.experiences.map((exp) => {
                  const IconComponent = experienceIcons[exp.type] || Briefcase;
                  return (
                    <div key={exp.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-[#64748B]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0F172A]">{exp.title}</p>
                        <p className="text-xs text-[#64748B]">{exp.organization}</p>
                        <p className="text-xs text-[#94A3B8]">
                          {exp.startYear} - {exp.current ? 'Prezent' : exp.endYear}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* Certificates */}
          {profile.certificates.length > 0 && (
            <Section title="Certificări" icon={Award}>
              <div className="space-y-2">
                {profile.certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-3">
                    {cert.imagePreview ? (
                      <Image
                        src={cert.imagePreview}
                        alt={cert.title}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-[#FEF3C7] flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#CA8A04]" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{cert.title}</p>
                      <p className="text-xs text-[#64748B]">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Projects/Links */}
          {profile.projects.length > 0 && (
            <Section title="Proiecte & Link-uri" icon={ExternalLink}>
              <div className="space-y-2">
                {profile.projects.map((project) => {
                  const IconComponent = linkIcons[project.type] || ExternalLink;
                  return (
                    <a
                      key={project.id}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#2563EB] hover:underline"
                    >
                      <IconComponent className="w-4 h-4" />
                      {project.title || project.url}
                    </a>
                  );
                })}
              </div>
            </Section>
          )}

          {/* Free time & clarity */}
          {(profile.freeTime || profile.clarityTrigger) && (
            <Section title="Despre mine" icon={User}>
              {profile.freeTime && (
                <p className="text-sm text-[#64748B] mb-2">
                  <span className="font-medium text-[#0F172A]">Timp liber:</span> {profile.freeTime}
                </p>
              )}
              {profile.clarityTrigger && (
                <p className="text-sm text-[#64748B]">
                  <span className="font-medium text-[#0F172A]">Ce mă motivează:</span> {profile.clarityTrigger}
                </p>
              )}
            </Section>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <p className="text-xs text-center text-[#94A3B8]">
            Poți modifica aceste informații oricând din setări
          </p>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
}

// Section component
function Section({ title, icon: Icon, children }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-[#64748B]" />
        <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
      </div>
      {children}
    </div>
  );
}
