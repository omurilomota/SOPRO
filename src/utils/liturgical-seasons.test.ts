import { describe, expect, it } from 'vitest';
import { easterSunday, liturgicalSeasonFor } from './liturgical-seasons';
import { toISODate } from './date';

describe('cálculo do tempo litúrgico', () => {
  it('calcula a Páscoa corretamente para anos conhecidos', () => {
    const known: [number, string][] = [
      [2024, '2024-03-31'],
      [2025, '2025-04-20'],
      [2026, '2026-04-05'],
      [2027, '2027-03-28'],
      [2028, '2028-04-16'],
      [2030, '2030-04-21'],
    ];
    for (const [year, expected] of known) {
      expect(toISODate(easterSunday(year))).toBe(expected);
    }
  });

  it('identifica o Tempo Comum em novembro', () => {
    expect(liturgicalSeasonFor('2026-11-15').key).toBe('comum');
  });

  it('identifica o Advento (1º domingo até 24/12)', () => {
    expect(liturgicalSeasonFor('2026-12-25').key).not.toBe('advento');
    expect(liturgicalSeasonFor('2026-12-24').key).toBe('advento');
    expect(liturgicalSeasonFor('2026-11-29').key).toBe('advento');
    expect(liturgicalSeasonFor('2026-11-28').key).toBe('comum');
  });

  it('identifica o Tempo do Natal, inclusive em janeiro antes do Batismo', () => {
    expect(liturgicalSeasonFor('2026-12-25').key).toBe('natal');
    expect(liturgicalSeasonFor('2027-01-03').key).toBe('natal');
    expect(liturgicalSeasonFor('2027-01-20').key).toBe('comum');
  });

  it('identifica a Quaresma e o Tempo Pascal', () => {
    expect(liturgicalSeasonFor('2026-02-18').key).toBe('quaresma'); // Cinzas
    expect(liturgicalSeasonFor('2026-04-04').key).toBe('quaresma'); // Sábado Santo
    expect(liturgicalSeasonFor('2026-04-05').key).toBe('pascoa'); // Páscoa
    expect(liturgicalSeasonFor('2026-05-24').key).toBe('pascoa'); // Pentecostes
    expect(liturgicalSeasonFor('2026-05-25').key).toBe('comum');
  });
});
