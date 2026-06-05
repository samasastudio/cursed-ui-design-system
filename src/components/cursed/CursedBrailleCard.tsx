import React from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type CursedBrailleCardMode =
  | "static"
  | "sequence"
  | "reveal"
  | "generative";
export type CursedBrailleCardVariant = "bleed" | "framed" | "inset";
export type CursedBrailleCardTint = "none" | "subtle" | "theme";
export type CursedBrailleCardPlayOn = "visible" | "hover" | "always";
export type CursedBrailleCardColorFill = "solid" | "muted" | "gradient";

type BrailleGenerator = (cols: number, rows: number, t: number) => string;

export interface CursedBrailleCardHandle {
  play: () => void;
  pause: () => void;
  readonly element: HTMLPreElement | null;
}

export interface CursedBrailleCardProps {
  art?: string;
  frames?: string[];
  generator?: BrailleGenerator;
  mode?: CursedBrailleCardMode;
  posterFrame?: number;
  fps?: number;
  loop?: boolean;
  variant?: CursedBrailleCardVariant;
  tint?: CursedBrailleCardTint;
  colorFill?: CursedBrailleCardColorFill;
  fontSize?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  /**
   * When set, the card holds this aspect ratio and centers the art inside it.
   * When omitted (default), the card hugs the intrinsic size of the art.
   */
  aspectRatio?: string;
  playOn?: CursedBrailleCardPlayOn;
  showControls?: boolean;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<CursedBrailleCardHandle>;
}

const DEFAULT_ART = "⠁⠂⠄⡀⢀⠠⠐⠈\n⠈⠐⠠⢀⡀⠄⠂⠁";
const DEFAULT_COLS = 42;
const DEFAULT_ROWS = 14;
const REVEAL_CHARS_PER_SECOND = 42;

const TINT_STYLES: Record<CursedBrailleCardTint, React.CSSProperties> = {
  none: { display: "none" },
  subtle: {
    backgroundImage:
      "linear-gradient(135deg, var(--cursed-gradient-1), var(--cursed-gradient-2))",
    opacity: 0.08,
    mixBlendMode: "overlay",
  },
  theme: {
    backgroundImage:
      "linear-gradient(135deg, var(--cursed-gradient-1), var(--cursed-gradient-2))",
    opacity: 0.22,
    mixBlendMode: "overlay",
  },
};

const VIGNETTE_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(ellipse at center, transparent 55%, var(--cursed-bg) 120%)",
};

const COLOR_FILL_CLASSES: Record<CursedBrailleCardColorFill, string> = {
  solid: "text-[var(--cursed-fg)]",
  muted: "text-[var(--cursed-fg-muted)]",
  gradient:
    "bg-clip-text text-transparent [background-image:linear-gradient(135deg,var(--cursed-gradient-1),var(--cursed-gradient-2),var(--cursed-gradient-3))]",
};

function clampFrameIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return Math.min(Math.max(0, index), length - 1);
}

function inferDimensions(text: string): { cols: number; rows: number } {
  const lines = text.split("\n");
  return {
    cols: Math.max(DEFAULT_COLS, ...lines.map((line) => line.length)),
    rows: Math.max(DEFAULT_ROWS, lines.length),
  };
}

function getPosterContent({
  art,
  frames,
  generator,
  mode,
  posterFrame,
}: {
  art?: string;
  frames?: string[];
  generator?: BrailleGenerator;
  mode: CursedBrailleCardMode;
  posterFrame: number;
}): string {
  if (mode === "sequence" && frames?.length) {
    return frames[clampFrameIndex(posterFrame, frames.length)];
  }

  if (mode === "generative" && generator) {
    return generator(DEFAULT_COLS, DEFAULT_ROWS, 0);
  }

  return art ?? frames?.[0] ?? DEFAULT_ART;
}

function revealText(source: string, visibleCharacters: number): string {
  let remaining = visibleCharacters;
  let output = "";

  for (const char of source) {
    if (char === "\n") {
      output += char;
      continue;
    }

    if (remaining > 0) {
      output += char;
      remaining -= 1;
    } else {
      output += "⠀";
    }
  }

  return output;
}

function countRevealCharacters(source: string): number {
  let count = 0;

  for (const char of source) {
    if (char !== "\n") count += 1;
  }

  return count;
}

