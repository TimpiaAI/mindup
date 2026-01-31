'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button, ProgressBar } from '@/components/ui';
import { Container } from '@/components/layout';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  backHref?: string;
  nextHref?: string;
  nextLabel?: string;
  onNext?: () => void;
  canContinue?: boolean;
}

export function OnboardingLayout({
  children,
  step,
  totalSteps,
  title,
  subtitle,
  backHref,
  nextHref,
  nextLabel = 'Continuă',
  onNext,
  canContinue = true
}: OnboardingLayoutProps) {
  const percentage = (step / totalSteps) * 100;

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#CBD5E1]">
        <Container>
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              {backHref && (
                <Link
                  href={backHref}
                  className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span className="hidden sm:inline">Înapoi</span>
                </Link>
              )}
            </div>
            <span className="text-lg font-semibold text-[#0F172A]">PathFinder</span>
            <div className="w-16" />
          </div>
        </Container>
      </header>

      {/* Progress */}
      <div className="py-4 border-b border-[#F1F5F9]">
        <Container>
          <div className="flex items-center gap-4">
            <ProgressBar percentage={percentage} className="flex-1" />
            <span className="text-xs text-[#64748B] whitespace-nowrap">
              {step}/{totalSteps}
            </span>
          </div>
        </Container>
      </div>

      {/* Content */}
      <main className="flex-1 py-12">
        <Container className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[#64748B]">{subtitle}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-[#CBD5E1] py-4">
        <Container className="max-w-lg mx-auto">
          {nextHref ? (
            <Link href={nextHref} className="block">
              <Button
                size="lg"
                className="w-full"
                disabled={!canContinue}
                onClick={handleNext}
              >
                {nextLabel} →
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              className="w-full"
              disabled={!canContinue}
              onClick={handleNext}
            >
              {nextLabel} →
            </Button>
          )}
        </Container>
      </footer>
    </div>
  );
}
