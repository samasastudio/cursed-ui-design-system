export const THEMES = {
  SHRINE: "shrine",
  SHADOW: "shadow",
  VOID: "void",
} as const;

export type ThemeId = (typeof THEMES)[keyof typeof THEMES];

export const MODES = {
  DARK: "dark",
  LIGHT: "light",
} as const;

export type ModeId = (typeof MODES)[keyof typeof MODES];

export const THEME_METADATA = {
  [THEMES.SHRINE]: {
    id: THEMES.SHRINE,
    label: "Shrine",
    icon: "🌅",
    description: "Amber dusk — warm mineral tones and twilight blue",
    fonts: "Boldonse + Space Grotesk",
  },
  [THEMES.SHADOW]: {
    id: THEMES.SHADOW,
    label: "Shadow",
    icon: "🔮",
    description: "Velvet noir — obsidian contrast and saturated violet",
    fonts: "Aoboshi One + Manrope",
  },
  [THEMES.VOID]: {
    id: THEMES.VOID,
    label: "Void",
    icon: "🌊",
    description: "Astral drift — spectral blue, magenta haze, ember coral",
    fonts: "Google Sans",
  },
} as const;

export const DEFAULT_THEME = THEMES.SHRINE;
export const DEFAULT_MODE = MODES.DARK;
