import type { Preview } from "@storybook/react-vite";
import { addons } from "storybook/preview-api";
import "../src/index.css";

import { DEFAULT_MODE, DEFAULT_THEME } from "../src/lib/themes";

function applyTheme(theme: string) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  if (!root.getAttribute("data-mode")) {
    root.setAttribute("data-mode", DEFAULT_MODE);
  }
  document.body.style.backgroundColor = "var(--cursed-bg)";
  document.body.style.color = "var(--cursed-fg)";
  document.body.style.fontFamily = "var(--cursed-font-body)";
}

function applyMode(mode: string) {
  const root = document.documentElement;
  root.setAttribute("data-mode", mode);
  document.body.style.backgroundColor = "var(--cursed-bg)";
  document.body.style.color = "var(--cursed-fg)";
}

// Listen for theme changes from toolbar
const channel = addons.getChannel();
channel.on("cursed-ui/theme-change", (theme: string) => {
  applyTheme(theme);
});
channel.on("cursed-ui/mode-change", (mode: string) => {
  applyMode(mode);
});

// Apply default theme on load
if (typeof document !== "undefined") {
  applyMode(DEFAULT_MODE);
  applyTheme(DEFAULT_THEME);
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    backgrounds: { disable: true },
    layout: "centered",
  },
  decorators: [
    (Story) => {
      // Ensure theme is applied when stories render
      if (typeof document !== "undefined") {
        const current = document.documentElement.getAttribute("data-theme");
        const mode = document.documentElement.getAttribute("data-mode");
        if (!mode) {
          applyMode(DEFAULT_MODE);
        }
        if (!current) {
          applyTheme(DEFAULT_THEME);
        }
      }
      return Story();
    },
  ],
};

export default preview;
