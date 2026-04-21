# Ubiquitous Language

## System Core

| Term                     | Definition                                                                                 | Aliases to avoid              |
| ------------------------ | ------------------------------------------------------------------------------------------ | ----------------------------- |
| **Cursed Design System** | The reusable visual and interaction system maintained in this repository.                  | Cursed UI app, theme project  |
| **Storybook Workbench**  | The local environment used to author, review, and validate the system.                     | Demo site, playground app     |
| **Component Primitive**  | A base interaction building block wrapped by system styling and behavior.                  | Widget, element               |
| **Design Token**         | A named visual variable (color, type, spacing, motion) consumed by components and stories. | CSS constant, hardcoded style |

## Theme and Mode Model

| Term              | Definition                                                                                          | Aliases to avoid             |
| ----------------- | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| **Theme**         | A brand identity family (`Shrine`, `Shadow`, `Void`) that defines palette and typography character. | Mode, skin                   |
| **Mode**          | The luminance variant (`light` or `dark`) applied within a selected theme.                          | Theme, variant               |
| **Theme Parity**  | The requirement that each theme has equally intentional light and dark presentations.               | Light support, dark fallback |
| **Token Mapping** | The bridge from `--cursed-*` tokens to shadcn-compatible token names.                               | Theme glue, CSS shim         |

## Motion and Accessibility

| Term                        | Definition                                                                                            | Aliases to avoid          |
| --------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------- |
| **Meditative Motion**       | Purposeful, low-anxiety animation cadence that supports mood without distracting from content.        | Flashy animation, effects |
| **Reduced-Motion Fallback** | The alternate rendering path that minimizes non-essential animation when user preference requests it. | Animation off mode        |
| **WCAG 2.2 AA Baseline**    | The minimum accessibility compliance target for contrast, interaction semantics, and perceivability.  | Basic accessibility       |
| **Semantic Control**        | An interactive element implemented with native or equivalent accessible semantics.                    | Clickable div             |

## Voice and Tone

| Term                    | Definition                                                                                 | Aliases to avoid |
| ----------------------- | ------------------------------------------------------------------------------------------ | ---------------- |
| **Mature Liminal Tone** | The writing style goal: mysterious and expressive, but restrained and production-credible. | Corny lore voice |
| **Narrative Reference** | A literary influence used to calibrate tone without replacing interface clarity.           | Flavor text dump |
| **System Copy**         | UI labels and story text that explain behavior, not just vibe.                             | Theme lore       |

## Relationships

- A **Cursed Design System** is authored in the **Storybook Workbench**.
- A **Theme** always runs in exactly one **Mode** at a time.
- **Theme Parity** means each **Theme** must support both `light` and `dark` **Mode** variants.
- **Design Tokens** power both component styling and **Token Mapping** to downstream primitives.
- **Meditative Motion** must always include a **Reduced-Motion Fallback**.
- **System Copy** should express **Mature Liminal Tone** while preserving usability.

## Example dialogue

> **Dev:** "When I switch to `Shadow`, am I changing the **Mode** or the **Theme**?"
>
> **Domain expert:** "That's a **Theme** change. **Mode** only toggles `light` and `dark` inside the current theme."
>
> **Dev:** "If I tune a shimmer animation, do I need to do anything for accessibility?"
>
> **Domain expert:** "Yes. Keep **Meditative Motion** for default users and provide a **Reduced-Motion Fallback** to satisfy our **WCAG 2.2 AA Baseline**."
>
> **Dev:** "Can story text lean hard into lore references?"
>
> **Domain expert:** "Use **Narrative References** sparingly. Prioritize **System Copy** in a **Mature Liminal Tone** so maintainers understand behavior first."

## Flagged ambiguities

- "theme" was used interchangeably for both brand identity and light/dark state; canonically, use **Theme** (`Shrine`/`Shadow`/`Void`) and **Mode** (`light`/`dark`) as separate concepts.
- "Cursed UI" and "Cursed Design System" were both used for the same domain object; use **Cursed Design System** as the canonical product term and reserve "UI" for component-level discussion.
- "copy tone" and "aesthetic tone" were sometimes blended; use **System Copy** for text decisions and **Theme**/**Mode** for visual decisions.