export function CursedBrailleCard({
  art,
  frames,
  generator,
  mode,
  posterFrame = 0,
  fps = 12,
  loop = true,
  variant = "framed",
  tint = "subtle",
  colorFill = "solid",
  fontSize = "0.72rem",
  lineHeight = 1.08,
  letterSpacing = "-0.04em",
  aspectRatio,
  playOn = "visible",
  showControls = true,
  label,
  className,
  style,
  ref,
}: CursedBrailleCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const hasFrames = Boolean(frames?.length);
  const hasGenerator = Boolean(generator);
  const resolvedMode: CursedBrailleCardMode =
    mode ?? (hasFrames ? "sequence" : hasGenerator ? "generative" : "static");

  const posterContent = getPosterContent({
    art,
    frames,
    generator,
    mode: resolvedMode,
    posterFrame,
  });
  const posterDimensions = inferDimensions(posterContent);
  const isAnimated =
    resolvedMode === "generative" ||
    resolvedMode === "reveal" ||
    (resolvedMode === "sequence" && (frames?.length ?? 0) > 1);

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const userPausedRef = React.useRef(false);
  const playingRef = React.useRef(false);
  const startTimeRef = React.useRef(0);
  const lastFrameTimeRef = React.useRef(0);
  const framesRef = React.useRef(frames);
  const generatorRef = React.useRef(generator);
  const artRef = React.useRef(art);
  const modeRef = React.useRef(resolvedMode);
  const loopRef = React.useRef(loop);
  const fpsRef = React.useRef(fps);
  const dimensionsRef = React.useRef(posterDimensions);

  const [isPlaying, setIsPlaying] = React.useState(false);

  framesRef.current = frames;
  generatorRef.current = generator;
  artRef.current = art;
  modeRef.current = resolvedMode;
  loopRef.current = loop;
  fpsRef.current = fps;
  dimensionsRef.current = posterDimensions;

  const stopRaf = React.useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const pausePlayback = React.useCallback(() => {
    stopRaf();
    playingRef.current = false;
    setIsPlaying(false);
  }, [stopRaf]);

  const tick = React.useCallback(
    (time: number) => {
      const pre = preRef.current;
      if (!pre || !playingRef.current) return;

      const safeFps = Math.max(1, fpsRef.current || 12);
      const interval = 1000 / safeFps;

      if (time - lastFrameTimeRef.current >= interval) {
        lastFrameTimeRef.current = time;
        const t = (time - startTimeRef.current) / 1000;
        const currentMode = modeRef.current;
        const nextFrames = framesRef.current;
        const nextArt = artRef.current ?? nextFrames?.[0] ?? DEFAULT_ART;

        // The animated modes write directly to the text node so frame changes
        // do not schedule React renders. Reduced motion never enters this loop.
        if (currentMode === "sequence" && nextFrames?.length) {
          const rawIndex = Math.floor(t * safeFps);
          const frameIndex = loopRef.current
            ? rawIndex % nextFrames.length
            : Math.min(rawIndex, nextFrames.length - 1);

          pre.textContent = nextFrames[frameIndex];

          if (!loopRef.current && frameIndex === nextFrames.length - 1) {
            pausePlayback();
            return;
          }
        } else if (currentMode === "reveal") {
          const visibleCharacters = Math.floor(t * REVEAL_CHARS_PER_SECOND);
          const totalCharacters = countRevealCharacters(nextArt);

          pre.textContent = revealText(nextArt, visibleCharacters);

          if (visibleCharacters >= totalCharacters) {
            pre.textContent = nextArt;

            if (loopRef.current) {
              startTimeRef.current = time;
            } else {
              pausePlayback();
              return;
            }
          }
        } else if (currentMode === "generative") {
          const nextGenerator = generatorRef.current;

          if (nextGenerator) {
            const { cols, rows } = dimensionsRef.current;
            pre.textContent = nextGenerator(cols, rows, t);
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [pausePlayback]
  );

  const startPlayback = React.useCallback(() => {
    if (prefersReducedMotion) return;
    if (!isAnimated || playingRef.current) return;

    userPausedRef.current = false;
    playingRef.current = true;
    startTimeRef.current = performance.now();
    lastFrameTimeRef.current = 0;
    setIsPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [isAnimated, prefersReducedMotion, tick]);

  React.useImperativeHandle(
    ref,
    () => ({
      play: () => {
        // Reduced motion is a hard contract: static poster only, no override.
        if (prefersReducedMotion) return;
        startPlayback();
      },
      pause: () => {
        pausePlayback();
      },
      get element() {
        return preRef.current;
      },
    }),
    [pausePlayback, prefersReducedMotion, startPlayback]
  );

  React.useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    if (!playingRef.current || prefersReducedMotion) {
      pre.textContent = posterContent;
    }
  }, [posterContent, prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      pausePlayback();
    }
  }, [pausePlayback, prefersReducedMotion]);

  React.useEffect(() => {
    if (playOn !== "always") return;
    if (prefersReducedMotion || userPausedRef.current) return;

    startPlayback();
    return pausePlayback;
  }, [pausePlayback, playOn, prefersReducedMotion, startPlayback]);

  React.useEffect(() => {
    if (playOn !== "visible") return;
    if (prefersReducedMotion) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          if (!userPausedRef.current) startPlayback();
        } else {
          pausePlayback();
        }
      },
      { threshold: 0.25, rootMargin: "200px 0px" }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [pausePlayback, playOn, prefersReducedMotion, startPlayback]);

  React.useEffect(() => stopRaf, [stopRaf]);

  const handlePointerEnter = React.useCallback(() => {
    if (playOn !== "hover") return;
    if (prefersReducedMotion || userPausedRef.current) return;
    startPlayback();
  }, [playOn, prefersReducedMotion, startPlayback]);

  const handlePointerLeave = React.useCallback(() => {
    if (playOn !== "hover") return;
    pausePlayback();
  }, [pausePlayback, playOn]);

  const togglePause = React.useCallback(() => {
    if (playingRef.current) {
      userPausedRef.current = true;
      pausePlayback();
      return;
    }

    if (prefersReducedMotion) {
      userPausedRef.current = false;
      return;
    }

    userPausedRef.current = false;
    startPlayback();
  }, [pausePlayback, prefersReducedMotion, startPlayback]);

  const hoverHandlers =
    playOn === "hover"
      ? {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
        }
      : undefined;

  const tintOverlay =
    tint === "none" ? null : (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={TINT_STYLES[tint]}
      />
    );

  const vignetteOverlay =
    variant === "inset" ? (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={VIGNETTE_STYLE}
      />
    ) : null;

  const pauseButton =
    isAnimated && showControls ? (
      <button
        type="button"
        onClick={togglePause}
        aria-label={isPlaying ? "Pause braille card" : "Play braille card"}
        className={cn(
          "absolute bottom-3 right-3 z-10 inline-flex h-8 w-8 items-center justify-center",
          "rounded-full bg-(--cursed-bg-overlay) text-cursed-fg",
          "backdrop-blur-sm",
          "opacity-0 transition-opacity duration-150",
          "group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cursed-ring"
        )}
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Play className="h-3.5 w-3.5" aria-hidden />
        )}
      </button>
    ) : null;

  const frameClasses = cn(
    "relative flex items-center justify-center overflow-hidden p-4",
    "bg-cursed-bg-elevated",
    // An aspect ratio needs a resolved width to derive height; without one the
    // frame hugs the intrinsic size of the art.
    aspectRatio ? "w-full" : "w-fit",
    variant === "framed" && "rounded-lg border border-cursed-border",
    variant === "inset" && "rounded-[calc(var(--radius-lg)*0.7)]"
  );

  const frameStyle: React.CSSProperties = {
    ...(aspectRatio ? { aspectRatio } : null),
    ...(variant === "framed" ? { boxShadow: "var(--cursed-glow)" } : null),
  };

  const preStyle: React.CSSProperties = {
    fontSize,
    lineHeight,
    letterSpacing,
    whiteSpace: "pre",
  };

  const frame = (
    <div className={frameClasses} style={frameStyle}>
      <pre
        ref={preRef}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        className={cn(
          "m-0 overflow-hidden text-center",
          "font-mono",
          "select-none tabular-nums",
          COLOR_FILL_CLASSES[colorFill]
        )}
        style={preStyle}
      >
        {posterContent}
      </pre>
      {tintOverlay}
      {vignetteOverlay}
      {pauseButton}
    </div>
  );

  if (variant === "inset") {
    return (
      <div
        ref={wrapperRef}
        className={cn(
          "group relative inline-flex p-2",
          "rounded-xl border border-cursed-border",
          "bg-cursed-bg-elevated",
          className
        )}
        style={style}
        {...hoverHandlers}
      >
        {frame}
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("group relative inline-flex", className)}
      style={style}
      {...hoverHandlers}
    >
      {frame}
    </div>
  );
}
