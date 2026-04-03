import React from 'react';
import { cn } from '@/lib/utils';
import { FlowButton } from '@/components/flow-button';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'default' | 'lg';

interface CursedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, {
  className: string;
  borderColor: string;
}> = {
  primary: {
    className: 'bg-[var(--cursed-primary)] text-white hover:bg-[var(--cursed-primary-hover)] shadow-[var(--cursed-glow)]',
    borderColor: 'var(--cursed-primary)',
  },
  secondary: {
    className: 'bg-[var(--cursed-bg-surface)] text-[var(--cursed-fg)] hover:bg-[var(--cursed-bg-elevated)] border border-[var(--cursed-border)]',
    borderColor: 'var(--cursed-accent)',
  },
  ghost: {
    className: 'bg-transparent text-[var(--cursed-fg-muted)] hover:text-[var(--cursed-fg)] hover:bg-[var(--cursed-bg-surface)]',
    borderColor: 'var(--cursed-fg-faint)',
  },
  destructive: {
    className: 'bg-[var(--cursed-destructive)] text-white hover:opacity-90',
    borderColor: 'var(--cursed-destructive)',
  },
};

export function CursedButton({
  variant = 'primary',
  size = 'default',
  children,
  className,
  ...props
}: CursedButtonProps) {
  const style = variantStyles[variant];

  return (
    <FlowButton
      size={size}
      borderColor={style.borderColor}
      className={cn(
        'font-body font-semibold transition-all duration-300',
        style.className,
        className,
      )}
      {...props}
    >
      {children}
    </FlowButton>
  );
}
