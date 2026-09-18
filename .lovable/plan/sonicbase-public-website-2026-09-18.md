# Sonicbase Public Website

## Goal
Build a complete, responsive Sonicbase website that faithfully follows the supplied reference: sparse black-and-white editorial layouts, oversized display headings, image-led music storytelling, compact pill controls, restrained borders, and a bold black footer.

## Pages
- **Home `/`** — full-bleed featured artist carousel, trending releases, editorial news, social/culture strip, and footer.
- **About `/about`** — Sonicbase story, artist-first approach, company pillars, selected milestones, and team.
- **Artists `/artists`** — searchable/filterable artist directory with clickable editorial portraits.
- **Artist detail `/artists/$artist`** — artist hero, biography, key facts, releases, links, and related artists.
- **Music `/music`** — featured release, category controls, catalogue filters, sorting, and release grid.
- **Release detail `/music/$release`** — cover, metadata, track list, listening links, notes, and related releases.
- **News `/news`** — featured editorial stories and a complete article grid.
- **Shop `/shop`** — reference-faithful merchandise catalogue with categories and filters; product controls remain demo interactions without checkout.
- **Contact `/contact`** — dark contact selector and inquiry form with clear submitted/error states.

## Shared Experience
- Reusable header, geometric Sonicbase mark, desktop/mobile navigation, search overlay, cart indicator, pills, cards, buttons, forms, and footer.
- Real links for every navigation item and card; no dead controls.
- Responsive desktop, tablet, and mobile layouts derived from the reference’s spacing and proportions.
- Lightweight loading feedback for imagery, empty catalogue/search states, form validation, and route-level error handling.

## Visual System
- Near-white canvas, near-black text, pale gray product/editorial surfaces, hairline borders, and inverted footer/contact sections.
- Wide grotesk display typography paired with a neutral sans-serif body face; fonts loaded through the document head.
- Large page headings, compact navigation, uppercase capsule labels, shallow corner radii, generous whitespace, and no gradients or decorative shadows.
- Custom line icons and a Sonicbase monogram matched to the reference’s geometric stroke treatment.
- Cohesive generated editorial imagery and cover art for artists, releases, studio culture, live performance, and merchandise.

## Technical Details
- Central typed content model for artists, releases, news, products, navigation, and shared route lookups.
- TanStack file routes for every public URL, including reusable dynamic artist and release pages.
- Semantic Tailwind v4 tokens in the global stylesheet; shared React components for repeated layouts.
- Unique title, description, Open Graph, and Twitter metadata on every content route.
- Validation with the existing project checks plus browser review at desktop and mobile sizes.
