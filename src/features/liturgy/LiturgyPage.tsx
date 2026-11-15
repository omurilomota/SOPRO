import { ChevronLeft, ChevronRight, Info, CalendarDays } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
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
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <PageHeader
        eyebrow="Liturgia diária"
        title={capitalize(formatLongDate(date))}
        description={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Leituras da Missa segundo o calendário local.</span>
            <span className="text-muted/70">·</span>
            <span className="text-brass">{relativeDayLabel(date)}</span>
          </span>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Button variant="secondary" size="sm" onClick={() => goTo(addDaysISO(date, -1))} aria-label="Dia anterior">
            <ChevronLeft size={15} aria-hidden />
            Anterior
          </Button>
          {date !== today && (
            <Button variant="ghost" size="sm" onClick={() => goTo(today)}>
              Hoje
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={() => goTo(addDaysISO(date, 1))} aria-label="Próximo dia">
            Próximo
            <ChevronRight size={15} aria-hidden />
          </Button>
        </div>

        <label className="flex items-center gap-2 text-[0.75rem] text-muted">
          <CalendarDays size={14} aria-hidden />
          <span className="sr-only sm:not-sr-only">Ir para a data</span>
          <input
            type="date"
            value={date}
            onChange={(event) => {
              if (isValidISODate(event.target.value)) goTo(event.target.value);
            }}
            className="rounded-lg border border-line-strong bg-surface px-2 py-1.5 text-[0.75rem] text-ink-soft"
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
        <Card className="p-5 sm:p-7">
          {liturgy.season && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge tone="brass">{liturgy.season.name}</Badge>
              {fromCache && <Badge>Do cache local</Badge>}
            </div>
          )}
          <CelebrationView celebration={celebration} />
        </Card>
      )}

      {alternatives.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base text-ink">Outras celebrações do dia</h2>
          {alternatives.map((item) => (
            <Card key={item.id} className="p-5">
              <CelebrationView celebration={item} showEucharisticPrayers={false} />
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-3 rounded-[var(--radius-card)] border border-line bg-surface-muted/40 p-4 text-[0.75rem] leading-relaxed text-muted">
        <p className="flex items-start gap-2">
          <Info size={14} className="mt-0.5 shrink-0 text-brass" aria-hidden />
          <span>
            Fonte dos textos litúrgicos:{' '}
            {liturgyProviderInfo.homepage ? (
              <a
                href={liturgyProviderInfo.homepage}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink-soft underline decoration-line-strong underline-offset-2 hover:text-brass"
              >
                {liturgyProviderInfo.name}
              </a>
            ) : (
              liturgyProviderInfo.name
            )}
            . O SOPRO não é responsável pela exatidão nem pela disponibilidade dos conteúdos de
            terceiros e não redistribui esse material — ele é exibido ao usuário a partir da fonte.
            Em caso de divergência, prevalece o Missal Romano.
          </span>
        </p>
        <p className="flex items-start gap-2">
          <Info size={14} className="mt-0.5 shrink-0 text-brass" aria-hidden />
          <span>
            A última liturgia consultada fica guardada neste dispositivo para leitura offline.
            Saiba mais em{' '}
            <Link to="/privacidade" className="text-ink-soft underline decoration-line-strong underline-offset-2">
              privacidade
            </Link>
            .
          </span>
        </p>
      </div>

      <div className="pt-1">
        <ButtonLink to="/oracoes" variant="ghost" size="sm">
          Rezar depois da liturgia
          <ChevronRight size={14} aria-hidden />
        </ButtonLink>
      </div>
    </div>
  );
}
