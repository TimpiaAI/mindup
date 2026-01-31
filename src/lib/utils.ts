import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min: number, max: number, currency: string = 'RON'): string {
  const formatNumber = (n: number) => {
    if (n >= 1000) {
      return `${(n / 1000).toFixed(0)}K`;
    }
    return n.toString();
  };
  return `${formatNumber(min)}-${formatNumber(max)} ${currency}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
