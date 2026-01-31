'use client';

import {
  Code,
  Palette,
  TrendingUp,
  PenTool,
  MessageCircle,
  Microscope,
  Heart,
  Gamepad2,
  Music,
  Trophy,
  Plane,
  ChefHat,
  Monitor,
  Cog,
  RefreshCw,
  Smartphone,
  Cloud,
  Search,
  Brain,
  Sparkles,
  BarChart3,
  ClipboardList,
  Target,
  Building2,
  GraduationCap,
  Zap,
  Mountain,
  BookOpen,
  Star,
  User,
  Users,
  Briefcase,
  FileText,
  Award,
  Wallet,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Gem,
  Backpack,
  Scroll,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  // Passions
  'tech': Code,
  'design': Palette,
  'business': TrendingUp,
  'writing': PenTool,
  'communication': MessageCircle,
  'research': Microscope,
  'helping': Heart,
  'gaming': Gamepad2,
  'music': Music,
  'sports': Trophy,
  'travel': Plane,
  'cooking': ChefHat,

  // Career categories
  'it-software': Code,
  'ux-ui': Palette,
  'data-science': BarChart3,
  'product': ClipboardList,
  'game-dev': Gamepad2,
  'marketing': Smartphone,

  // Jobs
  'frontend': Monitor,
  'backend': Cog,
  'fullstack': RefreshCw,
  'mobile': Smartphone,
  'devops': Cloud,
  'qa': Search,
  'ux': Brain,
  'ui': Palette,
  'product-design': Sparkles,
  'data-analyst': TrendingUp,
  'data-scientist': Microscope,
  'pm': Target,
  'game': Gamepad2,

  // Faculties
  'building': Building2,
  'graduation': GraduationCap,
  'energy': Zap,
  'mountain': Mountain,
  'book': BookOpen,
  'star': Star,

  // General
  'user': User,
  'users': Users,
  'briefcase': Briefcase,
  'document': FileText,
  'award': Award,
  'wallet': Wallet,
  'location': MapPin,
  'calendar': Calendar,
  'clock': Clock,
  'check': CheckCircle,
  'gem': Gem,
  'backpack': Backpack,
  'scroll': Scroll,
  'sparkles': Sparkles,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = iconMap[name] || Code;
  return <IconComponent size={size} className={cn('flex-shrink-0', className)} />;
}

// Export icon names for type safety
export type IconName = keyof typeof iconMap;
