import { useCallback } from 'react';
import { favoritesRepository, type FavoriteRecord } from '../services/storage/repositories';
import { useLocalCollection } from './useLocalCollection';
import { createId } from '../utils/id';

export type FavoriteKind = FavoriteRecord['kind'];

/**
 * Favoritos genéricos (orações, versículos, formações).
 * A chave é composta por tipo + referência, evitando duplicatas por clique duplo.
 */
export function useFavorites(kind?: FavoriteKind) {
  const collection = useLocalCollection<FavoriteRecord>(favoritesRepository, {
    sort: (a, b) => b.createdAt.localeCompare(a.createdAt),
  });

  const items = kind ? collection.items.filter((item) => item.kind === kind) : collection.items;

  const isFavorite = useCallback(
    (refId: string, itemKind: FavoriteKind = kind ?? 'prayer') =>
      collection.items.some((item) => item.kind === itemKind && item.refId === refId),
    [collection.items, kind],
  );

  const toggle = useCallback(
    async (refId: string, title: string, itemKind: FavoriteKind = kind ?? 'prayer') => {
      const existing = collection.items.find(
        (item) => item.kind === itemKind && item.refId === refId,
      );
      if (existing) {
        await collection.remove(existing.id);
        return false;
      }
      await collection.add({
        id: createId('fav'),
        kind: itemKind,
        refId,
        title,
        createdAt: new Date().toISOString(),
      });
      return true;
    },
    [collection, kind],
  );

  return { items, loading: collection.loading, isFavorite, toggle };
}
