# Gallery Modal Redesign — Spec

**Data:** 2026-03-30 **Componente:** `ProjectGalleryModal` **Arquivo:**
`components/sections/Portfolio/ProjectGalleryModal.tsx`

---

## Problema

O modal atual divide o espaço horizontalmente: ~55% imagem à esquerda / ~45%
painel de informações à direita. A imagem — foco do portfólio — compete em
igualdade com o texto. A navegação por setas visíveis não é intuitiva em touch.

---

## Objetivo

Reorganizar o modal em **layout vertical**: imagem ocupa a parte superior
dominando o espaço; informações ficam em uma faixa separada e distinta abaixo. A
imagem é o foco absoluto; a info é suporte.

---

## Funcionalidade preservada — URL shareable

O estado do modal (projeto ativo + imagem ativa) é sincronizado com a URL pelo
componente pai `Portfolio.tsx` via o callback `onImageChange(src)`. O redesign
não altera essa lógica — o modal continua chamando `onImageChange(src)` sempre
que a imagem ativa muda, e `onClose()` ao fechar. Nenhuma mudança em
`Portfolio.tsx` ou `Portfolio.utils.ts`.

---

## Layout

### Desktop (lg+ / ≥ 1024px)

```
┌──────────────────────────────────────────────┐  ┐
│                                              │  │ h-[calc(100dvh-3rem)]
│              IMAGEM  (flex-1)                │  │ max-h-[860px]
│        swipe/drag ← → para navegar          │  │
│                                              │  │
├──────────────────────────────────────────────┤  │
│ linha 1: [badge]  Título              1 de N │  │ faixa info
│ linha 2: 📍 Local · Ano · Área              │  │ h-auto (≈140px)
│ linha 3: [thumb][thumb][thumb][thumb]        │  │
│ linha 4: [tag][tag][tag]                     │  │
└──────────────────────────────────────────────┘  ┘
```

- Modal: `flex flex-col`, `h-[calc(100dvh-3rem)] max-h-[860px]`, `max-w-5xl`,
  `rounded-2xl`, `shadow-2xl`
- **Imagem:** `flex-1 min-h-0 relative overflow-hidden` — cresce para preencher
  o espaço acima da faixa
- **Faixa info:** `shrink-0 bg-white border-t border-slate-200 px-6 py-4`

### Mobile (< lg / < 1024px) — inclui tablets

- Modal: `fixed inset-0`, `flex flex-col`, sem bordas arredondadas
- **Imagem:** `flex-1 min-h-0 relative overflow-hidden` — ocupa todo espaço
  acima da faixa
- **Faixa info:** começa com altura colapsada `180px`, expande para `45vh` via
  swipe up

---

## Imagem

### Swipe/drag

- `drag="x"` do Framer Motion no container da imagem
- `dragConstraints={{ left: 0, right: 0 }}` + `dragElastic={0.2}`
- `onDragEnd`: se `offset.x < -80` ou `velocity.x < -200` → próxima imagem; se
  `offset.x > 80` ou `velocity.x > 200` → imagem anterior; senão → snap back
- **Convenção "segue o dedo":** arrastar para ESQUERDA (x negativo) → avança
  para a próxima imagem; arrastar para DIREITA (x positivo) → volta à imagem
  anterior
- Mesma direção do teclado: `ArrowRight` → próxima, `ArrowLeft` → anterior
- `style={{ touchAction: 'pan-y' }}` no container — permite scroll vertical da
  página, bloqueia pan horizontal do browser (evita conflito com drag)

### Feedback visual durante drag

- Container da imagem: `style={{ perspective: '1200px' }}`
- `rotateY` proporcional ao offset:
  `useTransform(dragX, [-300, 0, 300], [2, 0, -2])`
- `dragX` via `useMotionValue(0)` passado para o `motion.div` da imagem

### Transição entre imagens

