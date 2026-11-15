import type { ID, ISODate, ISOTime } from './common';

export type EventKind =
  | 'grupo-oracao'
  | 'missa'
  | 'confissao'
  | 'formacao'
  | 'retiro'
  | 'novena'
  | 'adoracao'
  | 'outro';

export type RecurrenceFrequency = 'none' | 'weekly' | 'biweekly' | 'monthly';

export interface Recurrence {
  frequency: RecurrenceFrequency;
  /** Para recorrência semanal/bissemanal: 0 = domingo … 6 = sábado. */
  weekday?: number;
  /** Para recorrência mensal: dia do mês (1–31). */
  monthDay?: number;
  /** Data final da recorrência (inclusive). */
  until?: ISODate | null;
}

export interface CalendarEvent {
  id: ID;
  title: string;
  kind: EventKind;
  date: ISODate;
  startTime: ISOTime | null;
  endTime: ISOTime | null;
  location: string | null;
  notes: string | null;
  recurrence: Recurrence;
  /** Grupo de oração vinculado, se houver. */
  prayerGroupId: ID | null;
  createdAt: string;
  updatedAt: string;
}

export interface PrayerGroup {
  id: ID;
  name: string;
  /** Dia da semana da reunião (0 = domingo). */
  weekday: number;
  startTime: ISOTime;
  endTime: ISOTime | null;
  location: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Instância de um evento em uma data concreta (após expandir recorrências). */
export interface EventOccurrence {
  event: CalendarEvent;
  date: ISODate;
  startTime: ISOTime | null;
  isRecurring: boolean;
}
