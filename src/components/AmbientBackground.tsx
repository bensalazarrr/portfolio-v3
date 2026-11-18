import {
  Braces,
  Code2,
  Cpu,
  GitBranch,
  Layers,
  Terminal,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

interface AmbientBackgroundProps {
  theme: 'dark' | 'light';
}

const LIVE_BG_ICONS = [
  {
    id: 'code',
    Icon: Code2,
    positionClass: 'top-[13%] left-[4%] sm:left-[7%]',
    sizeClass: 'h-16 w-16 sm:h-24 sm:w-24',
    iconClass: 'h-8 w-8 sm:h-11 sm:w-11',
    animClass: 'animate-live-icon-a',
    delay: '0s',
    accentClass: 'text-sky-600/20 border-sky-600/15 dark:text-sky-300/20 dark:border-sky-300/15',
  },
  {
    id: 'terminal',
    Icon: Terminal,
    positionClass: 'top-[18%] right-[4%] sm:right-[7%]',
    sizeClass: 'h-14 w-14 sm:h-20 sm:w-20',
    iconClass: 'h-7 w-7 sm:h-10 sm:w-10',
    animClass: 'animate-live-icon-b',
    delay: '-4s',
    accentClass: 'text-indigo-600/20 border-indigo-600/15 dark:text-indigo-300/20 dark:border-indigo-300/15',
  },
  {
    id: 'braces',
    Icon: Braces,
    positionClass: 'top-[47%] left-[2%] sm:left-[5%]',
    sizeClass: 'hidden sm:flex sm:h-20 sm:w-20',
    iconClass: 'h-9 w-9',
    animClass: 'animate-live-icon-c',
    delay: '-7s',
    accentClass: 'text-slate-700/18 border-slate-700/12 dark:text-slate-200/16 dark:border-white/12',
  },
  {
    id: 'git',
    Icon: GitBranch,
    positionClass: 'top-[54%] right-[3%] sm:right-[6%]',
    sizeClass: 'h-14 w-14 sm:h-22 sm:w-22',
    iconClass: 'h-7 w-7 sm:h-10 sm:w-10',
    animClass: 'animate-live-icon-a',
    delay: '-10s',
    accentClass: 'text-sky-700/18 border-sky-700/14 dark:text-sky-200/18 dark:border-sky-200/14',
  },
  {
    id: 'layers',
    Icon: Layers,
    positionClass: 'bottom-[15%] left-[6%] sm:left-[12%]',
    sizeClass: 'h-14 w-14 sm:h-20 sm:w-20',
    iconClass: 'h-7 w-7 sm:h-9 sm:w-9',
    animClass: 'animate-live-icon-b',
    delay: '-13s',
    accentClass: 'text-indigo-700/18 border-indigo-700/14 dark:text-indigo-200/16 dark:border-indigo-200/12',
  },
  {
    id: 'cpu',
    Icon: Cpu,
    positionClass: 'bottom-[12%] right-[6%] sm:right-[13%]',
    sizeClass: 'hidden sm:flex sm:h-20 sm:w-20',
    iconClass: 'h-9 w-9',
    animClass: 'animate-live-icon-c',
    delay: '-5s',
    accentClass: 'text-slate-700/18 border-slate-700/12 dark:text-slate-200/16 dark:border-white/12',
  },
];

export function AmbientBackground({ theme }: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  const redrawRef = useRef<(() => void) | null>(null);
  // Hold the canvas still briefly after a theme change so the browser can
  // repaint the page without competing with the animation loop.
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    themeRef.current = theme;
    pauseUntilRef.current = performance.now() + 260;
    redrawRef.current?.();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    let width = window.innerWidth;
    let height = window.innerHeight;
    // Smaller screens cap the pixel ratio lower: the dot field is subtle
    // enough that 1.5 is indistinguishable and far cheaper to draw.
    const getDprCap = () => (window.innerWidth < 640 ? 1.5 : 2);
    let dpr = Math.min(window.devicePixelRatio || 1, getDprCap());
    let rafId = 0;

    // Smoothly damped cursor state
    const pointer = {
      targetX: width * 0.65,
      targetY: height * 0.28,
      x: width * 0.65,
      y: height * 0.28,
      active: false,
      strength: 0,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, getDprCap());
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const drawFrame = (timeMs: number) => {
      const t = timeMs * 0.001;
      const isDark = themeRef.current === 'dark';
      const isReduced = reducedMotionQuery.matches;

      // Skip drawing while a theme flip is repainting the page.
      if (timeMs < pauseUntilRef.current) {
        if (!isReduced && !document.hidden) {
          rafId = requestAnimationFrame(drawFrame);
        }
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Ease pointer position & presence
      pointer.x += (pointer.targetX - pointer.x) * 0.075;
      pointer.y += (pointer.targetY - pointer.y) * 0.075;
      const targetStrength = pointer.active ? 1 : 0;
      pointer.strength += (targetStrength - pointer.strength) * 0.06;

      // Subtle architectural dot & crosshair field
      const spacing = width < 640 ? 38 : 44;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const influenceRadius = width < 640 ? 150 : 210;

      // Autonomous calm light sweep coordinate when idle
      const autoX = width * (0.5 + 0.28 * Math.cos(t * 0.18));
      const autoY = height * (0.35 + 0.22 * Math.sin(t * 0.14));

      // Draw ultra-subtle cursor spotlight radial glow
      if (pointer.strength > 0.02 && !isReduced) {
        const glowRadius = 320;
        const grad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          glowRadius
        );
        if (isDark) {
          grad.addColorStop(
            0,
            `rgba(56, 189, 248, ${(0.065 * pointer.strength).toFixed(4)})`
          );
          grad.addColorStop(
            0.5,
            `rgba(99, 102, 241, ${(0.025 * pointer.strength).toFixed(4)})`
          );
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          grad.addColorStop(
            0,
            `rgba(14, 165, 233, ${(0.06 * pointer.strength).toFixed(4)})`
          );
          grad.addColorStop(
            0.5,
            `rgba(99, 102, 241, ${(0.02 * pointer.strength).toFixed(4)})`
          );
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      for (let r = 0; r < rows; r++) {
        const baseY = r * spacing;
        for (let c = 0; c < cols; c++) {
          const baseX = c * spacing;

          // Subtle harmonic wave across the grid
          const wave = isReduced
            ? 0
            : Math.sin(baseX * 0.008 + t * 0.75) *
              Math.cos(baseY * 0.008 - t * 0.55);

          // Proximity to active pointer
          let proximity = 0;
          if (pointer.strength > 0.01 && !isReduced) {
            const dx = baseX - pointer.x;
            const dy = baseY - pointer.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < influenceRadius * influenceRadius) {
              const dist = Math.sqrt(distSq);
              proximity = (1 - dist / influenceRadius) * pointer.strength;
            }
          }

          // Gentle autonomous shimmer around the drifting focal point
          let autoGlow = 0;
          if (!isReduced) {
            const adx = baseX - autoX;
            const ady = baseY - autoY;
            const aDistSq = adx * adx + ady * ady;
            const autoRadius = 260;
            if (aDistSq < autoRadius * autoRadius) {
              autoGlow = (1 - Math.sqrt(aDistSq) / autoRadius) * 0.35;
            }
          }

          const energy = Math.min(
            1,
            Math.max(0, (wave * 0.5 + 0.5) * 0.28 + autoGlow + proximity * 0.95)
          );

          const baseAlpha = isDark ? 0.055 : 0.075;
          const alpha = baseAlpha + energy * (isDark ? 0.24 : 0.22);
          const radius = 0.85 + energy * 0.85;

          if (isDark) {
            ctx.fillStyle =
              proximity > 0.15
                ? `rgba(125, 211, 252, ${alpha.toFixed(3)})`
                : `rgba(203, 213, 225, ${alpha.toFixed(3)})`;
          } else {
            ctx.fillStyle =
              proximity > 0.15
                ? `rgba(2, 132, 199, ${alpha.toFixed(3)})`
                : `rgba(51, 65, 85, ${alpha.toFixed(3)})`;
          }

          ctx.beginPath();
          ctx.arc(baseX, baseY, radius, 0, Math.PI * 2);
          ctx.fill();

          // Sparse architectural cross-ticks on every 4th intersection when energized
          if (r % 4 === 0 && c % 4 === 0 && energy > 0.22) {
            const tickSize = 3 + proximity * 2.5;
            ctx.strokeStyle = isDark
              ? `rgba(125, 211, 252, ${(energy * 0.22).toFixed(3)})`
              : `rgba(2, 132, 199, ${(energy * 0.2).toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(baseX - tickSize, baseY);
            ctx.lineTo(baseX + tickSize, baseY);
            ctx.moveTo(baseX, baseY - tickSize);
            ctx.lineTo(baseX, baseY + tickSize);
            ctx.stroke();
          }
        }
      }

      if (!isReduced && !document.hidden) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    const handleVisibilityChange = () => {
      cancelAnimationFrame(rafId);
      if (!document.hidden && !reducedMotionQuery.matches) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    const handleMotionPreferenceChange = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(drawFrame);
    };

    resize();
    redrawRef.current = () => {
      if (reducedMotionQuery.matches) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(drawFrame);
      }
    };
    rafId = requestAnimationFrame(drawFrame);

    const handleResize = () => {
      resize();
      if (reducedMotionQuery.matches) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      redrawRef.current = null;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener(
        'change',
        handleMotionPreferenceChange
      );
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f6f7fb] dark:bg-[#090a0f]"
    >
      {/* Subtle drifting atmospheric radial gradients */}
      <div
        className="animate-ambient-a absolute -left-[12%] -top-[18%] h-[540px] w-[540px] rounded-full opacity-50 blur-[90px] sm:h-[680px] sm:w-[680px] sm:blur-[130px] dark:opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.24) 0%, rgba(30, 58, 138, 0.1) 45%, transparent 72%)',
        }}
      />

      <div
        className="animate-ambient-b absolute -right-[14%] top-[24%] h-[500px] w-[500px] rounded-full opacity-40 blur-[90px] sm:h-[640px] sm:w-[640px] sm:blur-[140px] dark:opacity-28"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(15, 23, 42, 0.08) 50%, transparent 75%)',
        }}
      />

      <div
        className="animate-ambient-a absolute bottom-[-16%] left-[25%] hidden h-[420px] w-[620px] rounded-full opacity-28 blur-[140px] sm:block dark:opacity-22"
        style={{
          animationDelay: '-9s',
          background:
            'radial-gradient(circle, rgba(148, 163, 184, 0.18) 0%, transparent 72%)',
        }}
      />

      {/* Live interactive architectural coordinate field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-95"
      />

      {/* Bold, restrained live developer icons drifting softly in the background */}
      <div className="absolute inset-0 overflow-hidden">
        {LIVE_BG_ICONS.map(
          ({
            id,
            Icon,
            positionClass,
            sizeClass,
            iconClass,
            animClass,
            delay,
            accentClass,
          }) => (
            <div
              key={id}
              style={{ animationDelay: delay }}
              className={`absolute flex items-center justify-center rounded-2xl border bg-slate-900/[0.018] backdrop-blur-[2px] dark:bg-white/[0.018] ${positionClass} ${sizeClass} ${animClass} ${accentClass}`}
            >
              <Icon className={iconClass} strokeWidth={2.2} />
            </div>
          )
        )}
      </div>

      {/* Soft top/bottom vignette mask so edges stay calm */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f6f7fb]/65 dark:to-[#090a0f]/70" />
    </div>
  );
}
