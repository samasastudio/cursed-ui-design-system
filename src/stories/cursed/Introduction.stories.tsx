import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CursedHeading } from '@/components/cursed/CursedHeading';
import { CursedText } from '@/components/cursed/CursedText';
import { CursedBackground } from '@/components/cursed/CursedBackground';

const meta: Meta = {
  title: 'Cursed UI/Introduction',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

function IntroPage() {
  return (
    <CursedBackground variant="orbs" className="min-h-screen p-12 md:p-20">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Hero */}
        <div className="space-y-4">
          <CursedText variant="label">Design System</CursedText>
          <CursedHeading level="h1" animation="blur-reveal">
            Cursed UI
          </CursedHeading>
          <CursedText variant="body" animation="slide-up">
            A digital-occult design system built on Spell UI primitives.
            Meditative. Cosmic. Slightly wrong.
          </CursedText>
        </div>

        {/* Themes */}
        <div className="space-y-6">
          <CursedHeading level="h3">Three Themes</CursedHeading>
          <CursedText variant="caption">
            Use the theme switcher in the toolbar above to cycle between palettes.
          </CursedText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'Yerkir',
                desc: 'Sunset ritual — warm oranges, deep navy, periwinkle mist',
                fonts: 'Audiowide + Space Grotesk',
                icon: '\u{1F305}',
              },
              {
                name: 'Nohemi',
                desc: 'Neon grimoire — pure black, vivid orange, deep indigo',
                fonts: 'Sora',
                icon: '\u{1F52E}',
              },
              {
                name: 'Soun',
                desc: 'Cosmic pulse — dark teal, electric blue, coral fire',
                fonts: 'DM Sans',
                icon: '\u{1F30A}',
              },
            ].map((theme) => (
              <div
                key={theme.name}
                className="p-5 rounded-xl border border-[var(--cursed-border)] bg-[var(--cursed-bg-elevated)] space-y-2"
              >
                <div className="text-2xl">{theme.icon}</div>
                <h4 className="font-display text-lg text-[var(--cursed-fg)] font-bold">
                  {theme.name}
                </h4>
                <p className="font-body text-sm text-[var(--cursed-fg-muted)]">
                  {theme.desc}
                </p>
                <p className="font-mono text-xs text-[var(--cursed-fg-faint)]">
                  {theme.fonts}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Components list */}
        <div className="space-y-4">
          <CursedHeading level="h3">Components</CursedHeading>
          <div className="space-y-2">
            {[
              'Typography — Heading (H1\u2013H4) and Text with animated entrances',
              'Buttons — Primary, Secondary, Ghost, Destructive via FlowButton',
              'Form Inputs — Input, Textarea, Select, Animated Checkbox',
              'Backgrounds — Animated gradients, floating orbs, dot matrix',
              'Animations — BlurReveal, ShimmerText, SlideUpText',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-xs text-[var(--cursed-primary)] mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <CursedText variant="body">{item}</CursedText>
              </div>
            ))}
          </div>
        </div>

        {/* Aesthetic note */}
        <div className="border-l-2 border-[var(--cursed-primary)] pl-6 space-y-2">
          <CursedText variant="mono" animation="terminal">
            aesthetic: digital occult
          </CursedText>
          <CursedText variant="caption">
            Dandadan-inspired cosmic weirdness. Meditative, slow-floating,
            beautiful and slightly wrong.
          </CursedText>
        </div>
      </div>
    </CursedBackground>
  );
}

export const Overview: StoryObj = {
  render: () => <IntroPage />,
};
