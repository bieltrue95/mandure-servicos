import type { Project } from '@/lib/types';
import { ProjectCategory } from '@/lib/types';

export interface PortfolioProps {
  projects: Project[];
}

export interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export interface ProjectGalleryModalProps {
  project: Project;
  activeImageSrc?: string;
  onImageChange: (imageSrc: string) => void;
  onClose: () => void;
}

export interface CategoryFilterProps {
  activeCategory: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
}

export { ProjectCategory };
