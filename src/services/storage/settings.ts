import { STORES } from '../../database/schema';
import type { UserSettings } from '../../types/spiritual-life';
import { createRepository } from './idb';

const SETTINGS_ID = 'user';

export const defaultSettings: UserSettings = {
  name: null,
  theme: 'system',
  morningPrayerReminder: '07:00',
  eveningPrayerReminder: '21:30',
  lifecycle: 'pending',
};

interface SettingsRecord extends UserSettings {
  id: string;
}

const repo = createRepository<SettingsRecord>(STORES.settings);

export async function loadSettings(): Promise<UserSettings> {
  try {
    const record = await repo.getById(SETTINGS_ID);
    if (!record) return defaultSettings;
    const { id: _id, ...settings } = record;
    return { ...defaultSettings, ...settings };
  } catch {
    return defaultSettings;
  }
}

export async function saveSettings(settings: UserSettings): Promise<UserSettings> {
  await repo.put({ id: SETTINGS_ID, ...settings });
  return settings;
}

export async function patchSettings(patch: Partial<UserSettings>): Promise<UserSettings> {
  const current = await loadSettings();
  return saveSettings({ ...current, ...patch });
}
