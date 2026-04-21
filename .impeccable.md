## Design Context

### Users

Primary user is the creator/maintainer of this system, using Storybook as a single source of truth to keep visual and interaction consistency across a personal site, applications, and other interfaces. The system must support fast iteration while remaining reusable and reliable as the component library scales.

### Brand Personality

Liminal. Phantasmic. Whimsical.

The interface should evoke cheeky mystery and wonder, with a mature sense of restraint instead of novelty-first theatrics. Inspiration comes from shonen/anime atmospheres (e.g. Jujutsu Kaisen, Dan Da Dan, The Summer Hikaru Died): eerie beauty, energetic contrasts, and emotionally charged stillness.

### Aesthetic Direction

Evolve the "digital occult" identity into a more elegant, production-ready language. Keep the core atmosphere but remove corny copy and over-explicit thematic labeling.

References:

- general-purpose.io for elegance and compositional confidence
- axeltmpl.framer.website/projects for calm and pacing
- zzzzshawn.cloud for interesting layout rhythm and personality
- impeccable.style/anti-patterns as anti-reference constraints to avoid templated AI aesthetics

Theme strategy:

- Design with parity between beautiful light and dark modes (not dark-first fallback and not light-only polish)
- Ensure equivalent hierarchy, tone, and legibility in both themes

Accessibility:

- Baseline compliance target is WCAG 2.2 AA.
- Animations should feel beautiful and meditative, with reduced-motion alternatives for non-essential effects.
- Critical states and meaning cannot rely on color alone.

### Design Principles

1. Atmosphere with restraint: preserve mystery and wonder while keeping copy, motion, and decoration intentional.
2. Mature craft over novelty: every style choice must survive production use across multiple interfaces.
3. Dual-theme excellence: light and dark are first-class experiences with equal design quality.
4. Personality through structure: create memorability via typography, spacing rhythm, and composition before effects.
5. System reliability: components, tokens, and stories must scale coherently as the library grows.
