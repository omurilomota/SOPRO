import { Menu, X, Flame, Compass, Settings2, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { mobileNav } from './navItems';

const MORE_LINKS = [
  { to: '/caminhada', label: 'Minha caminhada', icon: Compass, hint: 'Diário, hábitos e intenções' },
  { to: '/carismatico', label: 'Carismático', icon: Flame, hint: 'Dons, carismas e RCC' },
  { to: '/caminhada/configuracoes', label: 'Configurações', icon: Settings2, hint: 'Tema, dados e cópia de segurança' },
  { to: '/privacidade', label: 'Privacidade', icon: Heart, hint: 'Como seus dados são tratados' },
];

export function BottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  const isMoreActive = MORE_LINKS.some(
    (link) => link.to !== '/caminhada' && location.pathname.startsWith(link.to),
  );

  return (
    <>
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[1px] md:hidden dark:bg-black/40"
          onClick={() => setMoreOpen(false)}
          aria-hidden
        />
      )}

      {moreOpen && (
        <div
          id="more-sheet"
          className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 mx-3 overflow-hidden rounded-2xl border border-line bg-surface shadow-xl animate-[fade-up_0.2s_ease-out] md:hidden"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="text-[0.8125rem] font-medium text-ink">Mais</p>
            <button
              type="button"
              onClick={() => setMoreOpen(false)}
              className="rounded-full p-1.5 text-muted hover:bg-surface-muted"
              aria-label="Fechar menu"
            >
              <X size={16} aria-hidden />
            </button>
          </div>
          <ul className="p-1.5">
            {MORE_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm',
                      isActive ? 'bg-surface-muted text-ink' : 'text-ink-soft',
                    )
                  }
                >
                  <link.icon size={17} strokeWidth={1.6} className="text-brass" aria-hidden />
                  <span className="flex-1">
                    <span className="block">{link.label}</span>
                    <span className="block text-[0.6875rem] text-muted">{link.hint}</span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1">
          {mobileNav.map((item) => (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 px-1 pb-2 pt-2.5 text-[0.625rem] transition-colors',
                    isActive ? 'text-ink' : 'text-muted',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={20}
                      strokeWidth={isActive ? 2 : 1.6}
                      className={isActive ? 'text-brass' : undefined}
                      aria-hidden
                    />
                    <span className="truncate leading-none">{item.label.split(' ')[0]}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              aria-controls="more-sheet"
              className={cn(
                'flex w-full flex-col items-center gap-1 px-1 pb-2 pt-2.5 text-[0.625rem] transition-colors',
                moreOpen || isMoreActive ? 'text-ink' : 'text-muted',
              )}
            >
              <Menu
                size={20}
                strokeWidth={moreOpen || isMoreActive ? 2 : 1.6}
                className={moreOpen || isMoreActive ? 'text-brass' : undefined}
                aria-hidden
              />
              <span className="leading-none">Mais</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
