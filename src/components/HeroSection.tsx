import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

interface HeroSectionProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'GitHub':
      return <Github className="h-4 w-4" />;
    case 'LinkedIn':
      return <Linkedin className="h-4 w-4" />;
    case 'Instagram':
      return <Instagram className="h-4 w-4" />;
    default:
      return (
        <span className="font-mono-tabular text-[11px] font-medium leading-none">
          {platform.slice(0, 2).toUpperCase()}
        </span>
      );
  }
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto max-w-[1140px] px-4 pt-24 pb-10 sm:px-6 sm:pt-32 sm:pb-14"
    >
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
        {/* Left Column: Identity & Primary Value Proposition */}
        <div className="flex flex-col justify-between py-1">
          <div>
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.06] dark:text-white"
            >
              {PORTFOLIO_PROFILE.name}
              <span className="text-slate-400 dark:text-slate-500">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-display text-xl font-medium tracking-tight text-slate-700 sm:text-2xl dark:text-slate-200"
            >
              {PORTFOLIO_PROFILE.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-400"
            >
              {PORTFOLIO_PROFILE.heroIntro}
            </motion.p>
          </div>

          {/* CTAs & Social Row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col gap-6 pt-2"
          >
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/projects');
                }}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-[#090a0f] dark:hover:bg-sky-100"
              >
                <span>Explore my work</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/', 'contact');
                }}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-900/12 bg-slate-900/[0.04] px-5 py-2.5 text-sm font-medium text-slate-800 whitespace-nowrap shrink-0 backdrop-blur-md transition-all duration-200 hover:border-slate-900/25 hover:bg-slate-900/[0.08] active:scale-[0.98] dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-white/25 dark:hover:bg-white/[0.08]"
              >
                <span>Get in touch</span>
                <ArrowDownRight className="h-4 w-4 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1 text-xs text-slate-500">Connect</span>
              {PORTFOLIO_PROFILE.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.platform} — ${social.handle}`}
                  title={social.platform}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/[0.09] bg-slate-900/[0.03] text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900/20 hover:bg-slate-900/[0.07] hover:text-slate-950 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:hover:text-white"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Portrait Glass Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          <div className="glass-panel group relative flex w-full flex-col overflow-hidden rounded-2xl p-3">
            <div className="relative flex-1 overflow-hidden rounded-xl bg-slate-200 dark:bg-[#11131a]">
              <img
                src={PORTFOLIO_PROFILE.portrait}
                alt={PORTFOLIO_PROFILE.portraitAlt}
                referrerPolicy="no-referrer"
                fetchPriority="high"
                decoding="async"
                className="h-full max-h-[380px] w-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0 lg:max-h-none"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent dark:from-[#090a0f]/65"
              />
            </div>

            <div className="mt-3 flex items-center justify-between px-1.5 pt-0.5">
              <span className="font-mono-tabular text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {PORTFOLIO_PROFILE.name}
              </span>
              <span className="font-mono-tabular text-[11px] text-slate-500 dark:text-slate-400">
                {PORTFOLIO_PROFILE.shortLocation}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-width Highlights Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 md:grid-cols-3 md:gap-4"
      >
        {PORTFOLIO_PROFILE.highlights.map((item) => (
          <div
            key={item.title}
            className="glass-panel-interactive rounded-2xl px-5 py-4"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
            <p className="mt-1 font-display text-base font-medium text-slate-950 dark:text-white">
              {item.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {item.detail}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
