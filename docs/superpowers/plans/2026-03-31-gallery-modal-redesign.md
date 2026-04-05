# Gallery Modal Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar o `ProjectGalleryModal` para layout vertical imersivo —
imagem domina o topo, faixa de informações compacta abaixo, navegação por
swipe/drag sem setas visíveis.

**Architecture:** O componente é reescrito inteiramente mantendo a mesma
interface de props. A lógica de URL sync permanece no pai (`Portfolio.tsx`). O
modal passa a usar `drag="x"` na imagem para navegação e `drag="y"` na faixa
mobile para expandir/colapsar.

**Tech Stack:** Next.js 15, React, Framer Motion (`motion`, `AnimatePresence`,
`useMotionValue`, `useTransform`), Tailwind CSS, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-30-gallery-modal-redesign.md`

---

## File Map

| Arquivo                                                 | Ação               |
| ------------------------------------------------------- | ------------------ |
| `components/sections/Portfolio/ProjectGalleryModal.tsx` | Reescrita completa |
| `components/sections/Portfolio/Portfolio.types.ts`      | Sem mudança        |
| `components/sections/Portfolio/Portfolio.utils.ts`      | Sem mudança        |
| `components/sections/Portfolio/Portfolio.tsx`           | Sem mudança        |

---

## Task 1: Estrutura base do modal (layout vertical)

Substituir o layout horizontal atual (imagem esquerda / info direita) pelo
layout vertical (imagem topo / faixa abaixo). Sem lógica de navegação ainda —
apenas a estrutura HTML/CSS.

**Files:**

- Modify: `components/sections/Portfolio/ProjectGalleryModal.tsx`

- [ ] **1.1 — Substituir o JSX do modal**

Substituir todo o conteúdo do `return` do componente pelo layout abaixo. Manter
o backdrop e o `motion.div` externo existentes. Remover o `div` com `flex-row`
atual e as duas colunas.

```tsx
return (
  <>
    {/* Backdrop */}
    <motion.button
      type="button"
      className="fixed inset-0 z-gallery-overlay bg-slate-950/70 backdrop-blur-sm"
      aria-label="Fechar galeria do projeto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />

    {/* Modal container */}
    <div className="fixed inset-0 z-gallery flex items-center justify-center lg:p-6">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Galeria do projeto ${project.title}`}
        data-testid="project-gallery-modal"
        className="
          relative flex h-full w-full flex-col
          overflow-hidden bg-white
          lg:h-[calc(100dvh-3rem)] lg:max-h-[860px] lg:max-w-5xl
          lg:rounded-2xl lg:shadow-2xl lg:shadow-slate-950/30
        "
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        {/* Botão fechar */}
        <button
          type="button"
          aria-label="Fechar modal da galeria"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950/60 text-white backdrop-blur-sm transition-colors hover:bg-slate-950/80"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Área da imagem — ocupa todo espaço acima da faixa */}
        <div className="relative min-h-0 flex-1 bg-slate-900">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 80vw"
            className="object-cover"
          />
        </div>

        {/* Faixa de informações */}
        <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
          <p className="text-slate-900">{project.title}</p>
        </div>
      </motion.div>
    </div>
  </>
);
```

- [ ] **1.2 — Remover imports não usados**

Remover `ChevronLeft`, `ChevronRight`, `Calendar`, `MapPin`, `Maximize2` dos
imports (serão readicionados nas tarefas seguintes). Manter `X`, `Image`,
`motion`, `AnimatePresence`.

- [ ] **1.3 — Verificar build**

```bash
npm run build
```

Esperado: build sem erros de TypeScript.

- [ ] **1.4 — Commit**

```bash
git add components/sections/Portfolio/ProjectGalleryModal.tsx
git commit -m "refactor(modal): layout vertical base — imagem topo, faixa abaixo"
```

---

## Task 2: Navegação por swipe/drag na imagem

Adicionar `drag="x"` na imagem com `useMotionValue`, `useTransform`,
`AnimatePresence` direcional e o helper `navigateToImage`.

**Files:**

- Modify: `components/sections/Portfolio/ProjectGalleryModal.tsx`

- [ ] **2.1 — Adicionar estado e motion values**

No topo do componente, após as declarações existentes:

```tsx
const [direction, setDirection] = useState<1 | -1>(1);
const dragX = useMotionValue(0);
const rotateY = useTransform(dragX, [-300, 0, 300], [2, 0, -2]);
```

Adicionar ao imports do React: `useState`. Adicionar imports do Framer Motion:
`useMotionValue`, `useTransform`.

- [ ] **2.2 — Implementar helper navigateToImage**

```tsx
const navigateToImage = (src: string, dir: 1 | -1) => {
  setDirection(dir);
  onImageChange(src);
};

const handlePrevious = () => {
  const prev =
    galleryImages[
      (safeActiveImageIndex - 1 + galleryImages.length) % galleryImages.length
    ];
  navigateToImage(prev.src, -1);
};

const handleNext = () => {
  const next = galleryImages[(safeActiveImageIndex + 1) % galleryImages.length];
  navigateToImage(next.src, 1);
};
```

- [ ] **2.3 — Substituir a área da imagem por motion.div com drag**

Substituir o `<div className="relative min-h-0 flex-1 bg-slate-900">` atual pelo
bloco abaixo:

```tsx
{
  /* Área da imagem com swipe */
}
<div
  className="relative min-h-0 flex-1 overflow-hidden bg-slate-900"
  style={{ perspective: '1200px' }}
>
  <AnimatePresence mode="wait" custom={direction}>
    <motion.div
      key={activeImage.src}
      className="absolute inset-0"
      drag={galleryImages.length > 1 ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      style={{ x: dragX, rotateY, touchAction: 'pan-y' }}
      custom={direction}
      initial={(dir: number) => ({ x: dir * 300, opacity: 0 })}
      animate={{ x: 0, opacity: 1, rotateY: 0 }}
      exit={(dir: number) => ({ x: dir * -300, opacity: 0 })}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onDragEnd={(_, info) => {
        const { offset, velocity } = info;
        if (offset.x < -80 || velocity.x < -200) {
          handleNext();
        } else if (offset.x > 80 || velocity.x > 200) {
          handlePrevious();
        }
        dragX.set(0);
      }}
    >
      <Image
        src={activeImage.src}
        alt={activeImage.alt}
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 80vw"
        className="pointer-events-none object-cover"
      />
    </motion.div>
  </AnimatePresence>

  {/* Contador de imagens */}
  {galleryImages.length > 1 && (
    <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
      {safeActiveImageIndex + 1} de {galleryImages.length}
    </div>
  )}
</div>;
```

- [ ] **2.4 — Verificar build**

```bash
npm run build
```

Esperado: build sem erros.

- [ ] **2.5 — Teste manual: swipe**

Abrir o modal no browser. Arrastar a imagem para a esquerda — deve avançar para
a próxima com slide direcional. Arrastar para a direita — deve voltar.

- [ ] **2.6 — Commit**

```bash
git add components/sections/Portfolio/ProjectGalleryModal.tsx
git commit -m "feat(modal): swipe/drag direcional na imagem com AnimatePresence"
```

---

## Task 3: Teclado e fechar por swipe mobile

Adicionar listeners de teclado (← → ESC) e fechar por swipe down com alta
velocity no mobile.

**Files:**

- Modify: `components/sections/Portfolio/ProjectGalleryModal.tsx`

- [ ] **3.1 — Substituir o useEffect de teclado existente**

Localizar o `useEffect` que já escuta `keydown` e substituir por:

```tsx
useEffect(() => {
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (galleryImages.length <= 1) return;
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrevious();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    document.body.style.overflow = previousOverflow;
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [galleryImages, safeActiveImageIndex, onClose]);
// handleNext e handlePrevious são estáveis pois dependem só de galleryImages e onImageChange
```

- [ ] **3.2 — Adicionar swipe down para fechar no mobile**

No `onDragEnd` do `motion.div` da imagem, adicionar após a lógica horizontal:

```tsx
onDragEnd={(_, info) => {
  const { offset, velocity } = info;

  // Fechar por swipe down (mobile)
  if (window.innerWidth < 1024 && velocity.y > 600) {
    onClose();
    return;
  }

  // Navegação horizontal
  if (offset.x < -80 || velocity.x < -200) {
    handleNext();
  } else if (offset.x > 80 || velocity.x > 200) {
    handlePrevious();
  }
  dragX.set(0);
}}
```

- [ ] **3.3 — Verificar build**

```bash
npm run build
```

- [ ] **3.4 — Teste manual: teclado**

Abrir modal, pressionar → e ←. Pressionar ESC. Todos devem funcionar.

- [ ] **3.5 — Commit**

```bash
git add components/sections/Portfolio/ProjectGalleryModal.tsx
git commit -m "feat(modal): navegação por teclado e fechar por swipe down mobile"
```

---

## Task 4: Faixa de informações — Desktop

Substituir o placeholder `<p>{project.title}</p>` na faixa pelas 4 linhas
completas para desktop.

**Files:**

- Modify: `components/sections/Portfolio/ProjectGalleryModal.tsx`

- [ ] **4.1 — Readicionar imports necessários**

```tsx
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Maximize2, X } from 'lucide-react';
```

- [ ] **4.2 — Substituir o conteúdo da faixa por 4 linhas**

```tsx
{
  /* Faixa de informações */
}
<div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
  {/* Linha 1: badge + título + contador */}
  <div className="flex items-center justify-between gap-4">
    <Badge variant="default">{project.category}</Badge>
    <h3 className="mx-3 flex-1 truncate text-lg font-bold text-slate-900">
      {project.title}
    </h3>
    {galleryImages.length > 1 && (
      <span className="shrink-0 whitespace-nowrap text-sm text-slate-400">
        {safeActiveImageIndex + 1} de {galleryImages.length}
      </span>
    )}
  </div>

  {/* Linha 2: metadados */}
  <div className="mt-1 flex flex-wrap items-center gap-x-1 text-sm text-slate-500">
    <MapPin className="h-3.5 w-3.5 text-primary-500" />
    <span>{project.location}</span>
    <span className="mx-1.5 text-slate-300">·</span>
    <Calendar className="h-3.5 w-3.5 text-primary-500" />
    <span>{project.year}</span>
    {project.area && (
      <>
        <span className="mx-1.5 text-slate-300">·</span>
        <Maximize2 className="h-3.5 w-3.5 text-primary-500" />
        <span>{project.area}</span>
      </>
    )}
  </div>

  {/* Linha 3: thumbnails */}
  {galleryImages.length > 1 && (
    <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5">
      {galleryImages.map((image, index) => (
        <button
          key={image.src}
          type="button"
          aria-label={`Selecionar imagem ${index + 1}`}
          aria-pressed={safeActiveImageIndex === index}
          data-testid="gallery-thumbnail"
          className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
            safeActiveImageIndex === index
              ? 'border-primary-500 shadow-sm'
              : 'border-transparent hover:border-slate-300'
          }`}
          onClick={() =>
            navigateToImage(image.src, index > safeActiveImageIndex ? 1 : -1)
          }
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="80px"
            className="object-cover"
          />
        </button>
      ))}
    </div>
  )}

  {/* Linha 4: tags */}
  {project.tags && project.tags.length > 0 && (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
        >
          {tag}
        </span>
      ))}
    </div>
  )}
