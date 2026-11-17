import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PROJECTS, type Project } from '../data/portfolio';
import { ProjectImage } from './ProjectImage';
import { Reveal } from './Reveal';

interface ProjectsPageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

type FilterOption = 'all' | Project['filterGroup'];

const FILTERS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web-apps', label: 'Web & Mobile' },
  { id: 'commissioned', label: 'Commissioned' },
  { id: 'tools-concepts', label: 'Tools & Concepts' },
];

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [filter, setFilter] = useState<FilterOption>('all');

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterGroup === filter);

  return (
    <main className="mx-auto max-w-[1140px] px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-24">
      {/* Back Navigation & Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="group inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </a>

        <div className="mt-6 flex flex-col justify-between gap-4 border-b border-slate-900/[0.08] pb-8 sm:flex-row sm:items-end dark:border-white/[0.08]">
          <div>
            <p className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
              Archive · {String(PROJECTS.length).padStart(2, '0')} Projects
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              All Projects
            </h1>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Web applications, educational platforms, commissioned accounting
              systems, mobile builds, local tools, and sample business websites.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-7"
      >
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="inline-flex flex-wrap gap-1.5 rounded-xl border border-slate-900/[0.08] bg-slate-900/[0.03] p-1.5 dark:border-white/[0.07] dark:bg-white/[0.025]"
        >
          {FILTERS.map((item) => {
            const count =
              item.id === 'all'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.filterGroup === item.id).length;
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item.id)}
                className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-150 ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-[#090a0f]'
                    : 'text-slate-600 hover:bg-slate-900/[0.06] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
                }`}
              >
                {item.label} ({count})
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Responsive Project Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredProjects.map((project, idx) => (
          <Reveal
            key={project.slug}
            delay={Math.min((idx % 2) * 0.08 + 0.04, 0.2)}
          >
            <article className="glass-panel-interactive group flex h-full flex-col overflow-hidden rounded-2xl p-4 sm:p-5">
              {/* Preview Image */}
              <a
                href={`/projects/${project.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/projects/${project.slug}`);
                }}
                aria-label={`Inspect ${project.title}`}
                className="block overflow-hidden rounded-xl border border-slate-900/10 bg-slate-200 dark:border-white/10 dark:bg-[#0b0d14]"
              >
                <ProjectImage
                  src={project.image}
                  secondarySrc={project.secondaryImage}
                  isPortraitMedia={project.isPortraitMedia}
                  alt={project.imageCaption || `${project.title} preview`}
                  title={project.title}
                  aspectClass="aspect-[16/10]"
                />
              </a>

              {/* Body */}
              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  {/* Clean Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono-tabular text-slate-700 dark:text-slate-300">
                      {project.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                    {project.status && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-sky-700 dark:text-sky-300">
                          {project.status}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl dark:text-white">
                    <a
                      href={`/projects/${project.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/projects/${project.slug}`);
                      }}
                      className="transition-colors hover:text-sky-700 dark:hover:text-sky-200"
                    >
                      {project.title}
                    </a>
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {project.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.summary}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-900/[0.07] pt-4 dark:border-white/[0.07]">
                  <a
                    href={`/projects/${project.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/projects/${project.slug}`);
                    }}
                    className="group/btn inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-slate-950 transition-colors hover:text-sky-700 dark:text-white dark:hover:text-sky-300"
                  >
                    <span>View project details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-900/12 bg-slate-900/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:border-slate-900/25 hover:bg-slate-900/[0.08] hover:text-slate-950 dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/[0.09] dark:hover:text-white"
                    >
                      <span>Live demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
