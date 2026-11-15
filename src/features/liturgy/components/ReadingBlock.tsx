import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { LiturgyReading } from '../../../types/liturgy';
import { cn } from '../../../utils/cn';

/**
 * Bloco de leitura com suporte a "formas" alternativas (longa/breve).
 * Quando há mais de uma opção, o usuário escolhe qual está sendo proclamada.
 */
export function ReadingBlock({ reading }: { reading: LiturgyReading }) {
  const [selected, setSelected] = useState(0);
  const option = reading.options[selected] ?? reading.options[0];
  if (!option) return null;

  const isPsalm = reading.kind === 'psalm';

  return (
    <article className="space-y-3">
      <header className="space-y-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-[0.9375rem] font-medium uppercase tracking-[0.09em] text-brass">
            {reading.label}
          </h3>
          {option.reference && (
            <span className="font-display text-sm text-muted">{option.reference}</span>
          )}
        </div>
        {reading.options.length > 1 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5" role="group" aria-label="Forma da leitura">
            {reading.options.map((candidate, index) => (
              <button
                key={candidate.reference ?? index}
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={index === selected}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-[0.6875rem] transition-colors',
                  index === selected
                    ? 'border-brass/40 bg-brass-soft text-brass-strong dark:text-brass'
                    : 'border-line text-muted hover:border-line-strong hover:text-ink-soft',
                )}
              >
                {shortenReference(candidate.reference) ?? `Opção ${index + 1}`}
              </button>
            ))}
          </div>
        )}
      </header>

      {option.title && (
        <p className="font-display text-[1.0625rem] italic leading-snug text-ink-soft">
          {option.title}
        </p>
      )}

      {isPsalm && option.refrain && (
        <p className="rounded-lg border border-brass/20 bg-brass-soft/70 px-3.5 py-2.5 font-display text-[1.0625rem] leading-snug text-ink dark:bg-brass-soft/40">
          <span className="mr-1.5 text-[0.625rem] uppercase tracking-[0.12em] text-brass-strong dark:text-brass">
            Refrão
          </span>
          {option.refrain}
        </p>
      )}

      <div className="prose-reading">{option.text}</div>
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

/** Acordeão simples para orações e antífonas — conteúdo secundário. */
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
    <div className="rounded-xl border border-line bg-surface-muted/50">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[0.8125rem] font-medium text-ink-soft"
      >
        {title}
        <ChevronDown
          size={15}
          className={cn('shrink-0 text-muted transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && <div className="border-t border-line px-3.5 py-3">{children}</div>}
    </div>
  );
}