- `AnimatePresence mode="wait"`
- Saída: `{ x: direction * -300, opacity: 0 }` em `0.2s ease-out`
- Entrada: `{ x: direction * 300 → 0, opacity: 0 → 1 }` em `0.2s ease-out`
- `direction`: `+1` para avançar, `-1` para voltar — controlado via
  `useState<1 | -1>`
- **Sincronização garantida:** toda navegação passa por um helper interno
  `navigateToImage(src, dir)` que chama `setDirection(dir)` e
  `onImageChange(src)` no mesmo evento, garantindo que o React os processe no
  mesmo batch antes do próximo render e do AnimatePresence disparar

```ts
const navigateToImage = (src: string, dir: 1 | -1) => {
  setDirection(dir);
  onImageChange(src);
};
// Uso em onDragEnd, handleKeyDown e clique em thumbnail
```

### Fechar por swipe (mobile)

- Handler `onDragEnd` na imagem: se `velocity.y > 600` → chama `onClose()`
- Aplicado apenas quando `window.innerWidth < 1024`

### Teclado

- `ArrowRight` → próxima imagem (chama `onImageChange`)
- `ArrowLeft` → imagem anterior (chama `onImageChange`)
- `Escape` → fecha (chama `onClose`)
- Listener via `useEffect` com `keydown`, cleanup no unmount (igual ao atual)

---

## Faixa de informações

### Conteúdo — Desktop (sempre visível, 4 linhas)

**Linha 1 — Identidade:** `flex items-center justify-between gap-4`

- Esquerda: Badge de categoria (`primary-500`)
- Centro: Título `text-slate-900 font-bold text-lg line-clamp-1 flex-1 mx-3`
- Direita: Contador `text-slate-400 text-sm whitespace-nowrap` — `X de N`

**Linha 2 — Metadados:** `flex items-center gap-1 mt-1 text-sm text-slate-500`

- `<MapPin h-3.5 w-3.5 text-primary-500 />` Localização
- `<span className="mx-1.5 text-slate-300">·</span>`
- `<Calendar h-3.5 w-3.5 text-primary-500 />` Ano
- `<span className="mx-1.5 text-slate-300">·</span>` (apenas se `project.area`
  existir)
- `<Maximize2 h-3.5 w-3.5 text-primary-500 />` Área (condicional)

**Linha 3 — Thumbnails:** `flex gap-2 mt-3 overflow-x-auto pb-0.5`

- Cada thumb: `h-14 w-20 shrink-0 rounded-xl object-cover border-2`
- Ativo: `border-primary-500 shadow-sm`
- Inativo: `border-transparent hover:border-slate-300`

**Linha 4 — Tags:** `flex flex-wrap gap-1.5 mt-2` (condicional: só renderiza se
`project.tags?.length > 0`)

- Chip:
  `rounded-full border border-slate-200 bg-slate-50 text-slate-600 text-xs px-2.5 py-1`

### Conteúdo mobile — colapsado (180px)

- Linha 1 + Linha 2 + Linha 3 (sem tags)
- Handle visual no topo: `w-10 h-1 rounded-full bg-slate-300 mx-auto mb-3 mt-1`
- `overflow-hidden` para cortar conteúdo que ultrapassar 180px

### Conteúdo mobile — expandido (45vh)

- Todas as 4 linhas
- `overflow-y-auto` para scroll interno se necessário
- Fundo: `bg-white` (igual ao colapsado — sem blur, para consistência)

### Animação da faixa mobile

- Container da faixa: `motion.div` com `drag="y"`
- `dragConstraints={{ top: -panelExpandDelta, bottom: 0 }}`
- `panelExpandDelta` calculado em pixels via `useEffect` no mount e em resize:
  ```ts
  const [panelExpandDelta, setPanelExpandDelta] = useState(0);
  useEffect(() => {
    const calc = () => setPanelExpandDelta(window.innerHeight * 0.45 - 180);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  ```
