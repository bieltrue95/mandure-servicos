import type { Project } from '@/lib/types';
import { ProjectCategory } from '@/lib/types';

const projectImageSources = {
  residence:
    'https://images.unsplash.com/photo-1750114784669-9f1c70d90e0f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  office:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NjYyNDF8MHwxfHBob3RvfHx8fHx8Mnx8MTc1OTY5NDYxN3w&ixlib=rb-4.1.0&q=85',
  renovation:
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NjYyNDF8MHwxfHBob3RvfHx8fHx8Mnx8MTc1NzcwMDE4N3w&ixlib=rb-4.1.0&q=85',
  condominium:
    'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NjYyNDF8MHwxfHBob3RvfHx8fHx8Mnx8MTc1NzcwMDE4N3w&ixlib=rb-4.1.0&q=85',
  clinic:
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NjYyNDF8MHwxfHBob3RvfHx8fHx8Mnx8MTc1NzcwMDE4N3w&ixlib=rb-4.1.0&q=85',
  maintenance:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NjYyNDF8MHwxfHBob3RvfHx8fHx8Mnx8MTc3NDE5NTQzMnw&ixlib=rb-4.1.0&q=85',
} as const;

export const projectsData: Project[] = [
  {
    id: 'residencia-alto-da-lapa',
    title: 'Residência Alto da Lapa',
    description:
      'Casa de alto padrão com 400m² de área construída. Projeto moderno com fachada em concreto aparente, piscina aquecida e área gourmet integrada.',
    category: ProjectCategory.RESIDENCIAL,
    coverImage: {
      src: projectImageSources.residence,
      alt: 'Residência moderna Alto da Lapa - Vista frontal',
      width: 800,
      height: 600,
    },
    location: 'Alto da Lapa, São Paulo - SP',
    area: '400m²',
    year: 2026,
    featured: true,
    tags: ['alto padrão', 'concreto aparente', 'piscina'],
  },
  {
    id: 'edificio-comercial-tatuape',
    title: 'Edifício Comercial Tatuapé',
    description:
      'Edifício comercial de 8 andares com 3.200m² de área total. Lajes nervuradas, fachada em vidro temperado e sistema de automação predial completo.',
    category: ProjectCategory.COMERCIAL,
    coverImage: {
      src: projectImageSources.office,
      alt: 'Edifício comercial moderno no Tatuapé',
      width: 800,
      height: 600,
    },
    location: 'Tatuapé, São Paulo - SP',
    area: '3.200m²',
    year: 2026,
    featured: true,
    tags: ['comercial', 'vidro temperado', 'automação'],
  },
  {
    id: 'reforma-apartamento-moema',
    title: 'Reforma Completa Moema',
    description:
      'Reforma total de apartamento de 180m². Integração de ambientes, novo layout de banheiros e cozinha gourmet com mármore carrara e móveis planejados.',
    category: ProjectCategory.REFORMA,
    coverImage: {
      src: projectImageSources.renovation,
      alt: 'Reforma de apartamento de luxo em Moema',
      width: 800,
      height: 600,
    },
    location: 'Moema, São Paulo - SP',
    area: '180m²',
    year: 2023,
    featured: true,
    tags: ['reforma', 'mármore', 'cozinha gourmet'],
  },
  {
    id: 'condominio-alphaville',
    title: 'Condomínio Alphaville Green',
    description:
      'Construção de 12 casas em condomínio fechado. Projeto sustentável com aproveitamento de água pluvial, painéis solares e área verde preservada.',
    category: ProjectCategory.RESIDENCIAL,
    coverImage: {
      src: projectImageSources.condominium,
      alt: 'Condomínio fechado Alphaville com casas modernas',
      width: 800,
      height: 600,
    },
    location: 'Alphaville, Barueri - SP',
    area: '6.800m²',
    year: 2023,
    featured: false,
    tags: ['condomínio', 'sustentável', 'solar'],
  },
  {
    id: 'clinica-medica-pinheiros',
    title: 'Clínica Médica Pinheiros',
    description:
      'Construção de clínica médica especializada com 5 consultórios, sala de procedimentos, recepção ampla e acessibilidade total para cadeirantes.',
    category: ProjectCategory.COMERCIAL,
    coverImage: {
      src: projectImageSources.clinic,
      alt: 'Clínica médica moderna em Pinheiros',
      width: 800,
      height: 600,
    },
    location: 'Pinheiros, São Paulo - SP',
    area: '320m²',
    year: 2022,
    featured: false,
    tags: ['saúde', 'acessibilidade', 'comercial'],
  },
  {
    id: 'manutencao-condominio-vila-mariana',
    title: 'Manutenção Predial Vila Mariana',
    description:
      'Programa completo de manutenção predial para condomínio com 120 unidades. Impermeabilização de telhados, pintura de fachada e modernização de áreas comuns.',
    category: ProjectCategory.MANUTENCAO,
    coverImage: {
      src: projectImageSources.maintenance,
      alt: 'Manutenção predial - Condomínio Vila Mariana',
      width: 800,
      height: 600,
    },
    location: 'Vila Mariana, São Paulo - SP',
    area: '8.500m²',
    year: 2022,
    featured: false,
    tags: ['manutenção', 'condomínio', 'impermeabilização'],
  },
];
