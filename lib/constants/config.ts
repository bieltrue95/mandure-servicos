import type { PageConfig, FeatureFlags } from '@/lib/types';

export const PAGE_CONFIG: PageConfig = {
  companyName: 'Mandure Serviços',
  companyTagline: 'Construindo com solidez e precisão há mais de 15 anos',
  whatsappNumber: '5511999999999',
  whatsappDefaultMessage:
    'Olá! Gostaria de solicitar um orçamento para meu projeto. Poderia me ajudar?',
  email: 'contato@mandureservicos.com.br',
  phone: '(11) 9 9999-9999',
  address: 'Av. Paulista, 1000, Sala 101',
  city: 'São Paulo',
  state: 'SP',
  instagram: 'https://instagram.com/mandureservicos',
  facebook: 'https://facebook.com/mandureservicos',
};

export const SITE_CONFIG = {
  name: 'Mandure Serviços',
  url: 'https://mandureservicos.com.br',
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
