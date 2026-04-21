# Typography Changelog v2

## Intent

Move the system from expressive-but-inconsistent typography to a clearer, production-grade hierarchy with better readability across light and dark modes.

## Before -> After

### Shadow theme font system

- **Before:** `Aoboshi One` used for both display and body text.
- **After:** `Aoboshi One` for display + `Manrope` for body.
- **Why:** Keeps Shadow's identity in headings while improving paragraph and form legibility.

### Heading scale and rhythm

- **Before:** More dramatic display sizing with looser role separation.
- **After:** Tightened scale and leading in `CursedHeading`:
  - `h1`: `text-4xl md:text-6xl`, `tracking-[-0.03em]`, `leading-[1.15]`
  - `h2`: `text-3xl md:text-5xl`, `tracking-[-0.025em]`, `leading-[1.2]`
  - `h3`: `tracking-[-0.02em]`, `leading-[1.25]`
  - `h4`: `font-medium`, `tracking-[-0.01em]`, `leading-[1.3]`
- **Why:** Stronger hierarchy without oversized theatrical treatment.

### Body and caption cadence

- **Before:** Body and caption spacing felt slightly loose/inconsistent across contexts.
- **After:** Standardized in `CursedText`:
  - body `leading-[1.68]`
  - caption `leading-[1.6]`
- **Why:** More controlled reading rhythm and better text texture in dense stories.

### Label voice consistency

- **Before:** Labels mixed `font-medium` + varying tracking (`0.08em`, `0.1em`) across components/stories.
- **After:** Unified label style to `font-semibold` + `tracking-[0.11em]`.
- **Why:** Better metadata contrast and a stable small-text system voice.

### Input readability

- **Before:** Inputs relied on inherited text sizing.
- **After:** Input base now explicitly sets `text-[0.95rem]` and `leading-[1.5]`.
- **Why:** Improves legibility and consistency across input, textarea, and select controls.

### Rendering fidelity

- **Before:** No explicit kerning/ligature directives in base body.
- **After:** Added `font-kerning: normal` and `font-feature-settings: "liga" 1, "calt" 1`.
- **Why:** Cleaner letter shaping and spacing, especially in medium-weight body text.

## Files touched (typography-specific)

- `.storybook/preview-head.html`
- `src/index.css`
- `src/lib/themes.ts`
- `src/components/cursed/CursedHeading.tsx`
- `src/components/cursed/CursedText.tsx`
- `src/components/cursed/CursedInput.tsx`
- `src/stories/cursed/Typography.stories.tsx`
- `src/stories/cursed/FormInputs.stories.tsx`
- `src/stories/cursed/Button.stories.tsx`
- `src/stories/cursed/ColorTokens.stories.tsx`
- `DESIGN.md`

## Non-goals in this pass

- Replacing Shrine or Void typography pairings.
- Adding additional font families beyond the current two-family per-theme strategy.
- Introducing fluid type in app-style component stories.
