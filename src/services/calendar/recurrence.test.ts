import { describe, expect, it } from 'vitest';
import type { CalendarEvent } from '../../types/calendar';
import { expandEvent, nextOccurrence, occurrencesInRange, occursOn } from './recurrence';

function makeEvent(overrides: Partial<CalendarEvent> = {}): CalendarEvent {
  return {
    id: 'evt',
    title: 'Grupo de Oração',
    kind: 'grupo-oracao',
    date: '2026-11-04', // quarta-feira
    startTime: '19:30',
    endTime: '21:00',
    location: null,
    notes: null,
    recurrence: { frequency: 'none' },
    prayerGroupId: null,
    createdAt: '',
    updatedAt: '',
    ...overrides,
  };
}

describe('recorrência de compromissos', () => {
  it('evento sem recorrência ocorre só na data original', () => {
    const event = makeEvent();
    expect(occursOn(event, '2026-11-04')).toBe(true);
    expect(occursOn(event, '2026-11-11')).toBe(false);
    expect(expandEvent(event, '2026-11-01', '2026-11-30')).toEqual(['2026-11-04']);
  });

  it('recorrência semanal cai sempre no mesmo dia da semana', () => {
    const event = makeEvent({ recurrence: { frequency: 'weekly' } });
    const dates = expandEvent(event, '2026-11-01', '2026-11-30');
    expect(dates).toEqual(['2026-11-04', '2026-11-11', '2026-11-18', '2026-11-25']);
    for (const date of dates) {
      expect(new Date(`${date}T12:00:00`).getDay()).toBe(3); // quarta
    }
  });

  it('recorrência bissemanal salta uma semana', () => {
    const event = makeEvent({ recurrence: { frequency: 'biweekly' } });
    expect(expandEvent(event, '2026-11-01', '2026-12-05')).toEqual([
      '2026-11-04',
      '2026-11-18',
      '2026-12-02',
    ]);
  });

  it('respeita a data final (until) da recorrência', () => {
    const event = makeEvent({ recurrence: { frequency: 'weekly', until: '2026-11-18' } });
    expect(expandEvent(event, '2026-11-01', '2026-12-31')).toEqual([
      '2026-11-04',
      '2026-11-11',
      '2026-11-18',
    ]);
  });

  it('não gera ocorrências antes da data original', () => {
    const event = makeEvent({ recurrence: { frequency: 'weekly' } });
    expect(expandEvent(event, '2026-10-01', '2026-11-05')).toEqual(['2026-11-04']);
  });

  it('recorrência mensal mantém o dia do mês', () => {
    const event = makeEvent({ recurrence: { frequency: 'monthly' } });
    const dates = expandEvent(event, '2026-11-01', '2027-02-28');
    expect(dates).toEqual(['2026-11-04', '2026-12-04', '2027-01-04', '2027-02-04']);
  });

  it('recorrência mensal em dia 31 ignora meses sem esse dia', () => {
    const event = makeEvent({ date: '2026-01-31', recurrence: { frequency: 'monthly' } });
    const dates = expandEvent(event, '2026-01-01', '2026-06-30');
    // Fevereiro, abril e junho não têm dia 31.
    expect(dates).toEqual(['2026-01-31', '2026-03-31', '2026-05-31']);
  });

  it('ordena ocorrências por data e horário', () => {
    const morning = makeEvent({ id: 'a', date: '2026-11-05', startTime: '07:00', title: 'Missa' });
    const evening = makeEvent({ id: 'b', date: '2026-11-05', startTime: '19:30', title: 'Grupo' });
    const occurrences = occurrencesInRange([evening, morning], '2026-11-01', '2026-11-10');
    expect(occurrences.map((item) => item.event.id)).toEqual(['a', 'b']);
  });

  it('encontra o próximo compromisso a partir de uma data', () => {
    const weekly = makeEvent({ recurrence: { frequency: 'weekly' } });
    const next = nextOccurrence([weekly], '2026-11-10');
    expect(next?.date).toBe('2026-11-11');
    expect(next?.isRecurring).toBe(true);
  });

  it('retorna null quando não há nada no horizonte', () => {
    const single = makeEvent();
    expect(nextOccurrence([single], '2026-11-05', 30)).toBeNull();
  });
});
