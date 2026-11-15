import type { ISODate, LiturgicalColor } from './common';

/**
 * Modelo normalizado de liturgia, independente do provedor.
 *
 * Nem todo provedor entrega todos os campos: `null` / arrays vazios indicam
 * ausência legítima de informação, nunca preenchimento fictício.
 */

export type ReadingKind = 'reading' | 'psalm' | 'gospel' | 'sequence' | 'other';

/** Uma forma de proclamar a leitura (ex.: forma longa e forma breve do mesmo texto). */
export interface LiturgyReadingOption {
  reference: string | null;
  /** O que é proclamado antes do texto (ex.: "Leitura do Livro do Gênesis"). */
  title: string | null;
  /** Exclusivo do salmo responsorial. */
  refrain: string | null;
  text: string;
}

export interface LiturgyReading {
  label: string;
  kind: ReadingKind;
  options: LiturgyReadingOption[];
}

export interface LiturgyPrayer {
  title: string;
  text: string;
}

export interface LiturgyCelebration {
  id: string;
  title: string;
  color: LiturgicalColor;
  /** Cor exatamente como devolvida pela fonte (ex.: "Verde"). */
  colorRaw: string | null;
  /** Celebração principal do dia (false = memória facultativa, alternativa). */
  isPrimary: boolean;
  readings: LiturgyReading[];
  prayers: {
    collect: string | null;
    offerings: string | null;
    communion: string | null;
    extras: LiturgyPrayer[];
  };
  antiphons: {
    entrance: string | null;
    communion: string | null;
  };
}

export interface Liturgy {
  /** Data a que a liturgia se refere (calendário civil local). */
  date: ISODate;
  /** Rótulo legível da data, exatamente como devolvido pela fonte, se houver. */
  dateLabel: string | null;
  celebrations: LiturgyCelebration[];
  /** Identificador do formato normalizado de origem. */
  source: 'dancrf-v2' | 'dancrf-v3' | 'cache';
  /** ISO timestamp da obtenção dos dados. */
  fetchedAt: string;
  provider: string;
  providerUrl: string | null;
  /** Tempo litúrgico calculado localmente (não vem da fonte). */
  season: LiturgicalSeason | null;
}

export interface LiturgicalSeason {
  key: 'advento' | 'natal' | 'quaresma' | 'pascoa' | 'comum';
  name: string;
  color: LiturgicalColor;
}

export type LiturgyErrorKind =
  | 'offline'
  | 'not-found'
  | 'provider-unavailable'
  | 'invalid-response'
  | 'not-configured'
  | 'unknown';

export class LiturgyError extends Error {
  readonly kind: LiturgyErrorKind;
  readonly status: number | null;

  constructor(kind: LiturgyErrorKind, message: string, status: number | null = null) {
    super(message);
    this.name = 'LiturgyError';
    this.kind = kind;
    this.status = status;
  }
}

/**
 * Contrato de provedor de liturgia. Permite trocar a fonte (API comunitária,
 * backend próprio ou importação manual) sem tocar no frontend.
 */
export interface LiturgyProvider {
  readonly id: string;
  readonly name: string;
  readonly homepage: string | null;
  fetchByDate(date: ISODate): Promise<Liturgy>;
}
