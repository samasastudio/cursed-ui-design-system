import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import AnimatedGradient from "@/components/animated-gradient";

const meta: Meta = {
  title: "Cursed UI/Animated Gradient",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

function GradientStage({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100%", height: 420 }}
    >
      {children}
      <div className="absolute inset-0 z-10 flex items-end p-6">
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{
            color: "var(--cursed-fg-muted)",
            fontFamily: "var(--cursed-font-mono)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Built-in presets
   ----------------------------------------------------------------------- */

export const PresetPrism: StoryObj = {
  name: "Preset / Prism",
  render: () => (
    <GradientStage label="Prism">
      <AnimatedGradient config={{ preset: "Prism" }} />
    </GradientStage>
  ),
};

export const PresetLava: StoryObj = {
  name: "Preset / Lava",
  render: () => (
    <GradientStage label="Lava">
      <AnimatedGradient config={{ preset: "Lava" }} />
    </GradientStage>
  ),
};

export const PresetPlasma: StoryObj = {
  name: "Preset / Plasma",
  render: () => (
    <GradientStage label="Plasma">
      <AnimatedGradient config={{ preset: "Plasma" }} />
    </GradientStage>
  ),
};

export const PresetPulse: StoryObj = {
  name: "Preset / Pulse",
  render: () => (
    <GradientStage label="Pulse">
      <AnimatedGradient config={{ preset: "Pulse" }} />
    </GradientStage>
  ),
};

export const PresetVortex: StoryObj = {
  name: "Preset / Vortex",
  render: () => (
    <GradientStage label="Vortex">
      <AnimatedGradient config={{ preset: "Vortex" }} />
    </GradientStage>
  ),
};

export const PresetMist: StoryObj = {
  name: "Preset / Mist",
  render: () => (
    <GradientStage label="Mist">
      <AnimatedGradient config={{ preset: "Mist" }} />
    </GradientStage>
  ),
};

/* -----------------------------------------------------------------------
   Theme-matched custom gradients
   ----------------------------------------------------------------------- */

export const ShrineSunsetRitual: StoryObj = {
  name: "Shrine / Sunset Ritual",
  render: () => (
    <GradientStage label="Shrine — Sunset Ritual">
      <AnimatedGradient
        config={{
          preset: "custom",
          color1: "#26366b",
          color2: "#e84c2e",
          color3: "#ecdc87",
          speed: 15,
          distortion: 8,
          swirl: 40,
          swirlIterations: 6,
          softness: 85,
          scale: 0.6,
          rotation: -30,
          proportion: 45,
          shape: "Edge",
          shapeSize: 40,
        }}
        noise={{ opacity: 0.04 }}
      />
    </GradientStage>
  ),
};

export const ShadowNeonGrimoire: StoryObj = {
  name: "Shadow / Neon Grimoire",
  render: () => (
    <GradientStage label="Shadow — Neon Grimoire">
      <AnimatedGradient
        config={{
          preset: "custom",
          color1: "#ff4e00",
          color2: "#4415b4",
          color3: "#7b3fe4",
          speed: 20,
          distortion: 12,
          swirl: 65,
          swirlIterations: 10,
          softness: 100,
          scale: 0.5,
          rotation: 0,
          proportion: 50,
          shape: "Checks",
          shapeSize: 30,
        }}
        noise={{ opacity: 0.03 }}
      />
    </GradientStage>
  ),
};

export const VoidCosmicPulse: StoryObj = {
  name: "Void / Cosmic Pulse",
  render: () => (
    <GradientStage label="Void — Cosmic Pulse">
      <AnimatedGradient
        config={{
          preset: "custom",
          color1: "#2b3a8e",
          color2: "#c44aef",
          color3: "#f56e4a",
          speed: 18,
          distortion: 6,
          swirl: 55,
          swirlIterations: 8,
          softness: 90,
          scale: 0.45,
          rotation: 20,
          proportion: 40,
          shape: "Stripes",
          shapeSize: 50,
        }}
        noise={{ opacity: 0.05 }}
      />
    </GradientStage>
  ),
};

/* -----------------------------------------------------------------------
   With noise overlay
   ----------------------------------------------------------------------- */

export const WithHeavyNoise: StoryObj = {
  name: "With Heavy Noise",
  render: () => (
    <GradientStage label="Heavy noise overlay">
      <AnimatedGradient
        config={{ preset: "Plasma" }}
        noise={{ opacity: 0.25, scale: 1.5 }}
      />
    </GradientStage>
  ),
};

/* -----------------------------------------------------------------------
   All three themes side by side
   ----------------------------------------------------------------------- */

function ThemeTriptych() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
      <div className="relative overflow-hidden" style={{ height: 500 }}>
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#26366b",
            color2: "#e84c2e",
            color3: "#ecdc87",
            speed: 15,
            distortion: 8,
            swirl: 40,
            swirlIterations: 6,
            softness: 85,
            scale: 0.6,
            rotation: -30,
            proportion: 45,
            shape: "Edge",
            shapeSize: 40,
          }}
          noise={{ opacity: 0.04 }}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <span
            className="text-2xl tracking-wide"
            style={{ fontFamily: "'Boldonse', cursive", color: "#e1e1e1" }}
          >
            Shrine
          </span>
          <span
            className="text-xs mt-2 tracking-widest uppercase"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#8a8d96",
            }}
          >
            Sunset Ritual
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ height: 500 }}>
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#ff4e00",
            color2: "#4415b4",
            color3: "#7b3fe4",
            speed: 20,
            distortion: 12,
            swirl: 65,
            swirlIterations: 10,
            softness: 100,
            scale: 0.5,
            rotation: 0,
            proportion: 50,
            shape: "Checks",
            shapeSize: 30,
          }}
          noise={{ opacity: 0.03 }}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <span
            className="text-2xl"
            style={{ fontFamily: "'Aoboshi One', serif", color: "#e3e3e1" }}
          >
            Shadow
          </span>
          <span
            className="text-xs mt-2 tracking-widest uppercase"
            style={{
              fontFamily: "'Aoboshi One', serif",
              color: "#8a8a88",
            }}
          >
            Neon Grimoire
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ height: 500 }}>
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#2b3a8e",
            color2: "#c44aef",
            color3: "#f56e4a",
            speed: 18,
            distortion: 6,
            swirl: 55,
            swirlIterations: 8,
            softness: 90,
            scale: 0.45,
            rotation: 20,
            proportion: 40,
            shape: "Stripes",
            shapeSize: 50,
          }}
          noise={{ opacity: 0.05 }}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <span
            className="text-2xl tracking-wide"
            style={{
              fontFamily: "'Google Sans', sans-serif",
              color: "#e0e0e0",
            }}
          >
            Void
          </span>
          <span
            className="text-xs mt-2 tracking-widest uppercase"
            style={{
              fontFamily: "'Google Sans', sans-serif",
              color: "#7a7a82",
            }}
          >
            Cosmic Pulse
          </span>
        </div>
      </div>
    </div>
  );
}

export const ThemeTriptych_: StoryObj = {
  name: "Theme Triptych",
  render: () => <ThemeTriptych />,
};
