import type { ProcessStep } from '@/lib/types';

export interface ProcessProps {
  steps: ProcessStep[];
}

export interface ProcessStepCardProps {
  step: ProcessStep;
  isLast: boolean;
}
