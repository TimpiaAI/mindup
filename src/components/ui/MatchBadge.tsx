'use client';

import { cn } from '@/lib/utils';

interface MatchBadgeProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getMatchGradient = (percentage: number) => {
  if (percentage >= 80) return 'from-[#16A34A] to-[#22C55E]';
  if (percentage >= 60) return 'from-[#2563EB] to-[#3B82F6]';
  if (percentage >= 40) return 'from-[#CA8A04] to-[#EAB308]';
  return 'from-[#DC2626] to-[#EF4444]';
};

const sizeClasses = {
  sm: 'w-12 h-12 text-sm',
  md: 'w-16 h-16 text-lg',
  lg: 'w-20 h-20 text-xl',
};

export function MatchBadge({ percentage, size = 'md', className }: MatchBadgeProps) {
  const gradient = getMatchGradient(percentage);
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full bg-gradient-to-br text-white font-bold shadow-lg',
        gradient,
        sizeClass,
        className
      )}
    >
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
        <span className={cn(
          'font-bold bg-gradient-to-br bg-clip-text text-transparent',
          gradient.replace('from-', 'from-').replace('to-', 'to-')
        )}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}
