import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Circle,
  Clock,
  Compass,
  Flame,
  GraduationCap,
  HandHeart,
  MapPin,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, LiturgicalColorBadge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useLiturgy } from '../../hooks/useLiturgy';
import { useTodayData } from '../../hooks/useTodayData';
import { useSettings } from '../../hooks/useSettings';
import { getPrayersByCategory } from '../../data/prayers';
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

  const [pending, setPending] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title = 'SOPRO · Hoje';
  }, []);

  // Sincroniza o estado local de hábitos concluídos com o banco.
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

  const morningPrayer = getPrayersByCategory('manha')[0];
  const nightPrayer = getPrayersByCategory('noite')[0];
  const hour = new Date().getHours();
  const suggestedPrayer = hour < 12 ? morningPrayer : nightPrayer;

  const completedIds = completed;

  const toggleHabit = async (habitId: string) => {
    if (completedIds.has(habitId) || pending) return;
    setPending(habitId);
    const habit = habits.find((item) => item.id === habitId);
    // Atualização otimista: só refletimos depois que o dado está no banco.
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
    <div className="space-y-7 animate-[var(--animate-fade-up)]">
      {/* Saudação ------------------------------------------------------- */}
      <header className="space-y-1.5">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-brass">
          {capitalize(formatLongDate(today))}
        </p>
        <h1 className="text-[1.875rem] leading-[1.15] tracking-tight text-ink sm:text-[2.25rem]">
          {greeting}
          {firstName ? `, ${firstName}` : ''}.
        </h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted">
          Que o seu dia comece com calma. Aqui está o essencial, sem excesso.
        </p>
      </header>

      {/* Liturgia ------------------------------------------------------- */}
      <section aria-labelledby="liturgia-do-dia">
        <div className="mb-2.5 flex items-end justify-between gap-3">
          <h2 id="liturgia-do-dia" className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Liturgia do dia
          </h2>
          <Link
            to={`/liturgia/${today}`}
            className="inline-flex items-center gap-1 text-[0.75rem] text-ink-soft transition-colors hover:text-brass"
          >
            Ver completo
            <ArrowRight size={12} aria-hidden />
          </Link>
        </div>

        {loading && !liturgy && (
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
            <LiturgyLoading />
          </div>
        )}

        {error && <LiturgyErrorState error={error} onRetry={() => reload({ force: true })} />}

        {liturgy && celebration && (
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-surface-muted/40 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <LiturgicalColorBadge color={celebration.color} />
                {liturgy.season && <Badge>{liturgy.season.name}</Badge>}
              </div>
              <h3 className="mt-2 font-display text-[1.25rem] leading-snug text-ink">
                {celebration.title}
              </h3>
            </div>
            <div className="px-5 py-4">
              {gospelOption ? (
                <>
                  <p className="flex flex-wrap items-baseline gap-x-2 text-[0.75rem] text-muted">
                    <span className="font-medium uppercase tracking-[0.1em] text-brass">
                      Evangelho
                    </span>
                    {gospelOption.reference && <span>{gospelOption.reference}</span>}
                  </p>
                  <p className="mt-2 line-clamp-4 font-display text-[1.0625rem] leading-relaxed text-ink-soft">
                    {gospelOption.text}
                  </p>
                  <Link
                    to={`/liturgia/${today}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink transition-colors hover:text-brass"
                  >
                    Ler as leituras
                    <ArrowRight size={13} aria-hidden />
                  </Link>
                </>
              ) : (
                <p className="text-[0.8125rem] text-muted">
                  A fonte não disponibilizou leituras para esta data.{' '}
                  <Link to={`/liturgia/${today}`} className="underline decoration-line-strong underline-offset-2">
                    Abrir liturgia
                  </Link>
                </p>
              )}
            </div>
          </Card>
        )}
      </section>

      {/* Rotina espiritual --------------------------------------------- */}
      <section aria-labelledby="rotina">
        <div className="mb-2.5 flex items-end justify-between gap-3">
          <h2 id="rotina" className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Rotina espiritual
          </h2>
          <Link
            to="/caminhada"
            className="inline-flex items-center gap-1 text-[0.75rem] text-ink-soft transition-colors hover:text-brass"
          >
            Ajustar
            <ArrowRight size={12} aria-hidden />
          </Link>
        </div>

        {dataLoading ? (
          <div className="h-24 animate-pulse rounded-[var(--radius-card)] bg-surface-muted" />
        ) : habits.length === 0 ? (
          <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="text-[0.9375rem] text-ink">Nenhum hábito definido</p>
              <p className="text-[0.75rem] leading-relaxed text-muted">
                Escolha as atividades que deseja acompanhar — sem cobranças.
              </p>
            </div>
            <Link
              to="/caminhada"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 py-2 text-[0.75rem] font-medium text-ink transition-colors hover:border-brass/40"
            >
              <Compass size={13} aria-hidden />
              Definir rotina
            </Link>
          </Card>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {habits.map((habit) => {
              const done = completedIds.has(habit.id);
              return (
                <li key={habit.id}>
                  <button
                    type="button"
                    onClick={() => void toggleHabit(habit.id)}
                    disabled={done || pending === habit.id}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors',
                      done
                        ? 'border-brass/25 bg-brass-soft/50 dark:bg-brass-soft/25'
                        : 'border-line bg-surface hover:border-brass/30',
                    )}
                  >
                    {done ? (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brass text-white">
                        <Check size={12} strokeWidth={3} aria-hidden />
                      </span>
                    ) : (
                      <Circle size={20} className="shrink-0 text-line-strong" aria-hidden />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className={cn('block text-[0.875rem]', done ? 'text-ink-soft' : 'text-ink')}>
                        {habit.title}
                      </span>
                      <span className="block text-[0.6875rem] text-muted">{KIND_LABEL[habit.kind]}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-2 text-[0.6875rem] leading-relaxed text-muted">
          Marcar não é obrigação: o registro serve apenas para você perceber o seu ritmo.
        </p>
      </section>

      {/* Compromissos --------------------------------------------------- */}
      <section aria-labelledby="compromissos">
        <div className="mb-2.5 flex items-end justify-between gap-3">
          <h2 id="compromissos" className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Compromissos de hoje
          </h2>
          <Link
            to="/calendario"
            className="inline-flex items-center gap-1 text-[0.75rem] text-ink-soft transition-colors hover:text-brass"
          >
            Calendário
            <ArrowRight size={12} aria-hidden />
          </Link>
        </div>

        {todayOccurrences.length === 0 ? (
          <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="text-[0.9375rem] text-ink">Nada marcado para hoje</p>
              <p className="text-[0.75rem] leading-relaxed text-muted">
                {nextOccurrence
                  ? `Próximo: ${nextOccurrence.event.title} · ${relativeDayLabel(nextOccurrence.date)}`
                  : 'Adicione uma missa, uma confissão ou a reunião do seu grupo.'}
              </p>
            </div>
            <Link
              to="/calendario"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 py-2 text-[0.75rem] font-medium text-ink transition-colors hover:border-brass/40"
            >
              <CalendarDays size={13} aria-hidden />
              Adicionar
            </Link>
          </Card>
        ) : (
          <ul className="space-y-2">
            {todayOccurrences.map((occurrence) => {
              const meta = eventKindMeta(occurrence.event.kind);
              return (
                <li key={`${occurrence.event.id}-${occurrence.date}`}>
                  <Card className="flex items-center gap-3 p-3.5">
                    <span className={cn('size-2 shrink-0 rounded-full', meta.dot)} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.9375rem] text-ink">{occurrence.event.title}</p>
                      <p className="flex flex-wrap items-center gap-x-2.5 text-[0.75rem] text-muted">
                        {occurrence.startTime && (
                          <span className="flex items-center gap-1 tabular-nums">
                            <Clock size={11} aria-hidden />
                            {formatTime(occurrence.startTime)}
                          </span>
                        )}
                        {occurrence.event.location && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin size={11} aria-hidden />
                            {occurrence.event.location}
                          </span>
                        )}
                      </p>
                    </div>
                    <meta.icon size={15} className="shrink-0 text-muted" aria-hidden />
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Grupo de oração ----------------------------------------------- */}
      {nextGroupOccurrence && (
        <section aria-labelledby="grupo">
          <h2 id="grupo" className="mb-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Grupo de oração
          </h2>
          <Card className="flex items-center gap-3.5 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-serenity-soft text-serenity">
              <Users size={18} strokeWidth={1.6} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] text-ink">{nextGroupOccurrence.event.title}</p>
              <p className="text-[0.75rem] text-muted">
                {capitalize(formatShortDate(nextGroupOccurrence.date))}
                {nextGroupOccurrence.startTime ? ` · ${formatTime(nextGroupOccurrence.startTime)}` : ''}
                {' · '}
                <span className="text-brass">{relativeDayLabel(nextGroupOccurrence.date)}</span>
              </p>
            </div>
            <Link
              to="/calendario/grupo-de-oracao"
              className="shrink-0 text-[0.75rem] text-ink-soft transition-colors hover:text-brass"
            >
              Editar
            </Link>
          </Card>
        </section>
      )}

      {/* Próximo compromisso ------------------------------------------ */}
      {nextOccurrence && (
        <section aria-labelledby="proximo">
          <h2 id="proximo" className="mb-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Próximo compromisso
          </h2>
          <Card className="flex items-center gap-3.5 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brass-soft text-brass">
              <CalendarDays size={18} strokeWidth={1.6} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] text-ink">{nextOccurrence.event.title}</p>
              <p className="text-[0.75rem] text-muted">
                {capitalize(formatShortDate(nextOccurrence.date))}
                {nextOccurrence.startTime ? ` · ${formatTime(nextOccurrence.startTime)}` : ''}
                {' · '}
                <span className="text-brass">{relativeDayLabel(nextOccurrence.date)}</span>
              </p>
            </div>
          </Card>
        </section>
      )}

      {/* Sugestões ------------------------------------------------------ */}
      <section aria-labelledby="sugestoes">
        <h2 id="sugestoes" className="mb-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
          Para rezar agora
        </h2>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {suggestedPrayer && (
            <Link to={`/oracoes/${suggestedPrayer.id}`} className="group">
              <Card className="h-full p-4 transition-colors group-hover:border-brass/40 group-hover:bg-surface-muted/40">
                <HandHeart size={16} className="mb-2 text-brass" aria-hidden />
                <p className="font-display text-[0.9375rem] leading-snug text-ink">
                  {suggestedPrayer.title}
                </p>
                <p className="mt-0.5 text-[0.6875rem] text-muted">Oração</p>
              </Card>
            </Link>
          )}
          <Link to="/oracoes" className="group">
            <Card className="h-full p-4 transition-colors group-hover:border-brass/40 group-hover:bg-surface-muted/40">
              <BookOpen size={16} className="mb-2 text-brass" aria-hidden />
              <p className="font-display text-[0.9375rem] leading-snug text-ink">Biblioteca de orações</p>
              <p className="mt-0.5 text-[0.6875rem] text-muted">Todas as categorias</p>
            </Card>
          </Link>
          <Link to="/formacoes" className="group">
            <Card className="h-full p-4 transition-colors group-hover:border-brass/40 group-hover:bg-surface-muted/40">
              <GraduationCap size={16} className="mb-2 text-brass" aria-hidden />
              <p className="font-display text-[0.9375rem] leading-snug text-ink">Formações</p>
              <p className="mt-0.5 text-[0.6875rem] text-muted">Trilhas e documentos</p>
            </Card>
          </Link>
        </div>
      </section>

      <p className="flex items-center gap-2 pt-1 text-[0.6875rem] text-muted">
        <Flame size={12} className="text-brass" aria-hidden />
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
