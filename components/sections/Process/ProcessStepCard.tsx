'use client';

import { STAGGER_ITEM } from '@/lib/constants/animations';
import { motion } from 'framer-motion';
import type { ProcessStepCardProps } from './Process.types';

export function ProcessStepCard({ step, isLast }: ProcessStepCardProps) {
  return (
    <motion.div
      variants={STAGGER_ITEM}
      className="relative mx-auto flex w-full max-w-lg flex-col items-center text-center lg:max-w-none"
    >
      {/* A linha da timeline fica apenas no desktop para evitar ruído visual em telas menores. */}
      {!isLast && (
        <div className="absolute left-1/2 top-8 hidden h-0.5 w-[calc(100%+2.5rem)] bg-gradient-to-r from-primary-500 to-primary-300 lg:block" />
      )}

      {/* No mobile o número continua visível, mas sem a linha de fundo. */}
      <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-2xl font-black text-white shadow-primary ring-4 ring-primary-100">
        {step.step}
      </div>

      {/* Content */}
      <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 xl:text-[1.625rem]">
        {step.title}
      </h3>
      <p className="max-w-[19rem] text-base leading-8 text-slate-600 xl:text-lg">
        {step.description}
      </p>
    </motion.div>
  );
}
