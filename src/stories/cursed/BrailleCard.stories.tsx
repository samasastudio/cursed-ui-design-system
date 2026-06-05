import type { Meta, StoryObj } from "@storybook/react-vite";
import { CursedBrailleCard } from "@/components/cursed/CursedBrailleCard";
import { CursedHeading } from "@/components/cursed/CursedHeading";
import { CursedText } from "@/components/cursed/CursedText";
import { generateBrailleField, imageDataToBraille } from "@/lib/braille";

const STILL_ART = [
  "⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⢀⣴⠿⠛⠉⠉⠛⠿⣦⡀⠀⠀⠀",
  "⠀⠀⢠⡿⠁⠀⢀⣠⣄⡀⠀⠈⢿⡄⠀⠀",
  "⠀⠀⣿⠁⠀⣰⠟⠁⠈⠻⣆⠀⠈⣿⠀⠀",
  "⠀⠀⢿⡄⠀⠻⣄⡀⢀⣠⠟⠀⢠⡿⠀⠀",
  "⠀⠀⠀⠻⣦⣀⠀⠉⠉⠀⣀⣴⠟⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠉⠛⠿⠿⠛⠉⠀⠀⠀⠀⠀",
].join("\n");

const ALTAR_FRAMES = [
  ["⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀", "⠀⠀⠀⢀⣿⣿⡀⠀⠀⠀", "⠀⠀⢀⣾⣿⣿⣷⡀⠀⠀", "⠀⠀⠈⠻⣿⣿⠟⠁⠀⠀", "⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀"].join(
    "\n"
  ),
  ["⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀", "⠀⠀⠀⣾⣿⣿⣷⠀⠀⠀", "⠀⠀⢸⣿⣿⣿⣿⡇⠀⠀", "⠀⠀⠀⠻⣿⣿⠟⠀⠀⠀", "⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀"].join(
    "\n"
  ),
  ["⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀", "⠀⠀⢀⣾⣿⣿⣷⡀⠀⠀", "⠀⠀⣿⣿⣿⣿⣿⣿⠀⠀", "⠀⠀⠈⠻⣿⣿⠟⠁⠀⠀", "⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀"].join(
    "\n"
  ),
];

const REVEAL_ART = [
  "⡀⠄⠂⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠐⠠⢀",
  "⠈⠢⡀⠀⠀⢀⣀⣤⣤⣀⡀⠀⠀⢀⠔⠁",
  "⠀⠀⠈⠢⣴⣿⠿⠛⠛⠿⣿⣦⠔⠁⠀⠀",
  "⠀⠀⠀⠀⣿⡇⠀⠘⠃⠀⢸⣿⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠘⢿⣦⣀⣀⣴⡿⠃⠀⠀⠀⠀",
  "⢀⠠⠐⠈⠀⠀⠈⠉⠉⠁⠀⠀⠈⠐⠠⢀",
].join("\n");

