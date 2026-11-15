import { ChevronLeft, ChevronRight, Clock, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { Meta } from '../../components/ui/Marks';
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

/**
 * Calendário.
 *
 * A grade é do próprio sistema: filetes de 1px, dia atual em tinta cheia,
 * marcadores como pontos de cor litúrgica. Nada de sombras ou células com
 * fundo colorido.
 */
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

  const openNew = () => {
    setEditing(undefined);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6 animate-[var(--animate-fade)]">
      <PageHeader
        label="Calendário"
        title="Seus compromissos"
        description="Missas, confissões, formações e o seu grupo de oração. Tudo armazenado apenas neste dispositivo."
        action={
          <Button variant="solid" size="sm" onClick={openNew}>
            <Plus size={13} aria-hidden />
            Compromisso
          </Button>
        }
      />

      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <Link to="/calendario/grupo-de-oracao" className="group border-t border-rule pt-2.5">
          <span className="flex items-baseline justify-between gap-2">
            <span className="font-display text-[0.9375rem] text-ink transition-colors group-hover:text-rubric">
              Meu grupo de oração
            </span>
            <ChevronRight size={13} className="shrink-0 text-muted" aria-hidden />
          </span>
          <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-muted">
            {groups.length === 0
              ? 'Cadastre o dia e o horário da reunião'
              : groups
                  .map((group) => `${WEEKDAY_SHORT[group.weekday]} ${formatTime(group.startTime)}`)
                  .join(' · ')}
          </span>
        </Link>

        <button type="button" onClick={exportICS} className="group border-t border-rule pt-2.5 text-left">
          <span className="flex items-baseline justify-between gap-2">
            <span className="font-display text-[0.9375rem] text-ink transition-colors group-hover:text-rubric">
              Exportar calendário
            </span>
            <ChevronRight size={13} className="shrink-0 text-muted" aria-hidden />
          </span>
          <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-muted">
            Arquivo .ics para o calendário do seu celular
          </span>
        </button>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-y border-rule py-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => shift(-1)}
              className="p-1 text-muted transition-colors hover:text-rubric"
              aria-label={view === 'month' ? 'Mês anterior' : 'Semana anterior'}
            >
              <ChevronLeft size={15} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              className="p-1 text-muted transition-colors hover:text-rubric"
              aria-label={view === 'month' ? 'Próximo mês' : 'Próxima semana'}
            >
              <ChevronRight size={15} aria-hidden />
            </button>
            <h2 className="font-display text-[1rem] capitalize text-ink">
              {view === 'month'
                ? capitalize(formatMonthYear(cursor))
                : `Semana de ${formatShortDate(toISODate(days[0] ?? cursor))}`}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const today = fromISODate(todayISO());
                setCursor(today);
                setSelectedDate(todayISO());
              }}
              className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-rubric"
            >
              Hoje
            </button>
            <div className="flex gap-3" role="group" aria-label="Visualização">
              {(['month', 'week'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setView(option)}
                  aria-pressed={view === option}
                  className={cn(
                    'border-b pb-px text-[0.6875rem] uppercase tracking-[0.1em] transition-colors',
                    view === option
                      ? 'border-rubric text-rubric'
                      : 'border-transparent text-muted hover:text-ink-2',
                  )}
                >
                  {option === 'month' ? 'Mês' : 'Semana'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-rule text-center">
          {WEEKDAY_SHORT.map((label) => (
            <span
              key={label}
              className="py-1.5 text-[0.5625rem] uppercase tracking-[0.12em] text-muted"
            >
              {label}
            </span>
          ))}
        </div>

        <div
          className={cn(
            'grid grid-cols-7 border-l border-rule',
            view === 'month' ? 'auto-rows-[3.1rem] sm:auto-rows-[3.75rem]' : 'auto-rows-[5rem]',
          )}
        >
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
                  'relative flex flex-col items-center gap-1 border-b border-r border-rule p-1.5 transition-colors',
                  selected && 'bg-paper-2',
                  !selected && 'hover:bg-paper-2/60',
                  !inCurrentMonth && 'opacity-35',
                )}
              >
                <span
                  className={cn(
                    'flex size-[22px] items-center justify-center text-[0.75rem] tabular-nums',
                    isToday(iso) ? 'bg-ink font-medium text-paper' : 'text-ink-2',
                  )}
                >
                  {day.getDate()}
                </span>
                {dayOccurrences.length > 0 && (
                  <span className="flex flex-wrap items-center justify-center gap-[3px]">
                    {dayOccurrences.slice(0, 3).map((occurrence, index) => (
                      <span
                        key={`${occurrence.event.id}-${index}`}
                        className={cn('size-[5px] rounded-full', eventKindMeta(occurrence.event.kind).dot)}
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
      </div>

      <section className="space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 className="font-display text-[1.0625rem] text-ink">
              {isToday(selectedDate) ? 'Hoje' : capitalize(formatShortDate(selectedDate))}
            </h2>
            <p className="text-[0.75rem] text-muted">
              {selectedOccurrences.length === 0
                ? 'Nenhum compromisso para este dia.'
                : `${selectedOccurrences.length} compromisso${selectedOccurrences.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={openNew}>
            <Plus size={13} aria-hidden />
            Adicionar
          </Button>
        </div>

        {loading ? (
          <div className="h-16 animate-pulse bg-paper-2" />
        ) : selectedOccurrences.length === 0 ? (
          <EmptyState
            label="Dia livre"
            description="Adicione uma missa, uma confissão ou a reunião do seu grupo de oração."
          />
        ) : (
          <ul className="ruled border-y border-rule">
            {selectedOccurrences.map((occurrence) => {
              const meta = eventKindMeta(occurrence.event.kind);
              return (
                <li
                  key={`${occurrence.event.id}-${occurrence.date}`}
                  className="flex items-start gap-3 py-3"
                >
                  <span
                    className={cn('mt-[7px] size-[7px] shrink-0 rounded-full', meta.dot)}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] leading-snug text-ink">{occurrence.event.title}</p>
                    <p className="mt-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-[0.75rem] text-muted">
                      <span>{meta.label}</span>
                      {occurrence.startTime && (
                        <span className="flex items-center gap-1 tabular-nums">
                          <Clock size={10} aria-hidden />
                          {formatTime(occurrence.startTime)}
                          {occurrence.event.endTime && ` – ${formatTime(occurrence.event.endTime)}`}
                        </span>
                      )}
                      {occurrence.event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={10} aria-hidden />
                          {occurrence.event.location}
                        </span>
                      )}
                      {occurrence.isRecurring && <span className="text-rubric">repete</span>}
                    </p>
                    {occurrence.event.notes && (
                      <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">
                        {occurrence.event.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(occurrence.event);
                        setFormOpen(true);
                      }}
                      className="p-1 text-muted transition-colors hover:text-ink"
                      aria-label={`Editar ${occurrence.event.title}`}
                    >
                      <Pencil size={13} aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(occurrence.event)}
                      className="p-1 text-muted transition-colors hover:text-rubric"
                      aria-label={`Excluir ${occurrence.event.title}`}
                    >
                      <Trash2 size={13} aria-hidden />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-t border-rule pt-3">
        <Meta>Tipos</Meta>
        {EVENT_KINDS.map((kind) => (
          <span key={kind.id} className="flex items-center gap-1.5 text-[0.6875rem] text-ink-2">
            <span className={cn('size-[6px] rounded-full', kind.dot)} aria-hidden />
            {kind.label}
          </span>
        ))}
      </div>

      <p className="max-w-[62ch] text-[0.75rem] leading-relaxed text-muted">
        Para uma novena com data de início e fim, crie um compromisso do tipo “Novena”, marque a
        repetição semanal ou mensal e defina até quando ela vai. Os hábitos diários ficam em{' '}
        <Link to="/caminhada" className="underline decoration-rule-strong underline-offset-2 hover:text-rubric">
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
