/// <reference types="vite/client" />
import React from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type SceneVariant = "bleed" | "framed" | "inset";
type SceneTint = "none" | "subtle" | "theme";
type ScenePlayOn = "visible" | "hover" | "always";
type SceneFit = "cover" | "contain";
type ScenePreload = "none" | "metadata" | "auto";

type Source = { src: string; type: string };

type CommonAspectRatio =
  | "16/9"
  | "4/3"
  | "1/1"
  | "9/16"
  | "21/9"
  // Allow any custom string without losing autocomplete on the presets.
  | (string & {});

export interface CursedSceneProps {
  src?: string;
  sources?: Source[];
  poster?: string;

  aspectRatio?: CommonAspectRatio;
  fit?: SceneFit;
  variant?: SceneVariant;
  tint?: SceneTint;

  playOn?: ScenePlayOn;
  preload?: ScenePreload;

  label?: string;

  className?: string;
  style?: React.CSSProperties;

  ref?: React.Ref<CursedSceneHandle>;
}

export interface CursedSceneHandle {
  play: () => void;
  pause: () => void;
  readonly element: HTMLVideoElement | null;
}

// Hoisted so it isn't re-allocated each render.
const TINT_STYLES: Record<SceneTint, React.CSSProperties> = {
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

/**
 * A small, looped, ambient video tile — meant for short scenic clips
 * embedded inline with content (anime windows, lo-fi backdrops, mood
 * accents). Source-agnostic: pass any URL the browser can play.
 *
 * Defaults are tuned for ambient decoration:
 *
 * - `muted` and `loop` are forced; there is no audio surface.
 * - `playOn="visible"` gates playback by IntersectionObserver.
 * - `preload="none"` defers all bytes until the observer fires.
 * - `prefers-reduced-motion` always wins — the poster is shown statically.
 *
 * ## Sourcing
 *
 * - **Local dev / Storybook**: drop clips in `public/scenes/` and pass
 *   absolute paths (`src="/scenes/sakura.mp4"`). See
 *   `public/scenes/README.md` for the encoding spec.
 * - **Production / CDN**: pass any HTTPS URL. The CDN must return
 *   `Content-Type: video/mp4`, support `Range:` requests, and ideally have
 *   the clip encoded with `+faststart`. See the Storybook docs page
 *   "Cursed UI / Video Sources" for the full checklist, multi-codec
 *   patterns, hosting comparisons, and a troubleshooting matrix.
 *
 * For multi-codec delivery, pass `sources` instead of `src`:
 *
 * ```tsx
 * <CursedScene
 *   poster="https://cdn.example.com/sakura.jpg"
 *   sources={[
 *     { src: "https://cdn.example.com/sakura.av1.mp4", type: 'video/mp4; codecs="av01.0.05M.08"' },
 *     { src: "https://cdn.example.com/sakura.webm",    type: "video/webm" },
 *     { src: "https://cdn.example.com/sakura.mp4",     type: "video/mp4" },
 *   ]}
 * />
 * ```
 *
 * @see Storybook → "Cursed UI / Video Sources" for end-to-end sourcing docs.
 */
export function CursedScene({
  src,
  sources,
  poster,
  aspectRatio = "16/9",
  fit = "cover",
  variant = "framed",
  tint = "subtle",
  playOn = "visible",
  preload = "none",
  label,
  className,
  style,
  ref,
}: CursedSceneProps) {
  const prefersReducedMotion = useReducedMotion();

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  // Sticky flag: once the user clicks pause, IntersectionObserver should not
  // auto-resume playback for the lifetime of the component instance.
  const userPausedRef = React.useRef(false);

  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useImperativeHandle(
    ref,
    () => ({
      play: () => {
        // Reduced motion is a hard contract: poster only, no escape hatch —
        // not even via the imperative handle.
        if (prefersReducedMotion) return;
        userPausedRef.current = false;
        videoRef.current?.play().catch(() => {});
      },
      pause: () => {
        videoRef.current?.pause();
      },
      get element() {
        return videoRef.current;
      },
    }),
    [prefersReducedMotion]
  );

  // Keep the visible play/pause icon in sync with the underlying element.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // playOn: "always" — start on mount unless user paused or reduced motion.
  React.useEffect(() => {
    if (playOn !== "always") return;
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video || userPausedRef.current) return;
    video.play().catch(() => {});
  }, [playOn, prefersReducedMotion]);

  // playOn: "visible" — IntersectionObserver gates playback.
  React.useEffect(() => {
    if (playOn !== "visible") return;
    if (prefersReducedMotion) return;
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          if (!userPausedRef.current) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.25, rootMargin: "200px 0px" }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [playOn, prefersReducedMotion]);

  // Dev-only warning for a known footgun: no poster + no preload => flash.
  React.useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (!poster && preload === "none") {
      console.warn(
        '[CursedScene] Rendering without a `poster` and with `preload="none"` ' +
          "will flash the background color before the first frame loads. " +
          "Supply a `poster` image or set `preload` to `metadata`/`auto`."
      );
    }
  }, [poster, preload]);

  const handlePointerEnter = React.useCallback(() => {
    if (playOn !== "hover") return;
    if (prefersReducedMotion) return;
    if (userPausedRef.current) return;
    videoRef.current?.play().catch(() => {});
  }, [playOn, prefersReducedMotion]);

  const handlePointerLeave = React.useCallback(() => {
    if (playOn !== "hover") return;
    videoRef.current?.pause();
  }, [playOn]);

  const togglePause = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      // Reduced motion is a hard contract: poster only, no escape hatch.
      // Manual play clicks are also blocked while the user prefers reduced
      // motion. The button still toggles the sticky-pause flag so behavior
      // resumes naturally if the preference changes later.
      if (prefersReducedMotion) {
        userPausedRef.current = false;
        return;
      }
      userPausedRef.current = false;
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  }, [prefersReducedMotion]);

  const hoverHandlers =
    playOn === "hover"
      ? {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
        }
      : undefined;

  const videoElement = (
    <video
      ref={videoRef}
      // If <source> children are present, the browser uses those and ignores
      // this attribute — that's the intended behavior.
      src={sources && sources.length > 0 ? undefined : src}
      poster={poster}
      preload={preload}
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn(
        "absolute inset-0 h-full w-full",
        fit === "cover" ? "object-cover" : "object-contain"
      )}
    >
      {sources?.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );

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

  const pauseButton = (
    <button
      type="button"
      onClick={togglePause}
      aria-label={isPlaying ? "Pause scene" : "Play scene"}
      className={cn(
        "absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center",
        "rounded-full bg-[var(--cursed-bg-overlay)] text-[var(--cursed-fg)]",
        "backdrop-blur-sm",
        "opacity-0 transition-opacity duration-150",
        "group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cursed-ring)]"
      )}
    >
      {isPlaying ? (
        <Pause className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Play className="h-3.5 w-3.5" aria-hidden />
      )}
    </button>
  );

  const frameClasses = cn(
    "relative w-full overflow-hidden",
    variant === "framed" &&
      "border border-[var(--cursed-border)] rounded-[var(--radius-lg)]",
    variant === "inset" && "rounded-[calc(var(--radius-lg)*0.7)]"
  );

  const frameStyle: React.CSSProperties = {
    aspectRatio,
    ...(variant === "framed" ? { boxShadow: "var(--cursed-glow)" } : null),
  };

  const frame = (
    <div className={frameClasses} style={frameStyle}>
      {videoElement}
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
          "group relative p-2",
          "bg-[var(--cursed-bg-elevated)]",
          "border border-[var(--cursed-border)]",
          "rounded-[var(--radius-xl)]",
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
      className={cn("group relative", className)}
      style={style}
      {...hoverHandlers}
    >
      {frame}
    </div>
  );
}
