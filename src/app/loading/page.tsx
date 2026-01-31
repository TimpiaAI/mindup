'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '@/components/layout';
import { ProgressBar } from '@/components/ui';

const steps = [
  { id: 1, label: 'Analizăm profilul tău...' },
  { id: 2, label: 'Procesăm skillurile și experiențele...' },
  { id: 3, label: 'Calculăm potrivirea cu carierele...' },
  { id: 4, label: 'Pregătim recomandările personalizate...' },
];

export default function LoadingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 800;
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    // Navigate to results after animation completes
    const timeout = setTimeout(() => {
      router.push('/results');
    }, steps.length * stepDuration + 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Container className="max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-8 border-4 border-[#F1F5F9] border-t-[#2563EB] rounded-full"
          />

          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
            Se procesează profilul tău
          </h1>
          <p className="text-[#64748B] mb-8">
            AI-ul nostru analizează datele tale pentru a găsi cele mai bune potriviri
          </p>

          {/* Progress bar */}
          <ProgressBar percentage={progress} showLabel className="mb-8" />

          {/* Steps */}
          <div className="space-y-3 text-left">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.5
                }}
                className="flex items-center gap-3"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  index < currentStep
                    ? 'bg-[#16A34A]'
                    : index === currentStep
                    ? 'bg-[#2563EB]'
                    : 'bg-[#F1F5F9]'
                }`}>
                  {index < currentStep ? (
                    <Check size={12} className="text-white" />
                  ) : index === currentStep ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  ) : null}
                </div>
                <span className={`text-sm ${
                  index <= currentStep ? 'text-[#0F172A]' : 'text-[#64748B]'
                }`}>
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
