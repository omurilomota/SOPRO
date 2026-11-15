import { LiturgicalColorBadge } from '../../../components/ui/Badge';
import type { LiturgyCelebration as Celebration } from '../../../types/liturgy';
import { Disclosure, ReadingBlock } from './ReadingBlock';

interface Props {
  celebration: Celebration;
  /** Mostra o bloco de orações e antífonas eucarísticas. */
  showEucharisticPrayers?: boolean;
}

export function CelebrationView({ celebration, showEucharisticPrayers = true }: Props) {
  const { prayers, antiphons } = celebration;
  const hasPrayers = Boolean(prayers.collect || prayers.offerings || prayers.communion);
  const hasAntiphons = Boolean(antiphons.entrance || antiphons.communion);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <LiturgicalColorBadge color={celebration.color} />
          {!celebration.isPrimary && (
            <span className="rounded-full border border-line bg-surface-muted px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.1em] text-muted">
              Celebração alternativa
            </span>
          )}
        </div>
        <h2 className="text-[1.375rem] leading-snug text-ink sm:text-[1.5rem]">
          {celebration.title}
        </h2>
      </header>

      {celebration.readings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line-strong bg-surface-muted/50 px-4 py-6 text-center text-sm text-muted">
          A fonte não disponibilizou as leituras para esta celebração.
        </p>
      ) : (
        <div className="divide-y divide-line">
          {celebration.readings.map((reading, index) => (
            <div key={`${reading.label}-${index}`} className="py-5 first:pt-0 last:pb-0">
              <ReadingBlock reading={reading} />
            </div>
          ))}
        </div>
      )}

      {showEucharisticPrayers && (hasPrayers || hasAntiphons || prayers.extras.length > 0) && (
        <div className="space-y-2">
          <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Orações e antífonas
          </h3>

          {antiphons.entrance && (
            <Disclosure title="Antífona de entrada">
              <p className="prose-reading text-[0.9375rem]">{antiphons.entrance}</p>
            </Disclosure>
          )}
          {prayers.collect && (
            <Disclosure title="Oração coleta">
              <p className="prose-reading text-[0.9375rem]">{prayers.collect}</p>
            </Disclosure>
          )}
          {prayers.offerings && (
            <Disclosure title="Oração sobre as oferendas">
              <p className="prose-reading text-[0.9375rem]">{prayers.offerings}</p>
            </Disclosure>
          )}
          {antiphons.communion && (
            <Disclosure title="Antífona da comunhão">
              <p className="prose-reading text-[0.9375rem]">{antiphons.communion}</p>
            </Disclosure>
          )}
          {prayers.communion && (
            <Disclosure title="Oração após a comunhão">
              <p className="prose-reading text-[0.9375rem]">{prayers.communion}</p>
            </Disclosure>
          )}
          {prayers.extras.map((extra, index) => (
            <Disclosure key={`${extra.title}-${index}`} title={extra.title}>
              <p className="prose-reading text-[0.9375rem]">{extra.text}</p>
            </Disclosure>
          ))}
        </div>
      )}
    </div>
  );
}
