import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CursedButton } from '@/components/cursed/CursedButton';

const meta: Meta<typeof CursedButton> = {
  title: 'Cursed UI/Button',
  component: CursedButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof CursedButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Begin Ritual',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Channel Signal',
    size: 'default',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Dismiss',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Sever Connection',
    size: 'default',
  },
};

function AllVariants() {
  return (
    <div className="p-8 space-y-8 bg-[var(--cursed-bg)]">
      <div className="space-y-4">
        <p className="font-body text-xs font-medium uppercase tracking-[0.1em] text-[var(--cursed-fg-muted)]">
          All Variants
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CursedButton variant="primary">Begin Ritual</CursedButton>
          <CursedButton variant="secondary">Channel Signal</CursedButton>
          <CursedButton variant="ghost">Dismiss</CursedButton>
          <CursedButton variant="destructive">Sever Connection</CursedButton>
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-body text-xs font-medium uppercase tracking-[0.1em] text-[var(--cursed-fg-muted)]">
          Sizes
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CursedButton size="sm">Small</CursedButton>
          <CursedButton size="default">Default</CursedButton>
          <CursedButton size="lg">Large</CursedButton>
        </div>
      </div>
    </div>
  );
}

export const Overview: StoryObj = {
  render: () => <AllVariants />,
};
