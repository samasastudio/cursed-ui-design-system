import React from "react";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/blur-reveal";
import { ShimmerText } from "@/components/shimmer-text";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type AnimationType = "none" | "blur-reveal" | "shimmer";

interface CursedHeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
}

const sizeMap: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.15]",
  h2: "text-3xl md:text-5xl font-semibold tracking-[0.015em] leading-[1.62]",
  h3: "text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-[1.25]",
  h4: "text-xl md:text-2xl font-medium tracking-[-0.01em] leading-[1.3]",
};

export function CursedHeading({
  level = "h1",
  children,
  animation = "none",
  className,
}: CursedHeadingProps) {
  const baseClass = cn(
    "font-display",
    sizeMap[level],
    "text-[var(--cursed-fg)]",
    className
  );

  if (animation === "blur-reveal") {
    if (typeof children !== "string") {
      const Tag = level;
      return <Tag className={baseClass}>{children}</Tag>;
    }
    return (
      <BlurReveal
        as={level}
        className={baseClass}
        speedReveal={2.5}
        speedSegment={0.4}
      >
        {children}
      </BlurReveal>
    );
  }

  if (animation === "shimmer") {
    const Tag = level;
    return (
      <Tag className={baseClass}>
        <ShimmerText duration={2.5} delay={0.5}>
          {children}
        </ShimmerText>
      </Tag>
    );
  }

  const Tag = level;
  return <Tag className={baseClass}>{children}</Tag>;
}
