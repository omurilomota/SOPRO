import {
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { useToast } from '../../components/ui/Toast';
import { useCalendarEvents, usePrayerGroups } from '../../hooks/useCalendar';
import { downloadICS } from '../../services/calendar/ics';
import { occurrencesInRange } from '../../services/calendar/recurrence';
import type { CalendarEvent } from '../../types/calendar';
import {
  WEEKDAY_SHORT,
  addDaysISO,
  capitalize,
  formatMonthYear,
  formatShortDate,
  formatTime,
  fromISODate,
  isToday,
  monthGrid,
  todayISO,
  toISODate,
  weekDays,
} from '../../utils/date';
import { cn } from '../../utils/cn';
import { EVENT_KINDS, eventKindMeta } from './eventMeta';
import { EventFormModal, type EventDraft } from './EventFormModal';

type View = 'month' | 'week';

export default function CalendarPage() {
  const { items, loading, create, save, remove } = useCalendarEvents();
  const { items: groups } = usePrayerGroups();
  const { notify } = useToast();

  const [view, setView] = useState<View>('month');
  const [cursor, setCursor] = useState(() => fromISODate(todayISO()));
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<CalendarEvent | undefined>(undefined);

  const days = useMemo(
    () => (view === 'month' ? monthGrid(cursor) : weekDays(cursor)),
    [view, cursor],
  );

  const rangeStart = toISODate(days[0] ?? cursor);
  const rangeEnd = toISODate(days[days.length - 1] ?? cursor);

  const occurrences = useMemo(
    () => occurrencesInRange(items, rangeStart, rangeEnd),
    [items, rangeStart, rangeEnd],
  );

  const byDate = useMemo(() => {
    const map = new Map<string, typeof occurrences>();
    for (const occurrence of occurrences) {
      const list = map.get(occurrence.date) ?? [];
      list.push(occurrence);
      map.set(occurrence.date, list);
    }
    return map;
  }, [occurrences]);

  const selectedOccurrences = byDate.get(selectedDate) ?? [];

  const shift = (direction: number) => {
    if (view === 'month') {
      const next = new Date(cursor);
      next.setMonth(cursor.getMonth() + direction);
      setCursor(next);
    } else {
      setCursor(fromISODate(addDaysISO(toISODate(cursor), direction * 7)));
    }
  };

  const handleSubmit = async (draft: EventDraft) => {
    if (editing) {
      await save({ ...editing, ...draft });
      notify('Compromisso atualizado.');
    } else {
      await create(draft);
      notify('Compromisso salvo neste dispositivo.');
    }
    setEditing(undefined);
  };

  const handleDelete = async (event: CalendarEvent) => {
    if (!window.confirm(`Excluir "${event.title}"? Essa ação não pode ser desfeita.`)) return;
    await remove(event.id);
    notify('Compromisso excluído.');
  };

  const exportICS = () => {
    if (items.length === 0) {
      notify('Não há compromissos para exportar.', 'info');
      return;
    }
    downloadICS(items);
    notify('Arquivo .ics gerado. Abra-o em seu calendário.');
  };

  return (
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <PageHeader
        eyebrow="Calendário"
        title="Seus compromissos"
        description="Missas, confissões, formações, retiros e o seu grupo de oração. Tudo armazenado apenas neste dispositivo."
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setEditing(undefined);
                setFormOpen(true);
              }}
            >
              <Plus size={14} aria-hidden />
              Compromisso
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/calendario/grupo-de-oracao" className="group">
          <Card className="flex h-full items-center gap-3 p-4 transition-colors group-hover:border-brass/40 group-hover:bg-surface-muted/40">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-serenity-soft text-serenity">
              <Users size={18} strokeWidth={1.6} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-ink">Meu grupo de oração</span>
              <span className="block truncate text-[0.75rem] text-muted">
                {groups.length === 0
                  ? 'Cadastre o dia e o horário da reunião'
                  : groups
                      .map((group) => `${WEEKDAY_SHORT[group.weekday]} ${formatTime(group.startTime)}`)
                      .join(' · ')}
              </span>
            </span>
            <ChevronRight size={15} className="shrink-0 text-muted" aria-hidden />
          </Card>
        </Link>

        <Card className="flex items-center gap-3 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brass-soft text-brass">
            <Download size={17} strokeWidth={1.6} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-ink">Exportar calendário</span>
            <span className="block text-[0.75rem] text-muted">Arquivo .ics para o seu app</span>
          </span>
          <Button variant="ghost" size="sm" onClick={exportICS}>
            Exportar
          </Button>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => shift(-1)}
              className="rounded-full p-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-ink"
              aria-label={view === 'month' ? 'Mês anterior' : 'Semana anterior'}
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              className="rounded-full p-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-ink"
              aria-label={view === 'month' ? 'Próximo mês' : 'Próxima semana'}
            >
              <ChevronRight size={16} aria-hidden />
            </button>
            <h2 className="ml-1 font-display text-[0.9375rem] capitalize text-ink sm:text-base">
              {view === 'month'
                ? capitalize(formatMonthYear(cursor))
                : `Semana de ${formatShortDate(toISODate(days[0] ?? cursor))}`}
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const today = fromISODate(todayISO());
                setCursor(today);
                setSelectedDate(todayISO());
              }}
              className="rounded-full px-2.5 py-1 text-[0.6875rem] text-muted transition-colors hover:bg-surface-muted hover:text-ink"
            >
              Hoje
            </button>
            <div className="flex rounded-full border border-line p-0.5" role="group" aria-label="Visualização">
              {(['month', 'week'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setView(option)}
                  aria-pressed={view === option}
                  className={cn(
                    'rounded-full px-2.5 py-1 text-[0.6875rem] transition-colors',
                    view === option ? 'bg-ink text-canvas' : 'text-muted hover:text-ink',
                  )}
                >
                  {option === 'month' ? 'Mês' : 'Semana'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-line bg-surface-muted/40 text-center">
          {WEEKDAY_SHORT.map((label) => (
            <span key={label} className="py-1.5 text-[0.625rem] uppercase tracking-[0.08em] text-muted">
              {label}
            </span>
          ))}
        </div>

        <div className={cn('grid grid-cols-7', view === 'month' ? 'auto-rows-[3.25rem] sm:auto-rows-[4rem]' : 'auto-rows-[5rem]')}>
          {days.map((day) => {
            const iso = toISODate(day);
            const inCurrentMonth = view === 'week' || day.getMonth() === cursor.getMonth();
            const dayOccurrences = byDate.get(iso) ?? [];
            const selected = iso === selectedDate;

            return (
              <button
                key={iso}
                type="button"
                onClick={() => setSelectedDate(iso)}
                aria-pressed={selected}
                aria-label={`${formatShortDate(iso)} — ${dayOccurrences.length} compromisso(s)`}
                className={cn(
                  'group relative flex flex-col items-center gap-1 border-b border-r border-line/60 p-1.5 transition-colors last:border-r-0',
                  selected ? 'bg-brass-soft/60 dark:bg-brass-soft/30' : 'hover:bg-surface-muted/50',
                  !inCurrentMonth && 'opacity-40',
                )}
              >
                <span
                  className={cn(
                    'flex size-6 items-center justify-center rounded-full text-[0.75rem] tabular-nums',
                    isToday(iso) ? 'bg-ink font-medium text-canvas' : 'text-ink-soft',
                  )}
                >
                  {day.getDate()}
                </span>
                {dayOccurrences.length > 0 && (
                  <span className="flex flex-wrap items-center justify-center gap-0.5">
                    {dayOccurrences.slice(0, 3).map((occurrence, index) => (
                      <span
                        key={`${occurrence.event.id}-${index}`}
                        className={cn('size-1.5 rounded-full', eventKindMeta(occurrence.event.kind).dot)}
                      />
                    ))}
                    {dayOccurrences.length > 3 && (
                      <span className="text-[0.5rem] leading-none text-muted">+</span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-base text-ink">
              {isToday(selectedDate) ? 'Hoje' : capitalize(formatShortDate(selectedDate))}
            </h2>
            <p className="text-[0.75rem] text-muted">
              {selectedOccurrences.length === 0
                ? 'Nenhum compromisso para este dia.'
                : `${selectedOccurrences.length} compromisso${selectedOccurrences.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setEditing(undefined);
              setFormOpen(true);
            }}
          >
            <CalendarPlus size={14} aria-hidden />
            Adicionar
          </Button>
        </div>

        {loading ? (
          <div className="h-20 animate-pulse rounded-xl bg-surface-muted" />
        ) : selectedOccurrences.length === 0 ? (
          <EmptyState
            compact
            icon={CalendarPlus}
            title="Dia livre"
            description="Adicione uma missa, uma confissão ou a reunião do seu grupo de oração."
          />
        ) : (
          <ul className="space-y-2">
            {selectedOccurrences.map((occurrence) => {
              const meta = eventKindMeta(occurrence.event.kind);
              return (
                <li key={`${occurrence.event.id}-${occurrence.date}`}>
                  <Card className="flex items-start gap-3 p-3.5">
                    <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', meta.dot)} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9375rem] font-medium leading-snug text-ink">
                        {occurrence.event.title}
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[0.75rem] text-muted">
                        <span className="flex items-center gap-1">
                          <meta.icon size={12} aria-hidden />
                          {meta.label}
                        </span>
                        {occurrence.startTime && (
                          <span className="flex items-center gap-1 tabular-nums">
                            <Clock size={12} aria-hidden />
                            {formatTime(occurrence.startTime)}
                            {occurrence.event.endTime && ` – ${formatTime(occurrence.event.endTime)}`}
                          </span>
                        )}
                        {occurrence.event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} aria-hidden />
                            {occurrence.event.location}
                          </span>
                        )}
                        {occurrence.isRecurring && <span className="text-brass">repete</span>}
                      </p>
                      {occurrence.event.notes && (
                        <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">
                          {occurrence.event.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(occurrence.event);
                          setFormOpen(true);
                        }}
                        className="rounded-full p-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                        aria-label={`Editar ${occurrence.event.title}`}
                      >
                        <Pencil size={13} aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(occurrence.event)}
                        className="rounded-full p-1.5 text-muted transition-colors hover:bg-liturgy-red/8 hover:text-liturgy-red"
                        aria-label={`Excluir ${occurrence.event.title}`}
                      >
                        <Trash2 size={13} aria-hidden />
                      </button>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface-muted/40 px-3.5 py-2.5">
        <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">Tipos</span>
        {EVENT_KINDS.map((kind) => (
          <span key={kind.id} className="flex items-center gap-1.5 text-[0.6875rem] text-ink-soft">
            <span className={cn('size-1.5 rounded-full', kind.dot)} aria-hidden />
            {kind.label}
          </span>
        ))}
      </div>

      <p className="text-[0.75rem] leading-relaxed text-muted">
        Para uma novena com data de início e fim, crie um compromisso do tipo “Novena”, marque a
        repetição semanal ou mensal e defina até quando ela vai. Os hábitos diários ficam em{' '}
        <Link to="/caminhada" className="underline decoration-line-strong underline-offset-2">
          Minha caminhada
        </Link>
        .
      </p>

      <EventFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(undefined);
        }}
        onSubmit={handleSubmit}
        initialDate={selectedDate}
        {...(editing ? { event: editing } : {})}
      />
    </div>
  );
}