</div>;
```

- [ ] **4.3 — Remover o contador duplicado da área da imagem**

Na Task 2 foi adicionado um contador sobre a imagem. Agora que a faixa tem o
contador na linha 1, remover o `<div>` com "X de N" que está sobre a imagem (o
`absolute bottom-3 left-3`).

- [ ] **4.4 — Verificar build**

```bash
npm run build
```

- [ ] **4.5 — Teste visual desktop**

Abrir modal em tela ≥ 1024px. Verificar: 4 linhas visíveis, thumbnail ativo com
borda `primary-500`, tags aparecem.

- [ ] **4.6 — Commit**

```bash
git add components/sections/Portfolio/ProjectGalleryModal.tsx
git commit -m "feat(modal): faixa de informações desktop com 4 linhas"
```

---

## Task 5: Faixa de informações — Mobile colapsável

Tornar a faixa colapsável no mobile com `drag="y"`, altura animada entre 180px e
45vh, handle de swipe visível e tags ocultas no estado colapsado.

**Files:**

- Modify: `components/sections/Portfolio/ProjectGalleryModal.tsx`

- [ ] **5.1 — Adicionar estado e lógica do painel mobile**

```tsx
const [isPanelExpanded, setIsPanelExpanded] = useState(false);
const [panelExpandDelta, setPanelExpandDelta] = useState(0);

