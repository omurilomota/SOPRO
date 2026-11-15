import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LiturgyError, type Liturgy, type LiturgyProvider } from '../../types/liturgy';
import { clearAllStores } from '../storage/idb';
import { clearLiturgyCache, getLiturgy, setLiturgyProvider, describeLiturgyError } from './index';

function sampleLiturgy(date: string): Liturgy {
  return {
    date,
    dateLabel: date,
    celebrations: [
      {
        id: 'teste',
        title: 'Teste',
        color: 'verde',
        colorRaw: 'Verde',
        isPrimary: true,
        readings: [],
        prayers: { collect: null, offerings: null, communion: null, extras: [] },
        antiphons: { entrance: null, communion: null },
      },
    ],
    source: 'dancrf-v2',
    fetchedAt: new Date().toISOString(),
    provider: 'fake',
    providerUrl: null,
    season: null,
  };
}

function providerOf(fn: (date: string) => Promise<Liturgy>): LiturgyProvider {
  return { id: 'fake', name: 'Fake', homepage: null, fetchByDate: fn };
}

describe('serviço de liturgia', () => {
  beforeEach(async () => {
    await clearAllStores();
    await clearLiturgyCache();
  });

  it('busca na rede na primeira chamada e guarda em cache', async () => {
    const fetchSpy = vi.fn(async (date: string) => sampleLiturgy(date));
    setLiturgyProvider(providerOf(fetchSpy));

    const first = await getLiturgy('2026-11-15');
    expect(first.fromCache).toBe(false);
    expect(first.liturgy.date).toBe('2026-11-15');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('usa o cache quando está fresco (evita requisições repetidas)', async () => {
    const fetchSpy = vi.fn(async (date: string) => sampleLiturgy(date));
    setLiturgyProvider(providerOf(fetchSpy));

    await getLiturgy('2026-11-15');
    const second = await getLiturgy('2026-11-15');
    expect(second.fromCache).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('devolve cache com aviso quando a rede falha (modo offline)', async () => {
    let calls = 0;
    const fetchSpy = vi.fn(async (date: string) => {
      calls += 1;
      if (calls === 1) return sampleLiturgy(date);
      throw new LiturgyError('offline', 'Sem conexão.');
    });
    setLiturgyProvider(providerOf(fetchSpy));

    await getLiturgy('2026-11-15');
    const forced = await getLiturgy('2026-11-15', { force: true });

    expect(forced.fromCache).toBe(true);
    expect(forced.staleError?.kind).toBe('offline');
    expect(forced.liturgy.date).toBe('2026-11-15');
  });

  it('propaga o erro quando não há cache nem rede', async () => {
    setLiturgyProvider(
      providerOf(async () => {
        throw new LiturgyError('offline', 'Sem conexão.');
      }),
    );

    await expect(getLiturgy('2026-11-16')).rejects.toMatchObject({ kind: 'offline' });
  });

  it('não inventa dados: erro 404 permanece erro', async () => {
    setLiturgyProvider(
      providerOf(async () => {
        throw new LiturgyError('not-found', 'Sem liturgia.', 404);
      }),
    );

    await expect(getLiturgy('2080-02-01')).rejects.toMatchObject({ kind: 'not-found' });
  });

  it('mensagens de erro são claras e honestas', () => {
    for (const kind of [
      'offline',
      'not-found',
      'provider-unavailable',
      'invalid-response',
      'unknown',
    ] as const) {
      const described = describeLiturgyError(new LiturgyError(kind, 'x'));
      expect(described.title.length).toBeGreaterThan(3);
      expect(described.message.length).toBeGreaterThan(20);
    }
  });
});
