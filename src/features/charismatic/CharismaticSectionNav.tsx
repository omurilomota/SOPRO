import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { charismaticSections } from './sections';

/**
 * Índice horizontal da área — como as abas de um missal, marcadas por numeral.
 * Fica grudado no topo em telas pequenas para não perder o fio.
 */
export function CharismaticSectionNav() {
  return (
    <nav aria-label="Seções da vida no Espírito" className="-mx-5 sm:-mx-7">
      <ul className="no-scrollbar flex gap-0 overflow-x-auto border-y border-rule px-5 sm:px-7">
        {charismaticSections.map((section) => (
          <li key={section.to} className="shrink-0">
            <NavLink
              to={section.to}
              className={({ isActive }) =>
                cn(
                  'relative flex items-baseline gap-1.5 whitespace-nowrap px-2.5 py-2 text-[0.75rem] transition-colors',
                  isActive ? 'text-ink' : 'text-muted hover:text-rubric',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'numeral text-[0.625rem]',
                      isActive ? 'text-rubric' : 'text-muted/60',
                    )}
                    aria-hidden
                  >
                    {section.mark}
                  </span>
                  <span className={isActive ? 'font-medium' : undefined}>{section.label}</span>
                  {isActive && (
                    <span className="absolute inset-x-2.5 bottom-0 h-[2px] bg-rubric" aria-hidden />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
