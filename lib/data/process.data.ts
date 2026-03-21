import type { ProcessStep } from '@/lib/types';

export const processStepsData: ProcessStep[] = [
  {
    id: 'step-1',
    step: 1,
    title: 'Visita Técnica e Diagnóstico',
    description:
      'Nossa equipe realiza uma visita técnica gratuita para entender suas necessidades, avaliar o terreno ou estrutura existente e levantar todas as informações necessárias para o projeto.',
    icon: 'ClipboardList',
  },
  {
    id: 'step-2',
    step: 2,
    title: 'Proposta e Orçamento',
    description:
      'Elaboramos um orçamento detalhado e transparente com todos os materiais, mão de obra e cronograma de execução. Sem surpresas ou custos ocultos.',
    icon: 'FileText',
  },
  {
    id: 'step-3',
    step: 3,
    title: 'Execução com Qualidade',
    description:
      'Iniciamos a obra com equipe especializada, materiais de primeira linha e rigoroso controle de qualidade em cada etapa. Reuniões de acompanhamento semanais com o cliente.',
    icon: 'HardHat',
  },
  {
    id: 'step-4',
    step: 4,
    title: 'Entrega e Garantia',
    description:
      'Entregamos a obra no prazo acordado com vistoria completa, manual do proprietário e garantia de 5 anos em estrutura e 1 ano em acabamentos.',
    icon: 'CheckCircle2',
  },
];
