import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { LiturgyReading } from '../../../types/liturgy';
import { cn } from '../../../utils/cn';

/**
 * Bloco de leitura.
 *
 * No sistema "Missal" a leitura é tipografia: rubrica para o nome do
 * ministério, referência em itálico serifado e o texto em coluna de leitura.
 * Sem cartão em volta — o filete do container já separa.
 */
export function ReadingBlock({ reading }: { reading: LiturgyReading }) {
  const [selected, setSelected] = useState(0);
  const option = reading.options[selected] ?? reading.options[0];
  if (!option) return null;

  const isPsalm = reading.kind === 'psalm';

  return (
    <article className="space-y-2.5">
      <header className="space-y-1.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="rubric">{reading.label}</h3>
          {option.reference && (
            <span className="font-display text-[0.8125rem] italic text-muted [font-variant-numeric:oldstyle-nums]">
              {option.reference}
            </span>
          )}
        </div>
        {reading.options.length > 1 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5" role="group" aria-label="Forma da leitura">
            <span className="rubric-muted text-[0.5625rem]">Forma</span>
            {reading.options.map((candidate, index) => (
              <button
                key={candidate.reference ?? index}
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={index === selected}
                className={cn(
                  'border-b pb-px text-[0.6875rem] transition-colors',
                  index === selected
                    ? 'border-rubric text-rubric'
                    : 'border-transparent text-muted hover:text-ink-2',
                )}
              >
                {shortenReference(candidate.reference) ?? `Opção ${index + 1}`}
              </button>
            ))}
          </div>
        )}
      </header>

      {option.title && (
        <p className="font-display text-[1.0625rem] italic leading-snug text-ink">{option.title}</p>
      )}

      {isPsalm && option.refrain && (
        <p className="border-l-2 border-rubric/40 pl-3 font-display text-[1.0625rem] leading-snug text-ink">
          <span className="rubric mr-2 align-[0.1em] text-[0.5625rem]">Refrão</span>
          {option.refrain}
        </p>
      )}

      <div className="reading">{option.text}</div>
    </article>
  );
}

function shortenReference(reference: string | null): string | null {
  if (!reference) return null;
  const match = /\((.*?)\)/.exec(reference);
  if (match?.[1]) return match[1];
  if (reference.length > 34) return reference.slice(0, 32) + '…';
  return reference;
}

/** Acordeão para orações e antífonas — conteúdo secundário da celebração. */
export function Disclosure({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-rule last:border-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-2.5 text-left text-[0.875rem] text-ink-2 transition-colors hover:text-rubric"
      >
        {title}
        <ChevronDown
          size={14}
          className={cn('shrink-0 text-muted transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && <div className="pb-3.5">{children}</div>}
    </div>
  );
}
