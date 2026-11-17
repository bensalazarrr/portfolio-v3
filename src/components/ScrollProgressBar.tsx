import { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setProgress(0);
        return;
      }

      const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));
      setProgress(ratio);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2.5px] bg-slate-900/[0.06] dark:bg-white/[0.04]"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-sky-600/85 via-indigo-500/85 to-slate-800/90 shadow-[0_0_10px_rgba(14,165,233,0.3)] transition-transform duration-100 ease-out dark:from-sky-400/80 dark:via-indigo-300/90 dark:to-slate-100/95 dark:shadow-[0_0_12px_rgba(125,211,252,0.45)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
