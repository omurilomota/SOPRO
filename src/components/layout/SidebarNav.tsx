import { NavLink } from 'react-router-dom';
import { charismaticNav, primaryNav } from '../navigation/navItems';
import { cn } from '../../utils/cn';
import { BrandMark } from '../ui/BrandMark';
import { ThemeToggle } from './ThemeToggle';

/**
 * Navegação lateral: um índice de livro, não um menu de aplicativo.
 *
 * - Itens separados por filetes, sem pílulas de fundo.
 * - Item ativo marcado por uma fita de rubrica à esquerda e tinta densa.
 * - "Vida no Espírito" ocupa um bloco próprio, abaixo de um filete duplo:
 *   é a área que diferencia o SOPRO dos demais aplicativos católicos.
 */
export function SidebarNav() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-[15.5rem] shrink-0 flex-col border-r border-rule bg-paper md:flex">
      <div className="px-6 pt-7">
        <NavLink to="/" className="group flex items-baseline gap-2" aria-label="SOPRO — início">
          <BrandMark className="size-4 shrink-0 translate-y-0.5 text-rubric" />
          <span className="font-display text-[1.3125rem] tracking-[0.06em] text-ink group-hover:text-rubric">
            SOPRO
          </span>
        </NavLink>
        <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-muted">
          Vida espiritual católica
        </p>
      </div>

      <nav aria-label="Navegação principal" className="mt-7 flex-1 overflow-y-auto px-3 pb-6">
        <p className="mb-2 px-3 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-muted/70">
          Índice
        </p>

        <ul>
          {primaryNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-center gap-2.5 py-[7px] pl-3 pr-2 text-[0.875rem] transition-colors',
                    isActive
                      ? 'rubric-mark font-medium text-ink'
                      : 'text-ink-2 hover:text-rubric',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={14}
                      strokeWidth={isActive ? 1.9 : 1.4}
                      className={isActive ? 'text-rubric' : 'text-muted group-hover:text-rubric'}
                      aria-hidden
                    />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="my-5 border-t border-rule" />

        <NavLink
          to={charismaticNav.to}
          className={({ isActive }) =>
            cn(
              'group relative block px-3 py-2.5 transition-colors',
              isActive ? 'rubric-mark' : '',
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  'flex items-center gap-2 text-[0.875rem] transition-colors',
                  isActive ? 'font-medium text-ink' : 'text-ink-2 group-hover:text-rubric',
                )}
              >
                <FlameIcon active={isActive} />
                {charismaticNav.label}
              </span>
              <span className="mt-0.5 block pl-[22px] text-[0.6875rem] leading-snug text-muted">
                {charismaticNav.description}
              </span>
            </>
          )}
        </NavLink>
      </nav>

      <div className="border-t border-rule px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-[0.625rem] leading-relaxed text-muted">
            Comunitário e open-source
          </p>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

function FlameIcon({ active }: { active: boolean }) {
  const Flame = charismaticNav.icon;
  return (
    <Flame
      size={14}
      strokeWidth={active ? 1.9 : 1.4}
      className={active ? 'text-rubric' : 'text-muted group-hover:text-rubric'}
      aria-hidden
    />
  );
}
