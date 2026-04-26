import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { CursedScene } from "@/components/cursed/CursedScene";
import { CursedHeading } from "@/components/cursed/CursedHeading";
import { CursedText } from "@/components/cursed/CursedText";

/**
 * Demo clip + poster used across these stories.
 *
 * These point at MDN's CC0 interactive-examples CDN for out-of-the-box
 * Storybook runs. For a "real" demo of scenic anime-style loops, drop local
 * assets into `public/scenes/` (see `public/scenes/README.md`) and swap the
 * URLs below for e.g. `/scenes/sakura.mp4`.
 */
const DEMO_SRC =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const DEMO_POSTER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg";

const meta: Meta<typeof CursedScene> = {
  title: "Cursed UI/Scene",
  component: CursedScene,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Small, looped, ambient video tile for short scenic clips. " +
          "Source-agnostic: pass any URL the browser can play. The component " +
          "has no opinion about hosting — it works the same with local " +
          "`/scenes/*.mp4` assets and HTTPS CDN URLs.\n\n" +
          "For end-to-end guidance on hosting, multi-codec delivery, CDN " +
          "headers, signed URLs, and troubleshooting, see the dedicated " +
          "**Video Sources** docs page in this section.",
      },
    },
  },
  args: {
    src: DEMO_SRC,
    poster: DEMO_POSTER,
  },
};
export default meta;

type Story = StoryObj<typeof CursedScene>;

/* -----------------------------------------------------------------------
   Default
   ----------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto max-w-xl">
      <CursedScene {...args} />
    </div>
  ),
};

/* -----------------------------------------------------------------------
   Variants
   ----------------------------------------------------------------------- */

function VariantTile({
  variant,
  caption,
}: {
  variant: "bleed" | "framed" | "inset";
  caption: string;
}) {
  return (
    <div className="space-y-3">
      <CursedScene
        src={DEMO_SRC}
        poster={DEMO_POSTER}
        variant={variant}
        tint="subtle"
      />
      <div className="flex items-baseline justify-between">
        <CursedText variant="label">{variant}</CursedText>
        <CursedText variant="caption">{caption}</CursedText>
      </div>
    </div>
  );
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-3">
      <VariantTile variant="bleed" caption="edge-to-edge, no chrome" />
      <VariantTile variant="framed" caption="themed border + glow" />
      <VariantTile variant="inset" caption="elevated box, vignette" />
    </div>
  ),
};

/* -----------------------------------------------------------------------
   Tints
   ----------------------------------------------------------------------- */

function TintTile({
  tint,
  caption,
}: {
  tint: "none" | "subtle" | "theme";
  caption: string;
}) {
  return (
    <div className="space-y-3">
      <CursedScene
        src={DEMO_SRC}
        poster={DEMO_POSTER}
        variant="framed"
        tint={tint}
      />
      <div className="flex items-baseline justify-between">
        <CursedText variant="label">{tint}</CursedText>
        <CursedText variant="caption">{caption}</CursedText>
      </div>
    </div>
  );
}

export const Tints: Story = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-3">
      <TintTile tint="none" caption="raw video, no overlay" />
      <TintTile tint="subtle" caption="theme gradient @ 8%" />
      <TintTile tint="theme" caption="theme gradient @ 22%" />
    </div>
  ),
};

/* -----------------------------------------------------------------------
   Play modes
   ----------------------------------------------------------------------- */

function PlayModeTile({
  playOn,
  caption,
}: {
  playOn: "visible" | "hover" | "always";
  caption: string;
}) {
  return (
    <div className="space-y-3">
      <CursedScene
        src={DEMO_SRC}
        poster={DEMO_POSTER}
        variant="framed"
        playOn={playOn}
      />
      <div className="flex items-baseline justify-between">
        <CursedText variant="label">playOn={playOn}</CursedText>
        <CursedText variant="caption">{caption}</CursedText>
      </div>
    </div>
  );
}

export const PlayModes: Story = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-3">
      <PlayModeTile
        playOn="visible"
        caption="auto plays when scrolled into view (default)"
      />
      <PlayModeTile
        playOn="hover"
        caption="paused until pointer enters the frame"
      />
      <PlayModeTile playOn="always" caption="plays on mount; most bandwidth" />
    </div>
  ),
};

/* -----------------------------------------------------------------------
   Aspect ratios
   ----------------------------------------------------------------------- */

function RatioTile({ ratio }: { ratio: "16/9" | "4/3" | "1/1" | "9/16" }) {
  return (
    <div className="space-y-3">
      <CursedScene
        src={DEMO_SRC}
        poster={DEMO_POSTER}
        aspectRatio={ratio}
        variant="framed"
      />
      <CursedText variant="label">{ratio}</CursedText>
    </div>
  );
}

export const AspectRatios: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      <RatioTile ratio="16/9" />
      <RatioTile ratio="4/3" />
      <RatioTile ratio="1/1" />
      <RatioTile ratio="9/16" />
    </div>
  ),
};

/* -----------------------------------------------------------------------
   Gallery — demonstrates IntersectionObserver play/pause on scroll.
   ----------------------------------------------------------------------- */

export const Gallery: Story = {
  name: "Gallery (scroll to see IO gating)",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="bg-[var(--cursed-bg)] px-8 py-16">
      <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
        <CursedHeading level="h2">Scenic Gallery</CursedHeading>
        <CursedText variant="body">
          Six scenes, each gated by its own IntersectionObserver. Scroll quickly
          — you'll see frames pause as they leave the viewport and resume as
          they return. Click any pause button to lock a scene in place; it will
          not auto-resume on re-entry.
        </CursedText>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CursedScene
            key={i}
            src={DEMO_SRC}
            poster={DEMO_POSTER}
            variant={i % 3 === 0 ? "inset" : "framed"}
            tint={i % 2 === 0 ? "subtle" : "theme"}
          />
        ))}
      </div>
      {/* Tall spacer so the user can scroll past the gallery and back. */}
      <div className="h-[120vh]" aria-hidden />
    </div>
  ),
};

/* -----------------------------------------------------------------------
   Reduced motion note
   ----------------------------------------------------------------------- */

export const ReducedMotionNote: Story = {
  name: "Reduced motion (behavior note)",
  render: () => (
    <div className="mx-auto max-w-xl space-y-6">
      <CursedHeading level="h3">prefers-reduced-motion</CursedHeading>
      <CursedText variant="body">
        When the user's OS reports{" "}
        <code className="font-mono text-[var(--cursed-accent)]">
          prefers-reduced-motion: reduce
        </code>
        , <code className="font-mono">CursedScene</code> never calls{" "}
        <code className="font-mono">.play()</code>. The <em>poster</em> image is
        all that ever renders. There is no escape hatch — scenic loops are
        decorative motion and should always respect this preference.
      </CursedText>
      <CursedText variant="caption">
        Toggle the Storybook a11y addon's "Simulate motion preferences" (or your
        OS setting) to see the static-poster behavior. On browsers where the
        preference is active, the video below will sit frozen on its poster
        frame.
      </CursedText>
      <CursedScene
        src={DEMO_SRC}
        poster={DEMO_POSTER}
        variant="framed"
        tint="subtle"
        label="Reduced motion demo — poster-only when user prefers reduced motion"
      />
    </div>
  ),
};
