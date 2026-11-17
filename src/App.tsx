/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AmbientBackground } from './components/AmbientBackground';
import { ContactSection } from './components/ContactSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { Navbar, type AppRoute } from './components/Navbar';
import { PortfolioAssistant } from './components/PortfolioAssistant';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SkillsSection } from './components/SkillsSection';
import { PORTFOLIO_PROFILE, PROJECTS } from './data/portfolio';

type ThemeMode = 'dark' | 'light';

function getInitialTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return 'dark';
}

function parsePath(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/projects') {
    return { view: 'projects' };
  }
  if (clean.startsWith('/projects/')) {
    const slug = clean.slice('/projects/'.length);
    if (slug) {
      return { view: 'project-detail', slug };
    }
  }
  return { view: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    parsePath(window.location.pathname)
  );
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update page title per route
  useEffect(() => {
    if (route.view === 'projects') {
      document.title = `Projects — ${PORTFOLIO_PROFILE.name}`;
    } else if (route.view === 'project-detail') {
      const found = PROJECTS.find((p) => p.slug === route.slug);
      document.title = found
        ? `${found.title} — ${PORTFOLIO_PROFILE.name}`
        : `Project — ${PORTFOLIO_PROFILE.name}`;
    } else {
      document.title = `${PORTFOLIO_PROFILE.name} — ${PORTFOLIO_PROFILE.role}`;
    }
  }, [route]);

  const navigate = useCallback((path: string, sectionId?: string) => {
    const targetUrl = sectionId ? `${path}#${sectionId}` : path;
    const currentFull = `${window.location.pathname}${window.location.hash}`;

    if (currentFull !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }

    const nextRoute = parsePath(path);
    setRoute(nextRoute);

    if (sectionId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 40);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen text-slate-900 dark:text-[#f4f4f6]">
        <ScrollProgressBar />
        <AmbientBackground theme={theme} />
        <Navbar
          route={route}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigate={navigate}
        />

        {route.view === 'home' && (
          <main id="main-content">
            <HeroSection onNavigate={navigate} />
            <AboutSection onNavigate={navigate} />
            <SkillsSection />
            <FeaturedProjectsSection onNavigate={navigate} />
            <JourneySection />
          </main>
        )}

        {route.view === 'projects' && <ProjectsPage onNavigate={navigate} />}

        {route.view === 'project-detail' && (
          <ProjectDetailPage slug={route.slug} onNavigate={navigate} />
        )}

        <ContactSection />
        <PortfolioAssistant onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}
