'use client';

import { FADE_IN_UP, GALLERY_STAGGER_CONTAINER } from '@/lib/constants/animations';
import { Project, ProjectCategory } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CategoryFilter } from './CategoryFilter';
import type { PortfolioProps } from './Portfolio.types';
import {
  PORTFOLIO_IMAGE_QUERY_PARAM,
  PORTFOLIO_PROJECT_QUERY_PARAM,
  getProjectGalleryImages,
  getProjectShareSlug,
  resolveProjectByShareSlug,
  resolveProjectGalleryImageSrc,
} from './Portfolio.utils';
import { ProjectCard } from './ProjectCard';
import { ProjectGalleryModal } from './ProjectGalleryModal';

export function Portfolio({ projects }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.TODOS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [isUrlHydrated, setIsUrlHydrated] = useState(false);

  const filtered =
    activeCategory === ProjectCategory.TODOS
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category: ProjectCategory) => {
    // Fecha o modal ao trocar a categoria para evitar estado preso em item oculto pelo filtro.
    setSelectedProject(null);
    setSelectedImageSrc(null);
    setActiveCategory(category);
  };

  const handleProjectSelect = (project: Project) => {
    const firstGalleryImage = getProjectGalleryImages(project)[0];

    setSelectedProject(project);
    setSelectedImageSrc(firstGalleryImage?.src ?? project.coverImage.src);
  };

  useEffect(() => {
    // Reabre o modal a partir da URL compartilhada para suportar acesso direto e navegação do histórico.
    const syncGalleryStateWithUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const projectSlug = searchParams.get(PORTFOLIO_PROJECT_QUERY_PARAM);

      if (!projectSlug) {
        setSelectedProject(null);
        setSelectedImageSrc(null);
        setIsUrlHydrated(true);
        return;
      }

      const matchingProject = resolveProjectByShareSlug(projects, projectSlug);

      if (!matchingProject) {
        setSelectedProject(null);
        setSelectedImageSrc(null);
        setIsUrlHydrated(true);
        return;
      }

      setSelectedProject(matchingProject);
      setSelectedImageSrc(
        resolveProjectGalleryImageSrc(
          matchingProject,
          searchParams.get(PORTFOLIO_IMAGE_QUERY_PARAM)
        )
      );
      setIsUrlHydrated(true);
    };

    syncGalleryStateWithUrl();
    window.addEventListener('popstate', syncGalleryStateWithUrl);

    return () => {
      window.removeEventListener('popstate', syncGalleryStateWithUrl);
    };
  }, [projects]);

  useEffect(() => {
    if (!isUrlHydrated) {
      return;
    }

    // Mantém a URL sincronizada com o projeto e a imagem ativos sem empilhar entradas no histórico.
    const url = new URL(window.location.href);

    if (selectedProject && selectedImageSrc) {
      url.searchParams.set(PORTFOLIO_PROJECT_QUERY_PARAM, getProjectShareSlug(selectedProject));
      url.searchParams.set(PORTFOLIO_IMAGE_QUERY_PARAM, selectedImageSrc);
    } else {
      url.searchParams.delete(PORTFOLIO_PROJECT_QUERY_PARAM);
      url.searchParams.delete(PORTFOLIO_IMAGE_QUERY_PARAM);
    }

    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, [isUrlHydrated, selectedImageSrc, selectedProject]);

  return (
    <section
      id="projetos"
      className="bg-slate-100 py-20 lg:py-28"
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
          <span className="section-eyebrow bg-primary-100 text-primary-700">Portfólio</span>
          <h2 className="section-title mb-4 text-balance text-slate-900">Projetos Realizados</h2>
          <p className="section-subtitle text-balance text-slate-600">
            Conheça alguns dos projetos que transformamos em realidade com excelência técnica e
            atenção aos detalhes.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="mb-10">
          <CategoryFilter activeCategory={activeCategory} onChange={handleCategoryChange} />
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
              <ProjectCard key={project.id} project={project} onSelect={handleProjectSelect} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-500">
            Nenhum projeto encontrado nesta categoria.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectGalleryModal
            key={selectedProject.id}
            project={selectedProject}
            activeImageSrc={selectedImageSrc ?? undefined}
            onImageChange={setSelectedImageSrc}
            onClose={() => {
              setSelectedProject(null);
              setSelectedImageSrc(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
