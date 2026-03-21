import type { Certification } from '@/lib/types';

export const certificationsData: Certification[] = [
  {
    id: 'crea-sp',
    name: 'CREA-SP',
    logo: {
      src: '/images/certifications/crea-sp.svg',
      alt: 'Conselho Regional de Engenharia e Agronomia - CREA-SP',
      width: 160,
      height: 60,
    },
    description: 'Registro no Conselho Regional de Engenharia e Agronomia de São Paulo',
    year: 2009,
  },
  {
    id: 'iso-9001',
    name: 'ISO 9001',
    logo: {
      src: '/images/certifications/iso-9001.svg',
      alt: 'Certificação ISO 9001 - Sistema de Gestão da Qualidade',
      width: 160,
      height: 60,
    },
    description: 'Certificação de Sistema de Gestão da Qualidade',
    year: 2018,
  },
  {
    id: 'pbqp-h',
    name: 'PBQP-H',
    logo: {
      src: '/images/certifications/pbqp-h.svg',
      alt: 'Programa Brasileiro da Qualidade e Produtividade do Habitat',
      width: 160,
      height: 60,
    },
    description: 'Programa Brasileiro da Qualidade e Produtividade do Habitat - Nível A',
    year: 2020,
  },
  {
    id: 'cbicdados',
    name: 'CBIC',
    logo: {
      src: '/images/certifications/cbic.svg',
      alt: 'Câmara Brasileira da Indústria da Construção',
      width: 160,
      height: 60,
    },
    description: 'Membro ativo da Câmara Brasileira da Indústria da Construção',
    year: 2015,
  },
];
