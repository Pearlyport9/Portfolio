# Design Tokens — Portfolio Website

## Tech stack

- HTML, CSS, JavaScript (vanilla — no framework unless explicitly decided otherwise)
- Typography: Cormorant (serif, display/headlines) + Switzer (sans, body/UI)
- Built via AI coding agent (OpenCode + DeepSeek Reasoner)

Rule: never hardcode hex values, font names, or spacing numbers directly in component markup or inline styles. Always reference these tokens via CSS custom properties.

---

## Important — JSON token files

Pearl will manually drop two JSON files into the project root before the build:

- `color-tokens.json` — source of truth for all color values
- `typography-tokens.json` — source of truth for all font families, sizes, weights, line heights

**Agent must use these JSON files to generate the CSS custom properties — not hardcode values from this file.** This `.md` file is reference/documentation only. The JSON files are what gets implemented.

---

- Page background is cream/light by default. Dark (`--color-bg-dark`) is used only as an accent for specific sections (e.g. footer, a contrast band), never the whole page.
- Two accents, distinct roles: gold (`--color-gold`) for highlights, focus rings, and decorative accents; orange (`--color-accent`) for primary buttons and CTAs only. Not a multi-color pill system beyond these two.
- Rounded pill-shaped tags for role labels and project tags (Solo/Collaborative).
- Italic serif (Cormorant italic) used sparingly for emphasis within a sentence, not as a default style.
- Small decorative flourishes optional near hero statement or section headers — used sparingly, not on every section.
- Generous whitespace, no dense grids — appropriate given only 5 projects.

---

## Colors

```css
:root {
  /* Brand core */
  --color-gold: #8B6B15;        /* secondary/decorative accent */
  --color-bg-dark: #2A2008;     /* dark background */
  --color-cream: #F8F5F0;       /* light background / accent */

  /* Neutrals (derive as needed during build, keep minimal) */
  --color-text-primary: #1A1A1A;
  --color-text-on-dark: #F8F5F0;
  --color-text-muted: #6B6B6B;
  --color-border: #E5E0D8;

  /* State */
  --color-link-hover: #A8842A;

  /* CTA accent (distinct from gold — buttons/pills only) */
  --color-accent: #E0522D;
  --color-accent-hover: #CC4125;
}
```

Usage rule: gold is a decorative/secondary accent (hover states, small highlights, dividers, focus rings) — not large background blocks unless it's an intentional full dark/gold section. Orange (`--color-accent`) is reserved for primary buttons and CTAs; don't use it for decorative highlights or gold's use cases.

---

## Typography

```css
:root {
  --font-display: 'Cormorant', serif;   /* headlines, hero statements, section titles */
  --font-body: 'Switzer', sans-serif;   /* body copy, nav, buttons, captions */

  --fs-hero: clamp(2.5rem, 6vw, 4.5rem);
  --fs-h1: clamp(2rem, 4vw, 3rem);
  --fs-h2: clamp(1.5rem, 3vw, 2.25rem);
  --fs-h3: 1.25rem;
  --fs-body: 1rem;
  --fs-small: 0.875rem;

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;

  --lh-tight: 1.1;
  --lh-normal: 1.5;
  --lh-relaxed: 1.7;
}
```

Rule: Cormorant only for large display moments (hero line, section headers, case study titles). Everything functional — nav, buttons, body paragraphs, labels — stays Switzer. Don't mix them within the same line of text.

---

## Spacing scale

```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;
  --space-2xl: 6rem;
  --space-3xl: 8rem;
}
```

---

## Radius & shadow

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  --shadow-soft: 0 4px 24px rgba(0,0,0,0.06);
}
```

---

## Breakpoints

```css
/* Mobile-first. Always test all three. */
/* Mobile: default, < 640px */
@media (min-width: 640px)  { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
```

---

## Layout

- Max content width: `1200px`, centered with side padding `var(--space-md)` on mobile, `var(--space-xl)` on desktop.
- Section vertical rhythm: `var(--space-2xl)` to `var(--space-3xl)` between major sections.
