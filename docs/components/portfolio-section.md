# Portfolio Section

**File:** `components/sections/Portfolio/Portfolio.tsx`  
**Type:** Client Component (`'use client'`)

## Overview

Filterable project gallery with category tabs, animated card transitions and a
responsive modal gallery opened by clicking any project card.

## Subcomponents

| File                      | Purpose                                                       |
| ------------------------- | ------------------------------------------------------------- |
| `Portfolio.tsx`           | Main section with state management                            |
| `ProjectCard.tsx`         | Individual project card that opens the gallery                |
| `ProjectGalleryModal.tsx` | Responsive modal with gallery, thumbnails and project details |
| `CategoryFilter.tsx`      | Tab-based category filter UI                                  |

## Filter Logic

```ts
const filteredProjects =
  activeCategory === ProjectCategory.TODOS
    ? projects
    : projects.filter((p) => p.category === activeCategory);
```

State is managed locally with `useState<ProjectCategory>`.

The modal state is also local to `Portfolio.tsx`:

```ts
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
```

When the category changes, the selected project is cleared so the UI never keeps
an open modal for a project hidden by the current filter.

## Animation

Uses Framer Motion `AnimatePresence mode="popLayout"` with a
`key={activeCategory}` on the grid to trigger re-animation when filter changes.
Each card uses `GALLERY_STAGGER_ITEM` variant.

The gallery modal also uses Framer Motion for:

- backdrop fade
- modal enter/exit
- active image transition when changing slides

## Data

Edit `lib/data/projects.data.ts` to add/remove projects. Each project requires:

```ts
interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  coverImage: ImageData;
  images?: ImageData[];
  location: string;
  area?: string;
  year: number;
  featured: boolean;
  tags?: string[];
}
```

## Gallery Rule

Portfolio gallery follows one explicit rule:

- `coverImage` is always the first image shown in the modal
- `images` contains complementary project images for the same project
- each project currently keeps exactly `10` local images in total
- `images` must not duplicate the `coverImage`
- if `images` is omitted, the modal falls back to the cover image only

This rule is normalized in `ProjectGalleryModal.tsx`, so the modal always
receives a deduplicated list of images.

The shareable URL also follows a fixed pattern:

- `projeto` stores the slug generated from the visible project title
- `imagem` stores the exact `src` of the active gallery image
- both values are synchronized automatically when the modal opens or changes
  slide
- sharing the URL restores the same project and the same image

## Adding a Project

1. Add a folder for the project inside `public/images/projects/`
2. Add `10` local images named `01` to `10` for the gallery
3. Keep the first image as `coverImage` and the other `9` as `images`
4. Add entry to `lib/data/projects.data.ts`
5. Assign appropriate `ProjectCategory` enum value

## Modal Behavior

- Clicking any project card opens the gallery modal
- `Escape` closes the modal
- body scroll is locked while the modal is open
- arrow keys navigate images when the gallery has more than one slide
- thumbnails are horizontally scrollable on smaller screens

## Accessibility

- Cards expose a descriptive `aria-label` to announce the gallery action
- The modal uses `role="dialog"` and `aria-modal="true"`
- Prev/next controls and close action expose explicit `aria-label`s

## Local Asset Strategy

The current implementation uses:

- one local folder per project inside `public/images/projects/`
- `10` local SVGs per project to keep the gallery complete and stable

This keeps the modal stable and avoids depending only on remote sources.

## Categories

Defined in `lib/types/common.types.ts`:

- `TODOS` - show all
- `RESIDENCIAL`
- `COMERCIAL`
- `REFORMA`
- `MANUTENCAO`
