export * from './common.types';
export * from './config.types';
export * from './project.types';
export * from './service.types';
export * from './testimonial.types';

// Props interfaces for components
export interface HeroProps {
  whatsappUrl: string;
}

export interface StatsProps {
  stats: StatItem[];
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description?: string;
}

export interface ServicesProps {
  services: import('./service.types').Service[];
  whatsappUrl: string;
}

export interface PortfolioProps {
  projects: import('./project.types').Project[];
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessProps {
  steps: ProcessStep[];
}

export interface TestimonialsProps {
  testimonials: import('./testimonial.types').Testimonial[];
}

export interface Certification {
  id: string;
  name: string;
  logo: import('./common.types').ImageData;
  description?: string;
  year?: number;
}

export interface CertificationsProps {
  certifications: Certification[];
}

export interface CTAFinalProps {
  whatsappUrl: string;
}

export interface WhatsAppButtonProps {
  whatsappUrl: string;
  message?: string;
}
