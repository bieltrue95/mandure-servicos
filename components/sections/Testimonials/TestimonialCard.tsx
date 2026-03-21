'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import type { TestimonialCardProps } from './Testimonials.types';

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="transition-transform duration-300 hover:-translate-y-1">
      <Card className="h-full border-neutral-200 bg-white">
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
          <p className="mb-6 italic leading-relaxed text-slate-600">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          {/* Author */}
          <div className="border-t border-neutral-100 pt-4">
            <div className="font-bold text-slate-900">{testimonial.authorName}</div>
            <div className="text-sm text-slate-500">{testimonial.authorTitle}</div>
            {testimonial.company && (
              <div className="mt-0.5 text-xs font-medium text-primary-600">
                {testimonial.company}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
