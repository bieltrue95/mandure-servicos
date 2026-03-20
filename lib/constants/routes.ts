export const ROUTES = {
  HOME: '/',
  PROJETOS: '#projetos',
  SERVICOS: '#servicos',
  SOBRE: '#sobre',
  CONTATO: '#contato',
  PROCESSO: '#processo',
  DEPOIMENTOS: '#depoimentos',
} as const;

export const EXTERNAL_ROUTES = {
  WHATSAPP: (phone: string, message: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
  INSTAGRAM: 'https://instagram.com/mandureservicos',
  FACEBOOK: 'https://facebook.com/mandureservicos',
} as const;

export const NAV_ITEMS = [
  { label: 'Serviços', href: ROUTES.SERVICOS },
  { label: 'Projetos', href: ROUTES.PROJETOS },
  { label: 'Processo', href: ROUTES.PROCESSO },
  { label: 'Depoimentos', href: ROUTES.DEPOIMENTOS },
  { label: 'Contato', href: ROUTES.CONTATO },
] as const;
