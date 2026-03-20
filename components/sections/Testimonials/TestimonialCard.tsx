'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { STAGGER_ITEM } from '@/lib/constants/animations';
import type { TestimonialCardProps } from './Testimonials.types';

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div variants={STAGGER_ITEM} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Card className="h-full border-neutral-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="p-8">
          {/* Quote icon */}
          <Quote className="mb-4 h-8 w-8 text-primary-300" />

          {/* Stars */}
          <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} estrelas`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating ? 'fill-primary-500 text-primary-500' : 'text-neutral-300'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <p className="mb-6 italic leading-relaxed text-slate-600 dark:text-slate-300">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          {/* Author */}
          <div className="border-t border-neutral-100 pt-4 dark:border-slate-800">
            <div className="font-bold text-slate-900 dark:text-white">{testimonial.authorName}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {testimonial.authorTitle}
            </div>
            {testimonial.company && (
              <div className="mt-0.5 text-xs font-medium text-primary-600">
                {testimonial.company}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
