import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Plus,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../components/ui/Button';
import { Meta, Reference, Rubric } from '../../components/ui/Marks';
import { Flush, Section } from '../../components/ui/Structure';
import { useLiturgy } from '../../hooks/useLiturgy';
import { useTodayData } from '../../hooks/useTodayData';
import { useSettings } from '../../hooks/useSettings';
import { getPrayersByCategory } from '../../data/prayers';
import { svesSessions } from '../../data/rcc/sves';
import { activityLogRepository, habitCompletionRepository } from '../../services/storage/repositories';
import type { HabitKind } from '../../types/spiritual-life';
import { createId } from '../../utils/id';
import { cn } from '../../utils/cn';
import {
  capitalize,
  formatLongDate,
  formatShortDate,
  formatTime,
  relativeDayLabel,
  todayISO,
} from '../../utils/date';
import { eventKindMeta } from '../calendar/eventMeta';
import { useRccProgress } from '../charismatic/useRccProgress';
import { LiturgyErrorState, LiturgyLoading } from '../liturgy/components/LiturgyStatus';

const KIND_LABEL: Record<HabitKind, string> = {
  'oracao-manha': 'Oração da manhã',
  'leitura-biblica': 'Leitura bíblica',
  terco: 'Terço',
  adoracao: 'Adoração',
  'exame-consciencia': 'Exame de consciência',
  'leitura-espiritual': 'Leitura espiritual',
  jejum: 'Jejum',
  outro: 'Atividade',
};

/**
 * Tela de abertura: o "ordinário do dia".
 *
 * Deliberadamente sóbria: data, liturgia, rotina marcável, compromissos.
 * A leitura é vertical e contínua, como uma página de livro — não uma grade
 * de cartões com números grandes em cima.
 */
