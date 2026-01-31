'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#334155] mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-3 py-2 bg-white text-[#0F172A] text-base',
            'border border-[#CBD5E1] rounded-[4px]',
            'focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]',
            'transition-colors duration-150',
            'appearance-none cursor-pointer',
            error && 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]',
            className
          )}
          {...props}
        >
          <option value="">Selectează...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-[#DC2626]">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
