'use client';

import { getMatchColor } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface MatchBadgeProps {
  percentage: number;
  className?: string;
}

export function MatchBadge({ percentage, className }: MatchBadgeProps) {
  return (
    <span className={cn('text-sm font-semibold', getMatchColor(percentage), className)}>
      {percentage}% match
    </span>
  );
}
