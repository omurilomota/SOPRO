import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

/* ==========================================================================
   Estrutura de página.
   A hierarquia vem de filetes e da tipografia — não de sombras e cantos
   arredondados. `.plate` é o único container com moldura, e deve ser raro.
   ========================================================================== */

export function Plate({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('plate', className)} {...props} />;
}

/** Faixa delimitada apenas por filetes superior e inferior. */
export function Flush({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('plate-flush', className)} {...props} />;
}

interface SectionProps {
  /** Rótulo de rubrica à esquerda do filete. */
  label?: string;
  /** Título serifado opcional, abaixo do rótulo. */
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
  /** `rule` = rótulo + filete. `plain` = apenas rótulo. */
  variant?: 'rule' | 'plain';
}

export function Section({
  label,
  title,
  description,
  action,
  children,
  className,
  id,
  variant = 'rule',
}: SectionProps) {
  return (
    <section id={id} className={cn('space-y-3', className)} aria-label={label ?? title}>
      {(label || title || action) && (
        <header className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-4">
            {label ? (
              <div className={variant === 'rule' ? 'section-rule flex-1' : ''}>
                <span className="rubric whitespace-nowrap">{label}</span>
              </div>
            ) : (
              <span />
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
          {title && (
            <h2 className="text-[1.0625rem] leading-snug text-ink">{title}</h2>
          )}
          {description && (
            <p className="text-[0.8125rem] leading-relaxed text-muted">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
