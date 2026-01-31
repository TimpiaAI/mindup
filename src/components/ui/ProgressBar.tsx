'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ percentage, className, showLabel = false }: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-end mb-1">
          <span className="text-xs text-[#64748B]">{percentage}%</span>
        </div>
      )}
      <div className="w-full h-1 bg-[#F1F5F9] rounded-[2px]">
        <div
          className="h-full bg-[#2563EB] rounded-[2px] transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
