import { MonitorSmartphone, Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../../app/providers/ThemeProvider';
import { BottomNav } from '../navigation/BottomNav';
import { BrandMark } from '../ui/BrandMark';
import { OfflineBanner } from './OfflineBanner';
import { SidebarNav } from './SidebarNav';
import { SiteFooter } from './SiteFooter';

const THEME_ORDER = ['system', 'light', 'dark'] as const;

const THEME_META = {
  system: { icon: MonitorSmartphone, label: 'Tema automático' },
  light: { icon: Sun, label: 'Tema claro' },
  dark: { icon: Moon, label: 'Tema escuro' },
} as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const meta = THEME_META[theme];
  const Icon = meta.icon;

  const cycle = () => {
    const index = THEME_ORDER.indexOf(theme);
    setTheme(THEME_ORDER[(index + 1) % THEME_ORDER.length] ?? 'system');
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="rounded-full p-2 text-muted transition-colors hover:bg-surface-muted hover:text-ink"
      aria-label={`${meta.label} — alternar tema`}
      title={meta.label}
    >
      <Icon size={17} strokeWidth={1.7} aria-hidden />
    </button>
  );
}

export function AppLayout() {
  const location = useLocation();

  // Cada navegação começa no topo da página.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh bg-canvas">
      <SidebarNav />

      <div className="flex min-w-0 flex-1 flex-col">
        <OfflineBanner />

        <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/85 backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between px-4 py-2.5">
            <Link to="/" className="flex items-center gap-2" aria-label="SOPRO — início">
              <BrandMark className="size-6 text-brass" />
              <span className="font-display text-lg tracking-[0.02em] text-ink">SOPRO</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main
          id="conteudo"
          className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-5 sm:px-6 md:pb-10 md:pt-9 lg:px-10"
        >
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
          >
            Ir ao conteúdo
          </a>
          <Outlet />
        </main>

        <div className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 md:pb-6 lg:px-10">
          <div className="flex items-end justify-between gap-4">
            <SiteFooter />
            <div className="hidden shrink-0 pb-1 md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
