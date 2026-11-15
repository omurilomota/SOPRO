import { ALL_STORES, DB_NAME, DB_VERSION, STORE_INDEXES, type StoreName } from '../../database/schema';

/**
 * Camada fina sobre IndexedDB, sem dependências externas.
 *
 * A abstração `Repository` permite trocar o mecanismo de persistência
 * (IndexedDB → backend futuro) sem alterar features.
 */

let dbPromise: Promise<IDBDatabase> | null = null;

export function isIndexedDBAvailable(): boolean {
  return typeof indexedDB !== 'undefined';
}

function openDatabase(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      reject(new Error('IndexedDB indisponível neste ambiente.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      for (const storeName of ALL_STORES) {
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: 'id' });
          for (const index of STORE_INDEXES[storeName] ?? []) {
            if (!store.indexNames.contains(index.name)) {
              store.createIndex(index.name, index.keyPath, { unique: false });
            }
          }
        }
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => db.close();
      resolve(db);
    };

    request.onerror = () => reject(request.error ?? new Error('Falha ao abrir o banco local.'));
    request.onblocked = () =>
      reject(new Error('Outra aba do SOPRO está bloqueando a atualização do banco local.'));
  });

  return dbPromise;
}

function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Operação no banco falhou.'));
  });
}

async function withStore<T>(
  storeName: StoreName,
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => Promise<T> | T,
): Promise<T> {
  const db = await openDatabase();
  const transaction = db.transaction(storeName, mode);
  const store = transaction.objectStore(storeName);
  const result = await run(store);
  await new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('Transação falhou.'));
    transaction.onabort = () => reject(transaction.error ?? new Error('Transação abortada.'));
  });
  return result;
}

export interface Entity {
  id: string;
}

export interface Repository<T extends Entity> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  put(entity: T): Promise<T>;
  putMany(entities: T[]): Promise<void>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
  count(): Promise<number>;
}

export function createRepository<T extends Entity>(storeName: StoreName): Repository<T> {
  return {
    async getAll() {
      return withStore(storeName, 'readonly', (store) =>
        promisifyRequest<T[]>(store.getAll() as IDBRequest<T[]>),
      );
    },
    async getById(id) {
      return withStore(storeName, 'readonly', (store) =>
        promisifyRequest<T | undefined>(store.get(id) as IDBRequest<T | undefined>),
      );
    },
    async put(entity) {
      await withStore(storeName, 'readwrite', (store) => promisifyRequest(store.put(entity)));
      return entity;
    },
    async putMany(entities) {
      if (entities.length === 0) return;
      await withStore(storeName, 'readwrite', (store) => {
        for (const entity of entities) store.put(entity);
      });
    },
    async remove(id) {
      await withStore(storeName, 'readwrite', (store) => promisifyRequest(store.delete(id)));
    },
    async clear() {
      await withStore(storeName, 'readwrite', (store) => promisifyRequest(store.clear()));
    },
    async count() {
      return withStore(storeName, 'readonly', (store) =>
        promisifyRequest<number>(store.count() as IDBRequest<number>),
      );
    },
  };
}

/** Lê todos os registros de um índice. */
export async function getAllByIndex<T>(
  storeName: StoreName,
  indexName: string,
  value: IDBValidKey,
): Promise<T[]> {
  return withStore(storeName, 'readonly', (store) => {
    const index = store.index(indexName);
    return promisifyRequest<T[]>(index.getAll(value) as IDBRequest<T[]>);
  });
}

/** Apaga todas as stores — usado na exclusão integral de dados. */
export async function clearAllStores(): Promise<void> {
  const db = await openDatabase();
  await Promise.all(
    ALL_STORES.map(
      (storeName) =>
        new Promise<void>((resolve, reject) => {
          const tx = db.transaction(storeName, 'readwrite');
          tx.objectStore(storeName).clear();
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error ?? new Error('Falha ao limpar armazenamento.'));
        }),
    ),
  );
}

/** Exporta o conteúdo integral do banco (para cópia de segurança). */
export async function dumpDatabase(): Promise<Record<StoreName, unknown[]>> {
  const db = await openDatabase();
  const entries = await Promise.all(
    ALL_STORES.map(async (storeName) => {
      const tx = db.transaction(storeName, 'readonly');
      const rows = await promisifyRequest<unknown[]>(
        tx.objectStore(storeName).getAll() as IDBRequest<unknown[]>,
      );
      return [storeName, rows] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<StoreName, unknown[]>;
}

/** Restaura um dump exportado anteriormente. */
export async function restoreDatabase(dump: Record<string, unknown[]>): Promise<void> {
  for (const [storeName, rows] of Object.entries(dump)) {
    if (!ALL_STORES.includes(storeName as StoreName)) continue;
    if (!Array.isArray(rows)) continue;
    await withStore(storeName as StoreName, 'readwrite', (store) => {
      for (const row of rows) store.put(row);
    });
  }
}

/** Fecha e esquece a conexão (útil em testes). */
export function closeDatabase(): void {
  dbPromise = null;
}
