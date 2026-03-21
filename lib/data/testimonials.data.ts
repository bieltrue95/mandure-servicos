import type { Testimonial } from '@/lib/types';

export const testimonialsData: Testimonial[] = [
  {
    id: 'testimonial-1',
    authorName: 'Carlos Eduardo Mendes',
    authorTitle: 'Proprietário',
    company: 'Residência Alto da Lapa',
    content:
      'A Mandure Serviços superou todas as expectativas. A obra foi entregue no prazo, com acabamento impecável e atenção aos mínimos detalhes. A equipe é extremamente profissional e comunicativa durante todo o processo.',
    rating: 5,
    projectCategory: 'Residencial',
    featured: true,
  },
  {
    id: 'testimonial-2',
    authorName: 'Dra. Patrícia Rodrigues',
    authorTitle: 'Diretora Médica',
    company: 'Clínica Saúde Plena',
    content:
      'Construíram nossa clínica com total respeito às normas de vigilância sanitária e acessibilidade. O gerenciamento da obra foi exemplar, com relatórios semanais e transparência total nos gastos. Recomendo sem hesitar.',
    rating: 5,
    projectCategory: 'Comercial',
    featured: true,
  },
  {
    id: 'testimonial-3',
    authorName: 'Roberto Almeida',
    authorTitle: 'Síndico',
    company: 'Condomínio Verde Vale',
    content:
      'Contratamos para reforma completa das áreas comuns e ficamos muito satisfeitos. Profissionais sérios, materiais de primeira qualidade e entrega dentro do prazo e orçamento acordado. O condomínio ficou completamente renovado.',
    rating: 5,
    projectCategory: 'Manutenção',
    featured: true,
  },
];
