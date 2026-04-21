import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { CursedHeading } from "@/components/cursed/CursedHeading";
import { CursedText } from "@/components/cursed/CursedText";

const meta: Meta = {
  title: "Cursed UI/Typography",
  parameters: {
    layout: "padded",
  },
};
export default meta;

function TypographySpecimen() {
  return (
    <div className="p-8 space-y-12 bg-[var(--cursed-bg)] min-h-screen max-w-3xl">
      <div className="space-y-6">
        <CursedText variant="label">Display Font — Headings</CursedText>
        <CursedHeading level="h1">Theme Foundations</CursedHeading>
        <CursedHeading level="h2">Atmosphere with Restraint</CursedHeading>
        <CursedHeading level="h3">Hierarchy in Practice</CursedHeading>
        <CursedHeading level="h4">Readable by Design</CursedHeading>
      </div>

      <div className="w-full h-px bg-[var(--cursed-border)]" />

      <div className="space-y-6">
        <CursedText variant="label">Body Font — Text Variants</CursedText>
        <CursedText variant="body" className="max-w-[68ch]">
          Body text should stay calm and direct. The voice can carry mystery,
          but each line should still explain behavior, state, or intent without
          adding decorative noise.
        </CursedText>
        <CursedText variant="caption">
          Caption text is small and restrained, used for secondary details and
          contextual metadata.
        </CursedText>
        <CursedText variant="label">LABEL TEXT - UPPERCASE TRACKING</CursedText>
        <CursedText variant="mono">
          const profile = configureTheme(&#123; theme: &apos;shadow&apos;, mode:
          &apos;light&apos; &#125;);
        </CursedText>
      </div>

      <div className="w-full h-px bg-[var(--cursed-border)]" />

      <div className="space-y-6">
        <CursedText variant="label">Animated Typography</CursedText>
        <CursedHeading level="h2" animation="blur-reveal">
          Blur Reveal Entrance
        </CursedHeading>
        <CursedHeading level="h3" animation="shimmer">
          Luminous Accent (Subtle)
        </CursedHeading>
        <CursedText variant="body" animation="slide-up">
          Slide-up text should feel like a measured entrance, not spectacle.
        </CursedText>
        <CursedText variant="mono" animation="terminal">
          rendering narrative tone from /design/context
        </CursedText>
      </div>
    </div>
  );
}

export const Specimen: StoryObj = {
  render: () => <TypographySpecimen />,
};
