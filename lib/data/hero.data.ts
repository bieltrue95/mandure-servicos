// O hero usa um asset local dedicado para evitar fotos externas incoerentes
// com o contexto de obra e manter a dobra principal estavel.
const heroBackgroundImage = '/images/hero/mandure-obra-principal.svg';

export const heroData = {
  headline: 'Construímos o Futuro com\nSolidez e Precisão',
  subheadline:
    'Empreiteira especializada em construção civil, reformas e manutenção predial. Mais de 15 anos entregando excelência em São Paulo e Grande SP.',
  ctaText: 'Solicitar Orçamento Grátis',
  ctaSubtext: 'Resposta em até 24 horas',
  backgroundImage: {
    src: heroBackgroundImage,
    alt: 'Obra de construcao civil com gruas, estrutura e predio em execucao - Mandure Servicos',
  },
  badge: '⭐ +500 Projetos Entregues',
} as const;
