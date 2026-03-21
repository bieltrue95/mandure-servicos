import type { Service } from '@/lib/types';

export interface ServicesProps {
  services: Service[];
  whatsappUrl: string;
}

export interface ServiceCardProps {
  service: Service;
  whatsappUrl: string;
}
