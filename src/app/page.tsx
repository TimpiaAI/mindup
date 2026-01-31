'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui';
import { Container } from '@/components/layout';
import { useAppStore } from '@/lib/store';

const stats = [
  { value: '10K+', label: 'Utilizatori' },
  { value: '500+', label: 'Cariere' },
  { value: '200+', label: 'Facultăți' },
  { value: '50+', label: 'Companii' },
];

const steps = [
  {
    number: '1',
    title: 'Completezi profilul',
    description: 'Întrebări despre tine, ce știi, ce ai făcut. Durează 5 minute.'
  },
  {
    number: '2',
    title: 'AI analizează',
    description: 'Generăm CV-ul tău și calculăm potrivirea cu sute de cariere.'
  },
  {
    number: '3',
    title: 'Explorezi opțiunile',
    description: 'Vezi joburi, facultăți, companii care angajează. Vorbești cu mentori AI.'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#CBD5E1]">
        <Container>
          <div className="flex items-center justify-between h-14">
            <span className="text-lg font-semibold text-[#0F172A]">PathFinder</span>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
            Găsește-ți direcția în carieră
          </h1>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto mb-8">
            Completezi profilul în 5 minute. AI-ul analizează și îți arată
            carierele care ți se potrivesc.
          </p>
          <Link href="/start/name">
            <Button size="lg">
              Începe gratuit
            </Button>
          </Link>
          <p className="mt-4 text-sm text-[#64748B]">
            Fără card. Fără cont. 100% gratuit.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-[#F1F5F9]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[#0F172A]">{stat.value}</div>
                <div className="text-sm text-[#64748B] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* How it works Section */}
      <section className="py-16 bg-[#F1F5F9]">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[#0F172A] mb-8">
              Cum funcționează
            </h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2563EB] text-white rounded-[4px] flex items-center justify-center font-semibold text-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] mb-1">{step.title}</h3>
                    <p className="text-[#64748B]">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#CBD5E1]">
        <Container>
          <p className="text-center text-sm text-[#64748B]">
            Made with care for Romanian students
          </p>
        </Container>
      </footer>
    </div>
  );
}
