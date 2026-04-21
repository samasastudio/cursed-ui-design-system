import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import {
  CursedInput,
  CursedTextarea,
  CursedSelect,
  CursedCheckbox,
} from "@/components/cursed/CursedInput";
import { CursedButton } from "@/components/cursed/CursedButton";

const meta: Meta = {
  title: "Cursed UI/Form Inputs",
  parameters: {
    layout: "padded",
  },
};
export default meta;

function FormShowcase() {
  const [profile, setProfile] = useState("");

  return (
    <div className="p-8 space-y-8 bg-[var(--cursed-bg)] max-w-lg">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.11em] text-[var(--cursed-fg-muted)]">
        Form Inputs
      </p>

      <CursedInput
        label="Project Name"
        placeholder="Name this interface study..."
      />

      <CursedInput label="Primary Scale" type="number" placeholder="8" />

      <CursedTextarea
        label="Design Intent"
        placeholder="Describe the atmosphere in one paragraph..."
      />

      <CursedSelect
        label="Interface Tone"
        placeholder="Select tone profile..."
        options={[
          { value: "quiet", label: "Quiet and restrained" },
          { value: "luminous", label: "Luminous and expressive" },
          { value: "editorial", label: "Editorial and structured" },
          { value: "hybrid", label: "Hybrid system profile" },
        ]}
        value={profile}
        onValueChange={setProfile}
      />

      <CursedCheckbox label="I reviewed motion and contrast accessibility" />
    </div>
  );
}

export const AllInputs: StoryObj = {
  render: () => <FormShowcase />,
};

export const InputField: StoryObj = {
  render: () => (
    <div className="p-8 bg-[var(--cursed-bg)]">
      <CursedInput label="Color Source" placeholder="Reference token name..." />
    </div>
  ),
};

export const TextareaField: StoryObj = {
  render: () => (
    <div className="p-8 bg-[var(--cursed-bg)]">
      <CursedTextarea
        label="Notes"
        placeholder="Capture rationale for this pattern..."
      />
    </div>
  ),
};

export const ValidationStates: StoryObj = {
  render: () => (
    <div className="p-8 space-y-6 bg-[var(--cursed-bg)] max-w-lg">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.11em] text-[var(--cursed-fg-muted)]">
        Validation States
      </p>
      <div className="space-y-2">
        <CursedInput
          label="Token Namespace"
          placeholder="cursed"
          aria-invalid="true"
          className="border-[var(--cursed-destructive)] focus:border-[var(--cursed-destructive)] focus:ring-[var(--cursed-destructive)]"
        />
        <p className="font-body text-sm leading-[1.5] text-[var(--cursed-destructive)]">
          Use lowercase letters and hyphens only.
        </p>
      </div>
      <div className="space-y-2">
        <CursedTextarea
          label="Description"
          placeholder="Explain when this token should be used..."
          aria-invalid="true"
          className="border-[var(--cursed-destructive)] focus:border-[var(--cursed-destructive)] focus:ring-[var(--cursed-destructive)]"
        />
        <p className="font-body text-sm leading-[1.5] text-[var(--cursed-destructive)]">
          Description should be at least 24 characters.
        </p>
      </div>
    </div>
  ),
};

export const DisabledStates: StoryObj = {
  render: () => (
    <div className="p-8 space-y-6 bg-[var(--cursed-bg)] max-w-lg">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.11em] text-[var(--cursed-fg-muted)]">
        Disabled States
      </p>
      <CursedInput
        label="Project Name"
        placeholder="Design system v2"
        disabled
      />
      <CursedTextarea
        label="Notes"
        placeholder="Pending upstream dependency..."
        disabled
      />
      <CursedSelect
        label="Theme"
        placeholder="Unavailable while syncing..."
        options={[
          { value: "shrine", label: "Shrine" },
          { value: "shadow", label: "Shadow" },
        ]}
        className="opacity-60 pointer-events-none"
      />
      <CursedCheckbox label="Publish preview" defaultChecked />
    </div>
  ),
};

export const RecoveryPattern: StoryObj = {
  render: () => (
    <div className="p-8 space-y-6 bg-[var(--cursed-bg)] max-w-lg">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.11em] text-[var(--cursed-fg-muted)]">
        Recovery Pattern
      </p>
      <div className="rounded-xl border border-[var(--cursed-border)] bg-[var(--cursed-bg-surface)] px-4 py-3 space-y-2">
        <p className="font-body text-sm text-[var(--cursed-fg)]">
          Save failed due to a network interruption.
        </p>
        <p className="font-body text-sm text-[var(--cursed-fg-muted)]">
          Your input is preserved locally. Retry when connection returns.
        </p>
      </div>
      <CursedInput label="Token Name" defaultValue="cursed-primary" />
      <div className="flex items-center gap-3">
        <CursedButton variant="primary" size="default" type="button">
          Retry Save
        </CursedButton>
        <CursedButton variant="secondary" size="default" type="button">
          Keep Editing
        </CursedButton>
      </div>
    </div>
  ),
};
