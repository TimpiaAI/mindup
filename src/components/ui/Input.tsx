'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#334155] mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 py-2 bg-white text-[#0F172A] text-base',
            'border border-[#CBD5E1] rounded-[4px]',
            'placeholder:text-[#64748B]',
            'focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]',
            'transition-colors duration-150',
            error && 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[#DC2626]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
