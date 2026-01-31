'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Header, Container } from '@/components/layout';
import { Card, Badge, MatchBadge, Button, Modal, Icon } from '@/components/ui';
import { MentorChat } from '@/components/job';
import { getJobById, getCategoryById, FACULTIES, COMPANIES, MOCK_PROFILE } from '@/lib/mock-data';
import { formatSalary } from '@/lib/utils';

export default function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const resolvedParams = use(params);
  const jobId = parseInt(resolvedParams.jobId);
  const job = getJobById(jobId);
  const category = job ? getCategoryById(job.categoryId) : null;
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  if (!job || !category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#64748B]">Jobul nu a fost găsit.</p>
      </div>
    );
  }

  const userSkills = MOCK_PROFILE.skills.map(s => s.name);
  const hasSkill = (skill: string) => {
    return userSkills.some(us =>
      us.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(us.toLowerCase())
    );
  };

  const company = selectedCompany ? COMPANIES.find(c => c.id === selectedCompany) : null;

  return (
    <div className="min-h-screen bg-white">
      <Header showBack backHref={`/career/${job.categoryId}`} showActions />

      <main className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name={job.icon} size={28} className="text-[#2563EB]" />
                        <h1 className="text-2xl font-bold text-[#0F172A]">{job.name}</h1>
                      </div>
                      <Link href={`/career/${job.categoryId}`} className="text-sm text-[#64748B] hover:text-[#2563EB] flex items-center gap-1">
                        <Icon name={category.icon} size={14} /> {category.name}
                      </Link>
                    </div>
                    <MatchBadge percentage={job.match} size="lg" />
                  </div>

                  <p className="text-[#334155] mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#F1F5F9] rounded-[4px]">
                      <Icon name="wallet" size={16} className="text-[#16A34A]" />
                      <span className="text-sm font-medium text-[#0F172A]">
                        {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#F1F5F9] rounded-[4px]">
                      <Icon name="graduation" size={16} className="text-[#2563EB]" />
                      <span className="text-sm font-medium text-[#0F172A]">{job.studyLevel}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Skilluri necesare</h2>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-[#16A34A] mb-2">Ai deja:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.filter(hasSkill).map((skill) => (
                        <Badge key={skill} hasSkill>{skill}</Badge>
                      ))}
                      {job.requiredSkills.filter(hasSkill).length === 0 && (
                        <span className="text-sm text-[#64748B]">-</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#CA8A04] mb-2">De învățat:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.filter(s => !hasSkill(s)).map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                      {job.niceToHaveSkills.map((skill) => (
                        <Badge key={skill} variant="warning">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Mentor Chat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Vorbește cu un mentor</h2>
                <MentorChat jobId={jobId} />
              </motion.div>

              {/* Studies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Studii recomandate</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {FACULTIES.slice(0, 6).map((faculty) => (
                      <Link key={faculty.id} href={`/faculty/${faculty.id}`}>
                        <div className="p-3 border border-[#CBD5E1] rounded-[4px] hover:border-[#2563EB] transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-[4px] flex items-center justify-center mb-2">
                            <span className="text-white font-bold text-sm">{faculty.shortName}</span>
                          </div>
                          <div className="text-xs font-medium text-[#0F172A] truncate">{faculty.name}</div>
                          <div className="text-xs text-[#64748B]">{faculty.city}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Companii care angajează</h2>
                  <div className="space-y-3">
                    {COMPANIES.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => setSelectedCompany(company.id)}
                        className="w-full p-3 border border-[#CBD5E1] rounded-[4px] hover:border-[#2563EB] transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#F1F5F9] rounded-[4px] flex items-center justify-center font-bold text-[#2563EB]">
                            {company.logo}
                          </div>
                          <div>
                            <div className="font-medium text-[#0F172A]">{company.name}</div>
                            <div className="text-xs text-[#64748B]">
                              {company.cities.join(', ')} • {company.openPositions.length} poziții
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-[#EFF6FF] border-[#2563EB]">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="gem" size={20} className="text-[#2563EB]" />
                    <h3 className="font-semibold text-[#0F172A]">Premium</h3>
                  </div>
                  <p className="text-sm text-[#334155] mb-4">
                    Trimite email automat la toate companiile. Se integrează cu Gmail-ul tău real.
                  </p>
                  <p className="text-sm font-medium text-[#0F172A] mb-3">
                    Plată unică: 29 RON
                  </p>
                  <Button className="w-full">Activează</Button>
                </Card>
              </motion.div>
            </aside>
          </div>
        </Container>
      </main>

      {/* Company Modal */}
      <Modal
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        title={company?.name}
      >
        {company && (
          <div className="space-y-4">
            <p className="text-[#64748B]">{company.tagline}</p>
            <p className="text-sm text-[#334155]">{company.description}</p>

            <div>
              <h4 className="font-medium text-[#0F172A] mb-2">Beneficii</h4>
              <ul className="space-y-1">
                {company.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm text-[#64748B] flex items-start">
                    <Check size={14} className="mr-2 text-[#16A34A] flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#0F172A] mb-2">Poziții deschise</h4>
              <div className="space-y-2">
                {company.openPositions.map((pos, i) => (
                  <div key={i} className="p-2 bg-[#F1F5F9] rounded-[4px] text-sm">
                    <div className="font-medium text-[#0F172A]">{pos.title}</div>
                    <div className="text-xs text-[#64748B]">{pos.type} • {pos.experience}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9]">
              <p className="text-sm text-[#64748B] mb-2">Contact HR:</p>
              <p className="text-sm text-[#0F172A]">{company.hrEmail}</p>
              <p className="text-sm text-[#0F172A]">{company.hrPhone}</p>
            </div>

            <Link href={`/company/${company.id}`}>
              <Button className="w-full mt-4">Vezi pagina companiei</Button>
            </Link>
          </div>
        )}
      </Modal>
    </div>
  );
}
