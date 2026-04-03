import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CursedHeading } from '@/components/cursed/CursedHeading';
import { CursedText } from '@/components/cursed/CursedText';
import { CursedBackground } from '@/components/cursed/CursedBackground';
import { CursedButton } from '@/components/cursed/CursedButton';

const meta: Meta = {
  title: 'Cursed UI/Animation Showcase',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

function GradientScene() {
  return (
    <CursedBackground variant="gradient" className="min-h-[500px] flex items-center justify-center p-12">
      <div className="text-center space-y-6 max-w-2xl">
        <CursedHeading level="h1" animation="blur-reveal">
          The Ritual Begins
        </CursedHeading>
        <CursedText variant="body" animation="slide-up">
          Animated gradient background powered by WebGL shaders,
          themed to match each palette's gradient stops.
        </CursedText>
        <div className="pt-4">
          <CursedButton variant="primary">Enter the Void</CursedButton>
        </div>
      </div>
    </CursedBackground>
  );
}

function OrbScene() {
  return (
    <CursedBackground variant="orbs" className="min-h-[500px] flex items-center justify-center p-12">
      <div className="text-center space-y-6 max-w-2xl">
        <CursedHeading level="h2" animation="shimmer">
          Floating Orbs
        </CursedHeading>
        <CursedText variant="body">
          CSS-only floating orbs that drift meditatively across the background.
          Each orb uses the theme's gradient colors with heavy blur.
        </CursedText>
        <CursedText variant="mono" animation="terminal">
          signal acquired from /dev/spectral
        </CursedText>
      </div>
    </CursedBackground>
  );
}

function MinimalScene() {
  return (
    <CursedBackground variant="minimal" className="min-h-[400px] flex items-center justify-center p-12">
      <div className="text-center space-y-6 max-w-2xl">
        <CursedHeading level="h2" animation="blur-reveal">
          Minimal Grid
        </CursedHeading>
        <CursedText variant="caption">
          A subtle dot matrix pattern for quieter moments. The grid breathes with the theme.
        </CursedText>
      </div>
    </CursedBackground>
  );
}

function FullShowcase() {
  return (
    <div className="bg-[var(--cursed-bg)]">
      <GradientScene />
      <div className="h-px bg-[var(--cursed-border)]" />
      <OrbScene />
      <div className="h-px bg-[var(--cursed-border)]" />
      <MinimalScene />
    </div>
  );
}

export const AnimatedGradientBackground: StoryObj = {
  render: () => <GradientScene />,
};

export const FloatingOrbs: StoryObj = {
  render: () => <OrbScene />,
};

export const MinimalGrid: StoryObj = {
  render: () => <MinimalScene />,
};

export const FullShowcase_: StoryObj = {
  name: 'Full Showcase',
  render: () => <FullShowcase />,
};
