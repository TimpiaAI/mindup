'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header, Container } from '@/components/layout';
import { Card, MatchBadge, Badge, Icon } from '@/components/ui';
import { getCategoryById, getJobsByCategory } from '@/lib/mock-data';
import { formatSalary } from '@/lib/utils';

export default function CareerCategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const resolvedParams = use(params);
  const categoryId = parseInt(resolvedParams.categoryId);
  const category = getCategoryById(categoryId);
  const jobs = getJobsByCategory(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#64748B]">Categoria nu a fost găsită.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header showBack backHref="/results" showActions />

      <main className="py-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon name={category.icon} size={32} className="text-[#2563EB]" />
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                {category.name}
              </h1>
            </div>
            <p className="text-[#64748B]">
              {jobs.length} joburi disponibile în această categorie
            </p>
          </motion.div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/job/${job.id}`}>
                  <Card hoverable>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon name={job.icon} size={24} className="text-[#2563EB]" />
                        <h3 className="text-lg font-semibold text-[#0F172A]">
                          {job.name}
                        </h3>
                      </div>
                      <MatchBadge percentage={job.match} size="md" />
                    </div>

                    <p className="text-sm text-[#64748B] mb-4">
                      {job.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="wallet" size={16} className="text-[#16A34A]" />
                        <span className="text-[#334155]">
                          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="graduation" size={16} className="text-[#2563EB]" />
                        <span className="text-[#334155]">{job.studyLevel}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-[#F1F5F9]">
                      {job.requiredSkills.slice(0, 4).map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                      {job.requiredSkills.length > 4 && (
                        <Badge>+{job.requiredSkills.length - 4}</Badge>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
