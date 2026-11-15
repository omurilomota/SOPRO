import type { ISODate } from '../types/common';
import type { LiturgicalSeason } from '../types/liturgy';
import { toISODate } from './date';

/**
 * Cálculo local do tempo litúrgico (rito romano, calendário gregoriano).
 *
 * A API de liturgia não devolve o tempo litúrgico como campo estruturado,
 * então o derivamos da Páscoa. É um cálculo determinístico e documentado —
 * não é conteúdo editorial inventado.
 */

/** Domingo de Páscoa pelo algoritmo de Meeus/Jones/Butcher (calendário gregoriano). */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

const SEASONS = {
  advento: { key: 'advento', name: 'Advento', color: 'roxo' },
  natal: { key: 'natal', name: 'Tempo do Natal', color: 'branco' },
  quaresma: { key: 'quaresma', name: 'Quaresma', color: 'roxo' },
  pascoa: { key: 'pascoa', name: 'Tempo Pascal', color: 'branco' },
  comum: { key: 'comum', name: 'Tempo Comum', color: 'verde' },
} as const satisfies Record<LiturgicalSeason['key'], LiturgicalSeason>;

const DAY_MS = 86_400_000;

function noon(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function daysAfter(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

/** Batismo do Senhor: domingo após 6 de janeiro (ou 7/8 quando 6/1 é domingo). */
function baptismOfTheLord(year: number): Date {
  const epiphany = noon(year, 1, 6);
  const weekday = epiphany.getDay();
  return daysAfter(epiphany, weekday === 0 ? 7 : 7 - weekday);
}

/** Quarta-feira de Cinzas: 46 dias antes da Páscoa. */
function ashWednesday(year: number): Date {
  return daysAfter(easterSunday(year), -46);
}

function pentecost(year: number): Date {
  return daysAfter(easterSunday(year), 49);
}

/** Primeiro Domingo do Advento: quarto domingo antes do Natal. */
function firstSundayOfAdvent(year: number): Date {
  const christmas = noon(year, 12, 25);
  const weekday = christmas.getDay();
  const daysBack = weekday === 0 ? 7 : weekday;
  return daysAfter(christmas, -daysBack - 21);
}

function isWithin(target: Date, start: Date, end: Date): boolean {
  const t = target.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

export function liturgicalSeasonFor(iso: ISODate): LiturgicalSeason {
  const date = noon(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)), Number(iso.slice(8, 10)));
  const year = date.getFullYear();

  // Tempo do Natal: 25/12 até o Batismo do Senhor do ano seguinte
  // (o que também cobre janeiro antes do Batismo).
  const christmas = noon(year, 12, 25);
  const natalStart = date < christmas ? noon(year - 1, 12, 25) : christmas;
  const natalEnd = baptismOfTheLord(natalStart.getFullYear() + 1);
  if (isWithin(date, natalStart, natalEnd)) return SEASONS.natal;

  // Advento: 1º domingo do Advento até 24/12.
  const adventStart = firstSundayOfAdvent(year);
  if (isWithin(date, adventStart, daysAfter(christmas, -1))) return SEASONS.advento;

  // Quaresma: Cinzas até a véspera da Páscoa.
  const ashes = ashWednesday(year);
  const easter = easterSunday(year);
  if (isWithin(date, ashes, daysAfter(easter, -1))) return SEASONS.quaresma;

  // Tempo Pascal: Páscoa até Pentecostes.
  if (isWithin(date, easter, pentecost(year))) return SEASONS.pascoa;

  return SEASONS.comum;
}

/** Rótulo do tempo litúrgico para uma data civil. */
export function seasonLabel(iso: ISODate): string {
  return liturgicalSeasonFor(iso).name;
}

export function seasonForDate(date: Date): LiturgicalSeason {
  return liturgicalSeasonFor(toISODate(date));
}
