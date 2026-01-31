'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Globe, Mail, Phone, Check } from 'lucide-react';
import { Header, Container } from '@/components/layout';
import { Card, Badge, Button, Icon } from '@/components/ui';
import { getCompanyById } from '@/lib/mock-data';

export default function CompanyDetailPage({ params }: { params: Promise<{ companyId: string }> }) {
  const resolvedParams = use(params);
  const companyId = parseInt(resolvedParams.companyId);
  const company = getCompanyById(companyId);

  if (!company) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#64748B]">Compania nu a fost găsită.</p>
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
              <div className="w-20 h-20 bg-[#F1F5F9] rounded-[4px] flex items-center justify-center text-4xl font-bold text-[#2563EB]">
                {company.logo}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0F172A] mb-1">{company.name}</h1>
                <p className="text-[#64748B] italic mb-2">{company.tagline}</p>
                <div className="flex flex-wrap gap-3 text-sm text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {company.cities.join(', ')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {company.employees}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Despre companie</h2>
                  <p className="text-sm text-[#334155] mb-4">{company.description}</p>
                  <p className="text-sm text-[#64748B]">{company.story}</p>
                </Card>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Beneficii</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {company.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Check size={14} className="text-[#16A34A] mt-0.5 flex-shrink-0" />
                        <span className="text-[#334155]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Open Positions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-4">
                    Poziții deschise ({company.openPositions.length})
                  </h2>
                  <div className="space-y-3">
                    {company.openPositions.map((position, index) => (
                      <div
                        key={index}
                        className="p-4 border border-[#CBD5E1] rounded-[4px] hover:border-[#2563EB] transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-[#0F172A]">{position.title}</h3>
                            <div className="flex gap-2 mt-1">
                              <Badge>{position.type}</Badge>
                              <Badge variant="default">{position.experience}</Badge>
                            </div>
                          </div>
                          <Button size="sm">Aplică</Button>
                        </div>
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
                  <h3 className="font-semibold text-[#0F172A] mb-4">Contact HR</h3>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${company.hrEmail}`}
                      className="flex items-center gap-2 text-sm text-[#334155] hover:text-[#2563EB] transition-colors"
                    >
                      <Mail size={16} className="text-[#64748B]" />
                      {company.hrEmail}
                    </a>
                    <a
                      href={`tel:${company.hrPhone}`}
                      className="flex items-center gap-2 text-sm text-[#334155] hover:text-[#2563EB] transition-colors"
                    >
                      <Phone size={16} className="text-[#64748B]" />
                      {company.hrPhone}
                    </a>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#334155] hover:text-[#2563EB] transition-colors"
                    >
                      <Globe size={16} className="text-[#64748B]" />
                      {company.website}
                    </a>
                  </div>

                  <Button className="w-full mt-4">
                    <Mail size={14} className="mr-2" />
                    Contactează HR
                  </Button>
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
                    Trimite email automat la toate pozițiile deschise ale acestei companii.
                  </p>
                  <Button className="w-full">Aplică la toate</Button>
                </Card>
              </motion.div>
            </aside>
          </div>
        </Container>
      </main>
    </div>
  );
}