const meta: Meta<typeof CursedBrailleCard> = {
  title: "Cursed UI/Braille Card",
  component: CursedBrailleCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Display-only braille art surface for static glyphs, frame sequences, reveal effects, and deterministic generative fields. Image/canvas translation is intentionally kept in `src/lib/braille`.",
      },
    },
  },
  args: {
    art: STILL_ART,
    label: "Abstract braille sigil",
    lineHeight: 1.08,
    letterSpacing: "-0.04em",
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["static", "sequence", "reveal", "generative"],
    },
    variant: {
      control: "select",
      options: ["bleed", "framed", "inset"],
    },
    tint: {
      control: "select",
      options: ["none", "subtle", "theme"],
    },
    colorFill: {
      control: "select",
      options: ["solid", "muted", "gradient"],
    },
    fontSize: {
      control: "text",
    },
    lineHeight: {
      control: "text",
    },
    letterSpacing: {
      control: "text",
    },
    playOn: {
      control: "select",
      options: ["visible", "hover", "always"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CursedBrailleCard>;

export const Static: Story = {
  render: (args) => (
    <div className="mx-auto max-w-xl space-y-4">
      <CursedHeading level="h3">Quiet signal</CursedHeading>
      <CursedBrailleCard {...args} />
      <CursedText variant="caption">
        Static braille renders as a decorative image when a label is provided.
      </CursedText>
    </div>
  ),
};

export const GradientFill: Story = {
  args: {
    colorFill: "gradient",
    tint: "theme",
  },
  render: (args) => (
    <div className="mx-auto max-w-xl">
      <CursedBrailleCard {...args} />
    </div>
  ),
};

export const Sequence: Story = {
  args: {
    frames: ALTAR_FRAMES,
    mode: "sequence",
    fps: 5,
    playOn: "visible",
    art: undefined,
    label: "Looping braille field",
  },
  render: (args) => (
    <div className="mx-auto max-w-xl space-y-4">
      <CursedBrailleCard {...args} />
      <CursedText variant="caption">
        Sequence playback is IntersectionObserver-gated and writes frames
        directly to the pre element.
      </CursedText>
    </div>
  ),
};

export const Reveal: Story = {
  args: {
    art: REVEAL_ART,
    mode: "reveal",
    fps: 18,
    loop: false,
    label: "Braille sigil reveal",
  },
  render: (args) => (
    <div className="mx-auto max-w-xl">
      <CursedBrailleCard {...args} />
    </div>
  ),
};

export const Generative: Story = {
  args: {
    generator: generateBrailleField,
    mode: "generative",
    fps: 12,
    colorFill: "muted",
    label: "Generative braille field",
  },
  render: (args) => (
    <div className="mx-auto max-w-xl space-y-4">
      <CursedBrailleCard {...args} />
      <CursedText variant="caption">
        Deterministic field generator receives column count, row count, and
        time.
      </CursedText>
    </div>
  ),
};

function VariantTile({
  variant,
  caption,
}: {
  variant: "bleed" | "framed" | "inset";
  caption: string;
}) {
  return (
    <div className="space-y-3">
      <CursedBrailleCard
        art={STILL_ART}
        variant={variant}
        tint="subtle"
        label={`${variant} braille card`}
      />
      <div className="flex items-baseline justify-between gap-4">
        <CursedText variant="label">{variant}</CursedText>
        <CursedText variant="caption">{caption}</CursedText>
      </div>
    </div>
  );
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-3">
      <VariantTile variant="bleed" caption="edge-to-edge glyph field" />
      <VariantTile variant="framed" caption="border and glow" />
      <VariantTile variant="inset" caption="elevated with vignette" />
    </div>
  ),
};

export const ReducedMotionNote: Story = {
  render: () => (
    <div className="mx-auto max-w-xl space-y-6">
      <CursedHeading level="h3">prefers-reduced-motion</CursedHeading>
      <CursedText variant="body">
        When the OS reports{" "}
        <code className="font-mono text-cursed-accent">
          prefers-reduced-motion: reduce
        </code>
        , <code className="font-mono">CursedBrailleCard</code> never starts a{" "}
        <code className="font-mono">requestAnimationFrame</code> loop. Manual
        play is blocked and the poster frame remains static.
      </CursedText>
      <CursedBrailleCard
        frames={ALTAR_FRAMES}
        fps={5}
        posterFrame={1}
        label="Reduced motion poster example"
      />
    </div>
  ),
};

export const ImageTranslationUtilityNote: Story = {
  render: () => (
    <div className="mx-auto max-w-xl space-y-6">
      <CursedHeading level="h3">Image translation utility</CursedHeading>
      <CursedText variant="body">
        Image loading is intentionally outside the component. Convert a canvas
        or decoded image to <code className="font-mono">ImageData</code>, then
        pass it through <code className="font-mono">imageDataToBraille</code>{" "}
        and render the returned string as <code className="font-mono">art</code>
        .
      </CursedText>
      <pre className="overflow-auto rounded-lg border border-cursed-border bg-cursed-bg-elevated p-4 font-mono text-sm text-cursed-fg-muted">
        {`const art = imageDataToBraille(imageData, {
  width: 48,
  threshold: 0.48,
  invert: false,
});

<CursedBrailleCard art={art} label="Translated image" />`}
      </pre>
      <CursedText variant="caption">
        Utility import available here for docs validation:{" "}
        <code className="font-mono">{imageDataToBraille.name}</code>.
      </CursedText>
    </div>
  ),
};
