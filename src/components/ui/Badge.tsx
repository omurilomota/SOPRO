import type { ReactNode } from 'react';
import type { LiturgicalColor } from '../../types/common';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: 'neutral' | 'brass' | 'serenity';
}

export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  const tones = {
    neutral: 'bg-surface-muted text-ink-soft border-line',
    brass: 'bg-brass-soft text-brass-strong border-brass/25 dark:text-brass',
    serenity: 'bg-serenity-soft text-serenity border-serenity/20',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export const LITURGICAL_COLOR_LABEL: Record<LiturgicalColor, string> = {
  verde: 'Verde',
  vermelho: 'Vermelho',
  roxo: 'Roxo',
  rosa: 'Rosa',
  branco: 'Branco',
  desconhecida: 'Cor não informada',
};

const COLOR_DOT: Record<LiturgicalColor, string> = {
  verde: 'bg-liturgy-green',
  vermelho: 'bg-liturgy-red',
  roxo: 'bg-liturgy-purple',
  rosa: 'bg-liturgy-rose',
  branco: 'bg-liturgy-white',
  desconhecida: 'bg-muted',
};

export function LiturgicalColorBadge({ color }: { color: LiturgicalColor }) {
  return (
    <Badge>
      <span className={cn('size-2 rounded-full', COLOR_DOT[color])} aria-hidden />
      {LITURGICAL_COLOR_LABEL[color]}
    </Badge>
  );
}
