# Cursed UI — Design Language

## The Vision

Cursed UI is a digital-occult design system. It lives in the space between a meditation app and a summoning circle — interfaces that feel like they were discovered in an abandoned server room, still humming. The aesthetic reference point is Dandadan: cosmic weirdness delivered with cinematic calm, not chaos.

Everything should feel **slow**, **heavy**, and **intentional**. No bouncing. No snapping. No playfulness. The UI breathes. Text reveals itself like it's being decrypted. Gradients shift like weather systems seen from orbit. Buttons ripple when touched, then settle.

## Mood & Inspiration

- **Dandadan** (anime) — alien geometry meets shrine energy, saturated color on void black
- **Terminal mysticism** — monospaced incantations, blinking cursors as ritual markers
- **Cosmic drift** — gradients that move like nebulae, not like loading spinners
- **Dark luxury** — near-black backgrounds, deliberate whitespace, restrained type

The system is not horror. It's not cyberpunk. It's the feeling of staring at a lava lamp at 2am while listening to ambient music — hypnotic, warm, slightly alien.

## The Three Themes

Each theme was derived from a branding reference image in the repo root (`Shrine Branding.jpg`, `Shadow Branding.jpg`, `Void Branding.jpg`). The palettes are extracted directly from these references, not invented.

---

### Shrine — Sunset Ritual

**Mood:** A sunset viewed from a rooftop in a city that doesn't exist yet. Warm but serious. The golden hour before a ritual begins.

**Palette hierarchy:**

1. **Background** `#0b0d11` — near-black with a cold blue undertone, like a sky just past dusk
2. **Deep navy** `#26366b` — the dominant structural color, used for secondary elements and the cool end of the gradient
3. **Sunset orange** `#e84c2e` — the primary action color, hot and immediate
4. **Pale blue** `#a1c1e3` — accent, used for borders and quiet highlights, like reflected moonlight
5. **Gold** `#ecdc87` — the highlight, the warm end of the gradient, used sparingly for emphasis
6. **Foreground** `#e1e1e1` — soft white, never pure `#fff`

**Gradient direction:** Navy → orange → gold. A sunset compressed into three stops. Used in WebGL backgrounds and as a conceptual throughline.

**Typography:**

- **Display:** Boldonse — heavy, decorative, unapologetically bold. It reads like a title card, not a UI label. Use only for hero headings.
- **Body:** Space Grotesk — geometric sans-serif with just enough personality. Clean but not sterile.
- **Mono:** JetBrains Mono — the terminal voice of the system.

**Glow characteristic:** Dual-layer — warm orange inner glow with a cold navy outer haze. Elements float above the background rather than sitting on it.

---

### Shadow — Neon Grimoire

**Mood:** A spell book rendered on an OLED screen. Maximum contrast. The orange burns against true black. Purple hums underneath like ultraviolet light leaking through cracks.

**Palette hierarchy:**

1. **Background** `#050505` — as close to true black as possible without aliasing artifacts
2. **Neon orange** `#ff4e00` — the primary, brighter and more saturated than Shrine's orange, almost fluorescent
3. **Deep indigo** `#4415b4` — the secondary, a violet so dark it barely separates from the background until it hits light
4. **Electric purple** `#7b3fe4` — the accent, the bridge between orange and indigo, where the gradient energy concentrates
5. **Foreground** `#e3e3e1` — warm-tinted white

**Gradient direction:** Orange → indigo → purple. A neon tube bending through color space.

**Typography:**

- **Display and body:** Aoboshi One — a Japanese-influenced serif with unusual stroke endings. It gives every word weight and ceremony. Using the same face for display and body creates a monastic, single-voice consistency.
- **Mono:** JetBrains Mono

**Glow characteristic:** Orange is the dominant glow source with indigo bleeding in at the edges. High opacity falloff — glows are tight and concentrated, not diffuse.

**Design note:** Shadow is the most editorial of the three themes. It works best with generous whitespace and minimal element density. Let the contrast do the work.

---

### Void — Cosmic Pulse

**Mood:** A music visualizer frozen mid-beat. The full visible spectrum compressed into a gradient strip, floating in near-void. Spatial, rhythmic, synthetic.

**Palette hierarchy:**

