interface BrandMarkProps {
  /** Rendered size in pixels. Square. */
  size?: number;
  className?: string;
  /**
   * Accessible name. Omit when the mark sits next to text that already names
   * the brand, so screen readers do not hear it twice.
   */
  label?: string;
}

/**
 * The "b." brand mark: a charcoal tile with a white lowercase b.
 *
 * Drawn from geometry rather than text so the mark renders identically in the
 * app, the favicon, and the social card — no dependence on a webfont being
 * loaded, no difference between platforms. The inner hairline is what keeps
 * the dark tile readable on the near-black background.
 */
export function BrandMark({ size = 30, className, label }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect width="32" height="32" rx="7" fill="#14161d" />
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="6.3"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.15"
        strokeLinecap="round"
      >
        <path d="M9.1 9v14" />
        <circle cx="15.8" cy="18.4" r="4.6" />
      </g>
      <circle cx="23.3" cy="23.2" r="1.5" fill="#ffffff" />
    </svg>
  );
}
