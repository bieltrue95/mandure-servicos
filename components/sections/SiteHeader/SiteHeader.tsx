'use client';

import { Logo } from '@/components/ui/logo';
import { PAGE_CONFIG } from '@/lib/constants/config';
import { NAV_ITEMS } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { SiteHeaderProps } from './SiteHeader.types';

const DESKTOP_BREAKPOINT = 1024;

/**
 * Header global em modo claro fixo.
 * O desktop usa uma faixa inteira no topo e o mobile/tablet abre um drawer lateral.
 */
export function SiteHeader({ navigationItems = NAV_ITEMS }: SiteHeaderProps) {
  const drawerId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(navigationItems[0]?.href ?? '#servicos');

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNavigationItemClick = (href: string) => {
    // Atualiza o estado imediatamente para o feedback visual não depender só do scroll spy.
    setActiveHref(href);
    closeDrawer();
  };

  // Deixa a barra superior mais marcada quando o usuário sai do topo.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Bloqueia o scroll do documento enquanto o drawer estiver aberto e fecha com ESC.
  useEffect(() => {
    if (!isDrawerOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  // Fecha o drawer quando a viewport volta para desktop para evitar estados inconsistentes.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Sincroniza o item ativo com a posição real da página para o nav acompanhar o scroll.
  useEffect(() => {
    const getNavigableSections = () =>
      navigationItems
        .map((item) => {
          const section = document.querySelector(item.href);

          if (!(section instanceof HTMLElement)) {
            return null;
          }

          return { href: item.href, element: section };
        })
        .filter(
          (
            section
          ): section is {
            href: string;
            element: HTMLElement;
          } => section !== null
        );

    const syncActiveHrefWithHash = () => {
      if (!window.location.hash) {
        return;
      }

      const matchingNavigationItem = navigationItems.find(
        (item) => item.href === window.location.hash
      );

      if (matchingNavigationItem) {
        setActiveHref(matchingNavigationItem.href);
      }
    };

    const syncActiveHrefWithScroll = () => {
      const sections = getNavigableSections();

      if (sections.length === 0) {
        return;
      }

      const scrollPosition = window.scrollY + 160;
      const isAtPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

      if (isAtPageBottom) {
        setActiveHref(sections[sections.length - 1].href);
        return;
      }

      const currentSection = sections
        .slice()
        .reverse()
        .find(({ element }) => scrollPosition >= element.offsetTop);

      setActiveHref(currentSection?.href ?? sections[0].href);
    };

    let animationFrameId = 0;

    const handleScrollSpy = () => {
      if (animationFrameId !== 0) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        syncActiveHrefWithScroll();
        animationFrameId = 0;
      });
    };

    syncActiveHrefWithHash();
    syncActiveHrefWithScroll();
    window.addEventListener('hashchange', syncActiveHrefWithHash);
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    window.addEventListener('resize', handleScrollSpy);

    return () => {
      window.removeEventListener('hashchange', syncActiveHrefWithHash);
      window.removeEventListener('scroll', handleScrollSpy);
      window.removeEventListener('resize', handleScrollSpy);

      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [navigationItems]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[70] w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-all duration-300',
          isScrolled && 'border-slate-200 shadow-lg shadow-slate-200/50'
        )}
        role="banner"
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#hero"
            className="flex min-w-0 shrink-0 items-center gap-3"
            aria-label="Voltar para o topo da página"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-primary">
              <Logo size="sm" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black uppercase tracking-[0.24em] text-slate-900">
                {PAGE_CONFIG.companyName}
              </span>
              <span className="hidden truncate text-xs text-slate-500 sm:block">
                {PAGE_CONFIG.companyTagline}
              </span>
            </span>
          </a>

          {/* A navegação ocupa toda a faixa disponível do header no desktop. */}
          <nav
            className="hidden flex-1 items-center justify-center gap-2 px-6 lg:flex"
            aria-label="Navegação principal desktop"
          >
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? 'location' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                  activeHref === item.href
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                )}
                onClick={() => handleNavigationItemClick(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              aria-controls={drawerId}
              aria-expanded={isDrawerOpen}
              aria-label={isDrawerOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition-all duration-300 hover:bg-slate-100"
              onClick={() => setIsDrawerOpen((currentState) => !currentState)}
            >
              {isDrawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay clicável para fechar o drawer sem depender do botão de fechar. */}
            <motion.button
              type="button"
              className="fixed inset-0 z-[78] bg-slate-950/35 lg:hidden"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />

            {/* Drawer com fundo sólido para evitar transparência visual em mobile e tablet. */}
            <motion.aside
              id={drawerId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              className="fixed inset-y-0 right-0 z-[79] flex h-screen w-full max-w-sm flex-col border-l border-slate-200 bg-white opacity-100 shadow-2xl shadow-slate-200/50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="border-b border-slate-200 bg-white px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">
                      Menu
                    </p>
                    <h2 className="mt-2 text-xl font-black text-slate-950">
                      {PAGE_CONFIG.companyName}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Navegação otimizada para mobile e tablet com foco nas seções da página.
                    </p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Fechar drawer de navegação"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition-all duration-300 hover:bg-slate-100"
                    onClick={closeDrawer}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col bg-white px-6 pb-6 pt-5">
                <nav className="flex flex-col gap-2" aria-label="Links do menu">
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={activeHref === item.href ? 'location' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-2xl border px-4 py-4 text-base font-semibold transition-all duration-300',
                        activeHref === item.href
                          ? 'border-primary-500/20 bg-primary-50 text-slate-950'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                      )}
                      onClick={() => handleNavigationItemClick(item.href)}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-primary-300" />
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
