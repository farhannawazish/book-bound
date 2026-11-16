---
name: Modern Literary Editorial
colors:
  surface: '#f9f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f9f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f7'
  surface-container: '#ededf2'
  surface-container-high: '#e8e8ec'
  surface-container-highest: '#e2e2e6'
  on-surface: '#1a1c1f'
  on-surface-variant: '#3e4947'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f0f0f4'
  outline: '#6e7a77'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a61'
  primary: '#00685e'
  on-primary: '#ffffff'
  primary-container: '#0a8377'
  on-primary-container: '#f4fffb'
  inverse-primary: '#76d7c9'
  secondary: '#126a61'
  on-secondary: '#ffffff'
  secondary-container: '#a4f1e5'
  on-secondary-container: '#1c7067'
  tertiary: '#755631'
  on-tertiary: '#ffffff'
  tertiary-container: '#916e47'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#93f4e5'
  primary-fixed-dim: '#76d7c9'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#a4f1e5'
  secondary-fixed-dim: '#88d4c9'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffddb9'
  tertiary-fixed-dim: '#e9bf91'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#5e411e'
  background: '#f9f9fd'
  on-background: '#1a1c1f'
  surface-variant: '#e2e2e6'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the intimacy of independent publishing combined with the precision of contemporary digital tools. It avoids sterile SaaS tropes in favor of an intellectual, calm, and tactile reading environment. 

The aesthetic is characterized by:
- **Literary Sophistication:** Strong typographic hierarchy rooted in classical serif headlines anchored by clean, legible sans-serif interfaces.
- **Airy Rhythm:** Intentional white space and breathing room that encourages deep reading, slow curation, and sustained focus.
- **Refined Craft:** Subtle surface elevations, delicate warm hairline borders, and deep botanical accents that feel like archival paper and bookbinding cloth.

## Colors

The palette balances warm paper-like substrates with grounded, deep vegetal teals and archival charcoal:

- **Canvas & Backgrounds:** The foundation is a warm, soft off-white (`#F6F7F9`), paired with elevated pristine white surfaces (`#FFFFFF`) to mimic laid sheets of paper.
- **Primary & Secondary (`#1B8A7E`, `#146B62`):** Evoking cloth book spines, botanical dye, and deep water. Used for primary CTAs, active reading state highlights, badges, and focal interactive anchors.
- **Tertiary Accent (`#8C6A43`):** Warm leather and bookbinding cord. Used sparsely for editorial eyebrow labels, volume numbering, and subtle ornamental timestamps.
- **Typographic Neutral (`#141619`):** Deep charcoal ink rather than harsh pitch black, reducing harsh optical glare during prolonged reading sessions.
- **Borders & Dividers:** Subtle warm neutrals (`#E5E7EB` to `#ECEEEF`) providing hairline containment without structural weight.

## Typography

Typography drives the identity of this design system:

- **Editorial Serifs (`Playfair Display`):** Reserved for cover lines, major essay titles, feature callouts, and volume headlines. Kerning is tight and disciplined. Never use bold weights for full longform sentences.
- **Modern Humanist Body & Interface (`Plus Jakarta Sans`):** Selected for its friendly clarity, balance, and legibility at micro scales. It provides modern utilitarian counter-balance to the expressive serif headlines.
- **Editorial Micro-copy:** Category tags, reading times, publication dates, and author metadata utilize `label-md` or `label-sm` set in subtle uppercase with positive letter spacing (`0.04em` to `0.06em`).

## Layout & Spacing

The layout is built upon an asymmetric 12-column editorial grid on desktop that consolidates into a 4-column column layout on mobile screens:

- **Max Content Container:** Standard content wells clamp at 1200px. Longform article reading views clamp narrower at 720px to sustain a 65–75 character measure optimal for sustained reading.
- **Rhythm & Cadence:** Generous section spacing (`space-xl` and above) replicates editorial pacing, separating long articles, collections, and curations without visual noise.
- **Grid Density:** Cards and modules span multi-column ratios (e.g., 8-column lead story paired with a 4-column side collection) to mimic printed magazine layouts.

## Elevation & Depth

Depth is treated with subtlety to evoke layered paper stock rather than digital floating planes:

- **Base Layer:** The canvas sits at `#F6F7F9` providing a non-glare, organic base.
- **Elevated Editorial Cards:** Set on pure white (`#FFFFFF`) surfaces. Shadow parameters are soft, directional, and tinted with deep warm neutral: `0 4px 20px -2px rgba(20, 22, 25, 0.05), 0 2px 6px -1px rgba(20, 22, 25, 0.02)`.
- **Hover Transitions:** On interactive card hover, elevation subtly blooms to `0 12px 32px -4px rgba(20, 22, 25, 0.08)` accompanied by a minimal 2px vertical lift.
- **Structural Outlines:** Every elevated card incorporates a fine hairline border (`1px solid #ECEEEF`) to ensure clean contrast between the white surface and off-white background regardless of screen calibration.

## Shapes

The design system maintains a tactile, tailored geometry:

- **Standard Containers & Cards:** Grounded at 12px (`0.75rem`), striking an intentional middle ground between crisp book corners and modern software ergonomics.
- **Inputs & Interactive Controls:** Match the consistent 8px to 12px radius for visual harmony across form fields and secondary cards.
- **Pills & Metatags:** Tags, volume labels, and pill badges use full roundedness (`9999px`) to create clear differentiation between actionable category tags and structural content cards.

## Components

### Buttons
- **Primary:** Filled `#1B8A7E` background with white typography, 10px corner radius, padding `0.75rem 1.5rem`. Subtle hover transition to `#146B62`.
- **Secondary / Outline:** 1px hairline border in `#D2D6DC` with `#141619` text. Hover introduces `#F0F2F4` tint without heavy shadow.
- **Ghost Editorial:** Text-only with an underlined visual cue or rightward arrow offset (`->`) for "Continue Reading" or "Explore Issue" actions.

### Cards & Articles
- **Editorial Feature Card:** Crisp white surface, 12px rounded corners, 1px border (`#ECEEEF`), soft shadow. Contains an aspect ratio 16:10 or 3:2 image container, an eyebrow tag in tertiary amber/teal, Playfair Display title, and author signature line.
- **Compact List Card:** Horizontal layout with small 80x80 thumbnail, clean headline, reading duration, and bookmark action icon.

### Chips & Tags
- Compact height (28px), pill-shaped, neutral background (`#ECEFF2`), font size `12px` medium weight. Selected state toggles to `#1B8A7E` background with white text.

### Input Fields & Search
- Generous 44px height, 10px corner radius, background `#FFFFFF`, border `1px solid #E2E4E8`. Focus ring applies a delicate `0 0 0 3px rgba(27, 138, 126, 0.15)` with a `#1B8A7E` border highlight.

### Lists & Book Collections
- Divided with ultra-subtle dividers (`#EFF1F3`). Hovering rows highlights the entire row in a soft `#FAFBFB` wash with a right-aligned reading time indicator.

### Checkboxes & Radio Controls
- Rounded square (4px) for checkboxes, circle for radio buttons. Checked state fills `#1B8A7E` with crisp white check glyph; border transitions smoothly without jarring snap animations.

### Pull Quotes & Footnotes
- Pull quotes feature an elegant left border of 3px `#1B8A7E`, set in italicized `headline-sm` Playfair Display with generous vertical padding (`space-md`).