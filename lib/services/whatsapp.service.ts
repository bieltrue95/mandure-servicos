import { PAGE_CONFIG } from '@/lib/constants/config';

interface WhatsAppOptions {
  phone?: string;
  message?: string;
}

export class WhatsAppService {
  static generateUrl(options: WhatsAppOptions = {}): string {
    const phone = options.phone ?? PAGE_CONFIG.whatsappNumber;
    const message = options.message ?? PAGE_CONFIG.whatsappDefaultMessage;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  static open(options: WhatsAppOptions = {}): void {
    const url = WhatsAppService.generateUrl(options);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  static generateBudgetMessage(projectType: string, details?: string): string {
    const base = `Olá! Gostaria de solicitar um orçamento para ${projectType}.`;
    if (details) {
      return `${base} Detalhes: ${details}`;
    }
    return base;
  }

  static isValidBrazilianNumber(phone: string): boolean {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 || digits.length === 11 || digits.length === 13;
  }
}
