import type { Service } from '@/lib/types';
import { ServiceIcon } from '@/lib/types';

export const servicesData: Service[] = [
  {
    id: 'construcao-civil',
    title: 'Construção Civil',
    description:
      'Execução completa de obras residenciais e comerciais. Do projeto ao acabamento, garantimos qualidade e prazo em cada etapa da construção.',
    icon: ServiceIcon.BUILDING,
    features: [
      'Construção de casas e apartamentos',
      'Edificações comerciais e industriais',
      'Estruturas de concreto armado',
      'Fundações e alvenaria',
    ],
    highlighted: true,
  },
  {
    id: 'reformas',
    title: 'Reformas e Ampliações',
    description:
      'Transformamos sua residência ou estabelecimento comercial com reformas completas. Modernizamos espaços mantendo a estrutura e aumentando o valor do imóvel.',
    icon: ServiceIcon.HAMMER,
    features: [
      'Reforma de banheiros e cozinhas',
      'Ampliação de áreas construídas',
      'Revestimentos e acabamentos',
      'Modernização de fachadas',
    ],
    highlighted: false,
  },
  {
    id: 'manutencao-predial',
    title: 'Manutenção Predial',
    description:
      'Serviços de manutenção preventiva e corretiva para condomínios, edifícios e imóveis comerciais. Garantimos a conservação e valorização do seu patrimônio.',
    icon: ServiceIcon.WRENCH,
    features: [
      'Manutenção preventiva de fachadas',
      'Impermeabilização e infiltrações',
      'Pintura e revestimentos externos',
      'Laudos e relatórios técnicos',
    ],
    highlighted: false,
  },
  {
    id: 'obras-especiais',
    title: 'Obras Especiais',
    description:
      'Projetos diferenciados que exigem expertise técnica. Piscinas, coberturas metálicas, áreas de lazer e estruturas especiais com alto padrão de acabamento.',
    icon: ServiceIcon.SHIELD,
    features: [
      'Construção de piscinas e SPAs',
      'Coberturas e estruturas metálicas',
      'Áreas de lazer e churrasqueiras',
      'Garagens e estacionamentos',
    ],
    highlighted: false,
  },
];
