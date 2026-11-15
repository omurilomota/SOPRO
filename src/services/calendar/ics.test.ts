import { describe, expect, it } from 'vitest';
import type { CalendarEvent } from '../../types/calendar';
import { eventsToICS } from './ics';

function event(overrides: Partial<CalendarEvent> = {}): CalendarEvent {
  return {
    id: 'evt-1',
    title: 'Missa',
    kind: 'missa',
    date: '2026-11-15',
    startTime: '19:30',
    endTime: '20:30',
    location: 'Paróquia São José',
    notes: null,
    recurrence: { frequency: 'none' },
    prayerGroupId: null,
    createdAt: '',
    updatedAt: '',
    ...overrides,
  };
}

describe('exportação ICS', () => {
  it('gera um calendário válido com CRLF', () => {
    const ics = eventsToICS([event()]);
    expect(ics.startsWith('BEGIN:VCALENDAR')).toBe(true);
    expect(ics.trimEnd().endsWith('END:VCALENDAR')).toBe(true);
    expect(ics).toContain('\r\n');
    expect(ics.split('\r\n').filter((line) => line === 'BEGIN:VEVENT')).toHaveLength(1);
  });

  it('converte data e horário em formato flutuante local', () => {
    const ics = eventsToICS([event()]);
    expect(ics).toContain('DTSTART:20261115T193000');
    expect(ics).toContain('DTEND:20261115T203000');
  });

  it('escapa caracteres reservados do formato', () => {
    const ics = eventsToICS([
      event({ title: 'Missa; especial, com vírgula', notes: 'Linha 1\nLinha 2' }),
    ]);
    expect(ics).toContain('SUMMARY:Missa\\; especial\\, com vírgula (Missa)');
    expect(ics).toContain('DESCRIPTION:Linha 1\\nLinha 2');
  });

  it('converte recorrência semanal em RRULE', () => {
    const ics = eventsToICS([event({ recurrence: { frequency: 'weekly', until: '2026-12-31' } })]);
    expect(ics).toContain('RRULE:FREQ=WEEKLY;UNTIL=20261231T235959');
  });

  it('converte recorrência bissemanal com INTERVAL', () => {
    const ics = eventsToICS([event({ recurrence: { frequency: 'biweekly' } })]);
    expect(ics).toContain('RRULE:FREQ=WEEKLY;INTERVAL=2');
  });

  it('não inclui RRULE quando não há repetição', () => {
    const ics = eventsToICS([event()]);
    expect(ics).not.toContain('RRULE');
  });

  it('dobra linhas longas respeitando o limite de 75 octetos', () => {
    const longTitle = 'A'.repeat(200);
    const ics = eventsToICS([event({ title: longTitle })]);
    for (const line of ics.split('\r\n')) {
      expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    }
  });

  it('gera calendário vazio válido sem eventos', () => {
    const ics = eventsToICS([]);
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).not.toContain('BEGIN:VEVENT');
  });
});
