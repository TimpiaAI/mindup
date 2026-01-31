'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { Header, Container } from '@/components/layout';
import { Card, Badge, Button } from '@/components/ui';
import { getFacultyById } from '@/lib/mock-data';

export default function FacultyDetailPage({ params }: { params: Promise<{ facultyId: string }> }) {
  const resolvedParams = use(params);
  const facultyId = parseInt(resolvedParams.facultyId);
  const faculty = getFacultyById(facultyId);

  if (!faculty) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#64748B]">Facultatea nu a fost găsită.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header showBack backHref="/results" showActions />

      <main className="py-8">
        <Container className="max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start gap-4">
              {faculty.logoUrl ? (
                <img
                  src={faculty.logoUrl}
                  alt={faculty.shortName}
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-[4px] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{faculty.shortName}</span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-[#0F172A] mb-1">{faculty.name}</h1>
                <p className="text-[#64748B]">{faculty.university}</p>
                <p className="text-sm text-[#64748B]">{faculty.city}, {faculty.county}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-[#0F172A]">{faculty.duration}</div>
                    <div className="text-xs text-[#64748B]">ani</div>
                  </Card>
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-[#2563EB]">{faculty.difficulty}/10</div>
                    <div className="text-xs text-[#64748B]">dificultate</div>
                  </Card>
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-[#16A34A]">{faculty.employmentRate}%</div>
                    <div className="text-xs text-[#64748B]">angajare</div>
                  </Card>
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-[#CA8A04]">{faculty.minGrade}</div>
                    <div className="text-xs text-[#64748B]">medie min.</div>
                  </Card>
                </div>
              </motion.div>

              {/* Admission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Admitere</h2>
                  <p className="text-sm text-[#334155] mb-4">{faculty.admissionProcess}</p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xs text-[#64748B] mb-1">Înscriere</div>
                      <div className="text-sm font-medium text-[#0F172A]">{faculty.admissionDates.registration}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#64748B] mb-1">Examen</div>
                      <div className="text-sm font-medium text-[#0F172A]">{faculty.admissionDates.exam}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#64748B] mb-1">Rezultate</div>
                      <div className="text-sm font-medium text-[#0F172A]">{faculty.admissionDates.results}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Curriculum */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Curriculum</h2>
                  <div className="space-y-3">
                    {Object.entries(faculty.curriculum).map(([year, subjects]) => (
                      <div key={year} className="flex gap-4">
                        <div className="w-20 flex-shrink-0">
                          <Badge>{year}</Badge>
                        </div>
                        <p className="text-sm text-[#334155]">{subjects}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Recenzii</h2>
                  <div className="space-y-4">
                    {faculty.reviews.map((review, index) => (
                      <div key={index} className="pb-4 border-b border-[#F1F5F9] last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium text-[#0F172A]">{review.author}</div>
                            <div className="text-xs text-[#64748B]">{review.status}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? 'fill-[#CA8A04] text-[#CA8A04]' : 'text-[#CBD5E1]'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#334155]">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <h3 className="font-semibold text-[#0F172A] mb-4">Informații</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Durată</span>
                      <span className="text-[#0F172A]">{faculty.duration} ani</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Credite</span>
                      <span className="text-[#0F172A]">{faculty.credits} ECTS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Limba</span>
                      <span className="text-[#0F172A]">{faculty.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Locuri buget</span>
                      <span className="text-[#0F172A]">{faculty.budgetSeats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Locuri taxă</span>
                      <span className="text-[#0F172A]">{faculty.feeSeats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Taxă anuală</span>
                      <span className="text-[#0F172A]">{faculty.yearlyFee} RON</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Abandon</span>
                      <span className="text-[#DC2626]">{faculty.dropoutRate}%</span>
                    </div>
                  </div>

                  <a
                    href={`https://${faculty.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block"
                  >
                    <Button variant="secondary" className="w-full">
                      <ExternalLink size={14} className="mr-2" />
                      Website oficial
                    </Button>
                  </a>
                </Card>
              </motion.div>
            </aside>
          </div>
        </Container>
      </main>
    </div>
  );
}
