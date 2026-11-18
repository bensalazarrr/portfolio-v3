import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { ProjectImage } from './ProjectImage';
import { Reveal } from './Reveal';

interface FeaturedProjectsSectionProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export function FeaturedProjectsSection({
  onNavigate,
}: FeaturedProjectsSectionProps) {
  const featuredProjects = PROJECTS.slice(0, 2);
  const remainingProjects = PROJECTS.slice(featuredProjects.length);
  const remainingCount = remainingProjects.length;

  // Keep the teaser sentence in sync with the data instead of naming projects
  // by hand — it drifts the moment a project is added, renamed, or reordered.
  const previewTitles = remainingProjects.slice(0, 4).map((p) => p.title);
  const remainingLabel =
    remainingProjects.length > previewTitles.length
      ? `${previewTitles.join(', ')}, and ${remainingProjects.length - previewTitles.length} more`
      : previewTitles.join(', ');

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-[1140px] px-4 pt-6 pb-14 sm:px-6 sm:pt-8 sm:pb-20"
    >
      <div className="border-t border-slate-900/[0.08] pt-8 sm:pt-10 dark:border-white/[0.08]">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
                03 · Selected Projects
              </p>
              <h2
                id="projects-heading"
                className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
              >
                Featured work
              </h2>
              <p className="mt-2 max-w-[56ch] text-sm text-slate-600 sm:text-[15px] dark:text-slate-400">
                Two flagship web applications built for real educational and
                institutional workflows.
              </p>
            </div>

            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/projects');
              }}
              className="group inline-flex items-center gap-2 self-start text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 sm:self-auto dark:text-slate-300 dark:hover:text-white"
            >
              <span>All projects ({PROJECTS.length})</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        {/* Only first 2 projects rendered on the homepage */}
        <div className="mt-8 space-y-6 sm:space-y-8">
          {featuredProjects.map((project, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <Reveal key={project.slug} delay={idx * 0.08}>
                <article className="glass-panel-interactive group relative overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-7">
                  {/* Subtle glass reflection sheen */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-70 dark:via-white/25 dark:opacity-60"
                  />

                  <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
                    {/* Preview Column */}
                    <div
                      className={`lg:col-span-7 ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <a
                        href={`/projects/${project.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/projects/${project.slug}`);
                        }}
                        aria-label={`View ${project.title} case study`}
                        className="block h-full overflow-hidden rounded-xl border border-slate-900/10 bg-slate-200 dark:border-white/10 dark:bg-[#0b0d14]"
                      >
                        <ProjectImage
                          src={project.image}
                          alt={
                            project.imageCaption || `${project.title} preview`
                          }
                          title={project.title}
                          aspectClass="aspect-[16/10] lg:h-full lg:aspect-auto lg:min-h-[300px]"
                        />
                      </a>
                    </div>

                    {/* Details Column */}
                    <div
                      className={`flex flex-col justify-between py-1 lg:col-span-5 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div>
                        {/* Clean unboxed metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-mono-tabular text-slate-700 dark:text-slate-300">
                            {project.index}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.category}</span>
                        </div>

                        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-[1.7rem] dark:text-white">
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
                        </h3>

                        <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                          {project.subtitle}
                        </p>

                        <p className="mt-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {project.summary}
                        </p>

                        {project.role && (
                          <p className="mt-3 text-xs text-slate-700 dark:text-slate-300">
                            <span className="text-slate-500">Role: </span>
                            {project.role}
                          </p>
                        )}

                        <ul className="mt-4 space-y-1.5 border-t border-slate-900/[0.07] pt-4 dark:border-white/[0.07]">
                          {project.features.slice(0, 3).map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                            >
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-sky-300/90" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={`/projects/${project.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/projects/${project.slug}`);
                          }}
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-[#090a0f] dark:hover:bg-sky-100"
                        >
                          <span>Case study</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-900/12 bg-slate-900/[0.04] px-4 py-2 text-xs font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:border-slate-900/25 hover:bg-slate-900/[0.08] hover:text-slate-950 dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/[0.08] dark:hover:text-white"
                          >
                            <span>Live demo</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* View More Projects CTA leading to /projects */}
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-900/[0.08] bg-slate-900/[0.025] px-6 py-6 sm:flex-row dark:border-white/[0.08] dark:bg-white/[0.02]">
            <div>
              <p className="font-display text-base font-medium text-slate-950 dark:text-white">
                Explore {remainingCount} more projects in the full collection
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Includes {remainingLabel}.
              </p>
            </div>

            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/projects');
              }}
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-900/15 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] dark:border-white/15 dark:bg-white/[0.07] dark:hover:border-sky-300/40 dark:hover:bg-white/[0.13]"
            >
              <span>View More Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
