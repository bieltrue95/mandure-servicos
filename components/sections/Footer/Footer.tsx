import { Button } from '@/components/ui/button';
import { PAGE_CONFIG, SITE_CONFIG } from '@/lib/constants/config';
import { NAV_ITEMS } from '@/lib/constants/routes';
import {
  ArrowUpRight,
  Building2,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import type { FooterProps } from './Footer.types';

/**
 * Rodapé institucional da landing page.
 * Consolida marca, atalhos de navegação e canais de contato em um bloco final escuro.
 */
export function Footer({ whatsappUrl, navigationItems = NAV_ITEMS }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phoneHref = `tel:${PAGE_CONFIG.phone.replace(/\D/g, '')}`;
  const emailHref = `mailto:${PAGE_CONFIG.email}`;

  const contactItems = [
    {
      label: 'Telefone',
      value: PAGE_CONFIG.phone,
      href: phoneHref,
      icon: Phone,
    },
    {
      label: 'E-mail',
      value: PAGE_CONFIG.email,
      href: emailHref,
      icon: Mail,
    },
    {
      label: 'Endereço',
      value: `${PAGE_CONFIG.address}, ${PAGE_CONFIG.city} - ${PAGE_CONFIG.state}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${PAGE_CONFIG.address}, ${PAGE_CONFIG.city}, ${PAGE_CONFIG.state}`)}`,
      icon: MapPin,
    },
  ] as const;

  const socialItems = [
    {
      label: 'Instagram',
      href: PAGE_CONFIG.instagram,
      icon: Instagram,
    },
    {
      label: 'Facebook',
      href: PAGE_CONFIG.facebook,
      icon: Facebook,
    },
  ] as const;

  return (
    <footer
      className="relative overflow-hidden bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white"
      role="contentinfo"
      aria-label="Rodapé - Mandure Serviços"
    >
      {/* Camadas de fundo para manter o footer coerente com o visual dark premium da landing. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,135,109,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent" />

      <div className="container-max section-padding relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)_minmax(0,1fr)]">
          {/* Bloco institucional com marca, posicionamento e CTA principal. */}
          <div className="max-w-xl">
            <a
              href="#hero"
              className="inline-flex items-center gap-3"
              aria-label="Mandure Serviços - voltar ao topo"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bronze-shimmer text-white shadow-primary">
                <Building2 className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-black uppercase tracking-[0.26em] text-slate-950 dark:text-white">
                  {PAGE_CONFIG.companyName}
                </span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">
                  {PAGE_CONFIG.companyTagline}
                </span>
              </span>
            </a>

            <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-white/10 dark:bg-white/[0.03]">
                Obras residenciais e comerciais
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-white/10 dark:bg-white/[0.03]">
                Atendimento em São Paulo e Grande SP
              </span>
            </div>

            <div className="mt-8">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary-500 text-white hover:bg-primary-600">
                  <MessageCircle className="h-4 w-4" />
                  Solicitar orçamento no WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Atalhos internos para reduzir atrito na navegação da home. */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
              Navegação
            </p>
            <nav className="mt-5 flex flex-col gap-3" aria-label="Links rápidos do rodapé">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-200 dark:hover:text-white"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-primary-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </nav>
          </div>

          {/* Coluna de contato com links clicáveis para telefone, e-mail, mapa e redes sociais. */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
              Contato
            </p>

            <div className="mt-5 space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Endereço' ? '_blank' : undefined}
                    rel={item.label === 'Endereço' ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.05]"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                        {item.value}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Faixa final com assinatura institucional e atalhos operacionais. */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p>
            © Todos os direitos reservados {PAGE_CONFIG.companyName} {currentYear}.
          </p>
        </div>
      </div>
    </footer>
  );
}
