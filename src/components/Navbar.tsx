import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
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
  { id: 'about', label: 'About', path: '/', sectionId: 'about' },
  { id: 'skills', label: 'Skills', path: '/', sectionId: 'skills' },
  { id: 'projects', label: 'Projects', path: '/', sectionId: 'projects' },
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
  const scrollLockRef = useRef<{
    active: boolean;
    timerId: number | null;
  }>({ active: false, timerId: null });

  const clearScrollLock = () => {
    if (scrollLockRef.current.timerId !== null) {
      window.clearTimeout(scrollLockRef.current.timerId);
      scrollLockRef.current.timerId = null;
    }
    scrollLockRef.current.active = false;
  };

  useEffect(() => {
    const sectionIds = ['about', 'skills', 'projects', 'journey', 'contact'];

    const updateNavState = () => {
      setScrolled(window.scrollY > 24);

      if (scrollLockRef.current.active) {
        return;
      }

      if (route.view !== 'home') {
        setActiveSection('projects');
        return;
      }

      // Near bottom of document -> Contact is active
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 48
      ) {
        setActiveSection('contact');
        return;
      }

      const threshold = 150;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const handleUserScrollInterrupt = () => {
      if (scrollLockRef.current.active) {
        clearScrollLock();
      }
    };

    const handleScrollEnd = () => {
      if (scrollLockRef.current.active) {
        clearScrollLock();
        updateNavState();
      }
    };

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState, { passive: true });
    window.addEventListener('wheel', handleUserScrollInterrupt, {
      passive: true,
    });
    window.addEventListener('touchstart', handleUserScrollInterrupt, {
      passive: true,
    });
    window.addEventListener('scrollend', handleScrollEnd, { passive: true });

    return () => {
      clearScrollLock();
      window.removeEventListener('scroll', updateNavState);
      window.removeEventListener('resize', updateNavState);
      window.removeEventListener('wheel', handleUserScrollInterrupt);
      window.removeEventListener('touchstart', handleUserScrollInterrupt);
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [route.view]);

  useEffect(() => {
    setMobileOpen(false);
  }, [route]);

  const handleLinkClick = (path: string, sectionId?: string) => {
    setMobileOpen(false);
    clearScrollLock();

    if (sectionId) {
      scrollLockRef.current.active = true;
      scrollLockRef.current.timerId = window.setTimeout(() => {
        scrollLockRef.current.active = false;
        scrollLockRef.current.timerId = null;
      }, 850);
      setActiveSection(sectionId);
    } else if (path === '/') {
      scrollLockRef.current.active = true;
      scrollLockRef.current.timerId = window.setTimeout(() => {
        scrollLockRef.current.active = false;
        scrollLockRef.current.timerId = null;
      }, 850);
      setActiveSection('');
    }

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
          <LayoutGroup id="primary-nav">
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
                      } else if (
                        item.id === 'projects' &&
                        route.view !== 'home'
                      ) {
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
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        aria-hidden="true"
                        transition={{
                          duration: 0.24,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-sky-600 dark:bg-sky-300"
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </LayoutGroup>

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
