import { STORES } from '../../database/schema';
import type { CalendarEvent, PrayerGroup } from '../../types/calendar';
import type {
  ActivityLogEntry,
  FavoriteVerse,
  HabitCompletion,
  Intention,
  JournalEntry,
  LifePlanItem,
  SpiritualHabit,
} from '../../types/spiritual-life';
import type { Liturgy } from '../../types/liturgy';
import type { RccProgressRecord } from '../../types/rcc';
import { createRepository, type Repository } from './idb';

export interface FavoriteRecord {
  id: string;
  /** Tipo do item favoritado. */
  kind: 'prayer' | 'verse' | 'liturgy' | 'formation';
  refId: string;
  title: string;
  createdAt: string;
}

export interface LiturgyCacheRecord extends Liturgy {
  /** Chave da store é `id`; mantemos em sincronia com `date`. */
  id: string;
  cachedAt: string;
}

export const eventRepository = createRepository<CalendarEvent>(STORES.events);
export const prayerGroupRepository = createRepository<PrayerGroup>(STORES.prayerGroups);
export const habitRepository = createRepository<SpiritualHabit>(STORES.habits);
export const habitCompletionRepository =
  createRepository<HabitCompletion>(STORES.habitCompletions);
export const journalRepository = createRepository<JournalEntry>(STORES.journal);
export const intentionRepository = createRepository<Intention>(STORES.intentions);
export const verseRepository = createRepository<FavoriteVerse>(STORES.verses);
export const lifePlanRepository = createRepository<LifePlanItem>(STORES.lifePlan);
export const activityLogRepository = createRepository<ActivityLogEntry>(STORES.activityLog);
export const favoritesRepository = createRepository<FavoriteRecord>(STORES.favorites);
export const liturgyCacheRepository = createRepository<LiturgyCacheRecord>(STORES.liturgyCache);
export const rccProgressRepository = createRepository<RccProgressRecord>(STORES.rccProgress);

export type { Repository };
