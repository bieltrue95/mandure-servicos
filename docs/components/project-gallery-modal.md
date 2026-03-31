# Project Gallery Modal

**Files:**

- `components/sections/Portfolio/ProjectGalleryModal.tsx`
- `components/sections/Portfolio/Portfolio.tsx`
- `components/sections/Portfolio/ProjectCard.tsx`

## Purpose

Open a responsive gallery modal when the user clicks a project card in the
portfolio section.

## Rule

The gallery uses a fixed normalization rule:

- `coverImage` is always the first slide
- `images` contains complementary images for the same project
- the current project standard is `1` cover + `9` complementary images
- duplicate `src` values are ignored before rendering
- if a project has no complementary images, the modal still opens with the cover

## Shareable URL

The modal syncs the active state with the page URL using:

- `?projeto=<project-slug>`
- `&imagem=<image-src>`

Example:

- `?projeto=residencia-alto-da-lapa&imagem=%2Fimages%2Fprojects%2Fresidencia-alto-lapa%2F01.svg`

Project slugs are generated from the visible project title, and the active image
is shared using the exact `src` rendered in the modal.

## Responsive Behavior

- Mobile: full-screen vertical flow with natural page scroll and touch-friendly
  controls
- Tablet: still stacked, but with larger media height and wider thumbnails
- Notebook: centered card with fixed height, split between gallery and details
- Desktop/Web: keeps the split layout with more width and internal scroll only
  in the details column

## Interaction

- Click card: open modal
- Click overlay: close modal
- `Escape`: close modal
- `ArrowLeft` / `ArrowRight`: switch images
- Thumbnail click: jump to a specific image

## Implementation Notes

- Body scroll is locked while the modal is open
- Active image transitions use Framer Motion
- Thumbnails are horizontally scrollable to stay usable on smaller screens
- The modal is rendered outside the portfolio grid flow so it does not affect
  layout
- On mobile, the details panel can be hidden/reopened with drag/gesture
