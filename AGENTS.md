# Cursed UI — Agent Guide

## What This Repo Is

A **design system showcase** built on [Spell UI](https://spell.sh) primitives, rendered in Storybook 10. The system provides three complete, swappable themes — each with its own palette, typography, and gradient configuration — intended for use across different projects.

This is **not** a published npm package (yet). It is a Storybook-only workbench for developing, testing, and previewing the three themes before adopting them in downstream apps.

## Architecture

```
src/
├── index.css                  # Single source of truth for all design tokens
├── components/
│   ├── cursed/                # Cursed UI components (themed wrappers)
│   │   ├── CursedHeading.tsx  # H1–H4, blur-reveal / shimmer animation
│   │   ├── CursedText.tsx     # Body/caption/label/mono, slide-up / terminal animation
│   │   ├── CursedButton.tsx   # Primary/Secondary/Ghost/Destructive (wraps FlowButton)
│   │   ├── CursedInput.tsx    # Input, Textarea, Select, Checkbox
│   │   ├── CursedBackground.tsx # Gradient (WebGL), Orbs (CSS), Minimal (dot grid)
│   │   └── index.ts           # Barrel export
│   ├── ui/                    # shadcn primitives (button, input, select, textarea)
│   ├── animated-gradient.tsx  # Spell UI — WebGL2 shader gradient
│   ├── light-rays.tsx         # Spell UI — THREE.js light rays
│   ├── blur-reveal.tsx        # Spell UI — motion/react text animation
│   ├── shimmer-text.tsx       # Spell UI — motion/react text animation
│   ├── slide-up-text.tsx      # Spell UI — motion/react text animation
│   ├── flow-button.tsx        # Spell UI — animated button
│   ├── animated-checkbox.tsx  # Spell UI — animated checkbox
│   └── label-input.tsx        # Spell UI — floating label input
├── stories/cursed/            # All Storybook stories
└── lib/utils.ts               # cn() helper (clsx + tailwind-merge)
```

## Theme System

Themes are applied via a `data-theme` attribute on the document root. All tokens are CSS custom properties defined in `src/index.css`. The `:root` block doubles as the Shrine defaults.

### The Three Themes

| Theme  | Attribute             | Intent                                     |
| ------ | --------------------- | ------------------------------------------ |
| Shrine | `data-theme="shrine"` | Warm sunset gradient — real estate, ritual |
| Shadow | `data-theme="shadow"` | High-contrast neon — editorial, grimoire   |
| Void   | `data-theme="void"`   | Spectrum cosmic — music, spatial           |

### Token Namespace

All Cursed UI tokens use the `--cursed-*` prefix. shadcn tokens (`--background`, `--primary`, etc.) are also set per-theme so that any shadcn/ui component dropped in will auto-theme.

Key token groups:

- `--cursed-bg`, `--cursed-bg-elevated`, `--cursed-bg-surface`, `--cursed-bg-overlay`
- `--cursed-fg`, `--cursed-fg-muted`, `--cursed-fg-faint`
- `--cursed-primary`, `--cursed-secondary`, `--cursed-accent`, `--cursed-highlight`
- `--cursed-gradient-1`, `--cursed-gradient-2`, `--cursed-gradient-3`
- `--cursed-font-display`, `--cursed-font-body`, `--cursed-font-mono`
- `--cursed-glow`, `--cursed-shadow`, `--cursed-border`, `--cursed-ring`

### Fonts

Fonts are loaded via `<link>` tags in `.storybook/preview-head.html`, not CSS `@import`. This avoids Tailwind v4 ordering issues.

| Theme  | Display Font | Body Font     | Mono Font      |
| ------ | ------------ | ------------- | -------------- |
| Shrine | Boldonse     | Space Grotesk | JetBrains Mono |
| Shadow | Aoboshi One  | Aoboshi One   | JetBrains Mono |
| Void   | Google Sans  | Google Sans   | JetBrains Mono |

When consuming these themes outside of Storybook, you must provide equivalent font loading (link tags, `@font-face`, or a font provider).

## Stack

| Layer       | Technology                                          |
| ----------- | --------------------------------------------------- |
| Framework   | React 19                                            |
| Bundler     | Vite 8                                              |
| CSS         | Tailwind CSS v4 (`@tailwindcss/vite` plugin)        |
| Components  | shadcn/ui (base-nova style) + Spell UI              |
| Animation   | motion/react (Framer Motion)                        |
| WebGL       | Raw WebGL2 (AnimatedGradient), THREE.js (LightRays) |
| Storybook   | v10 (`@storybook/react-vite`)                       |
| Testing     | Vitest + Playwright (via `@storybook/addon-vitest`) |
| Formatting  | Prettier (via husky + lint-staged pre-commit)       |
| Package mgr | pnpm                                                |

## Storybook Configuration

- **Preview** (`.storybook/preview.ts`): Imports `src/index.css`, applies `data-theme` attribute, listens for `cursed-ui/theme-change` channel events.
- **Manager** (`.storybook/manager.ts`): Toolbar addon that cycles themes (Shrine → Shadow → Void) and emits channel events.
- **Fonts** (`.storybook/preview-head.html`): Google Fonts `<link>` tags for all theme fonts.

Default theme on load: **Shrine**.

## Adding Components

1. **Spell UI components**: `pnpm dlx shadcn@latest add @spell/<name>` — installs to `src/components/`.
2. **shadcn primitives**: `pnpm dlx shadcn@latest add <name>` — installs to `src/components/ui/`.
3. **Cursed wrappers**: Create in `src/components/cursed/`, export from `index.ts`, add stories in `src/stories/cursed/`.

Cursed wrapper components should:

- Consume `--cursed-*` tokens via inline styles or Tailwind arbitrary values (`bg-[var(--cursed-bg)]`).
- Wrap Spell UI or shadcn primitives rather than reimplementing them.
- Accept a `className` prop for composition.

## Adding a New Theme

1. Add a `[data-theme="<name>"]` block in `src/index.css` with all `--cursed-*` and shadcn tokens.
2. Add the theme to the `themes` array in `.storybook/manager.ts`.
3. Load any new fonts in `.storybook/preview-head.html`.

## Consuming Themes in Another Project

To use a Cursed UI theme outside this repo:

1. Copy the relevant `[data-theme="..."]` CSS block from `src/index.css` into your project's global CSS.
2. Set `data-theme` on your root element.
3. Load the required fonts.
4. Install Spell UI and shadcn dependencies as needed (`motion`, `three`, `@radix-ui/react-slot`, etc.).

The token names are stable. Build your components against `--cursed-*` variables and they will respond to theme changes automatically.

## WebGL Notes

- **AnimatedGradient** uses raw WebGL2 (no library). It renders a fragment shader with swirl/distortion controls. Accepts 6 built-in presets (`Prism`, `Lava`, `Plasma`, `Pulse`, `Vortex`, `Mist`) or a `custom` config with explicit colors and parameters.
- **LightRays** uses THREE.js. It renders volumetric god rays from a configurable origin point. Supports `single`, `multi`, and `random` color modes.
- Both components position themselves `absolute` with `inset: 0` and `z-index: -1`. Parent containers must have `position: relative` and `overflow: hidden`.
- CSS custom properties (`var(--cursed-gradient-1)`) **cannot** be passed directly to WebGL uniforms — they must be resolved to hex values. The `CursedBackground` wrapper handles this for the gradient variant, but standalone usage requires hardcoded hex values matching the active theme.

## Path Aliases

`@/` maps to `./src/` (configured in both `tsconfig.json` and `vite.config.ts`).

## Formatting

Pre-commit hook runs Prettier on staged files via husky + lint-staged. Do not skip with `--no-verify`.
