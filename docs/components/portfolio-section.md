# Portfolio Section

**File:** `components/sections/Portfolio/Portfolio.tsx`  
**Type:** Client Component (`'use client'`)

## Overview

Filterable project gallery with category tabs and animated card transitions.

## Subcomponents

| File | Purpose |
|------|---------|
| `Portfolio.tsx` | Main section with state management |
| `ProjectCard.tsx` | Individual project card with hover effects |
| `CategoryFilter.tsx` | Tab-based category filter UI |

## Filter Logic

```ts
const filteredProjects = activeCategory === ProjectCategory.TODOS
  ? projects
  : projects.filter(p => p.category === activeCategory);
```

State is managed locally with `useState<ProjectCategory>`.

## Animation

Uses Framer Motion `AnimatePresence mode="popLayout"` with a `key={activeCategory}` on the grid to trigger re-animation when filter changes. Each card uses `GALLERY_STAGGER_ITEM` variant.

## Data

Edit `lib/data/projects.data.ts` to add/remove projects. Each project requires:

```ts
interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;         // path relative to /public
  location: string;
  year: string;
  area: string;
  description: string;
}
```

## Adding a Project

1. Add image to `public/images/projects/`
2. Add entry to `lib/data/projects.data.ts`
3. Assign appropriate `ProjectCategory` enum value

## Categories

Defined in `lib/types/common.types.ts`:
- `TODOS` — show all
- `RESIDENCIAL`
- `COMERCIAL`
- `REFORMA`
- `MANUTENCAO`
