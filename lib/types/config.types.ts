/**
 * Tipos de configuração da aplicação
 */

export interface PageConfig {
  companyName: string;
  companyTagline: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  instagram?: string;
  facebook?: string;
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
}

export interface FeatureFlags {
  enableWhatsApp: boolean;
  enableAnalytics: boolean;
  enablePWA: boolean;
  enableAnimations: boolean;
}
