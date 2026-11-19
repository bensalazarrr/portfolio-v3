import { Code2 } from 'lucide-react';
import { useState } from 'react';

interface ProjectImageProps {
  src?: string;
  alt: string;
  title: string;
  isPortraitMedia?: boolean;
  secondarySrc?: string;
  aspectClass?: string;
  className?: string;
}

export function ProjectImage({
  src,
  alt,
  title,
  isPortraitMedia = false,
  secondarySrc,
  aspectClass = 'aspect-[16/10]',
  className = '',
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);
  const [secondaryError, setSecondaryError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`relative flex ${aspectClass} w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 p-6 text-center dark:from-slate-900 dark:via-[#111522] dark:to-[#0b0d14] ${className}`}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/10 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
          <Code2 className="h-5 w-5" />
        </div>
        <span className="font-display text-sm font-medium text-slate-800 dark:text-slate-200">
          {title}
        </span>
        <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Preview unavailable
        </span>
      </div>
    );
  }

  if (isPortraitMedia && secondarySrc) {
    return (
      <div
        className={`relative flex ${aspectClass} w-full items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 px-4 py-4 sm:gap-5 sm:px-6 dark:from-[#0e111a] dark:via-[#131722] dark:to-[#0a0c12] ${className}`}
      >
        <div className="relative h-full max-h-[94%] overflow-hidden rounded-xl border border-slate-900/10 bg-black/50 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] dark:border-white/10">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-auto object-contain"
          />
        </div>
        {!secondaryError && (
          <div className="relative h-full max-h-[88%] translate-y-2 overflow-hidden rounded-xl border border-slate-900/10 bg-black/50 shadow-2xl transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:scale-[1.02] dark:border-white/10">
            <img
              src={secondarySrc}
              alt={`${alt} secondary screen`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setSecondaryError(true)}
              className="h-full w-auto object-contain"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspectClass} w-full overflow-hidden bg-slate-200 dark:bg-[#0c0e15] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.035]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30 dark:from-[#090a0f]/50 dark:opacity-80 dark:group-hover:opacity-45"
      />
    </div>
  );
}
