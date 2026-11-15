import type { ISODate, LiturgicalColor } from '../../types/common';
import type {
  Liturgy,
  LiturgyCelebration,
  LiturgyReading,
  LiturgyReadingOption,
  ReadingKind,
} from '../../types/liturgy';
import { isValidISODate, toISODate } from '../../utils/date';
import { liturgicalSeasonFor } from '../../utils/liturgical-seasons';
import type { LiturgyV2Response } from './schema';

const COLOR_MAP: Record<string, LiturgicalColor> = {
  verde: 'verde',
  vermelho: 'vermelho',
  roxo: 'roxo',
  rosa: 'rosa',
  branco: 'branco',
  dourado: 'branco',
  preto: 'roxo',
};

export function normalizeColor(raw: string | null | undefined): LiturgicalColor {
  if (!raw) return 'desconhecida';
  return COLOR_MAP[raw.trim().toLowerCase()] ?? 'desconhecida';
}

/**
 * A API devolve datas em `dd/mm/aaaa` (hora local do servidor). Convertemos
 * para ISO `aaaa-mm-dd` sem passar por UTC, evitando deslocamento de um dia.
 */
export function parseProviderDate(raw: string): ISODate | null {
  const trimmed = raw.trim();

  const brMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmed);
  if (brMatch) {
    const [, day, month, year] = brMatch;
    const iso = `${year}-${month}-${day}`;
    return isValidISODate(iso) ? iso : null;
  }

  if (isValidISODate(trimmed)) return trimmed;

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) return toISODate(parsed);

  return null;
}

function toOptions(
  raw: { referencia?: string | null; titulo?: string | null; refrao?: string | null; texto: string }[] | null | undefined,
): LiturgyReadingOption[] {
  if (!raw) return [];
  return raw
    .filter((option) => typeof option.texto === 'string' && option.texto.trim().length > 0)
    .map((option) => ({
      reference: option.referencia?.trim() || null,
      title: option.titulo?.trim() || null,
      refrain: option.refrao?.trim() || null,
      text: option.texto.trim(),
    }));
}

const READING_DEFINITIONS: { key: keyof NonNullable<LiturgyV2Response['leituras']>; label: string; kind: ReadingKind }[] = [
  { key: 'primeiraLeitura', label: 'Primeira Leitura', kind: 'reading' },
  { key: 'salmo', label: 'Salmo Responsorial', kind: 'psalm' },
  { key: 'segundaLeitura', label: 'Segunda Leitura', kind: 'reading' },
  { key: 'evangelho', label: 'Evangelho', kind: 'gospel' },
  { key: 'extras', label: 'Leitura', kind: 'other' },
];

function buildReadings(raw: LiturgyV2Response['leituras']): LiturgyReading[] {
  if (!raw) return [];
  const readings: LiturgyReading[] = [];

  for (const definition of READING_DEFINITIONS) {
    const options = toOptions(raw[definition.key]);
    if (options.length === 0) continue;
    readings.push({ label: definition.label, kind: definition.kind, options });
  }

  return readings;
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

export interface NormalizeContext {
  provider: string;
  providerUrl: string | null;
}

/**
 * Converte a resposta v2 em `Liturgy`. Retorna `null` quando a resposta não
 * contém o mínimo necessário (data válida + celebração com título).
 */
export function normalizeV2(
  response: LiturgyV2Response,
  context: NormalizeContext,
): Liturgy | null {
  const date = parseProviderDate(response.data);
  if (!date) return null;

  const readings = buildReadings(response.leituras);
  const celebration: LiturgyCelebration = {
    id: slugify(response.liturgia) || 'celebracao',
    title: response.liturgia.trim(),
    color: normalizeColor(response.cor),
    colorRaw: response.cor ?? null,
    isPrimary: true,
    readings,
    prayers: {
      collect: response.oracoes?.coleta?.trim() || null,
      offerings: response.oracoes?.oferendas?.trim() || null,
      communion: response.oracoes?.comunhao?.trim() || null,
      extras: (response.oracoes?.extras ?? [])
        .filter((extra) => extra?.texto)
        .map((extra) => ({ title: extra.titulo ?? 'Oração', text: extra.texto })),
    },
    antiphons: {
      entrance: response.antifonas?.entrada?.trim() || null,
      communion: response.antifonas?.comunhao?.trim() || null,
    },
  };

  return {
    date,
    dateLabel: response.data,
    celebrations: [celebration],
    source: 'dancrf-v2',
    fetchedAt: new Date().toISOString(),
    provider: context.provider,
    providerUrl: context.providerUrl,
    season: liturgicalSeasonFor(date),
  };
}

/**
 * A fonte pode devolver a liturgia de um dia diferente do solicitado
 * (cache do servidor, fuso, etc.). O chamador precisa comparar as datas.
 */
export function liturgyMatchesDate(liturgy: Liturgy, requested: ISODate): boolean {
  return liturgy.date === requested;
}