1. **Background** `#030304` — the darkest of the three themes, near-void with a barely perceptible cool shift
2. **Spectrum blue** `#4d6cfa` — the primary, a calm electric blue that anchors the cool end
3. **Magenta** `#c44aef` — the secondary, the midpoint of the spectrum, used for accents and the gradient's pivot
4. **Coral** `#f56e4a` — the accent, the warm terminus of the spectrum
5. **Foreground** `#e6e6e8` — the coolest white of the three themes, almost clinical

**Gradient direction:** Deep navy `#2b3a8e` → magenta → coral. The full spectrum sweep from the branding reference. This is the signature visual of Void — wherever you see this gradient, you know you're in Void.

**Typography:**

- **Display and body:** Google Sans — clean, geometric, product-grade. Less personality than Boldonse or Aoboshi, but that's the point. Void is about the color and motion, not the letterforms.
- **Mono:** JetBrains Mono

**Glow characteristic:** Magenta is the primary glow source with blue undertones. Glows are wider and softer than Shadow — more atmospheric, less focused.

**Design note:** Void's near-void background means even subtle color has impact. Use the spectrum gradient as the hero and keep UI elements neutral. The gradient is the brand.

---

## Color Usage Rules

### Background Elevation Scale

Every theme uses four background tiers:

| Token                  | Role                                      |
| ---------------------- | ----------------------------------------- |
| `--cursed-bg`          | Page/canvas background — the void         |
| `--cursed-bg-elevated` | Cards, panels, content containers         |
| `--cursed-bg-surface`  | Interactive surfaces (inputs, dropdowns)  |
| `--cursed-bg-overlay`  | Modal/dialog backdrops — semi-transparent |

The steps between tiers are subtle (2-4% lightness). The goal is separation through layering, not through visible contrast. Elements should feel like they're floating at different depths in dark water.

### Foreground Hierarchy

| Token               | Role                                |
| ------------------- | ----------------------------------- |
| `--cursed-fg`       | Primary text — headings, body copy  |
| `--cursed-fg-muted` | Secondary text — captions, metadata |
| `--cursed-fg-faint` | Tertiary — disabled, placeholder    |

Never use pure white `#ffffff` for body text. It's reserved for `--primary-foreground` on buttons — the only place where maximum contrast is appropriate.

### Border Philosophy

Borders are tinted with the theme's accent color at very low opacity (6-10%). They should be nearly invisible in isolation but create readable separation when elements are stacked. On hover, opacity doubles — the border "wakes up."

### The Gradient as Brand Mark

Each theme's three-stop gradient (`--cursed-gradient-1/2/3`) is its visual fingerprint. These stops are used in:

- WebGL animated backgrounds (AnimatedGradient custom configs)
- Light ray color pairs
- Glow effects (box-shadow)
- Selection highlights

The gradient should always flow in the correct spectral order. Reversing it or scrambling the stops breaks the theme's identity.

## Animation Philosophy

### The Prime Directive: Meditative, Not Performative

Every animation in Cursed UI follows one rule — it should feel like it's already been moving before you noticed it, and will continue after you look away. No entrance fanfare. No "look at me" choreography.

### Timing Guidelines

| Animation Type | Duration | Easing      | Purpose                                   |
| -------------- | -------- | ----------- | ----------------------------------------- |
| Float          | 8s       | ease-in-out | Gentle Y-axis bob with micro-rotation     |
| Drift          | 20s      | ease-in-out | Background orb wandering                  |
| Pulse glow     | 6s       | ease-in-out | Opacity + blur breathing                  |
| Sigil spin     | 60s      | linear      | Decorative rotation — imperceptible speed |
| Breathe        | 4s       | ease-in-out | Scale + opacity for living elements       |
| Terminal blink | 1s       | step-end    | Cursor blink — the one sharp rhythm       |

Minimum animation duration for any motion in the system: **2 seconds**. Anything faster breaks the trance. The only exception is the terminal cursor blink (1s step), which is intentionally mechanical — a clock ticking in a quiet room.

### Text Animations

