import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonLink } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { Meta } from '../../components/ui/Marks';
import { Section } from '../../components/ui/Structure';
import { useLiturgy } from '../../hooks/useLiturgy';
import { liturgyProviderInfo } from '../../services/liturgy';
import {
  addDaysISO,
  capitalize,
  formatLongDate,
  isValidISODate,
  relativeDayLabel,
  todayISO,
} from '../../utils/date';
import { CelebrationView } from './components/LiturgyCelebration';
import { LiturgyErrorState, LiturgyLoading, StaleNotice } from './components/LiturgyStatus';

/**
 * Liturgia diária.
 *
 * A data vem da rota (`/liturgia/2026-11-15`); o conteúdo exibido é sempre o
 * da data pedida e o cabeçalho mostra explicitamente qual data é aquela.
 */
export default function LiturgyPage() {
  const { date: dateParam } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const today = todayISO();

  const date = dateParam && isValidISODate(dateParam) ? dateParam : today;
  const { liturgy, loading, error, staleWarning, fromCache, reload } = useLiturgy(date);

  useEffect(() => {
    document.title = `Liturgia de ${formatLongDate(date)} · SOPRO`;
  }, [date]);

  const goTo = (target: string) => navigate(`/liturgia/${target}`);

  const celebration = useMemo(() => {
    if (!liturgy) return null;
    return liturgy.celebrations.find((item) => item.isPrimary) ?? liturgy.celebrations[0] ?? null;
  }, [liturgy]);

  const alternatives = useMemo(
    () => liturgy?.celebrations.filter((item) => item !== celebration) ?? [],
    [liturgy, celebration],
  );

  return (
    <div className="space-y-7 animate-[var(--animate-fade)]">
      <PageHeader
        label="Liturgia diária"
        title={capitalize(formatLongDate(date))}
        description={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Leituras da Missa segundo o calendário local.</span>
            <span className="text-muted/60">·</span>
            <span className="text-rubric">{relativeDayLabel(date)}</span>
          </span>
        }
        action={
          <div className="flex items-center gap-1">
            <Button
              variant="quiet"
              size="sm"
              onClick={() => goTo(addDaysISO(date, -1))}
              aria-label="Dia anterior"
              className="px-1.5"
            >
              <ChevronLeft size={16} aria-hidden />
            </Button>
            {date !== today && (
              <Button variant="quiet" size="sm" onClick={() => goTo(today)}>
                Hoje
              </Button>
            )}
            <Button
              variant="quiet"
              size="sm"
              onClick={() => goTo(addDaysISO(date, 1))}
              aria-label="Próximo dia"
              className="px-1.5"
            >
              <ChevronRight size={16} aria-hidden />
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {liturgy?.season && <Meta>{liturgy.season.name}</Meta>}
          {fromCache && (
            <>
              {liturgy?.season && <span className="text-rule-strong">·</span>}
              <Meta>Do cache local</Meta>
            </>
          )}
        </div>

        <label className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <CalendarDays size={13} aria-hidden />
          <span className="sr-only sm:not-sr-only">Ir para a data</span>
          <input
            type="date"
            value={date}
            onChange={(event) => {
              if (isValidISODate(event.target.value)) goTo(event.target.value);
            }}
            className="border-0 border-b border-rule-strong bg-transparent px-0 py-1 text-[0.8125rem] text-ink-2 focus:border-rubric focus:outline-none"
          />
        </label>
      </div>

      {staleWarning && (
        <StaleNotice
          message="Mostrando a última liturgia salva neste dispositivo — não foi possível atualizá-la agora."
          onRetry={() => reload({ force: true })}
        />
      )}

      {loading && !liturgy && <LiturgyLoading />}

      {!loading && error && <LiturgyErrorState error={error} onRetry={() => reload({ force: true })} />}

      {liturgy && celebration && (
        <article className="pt-1">
          <CelebrationView celebration={celebration} />
        </article>
      )}

      {alternatives.length > 0 && (
        <Section label="Outras celebrações do dia">
          <div className="ruled">
            {alternatives.map((item) => (
              <div key={item.id} className="py-5 first:pt-2 last:pb-0">
                <CelebrationView celebration={item} showEucharisticPrayers={false} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <div className="border-t border-rule pt-3 text-[0.75rem] leading-relaxed text-muted">
        <p>
          Fonte dos textos litúrgicos:{' '}
          {liturgyProviderInfo.homepage ? (
            <a
              href={liturgyProviderInfo.homepage}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-rule-strong underline-offset-2 hover:text-rubric"
            >
              {liturgyProviderInfo.name}
            </a>
          ) : (
            liturgyProviderInfo.name
          )}
          . O SOPRO não redistribui esse material: ele é exibido a partir da fonte. Em caso de
          divergência, prevalece o Missal Romano.
        </p>
        <p className="mt-2">
          A última liturgia consultada fica guardada neste dispositivo para leitura offline. Saiba
          mais em{' '}
          <ButtonLink
            to="/privacidade"
            variant="quiet"
            size="sm"
            className="h-auto p-0 text-[0.75rem] underline decoration-rule-strong underline-offset-2"
          >
            privacidade
          </ButtonLink>
          .
        </p>
      </div>
    </div>
  );
}
