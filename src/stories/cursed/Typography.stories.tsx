import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CursedHeading } from '@/components/cursed/CursedHeading';
import { CursedText } from '@/components/cursed/CursedText';

const meta: Meta = {
  title: 'Cursed UI/Typography',
  parameters: {
    layout: 'padded',
  },
};
export default meta;

function TypographySpecimen() {
  return (
    <div className="p-8 space-y-12 bg-[var(--cursed-bg)] min-h-screen max-w-3xl">
      <div className="space-y-6">
        <CursedText variant="label">Display Font — Headings</CursedText>
        <CursedHeading level="h1">The Ritual Begins</CursedHeading>
        <CursedHeading level="h2">Digital Occult Systems</CursedHeading>
        <CursedHeading level="h3">Cosmic Transmissions</CursedHeading>
        <CursedHeading level="h4">Signal From the Void</CursedHeading>
      </div>

      <div className="w-full h-px bg-[var(--cursed-border)]" />

      <div className="space-y-6">
        <CursedText variant="label">Body Font — Text Variants</CursedText>
        <CursedText variant="body">
          Body text. The cursed interface hums with meditative energy, each pixel a tiny sigil
          inscribed by machines that dream in gradient. The terminal whispers — not warnings,
          but invocations. Something is channeling through the design system.
        </CursedText>
        <CursedText variant="caption">
          Caption text — smaller, muted, used for supplementary information and metadata.
        </CursedText>
        <CursedText variant="label">LABEL TEXT — UPPERCASE TRACKING</CursedText>
        <CursedText variant="mono">
          const ritual = await summon(&#123; theme: &apos;cursed&apos;, energy: &apos;meditative&apos; &#125;);
        </CursedText>
      </div>

      <div className="w-full h-px bg-[var(--cursed-border)]" />

      <div className="space-y-6">
        <CursedText variant="label">Animated Typography</CursedText>
        <CursedHeading level="h2" animation="blur-reveal">
          Blur Reveal Entrance
        </CursedHeading>
        <CursedHeading level="h3" animation="shimmer">
          Shimmer Sigil Effect
        </CursedHeading>
        <CursedText variant="body" animation="slide-up">
          Slide-up text rises from the digital void like a summoned entity.
        </CursedText>
        <CursedText variant="mono" animation="terminal">
          channeling signal from /dev/cursed
        </CursedText>
      </div>
    </div>
  );
}

export const Specimen: StoryObj = {
  render: () => <TypographySpecimen />,
};