useEffect(() => {
  const calc = () => setPanelExpandDelta(window.innerHeight * 0.45 - 180);
  calc();
  window.addEventListener('resize', calc);
  return () => window.removeEventListener('resize', calc);
}, []);
```

- [ ] **5.2 — Envolver a faixa em motion.div com drag="y"**

Substituir o `<div className="shrink-0 ...">` da faixa por:

```tsx
<motion.div
  className="shrink-0 overflow-hidden border-t border-slate-200 bg-white"
  animate={{ height: isPanelExpanded ? '45vh' : '180px' }}
  transition={{ type: 'spring', stiffness: 400, damping: 40 }}
  drag="y"
  dragConstraints={{ top: -panelExpandDelta, bottom: 0 }}
  dragElastic={0.08}
  onDragEnd={(_, info) => {
    if (info.offset.y < -60 || info.velocity.y < -300) {
      setIsPanelExpanded(true);
    } else {
      setIsPanelExpanded(false);
    }
  }}
  style={{ touchAction: 'none' }}
>
  {/* Handle de swipe — visível apenas no mobile */}
  <div className="flex justify-center pb-1 pt-2 lg:hidden">
    <div className="h-1 w-10 rounded-full bg-slate-300" />
  </div>

  <div
    className={`px-6 pb-4 ${isPanelExpanded ? 'overflow-y-auto' : 'overflow-hidden'}`}
    style={{ maxHeight: isPanelExpanded ? 'calc(45vh - 20px)' : undefined }}
  >
    {/* ... conteúdo das 4 linhas da Task 4 ... */}
  </div>
