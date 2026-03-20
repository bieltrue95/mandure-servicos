import { ImageData, ProjectCategory } from './common.types';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  coverImage: ImageData;
  images?: ImageData[];
  location: string;
  area?: string;
  year: number;
  featured: boolean;
  tags?: string[];
}

export interface ProjectFilter {
  category: ProjectCategory;
}

export interface PortfolioState {
  projects: Project[];
  activeFilter: ProjectCategory;
  filteredProjects: Project[];
}
