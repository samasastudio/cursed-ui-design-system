import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimatedCheckbox } from '@/components/animated-checkbox';

const cursedInputBase = [
  'bg-[var(--cursed-bg-surface)]',
  'border-[var(--cursed-border)]',
  'text-[var(--cursed-fg)]',
  'placeholder:text-[var(--cursed-fg-faint)]',
  'font-body',
  'focus:border-[var(--cursed-primary)]',
  'focus:ring-1',
  'focus:ring-[var(--cursed-ring)]',
  'transition-all duration-300',
].join(' ');

interface CursedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function CursedInput({ label, className, id, ...props }: CursedInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="font-body text-xs font-medium uppercase tracking-[0.08em] text-[var(--cursed-fg-muted)]"
        >
          {label}
        </label>
      )}
      <Input
        id={inputId}
        className={cn(cursedInputBase, className)}
        {...props}
      />
    </div>
  );
}

interface CursedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function CursedTextarea({ label, className, id, ...props }: CursedTextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="font-body text-xs font-medium uppercase tracking-[0.08em] text-[var(--cursed-fg-muted)]"
        >
          {label}
        </label>
      )}
      <Textarea
        id={textareaId}
        className={cn(cursedInputBase, 'min-h-[100px] resize-none', className)}
        {...props}
      />
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface CursedSelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function CursedSelect({
  label,
  placeholder = 'Select...',
  options,
  value,
  onValueChange,
  className,
}: CursedSelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="font-body text-xs font-medium uppercase tracking-[0.08em] text-[var(--cursed-fg-muted)]">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn(cursedInputBase, className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[var(--cursed-bg-elevated)] border-[var(--cursed-border)] text-[var(--cursed-fg)]">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-[var(--cursed-fg)] focus:bg-[var(--cursed-bg-surface)] focus:text-[var(--cursed-fg)]"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface CursedCheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function CursedCheckbox({
  label,
  defaultChecked = false,
  onCheckedChange,
  className,
}: CursedCheckboxProps) {
  return (
    <AnimatedCheckbox
      title={label}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      className={cn('text-[var(--cursed-fg)]', className)}
    />
  );
}
