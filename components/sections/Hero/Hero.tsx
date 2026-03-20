'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, MessageCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STAGGER_CONTAINER, STAGGER_ITEM } from '@/lib/constants/animations';
import { heroData } from '@/lib/data/hero.data';
import type { HeroProps } from './Hero.types';

export function Hero({ whatsappUrl }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero - Mandure Serviços"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroData.backgroundImage.src}
          alt={heroData.backgroundImage.alt}
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="100vw"
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-950/90" />
      </div>

      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(184, 135, 109, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(184, 135, 109, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="container-max section-padding relative z-10 text-center">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={STAGGER_ITEM} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300 backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              +500 Projetos Entregues com Excelência
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={STAGGER_ITEM} className="hero-title mb-6 text-balance text-white">
            Construímos o Futuro com{' '}
            <span className="bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
              Solidez e Precisão
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={STAGGER_ITEM}
            className="hero-subtitle mb-10 text-balance text-slate-300"
          >
            Empreiteira especializada em construção civil, reformas e manutenção predial. Mais de{' '}
            <strong className="font-semibold text-white">15 anos</strong> entregando excelência em
            São Paulo e Grande SP.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={STAGGER_ITEM}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="xl"
                variant="default"
                className="w-full min-w-[220px] bg-primary-500 text-white shadow-primary hover:bg-primary-600 hover:shadow-primary-hover sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar Orçamento Grátis
              </Button>
            </a>
            <a href="#projetos">
              <Button
                size="xl"
                variant="outline"
                className="w-full min-w-[220px] border-white/30 text-white backdrop-blur-sm hover:border-white hover:bg-white/10 sm:w-auto"
              >
                Ver Nossos Projetos
              </Button>
            </a>
          </motion.div>

          {/* Trust badge */}
          <motion.p variants={STAGGER_ITEM} className="mt-6 text-sm text-slate-400">
            ✓ Resposta em até 24 horas &nbsp;·&nbsp; ✓ Visita técnica gratuita &nbsp;·&nbsp; ✓
            Garantia de 5 anos
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <a href="#stats" aria-label="Rolar para baixo">
          <ArrowDown className="h-6 w-6 text-white/50" />
        </a>
      </motion.div>
    </section>
  );
}
