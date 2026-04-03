import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedGradient from '@/components/animated-gradient';

interface CursedBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'gradient' | 'orbs' | 'minimal';
}

export function CursedBackground({
  children,
  className,
  variant = 'gradient',
}: CursedBackgroundProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--cursed-bg)]',
        className,
      )}
    >
      {variant === 'gradient' && (
        <div className="absolute inset-0 z-0">
          <AnimatedGradient
            config={{
              preset: 'custom',
              color1: 'var(--cursed-gradient-1)',
              color2: 'var(--cursed-gradient-2)',
              color3: 'var(--cursed-gradient-3)',
              speed: 0.3,
              distortion: 0.4,
              swirl: 0.6,
              swirlIterations: 4,
              softness: 0.8,
              scale: 1.2,
              rotation: 0,
              proportion: 0.5,
              offset: 0,
            }}
            noise={{ opacity: 0.03 }}
            className="w-full h-full"
          />
        </div>
      )}

      {variant === 'orbs' && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute w-[400px] h-[400px] rounded-full cursed-drift opacity-20"
            style={{
              background: `radial-gradient(circle, var(--cursed-gradient-2), transparent 70%)`,
              top: '10%',
              left: '15%',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full cursed-drift opacity-15"
            style={{
              background: `radial-gradient(circle, var(--cursed-gradient-3), transparent 70%)`,
              bottom: '20%',
              right: '10%',
              filter: 'blur(50px)',
              animationDelay: '-8s',
            }}
          />
          <div
            className="absolute w-[200px] h-[200px] rounded-full cursed-pulse opacity-10"
            style={{
              background: `radial-gradient(circle, var(--cursed-primary), transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(40px)',
            }}
          />
        </div>
      )}

      {variant === 'minimal' && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(var(--cursed-fg-faint) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
