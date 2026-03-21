/**
 * Tipos comuns compartilhados por toda a aplicação
 */

export enum ProjectCategory {
  TODOS = 'Todos',
  RESIDENCIAL = 'Residencial',
  COMERCIAL = 'Comercial',
  REFORMA = 'Reforma',
  MANUTENCAO = 'Manutenção',
}

export enum ServiceIcon {
  BUILDING = 'Building2',
  WRENCH = 'Wrench',
  HAMMER = 'Hammer',
  SHIELD = 'ShieldCheck',
}

export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'linkedin' | 'youtube';
  url: string;
  label: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}
