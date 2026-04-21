import React from "react";
import { cn } from "@/lib/utils";
import { SlideUpText } from "@/components/slide-up-text";

type TextVariant = "body" | "caption" | "label" | "mono";
type AnimationType = "none" | "slide-up" | "terminal";

interface CursedTextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
}

const variantMap: Record<TextVariant, string> = {
  body: "font-body text-base leading-[1.68] text-[var(--cursed-fg)]",
  caption: "font-body text-sm leading-[1.6] text-[var(--cursed-fg-muted)]",
  label:
    "font-body text-xs font-semibold uppercase tracking-[0.11em] text-[var(--cursed-fg-muted)]",
  mono: "font-mono text-sm leading-relaxed text-[var(--cursed-fg)] tracking-[-0.01em]",
};

export function CursedText({
  variant = "body",
  children,
  animation = "none",
  className,
}: CursedTextProps) {
  const baseClass = cn(variantMap[variant], className);

  if (animation === "slide-up") {
    if (typeof children !== "string") {
      return <p className={baseClass}>{children}</p>;
    }

    return (
      <SlideUpText className={baseClass} stagger={0.06} delay={0.2} inView once>
        {children}
      </SlideUpText>
    );
  }

  if (animation === "terminal") {
    return (
      <p className={cn(baseClass, "font-mono cursed-terminal-cursor")}>
        {children}
      </p>
    );
  }

  return <p className={baseClass}>{children}</p>;
}
