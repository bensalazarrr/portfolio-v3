import { ArrowUp, ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import { BrandMark } from './BrandMark';
import { Reveal } from './Reveal';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard fallback not needed; compose link remains clickable
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-[1140px] px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16"
    >
      <div className="border-t border-slate-900/[0.08] pt-8 sm:pt-10 dark:border-white/[0.08]">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12">
            {/* Subtle top highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent dark:via-sky-300/35"
            />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
                  05 · Contact — Have an idea in mind?
                </p>
                <h2
                  id="contact-heading"
                  className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white"
                >
                  Let’s build something great.
                </h2>
                <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  A useful website. An interactive experience. Let’s talk about
                  what you’re working on.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={PORTFOLIO_PROFILE.gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-[#090a0f] dark:hover:bg-sky-100"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send an email</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-900/12 bg-slate-900/[0.04] px-4 py-2.5 text-sm font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:border-slate-900/25 hover:bg-slate-900/[0.08] hover:text-slate-950 active:scale-[0.98] dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/[0.09] dark:hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                        <span>Email copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span>Copy email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Contact Details */}
              <div className="space-y-4 lg:col-span-5">
                <div className="glass-surface-subtle rounded-2xl p-4 sm:p-5">
                  <div className="space-y-3.5 text-sm">
                    <a
                      href={`mailto:${PORTFOLIO_PROFILE.email}`}
                      className="flex items-start gap-3 text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                    >
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-300" />
                      <span className="break-all">
                        {PORTFOLIO_PROFILE.email}
                      </span>
                    </a>

                    <a
                      href={PORTFOLIO_PROFILE.phoneHref}
                      className="flex items-center gap-3 text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-300" />
                      <span className="font-mono-tabular">
                        {PORTFOLIO_PROFILE.phone}
                      </span>
                    </a>

                    <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-300" />
                      <span>{PORTFOLIO_PROFILE.location}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-900/[0.08] pt-4 dark:border-white/[0.07]">
                    {PORTFOLIO_PROFILE.socials.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-slate-900/[0.09] bg-slate-900/[0.03] px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-900/20 hover:bg-slate-900/[0.08] hover:text-slate-950 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:hover:text-white"
                      >
                        <span>{social.platform}</span>
                        <ArrowUpRight className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-900/[0.07] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            <BrandMark size={18} className="shrink-0" />
            <span>
              © {currentYear} {PORTFOLIO_PROFILE.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>Thoughtfully designed. Purposefully built.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex min-h-[38px] items-center gap-1.5 text-xs font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
