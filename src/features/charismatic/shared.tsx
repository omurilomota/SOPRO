import type { ReactNode } from 'react';
import { Reference, Rubric } from '../../components/ui/Marks';
import { cn } from '../../utils/cn';

export const charitableDisclaimer =
  'O SOPRO é um projeto comunitário e independente. Não é um aplicativo oficial da RCCBRASIL, de diocese ou de qualquer instituição eclesial. As sínteses são escritas pela própria equipe a partir de fontes públicas — documentos da CNBB, do Magistério e materiais de formação amplamente divulgados — e não substituem a apostila oficial, o encontro presencial nem o acompanhamento do seu pároco.';

/** Lista de referências em bloco, como uma nota erudita ao pé do texto. */
export function Refs({ label = 'Referências', items }: { label?: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-3 border-t border-rule pt-2.5">
      <Rubric className="text-[0.6875rem]">{label}</Rubric>
      <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
        {items.map((item, index) => (
          <span key={item}>
            {index > 0 && <span className="mx-1.5 text-rule-strong">·</span>}
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Cabeçalho de verbete: numeral, nome e referência escriturística. */
export function EntryHeader({
  mark,
  title,
  reference,
}: {
  mark: string;
  title: string;
  reference: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="numeral shrink-0" aria-hidden>
        {mark}
      </span>
      <div className="min-w-0">
        <h2 className="font-display text-[1.125rem] leading-snug text-ink">{title}</h2>
        <Reference>{reference}</Reference>
      </div>
    </div>
  );
}

/** Bloco de advertência pastoral: filete de rubrica à esquerda, sem caixa. */
export function Caution({ title = 'Cuidado pastoral', children }: { title?: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-rubric/50 pl-3.5">
      <p className="rubric text-[0.6875rem]">{title}</p>
      <div className="mt-1 text-[0.875rem] leading-relaxed text-ink-2">{children}</div>
    </div>
  );
}

/** Lista com marcadores tipográficos — sem bolinhas de template. */
export function DashList({
  items,
  className,
  tone = 'neutral',
}: {
  items: string[];
  className?: string;
  tone?: 'neutral' | 'rubric';
}) {
  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-[0.875rem] leading-relaxed text-ink-2">
          <span className={tone === 'rubric' ? 'text-rubric' : 'text-muted'} aria-hidden>
            —
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