export default function TodayPage() {
  const today = todayISO();
  const { settings } = useSettings();
  const { liturgy, loading, error, reload } = useLiturgy(today);
  const {
    loading: dataLoading,
    todayOccurrences,
    nextOccurrence,
    nextGroupOccurrence,
    habits,
    completionsToday,
  } = useTodayData();
  const sves = useRccProgress('sves');

  const [pending, setPending] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title = 'SOPRO · Hoje';
  }, []);

  useEffect(() => {
    setCompleted(new Set(completionsToday.map((item) => item.habitId)));
  }, [completionsToday]);

  // Reconsulta a liturgia quando o dia vira (app aberto durante a madrugada).
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 30);
    const timeout = window.setTimeout(() => reload(), midnight.getTime() - now.getTime());
    return () => window.clearTimeout(timeout);
  }, [reload]);

  const greeting = greetingForHour(new Date().getHours());
  const firstName = settings?.name?.trim().split(' ')[0] ?? null;
  const celebration = liturgy?.celebrations.find((item) => item.isPrimary) ?? liturgy?.celebrations[0];
  const gospel = celebration?.readings.find((reading) => reading.kind === 'gospel');
  const gospelOption = gospel?.options[0];

  const hour = new Date().getHours();
  const suggestedPrayer = getPrayersByCategory(hour < 12 ? 'manha' : 'noite')[0];

  const nextSves = svesSessions[sves.completedCount] ?? null;

  const toggleHabit = async (habitId: string) => {
    if (completed.has(habitId) || pending) return;
    setPending(habitId);
    const habit = habits.find((item) => item.id === habitId);
    try {
      await habitCompletionRepository.put({
        id: createId('done'),
        habitId,
        date: today,
        createdAt: new Date().toISOString(),
      });
      await activityLogRepository.put({
        id: createId('act'),
        kind: 'habito',
        label: habit?.title ?? KIND_LABEL[habit?.kind ?? 'outro'],
        date: today,
        createdAt: new Date().toISOString(),
      });
      setCompleted((current) => new Set(current).add(habitId));
    } catch {
      window.alert('Não foi possível registrar agora. Tente novamente.');
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="stack-loose animate-[var(--animate-fade)]">
      {/* Abertura ------------------------------------------------------- */}
      <header className="space-y-3">
        <p className="rubric">{capitalize(formatLongDate(today))}</p>
        <h1 className="text-[2rem] leading-[1.08] text-ink sm:text-[2.5rem]">
          {greeting}
          {firstName ? `, ${firstName}` : ''}.
        </h1>
        <div className="h-px bg-rule" />
        <p className="max-w-[52ch] text-[0.875rem] leading-relaxed text-muted">
          O essencial do dia, sem excesso. Nada aqui é enviado a servidor algum.
        </p>
      </header>

      {/* Liturgia ------------------------------------------------------- */}
      <Section
        label="Liturgia do dia"
        action={
          <Link
            to={`/liturgia/${today}`}
            className="inline-flex items-center gap-1 text-[0.8125rem] text-ink-2 transition-colors hover:text-rubric"
          >
            Ver completo
            <ArrowRight size={12} aria-hidden />
          </Link>
        }
      >
        {loading && !liturgy && <LiturgyLoading />}
        {error && <LiturgyErrorState error={error} onRetry={() => reload({ force: true })} />}

        {liturgy && celebration && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-[1.375rem] leading-snug text-ink">
                {celebration.title}
              </h3>
              {liturgy.season && <Meta>{liturgy.season.name}</Meta>}
            </div>

            {gospelOption ? (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <Rubric>Evangelho</Rubric>
                  {gospelOption.reference && <Reference>{gospelOption.reference}</Reference>}
                </div>
                <p className="reading line-clamp-5 border-l-2 border-rule pl-4">
                  {gospelOption.text}
                </p>
                <Link
                  to={`/liturgia/${today}`}
                  className="inline-flex items-center gap-1.5 border-b border-rule-strong pb-0.5 text-[0.875rem] text-ink transition-colors hover:border-rubric hover:text-rubric"
                >
                  Ler as leituras
                  <ArrowRight size={13} aria-hidden />
                </Link>
              </>
            ) : (
              <p className="text-[0.875rem] text-muted">
                A fonte não disponibilizou leituras para esta data.{' '}
                <Link to={`/liturgia/${today}`} className="underline underline-offset-2">
                  Abrir liturgia
                </Link>
              </p>
            )}
          </div>
        )}
      </Section>

      {/* Rotina --------------------------------------------------------- */}
      <Section
        label="Rotina espiritual"
        action={
          <Link
            to="/caminhada"
            className="text-[0.8125rem] text-ink-2 transition-colors hover:text-rubric"
          >
            Ajustar
          </Link>
        }
      >
        {dataLoading ? (
          <div className="h-20 animate-pulse bg-paper-2" />
        ) : habits.length === 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-rule py-4">
            <div className="min-w-0">
              <p className="text-[0.9375rem] text-ink">Nenhum hábito definido</p>
              <p className="text-[0.8125rem] leading-relaxed text-muted">
                Escolha as atividades que deseja acompanhar — sem cobranças.
              </p>
            </div>
            <ButtonLink to="/caminhada" variant="outline" size="sm">
              Definir rotina
            </ButtonLink>
          </div>
        ) : (
          <ul className="ruled border-y border-rule">
            {habits.map((habit) => {
              const done = completed.has(habit.id);
              return (
                <li key={habit.id}>
                  <button
                    type="button"
                    onClick={() => void toggleHabit(habit.id)}
                    disabled={done || pending === habit.id}
                    className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:text-rubric disabled:cursor-default"
                  >
                    <span
                      className={cn(
                        'flex size-[15px] shrink-0 items-center justify-center rounded-none border transition-colors',
                        done ? 'border-rubric bg-rubric text-paper' : 'border-rule-strong',
                      )}
                      aria-hidden
                    >
                      {done && <Check size={10} strokeWidth={3} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block text-[0.9375rem]',
                          done ? 'text-muted line-through decoration-rule-strong' : 'text-ink',
                        )}
                      >
                        {habit.title}
                      </span>
                      <span className="block text-[0.75rem] uppercase tracking-[0.1em] text-muted">
                        {KIND_LABEL[habit.kind]}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <p className="text-[0.75rem] leading-relaxed text-muted">
          Marcar não é obrigação: o registro serve apenas para você perceber o seu ritmo.
        </p>
      </Section>

      {/* Compromissos --------------------------------------------------- */}
      <Section
        label="Compromissos de hoje"
        action={
          <Link
            to="/calendario"
            className="text-[0.8125rem] text-ink-2 transition-colors hover:text-rubric"
          >
            Calendário
          </Link>
        }
      >
        {dataLoading ? (
          <div className="h-16 animate-pulse bg-paper-2" />
        ) : todayOccurrences.length === 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-rule py-4">
            <div className="min-w-0">
              <p className="text-[0.9375rem] text-ink">Nada marcado para hoje</p>
              <p className="text-[0.8125rem] leading-relaxed text-muted">
                {nextOccurrence
                  ? `Próximo: ${nextOccurrence.event.title} · ${relativeDayLabel(nextOccurrence.date)}`
                  : 'Adicione uma missa, uma confissão ou a reunião do seu grupo.'}
              </p>
            </div>
            <ButtonLink to="/calendario" variant="outline" size="sm">
              <Plus size={13} aria-hidden />
              Adicionar
            </ButtonLink>
          </div>
        ) : (
          <ul className="ruled border-y border-rule">
            {todayOccurrences.map((occurrence) => {
              const meta = eventKindMeta(occurrence.event.kind);
              return (
                <li
                  key={`${occurrence.event.id}-${occurrence.date}`}
                  className="flex items-baseline gap-3 py-3"
                >
                  <span
                    className={cn('size-[7px] shrink-0 translate-y-[-2px] rounded-full', meta.dot)}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] text-ink">{occurrence.event.title}</p>
                    <p className="flex flex-wrap items-center gap-x-2.5 text-[0.8125rem] text-muted">
                      {occurrence.startTime && (
                        <span className="flex items-center gap-1 tabular-nums">
                          <Clock size={10} aria-hidden />
                          {formatTime(occurrence.startTime)}
                        </span>
                      )}
                      {occurrence.event.location && (
                        <span className="flex items-center gap-1 truncate">
                          <MapPin size={10} aria-hidden />
                          {occurrence.event.location}
                        </span>
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {nextOccurrence && todayOccurrences.length > 0 && (
          <p className="flex flex-wrap items-baseline gap-x-2 text-[0.8125rem] text-muted">
            <Meta>Próximo</Meta>
            <span className="text-ink-2">{nextOccurrence.event.title}</span>
            <span>
              {capitalize(formatShortDate(nextOccurrence.date))} ·{' '}
              {relativeDayLabel(nextOccurrence.date)}
            </span>
          </p>
        )}
      </Section>

      {/* Grupo de oração ------------------------------------------------ */}
      {nextGroupOccurrence && (
        <Flush className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 px-1 py-3">
          <div className="min-w-0">
            <Rubric>Grupo de oração</Rubric>
            <p className="mt-1 text-[0.9375rem] text-ink">{nextGroupOccurrence.event.title}</p>
            <p className="text-[0.8125rem] text-muted">
              {capitalize(formatShortDate(nextGroupOccurrence.date))}
              {nextGroupOccurrence.startTime ? ` · ${formatTime(nextGroupOccurrence.startTime)}` : ''}
              {' · '}
              <span className="text-rubric">{relativeDayLabel(nextGroupOccurrence.date)}</span>
            </p>
          </div>
          <Link
            to="/carismatico/grupo-de-oracao"
            className="text-[0.8125rem] text-ink-2 transition-colors hover:text-rubric"
          >
            Como funciona
          </Link>
        </Flush>
      )}

      {/* Vida no Espírito ----------------------------------------------- */}
      <Section
        label="Vida no Espírito"
        action={
          <Link
            to="/carismatico"
            className="inline-flex items-center gap-1 text-[0.8125rem] text-ink-2 transition-colors hover:text-rubric"
          >
            Abrir área
            <ArrowRight size={12} aria-hidden />
          </Link>
        }
      >
        <div className="border-y border-rule py-4">
          {nextSves ? (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-[1.125rem] leading-snug text-ink">
                  Semana {nextSves.number} — {nextSves.title}
                </h3>
                <Meta>
                  {sves.completedCount}/{svesSessions.length} do SVES
                </Meta>
              </div>
              <p className="mt-2 max-w-[56ch] text-[0.875rem] leading-relaxed text-ink-2">
                {nextSves.theme}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <Link
                  to="/carismatico/sves"
                  className="inline-flex items-center gap-1.5 border-b border-rule-strong pb-0.5 text-[0.875rem] text-ink transition-colors hover:border-rubric hover:text-rubric"
                >
                  Continuar o seminário
                  <ArrowRight size={13} aria-hidden />
                </Link>
                <Reference>{nextSves.scripture[0]}</Reference>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-display text-[1.125rem] leading-snug text-ink">
                Seminário concluído
              </h3>
              <p className="mt-2 max-w-[56ch] text-[0.875rem] leading-relaxed text-ink-2">
                O próximo passo do caminho é o Módulo Básico da formação. Ele é longo por um motivo:
                sem base, o serviço vira improviso.
              </p>
              <Link
                to="/carismatico/formacao"
                className="mt-2 inline-flex items-center gap-1.5 border-b border-rule-strong pb-0.5 text-[0.875rem] text-ink transition-colors hover:border-rubric hover:text-rubric"
              >
                Ver o processo formativo
                <ArrowRight size={13} aria-hidden />
              </Link>
            </>
          )}
        </div>
      </Section>

      {/* Para rezar agora ----------------------------------------------- */}
      <Section label="Para rezar agora">
        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-3">
          {suggestedPrayer && (
            <Link to={`/oracoes/${suggestedPrayer.id}`} className="group border-t border-rule pt-2.5">
              <p className="font-display text-[0.9375rem] leading-snug text-ink transition-colors group-hover:text-rubric">
                {suggestedPrayer.title}
              </p>
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">Oração</p>
            </Link>
          )}
          <Link to="/oracoes" className="group border-t border-rule pt-2.5">
            <p className="font-display text-[0.9375rem] leading-snug text-ink transition-colors group-hover:text-rubric">
              Biblioteca de orações
            </p>
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">Todas as categorias</p>
          </Link>
          <Link to="/formacoes" className="group border-t border-rule pt-2.5">
            <p className="font-display text-[0.9375rem] leading-snug text-ink transition-colors group-hover:text-rubric">
              Formações
            </p>
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">Trilhas e documentos</p>
          </Link>
        </div>
      </Section>

      <p className="flex items-center gap-1.5 text-[0.75rem] text-muted">
        <CalendarDays size={11} aria-hidden />
        Tudo o que você vê aqui está salvo apenas neste dispositivo.
      </p>
    </div>
  );
}

function greetingForHour(hour: number): string {
  if (hour < 5) return 'Boa madrugada';
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}
