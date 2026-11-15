import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
  /** Rubrica acima do título — versalete vermelho. */
  label?: string;
  title: string;
  /** Linha de contexto abaixo do título (serifada, discreta). */
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  /** Título grande de abertura de tela. */
  display?: boolean;
}

/**
 * Cabeçalho de tela.
 *
 * Estrutura: rubrica → título serifado → filete → contexto.
 * O filete abaixo do título é o gesto central do sistema.
 */
export function PageHeader({
  label,
  title,
  description,
  action,
  className,
  display = true,
}: PageHeaderProps) {
  return (
    <header className={cn('space-y-3', className)}>
      {label && <p className="rubric">{label}</p>}

      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h1
          className={cn(
            'text-ink',
            display
              ? 'text-[1.875rem] leading-[1.18] tracking-[-0.012em] sm:text-[2.125rem]'
              : 'text-[1.5rem] leading-snug',
          )}
        >
          {title}
        </h1>
        {action && <div className="shrink-0 pb-0.5">{action}</div>}
      </div>

      <div className="h-px bg-rule" />

      {description && (
        <div className="max-w-[56ch] text-[0.9375rem] leading-[1.75] text-muted">{description}</div>
      )}
    </header>
  );
}
