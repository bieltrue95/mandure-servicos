type EventName = string;
type EventProperties = Record<string, string | number | boolean>;
type Gtag = (command: 'event', eventName: EventName, properties?: EventProperties) => void;

export class AnalyticsService {
  private static initialized = false;

  static init(trackingId?: string): void {
    if (this.initialized || !trackingId) return;
    this.initialized = true;
    // Google Analytics initialization would go here
    console.info('[Analytics] Initialized with ID:', trackingId);
  }

  static trackEvent(eventName: EventName, properties?: EventProperties): void {
    if (!this.initialized) return;
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as Window & { gtag?: Gtag }).gtag;
      if (typeof gtag === 'function') {
        gtag('event', eventName, properties);
      }
    }
  }

  static trackWhatsAppClick(source: string): void {
    this.trackEvent('whatsapp_click', { source });
  }

  static trackPortfolioFilter(category: string): void {
    this.trackEvent('portfolio_filter', { category });
  }

  static trackSectionView(sectionName: string): void {
    this.trackEvent('section_view', { section: sectionName });
  }
}
