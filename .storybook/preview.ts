import type { Preview } from '@storybook/react-vite';
import { addons } from 'storybook/preview-api';
import '../src/index.css';

const DEFAULT_THEME = 'yerkir';

function applyTheme(theme: string) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  document.body.style.backgroundColor = 'var(--cursed-bg)';
  document.body.style.color = 'var(--cursed-fg)';
  document.body.style.fontFamily = 'var(--cursed-font-body)';
}

// Listen for theme changes from toolbar
const channel = addons.getChannel();
channel.on('cursed-ui/theme-change', (theme: string) => {
  applyTheme(theme);
});

// Apply default theme on load
if (typeof document !== 'undefined') {
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
      test: 'todo',
    },
    backgrounds: { disable: true },
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      // Ensure theme is applied when stories render
      if (typeof document !== 'undefined') {
        const current = document.documentElement.getAttribute('data-theme');
        if (!current) {
          applyTheme(DEFAULT_THEME);
        }
      }
      return Story();
    },
  ],
};

export default preview;
