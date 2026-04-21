"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ChangeEvent, useId, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCheckboxProps {
  title?: string;
  defaultChecked?: boolean;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const springTransition = {
  type: "spring" as const,
  duration: 0.4,
  bounce: 0,
};

export function AnimatedCheckbox({
  title = "Implement Checkbox",
  defaultChecked = false,
  className,
  onCheckedChange,
}: AnimatedCheckboxProps) {
  const inputId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex items-center gap-3 cursor-pointer select-none",
        className
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div
        className={cn(
          "size-4.5 rounded-[6px] flex items-center justify-center border-[1.5px] transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--cursed-ring)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--cursed-bg)]",
          checked
            ? "bg-foreground border-transparent"
            : "bg-transparent border-muted-foreground/40 hover:border-muted-foreground/60"
        )}
      >
        <svg viewBox="0 0 20 20" className="size-full text-background">
          <motion.path
            d="M 0 4.5 L 3.182 8 L 10 0"
            fill="transparent"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(5 6)"
            initial={{
              pathLength: defaultChecked ? 1 : 0,
              opacity: defaultChecked ? 1 : 0,
            }}
            animate={{
              pathLength: checked ? 1 : 0,
              opacity: checked ? 1 : 0,
            }}
            transition={{
              pathLength: {
                ease: "easeOut",
                duration: prefersReducedMotion ? 0.01 : 0.3,
              },
              opacity: { duration: 0 },
            }}
          />
        </svg>
      </div>
      <div className="relative">
        <span
          className={cn(
            "text-base font-medium transition-colors duration-200",
            checked ? "text-muted-foreground" : "text-foreground"
          )}
        >
          {title}
        </span>
        <motion.div
          className="absolute left-0 top-1/2 h-[1.5px] bg-muted-foreground -translate-y-1/2"
          initial={{
            width: defaultChecked ? "100%" : 0,
            opacity: defaultChecked ? 1 : 0,
          }}
          animate={{
            width: checked ? "100%" : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={
            prefersReducedMotion ? { duration: 0.01 } : springTransition
          }
        />
      </div>
    </label>
  );
}
