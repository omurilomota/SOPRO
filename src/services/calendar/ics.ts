import type { CalendarEvent, EventKind } from '../../types/calendar';
import { addDaysISO } from '../../utils/date';

/**
 * Exportação de compromissos em formato iCalendar (RFC 5545).
 *
 * Geramos o arquivo inteiramente no dispositivo: nenhum dado é enviado a
 * servidores. Recorrências simples são convertidas em RRULE padrão.
 */

const KIND_LABEL: Record<EventKind, string> = {
  'grupo-oracao': 'Grupo de Oração',
  missa: 'Missa',
  confissao: 'Confissão',
  formacao: 'Formação',
  retiro: 'Retiro',
  novena: 'Novena',
  adoracao: 'Adoração',
  outro: 'Compromisso',
};

/** Escapa texto conforme RFC 5545 (3.3.11). */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** Dobra linhas em 75 octetos, conforme RFC 5545 (3.1). */
function foldLine(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;

  const chunks: string[] = [];
  let current = '';
  let currentBytes = 0;

  for (const char of line) {
    const charBytes = new TextEncoder().encode(char).length;
    if (currentBytes + charBytes > 74) {
      chunks.push(current);
      current = ' ' + char;
      currentBytes = 1 + charBytes;
    } else {
      current += char;
      currentBytes += charBytes;
    }
  }
  if (current) chunks.push(current);
  return chunks.join('\r\n');
}

function toLocalDateTime(date: string, time: string | null, fallbackHour: number): string {
  const [year, month, day] = date.split('-');
  if (time) {
    const [hour = '00', minute = '00'] = time.split(':');
    return `${year}${month}${day}T${hour.padStart(2, '0')}${minute.padStart(2, '0')}00`;
  }
  return `${year}${month}${day}T${String(fallbackHour).padStart(2, '0')}0000`;
}

function buildRRule(event: CalendarEvent): string | null {
  const until = event.recurrence.until
    ? `;UNTIL=${event.recurrence.until.replace(/-/g, '')}T235959`
    : '';

  switch (event.recurrence.frequency) {
    case 'weekly':
      return `FREQ=WEEKLY${until}`;
    case 'biweekly':
      return `FREQ=WEEKLY;INTERVAL=2${until}`;
    case 'monthly':
      return `FREQ=MONTHLY${until}`;
    default:
      return null;
  }
}

function buildEvent(event: CalendarEvent): string[] {
  const startHour = event.startTime ? Number(event.startTime.slice(0, 2)) : 9;
  const endDate = event.endTime && event.endTime < (event.startTime ?? '00:00')
    ? addDaysISO(event.date, 1)
    : event.date;

  const lines: string[] = [
    'BEGIN:VEVENT',
    `UID:${event.id}@sopro.local`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${toLocalDateTime(event.date, event.startTime, startHour)}`,
    `DTEND:${toLocalDateTime(endDate, event.endTime, startHour + 1)}`,
    `SUMMARY:${escapeText(`${event.title} (${KIND_LABEL[event.kind]})`)}`,
  ];

  if (event.location) lines.push(`LOCATION:${escapeText(event.location)}`);
  if (event.notes) lines.push(`DESCRIPTION:${escapeText(event.notes)}`);
  lines.push('CATEGORIES:SOPRO');

  const rrule = buildRRule(event);
  if (rrule) lines.push(`RRULE:${rrule}`);

  lines.push('END:VEVENT');
  return lines;
}

export function eventsToICS(events: CalendarEvent[], calendarName = 'SOPRO'): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SOPRO//Vida Espiritual Catolica//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(calendarName)}`,
    ...events.flatMap(buildEvent),
    'END:VCALENDAR',
  ];

  return lines.map(foldLine).join('\r\n') + '\r\n';
}

export function downloadICS(events: CalendarEvent[], filename = 'sopro-compromissos.ics'): void {
  const content = eventsToICS(events);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export { KIND_LABEL };
