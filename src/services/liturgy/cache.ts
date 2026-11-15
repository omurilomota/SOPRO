import type { ISODate } from '../../types/common';
import type { Liturgy } from '../../types/liturgy';
import { env } from '../../utils/env';
import { liturgyCacheRepository, type LiturgyCacheRecord } from '../storage/repositories';
import { isIndexedDBAvailable } from '../storage/idb';

const MEMORY_BUDGET = 24;
const memoryCache = new Map<ISODate, LiturgyCacheRecord>();

function memorySet(record: LiturgyCacheRecord): void {
  memoryCache.delete(record.date);
  memoryCache.set(record.date, record);
  while (memoryCache.size > MEMORY_BUDGET) {
    const oldest = memoryCache.keys().next();
    if (oldest.done) break;
    memoryCache.delete(oldest.value);
  }
}

export async function readCachedLiturgy(date: ISODate): Promise<LiturgyCacheRecord | null> {
  const inMemory = memoryCache.get(date);
  if (inMemory) return inMemory;

  if (!isIndexedDBAvailable()) return null;

  try {
    const record = await liturgyCacheRepository.getById(date);
    if (record) memorySet(record);
    return record ?? null;
  } catch {
    return null;
  }
}

export async function writeCachedLiturgy(liturgy: Liturgy): Promise<void> {
  const record: LiturgyCacheRecord = {
    ...liturgy,
    id: liturgy.date,
    cachedAt: new Date().toISOString(),
  };
  memorySet(record);

  if (!isIndexedDBAvailable()) return;

  try {
    await liturgyCacheRepository.put(record);
  } catch {
    // Falha de cache não deve quebrar a leitura da liturgia.
  }
}

export async function listCachedLiturgies(): Promise<LiturgyCacheRecord[]> {
  if (!isIndexedDBAvailable()) return [...memoryCache.values()];
  try {
    const records = await liturgyCacheRepository.getAll();
    return records.sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [...memoryCache.values()];
  }
}

export async function clearLiturgyCache(): Promise<void> {
  memoryCache.clear();
  if (!isIndexedDBAvailable()) return;
  try {
    await liturgyCacheRepository.clear();
  } catch {
    /* ignorado */
  }
}

export function isCacheFresh(cachedAt: string, ttlHours = env.liturgyCacheTtlHours): boolean {
  const age = Date.now() - new Date(cachedAt).getTime();
  if (Number.isNaN(age)) return false;
  return age < ttlHours * 60 * 60 * 1000;
}
