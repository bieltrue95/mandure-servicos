import type { StatItem } from '@/lib/types';

export interface StatsProps {
  stats: StatItem[];
}

export interface AnimatedCounterProps {
  value: number;
  suffix: string;
}
