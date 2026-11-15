import { useMemo } from 'react';
import { useLocalCollection } from './useLocalCollection';
import {
  activityLogRepository,
  eventRepository,
  habitRepository,
  habitCompletionRepository,
  prayerGroupRepository,
} from '../services/storage/repositories';
import { nextOccurrence, occurrencesInRange } from '../services/calendar/recurrence';
import type { EventOccurrence } from '../types/calendar';
import type { ActivityLogEntry, HabitCompletion, SpiritualHabit } from '../types/spiritual-life';
import { addDaysISO, todayISO } from '../utils/date';

export interface TodayData {
  loading: boolean;
  todayOccurrences: EventOccurrence[];
  nextOccurrence: EventOccurrence | null;
  nextGroupOccurrence: EventOccurrence | null;
  habits: SpiritualHabit[];
  completionsToday: HabitCompletion[];
  activities: ActivityLogEntry[];
}

export function useTodayData(): TodayData {
  const today = todayISO();
  const events = useLocalCollection(eventRepository);
  const groups = useLocalCollection(prayerGroupRepository);
  const habits = useLocalCollection(habitRepository, {
    sort: (a, b) => a.title.localeCompare(b.title),
  });
  const completions = useLocalCollection(habitCompletionRepository);
  const activities = useLocalCollection(activityLogRepository, {
    sort: (a, b) => b.createdAt.localeCompare(a.createdAt),
  });

  const groupIds = useMemo(
    () => new Set(groups.items.map((group) => group.id)),
    [groups.items],
  );

  const todayOccurrences = useMemo(
    () => occurrencesInRange(events.items, today, today),
    [events.items, today],
  );

  const next = useMemo(() => {
    const found = nextOccurrence(events.items, addDaysISO(today, 1), 120);
    return found;
  }, [events.items, today]);

  const nextGroup = useMemo(() => {
    const upcoming = occurrencesInRange(events.items, today, addDaysISO(today, 60)).filter(
      (occurrence) =>
        occurrence.event.kind === 'grupo-oracao' ||
        (occurrence.event.prayerGroupId ? groupIds.has(occurrence.event.prayerGroupId) : false),
    );
    return upcoming[0] ?? null;
  }, [events.items, groupIds, today]);

  const completionsToday = useMemo(
    () => completions.items.filter((completion) => completion.date === today),
    [completions.items, today],
  );

  const activeHabits = useMemo(() => habits.items.filter((habit) => habit.active), [habits.items]);

  return {
    loading:
      events.loading || habits.loading || completions.loading || groups.loading || activities.loading,
    todayOccurrences,
    nextOccurrence: next,
    nextGroupOccurrence: nextGroup,
    habits: activeHabits,
    completionsToday,
    activities: activities.items.slice(0, 6),
  };
}
