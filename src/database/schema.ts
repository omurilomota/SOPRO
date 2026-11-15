/**
 * Esquema do banco local (IndexedDB).
 *
 * Todos os dados do SOPRO vivem no dispositivo do usuário. Nenhuma informação
 * pessoal ou espiritual é enviada a servidores — exceto a data consultada na
 * API pública de liturgia, que não identifica o usuário.
 */

export const DB_NAME = 'sopro';
export const DB_VERSION = 2;

export const STORES = {
  settings: 'settings',
  events: 'events',
  prayerGroups: 'prayerGroups',
  habits: 'habits',
  habitCompletions: 'habitCompletions',
  journal: 'journal',
  intentions: 'intentions',
  verses: 'verses',
  lifePlan: 'lifePlan',
  activityLog: 'activityLog',
  favorites: 'favorites',
  liturgyCache: 'liturgyCache',
  /** Progresso local do Seminário de Vida no Espírito Santo e das formações. */
  rccProgress: 'rccProgress',
} as const;

export type StoreName = (typeof STORES)[keyof typeof STORES];

export const ALL_STORES: StoreName[] = Object.values(STORES);

/** Chaves únicas (fora do keyPath) para consultas e deduplicação. */
export const STORE_INDEXES: Partial<Record<StoreName, { name: string; keyPath: string }[]>> = {
  events: [{ name: 'by-date', keyPath: 'date' }],
  habitCompletions: [
    { name: 'by-date', keyPath: 'date' },
    { name: 'by-habit', keyPath: 'habitId' },
  ],
  journal: [{ name: 'by-date', keyPath: 'date' }],
  verses: [],
  activityLog: [{ name: 'by-date', keyPath: 'date' }],
  favorites: [],
  liturgyCache: [{ name: 'by-date', keyPath: 'date' }],
  rccProgress: [],
};
