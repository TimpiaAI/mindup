'use client';

import { motion } from 'framer-motion';
import { Download, Share2, Edit } from 'lucide-react';
import { Header, Container } from '@/components/layout';
import { Card, Badge, Button } from '@/components/ui';
import { GENERATED_CV } from '@/lib/mock-data';

export default function CVPreviewPage() {
  const cv = GENERATED_CV;

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Header showBack backHref="/results" />

      <main className="py-8">
        <Container className="max-w-3xl">
          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end gap-2 mb-6"
          >
            <Button variant="secondary" size="sm">
              <Edit size={14} className="mr-1" />
              Editează
            </Button>
            <Button variant="secondary" size="sm">
              <Share2 size={14} className="mr-1" />
              Partajează
            </Button>
            <Button size="sm">
              <Download size={14} className="mr-1" />
              Descarcă PDF
            </Button>
          </motion.div>

          {/* CV Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b border-[#F1F5F9]">
                <h1 className="text-3xl font-bold text-[#0F172A] mb-1">
                  {cv.personalInfo.name}
                </h1>
                <p className="text-lg text-[#2563EB] font-medium mb-3">
                  {cv.personalInfo.title}
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-[#64748B]">
                  <span>{cv.personalInfo.location}</span>
                  <span>{cv.personalInfo.email}</span>
                  <span>{cv.personalInfo.phone}</span>
                </div>
                <div className="flex justify-center gap-4 text-sm text-[#2563EB] mt-2">
                  <a href={`https://${cv.personalInfo.linkedin}`} className="hover:underline">
                    LinkedIn
                  </a>
                  <a href={`https://${cv.personalInfo.github}`} className="hover:underline">
                    GitHub
                  </a>
                </div>
              </div>

              {/* Summary */}
              <section className="mb-6">
                <h2 className="text-lg font-semibold text-[#0F172A] mb-2 uppercase tracking-wide text-sm">
                  Despre mine
                </h2>
                <p className="text-sm text-[#334155]">{cv.summary}</p>
              </section>

              {/* Skills */}
              <section className="mb-6">
                <h2 className="text-lg font-semibold text-[#0F172A] mb-3 uppercase tracking-wide text-sm">
                  Competențe
                </h2>
                <div className="mb-3">
                  <p className="text-xs text-[#64748B] mb-2">Tehnice</p>
                  <div className="flex flex-wrap gap-2">
                    {cv.skills.technical.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-2">Soft skills</p>
                  <div className="flex flex-wrap gap-2">
                    {cv.skills.soft.map((skill) => (
                      <Badge key={skill} variant="success">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </section>

              {/* Experience */}
              <section className="mb-6">
                <h2 className="text-lg font-semibold text-[#0F172A] mb-3 uppercase tracking-wide text-sm">
                  Experiență
                </h2>
                <div className="space-y-4">
                  {cv.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-[#0F172A]">{exp.title}</h3>
                        <span className="text-xs text-[#64748B]">{exp.period}</span>
                      </div>
                      <p className="text-sm text-[#2563EB] mb-2">{exp.company}</p>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-sm text-[#334155]">{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className="mb-6">
                <h2 className="text-lg font-semibold text-[#0F172A] mb-3 uppercase tracking-wide text-sm">
                  Educație
                </h2>
                {cv.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#0F172A]">{edu.degree}</h3>
                      <p className="text-sm text-[#64748B]">{edu.institution}</p>
                      {edu.details && (
                        <p className="text-xs text-[#64748B]">{edu.details}</p>
                      )}
                    </div>
                    <span className="text-xs text-[#64748B]">{edu.period}</span>
                  </div>
                ))}
              </section>

              {/* Projects */}
              <section className="mb-6">
                <h2 className="text-lg font-semibold text-[#0F172A] mb-3 uppercase tracking-wide text-sm">
                  Proiecte
                </h2>
                <div className="space-y-3">
                  {cv.projects.map((project, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-[#0F172A]">{project.name}</h3>
                      <p className="text-sm text-[#334155] mb-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section className="mb-6">
                <h2 className="text-lg font-semibold text-[#0F172A] mb-3 uppercase tracking-wide text-sm">
                  Certificări
                </h2>
                {cv.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#0F172A]">{cert.name}</h3>
                      <p className="text-sm text-[#64748B]">{cert.issuer}</p>
                    </div>
                    <span className="text-xs text-[#64748B]">{cert.year}</span>
                  </div>
                ))}
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-lg font-semibold text-[#0F172A] mb-3 uppercase tracking-wide text-sm">
                  Limbi străine
                </h2>
                <div className="flex flex-wrap gap-4">
                  {cv.languages.map((lang) => (
                    <div key={lang.name} className="text-sm">
                      <span className="font-medium text-[#0F172A]">{lang.name}</span>
                      <span className="text-[#64748B]"> - {lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            </Card>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs text-[#64748B] mt-6"
          >
            CV generat automat de PathFinder AI pe baza profilului tău
          </motion.p>
        </Container>
      </main>
    </div>
  );
}
