import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '../navigation/BottomNav';
import { BrandMark } from '../ui/BrandMark';
import { OfflineBanner } from './OfflineBanner';
import { SidebarNav } from './SidebarNav';
import { SiteFooter } from './SiteFooter';
import { ThemeToggle } from './ThemeToggle';

export { ThemeToggle } from './ThemeToggle';

export function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh bg-paper">
      <SidebarNav />

      <div className="flex min-w-0 flex-1 flex-col">
        <OfflineBanner />

        <header className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-sm md:hidden">
          <div className="flex items-center justify-between px-4 py-2.5">
            <Link to="/" className="flex items-baseline gap-1.5" aria-label="SOPRO — início">
              <BrandMark className="size-3.5 translate-y-0.5 text-rubric" />
              <span className="font-display text-[1.0625rem] tracking-[0.08em] text-ink">SOPRO</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main
          id="conteudo"
          className="mx-auto w-full max-w-[52rem] flex-1 px-5 pb-24 pt-6 sm:px-7 md:pb-12 md:pt-10"
        >
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm"
          >
            Ir ao conteúdo
          </a>
          <Outlet />
        </main>

        <div className="mx-auto w-full max-w-[52rem] px-5 pb-24 sm:px-7 md:pb-8">
          <SiteFooter />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
