# Navigation Drawer

## Objetivo

O componente `SiteHeader` implementa a navegação principal da landing page com
comportamento responsivo:

- Desktop (`lg` ou maior): links inline centralizados
- Mobile e tablet (`< lg`): drawer lateral com overlay e links de navegacao

## Arquivos

- `components/sections/SiteHeader/SiteHeader.tsx`
- `components/sections/SiteHeader/SiteHeader.types.ts`
- `components/sections/SiteHeader/index.ts`

## Comportamento

- Usa `NAV_ITEMS` de `lib/constants/routes.ts` para manter as âncoras
  centralizadas
- Destaca o link ativo com scroll spy baseado em `scroll` + `requestAnimationFrame`
- Fecha o drawer ao clicar em um link, ao pressionar `Esc`, ao clicar no overlay
  e ao voltar para viewport desktop
- Bloqueia o scroll do `body` enquanto o drawer está aberto
- Header fixo em tema claro (`bg-white/95`) com `backdrop-blur`
- Mantem sincronizacao com `window.location.hash` e com a posicao atual da pagina

## Acessibilidade

- `header` com `role="banner"`
- Botão do menu com `aria-expanded` e `aria-controls`
- Drawer com `role="dialog"` e `aria-modal="true"`
- Foco inicial enviado para o botão de fechar quando o drawer abre

## Observações de manutenção

- Se uma nova seção for adicionada à home, basta incluir a âncora em `NAV_ITEMS`
- O offset das âncoras é controlado por `scroll-padding-top` em
  `app/globals.css`
- O componente é client-side porque depende de estado, eventos de viewport e
  APIs do navegador
