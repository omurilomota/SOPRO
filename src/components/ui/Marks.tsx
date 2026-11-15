import type { ReactNode } from 'react';
import type { LiturgicalColor } from '../../types/common';
import { cn } from '../../utils/cn';

/* ==========================================================================
   Marcadores tipográficos. No sistema "Missal" não existem pílulas coloridas:
   informação de estado se escreve em versalete, com um filete ou um ponto.
   ========================================================================== */

/** Rótulo de rubrica avulso — "MEMÓRIA", "TEMPO COMUM", "REPETE". */
export function Rubric({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('rubric', className)}>{children}</span>;
}

/** Rótulo neutro, para metadados que não precisam de destaque. */
export function Meta({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('rubric-muted', className)}>{children}</span>;
}

/** Referência bíblica ou eclesial: itálico serifado, como numa nota erudita. */
export function Reference({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'font-display text-[0.8125rem] italic text-muted [font-variant-numeric:oldstyle-nums]',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Ponto de cor litúrgica com rótulo em texto. */
const COLOR_INFO: Record<LiturgicalColor, { label: string; className: string }> = {
  verde: { label: 'Verde', className: 'bg-liturgia-verde' },
  vermelho: { label: 'Vermelho', className: 'bg-liturgia-vermelho' },
  roxo: { label: 'Roxo', className: 'bg-liturgia-roxo' },
  rosa: { label: 'Rosa', className: 'bg-liturgia-rosa' },
  branco: { label: 'Branco', className: 'bg-liturgia-branco' },
  desconhecida: { label: 'Cor não informada', className: 'bg-rule-strong' },
};

export function LiturgicalColorMark({ color }: { color: LiturgicalColor }) {
  const info = COLOR_INFO[color];
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.6875rem] text-muted">
      <span className={cn('size-[7px] rounded-full ring-1 ring-black/5', info.className)} aria-hidden />
      {info.label}
    </span>
  );
}

/** Marca de estado com filete: discreta, sem fundo. */
export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'rubric' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border-b pb-px text-[0.6875rem] font-medium tracking-[0.06em]',
        tone === 'rubric'
          ? 'border-rubric/35 text-rubric'
          : 'border-rule-strong text-muted',
      )}
    >
      {children}
    </span>
  );
}
