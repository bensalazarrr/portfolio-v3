import { ArrowRight, GraduationCap, Network, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import { Reveal } from './Reveal';

interface AboutSectionProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export function AboutSection({ onNavigate }: AboutSectionProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-[1140px] px-4 pt-6 pb-14 sm:px-6 sm:pt-8 sm:pb-20"
    >
      <div className="border-t border-slate-900/[0.08] pt-8 sm:pt-10 dark:border-white/[0.08]">
        <Reveal>
          <p className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
            01 · About
          </p>
          <h2
            id="about-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
          >
            {PORTFOLIO_PROFILE.aboutHeading}
          </h2>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          {/* Bio Narrative */}
          <Reveal delay={0.08} className="space-y-5">
            {PORTFOLIO_PROFILE.aboutParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="max-w-[66ch] text-[15px] leading-[1.75] text-slate-600 sm:text-base dark:text-slate-300"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-2">
              <a
                href="#journey"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/', 'journey');
                }}
                className="group inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition-colors hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200"
              >
                <span>A little more about my journey</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          {/* Grounded Developer Focus Blocks */}
          <div className="space-y-3.5">
            <Reveal delay={0.12}>
              <div className="glass-panel-interactive rounded-2xl p-5">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-900/10 bg-sky-500/10 text-sky-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-sky-300">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-slate-950 dark:text-white">
                      BS Information Technology
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Our Lady of Lourdes College · 4th Year (2024 — Present)
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      Expanding skills across web & mobile software engineering,
                      database systems, and network infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="glass-panel-interactive rounded-2xl p-5">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-900/10 bg-indigo-500/10 text-indigo-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-indigo-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-slate-950 dark:text-white">
                      TESDA Computer Systems Servicing NC II
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Certified · Hardware & System Support
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      Hands-on computer assembly, hardware/software
                      troubleshooting, printer setup, and documentation.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="glass-panel-interactive rounded-2xl p-5">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-900/10 bg-slate-900/[0.05] text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-slate-950 dark:text-white">
                      Networking Foundation
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Cisco Networking Academy · Packet Tracer
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      Practical grounding in subnetting, routing, and port
                      forwarding alongside software delivery.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
