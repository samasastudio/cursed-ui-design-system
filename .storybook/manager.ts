import { addons, types } from "storybook/manager-api";
import React from "react";

import { THEMES, THEME_METADATA } from "../src/lib/themes";

const ADDON_ID = "cursed-ui-theme-switcher";
const TOOL_ID = `${ADDON_ID}/tool`;

const themes = Object.values(THEME_METADATA);

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = React.useState<string>(THEMES.SHRINE);

  const cycleTheme = React.useCallback(() => {
    const currentIndex = themes.findIndex((t) => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const next = themes[nextIndex];
    setCurrentTheme(next.id);

    const channel = addons.getChannel();
    channel.emit("cursed-ui/theme-change", next.id);
  }, [currentTheme]);

  const theme = themes.find((t) => t.id === currentTheme)!;

  return React.createElement(
    "button",
    {
      onClick: cycleTheme,
      title: `Current: ${theme.label} — Click to cycle`,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "inherit",
        fontSize: "13px",
        fontWeight: 600,
        padding: "4px 8px",
        borderRadius: "4px",
        letterSpacing: "0.02em",
        textTransform: "uppercase" as const,
      },
    },
    theme.icon,
    ` ${theme.label}`
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Cursed UI Theme",
    render: () => React.createElement(ThemeSwitcher),
  });
});
