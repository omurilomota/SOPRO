import { describe, expect, it } from 'vitest';
import {
  addDaysISO,
  diffInDays,
  formatLongDate,
  fromISODate,
  isValidISODate,
  monthGrid,
  relativeDayLabel,
  toISODate,
  weekDays,
} from './date';

describe('utilitários de data', () => {
  it('converte Date para ISO local sem deslocamento de UTC', () => {
    // 1º de janeiro à 00:30 no fuso local: toISOString() devolveria o ano anterior.
    const date = new Date(2026, 0, 1, 0, 30);
    expect(toISODate(date)).toBe('2026-01-01');
  });

  it('converte ISO em Date no meio-dia local (sem riscos de DST)', () => {
    const date = fromISODate('2026-03-15');
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(2);
    expect(date.getDate()).toBe(15);
    expect(date.getHours()).toBe(12);
  });

  it('faz round-trip estável entre ISO e Date', () => {
    for (const iso of ['2024-02-29', '2025-12-31', '2026-07-04']) {
      expect(toISODate(fromISODate(iso))).toBe(iso);
    }
  });

  it('valida datas ISO, inclusive 29 de fevereiro', () => {
    expect(isValidISODate('2024-02-29')).toBe(true);
    expect(isValidISODate('2023-02-29')).toBe(false);
    expect(isValidISODate('2026-13-01')).toBe(false);
    expect(isValidISODate('15/11/2026')).toBe(false);
    expect(isValidISODate('2026-1-5')).toBe(false);
  });

  it('soma e subtrai dias atravessando mês e ano', () => {
    expect(addDaysISO('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDaysISO('2026-03-01', -1)).toBe('2026-02-28');
    expect(addDaysISO('2024-02-28', 1)).toBe('2024-02-29');
  });

  it('calcula diferença em dias de calendário', () => {
    expect(diffInDays('2026-11-15', '2026-11-14')).toBe(1);
    expect(diffInDays('2026-11-14', '2026-11-15')).toBe(-1);
    expect(diffInDays('2027-01-01', '2026-12-31')).toBe(1);
  });

  it('gera rótulos relativos legíveis', () => {
    const base = '2026-11-15';
    expect(relativeDayLabel('2026-11-15', base)).toBe('hoje');
    expect(relativeDayLabel('2026-11-16', base)).toBe('amanhã');
    expect(relativeDayLabel('2026-11-14', base)).toBe('ontem');
    expect(relativeDayLabel('2026-11-18', base)).toBe('em 3 dias');
  });

  it('formata a data longa em português', () => {
    expect(formatLongDate('2026-11-15')).toBe('domingo, 15 de novembro de 2026');
  });

  it('monta grade mensal começando no domingo com 42 células', () => {
    const grid = monthGrid(new Date(2026, 10, 15, 12));
    expect(grid).toHaveLength(42);
    expect(grid[0]?.getDay()).toBe(0);
    expect(toISODate(grid[0]!)).toBe('2026-11-01');
  });

  it('monta semana de domingo a sábado', () => {
    const days = weekDays(new Date(2026, 10, 15, 12));
    expect(days).toHaveLength(7);
    expect(toISODate(days[0]!)).toBe('2026-11-15');
    expect(toISODate(days[6]!)).toBe('2026-11-21');
  });
});
