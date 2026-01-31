'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

interface HeaderProps {
  showBack?: boolean;
  backHref?: string;
  showActions?: boolean;
}

export function Header({ showBack = false, backHref, showActions = false }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#CBD5E1]">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            {showBack && (
              <Link
                href={backHref || '/'}
                className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Înapoi</span>
              </Link>
            )}
            <Link href="/" className="text-lg font-semibold text-[#0F172A]">
              PathFinder
            </Link>
          </div>

          {showActions && (
            <div className="flex items-center gap-2">
              <Link href="/cv">
                <Button variant="ghost" size="sm">
                  Vezi CV
                </Button>
              </Link>
              <Link href="/save">
                <Button variant="secondary" size="sm">
                  Salvează
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