- **Blur reveal** — text fades in from a Gaussian blur, word by word. Speed: 2.5s total, 0.4s per segment. The text feels like it's coming into focus, not sliding in.
- **Shimmer** — a light pass sweeps across the text surface. 2.5s duration, 0.5s delay. Metallic, subtle, like light catching an engraving.
- **Slide up** — words rise from below their baseline. 0.06s stagger between words, 0.2s initial delay. Triggered on viewport entry, runs once.
- **Terminal** — static text with a blinking block cursor (`\2588`) appended via `::after`. The cursor blinks in the theme's primary color. The text itself doesn't animate — only the cursor is alive.

### WebGL Motion

- **AnimatedGradient** — continuous shader animation. Speed values in the 15-20 range for theme configs (gentle drift). Distortion kept low (6-12) for organic movement without visual noise. Swirl iterations between 6-10 create fluid motion without becoming a screensaver.
- **LightRays** — THREE.js volumetric rays with animation speed 3-8 (glacial). Higher speeds (10+) are available for dramatic moments but should not be the default.

### Transition Defaults

All interactive state changes (hover, focus, active) use `transition-all duration-300` — 300ms is the system's conversational pace. Fast enough to feel responsive, slow enough to feel deliberate.

## Typography Rules

### Tracking & Leading

Headings use negative tracking that loosens with size:

- H1: `-0.04em` — very tight, display-scale type needs compression
- H2: `-0.03em`
- H3: `-0.02em`
- H4: `-0.01em`

Body text uses default or relaxed leading. Mono uses slightly negative tracking (`-0.01em`) for a denser, more technical feel.

### Labels

All labels (form fields, metadata, navigation) use:

- `text-xs` (12px)
- `font-medium`
- `uppercase`
- `tracking-[0.08em]` — wide letter-spacing for legibility at small size
- `--cursed-fg-muted` color

This creates a consistent "system voice" for metadata that contrasts with the expressive display type.

### Display Type Is Sacred

Display fonts (Boldonse, Aoboshi One, Google Sans display weight) are for headings and hero moments only. Using them for body text, buttons, or labels dilutes their impact. The body font carries the workload; the display font makes the entrance.

## Component Styling Patterns

### Buttons

Primary buttons carry the theme's `--cursed-glow` as a box shadow — they literally emit light. Secondary buttons are surfaced containers with border treatment. Ghost buttons are invisible until hovered. All buttons use `FlowButton` from Spell UI, which provides a liquid border animation on interaction.

### Inputs

Form elements sit at the `--cursed-bg-surface` elevation. On focus, they acquire a 1px ring in `--cursed-ring` (the primary color at 40% opacity). The transition from unfocused to focused should feel like the input is waking up — not snapping to attention.

### Backgrounds

Three variants, escalating in visual intensity:

1. **Minimal** — dot matrix grid at 3% opacity. For content-heavy layouts where the background should disappear.
2. **Orbs** — CSS-only floating gradient spheres with heavy blur (40-60px). Drifting on 20s loops. For atmospheric sections.
3. **Gradient** — full WebGL AnimatedGradient. The maximum expression of the theme's color identity. For hero sections, landing pages, loading states.

### Scrollbar

Custom scrollbar: 6px thin, background matches `--cursed-bg`, thumb uses `--cursed-fg-faint`. On hover, thumb lightens to `--cursed-fg-muted`. The scrollbar should be nearly invisible until needed — it's infrastructure, not decoration.

### Selection

Text selection uses `--cursed-primary-muted` as background with `--cursed-fg` text. The selection color is a whisper of the primary — noticeable but not jarring.

## Spacing & Layout

No rigid spacing scale is enforced, but these conventions hold:

- Content sections use generous vertical padding (`p-12` / 48px minimum)
- Maximum content width: `max-w-2xl` for reading, full bleed for visual showcases
- The divider between sections is a 1px line in `--cursed-border` — barely visible, more felt than seen
- Backgrounds extend full bleed; content is centered within

## What Cursed UI Is Not

- **Not horror.** No blood, no skulls, no dripping text. The "cursed" is digital, not gothic.
- **Not cyberpunk.** No scan lines, no glitch effects, no neon-on-chrome. The palette is warm and organic, not cold and industrial.
- **Not maximalist.** Restraint is the point. Every element earns its place. If in doubt, remove it.
- **Not fast.** If an animation completes in under 2 seconds, it's probably wrong. The system breathes at the pace of ambient music — 60-80 BPM, not 120.
