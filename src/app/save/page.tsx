'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { Header, Container } from '@/components/layout';
import { Card, Input, Button } from '@/components/ui';

export default function SaveProgressPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showBack backHref="/results" />

      <main className="py-16">
        <Container className="max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {!sent ? (
              <Card className="text-center">
                <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail size={32} className="text-[#2563EB]" />
                </div>

                <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
                  Salvează-ți progresul
                </h1>
                <p className="text-[#64748B] mb-6">
                  Îți trimitem un link magic pe email. Click pe el și ești logat instant - fără parolă!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="email@exemplu.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center"
                  />
                  <Button type="submit" className="w-full" disabled={!email.includes('@')}>
                    Trimite link magic
                  </Button>
                </form>

                <p className="text-xs text-[#64748B] mt-4">
                  Fără spam. Doar link-ul de acces.
                </p>
              </Card>
            ) : (
              <Card className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check size={32} className="text-[#16A34A]" />
                </motion.div>

                <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
                  Email trimis!
                </h1>
                <p className="text-[#64748B] mb-2">
                  Am trimis link-ul magic la:
                </p>
                <p className="font-medium text-[#0F172A] mb-6">
                  {email}
                </p>
                <p className="text-sm text-[#64748B]">
                  Verifică inbox-ul (și spam-ul) și dă click pe link pentru a te loga.
                </p>
              </Card>
            )}
          </motion.div>
        </Container>
      </main>
    </div>
  );
}
