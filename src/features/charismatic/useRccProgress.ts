import { useCallback, useMemo } from 'react';
import { useLocalCollection } from '../../hooks/useLocalCollection';
import { rccProgressRepository } from '../../services/storage/repositories';
import type { RccProgressRecord } from '../../types/rcc';

/**
 * Progresso do caminho carismático.
 *
 * Fica inteiramente no dispositivo (IndexedDB). Não há conta, não há
 * sincronização, não há telemetria: o que a pessoa marca aqui é dela.
 *
 * `kind:refId` é a chave, o que permite marcar e desmarcar sem duplicar.
 */
export function useRccProgress(kind: RccProgressRecord['kind']) {
  const { items, loading, error, add, remove } = useLocalCollection(rccProgressRepository);

  const scoped = useMemo(
    () => items.filter((item) => item.kind === kind),
    [items, kind],
  );

  const byRef = useMemo(() => {
    const map = new Map<string, RccProgressRecord>();
    for (const item of scoped) map.set(item.refId, item);
    return map;
  }, [scoped]);

  const completedCount = scoped.filter((item) => item.completed).length;

  const toggle = useCallback(
    async (refId: string, note?: string) => {
      const existing = byRef.get(refId);
      const nextCompleted = !existing?.completed;

      if (existing && !nextCompleted && note === undefined) {
        // Desmarcar sem nota: remove o registro, para não acumular lixo.
        await remove(existing.id);
        return;
      }

      const record: RccProgressRecord = {
        id: `${kind}:${refId}`,
        kind,
        refId,
        completed: nextCompleted,
        completedAt: nextCompleted ? new Date().toISOString() : null,
        note: note ?? existing?.note ?? null,
        updatedAt: new Date().toISOString(),
      };
      await add(record);
    },
    [add, byRef, kind, remove],
  );

  const setNote = useCallback(
    async (refId: string, note: string) => {
      const existing = byRef.get(refId);
      const record: RccProgressRecord = {
        id: `${kind}:${refId}`,
        kind,
        refId,
        completed: existing?.completed ?? false,
        completedAt: existing?.completedAt ?? null,
        note: note.trim() === '' ? null : note,
        updatedAt: new Date().toISOString(),
      };
      await add(record);
    },
    [add, byRef, kind],
  );

  return { byRef, completedCount, toggle, setNote, loading, error };
}
