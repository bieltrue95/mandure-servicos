import type { ImageData, Project } from '@/lib/types';
import { ProjectCategory } from '@/lib/types';

const PROJECT_IMAGE_DIMENSIONS = {
  width: 1600,
  height: 1200,
} as const;

function createLocalProjectImage(folderName: string, imageIndex: number, alt: string): ImageData {
  return {
    src: `/images/projects/${folderName}/${String(imageIndex).padStart(2, '0')}.svg`,
    alt,
    ...PROJECT_IMAGE_DIMENSIONS,
  };
}

function createProjectGallery(
  folderName: string,
  alts: string[]
): Pick<Project, 'coverImage' | 'images'> {
  // Cada projeto do portfolio precisa manter 10 imagens locais fixas:
  // 1 capa do card + 9 complementares para o modal compartilhavel.
  if (alts.length !== 10) {
    throw new Error(`A galeria do projeto "${folderName}" precisa ter exatamente 10 imagens.`);
  }

  const slides = alts.map((alt, index) => createLocalProjectImage(folderName, index + 1, alt));
  const [coverImage, ...images] = slides;

  return {
    coverImage,
    images,
  };
}

const residenceGallery = createProjectGallery('residencia-alto-lapa', [
  'Residência Alto da Lapa - Fachada principal',
  'Residência Alto da Lapa - Hall social',
  'Residência Alto da Lapa - Living integrado',
  'Residência Alto da Lapa - Cozinha gourmet',
  'Residência Alto da Lapa - Suíte master',
  'Residência Alto da Lapa - Área gourmet',
  'Residência Alto da Lapa - Piscina aquecida',
  'Residência Alto da Lapa - Jardim lateral',
  'Residência Alto da Lapa - Escada escultórica',
  'Residência Alto da Lapa - Vista noturna',
]);

const officeGallery = createProjectGallery('edificio-tatuape', [
  'Edifício Comercial Tatuapé - Fachada corporativa',
  'Edifício Comercial Tatuapé - Lobby de entrada',
  'Edifício Comercial Tatuapé - Recepção executiva',
  'Edifício Comercial Tatuapé - Pavimento tipo',
  'Edifício Comercial Tatuapé - Sala de reuniões',
  'Edifício Comercial Tatuapé - Open office',
  'Edifício Comercial Tatuapé - Fachada em vidro',
  'Edifício Comercial Tatuapé - Cobertura técnica',
  'Edifício Comercial Tatuapé - Área de convivência',
  'Edifício Comercial Tatuapé - Vista noturna',
]);

const renovationGallery = createProjectGallery('reforma-moema', [
  'Reforma Completa Moema - Antes e depois',
  'Reforma Completa Moema - Living renovado',
  'Reforma Completa Moema - Cozinha integrada',
  'Reforma Completa Moema - Marcenaria planejada',
  'Reforma Completa Moema - Banho master',
  'Reforma Completa Moema - Dormitório do casal',
  'Reforma Completa Moema - Iluminação de cenário',
  'Reforma Completa Moema - Varanda gourmet',
  'Reforma Completa Moema - Detalhes em mármore',
  'Reforma Completa Moema - Ambiente finalizado',
]);

const condominiumGallery = createProjectGallery('condominio-alphaville', [
  'Condomínio Alphaville Green - Portaria principal',
  'Condomínio Alphaville Green - Rua interna',
  'Condomínio Alphaville Green - Casas geminadas',
  'Condomínio Alphaville Green - Área verde',
  'Condomínio Alphaville Green - Clube de lazer',
  'Condomínio Alphaville Green - Playground',
  'Condomínio Alphaville Green - Piscina comum',
  'Condomínio Alphaville Green - Painel solar',
  'Condomínio Alphaville Green - Drenagem verde',
  'Condomínio Alphaville Green - Vista aérea',
]);

const clinicGallery = createProjectGallery('clinica-pinheiros', [
  'Clínica Médica Pinheiros - Fachada da clínica',
  'Clínica Médica Pinheiros - Recepção humanizada',
  'Clínica Médica Pinheiros - Consultório 01',
  'Clínica Médica Pinheiros - Consultório 02',
  'Clínica Médica Pinheiros - Sala de procedimentos',
  'Clínica Médica Pinheiros - Circulação limpa',
  'Clínica Médica Pinheiros - Área de espera',
  'Clínica Médica Pinheiros - Posto de enfermagem',
  'Clínica Médica Pinheiros - Sinalização interna',
  'Clínica Médica Pinheiros - Vista final',
]);

