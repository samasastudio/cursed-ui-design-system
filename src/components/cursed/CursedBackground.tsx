import React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import AnimatedGradient from "@/components/animated-gradient";

interface CursedBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "gradient" | "orbs" | "minimal";
}

export function CursedBackground({
  children,
  className,
  variant = "gradient",
}: CursedBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const [gradientColors, setGradientColors] = React.useState({
    color1: "#26366b",
    color2: "#e84c2e",
    color3: "#ecdc87",
  });

  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    const syncGradientColors = () => {
      const computed = getComputedStyle(root);
      const color1 = computed.getPropertyValue("--cursed-gradient-1").trim();
      const color2 = computed.getPropertyValue("--cursed-gradient-2").trim();
      const color3 = computed.getPropertyValue("--cursed-gradient-3").trim();

      if (!color1 || !color2 || !color3) return;

      setGradientColors((prev) => {
        if (
          prev.color1 === color1 &&
          prev.color2 === color2 &&
          prev.color3 === color3
        ) {
          return prev;
        }
        return { color1, color2, color3 };
      });
    };

    syncGradientColors();

    const observer = new MutationObserver(syncGradientColors);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme", "data-mode", "style", "class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--cursed-bg)]",
        className
      )}
    >
      {variant === "gradient" && (
        <div className="absolute inset-0 z-0">
          <AnimatedGradient
            config={{
              preset: "custom",
              color1: gradientColors.color1,
              color2: gradientColors.color2,
              color3: gradientColors.color3,
              speed: prefersReducedMotion ? 0 : 16,
              distortion: 8,
              swirl: 48,
              swirlIterations: 7,
              softness: 92,
              scale: 0.55,
              rotation: 0,
              proportion: 46,
              offset: 0,
              shape: "Edge",
              shapeSize: 42,
            }}
            noise={{ opacity: 0.03 }}
            style={{ zIndex: 0 }}
            className="w-full h-full"
          />
        </div>
      )}

      {variant === "orbs" && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute w-[400px] h-[400px] rounded-full cursed-drift opacity-20"
            style={{
              background: `radial-gradient(circle, var(--cursed-gradient-2), transparent 70%)`,
              top: "10%",
              left: "15%",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full cursed-drift opacity-15"
            style={{
              background: `radial-gradient(circle, var(--cursed-gradient-3), transparent 70%)`,
              bottom: "20%",
              right: "10%",
              filter: "blur(50px)",
              animationDelay: "-8s",
            }}
          />
          <div
            className="absolute w-[200px] h-[200px] rounded-full cursed-pulse opacity-10"
            style={{
              background: `radial-gradient(circle, var(--cursed-accent), transparent 70%)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(40px)",
            }}
          />
        </div>
      )}

      {variant === "minimal" && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(var(--cursed-fg-faint) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
