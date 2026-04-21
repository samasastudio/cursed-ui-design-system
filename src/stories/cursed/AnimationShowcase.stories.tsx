import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { CursedHeading } from "@/components/cursed/CursedHeading";
import { CursedText } from "@/components/cursed/CursedText";
import { CursedBackground } from "@/components/cursed/CursedBackground";
import { CursedButton } from "@/components/cursed/CursedButton";

const meta: Meta = {
  title: "Cursed UI/Animation Showcase",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

function GradientScene() {
  return (
    <CursedBackground
      variant="gradient"
      className="min-h-[500px] flex items-center justify-center p-12"
    >
      <div className="text-center space-y-6 max-w-2xl">
        <CursedHeading level="h1" animation="blur-reveal">
          Motion System
        </CursedHeading>
        <CursedText variant="body" animation="slide-up">
          Animated gradient background powered by WebGL shaders, tuned for a
          slower, meditative cadence across every theme.
        </CursedText>
        <div className="pt-4">
          <CursedButton variant="primary">Review Motion</CursedButton>
        </div>
      </div>
    </CursedBackground>
  );
}

function OrbScene() {
  return (
    <CursedBackground
      variant="orbs"
      className="min-h-[500px] flex items-center justify-center p-12"
    >
      <div className="text-center space-y-6 max-w-2xl">
        <CursedHeading level="h2" animation="shimmer">
          Orb Field
        </CursedHeading>
        <CursedText variant="body">
          CSS-only color fields drift across the scene with restrained blur and
          long timing curves.
        </CursedText>
        <CursedText variant="mono" animation="terminal">
          pacing profile: meditative with reduced-motion fallback
        </CursedText>
      </div>
    </CursedBackground>
  );
}

function MinimalScene() {
  return (
    <CursedBackground
      variant="minimal"
      className="min-h-[400px] flex items-center justify-center p-12"
    >
      <div className="text-center space-y-6 max-w-2xl">
        <CursedHeading level="h2" animation="blur-reveal">
          Minimal Grid
        </CursedHeading>
        <CursedText variant="caption">
          A subtle dot matrix pattern for low-noise moments and legible
          contrast.
        </CursedText>
      </div>
    </CursedBackground>
  );
}

function FullShowcaseView() {
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

export const FullShowcase: StoryObj = {
  name: "Full Showcase",
  render: () => <FullShowcaseView />,
};
