import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolio';
import { ProjectImage } from './ProjectImage';
import { Reveal } from './Reveal';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string, sectionId?: string) => void;
}

export function ProjectDetailPage({
  slug,
  onNavigate,
}: ProjectDetailPageProps) {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = currentIndex >= 0 ? PROJECTS[currentIndex] : null;

  if (!project) {
    return (
      <main className="mx-auto max-w-[1060px] px-4 pt-32 pb-24 text-center sm:px-6">
        <div className="glass-panel mx-auto max-w-lg rounded-2xl p-8">
          <h1 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">
            Project not found
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            The requested project route does not match an entry in the
            portfolio.
          </p>
          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/projects');
            }}
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-[#090a0f]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Projects</span>
          </a>
        </div>
      </main>
    );
  }

  const prevProject =
    currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  return (
    <main className="mx-auto max-w-[1060px] px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-24">
      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-3 text-sm"
      >
        <a
          href="/projects"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/projects');
          }}
          className="group inline-flex min-h-[40px] items-center gap-2 font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to All Projects</span>
        </a>
        <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">
          /
        </span>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="text-slate-500 transition-colors hover:text-slate-800 dark:hover:text-slate-300"
        >
          Portfolio Home
        </a>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 border-b border-slate-900/[0.08] pb-8 dark:border-white/[0.08]"
      >
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

        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          {project.title}
        </h1>
        <p className="mt-2 font-display text-lg text-slate-700 sm:text-xl dark:text-slate-300">
          {project.subtitle}
        </p>
        <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          {project.summary}
        </p>

        {project.liveUrl && (
          <div className="mt-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-[#090a0f] dark:hover:bg-sky-100"
            >
              <span>Visit live project</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </motion.div>

      {/* Preview Frame */}
      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8"
      >
        <div className="glass-panel group overflow-hidden rounded-2xl p-3 sm:p-4">
          <div className="overflow-hidden rounded-xl border border-slate-900/10 bg-slate-200 dark:border-white/10 dark:bg-[#0b0d14]">
            <ProjectImage
              src={project.image}
              secondarySrc={project.secondaryImage}
              isPortraitMedia={project.isPortraitMedia}
              alt={project.imageCaption || `${project.title} preview`}
              title={project.title}
              aspectClass={
                project.isPortraitMedia
                  ? 'aspect-[4/3] sm:aspect-[16/9]'
                  : 'aspect-[16/10]'
              }
            />
          </div>
          {(project.imageCaption || project.imageNote) && (
            <figcaption className="mt-3 flex flex-col justify-between gap-1 px-1 text-xs text-slate-600 sm:flex-row sm:items-center dark:text-slate-400">
              {project.imageCaption && <span>{project.imageCaption}</span>}
              {project.imageNote && (
                <span className="text-slate-500">{project.imageNote}</span>
              )}
            </figcaption>
          )}
        </div>
      </motion.figure>

      {/* Facts Strip */}
      <Reveal delay={0.08}>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="glass-surface-subtle rounded-2xl p-4 sm:p-5">
            <p className="text-xs text-slate-500">Format</p>
            <p className="mt-1 font-display text-sm font-medium text-slate-950 dark:text-white">
              {project.format}
            </p>
          </div>
          <div className="glass-surface-subtle rounded-2xl p-4 sm:p-5">
            <p className="text-xs text-slate-500">My role</p>
            <p className="mt-1 font-display text-sm font-medium text-slate-950 dark:text-white">
              {project.role || 'Developer & Designer'}
            </p>
          </div>
          <div className="glass-surface-subtle rounded-2xl p-4 sm:p-5">
            <p className="text-xs text-slate-500">Status</p>
            <p className="mt-1 font-display text-sm font-medium text-slate-950 dark:text-white">
              {project.status || (project.liveUrl ? 'Live' : 'Documented')}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Narrative Details */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <Reveal>
            <section aria-labelledby="purpose-heading">
              <h2
                id="purpose-heading"
                className="font-display text-lg font-semibold text-slate-950 dark:text-white"
              >
                The purpose
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                {project.purpose}
              </p>
            </section>
          </Reveal>

          <Reveal delay={0.06}>
            <section aria-labelledby="approach-heading">
              <h2
                id="approach-heading"
                className="font-display text-lg font-semibold text-slate-950 dark:text-white"
              >
                The approach
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                {project.approach}
              </p>
            </section>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="glass-panel rounded-2xl p-5 sm:p-6">
              <h2 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                What it brings together
              </h2>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Previous / Next Project Navigation */}
      <Reveal delay={0.1}>
        <nav
          aria-label="Adjacent projects"
          className="mt-14 grid grid-cols-1 gap-4 border-t border-slate-900/[0.08] pt-8 sm:grid-cols-2 dark:border-white/[0.08]"
        >
          <a
            href={`/projects/${prevProject.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/projects/${prevProject.slug}`);
            }}
            className="glass-panel-interactive group flex items-center justify-between rounded-2xl p-5"
          >
            <div>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Previous project</span>
              </span>
              <p className="mt-1 font-display text-base font-semibold text-slate-950 dark:text-white">
                {prevProject.title}
              </p>
            </div>
            <span className="font-mono-tabular text-xs text-slate-400 dark:text-slate-500">
              {prevProject.index}
            </span>
          </a>

          <a
            href={`/projects/${nextProject.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/projects/${nextProject.slug}`);
            }}
            className="glass-panel-interactive group flex items-center justify-between rounded-2xl p-5 text-right sm:flex-row-reverse"
          >
            <div>
              <span className="flex items-center justify-end gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>Next project</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              <p className="mt-1 font-display text-base font-semibold text-slate-950 dark:text-white">
                {nextProject.title}
              </p>
            </div>
            <span className="font-mono-tabular text-xs text-slate-400 dark:text-slate-500">
              {nextProject.index}
            </span>
          </a>
        </nav>
      </Reveal>
    </main>
  );
}
