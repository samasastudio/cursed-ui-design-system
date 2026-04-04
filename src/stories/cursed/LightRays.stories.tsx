import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Rays from "@/components/light-rays";

const meta: Meta = {
  title: "Cursed UI/Light Rays",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

function RaysStage({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100%", height: 480 }}
    >
      {children}
      <div className="absolute inset-0 z-10 flex items-end p-6">
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{
            color: "rgba(255,255,255,0.4)",
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
   Default
   ----------------------------------------------------------------------- */

export const Default: StoryObj = {
  render: () => (
    <RaysStage label="Default">
      <Rays />
    </RaysStage>
  ),
};

/* -----------------------------------------------------------------------
   Theme-matched rays
   ----------------------------------------------------------------------- */

export const ShrineSunsetRays: StoryObj = {
  name: "Shrine / Sunset Rays",
  render: () => (
    <RaysStage label="Shrine — Sunset Rays">
      <Rays
        backgroundColor="#0b0d11"
        raysColor={{ mode: "multi", color1: "#e84c2e", color2: "#ecdc87" }}
        intensity={18}
        rays={40}
        reach={20}
        position={50}
        animation={{ animate: true, speed: 6 }}
      />
    </RaysStage>
  ),
};

export const ShadowNeonRays: StoryObj = {
  name: "Shadow / Neon Rays",
  render: () => (
    <RaysStage label="Shadow — Neon Rays">
      <Rays
        backgroundColor="#050505"
        raysColor={{ mode: "multi", color1: "#ff4e00", color2: "#7b3fe4" }}
        intensity={22}
        rays={50}
        reach={18}
        position={45}
        animation={{ animate: true, speed: 8 }}
      />
    </RaysStage>
  ),
};

export const VoidCosmicRays: StoryObj = {
  name: "Void / Cosmic Rays",
  render: () => (
    <RaysStage label="Void — Cosmic Rays">
      <Rays
        backgroundColor="#030304"
        raysColor={{ mode: "multi", color1: "#4d6cfa", color2: "#c44aef" }}
        intensity={16}
        rays={36}
        reach={22}
        position={55}
        animation={{ animate: true, speed: 5 }}
      />
    </RaysStage>
  ),
};

/* -----------------------------------------------------------------------
   Color modes
   ----------------------------------------------------------------------- */

export const SingleColor: StoryObj = {
  name: "Single Color",
  render: () => (
    <RaysStage label="Single color mode">
      <Rays
        backgroundColor="#050505"
        raysColor={{ mode: "single", color: "#ff4e00" }}
        intensity={20}
        rays={44}
        reach={16}
        animation={{ animate: true, speed: 10 }}
      />
    </RaysStage>
  ),
};

export const RandomColor: StoryObj = {
  name: "Random Color",
  render: () => (
    <RaysStage label="Random color mode">
      <Rays
        backgroundColor="#080808"
        raysColor={{ mode: "random" }}
        intensity={15}
        rays={38}
        reach={20}
        animation={{ animate: true, speed: 8 }}
      />
    </RaysStage>
  ),
};

/* -----------------------------------------------------------------------
   Intensity & reach variations
   ----------------------------------------------------------------------- */

export const HighIntensity: StoryObj = {
  name: "High Intensity",
  render: () => (
    <RaysStage label="High intensity (80)">
      <Rays
        backgroundColor="#0b0d11"
        raysColor={{ mode: "multi", color1: "#e84c2e", color2: "#26366b" }}
        intensity={80}
        rays={60}
        reach={30}
        animation={{ animate: true, speed: 12 }}
      />
    </RaysStage>
  ),
};

export const SubtleGlow: StoryObj = {
  name: "Subtle Glow",
  render: () => (
    <RaysStage label="Subtle glow">
      <Rays
        backgroundColor="#030304"
        raysColor={{ mode: "single", color: "#4d6cfa" }}
        intensity={5}
        rays={20}
        reach={10}
        animation={{ animate: true, speed: 3 }}
      />
    </RaysStage>
  ),
};

/* -----------------------------------------------------------------------
   Static (no animation)
   ----------------------------------------------------------------------- */

export const Static: StoryObj = {
  name: "Static / No Animation",
  render: () => (
    <RaysStage label="Static rays (animation off)">
      <Rays
        backgroundColor="#050505"
        raysColor={{ mode: "multi", color1: "#c44aef", color2: "#f56e4a" }}
        intensity={18}
        rays={44}
        reach={20}
        animation={{ animate: false, speed: 0 }}
      />
    </RaysStage>
  ),
};

/* -----------------------------------------------------------------------
   Position variants
   ----------------------------------------------------------------------- */

export const LeftOrigin: StoryObj = {
  name: "Left Origin",
  render: () => (
    <RaysStage label="Position: 15 (left)">
      <Rays
        backgroundColor="#0b0d11"
        raysColor={{ mode: "multi", color1: "#26366b", color2: "#a1c1e3" }}
        intensity={16}
        rays={36}
        reach={18}
        position={15}
        animation={{ animate: true, speed: 6 }}
      />
    </RaysStage>
  ),
};

export const RightOrigin: StoryObj = {
  name: "Right Origin",
  render: () => (
    <RaysStage label="Position: 85 (right)">
      <Rays
        backgroundColor="#050505"
        raysColor={{ mode: "multi", color1: "#7b3fe4", color2: "#ff4e00" }}
        intensity={16}
        rays={36}
        reach={18}
        position={85}
        animation={{ animate: true, speed: 6 }}
      />
    </RaysStage>
  ),
};