</motion.div>
```

> **Importante:** O conteúdo interno (4 linhas) permanece idêntico ao da Task 4.
> Apenas o wrapper muda.

- [ ] **5.3 — Ocultar tags no mobile quando colapsado**

Na Linha 4 (tags), adicionar classe condicional:

```tsx
{
  project.tags && project.tags.length > 0 && (
    <div
      className={`mt-2 flex flex-wrap gap-1.5 ${!isPanelExpanded ? 'hidden lg:flex' : 'flex'}`}
    >
      ...
    </div>
  );
}
```

Isso garante que as tags aparecem sempre no desktop (lg+) e apenas quando
expandido no mobile.

- [ ] **5.4 — Verificar build**

```bash
npm run build
```

- [ ] **5.5 — Teste manual mobile**

Abrir DevTools → modo mobile (< 1024px). Verificar:

- Faixa começa em 180px com handle visível
- Arrastar para cima expande para ~45vh mostrando tags
- Arrastar para baixo colapsa (não fecha o modal)
- Swipe down na imagem com velocidade fecha o modal

- [ ] **5.6 — Commit**

```bash
git add components/sections/Portfolio/ProjectGalleryModal.tsx
git commit -m "feat(modal): faixa mobile colapsável com drag e swipe up para tags"
```

---

## Task 6: Verificação final e build de produção

- [ ] **6.1 — Build de produção**

```bash
npm run build
```

Esperado: zero erros, zero warnings de TypeScript.

- [ ] **6.2 — Checklist dos critérios de aceitação**

Abrir o site localmente (`npm run dev`) e verificar cada item:

```
[ ] Layout vertical: imagem topo, faixa embaixo
[ ] Desktop: modal max-w-5xl, h-[calc(100dvh-3rem)], max-h-[860px], rounded-2xl
[ ] Mobile: fixed inset-0 sem bordas
[ ] Sem setas de navegação visíveis
[ ] Swipe esquerda → próxima, direita → anterior (threshold 80px)
[ ] Snap back em arrastes curtos
[ ] rotateY sutil durante drag
[ ] ArrowRight / ArrowLeft navegam
[ ] ESC fecha o modal
[ ] Click no backdrop fecha
[ ] URL atualiza a cada troca de imagem (abrir DevTools → Network ou checar URL)
[ ] Desktop: 4 linhas sempre visíveis (badge+título+counter, metadados, thumbs, tags)
[ ] Mobile: faixa começa em 180px com handle visível
[ ] Mobile: swipe up expande para ~45vh e revela tags
[ ] Mobile: swipe down na faixa colapsa (não fecha modal)
[ ] Mobile: swipe down rápido na imagem fecha o modal
[ ] Thumbnail ativo tem borda primary-500
[ ] Tags: sempre no desktop, só expandido no mobile
```

- [ ] **6.3 — Commit final**

```bash
git add components/sections/Portfolio/ProjectGalleryModal.tsx
git commit -m "feat(modal): redesign imersivo completo — layout vertical, swipe, faixa colapsável"
```
