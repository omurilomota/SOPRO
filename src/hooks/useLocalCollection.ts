import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Entity, Repository } from '../services/storage/idb';

export interface LocalCollection<T extends Entity> {
  items: T[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  add: (entity: T) => Promise<T>;
  update: (entity: T) => Promise<T>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  replace: (entities: T[]) => Promise<void>;
}

/**
 * Hook genérico para coleções persistidas localmente.
 *
 * Mantém o estado em memória sincronizado com o repositório. A escrita acontece
 * primeiro no IndexedDB e só então no estado da UI, para que a tela nunca
 * mostre um dado que não foi realmente salvo.
 *
 * O comparador de ordenação é guardado em `ref`: chamadas como
 * `useLocalCollection(repo, { sort: (a, b) => ... })` criam uma nova função a
 * cada render e, se ela entrasse nas dependências, o efeito recarregaria em
 * loop infinito.
 */
export function useLocalCollection<T extends Entity>(
  repository: Repository<T>,
  options: { sort?: (a: T, b: T) => number } = {},
): LocalCollection<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sortRef = useRef(options.sort);
  sortRef.current = options.sort;

  const sortItems = useCallback((list: T[]) => {
    const sort = sortRef.current;
    return sort ? [...list].sort(sort) : list;
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await repository.getAll();
      setItems(sortItems(stored));
      setError(null);
    } catch {
      setError('Não foi possível ler os dados salvos neste dispositivo.');
    } finally {
      setLoading(false);
    }
  }, [repository, sortItems]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const add = useCallback(
    async (entity: T) => {
      const saved = await repository.put(entity);
      setItems((current) => sortItems([...current.filter((item) => item.id !== saved.id), saved]));
      return saved;
    },
    [repository, sortItems],
  );

  const update = useCallback(
    async (entity: T) => {
      const saved = await repository.put(entity);
      setItems((current) => sortItems(current.map((item) => (item.id === saved.id ? saved : item))));
      return saved;
    },
    [repository, sortItems],
  );

  const remove = useCallback(
    async (id: string) => {
      await repository.remove(id);
      setItems((current) => current.filter((item) => item.id !== id));
    },
    [repository],
  );

  const clear = useCallback(async () => {
    await repository.clear();
    setItems([]);
  }, [repository]);

  const replace = useCallback(
    async (entities: T[]) => {
      await repository.clear();
      await repository.putMany(entities);
      setItems(sortItems(entities));
    },
    [repository, sortItems],
  );

  return useMemo(
    () => ({ items, loading, error, reload, add, update, remove, clear, replace }),
    [items, loading, error, reload, add, update, remove, clear, replace],
  );
}
