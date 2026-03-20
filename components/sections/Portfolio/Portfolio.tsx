'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FADE_IN_UP, GALLERY_STAGGER_CONTAINER } from '@/lib/constants/animations';
import { ProjectCategory } from '@/lib/types';
import { CategoryFilter } from './CategoryFilter';
import { ProjectCard } from './ProjectCard';
import type { PortfolioProps } from './Portfolio.types';

export function Portfolio({ projects }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.TODOS);

  const filtered =
    activeCategory === ProjectCategory.TODOS
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projetos"
      className="bg-slate-100 py-20 transition-colors duration-300 dark:bg-slate-950 lg:py-28"
      aria-label="Portfolio - Mandure Serviços"
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
          <span className="section-eyebrow bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400">
            Portfólio
          </span>
          <h2 className="section-title mb-4 text-balance text-slate-900 dark:text-white">
            Projetos Realizados
          </h2>
          <p className="section-subtitle text-balance text-slate-600 dark:text-slate-400">
            Conheça alguns dos projetos que transformamos em realidade com excelência técnica e
            atenção aos detalhes.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="mb-10">
          <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            variants={GALLERY_STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">
            Nenhum projeto encontrado nesta categoria.
          </div>
        )}
      </div>
    </section>
  );
}
