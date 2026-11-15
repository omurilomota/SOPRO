import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  /** Rótulo de rubrica curto — ex.: "Nada aqui ainda". */
  label: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Estado vazio: um filete duplo e duas linhas de texto.
 * Sem ícone gigante, sem caixa pontilhada, sem ilustração.
 */
export function EmptyState({ label, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('border-y border-rule py-7', className)}>
      <p className="rubric mb-1.5">{label}</p>
      <p className="max-w-[46ch] font-display text-[0.9375rem] leading-relaxed text-ink-2">
        {description}
      </p>
      {action && <div className="mt-3.5">{action}</div>}
    </div>
  );
}
