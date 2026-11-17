import { useState } from 'react';
import { STACK_GROUPS } from '../data/portfolio';
import { Reveal } from './Reveal';

export function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState<string>('all');

  const visibleGroups =
    activeGroup === 'all'
      ? STACK_GROUPS
      : STACK_GROUPS.filter((g) => g.id === activeGroup);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-[1140px] px-4 pt-6 pb-14 sm:px-6 sm:pt-8 sm:pb-20"
    >
      <div className="border-t border-slate-900/[0.08] pt-8 sm:pt-10 dark:border-white/[0.08]">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
                02 · Stack
              </p>
              <h2
                id="skills-heading"
                className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
              >
                Technologies & tools
              </h2>
              <p className="mt-2 max-w-[56ch] text-sm text-slate-600 sm:text-[15px] dark:text-slate-400">
                Tools I work with across interfaces, systems, and the spaces in
                between.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Interactive Category Filter Bar */}
        <Reveal delay={0.06}>
          <div
            role="tablist"
            aria-label="Filter technologies by category"
            className="mt-6 flex flex-wrap gap-1.5 rounded-xl border border-slate-900/[0.08] bg-slate-900/[0.03] p-1.5 dark:border-white/[0.07] dark:bg-white/[0.025]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeGroup === 'all'}
              onClick={() => setActiveGroup('all')}
              className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-150 ${
                activeGroup === 'all'
                  ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-[#090a0f]'
                  : 'text-slate-600 hover:bg-slate-900/[0.06] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
              }`}
            >
              All ({STACK_GROUPS.length})
            </button>
            {STACK_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={activeGroup === group.id}
                onClick={() => setActiveGroup(group.id)}
                className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-150 ${
                  activeGroup === group.id
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-[#090a0f]'
                    : 'text-slate-600 hover:bg-slate-900/[0.06] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
                }`}
              >
                {group.category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Clean Grouped Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visibleGroups.map((group, idx) => (
            <Reveal key={group.id} delay={Math.min(idx * 0.04, 0.24)}>
              <div className="glass-panel-interactive flex h-full flex-col justify-between rounded-2xl p-5 sm:p-6">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                      {group.category}
                    </h3>
                    <span className="font-mono-tabular text-xs text-slate-400 dark:text-slate-500">
                      {String(group.tools.length).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {group.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-900/[0.07] pt-4 dark:border-white/[0.07]">
                  {group.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-900/[0.09] bg-slate-900/[0.03] px-3 py-1.5 text-xs font-medium text-slate-800 transition-colors hover:border-sky-600/35 hover:bg-slate-900/[0.06] hover:text-slate-950 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-sky-300/30 dark:hover:bg-white/[0.06] dark:hover:text-white"
                    >
                      <span>{tool.name}</span>
                      {tool.note && (
                        <span className="font-mono-tabular text-[10px] text-sky-700 dark:text-sky-300">
                          · {tool.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