- `dragElastic: 0.08`
- `onDragEnd`:
  - Se `offset.y < -60` ou `velocity.y < -300` → estado `expanded`
  - Caso contrário → estado `collapsed`
- `animate={{ height: isExpanded ? "45vh" : "180px" }}`
- `transition={{ type: "spring", stiffness: 400, damping: 40 }}`
- Swipe down no painel (offset.y > 0) retorna ao estado colapsado — **nunca
  fecha o modal**

---

## Animação de abertura do modal

```ts
initial={{ opacity: 0, scale: 0.97 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.97 }}
transition={{ type: "spring", stiffness: 320, damping: 32 }}
```

Faixa info entra com:

```ts
initial={{ y: "100%" }}
animate={{ y: 0 }}
transition={{ type: "spring", stiffness: 320, damping: 32 }}
```

---

## Botão fechar

- `absolute top-3 right-3 z-20`
- `h-10 w-10 rounded-2xl bg-slate-950/60 backdrop-blur-sm text-white`
- Hover: `bg-slate-950/80`
- Sempre visível sobre a imagem

---

## Fechar o modal — resumo

| Ação                                                     | Resultado                |
| -------------------------------------------------------- | ------------------------ |
| Botão X                                                  | `onClose()`              |
| Click no backdrop                                        | `onClose()`              |
| ESC                                                      | `onClose()`              |
| Swipe down na **imagem** com `velocity.y > 600` (mobile) | `onClose()`              |
| Swipe down na **faixa**                                  | Colapsa faixa para 180px |

---

## Componentes afetados

| Arquivo                   | Mudança                                            |
| ------------------------- | -------------------------------------------------- |
| `ProjectGalleryModal.tsx` | Reescrita completa do layout e lógica de interação |
| `Portfolio.types.ts`      | Sem mudança                                        |
| `Portfolio.utils.ts`      | Sem mudança                                        |
| `Portfolio.tsx`           | Sem mudança                                        |
| `ProjectCard.tsx`         | Sem mudança                                        |

---

## Critérios de aceitação

- [ ] Layout vertical: imagem no topo (`flex-1`), faixa info embaixo
      (`shrink-0`)
- [ ] Modal desktop: `h-[calc(100dvh-3rem)] max-h-[860px] max-w-5xl rounded-2xl`
- [ ] Modal mobile: `fixed inset-0` sem bordas arredondadas
- [ ] Nenhuma seta de navegação visível
- [ ] Arrastar imagem para esquerda avança (próxima); para direita volta
      (anterior) — threshold 80px / velocity 200px/s
- [ ] Snap back quando offset < 80px e velocity < 200px/s
- [ ] `rotateY` (0→2deg) proporcional ao drag com `perspective: 1200px` no
      container
- [ ] `touchAction: pan-y` no container da imagem
- [ ] Transição direcional entre imagens: slide + fade 0.2s ease-out
- [ ] `ArrowRight` → próxima, `ArrowLeft` → anterior, `ESC` → fechar
- [ ] `onImageChange(src)` chamado a cada troca de imagem (preserva URL sync)
- [ ] Desktop: 4 linhas sempre visíveis na faixa (badge/título/counter,
      metadados, thumbnails, tags)
- [ ] Mobile: faixa começa em 180px com handle de swipe visível
- [ ] Mobile: swipe up offset > 60px ou velocity > 300px/s expande faixa para
      45vh
- [ ] Mobile: swipe down na faixa colapsa para 180px (nunca fecha o modal)
- [ ] Mobile: swipe down na imagem com velocity.y > 600px/s chama `onClose()`
- [ ] Thumbnail ativo: `border-2 border-primary-500`
- [ ] Tags: sempre visíveis no desktop; apenas no estado expandido no mobile
- [ ] Abertura/fechamento: spring `stiffness: 320, damping: 32`
- [ ] Faixa mobile anima com spring `stiffness: 400, damping: 40`
