'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Header, Container } from '@/components/layout';
import { Card, Button, MatchBadge, Icon } from '@/components/ui';
import { useAppStore } from '@/lib/store';

export default function ResultsPage() {
  const { user, visibleCategories, dismissCategory } = useAppStore();

  return (
    <div className="min-h-screen bg-white">
      <Header showActions />

      <main className="py-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
              Bună, {user.name || 'Andrei'}!
            </h1>
            <p className="text-[#64748B]">
              Am găsit {visibleCategories.length} cariere care ți se potrivesc.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, x: 100 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card hoverable className="h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Icon name={category.icon} size={24} className="text-[#2563EB]" />
                        <h3 className="text-lg font-semibold text-[#0F172A]">
                          {category.name}
                        </h3>
                      </div>
                      <MatchBadge percentage={category.match} />
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-[#334155] mb-2">De ce:</p>
                      <ul className="space-y-1">
                        {category.reasons.slice(0, 3).map((reason, i) => (
                          <li key={i} className="text-sm text-[#64748B] flex items-start">
                            <span className="mr-2 text-[#CBD5E1]">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                      <Link href={`/career/${category.id}`}>
                        <Button variant="ghost" size="sm" className="text-[#2563EB]">
                          Explorează →
                        </Button>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissCategory(category.id);
                        }}
                        className="p-2 text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-[4px] transition-colors"
                        title="Elimină această categorie"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-[#64748B] mt-8"
          >
            Click pe ✕ pentru a elimina o carieră și a vedea alte opțiuni
          </motion.p>
        </Container>
      </main>
    </div>
  );
}
