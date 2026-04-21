import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type React from "react";

export interface BlurRevealProps {
  children: string;
  className?: string;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  inView?: boolean;
  once?: boolean;
  letterSpacing?: string | number;
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  speedReveal = 1.5,
  speedSegment = 0.5,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  as = "p",
  style,
  inView = false,
  once = true,
  letterSpacing,
}: BlurRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const stagger = 0.03 / speedReveal;
  const baseDuration = 0.3 / speedSegment;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
    exit: {
      transition: {
        staggerChildren: stagger,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
    visible: {
      opacity: 1,
      filter: prefersReducedMotion ? "none" : "blur(0px)",
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : baseDuration,
      },
    },
    exit: {
      opacity: 0,
      filter: prefersReducedMotion ? "none" : "blur(12px)",
      y: prefersReducedMotion ? 0 : 10,
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={inView ? "visible" : undefined}
          animate={inView ? undefined : "visible"}
          exit={prefersReducedMotion ? undefined : "exit"}
          variants={containerVariants}
          viewport={{ once }}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          <span className="sr-only">{children}</span>
          {children &&
            children.split(" ").map((word, wordIndex, wordsArray) => (
              <span
                key={`word-${wordIndex}`}
                className="inline-block whitespace-nowrap align-top"
                aria-hidden="true"
              >
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`char-${wordIndex}-${charIndex}`}
                    variants={itemVariants}
                    className="inline-block align-top"
                    style={
                      letterSpacing ? { marginRight: letterSpacing } : undefined
                    }
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIndex < wordsArray.length - 1 && (
                  <motion.span
                    key={`space-${wordIndex}`}
                    variants={itemVariants}
                    className="inline-block align-top"
                  >
                    &nbsp;
                  </motion.span>
                )}
              </span>
            ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
