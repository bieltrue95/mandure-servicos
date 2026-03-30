'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STAGGER_CONTAINER, STAGGER_ITEM } from '@/lib/constants/animations';
import { PAGE_CONFIG } from '@/lib/constants/config';
import type { CTAFinalProps } from './CTAFinal.types';

export function CTAFinal({ whatsappUrl }: CTAFinalProps) {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-primary-600 pt-1 pb-12 scroll-mt-0 lg:pt-2 lg:pb-20 lg:scroll-mt-0"
      aria-label="CTA Final - Mandure Serviços"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-white" />
      </div>

      <div className="container-max section-padding relative z-10">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div variants={STAGGER_ITEM} className="mb-6 flex justify-center">
            <span className="section-eyebrow inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white backdrop-blur-sm">
              ✓ Orçamento 100% Gratuito e Sem Compromisso
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={STAGGER_ITEM}
            className="section-title mx-auto mb-6 max-w-4xl text-balance text-white"
          >
            Pronto para Transformar seu Projeto em Realidade?
          </motion.h2>

          <motion.p
            variants={STAGGER_ITEM}
            className="section-subtitle mb-10 text-balance text-primary-100"
          >
            Entre em contato agora e receba um orçamento detalhado e transparente. Nossa equipe
            responde em até 24 horas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={STAGGER_ITEM}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="xl"
                className="w-full min-w-[260px] gap-3 bg-white text-primary-700 shadow-xl hover:bg-primary-50 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Falar pelo WhatsApp
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.a>

            <a href={`tel:${PAGE_CONFIG.phone}`}>
              <Button
                size="xl"
                variant="outline"
                className="w-full min-w-[240px] gap-3 border-white/40 text-white backdrop-blur-sm hover:border-white hover:bg-white/10 sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                {PAGE_CONFIG.phone}
              </Button>
            </a>
          </motion.div>

          {/* Guarantees */}
          <motion.div
            variants={STAGGER_ITEM}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-primary-100"
          >
            <span>✓ Visita técnica gratuita</span>
            <span>✓ Sem taxas ocultas</span>
            <span>✓ Garantia de 5 anos na estrutura</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
