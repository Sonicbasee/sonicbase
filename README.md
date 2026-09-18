# Remix of Remix of Remix of Sonicbase Website Replica

SONICBASE — PUBLIC-FACING WEBSITE BUILD

1. PROJECT OVERVIEW

Build the complete public-facing website for Sonicbase, a modern music company.

The attached image reference is the primary visual source of truth for this website.

The objective is to reproduce the reference design as accurately as possible while adapting the content and information architecture to Sonicbase.

This is not a request to create a new visual direction.

Do not reinterpret, modernize, simplify, beautify, or redesign the reference.

Study the reference carefully and reproduce its visual language, layout logic, spacing, typography, colors, iconography, components, proportions, interactions, and overall composition.

The final result should feel like the same design system and product family as the reference, with Sonicbase-specific content.

2. MOST IMPORTANT DESIGN RULE

THE REFERENCE IS THE SOURCE OF TRUTH

Treat every attached reference image as a design specification, not inspiration.

When implementing the website:

Copy the visual structure as closely as possible.

Preserve the same layout relationships.

Preserve the same spacing system.

Preserve typography hierarchy.

Preserve font characteristics.

Preserve font weights.

Preserve font sizes and line heights where they can be determined.

Preserve button proportions.

Preserve border radius.

Preserve border treatment.

Preserve icon style.

Preserve icon sizing.

Preserve icon stroke/fill treatment.

Preserve color values.

Preserve background treatment.

Preserve image treatment.

Preserve navigation structure where applicable.

Preserve card proportions.

Preserve section spacing.

Preserve alignment.

Preserve visual density.

Preserve responsive behavior implied by the reference.

Preserve the visual rhythm between sections.

Do not introduce a second design language.

Do not replace the reference's components with generic components from a UI library simply because they are easier to implement.

Do not substitute icons with random Lucide icons if the reference uses a specific icon style.

Do not introduce gradients, shadows, glassmorphism, excessive rounded cards, decorative effects, or other visual treatments that are not present in the reference.

If something is unclear in the reference, make the smallest possible assumption necessary to implement it while staying consistent with the surrounding design.

3. SONICBASE BRAND

Brand name:

Sonicbase

The website should communicate a contemporary music company with a strong digital presence.

The brand should feel:

Music-focused

Contemporary

Confident

Creative

Professional

Culture-aware

Digital-first

Premium without becoming overly corporate

However, these characteristics must be expressed through the supplied reference design system.

Do not create an unrelated "music website" aesthetic.

The reference always takes priority over generic assumptions about what a music company website should look like.

4. DESIGN SYSTEM EXTRACTION

Before implementing individual pages, inspect the reference and establish a reusable Sonicbase design system based directly on it.

Create reusable design tokens/components for:

Typography

Identify and reproduce:

Primary typeface

Secondary typeface if present

Display typography

Heading typography

Body typography

Navigation typography

Button typography

Caption typography

Label typography

Font weights

Letter spacing

Line heights

Text casing

Text alignment

Do not use arbitrary typography.

If the exact font is identifiable and available, use it.

If it is unavailable, use the closest possible alternative while preserving the same visual characteristics.

Colors

Extract the visual color system from the reference.

Create reusable variables for:

Primary background

Secondary background

Primary text

Secondary text

Accent

Primary button

Button text

Border

Divider

Surface

Hover states

Active states

Use the actual reference color values where possible.

Do not approximate colors unnecessarily.

Do not add colors that do not exist in the reference unless required for accessibility or functional states.

Spacing

Create a consistent spacing system based on the reference.

Pay close attention to:

Page margins

Container widths

Section spacing

Heading-to-body spacing

Card spacing

Grid gaps

Navigation spacing

Button padding

Mobile spacing

Vertical rhythm

Do not independently choose spacing for every section.

The website should feel like one coherent system.

Components

Build reusable components for recurring elements such as:

Header

Navigation

Mobile navigation

Footer

Buttons

Links

Cards

Music/content cards

Artist cards

Image blocks

Section headers

Labels

Tags

Media controls

Pagination if required

Forms

Input fields

Modals where required

Newsletter/signup areas

Social links

Every repeated component should use the same underlying component rather than separate visually similar implementations.

5. ICONOGRAPHY

Iconography is extremely important.

The icon system must match the reference.

Study:

Icon shape

Stroke width

Fill style

Corner treatment

Size

Optical weight

Alignment

Spacing

Container treatment

Active/inactive states

Do not randomly substitute icons.

If the reference uses filled icons, use filled icons.

If it uses outlined icons, use outlined icons.

If icons have a particular geometric or custom style, reproduce that style consistently.

Icons must never feel like they came from a different design system.

6. IMAGERY

Use the attached reference to determine:

Image aspect ratios

Image cropping

Image positioning

Image sizes

Image corner treatment

Image overlays

Image-to-text relationship

Image density

Image hierarchy

For Sonicbase-specific imagery, use appropriate music-related imagery such as:

Artists

Performers

Recording environments

Music production

Live performances

Studio environments

Music culture

Behind-the-scenes moments

Images should feel editorial and intentional.

Avoid generic stock imagery that makes the website feel like a template.

Do not use AI-looking people or artificial-looking photography.

Do not change the visual treatment established by the reference.

7. WEBSITE STRUCTURE

Build the entire public-facing website, not only the homepage.

Every page must have:

Proper route

Working navigation

Consistent header

Consistent footer

Responsive layout

Realistic content

Proper hover states

Proper active states

Loading states where appropriate

Empty states where appropriate

Error states where appropriate

Mobile behavior

Tablet behavior

Desktop behavior

There should be no dead navigation items.

There should be no buttons that visually work but lead nowhere.

There should be no placeholder "Coming soon" pages unless explicitly required.

8. REQUIRED PUBLIC PAGES

Create a complete public website architecture around Sonicbase.

At minimum, include:

01 — Home

Route:

/

The homepage should establish Sonicbase immediately.

Include the appropriate sections based on the reference design, such as:

Header/navigation

Hero

Sonicbase introduction

Featured music/content

Featured artists

Latest releases

Music catalogue/highlights

Company/brand story

Selected work or releases

News/updates where appropriate

Call-to-action

Footer

Do not blindly copy these sections if the reference demonstrates a different structure.

The reference determines the actual composition.

02 — About

Route:

/about

Explain:

What Sonicbase is

What Sonicbase does

Its approach to music

Its relationship with artists

Its broader music ecosystem

Brand/company story

Relevant team information if appropriate

Use the same editorial structure and visual hierarchy established in the reference.

03 — Artists

Route:

/artists

Create an artist directory/listing page.

Include:

Page introduction

Artist grid/list

Artist imagery

Artist names

Relevant metadata

Filtering or categorisation only if supported by the reference

Each artist should be clickable.

04 — Artist Detail

Route:

/artists/[artist]

Create a reusable artist detail template.

Include:

Artist hero

Artist image

Artist introduction

Biography

Featured releases

Discography

Related content

Streaming/social links where appropriate

Related artists/content if suitable

Use realistic sample Sonicbase content rather than lorem ipsum.

05 — Music / Releases

Route:

/music

Create a music catalogue/release page.

Include:

Featured release

Latest releases

Release cards

Cover artwork

Artist information

Release date

Music metadata

Streaming/action links

Each release should be clickable.

06 — Release Detail

Route:

/music/[release]

Create a reusable release-detail page.

Include:

Artwork

Release title

Artist

Release date

Description

Track listing

Streaming links

Related releases

Additional metadata where appropriate

The page should feel like a natural extension of the reference

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/120591df-7ef4-40aa-896b-2379d3ac14fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
