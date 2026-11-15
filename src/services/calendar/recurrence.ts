import type { CalendarEvent, EventOccurrence } from '../../types/calendar';
import type { ISODate } from '../../types/common';
import { addDaysISO, diffInDays, fromISODate, toISODate } from '../../utils/date';

/**
 * Expansão de recorrências, em calendário local.
 *
 * Regras (todas testadas):
 * - `none`: ocorre apenas na data original;
 * - `weekly` / `biweekly`: ocorre no dia da semana da data original, a cada
 *   1 ou 2 semanas, respeitando `until`;
 * - `monthly`: ocorre no mesmo dia do mês da data original; meses sem esse
 *   dia (ex.: 31) são ignorados, em vez de "vazar" para o mês seguinte.
 */

export function occursOn(event: CalendarEvent, date: ISODate): boolean {
  if (event.recurrence.frequency === 'none') return event.date === date;

  if (date < event.date) return false;
  if (event.recurrence.until && date > event.recurrence.until) return false;

  const delta = diffInDays(date, event.date);
  if (delta < 0) return false;

  switch (event.recurrence.frequency) {
    case 'weekly':
      return delta % 7 === 0;
    case 'biweekly':
      return delta % 14 === 0;
    case 'monthly': {
      const target = fromISODate(event.date);
      const candidate = fromISODate(date);
      if (candidate.getDate() !== target.getDate()) return false;
      const months =
        (candidate.getFullYear() - target.getFullYear()) * 12 +
        (candidate.getMonth() - target.getMonth());
      return months >= 0;
    }
    default:
      return false;
  }
}

/** Todas as datas em que o evento ocorre dentro de uma janela (inclusive). */
export function expandEvent(
  event: CalendarEvent,
  rangeStart: ISODate,
  rangeEnd: ISODate,
): ISODate[] {
  if (event.recurrence.frequency === 'none') {
    return event.date >= rangeStart && event.date <= rangeEnd ? [event.date] : [];
  }

  const dates: ISODate[] = [];
  const effectiveStart = event.date > rangeStart ? event.date : rangeStart;
  const effectiveEnd =
    event.recurrence.until && event.recurrence.until < rangeEnd ? event.recurrence.until : rangeEnd;

  if (effectiveStart > effectiveEnd) return [];

  if (event.recurrence.frequency === 'monthly') {
    const target = fromISODate(event.date);
    const cursor = fromISODate(effectiveStart);
    const end = fromISODate(effectiveEnd);
    let year = cursor.getFullYear();
    let month = cursor.getMonth();
    while (year < end.getFullYear() || (year === end.getFullYear() && month <= end.getMonth())) {
      const candidate = new Date(year, month, target.getDate(), 12, 0, 0, 0);
      if (candidate.getMonth() === month) {
        const iso = toISODate(candidate);
        if (iso >= effectiveStart && iso <= effectiveEnd) dates.push(iso);
      }
      month += 1;
      if (month > 11) {
        month = 0;
        year += 1;
      }
    }
    return dates;
  }

  const step = event.recurrence.frequency === 'biweekly' ? 14 : 7;
  let cursor = effectiveStart;
  // Alinha o cursor com o dia da semana original.
  const offset = diffInDays(cursor, event.date) % step;
  if (offset !== 0) cursor = addDaysISO(cursor, step - offset);

  while (cursor <= effectiveEnd) {
    dates.push(cursor);
    cursor = addDaysISO(cursor, step);
  }

  return dates;
}

/** Ocorrências ordenadas por data e horário. */
export function occurrencesInRange(
  events: CalendarEvent[],
  rangeStart: ISODate,
  rangeEnd: ISODate,
): EventOccurrence[] {
  const occurrences: EventOccurrence[] = [];

  for (const event of events) {
    for (const date of expandEvent(event, rangeStart, rangeEnd)) {
      occurrences.push({
        event,
        date,
        startTime: event.startTime,
        isRecurring: event.recurrence.frequency !== 'none',
      });
    }
  }

  return occurrences.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    const timeA = a.startTime ?? '99:99';
    const timeB = b.startTime ?? '99:99';
    return timeA.localeCompare(timeB);
  });
}

export function nextOccurrence(
  events: CalendarEvent[],
  from: ISODate,
  horizonDays = 120,
): EventOccurrence | null {
  const rangeEnd = addDaysISO(from, horizonDays);
  const occurrences = occurrencesInRange(events, from, rangeEnd);
  return occurrences[0] ?? null;
}
