'use client';

import { FADE_IN_UP, SCROLL_REVEAL_CONFIG, STAGGER_CONTAINER } from '@/lib/constants/animations';
import { motion } from 'framer-motion';
import type { ProcessProps } from './Process.types';
import { ProcessStepCard } from './ProcessStepCard';

export function Process({ steps }: ProcessProps) {
  return (
    <section
      id="processo"
      className="bg-white py-20 scroll-mt-16 lg:py-28 lg:scroll-mt-20"
      aria-label="Processo - Mandure Serviços"
    >
      <div className="container-max section-padding">
        {/* Header */}
        <motion.div
          variants={FADE_IN_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <span className="section-eyebrow bg-primary-100 text-primary-700">Como Trabalhamos</span>
          <h2 className="section-title mb-4 text-balance text-slate-900">Nosso Processo</h2>
          <p className="section-subtitle text-balance text-slate-500">
            Da visita técnica à entrega final, cada etapa é executada com rigor e transparência.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={SCROLL_REVEAL_CONFIG.initial}
          whileInView={SCROLL_REVEAL_CONFIG.whileInView}
          viewport={SCROLL_REVEAL_CONFIG.viewport}
          className="grid gap-10 lg:grid-cols-4"
        >
          {steps.map((step, idx) => (
            <ProcessStepCard key={step.id} step={step} isLast={idx === steps.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
