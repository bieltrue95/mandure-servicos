import { ServiceIcon } from './common.types';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  features: string[];
  highlighted?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}
