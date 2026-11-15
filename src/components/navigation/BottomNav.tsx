import { Flame, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { mobileNav, moreNav } from './navItems';

/**
 * Navegação inferior no celular.
 *
 * Cinco destinos: quatro áreas fixas, "Vida no Espírito" em destaque no centro
 * e "Mais" para o resto. O destaque central é intencional — o diferencial do
 * SOPRO precisa estar a um toque de distância.
 */
export function BottomNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isSpiritActive = location.pathname.startsWith('/carismatico');
  const isMoreActive = moreNav.some(
    (item) =>
      item.to !== '/carismatico' &&
      (location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)),
  );

  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink/25 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            id="mais"
            className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-50 border-t border-rule bg-paper animate-[rise_0.18s_ease-out] md:hidden"
          >
            <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
              <p className="rubric">Mais</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 text-muted"
                aria-label="Fechar"
              >
                <X size={15} aria-hidden />
              </button>
            </div>
            <ul className="max-h-[55dvh] overflow-y-auto">
              {moreNav.map((item) => (
                <li key={item.to} className="border-b border-rule last:border-0">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline gap-3 px-4 py-3',
                        isActive ? 'text-rubric' : 'text-ink',
                      )
                    }
                  >
                    <item.icon size={14} strokeWidth={1.5} className="shrink-0 self-center text-muted" aria-hidden />
                    <span className="min-w-0">
                      <span className="block text-[0.875rem]">{item.label}</span>
                      <span className="block text-[0.6875rem] leading-snug text-muted">
                        {item.description}
                      </span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
      >
        <ul className="flex items-stretch">
          {mobileNav.slice(0, 2).map((item) => (
            <NavItemCell key={item.to} item={item} />
          ))}

          <li className="flex-1">
            <NavLink
              to="/carismatico"
              className={cn(
                'flex h-full flex-col items-center gap-1 px-1 pb-2 pt-2 text-[0.5625rem] uppercase tracking-[0.08em]',
                isSpiritActive ? 'text-rubric' : 'text-muted',
              )}
            >
              <Flame
                size={17}
                strokeWidth={isSpiritActive ? 2 : 1.5}
                className={isSpiritActive ? 'text-rubric' : 'text-muted'}
                aria-hidden
              />
              <span className="leading-none">Espírito</span>
            </NavLink>
          </li>

          {mobileNav.slice(2, 4).map((item) => (
            <NavItemCell key={item.to} item={item} />
          ))}

          <li className="flex-1">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mais"
              className={cn(
                'flex h-full w-full flex-col items-center gap-1 px-1 pb-2 pt-2 text-[0.5625rem] uppercase tracking-[0.08em]',
                isMoreActive || open ? 'text-rubric' : 'text-muted',
              )}
            >
              <Menu size={17} strokeWidth={isMoreActive || open ? 2 : 1.5} aria-hidden />
              <span className="leading-none">Mais</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

function NavItemCell({ item }: { item: (typeof mobileNav)[number] }) {
  return (
    <li className="flex-1">
      <NavLink
        to={item.to}
        end={item.to === '/'}
        className={({ isActive }) =>
          cn(
            'flex h-full flex-col items-center gap-1 px-1 pb-2 pt-2 text-[0.5625rem] uppercase tracking-[0.08em]',
            isActive ? 'text-ink' : 'text-muted',
          )
        }
      >
        {({ isActive }) => (
          <>
            <item.icon
              size={17}
              strokeWidth={isActive ? 2 : 1.5}
              className={isActive ? 'text-rubric' : undefined}
              aria-hidden
            />
            <span className="leading-none">{item.label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}
