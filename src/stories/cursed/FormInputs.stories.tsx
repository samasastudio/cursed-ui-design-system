import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import {
  CursedInput,
  CursedTextarea,
  CursedSelect,
  CursedCheckbox,
} from '@/components/cursed/CursedInput';

const meta: Meta = {
  title: 'Cursed UI/Form Inputs',
  parameters: {
    layout: 'padded',
  },
};
export default meta;

function FormShowcase() {
  const [ritual, setRitual] = useState('');

  return (
    <div className="p-8 space-y-8 bg-[var(--cursed-bg)] max-w-lg">
      <p className="font-body text-xs font-medium uppercase tracking-[0.1em] text-[var(--cursed-fg-muted)]">
        Form Inputs
      </p>

      <CursedInput
        label="Vessel Name"
        placeholder="Enter the name of your vessel..."
      />

      <CursedInput
        label="Frequency"
        type="number"
        placeholder="440"
      />

      <CursedTextarea
        label="Incantation"
        placeholder="Speak your intent into the void..."
      />

      <CursedSelect
        label="Ritual Type"
        placeholder="Choose a ritual..."
        options={[
          { value: 'summoning', label: 'Summoning' },
          { value: 'divination', label: 'Divination' },
          { value: 'transmutation', label: 'Transmutation' },
          { value: 'banishment', label: 'Banishment' },
        ]}
        value={ritual}
        onValueChange={setRitual}
      />

      <CursedCheckbox
        label="I accept the terms of the covenant"
      />
    </div>
  );
}

export const AllInputs: StoryObj = {
  render: () => <FormShowcase />,
};

export const InputField: StoryObj = {
  render: () => (
    <div className="p-8 bg-[var(--cursed-bg)]">
      <CursedInput label="Signal Source" placeholder="Enter coordinates..." />
    </div>
  ),
};

export const TextareaField: StoryObj = {
  render: () => (
    <div className="p-8 bg-[var(--cursed-bg)]">
      <CursedTextarea label="Transmission" placeholder="Compose your message..." />
    </div>
  ),
};
