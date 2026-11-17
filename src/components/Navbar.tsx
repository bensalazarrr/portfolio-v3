import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

export type AppRoute =
  | { view: 'home' }
  | { view: 'projects' }
  | { view: 'project-detail'; slug: string };

interface NavbarProps {
  route: AppRoute;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate: (path: string, sectionId?: string) => void;
}

const NAV_LINKS = [
  { id: 'projects', label: 'Projects', path: '/', sectionId: 'projects' },
  { id: 'about', label: 'About', path: '/', sectionId: 'about' },
  { id: 'skills', label: 'Skills', path: '/', sectionId: 'skills' },
  { id: 'journey', label: 'Journey', path: '/', sectionId: 'journey' },
  { id: 'contact', label: 'Contact', path: '/', sectionId: 'contact' },
];

export function Navbar({
  route,
  theme,
  onToggleTheme,
  onNavigate,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (route.view !== 'home') {
      setActiveSection('projects');
      return;
    }

    const sectionIds = ['projects', 'about', 'skills', 'journey', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-18% 0px -60% 0px', threshold: [0.05, 0.2, 0.45] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [route.view]);

  useEffect(() => {
    setMobileOpen(false);
  }, [route]);

  const handleLinkClick = (path: string, sectionId?: string) => {
    setMobileOpen(false);
    onNavigate(path, sectionId);
  };

  return (
    <header className="fixed inset-x-0 top-[2.5px] z-40 px-3 sm:px-6">
      <div
        className={`mx-auto transition-all duration-300 ease-out ${
          scrolled
            ? 'mt-2.5 max-w-[1060px] rounded-2xl px-4 py-2.5 sm:px-6 glass-nav-floating'
            : 'mt-0 max-w-[1140px] rounded-none border-b border-slate-900/[0.07] bg-[#f6f7fb]/80 px-2 py-3.5 backdrop-blur-md sm:px-4 sm:py-4 dark:border-white/[0.06] dark:bg-[#090a0f]/75'
        }`}
      >
        <div className="flex items-center justify-between gap-6 sm:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="font-display text-[15px] font-semibold tracking-tight text-slate-950 whitespace-nowrap shrink-0 transition-opacity hover:opacity-80 sm:text-base dark:text-white"
          >
            <span className="sm:hidden">J. B. Salazar</span>
            <span className="hidden sm:inline">{PORTFOLIO_PROFILE.name}</span>
          </a>

          {/* Zone 2: Concise single-line text nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 md:flex"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                route.view !== 'home'
                  ? item.id === 'projects'
                  : activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={
                    item.id === 'projects' && route.view !== 'home'
                      ? '/projects'
                      : `#${item.sectionId}`
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.id === 'projects' && route.view === 'home') {
                      handleLinkClick('/', 'projects');
                    } else if (item.id === 'projects' && route.view !== 'home') {
                      handleLinkClick('/projects');
                    } else {
                      handleLinkClick('/', item.sectionId);
                    }
                  }}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isActive
                      ? 'text-slate-950 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left rounded-full bg-sky-600 transition-transform duration-200 dark:bg-sky-300/90 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Animated Theme Toggle + Primary CTA / Mobile menu */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              title={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-900/10 bg-slate-900/[0.04] text-slate-700 transition-colors hover:border-slate-900/20 hover:bg-slate-900/[0.08] hover:text-slate-950 active:scale-[0.96] dark:border-white/12 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/[0.1] dark:hover:text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="moon-icon"
                    initial={{ opacity: 0, rotate: -65, scale: 0.65 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 65, scale: 0.65 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center"
                  >
                    <Moon className="h-[17px] w-[17px]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun-icon"
                    initial={{ opacity: 0, rotate: 65, scale: 0.65 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -65, scale: 0.65 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center text-amber-600"
                  >
                    <Sun className="h-[18px] w-[18px]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/', 'contact');
              }}
              className="hidden items-center justify-center rounded-xl border border-slate-900/15 bg-slate-900 px-4 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] md:inline-flex dark:border-white/15 dark:bg-white/[0.08] dark:hover:border-sky-300/40 dark:hover:bg-white/[0.14]"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={
                mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/10 bg-slate-900/[0.04] text-slate-700 transition-colors hover:bg-slate-900/[0.08] md:hidden dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.09]"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-[1060px] overflow-hidden rounded-2xl p-3 glass-nav-floating md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const isActive =
                  route.view !== 'home'
                    ? item.id === 'projects'
                    : activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={
                      item.id === 'projects' && route.view !== 'home'
                        ? '/projects'
                        : `#${item.sectionId}`
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.id === 'projects' && route.view !== 'home') {
                        handleLinkClick('/projects');
                      } else {
                        handleLinkClick('/', item.sectionId);
                      }
                    }}
                    className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-900/[0.07] text-slate-950 dark:bg-white/[0.08] dark:text-white'
                        : 'text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.id === 'projects' && (
                      <span className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
                        11
                      </span>
                    )}
                  </a>
                );
              })}
              <div className="mt-2 border-t border-slate-900/[0.08] pt-2 dark:border-white/[0.08]">
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('/projects');
                  }}
                  className="flex min-h-[44px] items-center justify-center rounded-xl border border-slate-900/15 bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:border-white/15 dark:bg-white/[0.08] dark:hover:bg-white/[0.14]"
                >
                  All Projects Archive
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
