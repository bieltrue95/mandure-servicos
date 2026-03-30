'use client';

import { FADE_IN_UP, SCROLL_REVEAL_CONFIG, STAGGER_CONTAINER } from '@/lib/constants/animations';
import { motion } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';
import type { TestimonialsProps } from './Testimonials.types';

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section
      id="depoimentos"
      className="bg-slate-50 scroll-mt-0 -mt-6 pt-0 pb-12 lg:scroll-mt-0 lg:-mt-8 lg:pt-0 lg:pb-20"
      aria-label="Depoimentos - Mandure Serviços"
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
          <span className="section-eyebrow bg-primary-100 text-primary-700">Depoimentos</span>
          <h2 className="section-title mb-4 text-balance text-slate-900">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="section-subtitle text-balance text-slate-500">
            A satisfação dos nossos clientes é a nossa maior conquista.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={SCROLL_REVEAL_CONFIG.initial}
          whileInView={SCROLL_REVEAL_CONFIG.whileInView}
          viewport={SCROLL_REVEAL_CONFIG.viewport}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
