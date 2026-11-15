import { LiturgicalColorMark } from '../../../components/ui/Marks';
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
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <LiturgicalColorMark color={celebration.color} />
          {!celebration.isPrimary && <span className="rubric-muted text-[0.625rem]">Alternativa</span>}
        </div>
        <h2 className="text-[1.5rem] leading-tight text-ink sm:text-[1.75rem]">{celebration.title}</h2>
      </header>

      {celebration.readings.length === 0 ? (
        <p className="border-y border-rule py-6 font-display text-[0.9375rem] italic leading-relaxed text-muted">
          A fonte não disponibilizou as leituras para esta celebração.
        </p>
      ) : (
        <div className="ruled border-t border-rule">
          {celebration.readings.map((reading, index) => (
            <div key={`${reading.label}-${index}`} className="py-5 first:pt-4 last:pb-0">
              <ReadingBlock reading={reading} />
            </div>
          ))}
        </div>
      )}

      {showEucharisticPrayers && (hasPrayers || hasAntiphons || prayers.extras.length > 0) && (
        <div>
          <p className="section-rule mb-1">
            <span className="rubric whitespace-nowrap">Orações e antífonas</span>
          </p>

          {antiphons.entrance && (
            <Disclosure title="Antífona de entrada">
              <p className="reading-sm">{antiphons.entrance}</p>
            </Disclosure>
          )}
          {prayers.collect && (
            <Disclosure title="Oração coleta">
              <p className="reading-sm">{prayers.collect}</p>
            </Disclosure>
          )}
          {prayers.offerings && (
            <Disclosure title="Oração sobre as oferendas">
              <p className="reading-sm">{prayers.offerings}</p>
            </Disclosure>
          )}
          {antiphons.communion && (
            <Disclosure title="Antífona da comunhão">
              <p className="reading-sm">{antiphons.communion}</p>
            </Disclosure>
          )}
          {prayers.communion && (
            <Disclosure title="Oração após a comunhão">
              <p className="reading-sm">{prayers.communion}</p>
            </Disclosure>
          )}
          {prayers.extras.map((extra, index) => (
            <Disclosure key={`${extra.title}-${index}`} title={extra.title}>
              <p className="reading-sm">{extra.text}</p>
            </Disclosure>
          ))}
        </div>
      )}
    </div>
  );
}
