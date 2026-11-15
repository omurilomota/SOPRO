import { useCallback } from 'react';
import { eventRepository, prayerGroupRepository } from '../services/storage/repositories';
import type { CalendarEvent, PrayerGroup } from '../types/calendar';
import { createId } from '../utils/id';
import { useLocalCollection } from './useLocalCollection';

const byDate = (a: CalendarEvent, b: CalendarEvent) => {
  if (a.date !== b.date) return a.date.localeCompare(b.date);
  return (a.startTime ?? '99:99').localeCompare(b.startTime ?? '99:99');
};

export function useCalendarEvents() {
  const collection = useLocalCollection<CalendarEvent>(eventRepository, { sort: byDate });

  const create = useCallback(
    async (input: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      return collection.add({ ...input, id: createId('evt'), createdAt: now, updatedAt: now });
    },
    [collection],
  );

  const save = useCallback(
    async (event: CalendarEvent) => collection.update({ ...event, updatedAt: new Date().toISOString() }),
    [collection],
  );

  return { ...collection, create, save };
}

export function usePrayerGroups() {
  const collection = useLocalCollection<PrayerGroup>(prayerGroupRepository, {
    sort: (a, b) => a.weekday - b.weekday || a.startTime.localeCompare(b.startTime),
  });

  const create = useCallback(
    async (input: Omit<PrayerGroup, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      return collection.add({ ...input, id: createId('grp'), createdAt: now, updatedAt: now });
    },
    [collection],
  );

  const save = useCallback(
    async (group: PrayerGroup) =>
      collection.update({ ...group, updatedAt: new Date().toISOString() }),
    [collection],
  );

  return { ...collection, create, save };
}
