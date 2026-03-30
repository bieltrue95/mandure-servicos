'use client';

import { FADE_IN_UP, SCROLL_REVEAL_CONFIG, STAGGER_CONTAINER } from '@/lib/constants/animations';
import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import type { ServicesProps } from './Services.types';

export function Services({ services, whatsappUrl }: ServicesProps) {
  return (
    <section
      id="servicos"
      className="scroll-mt-6 bg-slate-50 py-20 lg:scroll-mt-8 lg:py-28"
      aria-label="Serviços - Mandure Serviços"
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
          <span className="section-eyebrow bg-primary-100 text-primary-700">O Que Fazemos</span>
          <h2 className="section-title mb-4 text-balance text-slate-900">Nossos Serviços</h2>
          <p className="section-subtitle text-balance text-slate-500">
            Soluções completas em construção civil para projetos residenciais e comerciais, com
            qualidade e pontualidade garantidas.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={SCROLL_REVEAL_CONFIG.initial}
          whileInView={SCROLL_REVEAL_CONFIG.whileInView}
          viewport={SCROLL_REVEAL_CONFIG.viewport}
          className="mx-auto grid max-w-[1500px] gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-4"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} whatsappUrl={whatsappUrl} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
