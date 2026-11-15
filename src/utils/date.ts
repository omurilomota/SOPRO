import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  format,
  isSameDay,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ISODate } from '../types/common';

/**
 * Utilitários de data do SOPRO.
 *
 * Regra de ouro: nunca usamos `Date.prototype.toISOString()` para derivar a
 * data civil. Em fusos negativos (como o do Brasil), `toISOString()` converte
 * para UTC e "volta um dia". Todas as conversões aqui operam em calendário
 * local, com `format(date, 'yyyy-MM-dd')`.
 */

export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function toISODate(date: Date): ISODate {
  return format(date, 'yyyy-MM-dd');
}

/** Converte "AAAA-MM-DD" em `Date` no fuso local (meio-dia, seguro contra DST). */
export function fromISODate(iso: ISODate): Date {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) {
    throw new Error(`Data inválida: ${iso}`);
  }
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function isValidISODate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number) as [number, number, number];
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  );
}

export function todayISO(): ISODate {
  return toISODate(new Date());
}

export function addDaysISO(iso: ISODate, amount: number): ISODate {
  return toISODate(addDays(fromISODate(iso), amount));
}

export function diffInDays(a: ISODate, b: ISODate): number {
  return differenceInCalendarDays(fromISODate(a), fromISODate(b));
}

export function isSameISODate(a: ISODate, b: ISODate): boolean {
  return a === b;
}

export function isToday(iso: ISODate): boolean {
  return isSameDay(fromISODate(iso), new Date());
}

/** "sábado, 15 de novembro de 2026" */
export function formatLongDate(iso: ISODate): string {
  return format(fromISODate(iso), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

/** "15 de novembro" */
export function formatShortDate(iso: ISODate): string {
  return format(fromISODate(iso), "d 'de' MMMM", { locale: ptBR });
}

export function formatMonthYear(date: Date): string {
  return format(date, "MMMM 'de' yyyy", { locale: ptBR });
}

export function formatWeekday(date: Date): string {
  return format(date, 'EEEE', { locale: ptBR });
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "há 3 dias", "em 2 dias", "hoje", "amanhã", "ontem" */
export function relativeDayLabel(iso: ISODate, base: ISODate = todayISO()): string {
  const delta = diffInDays(iso, base);
  if (delta === 0) return 'hoje';
  if (delta === 1) return 'amanhã';
  if (delta === -1) return 'ontem';
  if (delta > 1) return `em ${delta} dias`;
  return `há ${Math.abs(delta)} dias`;
}

export function monthGrid(date: Date): Date[] {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfMonth(date);
  const days: Date[] = [];
  let cursor = start;
  // Sempre 6 semanas para manter a altura estável na troca de mês.
  while (days.length < 42 || cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
    if (days.length >= 42 && cursor > end) break;
  }
  return days;
}

export function weekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function parseISODateSafe(iso: string): Date | null {
  try {
    const parsed = parseISO(iso);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
}

/** Formata HH:mm com fallback para o texto original. */
export function formatTime(time: string | null): string {
  if (!time) return '';
  const match = /^(\d{1,2}):(\d{2})/.exec(time);
  if (!match) return time;
  return `${match[1]?.padStart(2, '0')}:${match[2]}`;
}

export const WEEKDAY_NAMES = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
] as const;

export const WEEKDAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;
