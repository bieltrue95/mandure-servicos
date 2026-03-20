import type { Project } from '@/lib/types';
import { ProjectCategory } from '@/lib/types';

export interface PortfolioProps {
  projects: Project[];
}

export interface ProjectCardProps {
  project: Project;
}

export interface CategoryFilterProps {
  activeCategory: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
}

export { ProjectCategory };
