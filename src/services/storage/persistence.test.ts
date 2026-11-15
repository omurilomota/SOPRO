import { beforeEach, describe, expect, it } from 'vitest';
import { clearAllStores, createRepository } from './idb';
import {
  eventRepository,
  journalRepository,
  liturgyCacheRepository,
  type LiturgyCacheRecord,
} from './repositories';
import { loadSettings, patchSettings, saveSettings, defaultSettings } from './settings';
import type { CalendarEvent } from '../../types/calendar';
import type { JournalEntry } from '../../types/spiritual-life';

function sampleEvent(id: string): CalendarEvent {
  return {
    id,
    title: 'Missa',
    kind: 'missa',
    date: '2026-11-15',
    startTime: '19:30',
    endTime: null,
    location: null,
    notes: null,
    recurrence: { frequency: 'none' },
    prayerGroupId: null,
    createdAt: '2026-11-15T10:00:00.000Z',
    updatedAt: '2026-11-15T10:00:00.000Z',
  };
}

describe('persistência em IndexedDB', () => {
  beforeEach(async () => {
    await clearAllStores();
  });

  it('grava e lê compromissos', async () => {
    await eventRepository.put(sampleEvent('evt-1'));
    const stored = await eventRepository.getById('evt-1');
    expect(stored?.title).toBe('Missa');
    expect(await eventRepository.count()).toBe(1);
  });

  it('atualiza um registro existente sem duplicar', async () => {
    await eventRepository.put(sampleEvent('evt-1'));
    await eventRepository.put({ ...sampleEvent('evt-1'), title: 'Missa solene' });
    const all = await eventRepository.getAll();
    expect(all).toHaveLength(1);
    expect(all[0]?.title).toBe('Missa solene');
  });

  it('remove apenas o registro indicado', async () => {
    await eventRepository.put(sampleEvent('evt-1'));
    await eventRepository.put(sampleEvent('evt-2'));
    await eventRepository.remove('evt-1');
    const all = await eventRepository.getAll();
    expect(all).toHaveLength(1);
    expect(all[0]?.id).toBe('evt-2');
  });

  it('preserva texto longo do diário sem corrupção', async () => {
    const body = 'Hoje rezei o Salmo 23.\n\nLinha com acento: coração, oração, pão.\n"aspas" e \\ barras.';
    const entry: JournalEntry = {
      id: 'j-1',
      date: '2026-11-15',
      title: 'Manhã',
      body,
      mood: 'consolacao',
      createdAt: '2026-11-15T10:00:00.000Z',
      updatedAt: '2026-11-15T10:00:00.000Z',
    };
    await journalRepository.put(entry);
    const stored = await journalRepository.getById('j-1');
    expect(stored?.body).toBe(body);
    expect(stored?.mood).toBe('consolacao');
  });

  it('persiste cache de liturgia usando a data como chave', async () => {
    const record: LiturgyCacheRecord = {
      id: '2026-11-15',
      date: '2026-11-15',
      dateLabel: '15/11/2026',
      celebrations: [],
      source: 'dancrf-v2',
      fetchedAt: '2026-11-15T10:00:00.000Z',
      provider: 'Liturgia Diária (Dancrf)',
      providerUrl: null,
      season: null,
      cachedAt: '2026-11-15T10:00:00.000Z',
    };
    await liturgyCacheRepository.put(record);
    const stored = await liturgyCacheRepository.getById('2026-11-15');
    expect(stored?.date).toBe('2026-11-15');
  });

  it('apaga tudo com clearAllStores', async () => {
    await eventRepository.put(sampleEvent('evt-1'));
    await journalRepository.put({
      id: 'j-1',
      date: '2026-11-15',
      title: null,
      body: 'texto',
      mood: null,
      createdAt: '',
      updatedAt: '',
    });
    await clearAllStores();
    expect(await eventRepository.count()).toBe(0);
    expect(await journalRepository.count()).toBe(0);
  });

  it('isola repositórios por store', async () => {
    const create = createRepository<{ id: string; value: string }>('verses');
    await create.put({ id: 'v1', value: 'Sl 23' });
    expect((await create.getById('v1'))?.value).toBe('Sl 23');
    expect(await eventRepository.count()).toBe(0);
  });
});

describe('configurações do usuário', () => {
  beforeEach(async () => {
    await clearAllStores();
  });

  it('devolve padrões quando não há nada salvo', async () => {
    const settings = await loadSettings();
    expect(settings).toEqual(defaultSettings);
    expect(settings.theme).toBe('system');
  });

  it('salva e recupera preferências', async () => {
    await saveSettings({ ...defaultSettings, name: 'Maria', theme: 'dark' });
    const settings = await loadSettings();
    expect(settings.name).toBe('Maria');
    expect(settings.theme).toBe('dark');
  });

  it('aplica patch sem sobrescrever o resto', async () => {
    await saveSettings({ ...defaultSettings, name: 'Maria', theme: 'dark' });
    const updated = await patchSettings({ name: 'João' });
    expect(updated.name).toBe('João');
    expect(updated.theme).toBe('dark');
  });
});
