import type { PageConfig, FeatureFlags } from '@/lib/types';

const DEFAULT_SITE_URL = 'https://mandureservicos.com.br';
const normalizeSiteUrl = (url: string): string => url.replace(/\/+$/, '');
const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);

export const PAGE_CONFIG: PageConfig = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Mandure Serviços',
  companyTagline:
    process.env.NEXT_PUBLIC_COMPANY_TAGLINE ||
    'Construindo com solidez e precisão há mais de 15 anos',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999',
  whatsappDefaultMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    'Olá! Gostaria de solicitar um orçamento para meu projeto. Poderia me ajudar?',
  email: process.env.NEXT_PUBLIC_EMAIL || 'contato@mandureservicos.com.br',
  phone: process.env.NEXT_PUBLIC_PHONE || '(11) 9 9999-9999',
  address: process.env.NEXT_PUBLIC_ADDRESS || 'Av. Paulista, 1000, Sala 101',
  city: process.env.NEXT_PUBLIC_CITY || 'São Paulo',
  state: process.env.NEXT_PUBLIC_STATE || 'SP',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || 'https://instagram.com/mandureservicos',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || 'https://facebook.com/mandureservicos',
};

export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Mandure Serviços',
  url: siteUrl,
  description:
    'Empreiteira especializada em construção civil, reformas e manutenção predial. Atendemos São Paulo e Grande SP com excelência e pontualidade.',
  keywords: [
    'empreiteira',
    'construção civil',
    'reforma',
    'manutenção predial',
    'São Paulo',
    'obras residenciais',
    'obras comerciais',
    'empreiteira SP',
  ],
  locale: 'pt-BR',
  type: 'website',
} as const;

export const FEATURE_FLAGS: FeatureFlags = {
  enableWhatsApp: true,
  enableAnalytics: false,
  enablePWA: true,
  enableAnimations: true,
};
