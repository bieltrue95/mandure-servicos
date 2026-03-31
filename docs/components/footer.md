# Footer

## Objetivo

O componente `Footer` fecha a landing page com um bloco institucional responsivo
em tema claro com destaque para CTAs e contatos.

- Reforça marca e posicionamento
- Reaproveita as âncoras principais da home
- Centraliza contatos e redes sociais em um único ponto
- Mantém um CTA final de conversão para WhatsApp

## Arquivos

- `components/sections/Footer/Footer.tsx`
- `components/sections/Footer/Footer.types.ts`
- `components/sections/Footer/index.ts`

## Comportamento

- Usa `NAV_ITEMS` para montar os links internos do rodapé
- Usa `PAGE_CONFIG` e `SITE_CONFIG` para telefone, e-mail, endereço, redes e URL
  institucional
- Gera o ano atual automaticamente para a faixa inferior
- Mantem visual claro com cards, bordas suaves e acentos em bronze

## Acessibilidade

- Usa `<footer>` com `role="contentinfo"`
- Links de contato são clicáveis conforme o canal (`tel:`, `mailto:` e mapa
  externo)
- Navegação do rodapé possui `aria-label` específico

## Observações de manutenção

- Mudanças de telefone, endereço ou redes devem ser feitas em
  `lib/constants/config.ts`
- Mudanças de âncoras da home devem continuar centralizadas em
  `lib/constants/routes.ts`
- O componente e server-compatible porque nao depende de estado nem APIs do navegador
