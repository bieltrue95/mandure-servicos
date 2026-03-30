'use client';

import { SCROLL_REVEAL_CONFIG, STAGGER_CONTAINER, STAGGER_ITEM } from '@/lib/constants/animations';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import type { StatsProps } from './Stats.types';

export function Stats({ stats }: StatsProps) {
  return (
    <section
      id="stats"
      className="bg-slate-100 py-16 scroll-mt-6 lg:py-20 lg:scroll-mt-8"
      aria-label="Estatísticas - Mandure Serviços"
    >
      <div className="container-max section-padding">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={SCROLL_REVEAL_CONFIG.initial}
          whileInView={SCROLL_REVEAL_CONFIG.whileInView}
          viewport={SCROLL_REVEAL_CONFIG.viewport}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={STAGGER_ITEM}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-2 text-4xl font-black text-primary-400 sm:text-5xl lg:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base font-semibold text-slate-900 sm:text-lg">{stat.label}</div>
              {stat.description && (
                <div className="mt-1 text-sm text-slate-500">{stat.description}</div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
