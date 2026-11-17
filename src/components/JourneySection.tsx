import { Award, BookOpen } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../data/portfolio';
import { Reveal } from './Reveal';

export function JourneySection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="mx-auto max-w-[1140px] px-4 pt-6 pb-14 sm:px-6 sm:pt-8 sm:pb-20"
    >
      <div className="border-t border-slate-900/[0.08] pt-8 sm:pt-10 dark:border-white/[0.08]">
        <Reveal>
          <p className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
            04 · Journey
          </p>
          <h2
            id="journey-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
          >
            Education & credentials
          </h2>
          <p className="mt-2 max-w-[58ch] text-sm text-slate-600 sm:text-[15px] dark:text-slate-400">
            Academic background, technical certifications, and recognition
            along the way.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Education Timeline */}
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                <h3 className="font-display">Education</h3>
              </div>

              <div className="space-y-3.5">
                {EDUCATION.map((item) => (
                  <div
                    key={`${item.period}-${item.program}`}
                    className="glass-panel-interactive rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono-tabular text-slate-500 dark:text-slate-400">
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="font-mono-tabular text-sky-700 dark:text-sky-300">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="mt-2 font-display text-base font-semibold text-slate-950 dark:text-white">
                      {item.program}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {item.school}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Certifications & Awards */}
          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                <h3 className="font-display">Certifications & awards</h3>
              </div>

              <div className="glass-panel overflow-hidden rounded-2xl divide-y divide-slate-900/[0.07] dark:divide-white/[0.07]">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={`${cert.year}-${cert.title}`}
                    className="flex flex-col justify-between gap-2 px-5 py-4 transition-colors hover:bg-slate-900/[0.025] sm:flex-row sm:items-center sm:gap-4 dark:hover:bg-white/[0.025]"
                  >
                    <div>
                      <h4 className="font-display text-sm font-medium text-slate-950 sm:text-[15px] dark:text-white">
                        {cert.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                        {cert.issuer} · {cert.kind}
                      </p>
                    </div>
                    <span className="font-mono-tabular text-xs text-slate-500 shrink-0 dark:text-slate-400">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
