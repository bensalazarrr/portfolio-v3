export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f6f7fb] transition-colors duration-300 dark:bg-[#090a0f]"
    >
      {/* Subtle top-left cool slate-blue ambient orb */}
      <div
        className="animate-ambient-a absolute -left-[12%] -top-[18%] h-[540px] w-[540px] rounded-full opacity-45 blur-[130px] sm:h-[680px] sm:w-[680px] dark:opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(30, 58, 138, 0.1) 45%, transparent 72%)',
        }}
      />

      {/* Subtle mid-right deep indigo ambient glow */}
      <div
        className="animate-ambient-b absolute -right-[14%] top-[24%] h-[500px] w-[500px] rounded-full opacity-35 blur-[140px] sm:h-[640px] sm:w-[640px] dark:opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(15, 23, 42, 0.08) 50%, transparent 75%)',
        }}
      />

      {/* Subtle lower depth illumination */}
      <div
        className="absolute bottom-[-16%] left-[25%] h-[420px] w-[620px] rounded-full opacity-25 blur-[140px] dark:opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(148, 163, 184, 0.16) 0%, transparent 72%)',
        }}
      />

      {/* Fine hairline architectural grid overlay at ultra-low opacity */}
      <div
        className="absolute inset-0 opacity-[0.045] dark:opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 25%, black 20%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 25%, black 20%, transparent 100%)',
        }}
      />
    </div>
  );
}
