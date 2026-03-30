'use client';

import {
  FADE_IN_UP,
  SCROLL_REVEAL_CONFIG,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
} from '@/lib/constants/animations';
import { motion } from 'framer-motion';
import type { CertificationsProps } from './Certifications.types';

export function Certifications({ certifications }: CertificationsProps) {
  return (
    <section
      id="certificacoes"
      className="bg-white py-16 scroll-mt-24 lg:py-20 lg:scroll-mt-32"
      aria-label="Certificações - Mandure Serviços"
    >
      <div className="container-max section-padding">
        {/* Header */}
        <motion.div
          variants={FADE_IN_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <span className="section-eyebrow bg-primary-100 text-primary-700">
            Qualidade Certificada
          </span>
          <h2 className="section-title mb-4 text-balance text-slate-900">
            Certificações e Associações
          </h2>
          <p className="section-subtitle text-balance text-slate-500">
            Trabalhamos com os mais altos padrões de qualidade, reconhecidos por órgãos nacionais e
            internacionais.
          </p>
        </motion.div>

        {/* Logos */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial={SCROLL_REVEAL_CONFIG.initial}
          whileInView={SCROLL_REVEAL_CONFIG.whileInView}
          viewport={SCROLL_REVEAL_CONFIG.viewport}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={STAGGER_ITEM}
              className="group mx-auto flex h-full w-full max-w-[18rem] flex-col items-center gap-4 text-center transition-transform duration-300 hover:scale-105"
            >
              {/* O selo recebe mais área e contraste para equilibrar com a descrição logo abaixo. */}
              <div className="relative flex h-20 w-full items-center justify-center rounded-2xl bg-slate-50 px-5 py-4 shadow-sm transition-all duration-300 group-hover:shadow-md">
                <div className="text-2xl font-black tracking-tight text-slate-500 transition-colors duration-300 group-hover:text-primary-600">
                  {cert.name}
                </div>
              </div>
              {cert.description && (
                <p className="max-w-[16rem] text-base leading-7 text-slate-600">
                  {cert.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
