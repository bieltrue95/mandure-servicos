import { ImageData } from './common.types';

export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle: string;
  company?: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: ImageData;
  projectCategory?: string;
  featured: boolean;
}

export interface TestimonialFilter {
  rating?: number;
  featured?: boolean;
}
