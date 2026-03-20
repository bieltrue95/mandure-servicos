'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform, animate, motion, useInView } from 'framer-motion';
import type { AnimatedCounterProps } from './Stats.types';

export function AnimatedCounter({ value, suffix }: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
