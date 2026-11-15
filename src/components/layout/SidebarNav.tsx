import { NavLink } from 'react-router-dom';
import { primaryNav, secondaryNav } from '../navigation/navItems';
import { cn } from '../../utils/cn';
import { BrandMark } from '../ui/BrandMark';

export function SidebarNav() {
  return (
    <aside className="hidden w-[16.5rem] shrink-0 flex-col border-r border-line bg-canvas/80 md:flex">
      <div className="px-6 pb-6 pt-7">
        <NavLink to="/" className="inline-flex items-center gap-2.5" aria-label="SOPRO — início">
          <BrandMark className="size-8 text-brass" />
          <span className="font-display text-[1.375rem] font-medium tracking-[0.02em] text-ink">
            SOPRO
          </span>
        </NavLink>
        <p className="mt-2 max-w-[13rem] text-[0.6875rem] leading-relaxed text-muted">
          Organize sua vida espiritual, no seu ritmo.
        </p>
      </div>

      <nav aria-label="Navegação principal" className="flex-1 px-3">
        <ul className="space-y-0.5">
          {primaryNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'bg-surface font-medium text-ink shadow-[var(--shadow-soft)]'
                      : 'text-ink-soft hover:bg-surface-muted hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={17}
                      strokeWidth={isActive ? 1.9 : 1.6}
                      className={cn('shrink-0', isActive ? 'text-brass' : 'text-muted')}
                      aria-hidden
                    />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="my-5 h-px bg-line" />

        <ul className="space-y-0.5">
          {secondaryNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2 text-[0.8125rem] transition-colors',
                    isActive
                      ? 'bg-surface-muted text-ink'
                      : 'text-muted hover:bg-surface-muted/70 hover:text-ink-soft',
                  )
                }
              >
                <item.icon size={15} strokeWidth={1.6} className="shrink-0" aria-hidden />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-6 py-5">
        <p className="text-[0.625rem] leading-relaxed text-muted/80">
          Projeto comunitário e open-source. Seus dados ficam neste dispositivo.
        </p>
      </div>
    </aside>
  );
}
