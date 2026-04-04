export const THEMES = {
  SHRINE: "shrine",
  SHADOW: "shadow",
  VOID: "void",
} as const;

export type ThemeId = (typeof THEMES)[keyof typeof THEMES];

export const THEME_METADATA = {
  [THEMES.SHRINE]: {
    id: THEMES.SHRINE,
    label: "Shrine",
    icon: "🌅",
    description: "Sunset ritual — warm oranges, deep navy, periwinkle mist",
    fonts: "Boldonse + Space Grotesk",
  },
  [THEMES.SHADOW]: {
    id: THEMES.SHADOW,
    label: "Shadow",
    icon: "🔮",
    description: "Neon grimoire — pure black, vivid orange, deep indigo",
    fonts: "Aoboshi One",
  },
  [THEMES.VOID]: {
    id: THEMES.VOID,
    label: "Void",
    icon: "🌊",
    description: "Cosmic pulse — dark teal, electric blue, coral fire",
    fonts: "Google Sans",
  },
} as const;

export const DEFAULT_THEME = THEMES.SHRINE;
