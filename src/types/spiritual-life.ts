import type { ID, ISODate } from './common';

export type HabitKind =
  | 'oracao-manha'
  | 'leitura-biblica'
  | 'terco'
  | 'adoracao'
  | 'exame-consciencia'
  | 'leitura-espiritual'
  | 'jejum'
  | 'outro';

export interface SpiritualHabit {
  id: ID;
  title: string;
  kind: HabitKind;
  /** Frequência desejada por semana (1–7). 0 = sem meta. */
  targetPerWeek: number;
  /** Dias da semana sugeridos (0 = domingo). */
  weekdays: number[];
  active: boolean;
  createdAt: string;
}

export interface HabitCompletion {
  id: ID;
  habitId: ID;
  date: ISODate;
  createdAt: string;
}

export interface JournalEntry {
  id: ID;
  date: ISODate;
  /** Título opcional; se ausente, a data identifica o registro. */
  title: string | null;
  body: string;
  mood: 'consolacao' | 'desolacao' | 'neutro' | null;
  createdAt: string;
  updatedAt: string;
}

export interface Intention {
  id: ID;
  text: string;
  /** Por quem / por quê. */
  forWhom: string | null;
  createdAt: string;
  /** Intenções atendidas ficam arquivadas, sem virar "pontuação". */
  answeredAt: string | null;
}

export interface FavoriteVerse {
  id: ID;
  reference: string;
  text: string;
  note: string | null;
  createdAt: string;
}

export interface LifePlanItem {
  id: ID;
  title: string;
  description: string | null;
  period: 'diario' | 'semanal' | 'mensal';
  createdAt: string;
}

export interface ActivityLogEntry {
  id: ID;
  kind: 'habito' | 'oracao' | 'terco' | 'liturgia' | 'diario' | 'compromisso';
  label: string;
  date: ISODate;
  createdAt: string;
}

export interface UserSettings {
  name: string | null;
  theme: 'light' | 'dark' | 'system';
  /** Hora em que o usuário costuma rezar pela manhã (exibida em Hoje). */
  morningPrayerReminder: string | null;
  eveningPrayerReminder: string | null;
  lifecycle: 'onboarding-complete' | 'pending';
}
