'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  hasSkill?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', hasSkill = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-[#F1F5F9] text-[#334155]',
      success: 'bg-[#DCFCE7] text-[#16A34A]',
      warning: 'bg-[#FEF3C7] text-[#CA8A04]',
      error: 'bg-[#FEE2E2] text-[#DC2626]'
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-1 text-xs font-medium rounded-[2px]',
          hasSkill ? 'bg-[#DCFCE7] text-[#16A34A]' : variants[variant],
          className
        )}
        {...props}
      >
        {hasSkill && <Check size={12} className="mr-1" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