const maintenanceGallery = createProjectGallery('manutencao-vila-mariana', [
  'Manutenção Predial Vila Mariana - Fachada revitalizada',
  'Manutenção Predial Vila Mariana - Impermeabilização',
  'Manutenção Predial Vila Mariana - Pintura externa',
  'Manutenção Predial Vila Mariana - Cobertura técnica',
  'Manutenção Predial Vila Mariana - Área comum',
  'Manutenção Predial Vila Mariana - Acesso de serviço',
  'Manutenção Predial Vila Mariana - Prumadas revisadas',
  'Manutenção Predial Vila Mariana - Reparo estrutural',
  'Manutenção Predial Vila Mariana - Acabamentos finais',
  'Manutenção Predial Vila Mariana - Entrega da manutenção',
]);

export const projectsData: Project[] = [
  {
    id: 'residencia-alto-da-lapa',
    title: 'Residência Alto da Lapa',
    description:
      'Casa de alto padrão com 400m² de área construída. Projeto moderno com fachada em concreto aparente, piscina aquecida e área gourmet integrada.',
    category: ProjectCategory.RESIDENCIAL,
    location: 'Alto da Lapa, São Paulo - SP',
    area: '400m²',
    year: 2026,
    featured: true,
    tags: ['alto padrão', 'concreto aparente', 'piscina'],
    ...residenceGallery,
  },
  {
    id: 'edificio-comercial-tatuape',
    title: 'Edifício Comercial Tatuapé',
    description:
      'Edifício comercial de 8 andares com 3.200m² de área total. Lajes nervuradas, fachada em vidro temperado e sistema de automação predial completo.',
    category: ProjectCategory.COMERCIAL,
    location: 'Tatuapé, São Paulo - SP',
    area: '3.200m²',
    year: 2026,
    featured: true,
    tags: ['comercial', 'vidro temperado', 'automação'],
    ...officeGallery,
  },
  {
    id: 'reforma-apartamento-moema',
    title: 'Reforma Completa Moema',
    description:
      'Reforma total de apartamento de 180m². Integração de ambientes, novo layout de banheiros e cozinha gourmet com mármore carrara e móveis planejados.',
    category: ProjectCategory.REFORMA,
    location: 'Moema, São Paulo - SP',
    area: '180m²',
    year: 2023,
    featured: true,
    tags: ['reforma', 'mármore', 'cozinha gourmet'],
    ...renovationGallery,
  },
  {
    id: 'condominio-alphaville',
    title: 'Condomínio Alphaville Green',
    description:
      'Construção de 12 casas em condomínio fechado. Projeto sustentável com aproveitamento de água pluvial, painéis solares e área verde preservada.',
    category: ProjectCategory.RESIDENCIAL,
    location: 'Alphaville, Barueri - SP',
    area: '6.800m²',
    year: 2023,
    featured: false,
    tags: ['condomínio', 'sustentável', 'solar'],
    ...condominiumGallery,
  },
  {
    id: 'clinica-medica-pinheiros',
    title: 'Clínica Médica Pinheiros',
    description:
      'Construção de clínica médica especializada com 5 consultórios, sala de procedimentos, recepção ampla e acessibilidade total para cadeirantes.',
    category: ProjectCategory.COMERCIAL,
    location: 'Pinheiros, São Paulo - SP',
    area: '320m²',
    year: 2022,
    featured: false,
    tags: ['saúde', 'acessibilidade', 'comercial'],
    ...clinicGallery,
  },
  {
    id: 'manutencao-condominio-vila-mariana',
    title: 'Manutenção Predial Vila Mariana',
    description:
      'Programa completo de manutenção predial para condomínio com 120 unidades. Impermeabilização de telhados, pintura de fachada e modernização de áreas comuns.',
    category: ProjectCategory.MANUTENCAO,
    location: 'Vila Mariana, São Paulo - SP',
    area: '8.500m²',
    year: 2022,
    featured: false,
    tags: ['manutenção', 'condomínio', 'impermeabilização'],
    ...maintenanceGallery,
  },
];
