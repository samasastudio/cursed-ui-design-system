import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

const meta: Meta = {
  title: "Cursed UI/Color Tokens",
  parameters: {
    layout: "padded",
  },
};
export default meta;

function Swatch({ name, cssVar }: { name: string; cssVar: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-lg border border-[var(--cursed-border)] shrink-0"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div>
        <div className="font-mono text-sm text-[var(--cursed-fg)]">{name}</div>
        <div className="font-mono text-xs text-[var(--cursed-fg-faint)]">
          {cssVar}
        </div>
      </div>
    </div>
  );
}

function GradientBar() {
  return (
    <div
      className="h-20 rounded-xl w-full"
      style={{
        background: `linear-gradient(135deg, var(--cursed-gradient-1), var(--cursed-gradient-2), var(--cursed-gradient-3))`,
      }}
    />
  );
}

function TokenGrid() {
  const groups = [
    {
      label: "Background",
      tokens: [
        { name: "Background", var: "--cursed-bg" },
        { name: "Elevated", var: "--cursed-bg-elevated" },
        { name: "Surface", var: "--cursed-bg-surface" },
      ],
    },
    {
      label: "Foreground",
      tokens: [
        { name: "Default", var: "--cursed-fg" },
        { name: "Muted", var: "--cursed-fg-muted" },
        { name: "Faint", var: "--cursed-fg-faint" },
      ],
    },
    {
      label: "Brand",
      tokens: [
        { name: "Primary", var: "--cursed-primary" },
        { name: "Primary Hover", var: "--cursed-primary-hover" },
        { name: "Secondary", var: "--cursed-secondary" },
        { name: "Accent", var: "--cursed-accent" },
        { name: "Destructive", var: "--cursed-destructive" },
      ],
    },
    {
      label: "Gradient",
      tokens: [
        { name: "Stop 1", var: "--cursed-gradient-1" },
        { name: "Stop 2", var: "--cursed-gradient-2" },
        { name: "Stop 3", var: "--cursed-gradient-3" },
      ],
    },
  ];

  return (
    <div className="p-8 space-y-10 bg-[var(--cursed-bg)] min-h-screen">
      <div>
        <h2 className="font-display text-3xl text-[var(--cursed-fg)] mb-2">
          Color Tokens
        </h2>
        <p className="font-body text-sm text-[var(--cursed-fg-muted)] mb-6">
          Switch themes in the toolbar to see each palette.
        </p>
        <GradientBar />
      </div>

      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="font-body text-xs font-semibold uppercase tracking-[0.11em] text-[var(--cursed-fg-muted)] mb-4">
            {group.label}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {group.tokens.map((t) => (
              <Swatch key={t.var} name={t.name} cssVar={t.var} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const AllTokens: StoryObj = {
  render: () => <TokenGrid />,
};
