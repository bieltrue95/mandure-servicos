'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, Maximize2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GALLERY_STAGGER_ITEM } from '@/lib/constants/animations';
import type { ProjectCardProps } from './Portfolio.types';

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      layout
      variants={GALLERY_STAGGER_ITEM}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800"
      data-testid="project-card"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full">
            <Badge variant="default" className="mb-2 text-xs">
              {project.category}
            </Badge>
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-slate-300">{project.description}</p>
          </div>
        </motion.div>

        {/* Always visible badge */}
        <div className="absolute left-4 top-4">
          <Badge variant="slate" className="text-xs shadow-md">
            {project.category}
          </Badge>
        </div>

        {/* Zoom icon */}
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/10">
          <Maximize2 className="h-4 w-4 text-slate-950 dark:text-white" />
        </div>
      </div>

      {/* Card info */}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary-400" />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-primary-400" />
            {project.year}
          </span>
          {project.area && (
            <span className="flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-primary-400" />
              {project.area}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
